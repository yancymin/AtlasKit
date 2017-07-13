import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { fromHTML, toHTML } from '../../../../src/test-helper';

const schema = makeSchema();

describe('@atlaskit/editor-core/schema heading node', () => {
  it('serializes to <h4>', () => {
    const html = toHTML(schema.nodes.heading.create({ level: 4 }), schema);
    expect(html).to.have.string('<h4>');
  });

  it('matches <h3>', () => {
    const doc = fromHTML('<h3>', schema);
    const h3 = doc.firstChild!;
    expect(h3.type.name).to.equal('heading');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'heading']
  });
}
