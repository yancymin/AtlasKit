import * as chai from 'chai';
import { expect } from 'chai';
import {
  MediaPluginState,
} from '../../../../src';
import {
  chaiPlugin,
  doc,
  makeEditor,
  mediaGroup,
  media,
  p,
  h1,
  hr,
  mention,
  code_block,
  blockquote,
  randomId,
  setNodeSelection,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { insertFile } from '../../../../src/plugins/media/media-files';

chai.use(chaiPlugin);

const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

describe('media-links', () => {
  const temporaryFileId = `temporary:${randomId()}`;
  const editor = (doc: any, uploadErrorHandler?: () => void) => makeEditor<MediaPluginState>({
    doc,
    schema: defaultSchema,
  });

  context('when cursor is at the end of a text block', () => {
    it('inserts media node into the document after current paragraph node', () => {
      const { editorView } = editor(doc(p('text{<>}')));

      insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p('text'),
          mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
    });

    it('puts cursor to the next paragraph after inserting media node', () => {
      const { editorView } = editor(doc(p('text{<>}')));

      insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

      const paragraphNodeSize = p('text').nodeSize;
      const mediaGroupNodeSize = mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })).nodeSize;
      expect(editorView.state.selection.from).to.eq(paragraphNodeSize + mediaGroupNodeSize + 1);
    });

    it('should prepend media node to existing media group after it', () => {
      const { editorView } = editor(doc(
        p('text{<>}'),
        mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
      ));

      insertFile(editorView, { id: 'mock2', status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p('text{<>}'),
          mediaGroup(
            media({ id: 'mock2', type: 'file', collection: testCollectionName }),
            media({ id: temporaryFileId, type: 'file', collection: testCollectionName }),
          )
        )
      );
    });
  });

  context('when cursor is at the beginning of a text block', () => {
    it('should prepend media node to existing media group before it', () => {
      const { editorView } = editor(doc(
        mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
        p('{<>}text'),
      ));

      insertFile(editorView, { id: 'mock2', status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(
            media({ id: 'mock2', type: 'file', collection: testCollectionName }),
            media({ id: temporaryFileId, type: 'file', collection: testCollectionName }),
          ),
          p('text'),
        )
      );
    });
  });

  context('when cursor is in the middle of a text block', () => {
    context('when inside a paragraph', () => {
      it('splits text', () => {
        const { editorView } = editor(doc(p('te{<>}xt')));

        insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            p('te'),
            mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
            p('xt'),
          )
        );
      });

      it('moves cursor to the front of later part of the text', () => {
        const { editorView } = editor(doc(p('te{<>}xt')));

        const paragraphNodeSize = p('te').nodeSize;
        const mediaGroupNodeSize = mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })).nodeSize;

        insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

        expect(editorView.state.selection.from).to.eq(paragraphNodeSize + mediaGroupNodeSize + 1);
      });
    });

    context('when inside a heading', () => {
      it('preserves heading', () => {
        const { editorView } = editor(doc(h1('te{<>}xt')));

        insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            h1('te'),
            mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
            h1('xt'),
          )
        );
      });
    });
  });
  context('when selection is not empty', () => {
    context('when selection is a text', () => {
      context('when selection is in the middle of the text block', () => {
        it('replaces selection with a media node', () => {
          const { editorView } = editor(doc(p('te{<}x{>}t')));

          insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('te'),
              mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
              p('t'),
            )
          );
        });
      });

      context('when selection covers the whole text block', () => {
        context('when there is no existing media group nearby', () => {
          context('when inside a paragraph', () => {
            it('replaces selection with a media node', () => {
              const { editorView } = editor(doc(p('{<}text{>}')));

              insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
                  p(),
                )
              );
            });
          });

          context('when inside a heading', () => {
            it('replaces selection with a media node', () => {
              const { editorView } = editor(doc(h1('{<}text{>}')));

              insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  h1(),
                  mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
                  p(),
                )
              );
            });
          });
        });

        context('when there is an existing media group nearby', () => {
          it('prepand media to the media group after parent', () => {
            const { editorView } = editor(doc(
              mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
              p('{<}text{>}'),
              mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
            ));

            insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);

            expect(editorView.state.doc).to.deep.equal(
              doc(
                mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
                p(),
                mediaGroup(
                  media({ id: 'new one', type: 'file', collection: testCollectionName }),
                  media({ id: temporaryFileId, type: 'file', collection: testCollectionName })
                ),
              )
            );
          });
        });
      });

      context('when selection is at the end of the text block', () => {
        it('replaces selection with a media node', () => {
          const { editorView } = editor(doc(p('te{<}xt{>}')));

          insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('te'),
              mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
              p(),
            )
          );
        });

        it('prepends to exisiting media group after parent', () => {
          const { editorView } = editor(doc(
            p('te{<}xt{>}'),
            mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          ));

          insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('te'),
              mediaGroup(
                media({ id: 'new one', type: 'file', collection: testCollectionName }),
                media({ id: temporaryFileId, type: 'file', collection: testCollectionName })
              )
            )
          );
        });
      });
    });

    context('when selection is a node', () => {
      context('when selection is an inline node', () => {
        it('replaces selection with a media node', () => {
          const { editorView, sel } = editor(doc(p('text{<>}', mention({ id: 'foo1', text: '@bar1' }))));
          setNodeSelection(editorView, sel);

          insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              p('text'),
              mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
              p(),
            )
          );
        });
      });

      context('when selection is a media node', () => {
        it('prepends to the existsing media group', () => {
          const { editorView } = editor(doc(
            mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
            p('text'),
          ));
          setNodeSelection(editorView, 1);

          insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);

          expect(editorView.state.doc).to.deep.equal(
            doc(
              mediaGroup(
                media({ id: 'new one', type: 'file', collection: testCollectionName }),
                media({ id: temporaryFileId, type: 'file', collection: testCollectionName })
              ),
              p('text'),
            )
          );
        });

        it('sets cursor to the paragraph after', () => {
          const { editorView } = editor(doc(
            mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
            p('text'),
          ));
          setNodeSelection(editorView, 0);

          insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);
          const mediaGroupNodeSize = mediaGroup(
            media({ id: 'new one', type: 'file', collection: testCollectionName }),
            media({ id: temporaryFileId, type: 'file', collection: testCollectionName })
          ).nodeSize;

          expect(editorView.state.selection.from).to.deep.equal(mediaGroupNodeSize);
        });
      });

      context('when selection is a non media block node', () => {
        context('when no exisiting media group', () => {
          it('replaces selection with a media node', () => {
            const { editorView } = editor(doc(hr));
            setNodeSelection(editorView, 0);

            insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

            expect(editorView.state.doc).to.deep.equal(
              doc(
                mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
                p(),
              )
            );
          });
        });

        context('when there are exisiting media group', () => {
          context('when media group is in the front', () => {
            it('prepend media to the exisiting media group before', () => {
              const { editorView } = editor(doc(
                mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
                hr,
              ));
              const mediaGroupNodeSize = mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);

              insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(
                    media({ id: 'new one', type: 'file', collection: testCollectionName }),
                    media({ id: temporaryFileId, type: 'file', collection: testCollectionName }),
                  ),
                  p(),
                )
              );
            });
          });

          context('when media group is at the end', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView } = editor(doc(
                hr,
                mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
              ));
              setNodeSelection(editorView, 0);

              insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(
                    media({ id: 'new one', type: 'file', collection: testCollectionName }),
                    media({ id: temporaryFileId, type: 'file', collection: testCollectionName }),
                  )
                )
              );
            });
          });

          context('when both sides have media groups', () => {
            it('prepend media to the exisiting media group after', () => {
              const { editorView } = editor(doc(
                mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
                hr,
                mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
              ));
              const mediaGroupNodeSize = mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })).nodeSize;
              setNodeSelection(editorView, mediaGroupNodeSize);

              insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);

              expect(editorView.state.doc).to.deep.equal(
                doc(
                  mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
                  mediaGroup(
                    media({ id: 'new one', type: 'file', collection: testCollectionName }),
                    media({ id: temporaryFileId, type: 'file', collection: testCollectionName }),
                  ),
                )
              );
            });
          });
        });
      });
    });

    context('when selection is at the beginning of the text block', () => {
      it('replaces selection with a media node', () => {
        const { editorView } = editor(doc(p('{<}te{>}xt')));

        insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
            p('xt'),
          )
        );
      });

      it('prepends to exisiting media group before parent', () => {
        const { editorView } = editor(doc(
          mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          p('{<}te{>}xt'),
        ));

        insertFile(editorView, { id: 'new one', status: 'uploading' }, testCollectionName);

        expect(editorView.state.doc).to.deep.equal(
          doc(
            mediaGroup(
              media({ id: 'new one', type: 'file', collection: testCollectionName }),
              media({ id: temporaryFileId, type: 'file', collection: testCollectionName })
            ),
            p('xt'),
          )
        );
      });
    });
  });
  it(`should insert media node into the document after current heading node`, () => {
    const { editorView } = editor(doc(h1('text{<>}')));

    insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        h1('text'),
        mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })
        ),
        p(),
      ));
  });

  it(`should insert media node into the document after current blockquote node`, () => {
    const { editorView } = editor(doc(blockquote(p('text{<>}'))));

    insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

    expect(editorView.state.doc).to.deep.equal(
      doc(blockquote(
        p('text'),
        mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
        p(),
      ))
    );
  });

  it(`should insert media node into the document after current codeblock node`, () => {
    const { editorView } = editor(doc(code_block()('text{<>}')));

    insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

    expect(editorView.state.doc).to.deep.equal(
      doc(
        code_block()('text'),
        mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })
        ),
        p(),
      ));
  });

  context('inside empty block', () => {

    it('replaces empty paragraph with the media grroup in an empty document', () => {
      const { editorView } = editor(doc(p('{<>}')));

      insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
    });

    it('apends media group to empty paragraph in an empty code block', () => {
      const { editorView } = editor(doc(code_block()('{<>}')));

      insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          code_block()('{<>}'),
          mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
    });

    it('apends media group to empty paragraph in an empty heading', () => {
      const { editorView } = editor(doc(h1('{<>}')));

      insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          h1('{<>}'),
          mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          p(),
        )
      );
    });

    it('prepends media to existing media group before the empty paragraph', () => {
      const { editorView } = editor(doc(
        mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
        p('{<>}'),
      ));

      insertFile(editorView, { id: 'another one', status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(
            media({ id: 'another one', type: 'file', collection: testCollectionName }),
            media({ id: temporaryFileId, type: 'file', collection: testCollectionName }),
          ),
          p(),
        )
      );
    });

    it('should replace empty paragraph with mediaGroup and preserve next empty paragraph', () => {
      const { editorView } = editor(doc(p('{<>}'), p()));

      insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          p()
        )
      );
    });

    it('should replace empty paragraph with mediaGroup and preserve previous empty paragraph', () => {
      const { editorView } = editor(doc(p(), p('{<>}')));

      insertFile(editorView, { id: temporaryFileId, status: 'uploading' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(),
          mediaGroup(media({ id: temporaryFileId, type: 'file', collection: testCollectionName })),
          p()
        )
      );
    });

    it('should insert all media nodes on the same line', async () => {
      const { editorView } = editor(doc(p('{<>}')));

      insertFile(editorView, { id: 'mock2' }, testCollectionName);
      insertFile(editorView, { id: 'mock1' }, testCollectionName);

      expect(editorView.state.doc).to.deep.equal(doc(
        mediaGroup(
          media({ id: 'mock1', type: 'file', collection: testCollectionName }),
          media({ id: 'mock2', type: 'file', collection: testCollectionName }),
        ),
        p(),
      ));
    });
  });
});
