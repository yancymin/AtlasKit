import { EditorView } from '../';
import { TestingEditorView } from './types/prosemirror';
import createEvent from './create-event';

export interface PasteContent {
  plain?: string;
  html?: string;
}

/**
 * Dispatch a paste event on the given ProseMirror instance
 *
 * Usage:
 *     dispatchPasteEvent(pm, {
 *         plain: 'copied text'
 *     });
 */
export default (editorView: EditorView, content: PasteContent) => {
  const event = createEvent('paste');

  const clipboardData = {
    getData(type: string) {
      if (type === 'text/plain') {
        return content.plain;
      }
      if (type === 'text/html') {
        return content.html;
      }
    },
    types: [],
  };

  try {
    Object.defineProperty(event, 'clipboardData', { value: clipboardData });
  } catch (e) {
    // iOS 9 will throw if we assign `clipboardData` to `event`
    // revert this change once iOS 10 is out
    return false;
  }

  (editorView as TestingEditorView).dispatchEvent(event);
  return true;
};
