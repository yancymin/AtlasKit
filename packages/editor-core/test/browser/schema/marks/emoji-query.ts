import * as chai from 'chai';
import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { chaiPlugin, toHTML } from '../../../../src/test-helper';

chai.use(chaiPlugin);

describe('@atlaskit/editor-core/schema emoji-query mark', () => {
  it('serializes to <span data-emoji-query="true">', () => {
    const schema = makeSchema();
    const node = schema.text('foo', [schema.marks.emojiQuery.create()]);
    expect(toHTML(node, schema)).to.have.string('data-emoji-query="true"');
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text'],
    marks: ['emojiQuery']
  });
}
