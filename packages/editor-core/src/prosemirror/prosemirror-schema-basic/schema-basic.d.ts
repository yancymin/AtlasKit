import { Schema } from '../';

export const nodes: {
  doc: any,
  paragraph: any,
  blockquote: any,
  horizontal_rule: any,
  heading: any,
  code_block: any,
  text: any,
  image: any,
  hard_break: any
};

export const marks: { em: any, strong: any, link: any, code: any };

export const schema: Schema<typeof nodes, typeof marks>;
