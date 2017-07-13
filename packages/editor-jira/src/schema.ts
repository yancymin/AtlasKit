import {
  MarkSpec,
  NodeSpec,
  Schema,
  createSchema
} from '@atlaskit/editor-core';

export interface JIRASchemaNodes {
  blockquote?: NodeSpec;
  bulletList?: NodeSpec;
  codeBlock?: NodeSpec;
  doc: NodeSpec;
  hardBreak: NodeSpec;
  heading: NodeSpec;
  listItem?: NodeSpec;
  mention?: NodeSpec;
  orderedList?: NodeSpec;
  paragraph: NodeSpec;
  rule: NodeSpec;
  text: NodeSpec;
  media: NodeSpec;
  mediaGroup: NodeSpec;
}

export interface JIRASchemaMarks {
  code?: MarkSpec;
  em: MarkSpec;
  link?: MarkSpec;
  mentionQuery?: MarkSpec;
  strike?: MarkSpec;
  strong: MarkSpec;
  subsup?: MarkSpec;
  underline: MarkSpec;
  textColor?: MarkSpec;
}

export interface JIRASchema extends Schema<JIRASchemaNodes, JIRASchemaMarks> {}

export interface JIRASchemaConfig {
  allowLists?: boolean;
  allowMentions?: boolean;
  allowLinks?: boolean;
  allowAdvancedTextFormatting?: boolean;
  allowCodeBlock?: boolean;
  allowBlockQuote?: boolean;
  allowSubSup?: boolean;
  allowMedia?: boolean;
  allowTextColor?: boolean;
}

export function isSchemaWithLists(schema: JIRASchema): boolean {
  return !!schema.nodes.bulletList;
}

export function isSchemaWithMentions(schema: JIRASchema): boolean {
  return !!schema.nodes.mention;
}

export function isSchemaWithLinks(schema: JIRASchema): boolean {
  return !!schema.marks.link;
}

export function isSchemaWithAdvancedTextFormattingMarks(schema: JIRASchema): boolean {
  return !!schema.marks.code && !!schema.marks.strike;
}

export function isSchemaWithSubSupMark(schema: JIRASchema): boolean {
  return !!schema.marks.subsup;
}

export function isSchemaWithCodeBlock(schema: JIRASchema): boolean {
  return !!schema.nodes.codeBlock;
}

export function isSchemaWithBlockQuotes(schema: JIRASchema): boolean {
  return !!schema.nodes.blockquote;
}

export function isSchemaWithMedia(schema: JIRASchema): boolean {
  return !!schema.nodes.mediaGroup && !!schema.nodes.media;
}

export function isSchemaWithTextColor(schema: JIRASchema): boolean {
  return !!schema.marks.textColor;
}

export function makeSchema(config: JIRASchemaConfig): JIRASchema {
  const nodes = ['doc', 'paragraph', 'text', 'hardBreak', 'heading', 'rule'];
  const marks = ['strong', 'em', 'underline'];

  if (config.allowLinks) {
    marks.push('link');
  }

  if (config.allowLists) {
    nodes.push('orderedList', 'bulletList', 'listItem');
  }

  if (config.allowMentions) {
    nodes.push('mention');
    marks.push('mentionQuery');
  }

  if (config.allowAdvancedTextFormatting) {
    marks.push('strike', 'code');
  }

  if (config.allowSubSup) {
    marks.push('subsup');
  }

  if (config.allowCodeBlock) {
    nodes.push('codeBlock');
  }

  if (config.allowBlockQuote) {
    nodes.push('blockquote');
  }

  if (config.allowMedia) {
    nodes.push('mediaGroup', 'media');
  }

  if (config.allowTextColor) {
    marks.push('textColor');
  }

  return createSchema({ nodes, marks });
}
