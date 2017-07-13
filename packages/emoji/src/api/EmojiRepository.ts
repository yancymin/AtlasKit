import { ITokenizer, Search, UnorderedSearchIndex } from 'js-search';

import * as XRegExp from 'xregexp/src/xregexp'; // Not using 'xregexp' directly to only include what we use
import * as XRegExpUnicodeBase from 'xregexp/src/addons/unicode-base';
import * as XRegExpUnicodeScripts from 'xregexp/src/addons/unicode-scripts';
import * as XRegExpUnicodeCategories from 'xregexp/src/addons/unicode-categories';

import { customCategory } from '../constants';
import debug from '../util/logger';
import { AvailableCategories, EmojiDescription, OptionalEmojiDescription, SearchOptions } from '../types';
import { isEmojiDescriptionWithVariations } from '../type-helpers';
import CategorySelector from '../components/picker/CategorySelector';

XRegExpUnicodeBase(XRegExp);
XRegExpUnicodeScripts(XRegExp);
XRegExpUnicodeCategories(XRegExp);

// \p{Han} => each chinese character is a separate token
// \p{L}+[\p{Mn}|']*\p{L} => consecutive letters, including non spacing mark and apostrophe are a single token
const tokenizerRegex = XRegExp.cache('\\p{Han}|[\\p{L}|\\p{N}]+[\\p{Mn}|\']*\\p{L}*', 'gi');

type Token = {
  token: string;
  start: number;
};

// FS-1097 - duplicated in mentions - extract at some point into a shared library
class Tokenizer implements ITokenizer {
  public static tokenize(text): string[] {
    return this.tokenizeAsTokens(text).map(token => token.token);
  }

  public static tokenizeAsTokens(text): Token[] {
    let match;
    let tokens: Token[] = [];
    tokenizerRegex.lastIndex = 0;
    while ((match = tokenizerRegex.exec(text)) !== null) {
      if (match[0]) {
        tokens.push({
          token: match[0],
          start: match.index
        });
      }
    }

    return tokens;
  }
}


export interface EmojiSearchResult {
  emojis: EmojiDescription[];
  categories: AvailableCategories;
  query?: string;
}

declare type EmojiByKey = Map<any, EmojiDescription[]>;

interface EmojiToKey {
  (emoji: EmojiDescription): any;
}

const availableCategories = (emojis: EmojiDescription[]): AvailableCategories => emojis.reduce((categories, emoji) => {
  categories[emoji.category] = true;
  return categories;
}, {});

const addAllVariants = (emoji: EmojiDescription, fnKey: EmojiToKey, map: EmojiByKey): void => {
  const key = fnKey(emoji);
  if (!map.has(key)) {
    map.set(key, []);
  }
  const emojisForKey = map.get(key);
  // Unnecessary, but typescript thinks it is. :/
  if (emojisForKey) {
    emojisForKey.push(emoji);
  }

  if (isEmojiDescriptionWithVariations(emoji)) {
    // map variations too
    const variations = emoji.skinVariations;
    if (variations) {
      variations.forEach(variation => addAllVariants(variation, fnKey, map));
    }
  }
};

const findByKey = (map: EmojiByKey, key: any): OptionalEmojiDescription => {
  const emojis = map.get(key);
  if (emojis && emojis.length) {
    // Priority is always to source from the last emoji set (last overrides first)
    return emojis[emojis.length - 1];
  }
  return undefined;
};

type SplitQuery = {
  nameQuery: string;
  asciiQuery: string;
};

const splitQuery = (query = ''): SplitQuery => {
  const isColonQuery = query.indexOf(':') === 0;
  if (isColonQuery) {
    return {
      nameQuery: query.slice(1),
      asciiQuery: query,
    };
  }

  return {
    nameQuery: query,
    asciiQuery: '',
  };
};

const applySearchOptions = (emojis: EmojiDescription[], options?: SearchOptions): EmojiDescription[] => {
  if (options) {
    if (options.limit && options.limit > 0) {
      emojis = emojis.slice(0, options.limit);
    }
    return emojis.map(emoji => {
      return getEmojiVariation(emoji, options);
    });
  }
  return emojis;
};

export const getEmojiVariation = (emoji: EmojiDescription, options?: SearchOptions): EmojiDescription => {
  if (isEmojiDescriptionWithVariations(emoji) && options) {
    const skinTone = options.skinTone;
    if (skinTone && emoji.skinVariations && emoji.skinVariations.length) {
      const skinToneEmoji = emoji.skinVariations[skinTone - 1]; // skinTone start at 1
      if (skinToneEmoji) {
        return skinToneEmoji;
      }
    }
  }
  return emoji;
};

export default class EmojiRepository {
  private emojis: EmojiDescription[];
  private fullSearch: Search;
  private shortNameMap: EmojiByKey;
  private idMap: EmojiByKey;
  private asciiMap: Map<string, EmojiDescription>;
  private categoryOrder: Map<string, number>;
  private static readonly defaultEmojiWeight: number = 1000000;

  constructor(emojis: EmojiDescription[]) {
    this.emojis = emojis;
    this.categoryOrder = new Map();
    CategorySelector.defaultProps.categories.forEach((category, index) => {
      this.categoryOrder.set(category.id, index + 1);
    });

    this.initMaps();
    this.fullSearch = new Search('id');
    this.fullSearch.tokenizer = Tokenizer;
    this.fullSearch.searchIndex = new UnorderedSearchIndex();
    this.fullSearch.addIndex('name');
    this.fullSearch.addIndex('shortName');
    this.fullSearch.addDocuments(emojis);
  }

  /**
   * Returns all available emoji.
   */
  all(): EmojiSearchResult {
    return this.search();
  }

