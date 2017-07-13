import { EditorState, Transaction, Plugin, PluginKey, inputRules, Schema, Node } from '../../prosemirror';
import { createInputRule, leafNodeReplacementCharacter } from '../utils';
import { isMarkTypeAllowedAtCurrentPosition } from '../../utils';
import { EmojiProvider, EmojiDescription } from '@atlaskit/emoji';

let matcher: AsciiEmojiMatcher;

export function inputRulePlugin(schema: Schema<any, any>, emojiProvider: Promise<EmojiProvider> | undefined): Plugin | undefined {
  if (schema.nodes.emoji && emojiProvider) {
    initMatcher(emojiProvider);
    const asciiEmojiRule = createInputRule(AsciiEmojiMatcher.REGEX, inputRuleHandler);
    return inputRules({
      rules: [asciiEmojiRule]
    });
  }
}

function initMatcher(emojiProvider: Promise<EmojiProvider>) {
  emojiProvider.then(provider => {
    provider.getAsciiMap().then(map => {
      matcher = new AsciiEmojiMatcher(map);
    });
  });
}

function inputRuleHandler(state: EditorState<Schema<any, any>>, matchParts: [string], start: number, end: number): Transaction | undefined {
  if (!matcher) { return undefined; }
  if (!isEnabled(state)) { return undefined; }

  const match = matcher.match(matchParts);
  if (match) {
    const transactionCreator = new AsciiEmojiTransactionCreator(state, match, start, end);
    return transactionCreator.create();
  }
  return undefined;
}

function isEnabled(state: EditorState<Schema<any, any>>) {
  const emojiQuery = state.schema.marks.emojiQuery;
  const isEmojiQueryActive = state.selection.$from.marks().some(mark => mark.type === emojiQuery);
  return isEmojiQueryActive || isMarkTypeAllowedAtCurrentPosition(emojiQuery, state);
}

type AsciiEmojiMatch = {
  emoji: EmojiDescription;
  leadingCharacter: string;
  trailingCharacter: string;
};

class AsciiEmojiMatcher {
  /**
   * This regex matches 2 scenarios:
   * 1. an emoticon starting with a colon character (e.g. :D => 😃)
   * 2. an emoticon not starting with a colon character (e.g. 8-D => 😎)
   *
   * The following describes the different parts of the regex from left to right:
   *   (^|${leafNodeReplacementCharacter}| )
   *     must be preceded by the start of a line, a whitespace or a leaf node, regardless of scenario #1 or #2
   *
   *   ([^: ]\S{1,3}|:\S{1,3} )
   *     alternation between scenario #1 and #2
   *       #1 - `[^: ]\S{1,3}`
   *         must not start with a colon and any additional whitespace or leaf node is ignored (as already matched by previous capture)
   *         following characters must be non-whitespace
   *         only matches emoticons that are between 2 and 4 characters long
   *       #2 - :\S{1,3}
   *         must start with a colon character
   *         following characters must be non-whitespace
   *         only matches emoticons that are between 2 and 4 characters long
   *         must be trailed by a space character
   *
   *    $
   *      anchors the end of the match to the cursor position
   */
  static REGEX = new RegExp(`(^|[\\s${leafNodeReplacementCharacter}])([^:\\s${leafNodeReplacementCharacter}]\\S{1,3}|:\\S{1,3}( ))$`);

  private static REGEX_LEADING_CAPTURE_INDEX = 1;
  private static REGEX_EMOJI_ASCII_CAPTURE_INDEX = 2;
  private static REGEX_TRAILING_CAPTURE_INDEX = 3;

  private asciiToEmojiMap: Map<string, EmojiDescription>;

  constructor(asciiToEmojiMap: Map<string, EmojiDescription>) {
    this.asciiToEmojiMap = asciiToEmojiMap;
  }

  match(matchParts: string[]): AsciiEmojiMatch | undefined {
    let emoji = this.getEmoji(matchParts);
    if (emoji) {
      return {
        emoji: emoji,
        leadingCharacter: AsciiEmojiMatcher.getLeadingCharacter(matchParts),
        trailingCharacter: AsciiEmojiMatcher.getTrailingCharacter(matchParts),
      };
    }
  }

  private getEmoji(match: string[]): EmojiDescription | undefined {
    let ascii = match[AsciiEmojiMatcher.REGEX_EMOJI_ASCII_CAPTURE_INDEX].trim();
    if (ascii) {
      return this.asciiToEmojiMap.get(ascii);
    }
    return undefined;
  }

  private static getLeadingCharacter(match: string[]): string {
    return match[AsciiEmojiMatcher.REGEX_LEADING_CAPTURE_INDEX];
  }

  private static getTrailingCharacter(match: string[]): string {
    return match[AsciiEmojiMatcher.REGEX_TRAILING_CAPTURE_INDEX] || '';
  }
}

class AsciiEmojiTransactionCreator {
  private state: EditorState<Schema<any, any>>;
  private match: AsciiEmojiMatch;
  private start: number;
  private end: number;

  constructor(state: EditorState<Schema<any, any>>, match: AsciiEmojiMatch, start: number, end: number) {
    this.state = state;
    this.match = match;
    this.start = start;
    this.end = end;
  }

  create(): Transaction {
    return this.state.tr.replaceWith(
      this.from,
      this.to,
      this.createNodes()
    );
  }

  private get from(): number {
    return this.start + this.match.leadingCharacter.length;
  }

  private get to(): number {
    return this.end;
  }

  private createNodes(): Node[] {
    const nodes = [this.createEmojiNode()];
    if (this.trailingTextNodeRequired()) {
      nodes.push(this.createTrailingTextNode());
    }
    return nodes;
  }

  private createEmojiNode(): Node {
    const { emoji: emojiTypeNode } = this.state.schema.nodes;
    return emojiTypeNode.create(this.getEmojiNodeAttrs());
  }

  private getEmojiNodeAttrs() {
    const emoji = this.match.emoji;
    return {
      id: emoji.id,
      shortName: emoji.shortName,
      text: emoji.fallback || emoji.shortName
    };
  }

  private trailingTextNodeRequired(): boolean {
    return this.match.trailingCharacter.length > 0;
  }

  private createTrailingTextNode(): Node {
    return this.state.schema.text(this.match.trailingCharacter);
  }
}

export const stateKey = new PluginKey('asciiEmojiPlugin');

const plugins = (schema: Schema<any, any>, emojiProvider: Promise<EmojiProvider> | undefined) => {
  return [inputRulePlugin(schema, emojiProvider)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
