import { chaiPlugin, createEvent, dispatchPasteEvent, fixtures, sendKeyToPm, insertText } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as chai from 'chai';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import stringRepeat from '../../src/util/string-repeat';

import { analyticsService, browser, EditorView } from '@atlaskit/editor-core';

import Editor from '../../src/index';

chai.use(chaiPlugin);

describe('@atlaskit/editor-bitbucket/analytics/start-event', () => {
  const fixture = fixtures();
  let editorWrapper;
  beforeEach(() => {
    editorWrapper = mount(<Editor />, { attachTo: fixture() });
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('atlassian.editor.start', () => {
    const handler = sinon.spy();
    analyticsService.handler = handler;

    editorWrapper.setProps({ analyticsHandler: handler });

    expect(handler.called).to.equal(false);

    editorWrapper.find('ChromeCollapsed').simulate('focus');
    expect(handler.callCount).to.equal(1);
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);
  });

  it('atlassian.editor.start with two child editors sharing a handler', () => {
    const handler = sinon.spy();
    analyticsService.handler = handler;

    class ContainerWithTwoEditors extends React.PureComponent<{}, {}> {
      render() {
        return (
          <div>
            <Editor isExpandedByDefault={true} analyticsHandler={handler} />
            <Editor isExpandedByDefault={true} analyticsHandler={handler} />
          </div>
        );
      }
    }

    expect(handler.called).to.equal(false);
    const container = mount(<ContainerWithTwoEditors />, { attachTo: fixture() });
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);
    expect(handler.callCount).to.equal(2);
    container.unmount();
  });

  it('editor.start must not be called when unmounting component', () => {
    const handler = sinon.spy();
    analyticsService.handler = handler;

    editorWrapper.setProps({ analyticsHandler: handler });
    editorWrapper.setState({ isExpanded: true });

    expect(handler.callCount).to.equal(1);
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);
  });
});

describe('@atlaskit/editor-bitbucket/analytics/analyticsHandler', () => {
  const fixture = fixtures();

  it('updates analytics handler when provided via property', () => {
    const handler = sinon.spy();
    const editorWrapper = mount(<Editor analyticsHandler={handler} />, { attachTo: fixture() });
    expect(handler.called).to.equal(false);

    editorWrapper.find('ChromeCollapsed').simulate('focus');
    expect(handler.callCount).to.equal(1);
    expect(handler.calledWith('atlassian.editor.start')).to.equal(true);

    editorWrapper.unmount();
  });
});

