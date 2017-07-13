import * as assert from 'assert';
import schema from '../../src/schema';

describe('HyperlinkPlugin', () => {
  it('should have a link mark in editor schema', () => {
    assert(schema.marks.link, 'Link is not a valid mark spec');
  });
});
