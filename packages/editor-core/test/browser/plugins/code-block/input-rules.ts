import * as chai from 'chai';
import { expect } from 'chai';
import codeBlockPlugin from '../../../../src/plugins/code-block';

import {
  chaiPlugin, doc, insertText, li, makeEditor, p, ul
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: codeBlockPlugin(defaultSchema),
  });

  describe('codeblock rule', () => {
    context('when node is not convertable to code block', () => {
      it('should not convert "```" to a code block\t', () => {
        const { editorView, sel } = editor(doc(ul(li(p('{<>}hello')))));

        insertText(editorView, '```', sel);

        expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('```hello')))));
      });
    });

    context('when node is convertable to code block', () => {
      context('when converted node has no content', () => {
        it('should not convert "```" to a code block\t', () => {
          const { editorView, sel } = editor(doc(p('{<>}')));

          insertText(editorView, '```', sel);

          expect(editorView.state.doc).to.deep.equal(doc(p('```')));
        });
      });

    });

  });

});
