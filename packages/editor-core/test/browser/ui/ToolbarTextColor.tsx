import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import textColorPlugin, { TextColorState } from '../../../src/plugins/text-color';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import ToolbarTextColor from '../../../src/ui/ToolbarTextColor';
import { doc, code_block, p, makeEditor } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

const noop = () => { };

describe('ToolbarTextColor', () => {
  const editor = (doc: any) => makeEditor<TextColorState>({
    doc,
    plugins: textColorPlugin(defaultSchema),
  });

  context('when plugin is enabled', () => {
    it('sets disabled to false', () => {
      const { editorView, pluginState } = editor(doc(p('text')));
      const toolbarTextColor = mount(
        <ToolbarTextColor
          pluginState={pluginState}
          editorView={editorView}
          focusEditor={noop}
          softBlurEditor={noop}
        />
      );

      expect(toolbarTextColor.state('disabled')).to.equal(false);
    });
  });

  context('when plugin is not enabled', () => {
    it('sets disabled to true', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));
      const toolbarTextColor = mount(
        <ToolbarTextColor
          pluginState={pluginState}
          editorView={editorView}
          focusEditor={noop}
          softBlurEditor={noop}
        />
      );

      expect(toolbarTextColor.state('disabled')).to.equal(true);
    });
  });

  it('should make isOpen true when toolbar textColor button is clicked', () => {
    const { pluginState, editorView } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextColor
        pluginState={pluginState}
        editorView={editorView}
        focusEditor={noop}
        softBlurEditor={noop}
      />
    );

    expect(toolbarTextColor.state('isOpen')).to.equal(false);
    toolbarTextColor.find('button').simulate('click');
    expect(toolbarTextColor.state('isOpen')).to.equal(true);
  });

  it('should make isOpen false when a color is clicked', () => {
    const { pluginState, editorView } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextColor
        pluginState={pluginState}
        editorView={editorView}
        focusEditor={noop}
        softBlurEditor={noop}
      />
    );

    toolbarTextColor.find('button').simulate('click');
    expect(toolbarTextColor.state('isOpen')).to.equal(true);
    toolbarTextColor.find('ColorPalette button').first().simulate('click');
    expect(toolbarTextColor.state('isOpen')).to.equal(false);
  });

  it('should render disabled ToolbarButton if disabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextColor
        disabled={true}
        pluginState={pluginState}
        editorView={editorView}
        focusEditor={noop}
        softBlurEditor={noop}
      />
    );

    expect(toolbarTextColor.find(ToolbarButton).prop('disabled')).to.equal(true);
  });
});
