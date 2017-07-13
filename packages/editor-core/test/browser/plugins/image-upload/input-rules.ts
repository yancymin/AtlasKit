import * as chai from 'chai';
import { expect } from 'chai';
import imageUploadPlugins from '../../../../src/plugins/image-upload';
import {
  chaiPlugin, doc, insertText, makeEditor, p, img, code_block
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('inputrules', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: imageUploadPlugins(defaultSchema),
  });

  describe('image rule', () => {
    it('should convert `![text](url)` to image', () => {
      const { editorView, sel } = editor(doc(p('{<>}')));

      insertText(editorView, '![text](url)', sel);
      expect(editorView.state.doc).to.deep.equal(doc(p(img({ src: 'url', alt: 'text', title: 'text' }))));
    });

    it('should not convert `![text](url)` to image inside a code_block', () => {
      const { editorView, sel } = editor(doc(code_block()('{<>}')));

      insertText(editorView, '![text](url)', sel);
      expect(editorView.state.doc).to.deep.equal(doc(code_block()('![text](url)')));
    });
  });
});
