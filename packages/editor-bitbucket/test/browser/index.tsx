import * as chai from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { SinonSpy } from 'sinon';
import { doc, h1, emoji, mention, p, strong, code_block } from './_schema-builder';

import { EditorView, browser } from '@atlaskit/editor-core';
import { chaiPlugin, createEvent, dispatchPasteEvent, fixtures, insertText, sendKeyToPm } from '@atlaskit/editor-core/dist/es5/test-helper';
import Editor from '../../src/index';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-bitbucket/expand and collapse', () => {
  const fixture = fixtures();
  let editorWrapper;
  beforeEach(() => {
    editorWrapper = mount(<Editor />, { attachTo: fixture() });
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should not render expanded chrome when collapsed by default', () => {
    expect(editorWrapper.find('ChromeCollapsed')).to.have.length.above(0);
    expect(editorWrapper.find('input[placeholder]')).to.have.length.above(0);
    expect(editorWrapper.find('ChromeExpanded').length).to.equal(0);
  });

  it('should respect defaultExpanded property', () => {
    editorWrapper.setState({ isExpanded: true });
    expect(editorWrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(editorWrapper.find('ChromeExpanded')).to.have.length.above(0);
  });

  it('should expand after clicking', () => {
    editorWrapper.find('ChromeCollapsed input').simulate('focus');
    expect(editorWrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(editorWrapper.find('ChromeExpanded')).to.have.length.above(0);
  });

  it('.expand() method should expand the editor chrome', () => {
    const editor: Editor = editorWrapper.get(0) as any;
    editor.expand();
    expect(editorWrapper.find('ChromeCollapsed').length).to.equal(0);
    expect(editorWrapper.find('ChromeExpanded')).to.have.length.above(0);
  });

  it('.collapse() method should collapse the editor chrome', () => {
    const editor: Editor = editorWrapper.get(0) as any;
    editor.collapse();
    expect(editorWrapper.find('ChromeCollapsed')).to.have.length.above(0);
    expect(editorWrapper.find('ChromeExpanded').length).to.equal(0);
  });

  it('should call onExpanded after editor is expanded via click', () => {
    const spy = sinon.spy();
    editorWrapper.setProps({ onExpanded: spy });
    editorWrapper.find('ChromeCollapsed input').simulate('focus');
    expect(spy.callCount).to.equal(1);
  });

  it('should call onExpanded after editor is expanded via .expand()', () => {
    const spy = sinon.spy();
    const editor: Editor = editorWrapper.get(0) as any;
    editorWrapper.setProps({ onExpanded: spy });
    editor.expand();
    expect(spy.callCount).to.equal(1);
  });
});

describe('@atlaskit/editor-bitbucket/setFromHtml', () => {
  const fixture = fixtures();
  let editorWrapper;
  let editor: Editor;
  beforeEach(() => {
    editorWrapper = mount(<Editor isExpandedByDefault={true} />, { attachTo: fixture() });
    editor = editorWrapper.get(0) as any;
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should accept empty strings', () => {
    editor.setFromHtml('');
    expect(editor.doc).to.deep.equal(doc(p()));

    editor.setFromHtml('     \t \n  \r  \n');
    expect(editor.doc).to.deep.equal(doc(p()));
  });

  it('should accept simple markup', () => {
    editor.setFromHtml('<h1>foo</h1>');
    expect(editor.doc).to.deep.equal(doc(h1('foo')));

    editor.setFromHtml('<p>foo <strong>bar</strong></p>');
    expect(editor.doc).to.deep.equal(doc(p('foo ', strong('bar'))));
  });
});

describe('@atlaskit/editor-bitbucket/imageUploadHandler', () => {
  const fixture = fixtures();
  let spy: SinonSpy;
  let editorWrapper;

  beforeEach(() => {
    spy = sinon.spy();
    editorWrapper = mount(<Editor isExpandedByDefault={true} imageUploadHandler={spy} />, { attachTo: fixture() });
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should invoke upload handler after clicking image icon', () => {
    editorWrapper
      .find('ChromeExpanded')
      .find('EditorImageIcon')
      .parent()
      .simulate('click');

    expect(spy.callCount).to.equal(1);
    expect(spy.calledWith(undefined)).to.equal(true);
    expect(spy.getCall(0).args[1]).to.be.a('function');
  });

  it('should invoke upload handler after pasting an image', function() {
    const contentArea: HTMLElement = (editorWrapper.get(0) as any).state.editorView.dom;
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

    expect(spy.callCount).to.equal(1);
    expect(spy.calledWith(event)).to.equal(true);
    expect(spy.getCall(0).args[1]).to.be.a('function');
  });

  it('should invoke upload handler after dropping an image', function(){
    // Note: Mobile Safari and OSX Safari 9 do not bubble CustomEvent of type 'drop'
    //       so we must dispatch the event directly on the event which has listener attached.
    const dropElement: HTMLElement = (editorWrapper.get(0) as any).state.editorView.dom;
    const event = createEvent('drop');

    Object.defineProperties(event, {
      dataTransfer: {
        value: {
          getData: (type: string) => '',
          setData: () => {},
          clearData: () => {},
          types: ['Files'],
          files: [],
          items: [],
        }
      }
    });

    dropElement.dispatchEvent(event);

    expect(spy.callCount).to.equal(1);
    expect(spy.calledWith(event)).to.equal(true);
    expect(spy.getCall(0).args[1]).to.be.a('function');
  });
});

