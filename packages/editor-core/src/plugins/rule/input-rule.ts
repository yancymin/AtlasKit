import { Fragment, InputRule, inputRules, Plugin, Schema } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.rule) {
    // '---' for hr
    rules.push(createInputRule(/^\-\-\-$/, (state, match, start, end) => {
      analyticsService.trackEvent(`atlassian.editor.format.horizontalrule.autoformatting`);
      return state.tr.replaceWith(start, end, Fragment.from(schema.nodes.rule.create()));
    }));
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
