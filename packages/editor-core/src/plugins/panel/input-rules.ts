import { Schema, inputRules, Plugin, EditorState } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';

const availablePanelTypes = ['info', 'note', 'tip', 'warning'];

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  const panelInputRule = createInputRule(
    /^\{(\S+)\}$/, (
      state: EditorState<any>,
      match: Object | undefined,
      start: number,
      end: number
    ) => {
      const panelType = match && match[1];

      if (panelType && availablePanelTypes.indexOf(panelType) >= 0) {
        const { schema } = state;
        let { tr } = state;
        const { panel } = schema.nodes;
        if (panel) {
          const { $from } = state.selection;
          let range = $from.blockRange($from)!;
          tr = tr.wrap(range, [{ type: panel, attrs: { panelType } }]);
          tr = tr.delete(end - (panelType.length + 2), end + 1);

          analyticsService.trackEvent(`atlassian.editor.format.panel.${panelType}.autoformatting`);

          return tr;
        }
      }
    });

  return inputRules({ rules: [panelInputRule] });
}

export default inputRulePlugin;
