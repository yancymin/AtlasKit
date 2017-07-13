import * as chai from 'chai';
import * as sinon from 'sinon';
import { doc, code_block } from '../../../../src/test-helper/schema-builder';
import { makeEditor, chaiPlugin } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { CodeBlockState, codeBlockPlugins, codeMirrorPlugins } from '../../../../src/plugins';
import { codeMirrorNodeView } from '../../../../src/nodeviews';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/nodeviews/code-mirror', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: [
      ...codeBlockPlugins(defaultSchema),
      ...codeMirrorPlugins(defaultSchema),
    ],
    nodeViews: { codeBlock: codeMirrorNodeView },
  });

  it('should export code-mirror nodeview factory', () => {
    expect(codeMirrorNodeView instanceof Function).to.equal(true);
  });

  it('should be possible to create a code-block', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    expect(node.type.name).to.deep.equal('codeBlock');
  });

 it('should return a defined codeMirrorNodeView object', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0);
    expect(codeNodeView).to.not.equal(undefined);
  });

 it('should have dom defined as public member of codeMirrorNodeView object', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0);
    expect(codeNodeView).to.not.equal(undefined);
    expect(codeNodeView.update).to.not.equal(undefined);
    expect(codeNodeView.selectNode).to.not.equal(undefined);
    expect(codeNodeView.destroy).to.not.equal(undefined);
  });

 it('should have callBacks defined as public member of codeMirrorNodeView object', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0);
    expect(codeNodeView).to.not.equal(undefined);
    expect(codeNodeView.update).to.not.equal(undefined);
    expect(codeNodeView.selectNode).to.not.equal(undefined);
    expect(codeNodeView.stopEvent).to.not.equal(undefined);
    expect(codeNodeView.destroy).to.not.equal(undefined);
  });

  it('should add a uniqueId to code block node', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    expect(!!node.attrs['uniqueId']).to.equal(true);
  });

  it('should add a isCodeMirror to code block node', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    expect(!!node.attrs['isCodeMirror']).to.equal(true);
  });

    it('should call unsubscribeFocusHandlers menthod of code-block plugin editor is destroyed', () => {
    const { editorView, pluginStates } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const func = sinon.spy();
    const codeBlockPlugin = pluginStates.filter(state => state instanceof CodeBlockState);
    expect(codeBlockPlugin.length).to.be.greaterThan(0);
    codeBlockPlugin[0].unsubscribeFocusHandlers = func;
    editorView.destroy();
    expect(func.callCount).to.be.greaterThan(0);
  });

  it('should call unsubscribe menthod of code-block plugin editor is destroyed', () => {
    const { editorView, pluginStates } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const func = sinon.spy();
    const codeBlockPlugin = pluginStates.filter(state => state instanceof CodeBlockState);
    expect(codeBlockPlugin.length).to.be.greaterThan(0);
    codeBlockPlugin[0].unsubscribe = func;
    editorView.destroy();
    expect(func.callCount).to.be.greaterThan(0);
  });
});
