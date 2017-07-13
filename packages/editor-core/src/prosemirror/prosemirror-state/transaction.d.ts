import { Mark, MarkType, Node, Selection, Slice, Transform, CellSelection } from '../';
import { PluginKey } from './';

export class Transaction extends Transform {
  time: number;
  storedMarks?: Mark[];
  docChanged: boolean;
  selection: Selection;
  setSelection(selection: Selection | CellSelection): Transaction;
  selectionSet: boolean;
  setStoredMarks(marks?: Mark[]): Transaction;
  storedMarksSet: boolean;
  setTime(time: number): Transaction;
  replaceSelection(slice: Slice): Transaction;
  replaceSelectionWith(node: Node, inheritMarks?: boolean): Transaction;
  deleteSelection(): Transaction;
  insertText(text: string, from?: number, to?: number): Transaction;
  setMeta(key: string | Plugin | PluginKey, value: any): Transaction;
  getMeta(key: string | Plugin | PluginKey): any;
  isGeneric: boolean;
  scrollIntoView(): Transaction;
  addStoredMark(mark: Mark): Transaction;
  removeStoredMark(mark: Mark | MarkType): Transaction;
}
