import { expect } from 'chai';
import {
  code as codeBase,
  createSchema,
  NodeSpec,
} from '../../../src';

const filterGroupDecMark = marks => marks.filter(mark => mark[0] !== '_' || mark[1] !== '_');

describe('createSchema helper', () => {
  it('should add only defined marks and nodes to the schema', () => {
    const nodesConfig = ['doc', 'paragraph', 'text'];
    const marksConfig = ['em', 'strong', 'strike'];
    const schema = createSchema({ nodes: nodesConfig, marks: marksConfig });
    const nodes = Object.keys(schema.nodes);
    const marks = filterGroupDecMark(Object.keys(schema.marks));
    expect(nodes).to.be.deep.equal(['doc', 'paragraph', 'text']);
    expect(marks).to.be.deep.equal(['em', 'strong', 'strike']);
  });

  it('should preserv order for marks and nodes in the schema', () => {
    const nodesConfig = ['text', 'doc', 'paragraph'];
    const marksConfig = ['strong', 'strike', 'em'];
    const schema = createSchema({ nodes: nodesConfig, marks: marksConfig });
    const nodes = Object.keys(schema.nodes);
    const marks = filterGroupDecMark(Object.keys(schema.marks));
    expect(nodes).to.be.deep.equal(['doc', 'paragraph', 'text']);
    expect(marks).to.be.deep.equal(['em', 'strong', 'strike']);
  });

  it('should allow custom node spec for built-in node type', () => {
    const listItem: NodeSpec = {
      content: 'paragraph block*',
      parseDOM: [{ tag: 'div' }],
    };
    const nodesConfig = ['doc', 'paragraph', 'text'];
    const schema = createSchema({ nodes: nodesConfig, customNodeSpecs: { listItem } });
    const nodes = Object.keys(schema.nodes);
    expect(nodes).to.be.deep.equal(['doc', 'paragraph', 'text', 'listItem']);
    expect(schema.nodes.listItem.spec).to.be.equal(listItem);
  });

  it('should allow custom node spec', () => {
    const jiraIssue: NodeSpec = {
      content: 'paragraph block*',
      parseDOM: [{ tag: 'div' }],
    };
    const nodesConfig = ['doc', 'paragraph', 'text'];
    const schema = createSchema({ nodes: nodesConfig, customNodeSpecs: { jiraIssue } });
    const nodes = Object.keys(schema.nodes);
    expect(nodes).to.be.deep.equal(['doc', 'paragraph', 'text', 'jiraIssue']);
  });

  it('should allow custom mark spec for built-in mark type', () => {
    const code = { ...codeBase, excludes: 'em' };
    const nodesConfig = ['doc', 'paragraph', 'text'];
    const marksConfig = ['em'];
    const schema = createSchema({ nodes: nodesConfig, marks: marksConfig, customMarkSpecs: { code } });
    const marks = filterGroupDecMark(Object.keys(schema.marks));
    expect(marks).to.be.deep.equal(['em', 'code']);
    expect(schema.marks.code.spec).to.be.equal(code);
  });

  it('should allow custom mark spec', () => {
    const monospace = { ...codeBase, excludes: 'em' };
    const nodesConfig = ['doc', 'paragraph', 'text'];
    const marksConfig = ['em'];
    const schema = createSchema({ nodes: nodesConfig, marks: marksConfig, customMarkSpecs: { monospace } });
    const marks = filterGroupDecMark(Object.keys(schema.marks));
    expect(marks).to.be.deep.equal(['em', 'monospace']);
    expect(schema.marks.monospace.spec).to.be.equal(monospace);
  });

  it('should allow only custom mark spec', () => {
    const code = { ...codeBase, excludes: '' };
    const nodesConfig = ['doc', 'paragraph', 'text'];
    const schema = createSchema({ nodes: nodesConfig, customMarkSpecs: { code } });
    expect(schema.marks.code.spec).to.be.equal(code);
  });
});
