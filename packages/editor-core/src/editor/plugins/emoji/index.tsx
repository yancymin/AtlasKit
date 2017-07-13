import * as React from 'react';
import { EditorPlugin } from '../../types';
import { WithProviders } from '../../../providerFactory/withProviders';
import { createPlugin } from '../../../plugins/emojis';
import inputRulePlugin from '../../../plugins/emojis/input-rules';
import keymap from '../../../plugins/emojis/keymap';
import { emoji } from '../../../schema/nodes/emoji';
import { emojiQuery } from '../../../schema/marks/emoji-query';
import pluginKey from '../../../plugins/emojis/plugin-key';
import EmojiTypeAhead from '../../../ui/EmojiTypeAhead';

const emojiPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'emoji', node: emoji, rank: 1600 }];
  },

  marks() {
    return [{ name: 'emojiQuery', mark: emojiQuery, rank: 1600 }];
  },

  pmPlugins() {
    return [
      { rank: 400, plugin: (schema, props, providerFactory) => createPlugin(providerFactory) },
      { rank: 410, plugin: schema => inputRulePlugin(schema) },
      { rank: 420, plugin: schema => keymap(schema) }
    ];
  },

  contentComponent(editorView, providerFactory) {
    const renderNode = (providers) =>{
      return <EmojiTypeAhead editorView={editorView} pluginKey={pluginKey} emojiProvider={providers.emojiProvider} />;
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    );
  }
};

export default emojiPlugin;
