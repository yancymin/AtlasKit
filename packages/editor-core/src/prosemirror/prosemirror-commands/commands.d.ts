import { EditorState, EditorView, MarkType, Node, NodeType, Transaction } from '../';

export function deleteSelection(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function joinBackward(state: EditorState<any>, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean;

export function joinForward(state: EditorState<any>, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean;

export function joinUp(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function joinDown(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function lift(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function newlineInCode(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function exitCode(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function createParagraphNear(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function liftEmptyBlock(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function splitBlock(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function splitBlockKeepMarks(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function selectParentNode(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function wrapIn(nodeType: NodeType, attrs?: { [key: string]: any }): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function setBlockType(nodeType: NodeType, attrs?: { [key: string]: any }): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function toggleMark(markType: MarkType, attrs?: { [key: string]: any }): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function autoJoin(command: (state: EditorState<any>, _1?: (tr: Transaction) => void) => boolean, isJoinable: ((before: Node, after: Node) => boolean) | string[]): (state: EditorState<any>, _1?: (tr: Transaction) => void) => boolean;

export function chainCommands(...commands: ((_0: EditorState<any>, _1?: (tr: Transaction) => void) => boolean)[]): (_0: EditorState<any>, _1?: (tr: Transaction) => void) => boolean;

export const baseKeymap: { [key: string]: (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean; };
