import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { MentionsState } from './';
import pluginKey from './plugin-key';
import { createInputRule, leafNodeReplacementCharacter } from '../utils';
import { analyticsService } from '../../analytics';

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {

  const rules: Array<InputRule> = [];

  if (schema.nodes.mention && schema.marks.mentionQuery) {
    const regex = new RegExp(`(^|[\\s${leafNodeReplacementCharacter}])@$`);
    const mentionQueryRule = createInputRule(regex, (state, match, start, end): Transaction | undefined => {
      const mentionsState = pluginKey.getState(state) as MentionsState;

      if (!mentionsState.mentionProvider) {
        return undefined;
      }

      if (!mentionsState.isEnabled()) {
        return undefined;
      }

      const mark = schema.mark('mentionQuery');
      const { tr } = state;

      analyticsService.trackEvent('atlassian.editor.mention.autoformatting');

      const mentionText = schema.text(
        '@',
        [mark]
      );
      return tr.replaceSelectionWith(mentionText, false);
    });

    rules.push(mentionQueryRule);
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
