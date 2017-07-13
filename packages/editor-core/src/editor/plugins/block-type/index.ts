import { EditorPlugin } from '../../types';

import { plugin } from '../../../plugins/block-type';
import inputRulePlugin from '../../../plugins/block-type/input-rule';
import { heading } from '../../../schema/nodes/heading';
import { blockquote } from '../../../schema/nodes/blockquote';
import { rule } from '../../../schema/nodes/rule';
import { hardBreak } from '../../../schema/nodes/hard-break';

const blockType: EditorPlugin = {
  nodes() {
    return [
      { name: 'heading', node: heading, rank: 600 },
      { name: 'blockquote', node: blockquote, rank: 700 },
      { name: 'rule', node: rule, rank: 1000 },
      { name: 'hardBreak', node: hardBreak, rank: 1500 }
    ];
  },

  pmPlugins() {
    return [
      { rank: 500, plugin: () => plugin },
      { rank: 510, plugin: schema => inputRulePlugin(schema) }
    ];
  }
};

export default blockType;
