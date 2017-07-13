// The names of the blocks don't map precisely to schema nodes, because
// of concepts like "paragraph" <-> "Normal text" and "Unknown".
//
// Rather than half-match half-not, this plugin introduces its own
// nomenclature for what 'block type' is active.
export const NORMAL_TEXT: BlockType = { name: 'normal', title: 'Normal text', nodeName: 'paragraph' };
export const HEADING_1: BlockType = { name: 'heading1', title: 'Heading 1', nodeName: 'heading' };
export const HEADING_2: BlockType = { name: 'heading2', title: 'Heading 2', nodeName: 'heading' };
export const HEADING_3: BlockType = { name: 'heading3', title: 'Heading 3', nodeName: 'heading' };
export const HEADING_4: BlockType = { name: 'heading4', title: 'Heading 4', nodeName: 'heading' };
export const HEADING_5: BlockType = { name: 'heading5', title: 'Heading 5', nodeName: 'heading' };
export const BLOCK_QUOTE: BlockType = { name: 'blockquote', title: 'Block quote', nodeName: 'blockquote' };
export const CODE_BLOCK: BlockType = { name: 'codeblock', title: 'Code block', nodeName: 'codeBlock' };
export const PANEL: BlockType = { name: 'panel', title: 'Panel', nodeName: 'panel' };
export const OTHER: BlockType = { name: 'other', title: 'Other…', nodeName: ''};

export const ALL_BLOCK_TYPES = [NORMAL_TEXT, HEADING_1, HEADING_2, HEADING_3, HEADING_4, HEADING_5,
  BLOCK_QUOTE, CODE_BLOCK, PANEL];

export type BlockTypeName =
  'normal' |
  'heading1' |
  'heading2' |
  'heading3' |
  'heading4' |
  'heading5' |
  'blockquote' |
  'codeblock' |
  'panel' |
  'other';

export interface BlockType {
  name: string;
  title: string;
  nodeName: string;
}
