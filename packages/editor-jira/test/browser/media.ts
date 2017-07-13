import { MediaAttributes } from '@atlaskit/editor-core/';
import { nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { checkParse, checkEncode, checkParseEncodeRoundTrips } from '../../test-helpers';
import { name } from '../../package.json';
import { JIRASchema, makeSchema } from '../../src/schema';

const schema = makeSchema({ allowMedia: true }) as JIRASchema;

// Nodes
const doc = nodeFactory(schema.nodes.doc);
const mediaGroup = nodeFactory(schema.nodes.mediaGroup);
const media = (attrs: MediaAttributes) => schema.nodes.media.create(attrs);

const fragment1 = `
<span class="image-wrap" style="">
  <a
    id="262500_thumb"
    href="/secure/attachment/262500/262500_foo.png"
    title="foo.png"
    file-preview-type="image"
    file-preview-id="262500"
    file-preview-title="foo.png"
    resolved=""
  >
    <jira-attachment-thumbnail
      url="https://jdog.jira-dev.com/secure/thumbnail/262500/foo.png?default=false"
      jira-url="https://jdog.jira-dev.com/secure/thumbnail/262500/foo.png"
      filename="foo.png"
      resolved=""
    >
      <img
        alt="foo.png"
        src="https://jdog.jira-dev.com/secure/thumbnail/262500/foo.png?default=false"
        class="thumbnail-attachment"
        data-media-services-id="42"
        data-media-services-type="file"
        data-attachment-name="foo.png"
        data-attachment-type="thumbnail"
      >
    </jira-attachment-thumbnail>
  </a>
</span>
`;

const fragment2 = `
<span class="nobr">
  <a
    href="/secure/attachment/263215/263215_bar.pdf"
    title="bar.pdf attached to IR-694"
    class="file-attachment"
    data-media-services-id="36"
    data-media-services-type="file"
    data-attachment-name="bar.pdf"
    data-attachment-type="file"
  >
    bar.pdf
    <sup>
      <img
        class="rendericon"
        src="/images/icons/link_attachment_7.gif"
        height="7"
        width="7"
        align="absmiddle"
        alt=""
        border="0"
      >
    </sup>
  </a>
</span>
`;

describe(name, () => {
  describe('media', () => {
    checkParseEncodeRoundTrips('thumbnail type (viewContext)',
      schema,
      '<p class="mediaGroup"><span class="image-wrap"><a><jira-attachment-thumbnail><img alt="foo.png" src="HOST/file/42/image?token=TOKEN&client=CLIENT_ID&collection=&width=200&height=200&mode=fit" data-attachment-type="thumbnail" data-attachment-name="foo.png" data-media-services-type="file" data-media-services-id="42"></jira-attachment-thumbnail></a></span></p>',
      doc(mediaGroup([
        media({
          id: '42', type: 'file', collection: '',
          __fileName: 'foo.png', __displayType: 'thumbnail'
        })
      ])),
      {},
      {
        viewContext: { serviceHost: 'HOST', clientId: 'CLIENT_ID', token: 'TOKEN', collection: '' }
      }
    );

    checkParseEncodeRoundTrips('file type',
      schema,
      '<p class="mediaGroup"><span class="nobr"><a data-attachment-type="file" data-attachment-name="foo.pdf" data-media-services-type="file" data-media-services-id="42">foo.pdf</a></span></p>',
      doc(mediaGroup([
        media({
          id: '42', type: 'file', collection: '',
          __fileName: 'foo.pdf', __displayType: 'file'
        })
      ]))
    );

    checkParse('!foo.jpg|thumbnail!',
      schema,
      [`<p>${fragment1}</p>`],
      doc(mediaGroup([
        media({
          id: '42', type: 'file', collection: '',
          __fileName: 'foo.png', __displayType: 'thumbnail'
        })
      ]))
    );

    checkParse('[^bar.pdf]',
      schema,
      [`<p>${fragment2}</p>`],
      doc(mediaGroup([
        media({
          id: '36', type: 'file', collection: '',
          __fileName: 'bar.pdf', __displayType: 'file'
        })
      ]))
    );

    checkParse('!foo.jpg|thumbnail! [^bar.pdf]',
      schema,
      [`<p>${fragment1}${fragment2}</p>`],
      doc(mediaGroup([
        media({
          id: '42', type: 'file', collection: '',
          __fileName: 'foo.png', __displayType: 'thumbnail'
        }),
        media({
          id: '36', type: 'file', collection: '',
          __fileName: 'bar.pdf', __displayType: 'file'
        })
      ]))
    );

    checkParse('thumbnail type (uploadContext)',
      schema,
      ['<p class="mediaGroup"><span class="image-wrap"><a><jira-attachment-thumbnail><img alt="foo.png" src="HOST/file/42/image?token=TOKEN&client=CLIENT_ID&collection=MediaServicesSample&width=200&height=200&mode=fit" data-attachment-type="thumbnail" data-attachment-name="foo.png" data-media-services-type="file" data-media-services-id="42"></jira-attachment-thumbnail></a></span></p>'],
      doc(mediaGroup([
        media({
          id: '42', type: 'file', collection: '',
          __fileName: 'foo.png', __displayType: 'thumbnail'
        })
      ])),
    );

    checkEncode('thumbnail type (uploadContext)',
      schema,
      doc(mediaGroup([
        media({
          id: '42', type: 'file', collection: 'MediaServicesSample',
          __fileName: 'foo.png', __displayType: 'thumbnail'
        })
      ])),
      '<p class="mediaGroup"><span class="image-wrap"><a><jira-attachment-thumbnail><img alt="foo.png" src="HOST/file/42/image?token=TOKEN&client=CLIENT_ID&collection=MediaServicesSample&width=200&height=200&mode=fit" data-attachment-type="thumbnail" data-attachment-name="foo.png" data-media-services-type="file" data-media-services-id="42"></jira-attachment-thumbnail></a></span></p>',
      {},
      {
        uploadContext: { serviceHost: 'HOST', clientId: 'CLIENT_ID', token: 'TOKEN', collection: 'MediaServicesSample' },
      },
    );
  });
});
