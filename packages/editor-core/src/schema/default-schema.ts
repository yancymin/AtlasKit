import { createSchema } from './create-schema';
import { Schema } from '../prosemirror';

export const defaultSchema: Schema<any, any> = createSchema({
  nodes: [
    'applicationCard',
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
    'image',
    'mention',
    'media',
    'mediaGroup',
    'hardBreak',
    'emoji',
    'table',
    'tableCell',
    'tableHeader',
    'tableRow',
    'unknownBlock',
  ],
  marks: [
    'link',
    'em',
    'strong',
    'strike',
    'subsup',
    'underline',
    'code',
    'mentionQuery',
    'emojiQuery',
    'textColor',
  ]
});
