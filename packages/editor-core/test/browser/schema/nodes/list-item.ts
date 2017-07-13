import { expect } from 'chai';
import { toHTML } from '../../../../src/test-helper';

import schema from '../../../../src/test-helper/schema';

describe('@atlaskit/editor-core/schema list-item', () => {
  it('should be possible to create a list item with a single paragraph', () => {
    const html = toHTML(schema.nodes.listItem.create({}, schema.nodes.paragraph.create()), schema);
    expect(html).to.have.string('<li><p></p></li>');
  });

  it('should be possible to create a list item of heading', () => {
    const html = toHTML(schema.nodes.listItem.create({}, schema.nodes.heading.create({ level: 1 })), schema);
    expect(html).to.have.string('<li><h1></h1></li>');
  });

  it('should be possible to create a list item of blockquote', () => {
    const html = toHTML(schema.nodes.listItem.create({}, schema.nodes.blockquote.create()), schema);
    expect(html).to.have.string('<li><blockquote></blockquote></li>');
  });

  it('should be possible to create a list item inside blockquote', () => {
    const html = toHTML(schema.nodes.blockquote.create({}, schema.nodes.listItem.create({})), schema);
    expect(html).to.have.string('<blockquote><li></li></blockquote>');
  });
});
