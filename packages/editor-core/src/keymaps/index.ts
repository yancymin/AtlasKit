import { browser, EditorState, Transaction } from '../prosemirror';

export const toggleOrderedList = makeKeyMapWithCommon('Numbered list', 'Mod-Shift-l');
export const toggleBulletList = makeKeyMapWithCommon('Bullet list', 'Mod-Shift-b');
export const toggleBold = makeKeyMapWithCommon('Bold', 'Mod-b');
export const toggleItalic = makeKeyMapWithCommon('Italic', 'Mod-i');
export const toggleUnderline = makeKeyMapWithCommon('Underline', 'Mod-u');
export const toggleStrikethrough = makeKeyMapWithCommon('Strikethrough', 'Mod-Shift-s');
export const toggleCode = makeKeyMapWithCommon('Code', 'Mod-Shift-m');
export const setNormalText = makeKeymap('Normal text', 'Ctrl-0', 'Cmd-Alt-0');
export const clearFormatting = makeKeyMapWithCommon('Clear formatting', 'Mod-\\');
export const toggleHeading1 = makeKeymap('Heading 1', 'Ctrl-1', 'Cmd-Alt-1');
export const toggleHeading2 = makeKeymap('Heading 2', 'Ctrl-2', 'Cmd-Alt-2');
export const toggleHeading3 = makeKeymap('Heading 3', 'Ctrl-3', 'Cmd-Alt-3');
export const toggleHeading4 = makeKeymap('Heading 4', 'Ctrl-4', 'Cmd-Alt-4');
export const toggleHeading5 = makeKeymap('Heading 5', 'Ctrl-5', 'Cmd-Alt-5');
export const toggleBlockQuote = makeKeymap('Block quote', 'Ctrl-7', 'Cmd-Alt-7');
export const toggleCodeBlock = makeKeymap('Code block', 'Ctrl-8', 'Cmd-Alt-8');
export const togglePanel = makeKeymap('Panel', 'Ctrl-9', 'Cmd-Alt-9');
export const insertNewLine = makeKeyMapWithCommon('Insert new line', 'Shift-Enter');
export const shiftBackspace = makeKeyMapWithCommon('Shift Backspace', 'Shift-Backspace');
export const splitCodeBlock = makeKeyMapWithCommon('Split code block', 'Enter');
export const splitListItem = makeKeyMapWithCommon('Split list item', 'Enter');
export const insertRule = makeKeyMapWithCommon('Insert horizontal rule', 'Mod-Shift--');
export const undo = makeKeyMapWithCommon('Undo', 'Mod-z');
export const createCodeBlock = makeKeyMapWithCommon('Create code block', 'Enter');
export const moveUp = makeKeyMapWithCommon('Move up', 'ArrowUp');
export const moveDown = makeKeyMapWithCommon('Move down', 'ArrowDown');
export const indentList = makeKeyMapWithCommon('Indent List', 'Tab');
export const outdentList = makeKeyMapWithCommon('Outdent List', 'Shift-Tab');
export const redo = makeKeymap('Redo', 'Ctrl-y', 'Cmd-Shift-z');
export const redoBarred = makeKeymap('Redo Barred', 'Ctrl-Shift-z', 'Cmd-y');
export const addLink = makeKeyMapWithCommon('Insert link', 'Mod-k');
export const enter = makeKeyMapWithCommon('Enter', 'Enter');
export const tab = makeKeyMapWithCommon('Tab', 'Tab');
export const space = makeKeyMapWithCommon('Space', 'Space');
export const escape = makeKeyMapWithCommon('Escape', 'Escape');
export const nextCell = makeKeyMapWithCommon('Next cell', 'Tab');
export const previousCell = makeKeyMapWithCommon('Previous cell', 'Shift-Tab');
export const toggleTable = makeKeyMapWithCommon('Table', 'Shift-Alt-t');
export const cut = makeKeyMapWithCommon('Cut', 'Mod-x');
export const copy = makeKeyMapWithCommon('Copy', 'Mod-c');
export const paste = makeKeyMapWithCommon('Paste', 'Mod-v');

export function tooltip(keymap: Keymap | undefined): string | undefined {
  if (keymap) {
    let shortcut;
    if (browser.mac) {
      shortcut = keymap.mac
        .replace(/Cmd/i, '⌘')
        .replace(/Shift/i, '⇧')
        .replace(/Ctrl/i, '^')
        .replace(/Alt/i, '⌥');
    } else {
      shortcut = keymap.windows;
    }
    return `${keymap.description} (${shortcut})`;
  }
}

export function findKeymapByDescription(description: string): Keymap | undefined {
  const matches = ALL.filter((keymap) => (keymap.description.toUpperCase() === description.toUpperCase()));
  return matches[0];
}

export function findShortcutByDescription(description: string): string | undefined {
  const keymap = findKeymapByDescription(description);
  if (keymap) {
    return findShortcutByKeymap(keymap);
  }
}

export function findShortcutByKeymap(keymap: Keymap): string | undefined {
  if (browser.mac) {
    return keymap.mac;
  }

  return keymap.windows;
}

const ALL = [toggleOrderedList, toggleBulletList, toggleBold, toggleItalic,
  toggleUnderline, toggleStrikethrough, toggleCode,
  setNormalText, toggleHeading1, toggleHeading2, toggleHeading3, toggleHeading4, toggleHeading5,
  toggleBlockQuote, toggleCodeBlock, togglePanel, insertNewLine, insertRule,
  splitCodeBlock, splitListItem, redo, undo];

function makeKeymap(description: string, windows: string, mac: string, common?: string): Keymap {
  return {
    description: description,
    windows: windows,
    mac: mac,
    common: common
  };
}

function makeKeyMapWithCommon(description: string, common: string): Keymap {
  const windows = common.replace(/Mod/i, 'Ctrl');
  const mac = common.replace(/Mod/i, 'Cmd');
  return makeKeymap(description, windows, mac, common);
}

export interface Keymap {
  description: string;
  windows: string;
  mac: string;
  common?: string;
}

export function bindKeymapWithCommand(shortcut: string, cmd: (state: EditorState<any>, dispatch: (tr: Transaction) => void) => boolean, keymap: { [key: string]: Function }) {
  const oldCmd = keymap[shortcut];
  let newCmd = cmd;
  if (keymap[shortcut]) {
    newCmd = (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
      return oldCmd(state, dispatch) || cmd(state, dispatch);
    };
  }
  keymap[shortcut] = newCmd;
}

export function findKeyMapForBrowser(kayMap: Keymap): string | undefined {
  if (kayMap) {
    if (browser.mac) {
      return kayMap.mac;
    }

    return kayMap.windows;
  }
}

export const keyCodes: { [key: string]: number } = {
  'Enter': 13, 'Backspace': 8, 'Tab': 9, 'Shift': 16, 'Ctrl': 17, 'Alt': 18, 'Pause': 19, 'CapsLock': 20, 'Esc': 27, 'Space': 32,
  'PageUp': 63276, 'PageDown': 63277, 'End': 63275, 'Home': 63273, 'Left': 63234, 'Up': 63232, 'Right': 63235, 'Down': 63233,
  'PrintScrn': 44, 'Insert': 63302, 'Delete': 63272, ';': 186, '=': 187, 'Mod': 93, '*': 106, '-': 189, '.': 190, '/': 191, ',': 188,
  '`': 192, '[': 219, '\\': 220, ']': 221, '\'': 222
};