  /**
   * Text search of emoji shortName and name field for suitable matches.
   *
   * Returns an array of all emoji is query is empty or null, otherwise an matching emoji.
   */
  search(query?: string, options?: SearchOptions): EmojiSearchResult {
    let filteredEmoji: EmojiDescription[] = [];
    const { nameQuery, asciiQuery } = splitQuery(query);
    if (nameQuery) {
      filteredEmoji = this.fullSearch.search(nameQuery);
      this.sortFiltered(filteredEmoji, nameQuery);
      if (asciiQuery) {
        filteredEmoji = this.withAsciiMatch(asciiQuery, filteredEmoji);
      }
    } else {
      filteredEmoji = this.emojis;
    }

    filteredEmoji = applySearchOptions(filteredEmoji, options);
    return {
      emojis: filteredEmoji,
      categories: availableCategories(filteredEmoji),
      query,
    };
  }

  /**
   * Returns the first matching emoji matching the shortName, or null if none found.
   */
  findByShortName(shortName: string): OptionalEmojiDescription {
    return findByKey(this.shortNameMap, shortName);
  }

  /**
   * Returns the first matching emoji matching the id, or null if none found.
   */
  findById(id: string): OptionalEmojiDescription {
    debug('findById', id, this.idMap);
    return findByKey(this.idMap, id);
  }

  findByAsciiRepresentation(asciiEmoji: string): OptionalEmojiDescription {
    return this.asciiMap.get(asciiEmoji);
  }

  findInCategory(categoryId: string): EmojiDescription[] {
    return this.all().emojis.filter(
      emoji => emoji.category === categoryId
    );
  }

  addCustomEmoji(emoji: EmojiDescription) {
    if (emoji.category !== customCategory) {
      throw new Error(`Emoji is not a custom emoji, but from category ${emoji.category}`);
    }
    this.emojis = [
      ...this.emojis,
      emoji,
    ];
    this.fullSearch.addDocuments([ emoji ]);
    this.addToMaps(emoji);
  }

  getAsciiMap(): Map<string, EmojiDescription> {
    return this.asciiMap;
  }

  private withAsciiMatch(ascii: string, emojis: EmojiDescription[]): EmojiDescription[] {
    let result = emojis;
    const asciiEmoji = this.findByAsciiRepresentation(ascii);
    if (asciiEmoji) {
      // Ensures that the same emoji isn't already in the list
      // If it is, we give precedence to the ascii match
      result = emojis.filter(e => e.id !== asciiEmoji.id);
      result = [asciiEmoji, ...result];
    }
    return result;
  }

  /**
   * Optimisation to initialise all map member variables in single loop over emojis
   */
  private initMaps(): void {
    this.shortNameMap  = new Map();
    this.idMap = new Map();
    this.asciiMap = new Map();

    this.emojis.forEach(emoji => {
      this.addToMaps(emoji);
    });
  }

  private addToMaps(emoji: EmojiDescription): void {
    // Give default value and assign higher weight to Atlassian emojis for logical order when sorting
    if (typeof emoji.order === 'undefined' || emoji.order === -1) {
      emoji.order = EmojiRepository.defaultEmojiWeight;
    }
    if (typeof emoji.id === 'undefined') {
      emoji.id = EmojiRepository.defaultEmojiWeight.toString();
    }
    addAllVariants(emoji, e => e.shortName, this.shortNameMap);
    addAllVariants(emoji, e => e.id, this.idMap);
    if (emoji.ascii) {
      emoji.ascii.forEach(a => this.asciiMap.set(a, emoji));
    }
  }

  /**
   * Sort emojis return by js-search in to a logical order
   */
  private sortFiltered(filteredEmoji: EmojiDescription[], query: string) {
    query = query.replace(/:/g, '').toLowerCase().trim();
    const colonQuery = `:${query}:`;

    // Comparator is an internal function within sorter to access the query
    const emojiComparator = (e1: EmojiDescription, e2: EmojiDescription): number => {
      // Handle exact matches between query and shortName
      if (e1.shortName === colonQuery && e2.shortName === colonQuery) {
        return EmojiRepository.typeToOrder(e1.type) - EmojiRepository.typeToOrder(e2.type);
      } else if (e1.shortName === colonQuery) {
        return -1;
      } else if (e2.shortName === colonQuery) {
        return 1;
      }

      // shortName matches should take precedence over full name
      const short1 = e1.shortName.indexOf(query);
      const short2 = e2.shortName.indexOf(query);

      // Order used for matching on same index and shorter queries with default value assigned on initialisation
      if (short1 !== -1 && short1 === short2) {
        return e1.order! - e2.order!;
      } else if (short1 !== -1 && short2 !== -1) {
        return short1 - short2;
      } else if (short1 !== -1) {
        return -1;
      } else if (short2 !== -1) {
        return 1;
      }

      // Query matches earliest in the full name
      if (e1.name && e2.name) {
        const index1 = e1.name.indexOf(query);
        const index2 = e2.name.indexOf(query);
        if (index1 !== index2) {
          return index1 - index2;
        }
      }

      // Use order if full name matches on same index
      if (e1.order !== e2.order) {
        return e1.order! - e2.order!;
      }

      // Default to alphabetical order
      return e1.shortName.slice(0, -1).localeCompare(e2.shortName.slice(0, -1));
    };

    filteredEmoji.sort(emojiComparator);
  }

  // Give precedence when conflicting shortNames occur as defined in Emoji Storage Spec
  private static typeToOrder(type: string): number {
    if (type === 'SITE') {
      return 0;
    } else if (type === 'ATLASSIAN') {
      return 1;
    } else if (type === 'STANDARD') {
      return 2;
    }
    // Push unknown type to bottom of list
    return 3;
  }
}
