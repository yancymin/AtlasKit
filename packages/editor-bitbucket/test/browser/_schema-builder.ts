import { markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import schema from '../../src/schema';

// Nodes
export const blockquote = nodeFactory(schema.nodes.blockquote);
export const br = schema.nodes.hardBreak.createChecked();
// tslint:disable-next-line:variable-name
export const code_block = (attrs: {} = {}) => nodeFactory(schema.nodes.codeBlock, attrs);
export const doc = nodeFactory(schema.nodes.doc);
export const emoji = (attrs: { shortName: string }) => schema.nodes.emoji.createChecked(attrs);
export const h1 = nodeFactory(schema.nodes.heading, {level: 1});
export const h2 = nodeFactory(schema.nodes.heading, {level: 2});
export const h3 = nodeFactory(schema.nodes.heading, {level: 3});
export const h4 = nodeFactory(schema.nodes.heading, {level: 4});
export const h5 = nodeFactory(schema.nodes.heading, {level: 5});
export const h6 = nodeFactory(schema.nodes.heading, {level: 6});
export const hr = schema.nodes.rule.createChecked();
export const img = (attrs: { src: string, alt?: string, title?: string }) => schema.nodes.image.createChecked(attrs);
export const li = nodeFactory(schema.nodes.listItem);
export const mention = (attrs: { id: string, text?: string }) => schema.nodes.mention.createChecked(attrs);
export const ol = nodeFactory(schema.nodes.orderedList);
export const p = nodeFactory(schema.nodes.paragraph);
export const ul = nodeFactory(schema.nodes.bulletList);

// Marks
export const a = (attrs: { href: string, title?: string }) => markFactory(schema.marks.link, attrs);
export const code = markFactory(schema.marks.code, {});
export const em = markFactory(schema.marks.em, {});
export const strong = markFactory(schema.marks.strong, {});
export const strike = markFactory(schema.marks.strike, {});
// tslint:disable-next-line:variable-name
export const mentionQuery = markFactory(schema.marks.mentionQuery, {});
// tslint:disable-next-line:variable-name
export const emojiQuery = markFactory(schema.marks.emojiQuery, {});
