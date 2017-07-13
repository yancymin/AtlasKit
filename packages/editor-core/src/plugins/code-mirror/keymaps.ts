import { Selection, keymap, TextSelection, Plugin, EditorState, EditorView, Transaction } from '../../prosemirror';

export default function codeMirrorKeymapsPlugin(): Plugin {
  return keymap({
    ArrowLeft: arrowHandler('left'),
    ArrowRight: arrowHandler('right'),
    ArrowUp: arrowHandler('up'),
    ArrowDown: arrowHandler('down')
  });
}

function arrowHandler(dir: 'up' | 'down' | 'left' | 'right') {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void, view: EditorView) => {
    if (state.selection.empty && view.endOfTextblock(dir)) {
      const side = dir === 'left' || dir === 'up' ? -1 : 1;
      const { $head } = state.selection;
      const nextPos = Selection.near(state.doc.resolve(side > 0 ? $head.after() : $head.before()), side) as TextSelection;
      if (nextPos.$head && nextPos.$head.parent.type.name === 'codeBlock') {
        dispatch(state.tr.setSelection(nextPos));
        return true;
      }
    }
    return false;
  };
}
