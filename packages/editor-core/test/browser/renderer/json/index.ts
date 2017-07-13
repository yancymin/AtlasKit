import { expect } from 'chai';
import {
  makeEditor,
  doc,
  // Node
  blockquote, ul, ol, li, code_block, emoji, br, h1, h2, h3, h4, h5, h6,
  mediaGroup, media, mention, panel, panelNote, p, hr,
  // Marks
  code, em, a, strike, strong, subsup, textColor, underline,
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';

import JSONSerializer from '../../../../src/renderer/json';

const serializer = new JSONSerializer();
const toJSON = node => serializer.serializeFragment(node.content);

describe('JSONSerializer', () => {
  const editor = (doc: any, schema: any = defaultSchema) => makeEditor({
    doc,
    schema: defaultSchema,
  });

  describe('serializeFragment', () => {
    it('should serialize common nodes/marks as ProseMirror does', () => {
      const { editorView } = editor(
        doc(
          p(
            strong('>'), ' Atlassian: ', br,
            a({ href: 'https://atlassian.com'})('Atlassian')
          ),
          p(
            em('hello'), underline('world'), code('!'), subsup({ type: 'sub' })('sub'),
            'plain text', strike('hey'), textColor({ color: 'red' })('Red :D')
          ),
          ul(li('ichi'), li('ni'), li('san')),
          ol(li('ek'), li('dui'), li('tin')),
          blockquote(),
          h1('H1'), h2('H2'), h3('H3'), h4('H4'), h5('H5'), h6('H6'),
          code_block({ language: 'javascript' })(`console.log('hello');`),
          emoji({ shortName: ':joy:' }),
          panel('hello from panel'),
          panelNote('hello from note panel'),
          hr, mention({ id: 'foo' }),
        )
      );
      const pmDoc = editorView.state.doc;
      expect(toJSON(pmDoc)).to.deep.equal({
        version: 1,
        ...pmDoc.toJSON()
      });
    });

    it('should strip optional attrs from media node', () => {
      const { editorView } = editor(
        doc(mediaGroup(media({
          id: 'foo',
          type: 'file',
          collection: '',
          __fileName: 'foo.png',
          __displayType: 'thumbnail',
          __fileMimeType: 'image/png',
          __fileSize: 1234,
        })))
      );
      expect(toJSON(editorView.state.doc)).to.deep.equal({
        version: 1,
        type: 'doc',
        content: [{
          type: 'mediaGroup',
          content: [{
            type: 'media',
            attrs: {
              id: 'foo',
              type: 'file',
              collection: '',
            }
          }]
        }]
      });
    });

  });

});