describe('@atlaskit/editor-bitbucket/multiple editors as children', () => {
  type Props = {};
  type State = {};
  class ContainerWithTwoEditors extends React.PureComponent<Props, State> {
    render() {
     return (
       <div>
         <Editor isExpandedByDefault={true} />
         <Editor isExpandedByDefault={true} />
       </div>
     );
    }
  }

  const fixture = fixtures();
  let container: ReactWrapper<Props, State>;
  let editor1: ReactWrapper<Props, State>;
  let editor2: ReactWrapper<Props, State>;

  beforeEach(() => {
    container = mount(<ContainerWithTwoEditors />, { attachTo: fixture() });
    editor1 = container.find(Editor).at(0);
    editor2 = container.find(Editor).at(1);
  });

  afterEach(() => {
    container.unmount();
  });

  it('should render two editors inside a common container', () => {
    expect(container.find(Editor)).to.have.length.above(0);
    expect(editor1.is(Editor)).to.equal(true);
    expect(editor2.is(Editor)).to.equal(true);
  });

  it('should render toolbar elements for both editors', () => {
    expect(editor1.find('ChromeExpanded ToolbarBlockType')).to.have.length.above(0);
    expect(editor1.find('ChromeExpanded ToolbarTextFormatting')).to.have.length.above(0);
    expect(editor1.find('ChromeExpanded ToolbarLists')).to.have.length.above(0);

    expect(editor2.find('ChromeExpanded ToolbarBlockType')).to.have.length.above(0);
    expect(editor2.find('ChromeExpanded ToolbarTextFormatting')).to.have.length.above(0);
    expect(editor2.find('ChromeExpanded ToolbarLists')).to.have.length.above(0);
  });
});

describe('@atlaskit/editor-bitbucket/toolbar', () => {
  const fixture = fixtures();
  let editorWrapper: ReactWrapper<any, any>;

  beforeEach(() => {
    editorWrapper = mount(<Editor isExpandedByDefault={true} />, { attachTo: fixture() });
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should close blocktype dropdown after second click', () => {
    const trigger = editorWrapper.find('ToolbarBlockType AkButton');

    expect(trigger).to.have.length.above(0);
    expect(editorWrapper.find('ToolbarBlockType Group').length).to.equal(0);

    trigger.simulate('click');
    expect(editorWrapper.find('ToolbarBlockType Group')).to.have.length.above(0);

    trigger.simulate('click');
    expect(editorWrapper.find('ToolbarBlockType Group').length).to.equal(0);
  });
});

describe.skip('@atlaskit/editor-bitbucket/pasting', () => {
  const fixture = fixtures();
  let editor: Editor;
  let editorView: EditorView;
  let editorWrapper;

  beforeEach(() => {
    const mentionResoure = sinon.stub() as any;
    editorWrapper = mount(<Editor isExpandedByDefault={true} mentionSource={mentionResoure} />, { attachTo: fixture() });
    editor = editorWrapper.get(0) as any;
    editorView = editor!.state!.editorView as EditorView;
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should transform pasted html with an emoji', function() {
    const content = {
      html: '<p>Nice! <img src="https://d301sr.cloudfront.net/69284d5bf158/emoji/img/%2B1.svg" class="emoji"></p>'
    };

    if (!dispatchPasteEvent(editorView, content)) {
      // This environment does not allow mocking paste events
      return this.skip();
    }

    expect(editor.doc).to.deep.equal(doc(p('Nice! ', emoji({ shortName: ':+1:' }))));
  });

  it('should transform pasted html with a mention', function() {
    const content = {
      html: '<p><a href="/mention/" rel="nofollow" title="@mention" class="mention">Mention</a> some mention.</p>'
    };

    if (!dispatchPasteEvent(editorView, content)) {
      // This environment does not allow mocking paste events
      return this.skip();
    }

    expect(editor.doc).to.deep.equal(doc(p(mention({ id: 'mention', text: '@Mention' }), ' some mention.')));
  });
});

describe('@atlaskit/editor-bitbucket/keymaps', () => {
  const fixture = fixtures();
  let editor: Editor;
  let editorView: EditorView;
  let editorWrapper;

  beforeEach(() => {
    editorWrapper = mount(<Editor isExpandedByDefault={true} />, { attachTo: fixture() });
    editor = editorWrapper.get(0) as any;
    editorView = editor!.state!.editorView as EditorView;
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should undo code block with Cmd+Z', function() {
    editor.setFromHtml('<p></p>');
    insertText(editorView, '```', 1);
    sendKeyToPm(editorView, 'Enter');

    expect(editorView.state.doc).to.deep.equal(doc(code_block()('')));

    sendKeyToPm(editorView, browser.mac ? 'Cmd-z' : 'Ctrl-z');

    expect(editorView.state.doc).to.deep.equal(doc(p()));
  });
});

describe('@atlaskit/editor-bitbucket/focus', () => {
  const fixture = fixtures();
  let editorWrapper: ReactWrapper<any, any>;

  beforeEach(() => {
    editorWrapper = mount(<Editor isExpandedByDefault={true} />, { attachTo: fixture() });
  });

  afterEach(() => {
    editorWrapper.unmount();
  });

  it('should focus the editor if not already focused', () => {
    const editorInstance = editorWrapper.instance() as any;
    const hasFocusStub = sinon.stub(editorInstance.state.editorView, 'hasFocus').returns(false);
    const spy = sinon.stub(editorInstance.state.editorView, 'focus');
    editorInstance.focus();

    expect(spy.called).to.eq(true);
    hasFocusStub.restore();
    spy.restore();
  });

  it('should not try to focus when already focused', () => {
    const editorInstance = editorWrapper.instance() as any;
    const hasFocusStub = sinon.stub(editorInstance.state.editorView, 'hasFocus').returns(true);
    const spy = sinon.stub(editorInstance.state.editorView, 'focus');
    editorInstance.focus();

    expect(spy.called).to.eq(false);
    hasFocusStub.restore();
    spy.restore();
  });
});
