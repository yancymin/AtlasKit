import {
  Fragment,
  Schema,
} from '../../prosemirror';

import { Serializer } from '../serializer';

const STOP_SYMBOLS = /^(\.|,|;)/;

const joinTextChunks = (text: string[]): string => {
  return text.reduce((memo: string, chunk: string) => {
    const textChunk = chunk.trim();

    if (!textChunk) {
      return memo;
    }

    if (!memo) {
      return textChunk;
    }

    // there shouldn't be blank space before special characters
    const delimiter = STOP_SYMBOLS.test(textChunk) ? '' : ' ';
    return `${memo}${delimiter}${textChunk}`;
  }, '');
};

const serializeFragment = (fragment: Fragment): string => {
  const text: string[] = [];

  fragment.forEach(node => {
    if (node.childCount) {
      text.push(serializeFragment(node.content));
    } else if (node.attrs.text || node.attrs.shortName) {
      text.push(node.attrs.text || node.attrs.shortName);
    } else if (node.text) {
      text.push(node.text);
    }
  });

  return joinTextChunks(text);
};

export default class TextSerializer implements Serializer<string> {
  serializeFragment(fragment: Fragment): string {
    return serializeFragment(fragment);
  }

  static fromSchema(schema: Schema<any, any>): TextSerializer {
    return new TextSerializer();
  }
}
