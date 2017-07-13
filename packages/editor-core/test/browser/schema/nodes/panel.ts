import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { fromHTML, toHTML } from '../../../../src/test-helper';

const schema = makeSchema();

describe('@atlaskit/editor-core/schema panel node', () => {
  it('should have data-panel-type when serializing to DOM', () => {
    const html = toHTML(schema.nodes.panel.create({ panelType: 'info' }), schema);
    expect(html).to.have.string('data-panel-type="info"');
  });

  it('should info panel type by default', () => {
    const html = toHTML(schema.nodes.panel.create(), schema);
    expect(html).to.have.string('data-panel-type="info"');
  });

  // TODO take Jyoti's when she pushs changes for panel.
  it.skip('should extract the correct values of panelType', () => {
    const doc = fromHTML('<div data-panel-type=\'tip\'><p>testing</p></div>', schema);
    const panel = doc.firstChild;
    expect(panel && panel.type.name).to.equal('panel');
    expect(panel && panel.attrs['panelType']).to.equal('tip');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'panel']
  });
}
