import { expect } from 'chai';
import * as sinon from 'sinon';
import panelPlugins, { PanelState } from '../../../../src/plugins/panel';
import { doc, panel, panelNote, p, makeEditor, createEvent, sendKeyToPm, blockquote } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core ui/PanelPlugin', () => {
  const event = createEvent('event');
  const editor = (doc: any) => makeEditor<PanelState>({
    doc,
    plugins: panelPlugins(defaultSchema),
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      pluginState.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.callCount).to.equal(1);
    });

    it('should call subscribers with argument panel state', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.calledWith(pluginState)).to.equal(true);
    });

    it('should call subscribers when panel is clicked', () => {
      const { editorView, plugin, pluginState, sel } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.handleClick!(editorView, sel, event);
      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers when another block in editor is clicked', () => {
      const { editorView, plugin, pluginState, sel } = editor(doc(p('te{<>}xt'), panel(p('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.handleClick!(editorView, sel, event);
      expect(spy.callCount).to.equal(1);
    });

    it('should call subscribers when panel was focused and editor blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.onFocus!(editorView, event);
      plugin.props.onBlur!(editorView, event);
      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers when another block was focused and editor blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.onFocus!(editorView, event);
      plugin.props.onBlur!(editorView, event);
      expect(spy.callCount).to.equal(1);
    });

    it('should not call subscribers when panel received focus', () => {
      const { editorView, plugin, pluginState } = editor(doc(panel(p('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      plugin.props.onFocus!(editorView, event);
      expect(spy.callCount).to.equal(1);
    });

    it('should be able to identify panel node', () => {
      const { pluginState } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.element).to.not.equal(undefined);
    });

    it('should be able to change panel type using function changeType', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.activePanelType).to.equal('info');
      expect(pluginState.element).to.not.equal(undefined);
      expect(pluginState.activePanelType).to.not.equal(undefined);
      pluginState.changePanelType(editorView, { panelType: 'note' });
      expect(pluginState.activePanelType).to.equal('note');
    });

    it('should be able to change panel type using function changeType for panel with multiple blocks', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'), p('text'))));
      pluginState.changePanelType(editorView, { panelType: 'note' });
      expect(editorView.state.doc).to.deep.equal(doc(panelNote(p('text'), p('text'))));
    });

    it('should be able to remove panel type using function removePanel', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.removePanel(editorView);
      expect(pluginState.element).to.equal(undefined);
    });

    it('should be able to remove panel for panel of multiple blocks using function removePanel', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'), p('text'))));
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.removePanel(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p()));
    });

    it('should not remove enclosing block while removing panel', () => {
      const { pluginState, editorView } = editor(doc(blockquote(panel(p('te{<>}xt'), p('text')))));
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.removePanel(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p())));
    });

    it('should call handlers for change in panel type', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.callCount).to.equal(1);
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.changePanelType(editorView, { panelType: 'note' });
      expect(pluginState.activePanelType).to.equal('note');
      expect(spy.callCount).to.equal(2);
    });

    it('shoul call handlers when panel is removed', () => {
      const { pluginState, editorView } = editor(doc(panel(p('te{<>}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);
      expect(spy.callCount).to.equal(1);
      expect(pluginState.activePanelType).to.equal('info');
      pluginState.removePanel(editorView);
      expect(spy.callCount).to.equal(2);
    });

  });

  describe('toolbarVisible', () => {
    context('when editor is blur', () => {
      it('it is false', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
        plugin.props.onFocus!(editorView, event);
        plugin.props.onBlur!(editorView, event);
        expect(pluginState.toolbarVisible).to.equal(false);
      });
    });
  });

  describe('editorFocued', () => {
    context('when editor is focused', () => {
      it('it is true', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
        plugin.props.onFocus!(editorView, event);
        expect(pluginState.editorFocused).to.equal(true);
      });
    });

    context('when editor is blur', () => {
      it('it is false', () => {
        const { editorView, plugin, pluginState } = editor(doc(p('te{<>}xt'), panel(p('text'))));
        plugin.props.onFocus!(editorView, event);
        plugin.props.onBlur!(editorView, event);
        expect(pluginState.editorFocused).to.equal(false);
      });
    });
  });

  describe('keyMaps', () => {
    context('when Enter key is pressed', () => {
      it('a new paragraph should be created in panel', () => {
        const { editorView } = editor(doc(panel(p('text{<>}'))));
        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).to.deep.equal(doc(panel(p('text'), p())));
      });
    });

    context('when Enter key is pressed twice', () => {
      it('a new paragraph should be created outside panel', () => {
        const { editorView } = editor(doc(panel(p('text{<>}'))));
        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).to.deep.equal(doc(panel(p('text')), p()));
      });
    });
  });

});
