import { NodeSpec, nodes } from '../../prosemirror';

// Nodes
import { Definition as Panel } from './panel';
import { Definition as Paragraph } from './paragraph';
import { Definition as Blockquote } from './blockquote';
import { Definition as OrderedList } from './ordered-list';
import { Definition as BulletList } from './bullet-list';
import { Definition as Rule } from './rule';
import { Definition as Heading } from './heading';
import { Definition as CodeBlock } from './code-block';
import { Definition as MediaGroup } from './media-group';
import { Definition as ApplicationCard } from './applicationCard';

import { Definition as Text } from './text';
import { Definition as HardBreak } from './hard-break';
import { Definition as Mention } from './mention';
import { Definition as Emoji } from './emoji';

// Marks
import { Definition as Link } from '../marks/link';
import { Definition as Em } from '../marks/em';
import { Definition as Strong } from '../marks/strong';
import { Definition as Strike } from '../marks/strike';
import { Definition as Code } from '../marks/code';
import { Definition as SubSup } from '../marks/subsup';
import { Definition as Underline } from '../marks/underline';
import { Definition as TextColor } from '../marks/text-color';

/**
 * @name top_level_node
 * @minItems 1
 */
export type TopLevel = Array<
  Panel | Paragraph | Blockquote | OrderedList | BulletList |
  Rule | Heading | CodeBlock | MediaGroup | ApplicationCard
>;

export interface MarksObject<T> {
  marks?: Array<T>;
}

/**
 * @name formatted_text_inline_node
 */
export type InlineFormattedText = Text & MarksObject<
  Link | Em | Strong | Strike | SubSup | Underline | TextColor
>;

/**
 * @name link_text_inline_node
 */
export type InlineLinkText = Text & MarksObject<Link>;

/**
 * @name code_inline_node
 */
export type InlineCode = Text & MarksObject<Code | Link>;

/**
 * @name atomic_inline_node
 */
export type InlineAtomic = HardBreak | Mention | Emoji;

/**
 * @name inline_node
 */
export type Inline = InlineFormattedText | InlineCode | InlineAtomic;

/**
 * @name doc_node
 * @additionalProperties false
 */
export interface Doc {
  version: 1;
  type: 'doc';
  content: TopLevel;
}

export const doc: NodeSpec = nodes.doc;
