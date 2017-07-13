import * as chai from 'chai';
import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { chaiPlugin, fromHTML, toHTML } from '../../../../src/test-helper';

chai.use(chaiPlugin);

describe('@atlaskit/editor-core/schema subsup mark', () => {
  itMatches('<sub>text</sub>', 'text', { type: 'sub' });
  itMatches('<sup>text</sup>', 'text', { type: 'sup' });

  it('serializes to <sub>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [schema.marks.subsup.create({ type: 'sub' })]);
    expect(toHTML(node, schema)).to.equal('<sub>foo</sub>');
  });

  it('serializes to <sup>', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [schema.marks.subsup.create({ type: 'sup' })]);
    expect(toHTML(node, schema)).to.equal('<sup>foo</sup>');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text'],
    marks: ['subsup']
  });
}

function itMatches(html: string, expectedText: string, attrs: { type: 'sub' | 'sup' }) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const subsupNode = schema.marks.subsup.create(attrs);

    expect(doc).to.have.textWithMarks(expectedText, [subsupNode]);
  });
}
