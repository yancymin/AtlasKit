import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import hyperlinkPlugins, { HyperlinkState } from '../../../../src/plugins/hyperlink';
import {
  chaiPlugin, createEvent, doc, insert, insertText, a as link, code_block,
  makeEditor, p as paragraph, sendKeyToPm, setTextSelection, dispatchPasteEvent
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

describe('hyperlink', () => {
  const editor = (doc: any) => makeEditor<HyperlinkState>({
    doc,
    plugins: hyperlinkPlugins(defaultSchema),
  });

  const event = createEvent('event');

  describe('active', () => {
    context('when select the whole hyperlink text from start to end', () => {
      it('is active', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select the whole hyperlink text from end to start', () => {
      it('is active', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select part of the hyperlink text from the end', () => {
      it('is active', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select part of the hyperlink text from the start', () => {
      it('is active', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when select part of the hyperlink text in the middle', () => {
      it('is active', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when cursor is winthin hyperlink text', () => {
      it('is active', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

        expect(pluginState.active).to.equal(true);
      });
    });

    context('when cursor at the beginning of hyperlink text', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

        expect(pluginState.active).to.equal(false);
      });
    });

    context('when cursor at the end of hyperlink text', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

        expect(pluginState.active).to.equal(false);
      });
    });
  });

  describe('element', () => {
    context('when select the whole hyperlink text from start to end', () => {
      it('returns link element', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.element!.tagName).to.eq('A');
      });
    });

    context('when select the whole hyperlink text from end to start', () => {
      it('returns link element', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}text{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        expect(pluginState.element!.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text from the end', () => {
      it('returns link element', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ext{pos2}'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos2, pos1);

        expect(pluginState.element!.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text from the start', () => {
      it('returns link element', () => {
        const { editorView, pluginState, refs } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{pos1}t{pos2}ext'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.element!.tagName).to.eq('A');
      });
    });

    context('when select part of the hyperlink text in the middle', () => {
      it('returns link element', () => {
        const { editorView, refs, pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('t{pos1}ex{pos2}t'), 'after')));
        const { pos1, pos2 } = refs;

        setTextSelection(editorView, pos1, pos2);

        expect(pluginState.element!.tagName).to.eq('A');
      });
    });

    context('when cursor is winthin hyperlink text', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('tex{<>}t'), 'after')));

        expect(pluginState.element!.tagName).to.eq('A');
      });
    });

    context('when cursor at the beginning of hyperlink text', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('{<>}text'), 'after')));

        expect(pluginState.element).to.equal(undefined);
      });
    });

    context('when cursor at the end of hyperlink text', () => {
      it('returns undefined', () => {
        const { pluginState } = editor(doc(paragraph('before', link({ href: 'http://www.atlassian.com' })('text{<>}'), 'after')));

        expect(pluginState.element).to.equal(undefined);
      });
    });
  });

  describe('API', () => {
    it('should allow a change handler to be registered', () => {
      const { pluginState } = editor(doc(paragraph('')));

      pluginState.subscribe(sinon.spy());
    });

    it('should get current state immediately once subscribed', () => {
      const { pluginState } = editor(doc(paragraph('{<}text{>}')));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      expect(spy.callCount).to.equal(1);
    });

    it('should be able to register handlers for state change events', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{pos}xt'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      setTextSelection(editorView, refs['pos']);

      expect(spy.callCount).to.equal(2);
    });

    it('sets linkable to false when in a context where links are not supported by the schema', () => {
      const { pluginState } = editor(doc(code_block()('{<}text{>}')));

      expect(pluginState.linkable).to.equal(false);
    });

    it('sets active to true when link is already in place', () => {
      const { pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      expect(pluginState.active).to.equal(true);
    });

    it('does not emit `change` multiple times when the selection moves within a link', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('{<>}text', link({ href: 'http://www.atlassian.com' })('l{pos1}i{pos2}nk'))));
      const spy = sinon.spy();
      const { pos1, pos2 } = refs;
      pluginState.subscribe(spy);

      setTextSelection(editorView, pos1);
      setTextSelection(editorView, pos2);

      expect(spy.callCount).to.equal(2);
    });

    it('emits change when the selection leaves a link', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('te{textPos}xt {<>}')));
      const { textPos } = refs;
      const spy = sinon.spy();
      const { linkPos } = insert(editorView, link({ href: 'http://www.atlassian.com' })('li{linkPos}nk'));
      setTextSelection(editorView, linkPos);

      pluginState.subscribe(spy);
      setTextSelection(editorView, textPos);

      expect(spy.callCount).to.equal(2);
    });

    it('permits adding a link to an empty selection using the href', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'http://www.atlassian.com';

      pluginState.addLink({ href }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })(href))));
    });

    it('should add http:// for a link without protocol', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'www.atlassian.com';
      const hrefWithProtocol = 'http://' + href;

      pluginState.addLink({ href }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: hrefWithProtocol })(href))));
    });

    it('should add mailto: for a link if it is an email', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<>}')));
      const href = 'test@atlassian.com';
      const hrefWithProtocol = 'mailto:' + href;

      pluginState.addLink({ href }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: hrefWithProtocol })(href))));
    });

    it('does not permit adding a link to an existing link', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}link{>}'))));

      pluginState.addLink({ href: 'http://www.example.com' }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('link'))));
    });

    it('does not permit adding a link when not supported by the schema', () => {
      const { editorView, pluginState } = editor(doc(code_block()('{<}text{>}')));

      pluginState.addLink({ href: 'http://www.atlassian.com' }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(code_block()('text')));
    });

    it('requires href when adding a link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<}text{>}')));

      pluginState.addLink({ href: 'http://example.com' }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('text'))));
    });

    it('should not be a part of the link when typing before it', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('a{before}{<}text{>}')));
      const { before } = refs;
      const href = 'http://example.com';

      pluginState.addLink({ href }, editorView);
      insertText(editorView, 'bar', before);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(`abar`, link({ href })('text'))));
    });

    it('should be a part of the link when typing in it', () => {
      const { editorView, refs, pluginState } = editor(doc(paragraph('{<}te{middle}xt{>}')));
      const { middle } = refs;
      const href = 'http://example.com';

      pluginState.addLink({ href }, editorView);
      insertText(editorView, 'bar', middle);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })('tebarxt'))));
    });

    it('should not be a part of the link when typing after it', () => {
      const { refs, editorView, pluginState } = editor(doc(paragraph('{<}text{>}{end}')));
      const { end } = refs;
      const href = 'http://example.com';

      pluginState.addLink({ href }, editorView);
      insertText(editorView, 'bar', end);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href })('text'), 'bar')));
    });

    it('should allow links to be added when the selection is empty', () => {
      const { pluginState } = editor(doc(paragraph('{<>}text')));

      expect(pluginState.linkable).to.equal(true);
    });

    it('should add link in the correct position', () => {
      const { editorView, pluginState } = editor(doc(paragraph('text'), paragraph('{<}text{>}')));
      const href = 'http://example.com';

      pluginState.addLink({ href }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text'), paragraph(link({ href })('text'))));
    });

    it('should not be able to unlink a node that has no link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<}text{>}')));

      pluginState.removeLink(editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text')));
    });

    it('should be able to unlink an existing link', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      pluginState.removeLink(editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text')));
    });

    it('should be able to unlink an existing link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('hello ', link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      pluginState.removeLink(editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('hello text')));
    });

    context('when a link is in the second paragraph', () => {
      it('should be able to unlink that link', () => {
        const { editorView, pluginState } = editor(doc(paragraph('hello'), paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

        pluginState.removeLink(editorView);

        expect(editorView.state.doc).to.deep.equal(doc(paragraph('hello'), paragraph('text')));
      });
    });

    it('should be able to update existing links with href', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('{<}text{>}'))));

      pluginState.updateLink({ href: 'http://example.com' }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('text'))));
    });

    it('should be able to update existing links text', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('www.atlas{<>}sian.com'))));

      pluginState.updateLinkText('Atlassian', editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'))));
    });

    it('should allow updating a link if new href is empty', () => {
      const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://example.com' })('{<}text{>}'))));

      pluginState.updateLink({ href: '' }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: '' })('text'))));
    });

    it('should not be able to update when not in a link', () => {
      const { editorView, pluginState } = editor(doc(paragraph('{<}text{>}')));

      pluginState.updateLink({ href: 'http://example.com/foo' }, editorView);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('text')));
    });

    it('should escape from link mark when typing at the beginning of the link', () => {
      const { editorView } = editor(doc(paragraph(link({ href: 'http://example.com' })('text'))));

      insertText(editorView, '1', 1, 1);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph('1', link({ href: 'http://example.com' })('text'))));
    });

    it('should not escape from link mark when typing at the middle of the link', () => {
      const { editorView } = editor(doc(paragraph(link({ href: 'http://example.com' })('text'))));

      insertText(editorView, '1', 2, 2);

      expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://example.com' })('t1ext'))));
    });


    it('should call subscribers when link is clicked', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
      const spy = sinon.spy();

      pluginState.subscribe(spy);
      plugin.props.handleClick!(editorView, 2, createEvent('event'));

      expect(spy.callCount).to.equal(2);
    });

    it('should call subscribers when link was focused and then editor is blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
      const spy = sinon.spy();

      pluginState.subscribe(spy);
      plugin.props.onBlur!(editorView, event);

      expect(spy.callCount).to.equal(2);
    });

    it('should not call subscribers if link was not focused when editor is blur', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph('te{<>}st'), paragraph(link({ href: 'http://www.atlassian.com' })('text'))));
      const spy = sinon.spy();

      pluginState.subscribe(spy);
      plugin.props.onBlur!(editorView, event);

      expect(spy.callCount).to.equal(1);
    });

    it('should not call subscribers if editor is focused but link is not focused', () => {
      const { editorView, plugin, pluginState } = editor(doc(paragraph('te{<>}st'), paragraph(link({ href: 'http://www.atlassian.com' })('text'))));
      const spy = sinon.spy();
      pluginState.subscribe(spy);

      plugin.props.onBlur!(editorView, event);
      plugin.props.onFocus!(editorView, event);

      expect(spy.callCount).to.equal(1);
    });

    it('should return referring DOM element', () => {
      const { pluginState } = editor(doc(
        paragraph(link({ href: 'http://www.atlassian.com' })('atlassian')),
        paragraph(link({ href: 'http://www.stypositive.ru' })('d{<>}sorin')))
      );

      expect(pluginState.element!.textContent).to.eq('dsorin');
    });
  });

  describe('editorFocued', () => {
    context('when editor is focused', () => {
      it('it is true', () => {
        const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));

        plugin.props.onBlur!(editorView, event);
        plugin.props.onFocus!(editorView, event);

        expect(pluginState.editorFocused).to.equal(true);
      });
    });

    context('when editor is blur', () => {
      it('it is false', () => {
        const { editorView, plugin, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));

        plugin.props.onBlur!(editorView, event);

        expect(pluginState.editorFocused).not.to.equal(true);
      });
    });
  });

  describe('showLinkPanel', () => {
    context('when called without any selection in the editor', () => {
      it('should set state value showToolbarPanel to true', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));
        pluginState.showLinkPanel(editorView, );
        expect(pluginState.showToolbarPanel).to.equal(true);
      });
    });

    context('when called without any selection in the editor', () => {
      it('should call subscribers', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);
        pluginState.showLinkPanel(editorView);
        expect(spy.callCount).to.equal(2);
      });
    });

    context('when called with cursor in a link', () => {
      it('should not call subscribers', () => {
        const { editorView, pluginState } = editor(doc(paragraph(link({ href: 'http://www.atlassian.com' })('te{<>}xt'))));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        pluginState.showLinkPanel(editorView);
        expect(spy.callCount).to.equal(1);
      });
    });

    context('when called with a selection in the editor', () => {
      it('should create a link node', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));

        setTextSelection(editorView, 4, 7);
        pluginState.showLinkPanel(editorView);

        expect(pluginState.activeLinkNode).not.to.equal(undefined);
        expect(pluginState.text).not.to.equal(undefined);
      });
    });
  });

  describe('Key Press Cmd-K', () => {
    context('when called without any selection in the editor', () => {
      it('should call subscribers', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        sendKeyToPm(editorView, 'Mod-k');

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when called with selection in the editor', () => {
      it('should call subscribers', () => {
        const { editorView, pluginState } = editor(doc(paragraph('{<}testing{>}')));
        const spy = sinon.spy();
        pluginState.subscribe(spy);

        sendKeyToPm(editorView, 'Mod-k');

        expect(spy.callCount).to.equal(2);
      });
    });

    context('when called with a selection in the editor', () => {
      it('should create a link node', () => {
        const { editorView, pluginState } = editor(doc(paragraph('testing')));

        setTextSelection(editorView, 4, 7);
        sendKeyToPm(editorView, 'Mod-k');

        expect(pluginState.activeLinkNode).not.to.equal(undefined);
        expect(pluginState.text).not.to.equal(undefined);
      });
    });
  });

  describe.skip('paste', () => {
    context('url link is at beginning of plain text', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.atlassian.com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('http://www.atlassian.com'), ' test')));
      });
    });

    context('a string which is valid email is present in url', () => {
      it('should not create separate mail link for email', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.atlassian.com/test@atlassian.com' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(
          link({
            href: 'http://www.atlassian.com/test@atlassian.com'
          })('http://www.atlassian.com/test@atlassian.com'),
        )));
      });
    });

    context('a string which is valid url is present in another url', () => {
      it('should not create separate mail link for email', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.atlassian.com/www.temp.com' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(
          link({
            href: 'http://www.atlassian.com/www.temp.com'
          })('http://www.atlassian.com/www.temp.com'),
        )));
      });
    });

    context('url link has brackets', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'http://www.(atlassian).com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.(atlassian).com' })('http://www.(atlassian).com'), ' test')));
      });
    });

    context('url link is at end of html text', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: '<a href="http://www.atlassian.com">Atlassian</a> test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'), ' test')));
      });
    });

    context('url link without anchor tags in html', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'http://www.atlassian.com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'), ' test')));
      });
    });

    context('url link without anchor tags in html in middle of other text', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'testing http://www.atlassian.com test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph('testing ', link({ href: 'http://www.atlassian.com' })('Atlassian'), ' test')));
      });
    });

    context('url link without anchor tags in html without other text', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'http://www.atlassian.com' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'http://www.atlassian.com' })('Atlassian'))));
      });
    });

    context('email link is at middle of plain text', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { plain: 'test test@atlassian.com test' })) {
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph('test ', link({ href: 'mailto:test@atlassian.com' })('test@atlassian.com'), ' test')));
      });
    });

    context('email link without anchor tags in html', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'test@atlassian.com test' })) {
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'mailto:test@atlassian.com' })('test@atlassian.com'), ' test')));
      });
    });

    context('email link without anchor tags in html in middle of other text', () => {
      it('should add link mark', function() {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: 'test test@atlassian.com test' })) {
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph('test ', link({ href: 'mailto:test@atlassian.com' })('test@atlassian.com'), ' test')));
      });
    });

    context('email link is at end of html', () => {
      it('should add link mark', function () {
        const { editorView } = editor(doc(paragraph('{<>}')));
        if (!dispatchPasteEvent(editorView, { html: '<a href="mailto:test@atlassian.com">Atlassian</a> test' })) {
          // This environment does not allow mocking paste events
          return this.skip();
        }
        expect(editorView.state.doc).to.deep.equal(doc(paragraph(link({ href: 'mailto:test@atlassian.com' })('Atlassian'), ' test')));
      });
    });
  });
});
