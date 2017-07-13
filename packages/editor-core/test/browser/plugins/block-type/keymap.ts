import * as chai from 'chai';
import { expect } from 'chai';
import blockTypePlugin from '../../../../src/plugins/block-type';

import {
  chaiPlugin, doc, makeEditor, p, sendKeyToPm, insertText, h1
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('codeBlock - keymaps', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: blockTypePlugin(defaultSchema),
  });

  describe('Cmd-z keypress', () => {
    it('should undo last autoformatting', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h1()));
      sendKeyToPm(editorView, 'Mod-z');
      expect(editorView.state.doc).to.deep.equal(doc(p('# ')));
    });
  });
});
