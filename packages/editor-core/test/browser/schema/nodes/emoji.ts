import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { fromHTML as fromHTML_, toHTML } from '../../../../src/test-helper';

const schema = makeSchema();
const fromHTML = (html: string) => fromHTML_(html, schema);

describe('@atlaskit/editor-core/schema emoji node', () => {
  it('should have all emoji node props when serializing to DOM', () => {
    const html = toHTML(schema.nodes.emoji.create({ shortName: 'abc', id: '123', text: 'xyz' }), schema);
    expect(html).to.have.string('data-emoji-short-name="abc"');
    expect(html).to.have.string('data-emoji-id="123"');
    expect(html).to.have.string('data-emoji-text="xyz"');
    expect(html).to.have.string('contenteditable="false"');
  });

  it('should extract the correct values of emoji id', () => {
    const doc = fromHTML('<span data-emoji-short-name="abc" data-emoji-id="123" data-emoji-text="xyz"></span>');
    const emoji = doc.firstChild!.firstChild!;

    expect(emoji.type.name).to.equal('emoji');
    expect(emoji.attrs.shortName).to.equal('abc');
    expect(emoji.attrs.id).to.equal('123');
    expect(emoji.attrs.text).to.equal('xyz');
  });

  it('should have minimal emoji id props when serializing to DOM (minimal representation)', () => {
    const html = toHTML(schema.nodes.emoji.create({ shortName: 'abc' }), schema);
    expect(html).to.have.string('data-emoji-short-name="abc"');
    expect(html).to.have.string('contenteditable="false"');
  });

  it('should extract the correct values of emoji (minimal representation)', () => {
    const doc = fromHTML('<span data-emoji-short-name=\'abc\'></span>');
    const emoji = doc.firstChild!.firstChild!;

    expect(emoji.type.name).to.equal('emoji');
    expect(emoji.attrs.shortName).to.equal('abc');
    expect(emoji.attrs.id).to.equal('');
    expect(emoji.attrs.text).to.equal('');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'emoji']
  });
}
