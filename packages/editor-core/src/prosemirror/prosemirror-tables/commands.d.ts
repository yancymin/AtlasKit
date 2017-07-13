import { EditorState, Transaction } from '../';

export function deleteTable(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function goToNextCell(direction: number): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function toggleHeaderCell(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function toggleHeaderColumn(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function toggleHeaderRow(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function setCellAttr(name: string, value: any): (state: EditorState<any>, dispatch?: (tr: Transaction) => void) => boolean;

export function splitCell(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function mergeCells(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function deleteRow(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function addRowAfter(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function addRowBefore(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function deleteColumn(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function addColumnAfter(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;

export function addColumnBefore(state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
