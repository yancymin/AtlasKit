import {Search, UnorderedSearchIndex, ITokenizer} from 'js-search';
import {MentionsResult} from '../api/MentionResource';
import {HighlightDetail, MentionDescription, isSpecialMention} from '../types';
import * as XRegExp from 'xregexp/src/xregexp'; // Not using 'xregexp' directly to only include what we use
import * as XRegExpUnicodeBase from 'xregexp/src/addons/unicode-base';
import * as XRegExpUnicodeScripts from 'xregexp/src/addons/unicode-scripts';
import * as XRegExpUnicodeCategories from 'xregexp/src/addons/unicode-categories';

XRegExpUnicodeBase(XRegExp);
XRegExpUnicodeScripts(XRegExp);
XRegExpUnicodeCategories(XRegExp);

// \p{Han} => each chinese character is a separate token
// \p{L}+[\p{Mn}|']*\p{L} => consecutive letters, including non spacing mark and apostrophe are a single token
const tokenizerRegex = XRegExp.cache('\\p{Han}|\\p{L}+[\\p{Mn}|\']*\\p{L}*', 'gi');
const nonSpacingMarkRegex = XRegExp.cache('\\p{Mn}', 'gi');

export type Token = {
  token: string;
  start: number;
};

export class Tokenizer implements ITokenizer {
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

export class Highlighter {
  public static find(field: string, query: string): HighlightDetail[] {
    const highlights: HighlightDetail[] = [];
    if (field) {
      const queryTokens = Tokenizer.tokenizeAsTokens(query.toLowerCase());
      queryTokens.sort((a, b) => -1*a.token.localeCompare(b.token));

      const lowercaseField = field.toLowerCase();
      const fieldTokens: Token[] = Tokenizer.tokenizeAsTokens(lowercaseField);
      for (let fieldToken of fieldTokens) {
        for (let queryToken of queryTokens) {
          if (fieldToken.token.indexOf(queryToken.token) === 0) {
            const start = fieldToken.start;

            let end = start + queryToken.token.length - 1;
            let i = end + 1;
            let combiningCharacters = 0;

            // Includes non spacing mark in highlights (e.g. ញុំ  when searching ញ)
            while (i < fieldToken.token.length && nonSpacingMarkRegex.test(fieldToken.token[i])) {
              ++combiningCharacters;
              ++i;
              nonSpacingMarkRegex.lastIndex = 0;
            }

            highlights.push({
              start: start,
              end: end + combiningCharacters
            });
            break;
          }
        }
      }

      if (highlights.length < queryTokens.length) {
        return [];
      }

    }

    return highlights;
  }
}

export class SearchIndex {
  private index: Search | null;

  public search(query: string): Promise<MentionsResult> {
    return new Promise((resolve) => {
      const localResults = this.index.search(query).map(mention => {
        return {...mention, highlight: {
          name: Highlighter.find(mention.name, query),
          mentionName: Highlighter.find(mention.mentionName, query),
          nickname: Highlighter.find(mention.nickname, query)
        }};
      }).filter(mention => {
        if (isSpecialMention(mention) && mention.highlight.nickname.length === 0) {
          return false;
        }

        return true;
      });

      localResults.sort((a, b) => a.weight - b.weight || 0);

      resolve({
        mentions: localResults,
        query
      });
    });
  }

  public hasDocuments() {
    return !!this.index;
  }

  public reset() {
    this.index = null;
  }

  public indexResults(mentions: MentionDescription[]) {
    if (!this.index) {
      this.index = new Search('id');

      this.index.searchIndex = new UnorderedSearchIndex();
      this.index.tokenizer = Tokenizer;

      this.index.addIndex('name');
      this.index.addIndex('mentionName');
      this.index.addIndex('nickname');
    }

    this.index.addDocuments(mentions
    .map((mention, index) => {
      if (mention.weight !== undefined) {
        return mention;
      }

      return {...mention, weight: index};
    }));
  }

}
