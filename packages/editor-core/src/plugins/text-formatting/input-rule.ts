import { InputRule, inputRules, Plugin, Schema, Transaction, MarkType } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { transformToCodeAction } from './transform-to-code';
import { InputRuleHandler, createInputRule } from '../utils';

function addMark(markType: MarkType, schema: Schema<any, any>, specialChar: string): InputRuleHandler<any> {
  return (state, match, start, end): Transaction | undefined => {
    const charSize = specialChar.length;
    const to = end;
    // in case of *string* pattern it matches the text from beginning of the paragraph,
    // because we want ** to work for strong text
    // that's why "start" argument is wrong and we need to calculate it ourselves
    const from = match[1] ? to - match[1].length + 1 : start;

    // fixes the following case: my `*name` is *
    // expected result: should ignore special characters inside "code"
    if (state.schema.marks.code && state.schema.marks.code.isInSet(state.doc.resolve(from + 1).marks())) {
      return;
    }

    analyticsService.trackEvent(`atlassian.editor.format.${markType.name}.autoformatting`);

    // apply mark to the range (from, to)
    let tr = state.tr.addMark(from, to, markType.create());

    if (charSize > 1) {
      // delete special characters after the text
      // Prosemirror removes the last symbol by itself, so we need to remove "charSize - 1" symbols
      tr = tr.delete(to - (charSize - 1), to);
    }

    return tr
       // delete special characters before the text
       .delete(from, from + charSize)
       .removeStoredMark(markType);
  };
}

function addCodeMark(markType: MarkType, schema: Schema<any, any>, specialChar: string): InputRuleHandler<any> {
  return (state, match, start, end): Transaction | undefined => {
    analyticsService.trackEvent('atlassian.editor.format.code.autoformatting');
    return transformToCodeAction(state, start, end).delete(start, start + specialChar.length).removeStoredMark(markType);
  };
}

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.marks.strong) {
    // **string** should bold the text
    rules.push(createInputRule(/(\*\*([^\*]+)\*\*)$/, addMark(schema.marks.strong, schema, '**')));
  }

  if (schema.marks.em) {
    // *string* should italic the text
    rules.push(createInputRule(/(?:[^\*]+)(\*([^\*]+?)\*)$|^(\*([^\*]+)\*)$/, addMark(schema.marks.em, schema, '*')));
  }

  if (schema.marks.strike) {
    // ~~string~~ should strikethrough the text
    rules.push(createInputRule(/(\~\~([^\~]+)\~\~)$/, addMark(schema.marks.strike, schema, '~~')));
  }

  if (schema.marks.code) {
    // `string` should monospace the text
    rules.push(createInputRule(/(`([^`]+)`)$/, addCodeMark(schema.marks.code, schema, '`')));
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
