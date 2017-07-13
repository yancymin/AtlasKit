import { confluenceSchema } from '../../../src';
import { expect } from 'chai';

describe('Confluence schema', () => {
  it('has all expects nodes and marks', () => {
    // Nodes
    expect(confluenceSchema.nodes).to.have.property('doc');
    expect(confluenceSchema.nodes).to.have.property('paragraph');
    expect(confluenceSchema.nodes).to.have.property('blockquote');
    expect(confluenceSchema.nodes).to.have.property('codeBlock');
    expect(confluenceSchema.nodes).to.have.property('panel');
    expect(confluenceSchema.nodes).to.have.property('hardBreak');
    expect(confluenceSchema.nodes).to.have.property('orderedList');
    expect(confluenceSchema.nodes).to.have.property('bulletList');
    expect(confluenceSchema.nodes).to.have.property('heading');
    expect(confluenceSchema.nodes).to.have.property('mediaGroup');
    expect(confluenceSchema.nodes).to.have.property('confluenceUnsupportedBlock');
    expect(confluenceSchema.nodes).to.have.property('confluenceJiraIssue');
    expect(confluenceSchema.nodes).to.have.property('listItem');
    expect(confluenceSchema.nodes).to.have.property('mention');
    expect(confluenceSchema.nodes).to.have.property('confluenceUnsupportedInline');
    expect(confluenceSchema.nodes).to.have.property('media');
    expect(confluenceSchema.nodes).to.have.property('rule');
    // Marks
    expect(confluenceSchema.marks).to.have.property('link');
    expect(confluenceSchema.marks).to.have.property('em');
    expect(confluenceSchema.marks).to.have.property('strong');
    expect(confluenceSchema.marks).to.have.property('strike');
    expect(confluenceSchema.marks).to.have.property('subsup');
    expect(confluenceSchema.marks).to.have.property('underline');
    expect(confluenceSchema.marks).to.have.property('mentionQuery');
    expect(confluenceSchema.marks).to.have.property('code');
  });
});
