import * as chai from 'chai';
import { expect } from 'chai';
import mentionsPlugins, { MentionsState } from '../../../../src/plugins/mentions';
import ProviderFactory from '../../../../src/providerFactory';
import {
  chaiPlugin,
  insertText,
  makeEditor,
  doc,
  p,
  code_block,
  hardBreak,
  emoji,
  mention,
  code,
} from '../../../../src/test-helper';
import { mention as mentionData } from '@atlaskit/util-data-test';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('mentions - input rules', () => {
  const editor = (doc: any) => makeEditor<MentionsState>({
    doc,
    plugins: mentionsPlugins(defaultSchema, new ProviderFactory()),
  });

  const assert = (what: string, expected: boolean, docContents?: any) => {
    const { editorView, pluginState, sel, refs } = editor(doc(docContents || p('{<>}')));
    return pluginState
      .setMentionProvider(Promise.resolve(mentionData.mentionStoryData.resourceProvider))
      .then(() => {
        insertText(editorView, what, sel || refs['<']);

        const { state } = editorView;
        const { mentionQuery } = state.schema.marks;
        const cursorFocus = state.selection.$to.nodeBefore!;
        expect(!!mentionQuery.isInSet(cursorFocus.marks)).to.equal(expected);
      });
  };

  it('should replace a standalone "@" with mention-query-mark', () => {
    return assert('foo @', true);
  });

  it('should not replace a "@" when part of a word', () => {
    return assert('foo@', false);
  });

  it('should not replace a "@" after the "`"', () => {
    return assert('`@', false);
  });

  it('should replace "@" at the start of the content', () => {
    return assert('@', true);
  });

  it('should replace "@" if there are multiple spaces in front of it', () => {
    return assert('  @', true);
  });

  it('should replace "@" if there is a hardbreak node in front of it', () => {
    return assert('@', true, p(hardBreak(), '{<>}'));
  });

  it('should replace "@" if there is another emoji node in front of it', () => {
    return assert('@', true, p(emoji({ shortName: ':smiley:'}), '{<>}'));
  });

  it('should replace "@" if there is a mention node in front of it', () => {
    return assert('@', true, p(mention({ id: '1234', text: '@SpongeBob' }), '{<>}'));
  });

  it('should not replace "@" when in an unsupported node', () => {
    return assert('@', false, code_block()('{<>}'));
  });

  it('should not replace "@" when there is an unsupported stored mark', () => {
    return assert('@', false, p(code('var {<>}')));
  });

  it('should replace non empty selection with mentionQuery mark', () => {
    return assert('@', true, p('{<}text{>}'));
  });

  it('should not replace non empty selection with mentionQuery mark if selection starts with an excluding mark', () => {
    return assert('@', false, p(code('{<}text{>}')));
  });
});
