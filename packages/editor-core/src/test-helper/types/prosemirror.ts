import { EditorView } from '../../';

export interface TestingEditorView extends EditorView {
  dispatchEvent(event: string | CustomEvent | { type: string });
}
