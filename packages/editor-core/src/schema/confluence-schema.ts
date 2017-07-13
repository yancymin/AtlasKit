import { createSchema } from './create-schema';
import { Schema } from '../prosemirror';

export const confluenceSchema: Schema<any, any> = createSchema({
  nodes: [
    'doc',
    'paragraph',
    'blockquote',
    'codeBlock',
    'panel',
    'hardBreak',
    'orderedList',
    'bulletList',
    'heading',
    'mediaGroup',
    'confluenceUnsupportedBlock',
    'confluenceJiraIssue',
    'listItem',
    'mention',
    'text',
    'confluenceUnsupportedInline',
    'media',
    'rule'
  ],
  marks: [
    'link',
    'em',
    'strong',
    'strike',
    'subsup',
    'underline',
    'mentionQuery',
    'code'
  ]
});
