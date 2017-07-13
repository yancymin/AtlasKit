import * as chai from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';

import { chaiPlugin, fixtures } from '@atlaskit/editor-core/dist/es5/test-helper';
import Editor from '../../src/index';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-jira expand and collapse', () => {
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
    const editorWrapper = mount(<Editor isExpandedByDefault={true} />, { attachTo: fixture() });
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
    const editorWrapper = mount(<Editor isExpandedByDefault={true} />, { attachTo: fixture() });
    const editor: Editor = editorWrapper.get(0) as any;

    editor.collapse();

    expect(editorWrapper.find('ChromeCollapsed')).to.have.length.above(0);
    expect(editorWrapper.find('ChromeExpanded').length).to.equal(0);
  });

  it('should call onExpanded after editor is expanded via click', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy} />, { attachTo: fixture() });

    editorWrapper.find('ChromeCollapsed input').simulate('focus');
    expect(spy.callCount).to.equal(1);
  });

  it('should call onExpanded after editor is expanded via .expand()', () => {
    const spy = sinon.spy();
    const editorWrapper = mount(<Editor onExpanded={spy} />, { attachTo: fixture() });
    const editor: Editor = editorWrapper.get(0) as any;

    editor.expand();

    expect(spy.callCount).to.equal(1);
  });
});

describe('feature flags', () => {
  it('should enable mentions if mentionProvider exists', () => {
    const editorWrapper = mount(<Editor mentionProvider={Promise.resolve({})} />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.nodes.mention).to.not.eq(undefined);
    expect(editor.state.schema.marks.mentionQuery).to.not.eq(undefined);
  });

  it('should not enable mentions if mentionProvider doesn`t exist', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.nodes.mention).to.eq(undefined);
    expect(editor.state.schema.marks.mentionQuery).to.eq(undefined);
  });

  it('allowLists=true prop should enable lists', () => {
    const editorWrapper = mount(<Editor allowLists={true} />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.nodes.bulletList).to.not.eq(undefined);
  });

  it('lists should be disabled without allowLists prop', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.nodes.bulletList).to.eq(undefined);
  });

  it('allowLinks=true prop should enable links', () => {
    const editorWrapper = mount(<Editor allowLinks={true} />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.marks.link).to.not.eq(undefined);
  });

  it('links should be disabled without allowLinks prop', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.marks.link).to.eq(undefined);
  });

  it('allowAdvancedTextFormatting=true prop should enable advanced text formatting features', () => {
    const editorWrapper = mount(<Editor allowAdvancedTextFormatting={true} />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.marks.code).to.not.eq(undefined);
    expect(editor.state.schema.marks.strike).to.not.eq(undefined);
  });

  it('advanced text formatting features should be disabled without allowAdvancedTextFormatting prop', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.marks.code).to.eq(undefined);
    expect(editor.state.schema.marks.strike).to.eq(undefined);
  });

  it('allowSubSup=true prop should enable subsup mark', () => {
    const editorWrapper = mount(<Editor allowSubSup={true} />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.marks.subsup).to.not.eq(undefined);
  });

  it('Subsup mark should be disabled without allowSubSup prop', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.marks.subsup).to.eq(undefined);
  });

  it('allowCodeBlock=true prop should enable code blocks', () => {
    const editorWrapper = mount(<Editor allowCodeBlock={true} />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.nodes.codeBlock).to.not.eq(undefined);
  });

  it('code blocks should be disabled without allowCodeBlock prop', () => {
    const editorWrapper = mount(<Editor />);
    const editor: Editor = editorWrapper.get(0) as any;
    expect(editor.state.schema.nodes.codeBlock).to.eq(undefined);
  });
});

describe('@atlaskit/editor-jira/focus', () => {
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
