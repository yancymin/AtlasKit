import { Schema, inputRules, Plugin } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (!schema.nodes.image) {
    return;
  }

  // ![something](link) should convert to an image
  const imageRule = createInputRule(/!\[(\S+)\]\((\S+)\)$/, (state, match, start, end) => {
    const { schema } = state;
    const attrs = {
      src: match[2],
      alt: match[1],
      title: match[1],
    };

    const node = schema.nodes.image.create(attrs);
    analyticsService.trackEvent('atlassian.editor.image.autoformatting');
    return state.tr.replaceWith(
      start,
      end,
      node
    );
  });

  return inputRules({
    rules: [
      imageRule
    ]
  });
}

export default inputRulePlugin;
