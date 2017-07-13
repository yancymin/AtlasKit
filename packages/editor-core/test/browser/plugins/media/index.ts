import * as assert from 'assert';
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  DefaultMediaStateManager,
  MediaStateStatus,
} from '@atlaskit/media-core';
import * as mediaTestHelpers from '@atlaskit/media-test-helpers';
import {
  mediaPluginFactory,
  MediaPluginState,
  ProviderFactory,
} from '../../../../src';
import { undo, history } from '../../../../src/prosemirror';
import {
  chaiPlugin,
  doc,
  h1,
  makeEditor,
  mediaGroup,
  media,
  p,
  a,
  storyMediaProviderFactory,
  randomId,
  sleep,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

chai.use(chaiPlugin);

const stateManager = new DefaultMediaStateManager();
const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

const getFreshResolvedProvider = () => {
  return storyMediaProviderFactory(mediaTestHelpers, testCollectionName, stateManager);
};

describe('Media plugin', () => {
  const resolvedProvider = getFreshResolvedProvider();
  const temporaryFileId = `temporary:${randomId()}`;

  const providerFactory = new ProviderFactory();
  providerFactory.setProvider('mediaProvider', resolvedProvider);

  const editor = (doc: any, uploadErrorHandler?: () => void) => makeEditor<MediaPluginState>({
    doc,
    plugins: [
      ...mediaPluginFactory(defaultSchema, { providerFactory, uploadErrorHandler }),
      history(),
    ],
    schema: defaultSchema
  });

  const getNodePos = (pluginState: MediaPluginState, id: string) => {
    const mediaNodeWithPos = pluginState.findMediaNode(id);
    assert(mediaNodeWithPos, `Media node with id "${id}" has not been mounted yet`);

    return mediaNodeWithPos!.getPos();
  };

  after(() => {
    providerFactory.destroy();
  });

  it('should invoke binary picker when calling insertFileFromDataUrl', async () => {
    const { pluginState } = editor(doc(p('{<>}')));
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);
    const provider = await resolvedProvider;
    await provider.uploadContext;

    expect(pluginState.binaryPicker!).to.be.an('object');

    pluginState.binaryPicker!.upload = sinon.spy();

    pluginState.insertFileFromDataUrl(
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'test.gif'
    );

    expect((pluginState.binaryPicker!.upload as any).calledOnce).to.equal(true);
    collectionFromProvider.restore(); pluginState.destroy();
  });

  it('should call uploadErrorHandler on upload error', async () => {
    const handler = sinon.spy();
    const { pluginState } = editor(doc(p(), p('{<>}')), handler);
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

    await resolvedProvider;

    pluginState.insertFile({ id: temporaryFileId, status: 'uploading' });

    stateManager.updateState(temporaryFileId, {
      id: temporaryFileId,
      status: 'error',
      error: {
        name: 'some-error',
        description: 'something went wrong'
      }
    });

    expect(handler.calledOnce).to.eq(true, 'uploadErrorHandler should be called once per failed upload');
    expect(handler.calledWithExactly({
      id: temporaryFileId,
      status: 'error',
      error: {
        name: 'some-error',
        description: 'something went wrong'
      }
    })).to.eq(true, 'uploadErrorHandler should be called with MediaState containing \'error\' status');
    collectionFromProvider.restore(); pluginState.destroy();
  });

  it('should remove failed uploads from the document', async () => {
    const handler = sinon.spy();
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')), handler);
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

    const provider = await resolvedProvider;
    await provider.uploadContext;

    pluginState.insertFile({ id: temporaryFileId, status: 'uploading' });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
        p(),
      )
    );

    stateManager.updateState(temporaryFileId, {
      id: temporaryFileId,
      status: 'error'
    });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        p()
      )
    );
    collectionFromProvider.restore(); editorView.destroy(); pluginState.destroy();
  });

  it('should cancel in-flight uploads after media item is removed from document', async () => {
    const spy = sinon.spy();
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')), spy);
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);
    const firstTemporaryFileId = `temporary:first`;
    const secondTemporaryFileId = `temporary:second`;
    const thirdTemporaryFileId = `temporary:third`;

    // wait until mediaProvider has been set
    const provider = await resolvedProvider;
    // wait until mediaProvider's uploadContext has been set
    await provider.uploadContext;

    pluginState.insertFile({ id: firstTemporaryFileId, status: 'uploading' });
    pluginState.insertFile({ id: secondTemporaryFileId, status: 'uploading' });
    pluginState.insertFile({ id: thirdTemporaryFileId, status: 'uploading' });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: thirdTemporaryFileId, type: 'file', collection: testCollectionName }),
          media({ id: secondTemporaryFileId, type: 'file', collection: testCollectionName }),
          media({ id: firstTemporaryFileId, type: 'file', collection: testCollectionName }),
        ),
        p(),
      )
    );

    stateManager.updateState(firstTemporaryFileId, {
      id: firstTemporaryFileId,
      status: 'uploading'
    });

    stateManager.updateState(secondTemporaryFileId, {
      id: secondTemporaryFileId,
      status: 'processing'
    });

    stateManager.subscribe(firstTemporaryFileId, spy);
    stateManager.subscribe(secondTemporaryFileId, spy);
    stateManager.subscribe(thirdTemporaryFileId, spy);

    let pos: number;
    pos = getNodePos(pluginState, firstTemporaryFileId);
    editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
    // When removing multiple nodes with node view, ProseMirror performs the DOM update
    // asynchronously after a 20ms timeout. In order for the operations to succeed, we
    // must wait for the DOM reconciliation to conclude before proceeding.
    await sleep(100);

    pos = getNodePos(pluginState, secondTemporaryFileId);
    editorView.dispatch(editorView.state.tr.delete(pos, pos + 1));
    await sleep(100);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: thirdTemporaryFileId, type: 'file', collection: testCollectionName }),
        ),
        p(),
      )
    );

    expect(spy.callCount).to.eq(2, 'State Manager should receive "cancelled" status');

    expect(spy.calledWithExactly({
      id: firstTemporaryFileId,
      status: 'cancelled'
    })).to.eq(true, 'State Manager should emit "cancelled" status');

    expect(spy.calledWithExactly({
      id: secondTemporaryFileId,
      status: 'cancelled'
    })).to.eq(true, 'State Manager should emit "cancelled" status');
    collectionFromProvider.restore(); editorView.destroy(); pluginState.destroy();
  });

  it('should not revert to temporary media nodes after upload finished and we undo', async () => {
    const { editorView, pluginState } = editor(doc(p(), p('{<>}')));
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);
    const tempFileId = `temporary:${randomId()}`;
    const publicFileId = `${randomId()}`;

    // wait until mediaProvider has been set
    const provider = await resolvedProvider;
    // wait until mediaProvider's uploadContext has been set
    await provider.uploadContext;

    pluginState.insertFile({ id: tempFileId, status: 'uploading' });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: tempFileId, type: 'file', collection: testCollectionName }),
        ),
        p(),
      )
    );

    stateManager.updateState(tempFileId, {
      id: tempFileId,
      status: 'uploading'
    });

    // mark the upload as finished, triggering replacement of media node
    stateManager.updateState(tempFileId, {
      id: tempFileId,
      publicId: publicFileId,
      status: 'ready'
    });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        mediaGroup(
          media({ id: publicFileId, type: 'file', collection: testCollectionName }),
        ),
        p(),
      )
    );

    // undo last change
    expect(undo(editorView.state, editorView.dispatch)).to.equal(true);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        p(),
        // the second paragraph is a side effect of PM history snapshots merging
        p(),
      )
    );
    collectionFromProvider.restore(); editorView.destroy(); pluginState.destroy();
  });

  it('should set new pickers exactly when new media provider is set', async () => {
    const { pluginState } = editor(doc(h1('text{<>}')));
    expect(pluginState.pickers).to.have.length(0);

    const mediaProvider1 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider1);
    const mediaProvider2 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider2);

    const resolvedMediaProvider1 = await mediaProvider1;
    const resolvedMediaProvider2 = await mediaProvider2;
    await resolvedMediaProvider1.uploadContext;
    await resolvedMediaProvider2.uploadContext;

    expect(pluginState.pickers).to.have.length(4);
  });

  it('should re-use old pickers when new media provider is set', async () => {
    const { pluginState } = editor(doc(h1('text{<>}')));
    expect(pluginState.pickers).to.have.length(0);

    const mediaProvider1 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider1);
    const resolvedMediaProvider1 = await mediaProvider1;
    await resolvedMediaProvider1.uploadContext;
    const pickersAfterMediaProvider1 = pluginState.pickers;
    expect(pickersAfterMediaProvider1).to.have.length(4);

    const mediaProvider2 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider2);
    const resolvedMediaProvider2 = await mediaProvider2;
    await resolvedMediaProvider2.uploadContext;
    const pickersAfterMediaProvider2 = pluginState.pickers;

    expect(pickersAfterMediaProvider1).to.have.length(pickersAfterMediaProvider2.length);
    for (let i = 0; i < pickersAfterMediaProvider1.length; i++) {
      expect(pickersAfterMediaProvider1[i]).to.equal(pickersAfterMediaProvider2[i]);
    }
  });

  it('should set new upload params for existing pickers when new media provider is set', async () => {
    const { pluginState } = editor(doc(h1('text{<>}')));
    expect(pluginState.pickers).to.have.length(0);

    const mediaProvider1 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider1);
    const resolvedMediaProvider1 = await mediaProvider1;
    await resolvedMediaProvider1.uploadContext;

    pluginState.pickers.forEach(picker => {
      picker.setUploadParams = sinon.spy();
    });

    const mediaProvider2 = getFreshResolvedProvider();
    pluginState.setMediaProvider(mediaProvider2);
    const resolvedMediaProvider2 = await mediaProvider2;
    await resolvedMediaProvider2.uploadContext;

    pluginState.pickers.forEach(picker => {
      expect((picker.setUploadParams as any).calledOnce).to.equal(true);
    });
  });

  [
    'unfinalized',
    'unknown',
    'ready',
    'error',
    'cancelled',
  ].forEach((status: MediaStateStatus) => {
    it(`should remove ${status} media nodes`, async () => {
      const mediaNode = media({ id: 'foo', type: 'file', collection: testCollectionName });
      const { editorView, pluginState } = editor(
        doc(
          mediaGroup(mediaNode),
          mediaGroup(media({ id: 'bar', type: 'file', collection: testCollectionName })),
        ),
      );

      await resolvedProvider;

      stateManager.updateState('foo', {
        status,
        id: 'foo',
      });

      const pos = getNodePos(pluginState, 'foo');
      pluginState.handleMediaNodeRemove(mediaNode, () => pos);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: 'bar', type: 'file', collection: testCollectionName })
          )
        ));
    });
  });

  it('should focus the editor after files are added to the document', async () => {
    const { editorView, pluginState } = editor(doc(p('')));
    await resolvedProvider;

    pluginState.insertFile({ id: 'foo' });
    expect(editorView.hasFocus()).to.be.equal(true);

    pluginState.insertFile({ id: 'bar' });
    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(
          media({ id: 'bar', type: 'file', collection: testCollectionName }),
          media({ id: 'foo', type: 'file', collection: testCollectionName }),
        ),
        p(),
      ),
    );
  });

  it(`should copy optional attributes from MediaState to Node attrs`, () => {
    const { editorView, pluginState } = editor(doc(p('{<>}')));
    const collectionFromProvider = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

    pluginState.insertFile({
      id: temporaryFileId, status: 'uploading', fileName: 'foo.png', fileSize: 1234, fileMimeType: 'image/png'
    });

    expect(editorView.state.doc).to.deep.equal(
      doc(
        mediaGroup(
          media({
            id: temporaryFileId,
            type: 'file',
            collection: testCollectionName,
            __fileName: 'foo.png',
            __fileSize: 1234,
            __fileMimeType: 'image/png'
          }),
        ),
        p(),
      ),
    );
    collectionFromProvider.restore(); editorView.destroy(); pluginState.destroy();
  });


  describe('detectLinkRangesInSteps', () => {
    const link1 = a({ href: 'www.google.com' })('google');
    const link2 = a({ href: 'www.baidu.com' })('baidu');

    context('when ignore links flag is set to true', () => {
      it('does not detect any links', () => {
        const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
        const { state } = editorView;
        const tr = state.tr.replaceWith(sel, sel, link1.concat(link2));
        pluginState.ignoreLinks = true;
        pluginState.allowsLinks = true;

        const linksRanges = pluginState.detectLinkRangesInSteps(tr);

        expect(linksRanges).to.deep.equal([]);
      });

      it('resets ignore links flag to false', () => {
        const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
        const { state } = editorView;
        const tr = state.tr.replaceWith(sel, sel, link1.concat(link2));
        pluginState.ignoreLinks = true;
        pluginState.allowsLinks = true;

        pluginState.detectLinkRangesInSteps(tr);

        expect(pluginState.ignoreLinks).to.equal(false);
      });
    });

    context('when ignore links flag is set to false', () => {
      it('sets ranges with links', () => {
        const { editorView, pluginState, sel } = editor(doc(p('{<>}')));
        const { state } = editorView;
        const tr = state.tr.replaceWith(sel, sel, link1.concat(link2));
        pluginState.ignoreLinks = false;
        pluginState.allowsLinks = true;

        pluginState.detectLinkRangesInSteps(tr);

        expect((pluginState as any).linkRanges).to.deep.equal([
          { start: sel, end: sel, urls: ['www.google.com', 'www.baidu.com'] }
        ]);
      });
    });
  });

  describe('insertLinks', () => {
    it('creates a link card below where is the link created', () => {
      const link = 'www.google.com';
      const { editorView, pluginState, sel } = editor(doc(p(`${link} {<>}`)));
      const collectionFromProviderSpy = sinon.stub(pluginState, 'collectionFromProvider').returns(testCollectionName);

      // way to stub private member
      (pluginState as any).linkRanges = [{ start: sel - link.length - 1, end: sel, urls: [link] }];

      // -1 for space, simulate the scenario of autoformatting link
      pluginState.insertLinks();

      expect(editorView.state.doc).to.deep.equal(doc(
        p(`${link} `),
        mediaGroup(media({ id: link, type: 'link', collection: testCollectionName })),
        p(),
      ));

      collectionFromProviderSpy.restore();
    });
  });
});
