import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';

import { chaiPlugin, sendKeyToPm, insertText, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { mount, ReactWrapper } from 'enzyme';
import Editor from '../../src';
import * as api from '../../src';
import { MediaProvider } from '@atlaskit/editor-core';
import * as mediaTestHelpers from '@atlaskit/media-test-helpers';

chai.use(chaiPlugin);

const { expect } = chai;

const defaultValue = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello'
        },
        {
          type: 'mention',
          attrs: {
            text: '@World',
            id: '1234'
          }
        }
      ]
    }
  ]
};

const defaultValueLegacy = [
  {
    type: 'text',
    text: 'Hello'
  },
  {
    type: 'mention',
    attrs: {
      text: '@World',
      id: '1234'
    }
  }
];

describe('@atlaskit/editor-hipchat', () => {
  let editorWrapper: ReactWrapper<any, any>;

  afterEach(() => {
    if (editorWrapper) {
      try {
        editorWrapper.unmount();
      } catch(e) {
        // TODO: remove after https://product-fabric.atlassian.net/browse/ED-1694
        // Temporary workaround to prevent Picker exceptions thrown
        // when removing them too quickly after unmount.
      }
    }
  });

  it('should export schema', () => {
    expect(api).to.have.property('schema');
  });

  describe('Keymap', () => {

    it('should trigger onSubmit when user presses Enter', () => {
      const spy = sinon.spy();
      editorWrapper = mount(<Editor onSubmit={spy} />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;
      sendKeyToPm(editorView!, 'Enter');
      expect(spy.calledWith(editor.value)).to.equal(true);
    });

    it('should insert a new line when user presses Shift-Enter', () => {
      editorWrapper = mount(<Editor />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;
      sendKeyToPm(editorView!, 'Shift-Enter');
      expect(editor.value).to.deep.equal({
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{
              type: 'hardBreak'
            }]
          }
        ]
      });
    });

  });

  describe('Autoformatting', () => {

    it('should convert "**text**" to strong', () => {
      editorWrapper = mount(<Editor />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;

      insertText(editorView, '**text**', 1);

      expect(editor.value).to.deep.equal({
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'text',
              marks: [{
                type: 'strong'
              }]
            }]
          }
        ]
      });
    });

    it('should convert "*text*" to em', () => {
      editorWrapper = mount(<Editor />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;

      insertText(editorView, '*text*', 1);

      expect(editor.value).to.deep.equal({
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'text',
              marks: [{
                type: 'em'
              }]
            }]
          }
        ]
      });
    });

  });

  describe('MaxContentSize', () => {

    it('should prevent the user from entering more text if it node size is > maxContentSize', () => {
      editorWrapper = mount(<Editor maxContentSize={9} />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;

      editorView.dispatch(editorView.state.tr.insertText('Hello'));
      editorView.dispatch(editorView.state.tr.insertText('!'));

      expect(editor.value).to.deep.equal({
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'Hello'
            }]
          }
        ]
      });
    });

    it('should add css-classes for indicating that you have reached max content size', () => {
      editorWrapper = mount(<Editor maxContentSize={9} />);
      const editor = editorWrapper.get(0) as any;
      const { editorView } = editor.state;

      editorView.dispatch(editorView.state.tr.insertText('Hello'));
      editorView.dispatch(editorView.state.tr.insertText('!'));

      expect(editorWrapper.find('.max-length-reached').length).to.eq(1);
      expect(editorWrapper.find('.flash-toggle').length).to.eq(0);

      editorView.dispatch(editorView.state.tr.insertText('!'));

      expect(editorWrapper.find('.flash-toggle').length).to.eq(1);
    });

  });

  describe('API', () => {

    let editor;

    beforeEach(() => {
      editorWrapper = mount(<Editor />);
      editor = editorWrapper.get(0) as any;
      editor.setFromJson(defaultValue);
    });

    describe('.focus', () => {
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

    describe('.documentSize', () => {
      it('returns the node size of the current document', () => {
        expect(editor.documentSize).to.equal(10);
      });
    });

    describe('.value', () => {
      it('returns a Promise which resolves with fabric document', () => {
        expect(editor.value).to.deep.equal({
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Hello'
                },
                {
                  type: 'mention',
                  attrs: {
                    accessLevel: '',
                    text: '@World',
                    id: '1234'
                  }
                }
              ]
            }
          ]
        });
      });
    });

    describe('.setFromJson()', () => {
      it('creates a new document based on json-object', () => {
        const value = {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Yo!'
                }
              ]
            }
          ]
        };

        editor.setFromJson(value);
        expect(editor.value).to.deep.equal(value);
      });
    });

    describe('.clear()', () => {
      it('Clears the content of the editor, making it an empty document', () => {
        editor.clear();
        expect(editor.documentSize).to.equal(4);
      });
    });

    describe('.showMediaPicker()', () => {
      it('should be a function', () => {
        expect(typeof editor.showMediaPicker === 'function').to.equal(true);
      });
    });

    describe('.insertFileFromDataUrl()', () => {
      it('should be a function', () => {
        expect(typeof editor.insertFileFromDataUrl === 'function').to.equal(true);
      });
    });
  });

  describe('Legacy-format', () => {

    describe('MaxContentSize', () => {

      it('should prevent the user from entering more text if it node size is > maxContentSize', () => {
        editorWrapper = mount(<Editor maxContentSize={9} useLegacyFormat={true} />);
        const editor = editorWrapper.get(0) as any;
        const { editorView } = editor.state;

        editorView.dispatch(editorView.state.tr.insertText('Hello'));
        editorView.dispatch(editorView.state.tr.insertText('!'));

        expect(editor.value).to.deep.equal([{
          type: 'text',
          text: 'Hello',
          marks: []
        }]);
      });

    });

    describe('API', () => {

      let editor;
      let mediaProvider: Promise<MediaProvider>;

      beforeEach(() => {
        mediaProvider = storyMediaProviderFactory(mediaTestHelpers);
        editorWrapper = mount(<Editor useLegacyFormat={true} mediaProvider={mediaProvider} />);
        editor = editorWrapper.get(0) as any;
        editor.setFromJson(defaultValueLegacy);
      });

      describe('.value', () => {
        it('returns hipchat-friendly json-object', () => {
          expect(editor.value).to.deep.equal([
            {
              type: 'text',
              text: 'Hello',
              marks: []
            },
            {
              type: 'mention',
              attrs: {
                accessLevel: '',
                text: '@World',
                id: '1234'
              },
              text: '@World'
            }
          ]);
        });
      });

      describe('.setFromJson()', () => {
        it('creates a new document based on json-object', () => {
          const value = [
            {
              type: 'text',
              text: 'Yo!',
              marks: []
            }
          ];

          editor.setFromJson(value);
          expect(editor.value).to.deep.equal(value);
        });
      });
    });
  });

});
