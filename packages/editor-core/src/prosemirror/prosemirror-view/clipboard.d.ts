import { ResolvedPos, Slice } from '../';
import * as dom from '../dom';
import { EditorView } from './';

export function toClipboard(view: EditorView, range: Selection, dataTransfer: dom.DataTransfer): Slice;

export function fromClipboard(view: EditorView, dataTransfer: dom.DataTransfer, plainText: boolean | null, $context: ResolvedPos): Slice | null;
