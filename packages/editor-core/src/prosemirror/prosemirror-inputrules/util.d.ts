import { NodeType, InputRule } from '../';

export function wrappingInputRule(regexp: RegExp, nodeType: NodeType, getAttrs: Function | { [key: string]: any }, joinPredicate: Function): InputRule;
export function textblockTypeInputRule(regexp: RegExp, nodeType: NodeType, getAttrs: Function | { [key: string]: any }): InputRule;
export function blockQuoteRule(nodeType: NodeType): InputRule;
export function orderedListRule(nodeType: NodeType): InputRule;
export function bulletListRule(nodeType: NodeType): InputRule;
export function codeBlockRule(nodeType: NodeType): InputRule;
export function headingRule(nodeType: NodeType, maxLevel: number): InputRule;
