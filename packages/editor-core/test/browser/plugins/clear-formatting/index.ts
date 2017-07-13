import { expect } from 'chai';
import * as chai from 'chai';

import { browser } from '../../../../src/prosemirror';
import clearFormattingPlugins, { ClearFormattingState } from '../../../../src/plugins/clear-formatting';
import {
  a as link, blockquote, chaiPlugin, code_block, code, doc, em, h1,
  li, makeEditor, ol, p, panel, sendKeyToPm, strike, strong, underline
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('clear-formatting', () => {
  const editor = (doc: any) => makeEditor<ClearFormattingState>({
    doc,
    plugins: clearFormattingPlugins(defaultSchema),
  });

  describe('formattingIsPresent', () => {
    it('should be true if some marks are present', () => {
      const { pluginState } = editor(doc(p(strong('t{<ex>}t'))));
      expect(pluginState.formattingIsPresent).to.equal(true);
    });

    it('should be true if code blocks is present', () => {
      const { pluginState } = editor(doc(p('paragraph'), code_block({ language: 'java' })('code{<>}Block')));
      expect(pluginState.formattingIsPresent).to.equal(true);
    });

    it('should be false if no marks are present', () => {
      const { pluginState } = editor(doc(p('text')));
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should be false if all present marks are cleared', () => {
      const { editorView, pluginState } = editor(doc(p(strong('{<}text{>}'))));

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should be false if all present blocks are cleared', () => {
      const { editorView, pluginState } = editor(doc(p('paragraph'), code_block({ language: 'java' })('code{<>}Block')));
      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should be false if all present marks and blocks are cleared', () => {
      const { editorView, pluginState } = editor(doc(p('parag{<raph'), code_block({ language: 'java' })('code>}Block')));
      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });
  });

  describe('clearFormatting', () => {
    [
      { nodeName: 'strong', nodeType: strong },
      { nodeName: 'italic', nodeType: em },
      { nodeName: 'underline', nodeType: underline },
      { nodeName: 'monospace', nodeType: code },
      { nodeName: 'strikeout', nodeType: strike },
    ].forEach(({ nodeName, nodeType }) => {
      it(`should clear ${nodeName} if present`, () => {
        const { editorView, pluginState } = editor(doc(p(nodeType('t{<}ex{>}t'))));
        expect(pluginState.formattingIsPresent).to.equal(true);

        pluginState.clearFormatting(editorView);
        expect(pluginState.formattingIsPresent).to.equal(false);
      });
    });

    it('should remove heading blocks if present', () => {
      const { editorView, pluginState } = editor(doc(h1(strike('t{<}ex{>}t'))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should remove panel block if present', () => {
      const { editorView, pluginState } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should remove panel block even if selection is at the end of the block', () => {
      const { editorView, pluginState } = editor(doc(panel(p('text{<>}'))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should remove block-quote if present', () => {
      const { editorView, pluginState } = editor(doc(blockquote(p('te{<>}xt'))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should remove link if present', () => {
      const { editorView, pluginState } = editor(doc(p(link({ href: 'http://www.atlassian.com' })('t{<}ex{>}t'))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should remove ordered list item if present', () => {
      const { editorView, pluginState } = editor(doc(ol(li(p('te{<>}xt')))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should remove nested ordered list item if present', () => {
      const { editorView, pluginState } = editor(doc(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('text')))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });

    it('should remove nested ordered list item of type panel', () => {
      const { editorView, pluginState } = editor(doc(ol(li(panel(p('text'))))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).not.to.equal(true);
    });

    it('should remove nested ordered list item even if selection is on partial list', () => {
      const { editorView, pluginState } = editor(doc(ol(li(p('text'), ol(li(p('te{<>}xt')), li(p('text')))), li(p('text')))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      pluginState.clearFormatting(editorView);
      expect(pluginState.formattingIsPresent).to.equal(false);
    });
  });

  describe('keymap', () => {
    it('should clear formatting', () => {
      const { editorView, pluginState } = editor(doc(p(strong('t{<}ex{>}t'))));
      expect(pluginState.formattingIsPresent).to.equal(true);

      if (browser.mac) {
        sendKeyToPm(editorView, 'Cmd-\\');
      } else {
        sendKeyToPm(editorView, 'Ctrl-\\');
      }

      expect(pluginState.formattingIsPresent).to.equal(false);
    });
  });
});
