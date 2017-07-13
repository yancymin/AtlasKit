import { chaiPlugin, makeEditor } from '@atlaskit/editor-core/dist/es5/test-helper';
import { textFormattingPlugins } from '@atlaskit/editor-core';
import { doc, p, sub, sup, } from './_schema-builder';
import * as chai from 'chai';
import { expect } from 'chai';
import schema from '../../src/schema';

chai.use(chaiPlugin);

describe('Keymaps', () => {
  const editor = (doc: any) => {
    const ed = makeEditor<any>({
      doc,
      schema,
      plugins: textFormattingPlugins(schema)
    });

    afterEach(() => {
      ed.editorView.destroy();
    });

    return ed;
  };

  describe('subscript', () => {
    it('should be able to toggle subscript on a character', () => {
      const { editorView, pluginState } = editor(doc(p('{<}t{>}ext')));

      expect(pluginState.toggleSubscript(editorView));
      expect(editorView.state.doc).to.deep.equal(doc(p(sub('t'), 'ext')));
      expect(pluginState.toggleSubscript(editorView));
      expect(editorView.state.doc).to.deep.equal(doc(p('text')));
    });

    it('deactives superscript after toggling subscript for an empty selection', () => {
      const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

      pluginState.toggleSuperscript(editorView);
      pluginState.toggleSubscript(editorView);
      expect(pluginState.superscriptActive).to.equal(false);
    });

    it('deactives superscript after toggling subscript for selected text', () => {
      const { editorView, pluginState } = editor(doc(p('t{<}e{>}xt')));

      pluginState.toggleSuperscript(editorView);
      pluginState.toggleSubscript(editorView);
      expect(pluginState.superscriptActive).to.equal(false);
    });
  });

  describe('superscript', () => {
    it('should be able to toggle superscript on a character', () => {
      const { editorView, pluginState } = editor(doc(p('{<}t{>}ext')));
      pluginState.toggleSuperscript(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p(sup('t'), 'ext')));
      pluginState.toggleSuperscript(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p('text')));
    });

    it('deactives subscript after toggling superscript for an empty selection', () => {
      const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

      pluginState.toggleSubscript(editorView);
      pluginState.toggleSuperscript(editorView);
      expect(pluginState.subscriptActive).to.equal(false);
    });

    it('deactives subscript after toggling superscript for selected text', () => {
      const { editorView, pluginState } = editor(doc(p('t{<}e{>}xt')));

      pluginState.toggleSubscript(editorView);
      pluginState.toggleSuperscript(editorView);
      expect(pluginState.subscriptActive).to.equal(false);
    });
  });
});
