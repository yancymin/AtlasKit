import {
  blockQuoteRule, headingRule, InputRule, inputRules, Plugin, Schema, Transaction
} from '../../prosemirror';
import { analyticsService, trackAndInvoke } from '../../analytics';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../block-type/transform-to-code-block';
import { createInputRule, defaultInputRuleHandler } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.heading) {
    // '# ' for h1, '## ' for h2 and etc
    const rule = defaultInputRuleHandler(headingRule(schema.nodes.heading, 5));
    const currentHandler = rule.handler;
    rule.handler = (state, match, start, end) => {
      analyticsService.trackEvent(`atlassian.editor.format.heading${match[1].length}.autoformatting`);
      return currentHandler(state, match, start, end);
    };
    rules.push(rule);
  }

  if (schema.nodes.blockquote) {
    // '> ' for blockquote
    const rule = defaultInputRuleHandler(blockQuoteRule(schema.nodes.blockquote));
    rule.handler = trackAndInvoke('atlassian.editor.format.blockquote.autoformatting', rule.handler);
    rules.push(rule);
  }

  if (schema.nodes.codeBlock) {
    rules.push(createInputRule(/^```$/, (state, match, start, end): Transaction | undefined => {
      const lengthOfDecorator = match[0].length;

      // Because the node content is wrap by the node margin in prosemirror
      // + 2 is the parent margin size. 1 in the front, and 1 at the end.
      const convertedNodeHasContent = state.selection.$from.parent.nodeSize > lengthOfDecorator + 2;

      if (isConvertableToCodeBlock(state) && convertedNodeHasContent) {
        analyticsService.trackEvent(`atlassian.editor.format.codeblock.autoformatting`);
        return transformToCodeBlockAction(state)
          // remove markdown decorator ```
          .delete(start, end)
          .scrollIntoView();
      }
    }));
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
