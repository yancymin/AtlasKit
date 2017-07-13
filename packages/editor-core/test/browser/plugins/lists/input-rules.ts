import * as chai from 'chai';
import { expect } from 'chai';
import listsInputRulesPlugin from '../../../../src/plugins/lists/input-rule';
import {
  insertText,
  blockquote, chaiPlugin, code_block, doc, h1,
  li, makeEditor, ol, p, ul
} from '../../../../src/test-helper';
import schema from '../../../../src/test-helper/schema';
chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugin: listsInputRulesPlugin(schema)
  });

  describe('bullet list rule', () => {
    it('should convert "* " to a bullet list item', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p()))));
    });

    it('should convert "* " to a bullet list item when inside a blockquote', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(ul(li(p())))));
    });

    it('should be not be possible to convert a code_clock to a list item', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('* ')));
    });

    it('should be possible to convert a heading block to a list item', () => {
      const { editorView, sel } = editor(doc(h1('{<>}')));
      insertText(editorView, '* ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(h1()))));
    });
  });

  describe('ordered list rule', () => {
    it('should convert "[number]. " to a ordered list item', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '1. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should always begin a new list on 1', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '3. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ol(li(p()))));
    });

    it('should convert "[number]. " to a ordered list item when inside a blockquote', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));

      insertText(editorView, '1. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(ol(li(p())))));
    });

    it('should be possible to convert code block to bullet list item', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '1. ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('1. ')));
    });
  });
});
