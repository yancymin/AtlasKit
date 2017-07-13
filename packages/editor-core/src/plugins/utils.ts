import { InputRule, EditorState, Transaction } from '../prosemirror';

export type InputRuleHandler<T> = (state: EditorState<T>, match, start, end) => (Transaction | undefined) | string;

export function defaultInputRuleHandler(inputRule: InputRule): InputRule {
  const originalHandler = inputRule.handler;
  inputRule.handler = (state: EditorState<any>, match, start, end) => {
    // Skip any input rule inside code
    // https://product-fabric.atlassian.net/wiki/spaces/E/pages/37945345/Editor+content+feature+rules#Editorcontent/featurerules-Rawtextblocks
    if (state.selection.$from.parent.type.spec.code) {
      return;
    }
    return originalHandler(state, match, start, end);
  };
  return inputRule;
}

export function createInputRule(match: RegExp, handler: InputRuleHandler<any>): InputRule {
  return defaultInputRuleHandler(new InputRule(match, handler));
}

// ProseMirror uses the Unicode Character 'OBJECT REPLACEMENT CHARACTER' (U+FFFC) as text representation for
// leaf nodes, i.e. nodes that don't have any content or text property (e.g. hardBreak, emoji, mention, rule)
// It was introduced because of https://github.com/ProseMirror/prosemirror/issues/262
// This can be used in an input rule regex to be able to include or exclude such nodes.
export const leafNodeReplacementCharacter = '\ufffc';
