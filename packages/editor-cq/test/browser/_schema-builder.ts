import { markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import schema from '../../src/schema';

// Nodes
export const ul = nodeFactory(schema.nodes.bulletList);
export const doc = nodeFactory(schema.nodes.doc);
export const p = nodeFactory(schema.nodes.paragraph);
export const blockquote = nodeFactory(schema.nodes.blockquote);
export const br = schema.node(schema.nodes.hardBreak);
export const h1 = nodeFactory(schema.nodes.heading, { level: 1 });
export const h2 = nodeFactory(schema.nodes.heading, { level: 2 });
export const h3 = nodeFactory(schema.nodes.heading, { level: 3 });
export const h4 = nodeFactory(schema.nodes.heading, { level: 4 });
export const h5 = nodeFactory(schema.nodes.heading, { level: 5 });
export const h6 = nodeFactory(schema.nodes.heading, { level: 6 });
export const hr = nodeFactory(schema.nodes.rule);
export const li = nodeFactory(schema.nodes.listItem);
export const ol = nodeFactory(schema.nodes.orderedList);
export const codeblock = (attrs: {} = {}) => nodeFactory(schema.nodes.codeBlock, attrs);
export const panel = (attrs: {} = {}) => nodeFactory(schema.nodes.panel, attrs);
export const confluenceUnsupportedBlock = (cxhtml: string) => nodeFactory(schema.nodes.confluenceUnsupportedBlock, { cxhtml })();
export const confluenceUnsupportedInline = (cxhtml: string) => nodeFactory(schema.nodes.confluenceUnsupportedInline, { cxhtml })();
export const mention = (attrs: { id: string, text?: string }) => schema.nodes.mention.createChecked(attrs);
export const confluenceJiraIssue = (attrs: {
  issueKey?: string;
  macroId?: string;
  schemaVersion?: string;
  server?: string;
  serverId?: string;
}) => schema.nodes.confluenceJiraIssue.create(attrs);
export const mediaGroup = nodeFactory(schema.nodes.mediaGroup);
export const media = (attrs: {
  id: string;
  type: 'file' | 'link';
  collection: string;
  fileName?: string;
  fileSize?: number;
  fileMimeType?: string;
  publicId?: string;
}) => {
  const node = schema.nodes.media.create(attrs);

  if (attrs.fileName) {
    node.fileName = attrs.fileName;
  }

  if (attrs.fileSize) {
    node.fileSize = attrs.fileSize;
  }

  if (attrs.fileMimeType) {
    node.fileMimeType = attrs.fileMimeType;
  }

  return node;
};

// Marks
export const code = markFactory(schema.marks.code);
export const strike = markFactory(schema.marks.strike);
export const em = markFactory(schema.marks.em);
export const strong = markFactory(schema.marks.strong);
export const sub = markFactory(schema.marks.subsup, { type: 'sub' });
export const sup = markFactory(schema.marks.subsup, { type: 'sup' });
export const u = markFactory(schema.marks.underline);
export const link = (attrs: {} = {}) => markFactory(schema.marks.link, attrs);
