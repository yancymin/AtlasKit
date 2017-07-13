import * as chai from 'chai';
import { expect } from 'chai';
import codeBlockPlugin from '../../../../src/plugins/code-block';

import {
  chaiPlugin, doc, makeEditor, p, sendKeyToPm, code_block
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('codeBlock - keymaps', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: codeBlockPlugin(defaultSchema),
  });

  describe('Enter keypress', () => {
    context('when enter key is pressed 2 times', () => {
      it('it should not exit code block', () => {
        const { editorView } = editor(doc(code_block()('codeBlock{<>}')));

        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).to.deep.equal(doc(code_block()('codeBlock\n\n')));
      });
    });

    context('when enter key is pressed 3 times', () => {
      it('it should exit code block', () => {
        const { editorView } = editor(doc(code_block()('codeBlock{<>}')));

        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).to.deep.equal(doc(code_block()('codeBlock'), p('{<>}')));
      });
    });
  });
});
