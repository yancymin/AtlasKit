import { MarkdownIt } from 'markdown-it';
import { Schema } from '../';

export class MarkdownParser {
  constructor(schema: Schema<any, any>, tokenizer: MarkdownIt, tokens: Object);
}

export const defaultMarkdownParser: MarkdownParser;
