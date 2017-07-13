import * as chai from 'chai';
import { expect } from 'chai';
import emojiPlugins, { EmojiState } from '../../../../src/plugins/emojis';
import ProviderFactory from '../../../../src/providerFactory';
import {
  chaiPlugin,
  insertText,
  makeEditor,
  doc,
  p,
  code,
  hardBreak,
  emoji,
  mention,
  code_block,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('emojis - input rules', () => {
  const providerFactory = new ProviderFactory();
  const editor = (doc: any) => makeEditor<EmojiState>({
    doc,
    plugins: emojiPlugins(defaultSchema, providerFactory),
  });

  const assert = (what: string, expected: boolean, docContents?: any) => {
    const { editorView, pluginState, sel, refs } = editor(doc(docContents || p('{<>}')));
    (pluginState as any).emojiProvider = true;
    insertText(editorView, what, sel || refs['<']);
    const { emojiQuery } = editorView.state.schema.marks;
    const cursorFocus = editorView.state.selection.$to.nodeBefore!;
    expect(!!emojiQuery.isInSet(cursorFocus.marks)).to.equal(expected);
  };

  it('should replace a standalone ":" with emoji-query-mark', () => {
    return assert('foo :', true);
  });

  it('should not replace a ":" when part of a word', () => {
    return assert('foo:', false);
  });

  it('should not replace a ":" after the "`"', () => {
    return assert('`:', false);
  });

  it('should replace ":" at the start of the content', () => {
    return assert(':', true);
  });

  it('should replace ":" if there are multiple spaces in front of it', () => {
    return assert('  :', true);
  });

  it('should replace ":" if there is a hardbreak node in front of it', () => {
    return assert(':', true, p(hardBreak(), '{<>}'));
  });

  it('should replace ":" if there is another emoji node in front of it', () => {
    return assert(':', true, p(emoji({ shortName: ':smiley:'}), '{<>}'));
  });

  it('should replace ":" if there is a mention node in front of it', () => {
    return assert(':', true, p(mention({ id: '1234', text: '@SpongeBob' }), '{<>}'));
  });

  it('should not replace ":" when in an unsupported node', () => {
    return assert(':', false, code_block()('{<>}'));
  });

  it('should not replace ": when there is an unsupported stored mark', () => {
    assert(':', false, p(code('{<>}some code')));
  });

  it('should replace non empty selection with emojiQuery mark', () => {
    assert(':', true, p('{<}text{>}'));
  });

  it('should not replace non empty selection with emojiQuery mark if selection starts with an excluding mark', () => {
    assert(':', false, p(code('{<}text{>}')));
  });

  it('should not replace a ":" preceded by a special character', () => {
    return assert('>:', false);
  });
});
