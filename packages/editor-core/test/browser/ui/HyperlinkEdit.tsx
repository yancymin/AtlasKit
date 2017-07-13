import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';

import hyperlinkPlugins, { HyperlinkState } from '../../../src/plugins/hyperlink';
import HyperlinkEdit from '../../../src/ui/HyperlinkEdit';
import PanelTextInput from '../../../src/ui/PanelTextInput';
import {
  createEvent, doc, p as paragraph, a as link, makeEditor, setTextSelection
} from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

describe('@atlaskit/editor-core/ui/HyperlinkEdit', () => {
  const editor = (doc: any) => makeEditor<HyperlinkState>({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });
  const blurEvent = createEvent('blur');
  const focusEvent = createEvent('focus');

  it('should produce null HTML when another block on editor is focused', () => {
    const { editorView, plugin, pluginState } = editor(doc(paragraph('te{<>}xt'), paragraph('before', link({ href: 'http://www.atlassian.com' })('text'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.onBlur!(editorView, blurEvent);
    expect(hyperlinkEdit.html()).to.equal(null);
  });

  it('should not produce null HTML when a link on editor is focused', () => {
    const { editorView, plugin, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    plugin.props.onFocus!(editorView, focusEvent);
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    expect(hyperlinkEdit.html()).to.not.equal(null);
  });

  it('should produce null HTML when editor is blur', () => {
    const { editorView, plugin, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    plugin.props.onBlur!(editorView, blurEvent);
    expect(hyperlinkEdit.html()).to.equal(null);
  });

  it('should set autoFocus of PanelTextInput to true when link href is not defined', () => {
    const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: '' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    const input = hyperlinkEdit.find(PanelTextInput);
    expect(input.prop('autoFocus')).to.equal(true);
  });

  it('should set state variable autoFocusInput to false when link href is defined', () => {
    const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    editorView.dom.click();
    expect(hyperlinkEdit.state('autoFocusInput')).to.not.equal(true);
  });

  it('should set state variable autoFocusInput to false when link href is defined', () => {
    const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('te{<>}xt'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    editorView.dom.click();
    expect(hyperlinkEdit.state('autoFocusInput')).to.not.equal(true);
  });

  it('should show title input when title and href are same', () => {
    const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('www.atlas{<>}sian.com'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    hyperlinkEdit.setState({ editorFocused: true });
    expect(hyperlinkEdit.find(PanelTextInput).prop('defaultValue')).to.equal('');
    expect(hyperlinkEdit.find(PanelTextInput).prop('placeholder')).to.equal('Text to display');
  });

  it('should show href input when title is defined', () => {
    const { editorView, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('Atlas{<>}sian'), 'after')));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    hyperlinkEdit.setState({ editorFocused: true });
    expect(hyperlinkEdit.find(PanelTextInput).prop('defaultValue')).to.equal('http://www.atlassian.com');
    expect(hyperlinkEdit.find(PanelTextInput).prop('placeholder')).to.equal('Paste link');
  });

  it('should clear data of previous link', () => {
    const { editorView, pluginState } = editor(doc(paragraph(
      'before',
      link({ href: 'http://www.atlassian.com' })('http://www.at{<>}lassian.com'),
      'between',
      link({ href: 'http://www.google.com' })('http://www.google.com'),
      'after'
    )));
    const hyperlinkEdit = mount(<HyperlinkEdit pluginState={pluginState} editorView={editorView} />);
    hyperlinkEdit.setState({ editorFocused: true });
    const input = hyperlinkEdit.find('PanelTextInput').find('input');
    (input.get(0) as any).value = 'Atlasian';
    input.simulate('change');
    input.simulate('keydown', { keyCode: 13 });
    setTextSelection(editorView, 10, 10);
    hyperlinkEdit.setState({ editorFocused: true });
    expect(hyperlinkEdit.find(PanelTextInput).prop('placeholder')).to.equal('Paste link');
    expect(hyperlinkEdit.find(PanelTextInput).prop('defaultValue')).to.equal('http://www.atlassian.com');
    setTextSelection(editorView, 25, 25);
    hyperlinkEdit.setState({ editorFocused: true });
    expect(hyperlinkEdit.find(PanelTextInput).prop('placeholder')).to.equal('Text to display');
    expect(hyperlinkEdit.find(PanelTextInput).prop('defaultValue')).to.equal('');
  });
});
