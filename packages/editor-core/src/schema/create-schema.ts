import { NodeSpec, MarkSpec, Schema } from '../prosemirror';
import { COLOR, FONT_STYLE, SEARCH_QUERY, LINK } from './groups';
import {
  // Nodes
  confluenceJiraIssue,
  confluenceUnsupportedBlock,
  confluenceUnsupportedInline,
  doc,
  paragraph,
  text,
  bulletList,
  orderedList,
  listItem,
  heading,
  blockquote,
  codeBlock,
  panel,
  rule,
  image,
  mention,
  media,
  mediaGroup,
  hardBreak,
  emoji,
  table,
  tableCell,
  tableHeader,
  tableRow,
  applicationCard,
  unknownBlock,

  // Marks
  link,
  em,
  strong,
  strike,
  subsup,
  underline,
  code,
  mentionQuery,
  emojiQuery,
  textColor,
} from '../schema';

function addItems(builtInItems: SchemaBuiltInItem[], config: string[], customSpecs: SchemaCustomNodeSpecs | SchemaCustomMarkSpecs = {}) {
  if (!config) {
    return {};
  }

  /**
   * Add built-in Node / Mark specs
   */
  const items = builtInItems.reduce((items, { name, spec }) => {
    if (config.indexOf(name) !== -1) {
      items[name] = customSpecs[name] || spec;
    }

    return items;
  }, {});

  /**
   * Add Custom Node / Mark specs
   */
  return Object.keys(customSpecs).reduce((items, name) => {
    if (items[name]) {
      return items;
    }

    items[name] = customSpecs[name];

    return items;
  }, items);
}

// We use groups to allow schemas to be constructed in different shapes without changing node/mark
// specs, but this means nodes/marks are defined with groups that might never be used in the schema.
// In this scenario ProseMirror will complain and prevent the schema from being constructed.
//
// To avoid the problem, we include items that serve to "declare" the groups in the schema. This
// approach unfortunately leaves unused items in the schema, but has the benefit of avoiding the
// need to manipulate `exclude` or content expression values for potentially every schema item.
function groupDeclaration(name: string) {
  return {
    name: `__${name}GroupDeclaration`,
    spec: {
      group: name,
    }
  };
}

const markGroupDeclarations = [
  groupDeclaration(COLOR),
  groupDeclaration(FONT_STYLE),
  groupDeclaration(SEARCH_QUERY),
  groupDeclaration(LINK),
];

const markGroupDeclarationsNames = markGroupDeclarations.map(groupMark => groupMark.name);


const nodesInOrder: SchemaBuiltInItem[] = [
  { name: 'doc', spec: doc },
  { name: 'paragraph', spec: paragraph },
  { name: 'text', spec: text },
  { name: 'bulletList', spec: bulletList },
  { name: 'orderedList', spec: orderedList },
  { name: 'listItem', spec: listItem },
  { name: 'heading', spec: heading },
  { name: 'blockquote', spec: blockquote },
  { name: 'codeBlock', spec: codeBlock },
  { name: 'panel', spec: panel },
  { name: 'rule', spec: rule },
  { name: 'image', spec: image },
  { name: 'mention', spec: mention },
  { name: 'media', spec: media },
  { name: 'mediaGroup', spec: mediaGroup },
  { name: 'hardBreak', spec: hardBreak },
  { name: 'emoji', spec: emoji },
  { name: 'table', spec: table },
  { name: 'tableCell', spec: tableCell },
  { name: 'tableRow', spec: tableRow },
  { name: 'tableHeader', spec: tableHeader },
  { name: 'confluenceJiraIssue', spec: confluenceJiraIssue },
  { name: 'confluenceUnsupportedInline', spec: confluenceUnsupportedInline },
  { name: 'confluenceUnsupportedBlock', spec: confluenceUnsupportedBlock },
  { name: 'applicationCard', spec: applicationCard },
  { name: 'unknownBlock', spec: unknownBlock },
];

const marksInOrder: SchemaBuiltInItem[] = [
  { name: 'link', spec: link },
  { name: 'em', spec: em },
  { name: 'strong', spec: strong },
  { name: 'strike', spec: strike },
  { name: 'subsup', spec: subsup },
  { name: 'underline', spec: underline },
  { name: 'code', spec: code },
  { name: 'mentionQuery', spec: mentionQuery },
  { name: 'emojiQuery', spec: emojiQuery },
  { name: 'textColor', spec: textColor },
  ...markGroupDeclarations,
];

/**
 * Creates a schema preserving order of marks and nodes.
 */
export function createSchema(config: SchemaConfig): Schema<any, any> {
  const { nodes, customNodeSpecs, marks, customMarkSpecs } = config;
  const nodesConfig = Object.keys(customNodeSpecs || {}).concat(nodes);
  const marksConfig = Object.keys(customMarkSpecs || {}).concat(marks || []).concat(markGroupDeclarationsNames);
  return new Schema({
    nodes: addItems(nodesInOrder, nodesConfig, customNodeSpecs),
    marks: addItems(marksInOrder, marksConfig, customMarkSpecs),
  });
}

export interface SchemaConfig {
  nodes: string[];
  customNodeSpecs?: SchemaCustomNodeSpecs;
  marks?: string[];
  customMarkSpecs?: SchemaCustomMarkSpecs;
}

export interface SchemaBuiltInItem {
  name: string;
  spec: NodeSpec | MarkSpec;
}

export interface SchemaCustomNodeSpecs { [name: string]: NodeSpec; }
export interface SchemaCustomMarkSpecs { [name: string]: MarkSpec; }
