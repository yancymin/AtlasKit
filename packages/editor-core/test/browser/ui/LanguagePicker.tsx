import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import * as React from 'react';
import codeBlockPlugins, { CodeBlockState } from '../../../src/plugins/code-block';
import { FloatingToolbar } from '../../../src/ui/LanguagePicker/styles';
import Select from '@atlaskit/single-select';
import ToolbarButton from '../../../src/ui/ToolbarButton';
import LanguagePicker from '../../../src/ui/LanguagePicker';
import { code_block, doc, p, makeEditor, createEvent } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';

describe('LanguagePicker', () => {
  const event = createEvent('event');
  const editor = (doc: any) => makeEditor<CodeBlockState>({
    doc,
    plugins: codeBlockPlugins(defaultSchema),
  });

  context('when toolbarVisible is false', () => {
    it('does not render toolbar', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={pluginState} editorView={editorView} />);
      languagePicker.setState({ toolbarVisible: false });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(0);
    });
  });

  context('when toolbarVisible is true', () => {
    it('renders toolbar', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={pluginState} editorView={editorView} />);
      languagePicker.setState({ toolbarVisible: true });

      expect(languagePicker.find(FloatingToolbar)).to.have.length(1);
    });
  });

  context('when languageSelectFocused is true', () => {
    it('renders toolbar', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={pluginState} editorView={editorView} />);
      languagePicker.setState({ languageSelectFocused: true, toolbarVisible: false });

      expect(languagePicker.find(Select)).to.have.length(1);
    });
  });

  context('click on a code block element', () => {
    it('sets toolbarVisible to be true', () => {
      const { editorView, plugin, pluginState, sel } = editor(doc(code_block()('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      plugin.props.onFocus!(editorView, event);
      plugin.props.handleClick!(editorView, sel, event);

      expect(languagePicker.state('toolbarVisible')).to.equal(true);
    });
  });

  context('click on a non code block element', () => {
    it('sets current code-block element to be undefined', () => {
      const { editorView, plugin, pluginState, sel } = editor(doc(p('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      plugin.props.handleClick!(editorView, sel, event);

      expect(languagePicker.state('element')).to.equal(undefined);
    });
  });

  context('editor is blur', () => {
    it('LanguagePicker produce null HTML', () => {
      const { editorView, plugin, pluginState, sel } = editor(doc(p('paragraph'), code_block()('{<}codeBlock{>}')));

      plugin.props.onFocus!(editorView, event);
      plugin.props.handleClick!(editorView, sel, event);

      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      expect(languagePicker.html()).to.not.equal(null);
      plugin.props.onBlur!(editorView, event);
      expect(languagePicker.html()).to.equal(null);
    });
  });

  context('when code block has a language', () => {
    it('shows the formatted language', () => {
      const { editorView, pluginState } = editor(doc(code_block({ language: 'js' })('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      expect(languagePicker.state('language')).to.equal('JavaScript');
    });

    it('updates plugin with the formatted langauge', () => {
      const { editorView, pluginState } = editor(doc(code_block({ language: 'js' })('text')));
      mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      expect(pluginState.language).to.equal('JavaScript');
    });
  });

  context('when code block has no language set', () => {
    it('shows no specific language', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));
      const languagePicker = mount(<LanguagePicker pluginState={pluginState} editorView={editorView} />);

      expect(languagePicker.state('language')).to.equal(undefined);
    });
  });

  describe('TrashIcon', () => {
    it('should be rendered in language picker floating toolbar', () => {
      const { editorView, pluginState } = editor(doc(code_block({ language: 'js' })('text')));

      const languagePicker = shallow(<LanguagePicker pluginState={pluginState} editorView={editorView} />);
      languagePicker.setState({ languageSelectFocused: true, toolbarVisible: false });

      expect(languagePicker.find(ToolbarButton)).to.have.length(1);
    });
  });
});
