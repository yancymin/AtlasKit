import * as chai from 'chai';
import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { chaiPlugin, fromHTML, toHTML } from '../../../../src/test-helper';

chai.use(chaiPlugin);

const testColorObj1 = { color: '#97a0af' };

describe('@atlaskit/editor-core/schema textColor mark', () => {
  itMatches(`<span style="color: rgb(151, 160, 175);">text</span>`, 'text', testColorObj1);
  itMatches(`<span style="color: #97a0af;">text</span>`, 'text', testColorObj1);

  it('serializes to <span style="color: ...">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [schema.marks.textColor.create(testColorObj1)]);
    expect(toHTML(node, schema)).to.equal('<span style="color: rgb(151, 160, 175);">foo</span>');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text'],
    marks: ['textColor']
  });
}

function itMatches(html: string, expectedText: string, attrs: { color: string }) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(`${html}`, schema);
    const textColorNode = schema.marks.textColor.create(attrs);

    expect(doc).to.have.textWithMarks(expectedText, [textColorNode]);
  });
}
