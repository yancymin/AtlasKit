import * as chai from 'chai';
import { doc, code_block } from '../../../../src/test-helper/schema-builder';
import { makeEditor, chaiPlugin, sendKeyToPm } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { codeBlockPlugins } from '../../../../src/plugins';
import { codeMirrorNodeView } from '../../../../src/nodeviews';
import { computeChange, findMode } from '../../../../src/nodeviews/ui/code-mirror/codeMirrorPlugin';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/nodeviews/code-mirror/codeMirrorPlugin', () => {
  const editor = (doc: any) => makeEditor({
    doc,
    plugins: codeBlockPlugins(defaultSchema),
  });

 it('should return a defined a not null codeMirror instance', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<>}codeBlock')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0) as any;
    expect(codeNodeView.codeMirrorPlugin.cm).to.not.equal(undefined);
  });

  it('should have value of codeMirror instance same as text in code block', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('test{<>}')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0) as any;
    expect(codeNodeView.codeMirrorPlugin.cm.getValue()).to.equal('test');
  });

  it('should update language for code-mirror when updateLanguage function is called', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<}test{>}')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0) as any;
    codeNodeView.codeMirrorPlugin.updateLanguage('javascript');
    expect(codeNodeView.codeMirrorPlugin.cm.getMode().name).to.equal('javascript');
  });

  it('should codeMirrorPlugin.dom should be wrapper of codeMirror', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<}test{>}')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0) as any;
    expect(codeNodeView.codeMirrorPlugin.dom.firstChild.className.indexOf('CodeMirror') >= 0).to.equal(true);
  });

  it('should update selection when setSelection is called', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<}test{>}')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0) as any;
    codeNodeView.codeMirrorPlugin.setSelection(0, 2);
    expect(codeNodeView.codeMirrorPlugin.cm.getSelection()).to.equal('te');
  });

  it('should set domRef to undefined when destroy is called', () => {
    const { editorView } = editor(doc(code_block({ language: 'java' })('{<}test{>}')));
    const node = editorView.state.selection.$from.node(1);
    const codeNodeView = codeMirrorNodeView(node, editorView, () => 0) as any;
    codeNodeView.codeMirrorPlugin.destroy();
    expect(codeNodeView.codeMirrorPlugin.dom).to.equal(undefined);
  });

  it('should exit code block when Enter is pressed three times', () => {
    const { editorView } = editor(doc(code_block()('codeBlock{<>}')));
    sendKeyToPm(editorView, 'Enter');
    sendKeyToPm(editorView, 'Enter');
    sendKeyToPm(editorView, 'Enter');
    const { $from } = editorView.state.selection;
    expect($from.node($from.depth).type.name).to.equal('paragraph');
  });

  describe('computeChange', () => {
    it('should return change correctly if test is added', () => {
      const change = computeChange('testing', '123testing');
      expect(change.text).to.equal('123');
      expect(change.from).to.equal(0);
      expect(change.to).to.equal(0);
    });

    it('should return change correctly if test is removed', () => {
      const change = computeChange('123testing', 'testing');
      expect(change.text).to.equal('');
      expect(change.from).to.equal(0);
      expect(change.to).to.equal(3);
    });
  });

  describe('findMode', () => {
    it('should return mode for languages supported', () => {
      expect(findMode('javascript').name).to.equal('JavaScript');
      expect(findMode('java').name).to.equal('Java');
      expect(findMode('clojure').name).to.equal('Clojure');
      expect(findMode('rust').name).to.equal('Rust');
    });
  });
});
