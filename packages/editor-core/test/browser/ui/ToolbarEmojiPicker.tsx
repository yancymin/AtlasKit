import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import emojiPlugins, { EmojiState } from '../../../src/plugins/emojis';
import ToolbarEmojiPicker from '../../../src/ui/ToolbarEmojiPicker';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { doc, p, makeEditor, emoji } from '../../../src/test-helper';
import defaultSchema from '../../../src/test-helper/schema';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import { EmojiPicker as AkEmojiPicker } from '@atlaskit/emoji';
import ProviderFactory from '../../../src/providerFactory';

const emojiProvider = emojiData.emojiTestData.getEmojiResourcePromise();
const grinEmoji = emojiData.emojiTestData.grinEmoji;
const grinEmojiId = {
  shortName: grinEmoji.shortName,
  id: grinEmoji.id,
  fallback: grinEmoji.fallback,
};

// TODO: Unskip this test in: https://product-fabric.atlassian.net/browse/ED-2201
describe.skip('@atlaskit/editor-core/ui/ToolbarEmojiPicker', () => {
  const editor = (doc: any) => makeEditor<EmojiState>({
    doc,
    plugins: emojiPlugins(defaultSchema, new ProviderFactory()),
  });

  it('should have state variable isOpen set to true when toolbar emoji button is clicked', () => {
    const { editorView, pluginState } = editor(doc(p('')));
    const toolbarEmojiPicker = mount(<ToolbarEmojiPicker pluginState={pluginState} emojiProvider={emojiProvider} editorView={editorView} />);
    toolbarEmojiPicker.find(EmojiIcon).simulate('click');
    expect(toolbarEmojiPicker.state('isOpen')).to.equal(true);
  });

  it('should render the picker if the button has been clicked once', () => {
    const { pluginState, editorView } = editor(doc(p('')));
    const toolbarEmojiPicker = mount(<ToolbarEmojiPicker pluginState={pluginState} emojiProvider={emojiProvider} editorView={editorView} />);
    toolbarEmojiPicker.find(EmojiIcon).simulate('click');

    expect(toolbarEmojiPicker.find(AkEmojiPicker)).to.have.length(1);
  });

  it('should not render the picker if the button has not been clicked', () => {
    const { pluginState, editorView } = editor(doc(p('')));
    const toolbarEmojiPicker = mount(<ToolbarEmojiPicker pluginState={pluginState} emojiProvider={emojiProvider} editorView={editorView} />);

    expect(toolbarEmojiPicker.find(AkEmojiPicker)).to.have.length(0);
  });

  it('should have an onSelection handler in the rendered picker', () => {
    const { pluginState, editorView } = editor(doc(p('')));
    const toolbarEmojiPicker = mount(<ToolbarEmojiPicker pluginState={pluginState} emojiProvider={emojiProvider} editorView={editorView} />);
    toolbarEmojiPicker.find(EmojiIcon).simulate('click');
    const picker = toolbarEmojiPicker.find(AkEmojiPicker);
    expect(picker.prop('onSelection')).to.not.equal(undefined);
  });

  it('should insert an emoji into editor if the picker registers a selection', () => {
    const { pluginState, editorView } = editor(doc(p('')));
    const toolbarEmojiPicker = mount(<ToolbarEmojiPicker pluginState={pluginState} emojiProvider={emojiProvider} editorView={editorView} />);
    toolbarEmojiPicker.find(EmojiIcon).simulate('click');
    const onSelection = toolbarEmojiPicker.find(AkEmojiPicker).prop('onSelection');
    onSelection!(grinEmojiId, grinEmoji);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(
          emoji(grinEmojiId),
          ' '
        )
      )
    );
  });

  it('should close the picker if an external node is clicked', () => {
    const { pluginState, editorView } = editor(doc(p('')));
    const toolbarEmojiPicker = mount(<ToolbarEmojiPicker pluginState={pluginState} emojiProvider={emojiProvider} editorView={editorView} />);
    toolbarEmojiPicker.find(EmojiIcon).simulate('click');
    toolbarEmojiPicker.find(EmojiIcon).parent().simulate('click');

    expect(toolbarEmojiPicker.state('isOpen')).to.equal(false);
  });

});
