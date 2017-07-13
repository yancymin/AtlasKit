import { bitbucketSchema } from '../../../src';
import { expect } from 'chai';

describe('Bitbucket schema', () => {
  it('contains expected nodes and marks', () => {
    // Nodes
    expect(bitbucketSchema.nodes).to.have.property('doc');
    expect(bitbucketSchema.nodes).to.have.property('paragraph');
    expect(bitbucketSchema.nodes).to.have.property('text');
    expect(bitbucketSchema.nodes).to.have.property('bulletList');
    expect(bitbucketSchema.nodes).to.have.property('orderedList');
    expect(bitbucketSchema.nodes).to.have.property('listItem');
    expect(bitbucketSchema.nodes).to.have.property('heading');
    expect(bitbucketSchema.nodes).to.have.property('blockquote');
    expect(bitbucketSchema.nodes).to.have.property('codeBlock');
    expect(bitbucketSchema.nodes).to.have.property('hardBreak');
    expect(bitbucketSchema.nodes).to.have.property('rule');
    expect(bitbucketSchema.nodes).to.have.property('image');
    expect(bitbucketSchema.nodes).to.have.property('mention');
    expect(bitbucketSchema.nodes).to.have.property('emoji');

    // Marks
    expect(bitbucketSchema.marks).to.have.property('em');
    expect(bitbucketSchema.marks).to.have.property('strong');
    expect(bitbucketSchema.marks).to.have.property('strike');
    expect(bitbucketSchema.marks).to.have.property('link');
    expect(bitbucketSchema.marks).to.have.property('mentionQuery');
    expect(bitbucketSchema.marks).to.have.property('emojiQuery');
    expect(bitbucketSchema.marks).to.have.property('code');
  });
});
