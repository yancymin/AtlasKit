import { expect } from 'chai';
import * as chai from 'chai';
import * as sinon from 'sinon';
import {
  sendKeyToPm, insertText, doc, code, textColor, p,
  chaiPlugin, makeEditor, a, strong
} from '../../../../src/test-helper';
import textColorPlugins, { TextColorState } from '../../../../src/plugins/text-color';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('text-color', () => {
  const editor = (doc: any) => makeEditor<TextColorState>({
    doc,
    plugins: textColorPlugins(defaultSchema),
  });

  const testColor1 = '#97a0af';
  const testColor2 = '#0747a6';
  const createTextColor = (color: string) => textColor({ color });

  it('should allow a change handler to be attached', () => {
    const { pluginState } = editor(doc(p('text')));
    const spy = sinon.spy();
    pluginState.subscribe(spy);

    expect(spy.callCount).to.equal(1);
    expect(spy.calledWith(pluginState)).to.equal(true);
  });

  // Now this works because of `handleKeyDown` & `handleTextInput` inside `text-format` plugin
  it.skip('should be able to remove mark when its the first node of the paragraph', () => {
    const { editorView } = editor(doc(p(createTextColor(testColor1)('{<}text{>}'))));
    sendKeyToPm(editorView, 'Backspace');
    insertText(editorView, 'text', editorView.state.selection.from);
    expect(editorView.state.doc).to.deep.equal(doc(p('text')));
  });

  it('should be able to replace textColor on a character', () => {
    const { editorView, pluginState } = editor(doc(p('{<}t{>}ext')));

    expect(pluginState.toggleTextColor(editorView.state, editorView.dispatch, testColor1));
    expect(editorView.state.doc).to.deep.equal(doc(p(createTextColor(testColor1)('t'), 'ext')));
    expect(pluginState.toggleTextColor(editorView.state, editorView.dispatch, testColor2));
    expect(editorView.state.doc).to.deep.equal(doc(p(createTextColor(testColor2)('t'), 'ext')));
  });

  it('should expose whether textColor has any color on an empty selection', () => {
    const { editorView, pluginState } = editor(doc(p('te{<>}xt')));

    expect(pluginState.color).to.equal(pluginState.defaultColor);
    expect(pluginState.toggleTextColor(editorView.state, editorView.dispatch, testColor1));
    expect(pluginState.color).to.equal(testColor1);
  });

  it('should expose whether textColor has any color on a text selection', () => {
    const { editorView, pluginState } = editor(doc(p('t{<}e{>}xt')));

    expect(pluginState.color).to.equal(pluginState.defaultColor);
    expect(pluginState.toggleTextColor(editorView.state, editorView.dispatch, testColor1));
    expect(pluginState.color).to.equal(testColor1);
  });

  it('exposes textColor as disabled when the mark cannot be applied', () => {
    const { pluginState } = editor(doc(p(code('te{<>}xt'))));

    expect(pluginState.disabled).to.equal(true);
  });

  it('exposes textColor as disabled when inside hyperlink', () => {
    const { pluginState } = editor(doc(p(a({ href: 'http://www.atlassian.com' })('te{<>}xt'))));

    expect(pluginState.disabled).to.equal(true);
  });

  it('exposes textColor as not disabled when the mark can be applied', () => {
    const { pluginState } = editor(doc(p('te{<>}xt')));

    expect(pluginState.disabled).to.equal(false);
  });

  it('should expose no color when selection has multiple color marks', () => {
    const { pluginState } = editor(doc(p(
      '{<}', createTextColor(testColor1)('te'),
      createTextColor(testColor2)('xt'), '{>}'
    )));

    expect(pluginState.color).to.equal(undefined);
  });

  it('should expose no color when selection has mixed content', () => {
    const { pluginState } = editor(doc(p(
      '{<}', createTextColor(testColor1)('te'), 'xt', '{>}'
    )));

    expect(pluginState.color).to.equal(undefined);
  });

  it('should expose default color when selection has no color marks', () => {
    const { pluginState } = editor(doc(p('{<}text{>}')));

    expect(pluginState.color).to.equal(pluginState.defaultColor);
  });

  it('should expose default color when selection has other marks', () => {
    const { pluginState } = editor(doc(p('{<}', strong('te'), 'xt{>}')));

    expect(pluginState.color).to.equal(pluginState.defaultColor);
  });

  it('should expose color when the cursor is inside a textColor mark', () => {
    const { pluginState } = editor(doc(p(createTextColor(testColor1)('te{<>}xt'))));

    expect(pluginState.color).to.equal(testColor1);
  });

  it('should expose color when the cursor is at the ending of a textColor mark', () => {
    const { pluginState } = editor(doc(p(createTextColor(testColor1)('text'), '{<>}')));

    expect(pluginState.color).to.equal(testColor1);
  });

  it('should expose default color when the cursor is at the begnining of a textColor mark', () => {
    const { pluginState } = editor(doc(p('hello', createTextColor(testColor1)('{<>}text'))));

    expect(pluginState.color).to.equal(pluginState.defaultColor);
  });

  it('should expose color when the cursor is at begnining of doc with textColor mark', () => {
    const { pluginState } = editor(doc(p('', createTextColor(testColor1)('{<>}text'))));

    expect(pluginState.color).to.equal(testColor1);
  });

  it('should expose color when selection has other marks with textColor mark', () => {
    const { pluginState } = editor(doc(p(
      '{<}', createTextColor(testColor1)('hello ', strong('world'), '!'), '{>}'
    )));

    expect(pluginState.color).to.equal(testColor1);
  });
});