describe('@atlaskit/editor-bitbucket/analytics/formatting', () => {
  const fixture = fixtures();
  let editorView;
  let handler;
  let editor: ReactWrapper<any, any>;
  let editorAPI: Editor | null;

  beforeEach(() => {
    const noop = () => { };
    handler = sinon.spy();

    editor = mount(
      <Editor isExpandedByDefault={true} onCancel={noop} onSave={noop} imageUploadHandler={noop} analyticsHandler={handler} />,

      // We need to attach the editor to DOM because ProseMirror depends on having
      // focus on the content area (detached DOM elements can not receive focus)
      { attachTo: fixture() }
    );

    editorAPI = editor.get(0) as any;
    editorView = editorAPI!.state!.editorView as EditorView;
  });

  afterEach(() => {
    editor.unmount();
  });

  it('atlassian.editor.format.clear.keyboard', () => {
    sendKeyToPm(editorView, 'Mod-\\');
    expect(handler.calledWith('atlassian.editor.format.clear.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.hyperlink.button', () => {
    const toolbar = editor.find('ToolbarHyperlink');

    toolbar
      .find('EditorLinkIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.hyperlink.button')).to.equal(true);
  });

  it('atlassian.editor.format.hyperlink.autoformatting with url format', () => {
    insertText(editorView, 'www.google.com ', 1);
    expect(handler.calledWith('atlassian.editor.format.hyperlink.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.hyperlink.autoformatting with markdown format', () => {
    insertText(editorView, '[hello](www.google.com)', 1);
    expect(handler.calledWith('atlassian.editor.format.hyperlink.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.hyperlink.keyboard', () => {
    sendKeyToPm(editorView, 'Mod-k');
    expect(handler.calledWith('atlassian.editor.format.hyperlink.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.strong.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find('EditorBoldIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.strong.button')).to.equal(true);
  });

  it('atlassian.editor.format.strong.keyboard', () => {
    sendKeyToPm(editorView, 'Mod-b');
    expect(handler.calledWith('atlassian.editor.format.strong.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.strong.autoformatting', () => {
    insertText(editorView, '**text**', 1);
    expect(handler.calledWith('atlassian.editor.format.strong.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.em.button', () => {
    editor
      .find('ToolbarTextFormatting')
      .find('EditorItalicIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.em.button')).to.equal(true);
  });

  it('atlassian.editor.format.em.autoformatting', () => {
    insertText(editorView, '*text*', 1);
    expect(handler.calledWith('atlassian.editor.format.em.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.em.keyboard', () => {
    sendKeyToPm(editorView, 'Mod-i');
    expect(handler.calledWith('atlassian.editor.format.em.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.code.keyboard', () => {
    sendKeyToPm(editorView, 'Mod-Shift-m');
    expect(handler.calledWith('atlassian.editor.format.code.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.code.autoformatting', () => {
    insertText(editorView, '`text`', 1);
    expect(handler.calledWith('atlassian.editor.format.code.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.list.numbered.keyboard', () => {
    sendKeyToPm(editorView, 'Shift-Mod-l');
    expect(handler.calledWith('atlassian.editor.format.list.numbered.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.list.numbered.autoformatting', () => {
    insertText(editorView, '1. ', 1);
    expect(handler.calledWith('atlassian.editor.format.list.numbered.autoformatting')).to.equal(true);
  });

  // Unskip it in: https://product-fabric.atlassian.net/browse/ED-2214
  it.skip('atlassian.editor.format.list.numbered.button', () => {
    editor
      .find('ToolbarLists')
      .find('EditorBulletListIconIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.list.numbered.button')).to.equal(true);
  });

  // Unskip it in: https://product-fabric.atlassian.net/browse/ED-2214
  it.skip('atlassian.editor.format.list.bullet.button', () => {
    editor
      .find('ToolbarLists')
      .find('EditorBulletListIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.format.list.bullet.button')).to.equal(true);
  });

  it('atlassian.editor.format.list.bullet.keyboard', () => {
    sendKeyToPm(editorView, 'Shift-Mod-b');
    expect(handler.calledWith('atlassian.editor.format.list.bullet.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.list.bullet.autoformatting', () => {
    insertText(editorView, '* ', 1);
    expect(handler.calledWith('atlassian.editor.format.list.bullet.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.feedback.button', () => {
    window.jQuery = { ajax() { } };
    const noop = () => { };

    editor = mount(
      <Editor isExpandedByDefault={true} onCancel={noop} onSave={noop} imageUploadHandler={noop} analyticsHandler={handler} />,

      // We need to attach the editor to DOM because ProseMirror depends on having
      // focus on the content area (detached DOM elements can not receive focus)
      { attachTo: fixture() }
    );

    editor
      .find('ToolbarFeedback > ToolbarButton')
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.feedback.button')).to.equal(true);
  });

  it('atlassian.editor.stop.save', () => {
    editor
      .find('AkButton')
      .filterWhere(n => n.text() === 'Save')
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.stop.save')).to.equal(true);
  });

  it('atlassian.editor.stop.cancel', () => {
    editor
      .find('AkButton')
      .filterWhere(n => n.text() === 'Cancel')
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.stop.cancel')).to.equal(true);
  });

  it('atlassian.editor.paste', function () {
    if (!dispatchPasteEvent(editorView, { plain: 'foo' })) {
      // This environment does not support artificial paste events
      return this.skip();
    }

    expect(handler.calledWith('atlassian.editor.paste')).to.equal(true);
  });

  it('atlassian.editor.image.autoformatting', () => {
    insertText(editorView, '![hello](www.google.com)', 1);
    expect(handler.calledWith('atlassian.editor.image.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.image.button', () => {
    editor
      .find('ToolbarButton')
      .find('EditorImageIcon')
      .parent()
      .simulate('click');

    expect(handler.calledWith('atlassian.editor.image.button')).to.equal(true);
  });

  it('atlassian.editor.image.paste', function () {
    const contentArea: HTMLElement = editorView.dom;
    const event = createEvent('paste');

    try {
      Object.defineProperties(event, {
        clipboardData: {
          value: {
            types: ['Files']
          }
        }
      });
    } catch (e) {
      // This environment does not allow mocking paste events
      return this.skip();
    }

    contentArea.dispatchEvent(event);
    expect(handler.calledWith('atlassian.editor.image.paste')).to.equal(true);
  });

  it('atlassian.editor.image.drop', () => {
    // Note: Mobile Safari and OSX Safari 9 do not bubble CustomEvent of type 'drop'
    //       so we must dispatch the event directly on the event which has listener attached.
    const contentArea: HTMLElement = editorView.dom;
    const event = createEvent('drop');

    Object.defineProperties(event, {
      dataTransfer: {
        value: {
          getData: (type: string) => '',
          setData: () => { },
          clearData: () => { },
          types: ['Files'],
          files: [],
          items: [],
        }
      }
    });

    contentArea.dispatchEvent(event);
    expect(handler.calledWith('atlassian.editor.image.drop')).to.equal(true);
  });

  [
    { value: 'codeblock', name: 'Code block' },
    { value: 'blockquote', name: 'Block quote' },
    { value: 'heading1', name: 'Heading 1' },
    { value: 'heading2', name: 'Heading 2' },
    { value: 'heading3', name: 'Heading 3' },
    { value: 'heading4', name: 'Heading 4' },
    { value: 'heading5', name: 'Heading 5' },
  ].forEach(blockType => {
    it(`atlassian.editor.format.${blockType.value}.button`, () => {
      editor.find('ToolbarBlockType').find('AkButton').simulate('click');
      editor
        .find('ToolbarBlockType')
        .find('Item')
        .filterWhere(n => n.text() === blockType.name)
        .find('Element')
        .simulate('click');

      expect(handler.calledWith(`atlassian.editor.format.${blockType.value}.button`)).to.equal(true);
    });
  });

  for (let level = 1; level <= 5; level++) {
    it(`atlassian.editor.format.heading${level}.autoformatting`, () => {
      insertText(editorView, stringRepeat('#', level) + ' ', 1);
      expect(handler.calledWith(`atlassian.editor.format.heading${level}.autoformatting`)).to.equal(true);
    });
  }

  for (let level = 1; level <= 5; level++) {
    it(`atlassian.editor.format.heading${level}.keyboard`, () => {
      sendKeyToPm(editorView, browser.mac ? `Cmd-Alt-${level}` : `Ctrl-${level}`);
      expect(handler.calledWith(`atlassian.editor.format.heading${level}.keyboard`)).to.equal(true);
    });
  }

  it('atlassian.editor.format.blockquote.keyboard', () => {
    sendKeyToPm(editorView, browser.mac ? 'Cmd-Alt-7' : 'Ctrl-7');
    expect(handler.calledWith('atlassian.editor.format.blockquote.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.blockquote.autoformatting', () => {
    insertText(editorView, '> ', 1);
    expect(handler.calledWith('atlassian.editor.format.blockquote.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.format.codeblock.keyboard', () => {
    sendKeyToPm(editorView, browser.mac ? 'Cmd-Alt-8' : 'Ctrl-8');
    expect(handler.calledWith('atlassian.editor.format.codeblock.keyboard')).to.equal(true);
  });

  it('atlassian.editor.format.codeblock.autoformatting', () => {
    insertText(editorView, '```', 1);
    sendKeyToPm(editorView, 'Enter');
    expect(handler.calledWith('atlassian.editor.format.codeblock.autoformatting')).to.equal(true);
  });

  it('atlassian.editor.newline.keyboard', () => {
    sendKeyToPm(editorView, 'Shift-Enter');
    expect(handler.calledWith('atlassian.editor.newline.keyboard')).to.equal(true);
  });

  it('atlassian.editor.horizontalrule.keyboard', () => {
    sendKeyToPm(editorView, 'Mod-Shift--');
    expect(handler.calledWith('atlassian.editor.format.horizontalrule.keyboard')).to.equal(true);
  });
});
