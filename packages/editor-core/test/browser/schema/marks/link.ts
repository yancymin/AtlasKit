import * as chai from 'chai';
import { expect } from 'chai';
import { createSchema } from '../../../../src';
import { chaiPlugin, toHTML, fromHTML } from '../../../../src/test-helper';

chai.use(chaiPlugin);
const href = 'http://atlassian.com';
const href2 = 'http://atlassian.com/test';
const href3 = 'http://atlassian.com?test=123';
const content = 'foo';
const sampleLink = `<a href="${href}">${content}</a>`;

describe('@atlaskit/editor-core/schema link mark', () => {
  itMatches(`${sampleLink}`, href, content);
  itMatches(`<a href="${href}" title="test" alt="hello">${content}</a>`, href, content);
  itMatches(`<a href="${href2}">${content}</a>`, href2, content);
  itMatches(`<a href="${href3}">${content}</a>`, href3, content);

  describe('whitelist URLs', () => {
    const schema = makeSchema();

    it(`should parse links starting from http://`, () => {
      const doc = fromHTML(`<a href="http://www.atlassian.com">Atlassian</a>`, schema);
      const textNode = doc.firstChild!.firstChild!;

      expect(textNode.marks).to.have.length(1);
    });

    it(`should parse links starting from https://`, () => {
      const doc = fromHTML(`<a href="https://www.atlassian.com">Atlassian</a>`, schema);
      const textNode = doc.firstChild!.firstChild!;

      expect(textNode.marks).to.have.length(1);
    });

    it(`should parse links starting from sourcetree://`, () => {
      const doc = fromHTML(`<a href="sourcetree://cloneRepo/ssh://user@bitbucket.org/owner/repo.git">Clone me</a>`, schema);
      const textNode = doc.firstChild!.firstChild!;

      expect(textNode.marks).to.have.length(1);
    });

    it(`should not parse links starting from javascript://`, () => {
      const doc = fromHTML(`<a href="javascript:alert(1)">Click me</a>`, schema);
      const textNode = doc.firstChild!.firstChild!;

      expect(textNode.marks).to.have.length(0);
    });

    it(`should not parse links starting from javascript://`, () => {
      const doc = fromHTML(`<a href="view-source:https://bitbucket.org/atlassian/atlaskit/pull-requests/3196/fix-component-prevent-javascript-links-for/diff">View source</a>`, schema);
      const textNode = doc.firstChild!.firstChild!;

      expect(textNode.marks).to.have.length(0);
    });
  });

  it(`serializes to ${sampleLink}`, () => {
    const schema = makeSchema();
    const node = schema.text(content, [schema.marks.link.create({ href })]);
    const html: string = toHTML(node, schema);
    expect(html).to.have.string(`${sampleLink}`);
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text'],
    marks: ['link', 'textColor']
  });
}

function itMatches(html: string, href, expectedText: string) {
  it(`matches ${html}`, () => {
    const schema = makeSchema();
    const doc = fromHTML(html, schema);
    const link = schema.marks.link.create({ href });
    expect(doc).to.have.textWithMarks(expectedText, [link]);
  });
}
