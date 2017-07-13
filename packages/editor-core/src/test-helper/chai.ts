/// <reference path="./types/chai.d.ts"/>
import { Fragment, Mark, Node, NodeType, Slice } from '../';
import { NodeSpec } from '../prosemirror';

function isNodeOrFragment(thing: any): thing is Node | Fragment {
  // Using a simple `instanceof` check is intentionally avoided here to make
  // this code agnostic to a specific instance of a Schema.
  return thing && typeof thing.eq === 'function';
}

function isSlice(thing: any): thing is Slice {
  return typeof thing.openStart === 'number' &&
    typeof thing.openEnd === 'number' &&
    isNodeOrFragment(thing.content);
}

export default (chai: any) => {
  const { Assertion, util } = chai;

  // Node and Fragment
  Assertion.overwriteMethod('equal', (equalSuper: Function) => {
    return function (right: any) {
      const left: any = this._obj;
      const deep = util.flag(this, 'deep');
      if (deep && isNodeOrFragment(left) && isNodeOrFragment(right)) {
        this.assert((left as any).eq(right),
          `expected ${left.toString()} to equal ${right.toString()}`,
          `expected ${left.toString()} to not equal ${right.toString()}`,
          left.toJSON(),
          right.toJSON(),
          /*showDiff*/ true
        );
      } else {
        equalSuper.apply(this, arguments);
      }
    };
  });

  // Slice
  Assertion.overwriteMethod('equal', (equalSuper: Function) => {
    return function (right: any) {
      const left: any = this._obj;
      const deep = util.flag(this, 'deep');
      if (deep && isSlice(left) && isSlice(right)) {
        this.assert(left.content.eq(right.content),
          'expected left\'s fragment #{exp} to equal right\'s fragment #{act}',
          'expected left\'s fragment #{exp} to not equal right\'s fragment #{act}',
          left.content.toString(),
          right.content.toString());
        this.assert(left.openStart === right.openStart,
          'expected left\'s openStart #{exp} to equal right\'s openStart #{act}',
          'expected left\'s openStart #{exp} to not equal right\'s openStart #{act}',
          left.openStart,
          right.openStart);
        this.assert(left.openEnd === right.openEnd,
          'expected left\'s openEnd #{exp} to equal right\'s openEnd #{act}',
          'expected left\'s openEnd #{exp} to not equal right\'s openEnd #{act}',
          left.openEnd,
          right.openEnd);
      } else {
        equalSuper.apply(this, arguments);
      }
    };
  });

  Assertion.addMethod('nodeType', function (nodeType: NodeType) {
    const obj: Node = util.flag(this, 'object');
    const negate: boolean = util.flag(this, 'negate');

    if (negate) {
      return new Assertion(obj.type).not.to.be.an.instanceof(nodeType);
    }
    return new Assertion(obj.type).to.be.an.instanceof(nodeType);
  });

  Assertion.addMethod('textWithMarks', function (text: string, marks: Mark[]) {
    const obj: Node = util.flag(this, 'object');
    const negate: boolean = util.flag(this, 'negate');

    let matched = false;
    obj.descendants((node: Node, pos: number) => {
      if (node.isText && node.text === text) {
        if (Mark.sameSet(node.marks, marks)) {
          matched = true;
        }
      }
    });

    if (negate) {
      return new Assertion(matched).not.to.be.true;
    }
    return new Assertion(matched).to.be.true;
  });

  Assertion.addMethod('nodeSpec', function (nodeSpec: NodeSpec) {
    const obj: Node = util.flag(this, 'object');
    const negate: boolean = util.flag(this, 'negate');

    if (negate) {
      return new Assertion(obj.type.spec).not.to.deep.equal(nodeSpec);
    }
    return new Assertion(obj.type.spec).to.deep.equal(nodeSpec);
  });
};
