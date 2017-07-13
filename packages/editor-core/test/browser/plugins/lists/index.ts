import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { browser } from '../../../../src';
import { TextSelection } from '../../../../src/prosemirror';
import listsPlugins, { ListsState } from '../../../../src/plugins/lists';
import { chaiPlugin, makeEditor, sendKeyToPm, doc, h1, ol, ul, li, p, panel, blockquote, code_block } from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('lists', () => {
  const editor = (doc: any) => makeEditor<ListsState>({
    doc,
    plugins: listsPlugins(defaultSchema),
  });

  describe('keymap', () => {
    context('when hit enter', () => {
      it('should split list item', () => {
        const { editorView } = editor(doc(ul(li(p('text{<>}')))));
        sendKeyToPm(editorView, 'Enter');
        expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('text')), li(p()))));
      });
    });

    if (browser.mac) {
      context('when on a mac', () => {
        context('when hit Shift-Cmd-l', () => {
          it('should toggle ordered list', () => {
            const { editorView } = editor(doc(p('text{<>}')));
            sendKeyToPm(editorView, 'Shift-Cmd-L');
            expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text')))));
          });
        });

        context('when hit Shift-Cmd-B', () => {
          it('should toggle bullet list', () => {
            const { editorView } = editor(doc(p('text{<>}')));
            sendKeyToPm(editorView, 'Shift-Cmd-B');
            expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('text')))));
          });
        });
      });
    } else {
      context('when not on a mac', () => {
        context('when hit Shift-Ctrl-L', () => {
          it('should toggle ordered list', () => {
            const { editorView } = editor(doc(p('text{<>}')));
            sendKeyToPm(editorView, 'Shift-Ctrl-L');
            expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text')))));
          });
        });

        context('when hit Shift-Ctrl-B', () => {
          it('should toggle bullet list', () => {
            const { editorView } = editor(doc(p('text{<>}')));
            sendKeyToPm(editorView, 'Shift-Ctrl-B');
            expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('text')))));
          });
        });
      });
    }
  });

  describe('API', () => {
    it('should allow a change handler to be attached', () => {
      const { pluginState } = editor(doc(p()));
      const spy = sinon.spy();

      pluginState.subscribe(spy);

      expect(spy.callCount).to.equal(1);
    });

    it('should emit a change when the selected node becomes an ordered list', () => {
      const { editorView, pluginState } = editor(doc(p('te{<>}xt')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      pluginState.toggleOrderedList(editorView);

      expect(spy.callCount).to.equal(2);
      expect(pluginState).to.have.property('orderedListActive', true);
      expect(pluginState).to.have.property('orderedListDisabled', false);
      expect(pluginState).to.have.property('orderedListHidden', false);
      expect(pluginState).to.have.property('bulletListActive', false);
      expect(pluginState).to.have.property('bulletListDisabled', false);
      expect(pluginState).to.have.property('bulletListHidden', false);
    });

    it('should not emit extra change events when moving within an ordered list', () => {
      const { editorView, pluginState, refs } = editor(doc(ol(li(p('t{<>}ex{end}t')))));
      const { end } = refs;
      const pos = editorView.state.doc.resolve(end);

      const spy = sinon.spy();
      pluginState.subscribe(spy);

      const tr = editorView.state.tr.setSelection(new TextSelection(pos));
      editorView.dispatch(tr);

      expect(spy.callCount).to.equal(1);
    });

    it('should not emit extra change events when moving within an ordered list to the last character', () => {
      const { editorView, pluginState, refs } = editor(doc(ol(li(p('t{<>}ext{end}')))));
      const { end } = refs;
      const pos = editorView.state.doc.resolve(end);

      const spy = sinon.spy();
      pluginState.subscribe(spy);

      const tr = editorView.state.tr.setSelection(new TextSelection(pos));
      editorView.dispatch(tr);

      expect(spy.callCount).to.equal(1);
    });

    it('should emit change events when the state has changed', () => {
      const { editorView, pluginState } = editor(doc(p('t{<}ex{>}t')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      pluginState.toggleOrderedList(editorView);
      pluginState.toggleOrderedList(editorView);
      pluginState.toggleBulletList(editorView);
      pluginState.toggleBulletList(editorView);

      expect(spy.callCount).to.equal(5);
    });

    it('should emit change events when the state has changed with entire word selected', () => {
      const { editorView, pluginState } = editor(doc(p('{<}text{>}')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      pluginState.toggleOrderedList(editorView);
      pluginState.toggleOrderedList(editorView);
      pluginState.toggleBulletList(editorView);
      pluginState.toggleBulletList(editorView);

      expect(spy.callCount).to.equal(5);
    });

    it('should allow toggling between normal text and ordered list', () => {
      const { editorView, pluginState } = editor(doc(p('t{a}ex{b}t')));

      pluginState.toggleOrderedList(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text')))));
      pluginState.toggleOrderedList(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p('text')));
    });

    it('should allow toggling between normal text and bullet list', () => {
      const { editorView, pluginState } = editor(doc(p('t{<}ex{>}t')));

      pluginState.toggleBulletList(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('text')))));
      pluginState.toggleBulletList(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p('text')));
    });

    it('should allow toggling between ordered and bullet list', () => {
      const { editorView, pluginState } = editor(doc(ol(li(p('t{<}ex{>}t')))));

      pluginState.toggleBulletList(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(ul(li(p('text')))));
      pluginState.toggleBulletList(editorView);
      expect(editorView.state.doc).to.deep.equal(doc(p('text')));
    });

    it('should make sure that it is enabled when selecting ordered list', () => {
      const { pluginState } = editor(doc(ol(li(p('te{<>}xt')))));

      expect(pluginState).to.have.property('orderedListActive', true);
      expect(pluginState).to.have.property('orderedListDisabled', false);
      expect(pluginState).to.have.property('orderedListHidden', false);
      expect(pluginState).to.have.property('bulletListActive', false);
      expect(pluginState).to.have.property('bulletListDisabled', false);
      expect(pluginState).to.have.property('bulletListHidden', false);
    });

    it('should be enabled when selecting h1', () => {
      const { pluginState } = editor(doc(h1('te{<>}xt')));

      expect(pluginState).to.have.property('orderedListActive', false);
      expect(pluginState).to.have.property('orderedListDisabled', false);
      expect(pluginState).to.have.property('orderedListHidden', false);
      expect(pluginState).to.have.property('bulletListActive', false);
      expect(pluginState).to.have.property('bulletListDisabled', false);
      expect(pluginState).to.have.property('bulletListHidden', false);
    });

    describe('untoggling a list', () => {
      const expectedOutput = doc(ol(li(p('One'))), p('Two'), p('Three'), ol(li(p('Four'))));

      it('should allow untoggling part of a list based on selection', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('{<}Two')), li(p('Three{>}')), li(p('Four')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should untoggle empty paragraphs in a list', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('{<}One')), li(p('Two')), li(p()), li(p('Three{>}')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(p('One'), p('Two'), p(), p('Three')));
      });

      it('should untoggle list item inside a blockquote', () => {
        const { editorView, pluginState } = editor(doc(blockquote(ol(li(p('One')), li(p('{<>}Two')), li(p('Three'))))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(blockquote(ol(li(p('One'))), p('Two'), ol(li(p('Three'))))));
      });

      it('should untoggle all list items with different ancestors in selection', () => {
        const { editorView, pluginState } = editor(doc(blockquote(ol(li(p('One')), li(p('{<}Two')), li(p('Three')))), ol(li(p('One{>}')), li(p('Two')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(blockquote(ol(li(p('One'))), p('Two'), p('Three')), p('One'), ol(li(p('Two')))));
      });
    });

    describe('converting a list', () => {
      it('should allow converting part of a list based on selection', () => {
        const expectedOutput = doc(ol(li(p('One'))), ul(li(p('Two')), li(p('Three'))), ol((li(p('Four')))));
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('{<}Two')), li(p('Three{>}')), li(p('Four')))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection inside panel to list', () => {
        const expectedOutput = doc(panel(ul(li(p('text')))));
        const { editorView, pluginState } = editor(doc(panel(p('te{<>}xt'))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should allow converting part of a list based on selection that starts at the end of previous line', () => {
        const expectedOutput = doc(ol(li(p('One'))), ul(li(p('Two')), li(p('Three'))), ol((li(p('Four')))));
        const { editorView, pluginState } = editor(doc(ol(li(p('One{<}')), li(p('Two')), li(p('Three{>}')), li(p('Four'))))); // When selection starts on previous (empty) node

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to a list when the selection starts with a paragraph and ends inside a list', () => {
        const expectedOutput = doc(ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four'))));
        const { editorView, pluginState } = editor(doc(p('{<}One'), ol(li(p('Two{>}')), li(p('Three')), li(p('Four')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to a list when the selection contains a list but starts and end with paragraphs', () => {
        const expectedOutput = doc(ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four'))));
        const { editorView, pluginState } = editor(doc(p('{<}One'), ol(li(p('Two')), li(p('Three'))), p('Four{>}')));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to a list when the selection starts inside a list and ends with a paragraph', () => {
        const expectedOutput = doc(ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four'))));
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('{<}Two')), li(p('Three'))), p('Four{>}')));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to a list and keep empty paragraphs', () => {
        const expectedOutput = doc(ul(li(p('One')), li(p('Two')), li(p()), li(p('Three'))));
        const { editorView, pluginState } = editor(doc(ol(li(p('{<}One')), li(p('Two')), li(p()), li(p('Three{>}')))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });

      it('should convert selection to list when selection is inside blockquote', () => {
        const { editorView, pluginState } = editor(doc(blockquote(p('{<}One'), p('Two'), p('Three{>}'))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(blockquote(ul(li(p('One')), li(p('Two')), li(p('Three'))))));
      });

      it('should convert selection to list when there is an empty paragraph between non empty two', () => {
        const expectedOutput = doc(ul(li(p('One')), li(p()), li(p('Three'))));
        const { editorView, pluginState } = editor(doc(p('{<}One'), p(), p('Three{>}')));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutput);
      });
    });

    describe('joining lists', () => {
      const expectedOutputForPreviousList = doc(ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four')), li(p('Five'))), p('Six'));
      const expectedOutputForNextList = doc(p('One'), ol(li(p('Two')), li(p('Three')), li(p('Four')), li(p('Five')), li(p('Six'))));
      const expectedOutputForPreviousAndNextList = doc(ol(li(p('One')), li(p('Two')), li(p('Three')), li(p('Four')), li(p('Five')), li(p('Six'))));

      it('should join with previous list if it\'s of the same type', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two')), li(p('Three'))), p('{<}Four'), p('Five{>}'), p('Six')));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutputForPreviousList);
      });

      it('should join with previous list if it\'s of the same type and selection starts at the end of previous line', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two')), li(p('Three{<}'))), p('Four'), p('Five{>}'), p('Six'))); // When selection starts on previous (empty) node

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutputForPreviousList);
      });

      it('should not join with previous list if it\'s not of the same type', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two')), li(p('Three'))), p('{<}Four'), p('Five{>}'), p('Six')));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('One')), li(p('Two')), li(p('Three'))), ul(li(p('Four')), li(p('Five'))), p('Six')));
      });

      it('should not join with previous list if it\'s not of the same type and selection starts at the end of previous line', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two')), li(p('Three{<}'))), p('Four'), p('Five{>}'), p('Six'))); // When selection starts on previous (empty) node

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('One')), li(p('Two')), li(p('Three'))), ul(li(p('Four')), li(p('Five'))), p('Six')));
      });

      it('should join with next list if it\'s of the same type', () => {
        const { editorView, pluginState } = editor(doc(p('One'), p('{<}Two'), p('Three{>}'), ol(li(p('Four')), li(p('Five')), li(p('Six')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutputForNextList);
      });

      it('should join with next list if it\'s of the same type and selection starts at the end of previous line', () => {
        const { editorView, pluginState } = editor(doc(p('One{<}'), p('Two'), p('Three{>}'), ol(li(p('Four')), li(p('Five')), li(p('Six')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutputForNextList);
      });

      it('should not join with next list if it isn\'t of the same type', () => {
        const { editorView, pluginState } = editor(doc(p('One'), p('{<}Two'), p('Three{>}'), ol(li(p('Four')), li(p('Five')), li(p('Six')))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(p('One'), ul(li(p('Two')), li(p('Three'))), ol(li(p('Four')), li(p('Five')), li(p('Six')))));
      });

      it('should not join with next list if it isn\'t of the same type and selection starts at the end of previous line', () => {
        const { editorView, pluginState } = editor(doc(p('One{<}'), p('Two'), p('Three{>}'), ol(li(p('Four')), li(p('Five')), li(p('Six')))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(p('One'), ul(li(p('Two')), li(p('Three'))), ol(li(p('Four')), li(p('Five')), li(p('Six')))));
      });

      it('should join with previous and next list if they\'re of the same type', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two'))), p('{<}Three'), p('Four{>}'), ol(li(p('Five')), li(p('Six')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutputForPreviousAndNextList);
      });

      it('should join with previous and next list if they\'re of the same type and selection starts at the end of previous line', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two{<}'))), p('Three'), p('Four{>}'), ol(li(p('Five')), li(p('Six')))));

        pluginState.toggleOrderedList(editorView);
        expect(editorView.state.doc).to.deep.equal(expectedOutputForPreviousAndNextList);
      });

      it('should not join with previous and next list if they\'re not of the same type', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two'))), p('{<}Three'), p('Four{>}'), ol(li(p('Five')), li(p('Six')))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('One')), li(p('Two'))), ul(li(p('Three')), li(p('Four'))), ol(li(p('Five')), li(p('Six')))));
      });

      it('should not join with previous and next list if they\'re not of the same type and selectoin starts at the end of previous line', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('One')), li(p('Two{<}'))), p('Three'), p('Four{>}'), ol(li(p('Five')), li(p('Six')))));

        pluginState.toggleBulletList(editorView);
        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('One')), li(p('Two'))), ul(li(p('Three')), li(p('Four'))), ol(li(p('Five')), li(p('Six')))));
      });
    });

    describe('Nested Lists', () => {
      it('should increase the depth of list item when Tab key press', () => {
        const { editorView } = editor(doc(ol(li(p('text')), li(p('te{<>}xt')), li(p('text')))));
        expect(editorView.state.selection.$from.depth).to.eq(3);

        sendKeyToPm(editorView, 'Tab');

        expect(editorView.state.selection.$from.depth).to.eq(5);
      });

      it('should nest the list item when Tab key press', () => {
        const { editorView } = editor(doc(ol(li(p('text')), li(p('te{<>}xt')), li(p('text')))));

        sendKeyToPm(editorView, 'Tab');

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('text')))));
      });

      it('should decrease the depth of list item when Shift-Tab key press', () => {
        const { editorView } = editor(doc(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('text')))));
        expect(editorView.state.selection.$from.depth).to.eq(5);

        sendKeyToPm(editorView, 'Shift-Tab');

        expect(editorView.state.selection.$from.depth).to.eq(3);
      });

      it('should lift the list item when Shift-Tab key press', () => {
        const { editorView } = editor(doc(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('text')))));

        sendKeyToPm(editorView, 'Shift-Tab');

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text')), li(p('te{<>}xt')), li(p('text')))));
      });

      it('should lift the list item when Enter key press is done on empty list-item', () => {
        const { editorView } = editor(doc(ol(li(p('text'), ol(li(p('{<>}')))), li(p('text')))));

        sendKeyToPm(editorView, 'Enter');

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text')), li(p('{<>}')), li(p('text')))));
      });

      it('should create new list item when Enter key is pressed twice in panel in list', () => {
        const { editorView } = editor(doc(ol(li(panel(p('text{<>}'))))));

        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(panel(p('text{<>}'))), li(p('')))));
      });

      it('should create new list item when Enter key is pressed three times in code block in list', () => {
        const { editorView } = editor(doc(ol(li(code_block({ language: 'java' })('codeBlock{<>}')))));

        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');
        sendKeyToPm(editorView, 'Enter');

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(code_block({ language: 'java' })('codeBlock')), li(p('')))));
      });
    });

    describe('Enter key-press', () => {

      context('when Enter key is pressed on empty nested list item', () => {
        it('should create new list item in parent list', () => {
          const { editorView } = editor(doc(ol(li(p('text'), ol(li(p('{<>}')))), li(p('text')))));

          sendKeyToPm(editorView, 'Enter');

          expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text')), li(p('{<>}')), li(p('text')))));
        });
      });

      context('when Enter key is pressed on non-empty nested list item', () => {
        it('should created new nested list item', () => {
          const { editorView } = editor(doc(ol(li(p('text'), ol(li(p('test{<>}')))), li(p('text')))));

          sendKeyToPm(editorView, 'Enter');

          expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text'), ol(li(p('test')), li(p('{<>}')))), li(p('text')))));
        });
      });

      context('when Enter key is pressed on non-empty top level list item', () => {
        it('should created new list item at top level', () => {
          const { editorView } = editor(doc(ol(li(p('text')), li(p('test{<>}')), li(p('text')))));

          sendKeyToPm(editorView, 'Enter');

          expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text')), li(p('test')), li(p('{<>}')), li(p('text')))));
        });
      });

      context('when Enter key is pressed on empty top level list item', () => {
        it('should create new paragraph outside the list', () => {
          const { editorView } = editor(doc(ol(li(p('text')), li(p('{<>}')), li(p('text')))));

          sendKeyToPm(editorView, 'Enter');

          expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text'))), p('{<>}'), ol(li(p('text')))));
        });
      });
    });

    describe('Toggle - nested list scenarios - to lift items out of list', () => {

      it('should be possible to toggle a simple nested list', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('text'), ol(li(p('text{<>}')))), li(p('text')))));

        pluginState.toggleOrderedList(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text'))), p('text{<>}'), ol(li(p('text')))));
      });

      it('should be possible to toggle an empty nested list item', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('text'), ol(li(p('{<>}')))), li(p('text')))));

        pluginState.toggleOrderedList(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text'))), p('{<>}'), ol(li(p('text')))));
      });

      it('should be possible to toggle a selection across different depths in the list', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('te{<}xt'), ol(li(p('text{>}')))), li(p('text')))));

        pluginState.toggleOrderedList(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(p('te{<}xt'), p('text{>}'), ol(li(p('text')))));
      });

      it('should be possible to toggle a selection across lists with different parent lists', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('te{<}xt'), ol(li(p('text'))))), ol(li(p('te{>}xt'), ol(li(p('text')))))));

        pluginState.toggleOrderedList(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(p('te{<}xt'), p('text'), p('te{>}xt'), ol(li(p('text')))));
      });

      it('should be possible to toggle a nested list inside a blockquote to the level of block-quote', () => {
        const { editorView, pluginState } = editor(doc(blockquote(ol(li(p('text'), ol(li(p('te{<>}xt')))), li(p('te{<}xt'))))));

        pluginState.toggleOrderedList(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(blockquote(ol(li(p('text'))), p('te{<>}xt'), ol(li(p('text'))))));
      });

      it('should be create a new list for children of lifted list item', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('text'), ol(li(p('te{<>}xt'), ol(li(p('text')))))), li(p('text')))));

        pluginState.toggleOrderedList(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text'))), p('te{<>}xt'), ol(li(p('text')), li(p('text')))));
      });

      it('should only change type to bullet list when toggling orderedList to bulletList', () => {
        const { editorView, pluginState } = editor(doc(ol(li(p('text'), ol(li(p('text'), ol(li(p('te{<>}xt')))))), li(p('text')))));

        pluginState.toggleBulletList(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(ol(li(p('text'), ol(li(p('text'), ul(li(p('te{<>}xt')))))), li(p('text')))));
      });
    });

  });
});
