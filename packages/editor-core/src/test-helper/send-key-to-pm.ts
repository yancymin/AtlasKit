import { EditorView, browser } from '../prosemirror';
import { keyCodes } from '../keymaps';
import { TestingEditorView } from './types/prosemirror';

/**
 * Sends a key to ProseMirror content area, simulating user key press.
 * Accepts key descriptions similar to Keymap, i.e. 'Shift-Ctrl-L'
 */
export default function sendKeyToPm(editorView: EditorView, keys: string) {
  const parts = keys.split(/-(?!'?$)/);
  const modKey = parts.indexOf('Mod') !== -1;
  const cmdKey = parts.indexOf('Cmd') !== -1;
  const ctrlKey = parts.indexOf('Ctrl') !== -1;
  const shiftKey = parts.indexOf('Shift') !== -1;
  const altKey = parts.indexOf('Alt') !== -1;
  const key = parts[parts.length - 1];

  // all of the browsers are using the same keyCode for alphabetical keys
  // and it's the uppercased character code in real world
  const code = keyCodes[key] ? keyCodes[key] : (key.toUpperCase()).charCodeAt(0);

  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });

  (event as any).key = key.replace(/Space/g, ' ');
  (event as any).shiftKey = shiftKey;
  (event as any).altKey = altKey;
  (event as any).ctrlKey = ctrlKey || (!browser.mac && modKey);
  (event as any).metaKey = cmdKey || (browser.mac && modKey);
  (event as any).keyCode = code;
  (event as any).which = code;
  (event as any).view = window;

  (editorView as TestingEditorView).dispatchEvent(event);
}
