import * as chai from 'chai';
import { expect } from 'chai';
import hyperlinkPlugins from '../../../../src/plugins/hyperlink';
import {
  insertText, chaiPlugin, makeEditor, doc, br, p, a as link,
  strong, code_block
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('hyperlink', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });

  describe('input rules', () => {
    it('should convert "www.atlassian.com" to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'www.atlassian.com ', sel, sel);

      const a = link({ href: 'http://www.atlassian.com' })('www.atlassian.com');
      expect(editorView.state.doc).to.deep.equal(doc(p(a, ' ')));
    });

    it('should not convert "www.atlassian.com" to a hyperlink when we haven not hit space afterward', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'www.atlassian.com', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('www.atlassian.com')));
    });

    it('should convert "www.atlassian.com/" to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'www.atlassian.com/ ', sel, sel);

      const a = link({ href: 'http://www.atlassian.com/' })('www.atlassian.com/');
      expect(editorView.state.doc).to.deep.equal(doc(p(a, ' ')));
    });

    it('should convert "http://www.atlassian.com/" to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'http://www.atlassian.com/ ', sel, sel);

      const a = link({ href: 'http://www.atlassian.com/' })('http://www.atlassian.com/');
      expect(editorView.state.doc).to.deep.equal(doc(p(a, ' ')));
    });

    it('should convert "http://www.atlassian.com" to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'http://www.atlassian.com ', sel, sel);

      const a = link({ href: 'http://www.atlassian.com' })('http://www.atlassian.com');
      expect(editorView.state.doc).to.deep.equal(doc(p(a, ' ')));
    });

    it('should convert "https://www.atlassian.com/" to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'https://www.atlassian.com/ ', sel, sel);

      const a = link({ href: 'https://www.atlassian.com/' })('https://www.atlassian.com/');
      expect(editorView.state.doc).to.deep.equal(doc(p(a, ' ')));
    });

    it('should not convert "https://www.atlassian.com" to hyperlink inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));
      insertText(editorView, 'https://www.atlassian.com ', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('https://www.atlassian.com ')));
    });

    it('should not convert "javascript://alert(1) " to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'javascript://alert(1); ', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(p('javascript://alert(1); ')));
    });

    it('should convert prettyandsimple@example.com to a link', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'prettyandsimple@example.com ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(link({ href: 'mailto:prettyandsimple@example.com' })('prettyandsimple@example.com'), ' ')));
    });

    it('should not convert mention like string to a mailto link', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '@example ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('@example ')));
    });

    it('should not convert invalid emails like to a mailto link (no @ simbol)', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'Abc.example.com ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('Abc.example.com ')));
    });

    it('should not convert invalid emails like to a mailto link (double dot)', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, 'john.doe@example..com ', sel, sel);
      expect(editorView.state.doc).to.deep.equal(doc(p('john.doe@example..com ')));
    });

    it('should convert "[text](http://foo)" to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '[text](http://foo)', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(link({ href: 'http://foo' })('text'))));
    });

    it('should convert text with spaces "[text text](http://foo)" to hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      insertText(editorView, '[text text](http://foo)', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(link({ href: 'http://foo' })('text text'))));
    });

    it('should convert "[text](http://foo)" to hyperlink inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));
      insertText(editorView, '[text](http://foo)', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('[text](http://foo)')));
    });

    it('is not part of hyperlink after if I have close my link markdown', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      const linkedText = 'http://foo.com';
      insertText(editorView, `[${linkedText}](http://foo.com)`, sel, sel);
      insertText(editorView, 'hello', sel + linkedText.length, sel + linkedText.length);

      expect(editorView.state.doc).to.deep.equal(doc(p(link({ href: 'http://foo.com' })(`${linkedText}`), 'hello')));
    });

    it('does not convert to hyperlink if the previous part already contains a hyperlink', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));
      const linkedText = 'http://foo.com';
      insertText(editorView, `[${linkedText}](http://foo.com)`, sel, sel);
      insertText(editorView, '. ', sel + linkedText.length, sel + linkedText.length);

      expect(editorView.state.doc).to.deep.equal(doc(p(link({ href: 'http://foo.com' })(`${linkedText}`), '. ')));
    });

    it('does not remove existsing other mark', () => {
      const { editorView, sel } = editor(doc(p(strong('www.{<>}'))));
      insertText(editorView, 'google.com ', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(link({ href: 'http://www.google.com' })(strong('www.google.com')), strong(' '))));
    });

    it('converts to hyperlink if possible hyperink text is after a new line and previous line has an hyperlink', () => {
      const firstLink = link({ href: 'http://www.google.com' })('www.google.com');
      const secondLink = link({ href: 'http://www.baidu.com' })('www.baidu.com');
      const { editorView, sel } = editor(doc(p(firstLink, br, p('{<>}'))));
      insertText(editorView, 'www.baidu.com ', sel, sel);

      expect(editorView.state.doc).to.deep.equal(doc(p(firstLink, br, p(secondLink, ' '))));
    });
  });
});
