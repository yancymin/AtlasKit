import { AttributeSpec, MarkSpec, Node, NodeSpec, ParseRule, Schema } from '../prosemirror';
import {
  paragraph,
  createSchema
} from '../schema';

export { AttributeSpec, MarkSpec, Node, NodeSpec, ParseRule, Schema };
export default createSchema({
  nodes: [
    'doc',
    'paragraph',
    'text',
    'bulletList',
    'orderedList',
    'listItem',
    'heading',
    'blockquote',
    'codeBlock',
    'panel',
    'rule',
    'hardBreak',
    'mention',
    'emoji',
    'image',
    'media',
    'mediaGroup',
    'plain',
    'table',
    'tableCell',
    'tableHeader',
    'tableRow',
  ],
  marks: [
    'em',
    'strong',
    'code',
    'strike',
    'underline',
    'link',
    'mentionQuery',
    'subsup',
    'emojiQuery',
    'textColor',
  ],
  customNodeSpecs: {
    plain: { ...paragraph, content: 'text*' }
  }
});
