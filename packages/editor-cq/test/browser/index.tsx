import * as chai from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import {
  chaiPlugin,
  fromHTML,
  makeEditor,
  sendKeyToPm,
  toDOM,
} from '@atlaskit/editor-core/dist/es5/test-helper';
import {
  confluenceUnsupportedBlock,
  confluenceUnsupportedInline
} from '@atlaskit/editor-core';
import {
  blockquote,
  doc,
  h1,
  p,
} from './_schema-builder';
import Editor from '../../src';
import schema from '../../src/schema';

chai.use(chaiPlugin);

const expect = chai.expect;

describe('@atlaskit/editor-cq', () => {
  describe('expanded and isExpanded behaviour', () => {
    it('should render collapsed chrome if neither isExpandedByDefault not expanded is set', () => {
      expect(mount(<Editor />).find('ChromeCollapsed')).to.have.length.above(0);
    });

    it('should render expanded chrome if only isExpandedByDefault is set', () => {
      expect(mount(<Editor isExpandedByDefault={true} />).find('ChromeExpanded')).to.have.length.above(0);
    });

    it('should render expanded chrome if only expanded is set', () => {
      expect(mount(<Editor expanded={true} />).find('ChromeExpanded')).to.have.length.above(0);
    });

    it('should render disabled chrome if disabled=true', () => {
      const chrome = mount(<Editor isExpandedByDefault={true} disabled={true} />).find('ChromeExpanded');
      expect(chrome.prop('disabled')).to.equal(true);
    });

    it('should disable chrome when disabled is changed', () => {
      const chrome = mount(<Editor isExpandedByDefault={true} />);
      expect(chrome.find('ChromeExpanded').prop('disabled')).to.equal(false);

      chrome.setProps({ disabled: true });
      expect(chrome.find('ChromeExpanded').prop('disabled')).to.equal(true);
    });

    it('should have higher priority for expanded over isExpandedByDefault', () => {
      expect(
        mount(<Editor expanded={false} isExpandedByDefault={true} />).find('ChromeCollapsed')
      ).to.have.length.above(0);
    });

    it('should expand chrome if expanded has been changed', () => {
      const node = mount(<Editor isExpandedByDefault={true} />);
      expect(node.find('ChromeExpanded')).to.have.length.above(0);

      node.setProps({ expanded: false });
      expect(node.find('ChromeCollapsed')).to.have.length.above(0);
    });

    it('should call onExpanded after editor is expanded via click', () => {
      const spy = sinon.spy();
      const node = mount(<Editor onExpanded={spy} isExpandedByDefault={false} />);
      node.find('ChromeCollapsed input').simulate('focus');
      expect(spy.callCount).to.equal(1);
    });

    it('should call onExpanded after editor is expanded via expanded prop', () => {
      const spy = sinon.spy();
      const node = mount(<Editor onExpanded={spy} isExpandedByDefault={false} />);
      node.setProps({ expanded: true });
      expect(spy.callCount).to.equal(1);
    });

    it('should focus the editor only when editorView exists', (done) => {
      const spy = sinon.spy();
      const editor = mount(<Editor isExpandedByDefault={false}/>);

      (editor as any).node.focus = () => {
        expect(editor.state().editorView).to.not.equal(undefined);
        spy();
      };

      editor.setProps({ expanded: true });

      // setting `expanded` prop calls render() again
      // render() calls handleRef() which in turn sets `editorView` state
      // setState() is async so we need to wait for it
      editor.setState({}, () => {
        expect(spy.callCount).to.equal(1);
        done();
      });
    });
  });

  describe('ED-1410', () => {
    const editor = (doc: any) => {
      const ed = makeEditor({
        doc,
        schema
      });

      afterEach(() => {
        ed.editorView.destroy();
      });

      return ed;
    };

    it('should split heading when Enter is pressed', () => {
      const { editorView } = editor(doc(h1('text{<>}')));

      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).to.deep.equal(doc(h1('text'), p()));
    });

    it('should not break blockquote when Enter is pressed', () => {
      const { editorView } = editor(doc(blockquote(p('text{<>}'))));

      sendKeyToPm(editorView, 'Enter');

      expect(editorView.state.doc).to.deep.equal(doc(blockquote(p('text'), p())));
    });
  });

  describe('@atlaskit/editor-cq/schema unsupported nodes', () => {
    describe('parse HTML', () => {
      it('should work for unsupported block nodes', () => {
        const doc = fromHTML('<div data-node-type="confluenceUnsupportedBlock" data-confluence-unsupported="block" data-confluence-unsupported-block-cxhtml="foobar"/>', schema);
        const unsupportedBlockNode = doc.firstChild!;

        expect(unsupportedBlockNode.type.spec).to.equal(confluenceUnsupportedBlock);
        expect(unsupportedBlockNode.attrs.cxhtml).to.be.equal('foobar');
      });

      it('should work for unsupported inline nodes', () => {
        const doc = fromHTML('<div data-node-type="confluenceUnsupportedInline" data-confluence-unsupported="inline" data-confluence-unsupported-inline-cxhtml="foobar"/>', schema);
        const paragraph = doc.firstChild!;
        const unsupportedInlineNode = paragraph.firstChild!;

        expect(unsupportedInlineNode.type.spec).to.equal(confluenceUnsupportedInline);
        expect(unsupportedInlineNode.attrs.cxhtml).to.be.equal('foobar');
      });
    });

    describe('encode to html', () => {
      it('should work for unsupported block nodes', () => {
        const unsupportedBlockNode = schema.nodes.confluenceUnsupportedBlock.create({ cxhtml: 'foobar' });
        const domNode = toDOM(unsupportedBlockNode, schema).firstChild as HTMLElement;

        expect(domNode.dataset.confluenceUnsupported).to.be.equal('block');
        expect(domNode.dataset.confluenceUnsupportedBlockCxhtml).to.be.equal('foobar');
      });

      it('should work for unsupported inline nodes', () => {
        const unsupportedInlineNode = schema.nodes.confluenceUnsupportedInline.create({ cxhtml: 'foobar' });
        const domNode = toDOM(unsupportedInlineNode, schema).firstChild as HTMLElement;

        expect(domNode.dataset.confluenceUnsupported).to.be.equal('inline');
        expect(domNode.dataset.confluenceUnsupportedInlineCxhtml).to.be.equal('foobar');
      });
    });
  });
});

describe('@atlaskit/editor-cq/focus', () => {
  let editorWrapper: ReactWrapper<any, any>;

  beforeEach(() => {
    editorWrapper = mount(<Editor isExpandedByDefault={true} />);
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
