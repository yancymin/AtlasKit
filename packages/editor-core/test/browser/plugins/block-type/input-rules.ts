import * as chai from 'chai';
import { expect } from 'chai';
import { default as blockTypePlugins, BlockTypeState } from '../../../../src/plugins/block-type';
import {
  sendKeyToPm, blockquote, br, code_block, chaiPlugin, doc, h1, h2, h3, insertText, li, makeEditor, p, ul
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => makeEditor<BlockTypeState>({
    doc,
    plugins: blockTypePlugins(defaultSchema),
  });

  describe('heading rule', () => {
    it('should convert "# " to heading 1', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h1()));
    });

    it('should convert "# " to heading 1 inside list', () => {
      const { editorView, sel } = editor(doc(ul(li(p('{<>}')))));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(h1()))));
    });

    it('should not convert "# " to heading 1 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '# ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('# ')));
    });

    it('should convert "## " to heading 2', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '## ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h2()));
    });

    it('should not convert "## " to heading 1 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '## ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('## ')));
    });

    it('should convert "### " to heading 3', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '### ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(h3()));
    });

    it('should not convert "### " to heading 1 when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '### ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('### ')));
    });
  });

  describe('blockquote rule', () => {
    it('should convert "> " to a blockquote', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p())));
    });

    it('should convert "> " to a blockquote inside list', () => {
      const { editorView, sel } = editor(doc(ul(li(p('{<>}')))));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(blockquote(p())))));
    });

    it('should convert "> " to a blockquote when inside another blockquote (nesting)', () => {
      const { editorView, sel } = editor(doc(blockquote(p('{<>}'))));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(blockquote(p()))));
    });

    it('should not convert "> " to a blockquote when inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '> ', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('> ')));
    });
  });

  describe('codeblock rule', () => {
    context('when node is convertable to code block', () => {
      context('when converted node has content', () => {
        it('should convert "```" to a code block', () => {
          const { editorView, sel } = editor(doc(p('{<>}hello', br, 'world')));

          insertText(editorView, '```', sel);
          expect(editorView.state.doc).to.deep.equal(doc(code_block()('hello\nworld')));
        });
      });

      context('when there are more than 3 backticks', () => {
        it('should convert "`````js" to a code block with attr "language: js"', () => {
          const { editorView } = editor(doc(p('`````js{<>}')));
          sendKeyToPm(editorView, 'Enter');
          expect(editorView.state.doc).to.deep.equal(doc(code_block({ language: 'js' })('')));
        });
      });
    });
  });
});
