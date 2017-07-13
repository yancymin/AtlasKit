import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { fromHTML as fromHTML_, toHTML } from '../../../../src/test-helper';

const schema = makeSchema();
const fromHTML = (html: string) => fromHTML_(html, schema);

describe('@atlaskit/editor-core/schema mention node', () => {
  it('should have mention id and display name when serializing to DOM', () => {
    const html = toHTML(schema.nodes.mention.create({ id: '@bar', text: 'foo bar' }), schema);
    expect(html).to.have.string('mention-id="@bar"');
    expect(html).to.have.string('contenteditable="false"');
    expect(html).to.have.string('foo bar');
  });

  it('should extract the correct values of mention id and display name', () => {
    const doc = fromHTML('<span mention-id=\'@user-1\'>foo bar</span>');
    const mention = doc.firstChild!.firstChild!;

    expect(mention.type.name).to.equal('mention');
    expect(mention.attrs.id).to.equal('@user-1');
    expect(mention.attrs.text).to.equal('foo bar');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'mention']
  });
}
