import { expect } from 'chai';
import { media } from '../../../../src';
import { fromHTML, toDOM } from '../../../../src/test-helper';
import { default as schema } from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema media node', () => {

  it('should parse html', () => {
    const doc = fromHTML(`
    <div
      data-node-type="media"
      data-id="id"
      data-type="file"
      data-collection="collection"
      data-file-name="file.jpg"
      data-file-size="123456"
      data-file-mime-type="image/jpeg"
    />
    `, schema);
    const mediaGroup = doc.firstChild!;
    const mediaNode = mediaGroup.firstChild!;

    expect(mediaNode.type.spec).to.equal(media);
    expect(mediaNode.attrs.id).to.equal('id');
    expect(mediaNode.attrs.type).to.equal('file');
    expect(mediaNode.attrs.collection).to.equal('collection');
    expect(mediaNode.attrs.__fileName).to.equal('file.jpg');
    expect(mediaNode.attrs.__fileSize).to.equal(123456);
    expect(mediaNode.attrs.__fileMimeType).to.equal('image/jpeg');
    expect(mediaNode.attrs.__displayType).to.equal(null);
  });

  it('should encode to html', () => {
    const mediaNode = schema.nodes.media.create({
      id: 'id',
      type: 'file',
      collection: 'collection',
    });
    mediaNode.attrs.__fileName = 'file.jpg';
    mediaNode.attrs.__fileSize = 123456;
    mediaNode.attrs.__fileMimeType = 'image/jpeg';
    mediaNode.attrs.__displayType = 'thumbnail';

    const domNode = toDOM(mediaNode, schema).firstChild as HTMLElement;
    const {
      id, type, collection, fileName, fileSize, fileMimeType, displayType
    } = domNode.dataset;
    expect(id).to.equal('id');
    expect(type).to.equal('file');
    expect(collection).to.equal('collection');
    expect(fileName).to.equal('file.jpg');
    expect(fileSize).to.equal('123456');
    expect(fileMimeType).to.equal('image/jpeg');
    expect(displayType).to.equal('thumbnail');
  });

});
