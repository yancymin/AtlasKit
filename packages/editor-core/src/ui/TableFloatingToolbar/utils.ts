import { browser } from '../../prosemirror';
import { Keymap } from '../../keymaps';

export function getShortcut(keymap: Keymap | undefined): string | undefined {
  if (keymap) {
    const shortcutMap = {Cmd: '⌘', Shift: '⇧', Ctrl: '^', Alt: '⌥'};
    const shortcut = browser.mac ? keymap.mac : keymap.windows;
    const arr = shortcut.split('-');
    return `${shortcutMap[arr[0]]} + ${arr[1].toUpperCase()}`;
  }
}
