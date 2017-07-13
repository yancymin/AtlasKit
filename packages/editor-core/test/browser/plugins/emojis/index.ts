import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import { emoji as emojiNode } from '../../../../src';
import emojiPlugins, { EmojiState } from '../../../../src/plugins/emojis';
import {
  chaiPlugin,
  makeEditor,
  sendKeyToPm,
  blockquote,
  br,
  doc,
  emoji,
  emojiQuery,
  li,
  p,
  ul,
  code,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import ProviderFactory from '../../../../src/providerFactory';

const emojiProvider = emojiData.emojiTestData.getEmojiResourcePromise();

const grinEmoji = emojiData.emojiTestData.grinEmoji;
const grinEmojiId = {
  shortName: grinEmoji.shortName,
  id: grinEmoji.id,
  fallback: grinEmoji.fallback,
};

const evilburnsEmoji = emojiData.emojiTestData.evilburnsEmoji;
const evilburnsEmojiId = {
  shortName: evilburnsEmoji.shortName,
  id: evilburnsEmoji.id,
  fallback: evilburnsEmoji.fallback,
};

chai.use(chaiPlugin);

describe('emojis', () => {
  const providerFactory = new ProviderFactory();
  const editor = (doc: any) => makeEditor<EmojiState>({
    doc,
    plugins: emojiPlugins(defaultSchema, providerFactory),
  });

  providerFactory.setProvider('emojiProvider', emojiProvider);

  const forceUpdate = (editorView: any) => {
    editorView.updateState(editorView.state);
  };

  describe('keymap', () => {

    describe('ArrowUp', () => {

      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowUp');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'ArrowUp');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should call "onSelectPrevious" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectPrevious');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'ArrowUp');
        expect(spy.called, 'was called').to.equal(true);
        expect(spy.returned(false), 'return value').to.equal(true);
      });
    });

    describe('ArrowDown', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectNext');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowDown');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'onSelectNext');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'ArrowDown');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should call "onSelectNext" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectNext');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'ArrowDown');
        expect(spy.called, 'was called').to.equal(true);
        expect(spy.returned(false), 'return vale').to.equal(true);
      });
    });

    describe('Enter', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Enter');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Enter');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should call "onSelectCurrent" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onSelectCurrent');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Enter');
        expect(spy.called, 'was called').to.equal(true);
        expect(spy.returned(false), 'return value').to.equal(true);
      });
    });

    describe('Space', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Space');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Space');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should call "onTrySelectCurrent" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'onTrySelectCurrent');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Space');
        expect(spy.called, 'was called').to.equal(true);
        expect(spy.returned(false), 'return value').to.equal(true);
      });
    });

    describe('Escape', () => {
      it('should be ignored if there is no emojiProvider', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'dismiss');

        forceUpdate(editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Esc');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello{<>}')));
        const spy = sinon.spy(pluginState, 'dismiss');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Esc');
        expect(spy.called, 'was not called').to.equal(false);
      });

      it('should call "dismiss" which should return true by default', () => {
        const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin{<>}'))));
        const spy = sinon.spy(pluginState, 'dismiss');
        (pluginState as any).emojiProvider = true;
        forceUpdate(editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Esc');
        expect(spy.called, 'was called').to.equal(true);
        expect(spy.returned(true), 'return value').to.equal(true);
      });
    });

  });

  describe('insertEmoji', () => {

    it('should replace emoji-query-mark with emoji-node', () => {
      const { editorView, pluginState } = editor(doc(p(emojiQuery(':grin'))));

      pluginState.insertEmoji({
        fallback: 'Oscar Wallhult',
        shortName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc.nodeAt(1), 'emoji node').to.be.of.nodeSpec(emojiNode);
    });

    it('should insert a space after the emoji-node', () => {
      const { editorView, pluginState } = editor(doc(p(emojiQuery(':gr{<>}'))));

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            emoji(grinEmojiId),
            ' '
          )
        )
      );
    });

    it('should allow inserting multiple emojis next to each other', () => {
      const { editorView, pluginState } = editor(
        doc(
          p(
            emoji(grinEmojiId),
            ' ',
            emojiQuery(':ev{<>}')
          )
        )
      );

      pluginState.insertEmoji(evilburnsEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            emoji(grinEmojiId),
            ' ',
            emoji(evilburnsEmojiId),
            ' '
          )
        )
      );
    });

    it('should allow inserting emoji on new line after hard break', () => {
      const { editorView, pluginState } = editor(doc(p(br, emojiQuery(':gr{<>}'))));

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            br,
            emoji(grinEmojiId),
            ' '
          )
        )
      );
    });

    it('should not break list into two when inserting emoji inside list item', () => {
      const { editorView, pluginState } = editor(
        doc(
          p(
            ul(
              li(p('One')),
              li(p('Two ', emojiQuery(':{<>}'))),
              li(p('Three'))))));

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          p(
            ul(
              li(p('One')),
              li(
                p(
                  'Two ',
                  emoji(grinEmojiId),
                  ' '
                )
              ),
              li(p('Three'))
            )
          )
        )
      );
    });

    it('should insert only 1 emoji at a time inside blockqoute', () => {
      const { editorView, pluginState } = editor(
        doc(
          blockquote(
            p('Hello ', emojiQuery(':{<>}'))
          )
        )
      );

      pluginState.insertEmoji(grinEmojiId);

      expect(editorView.state.doc, 'document').to.deep.equal(
        doc(
          blockquote(
            p(
              'Hello ',
              emoji(grinEmojiId),
              ' '
            )
          )
        )
      );

      expect(editorView.state.doc.nodeAt(8), 'emoji node').to.be.of.nodeSpec(emojiNode);
      expect(editorView.state.doc.nodeAt(10), 'no node').to.equal(null);
    });
  });

  describe('isEnabled', () => {
    it('returns true when the emoji mark can be applied', () => {
      const { pluginState } = editor(doc(p('te{<>}xt')));
      expect(pluginState.isEnabled()).to.equal(true);
    });

    it('returns false when the emoji mark cannot be applied', () => {
      const { pluginState } = editor(doc(p(code('te{<>}xt'))));
      expect(pluginState.isEnabled()).to.equal(false);
    });
  });
});
