import { Plugin, EditorState, Transaction } from '../prosemirror-state';

export class InputRule {
  constructor(match: RegExp, handler: string | Function);
  match: RegExp;
  handler: (state: EditorState<any>, match, start, end) => (Transaction | undefined);
}
export function inputRules(config: {rules: Array<InputRule>}): Plugin;

export function undoInputRule(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
