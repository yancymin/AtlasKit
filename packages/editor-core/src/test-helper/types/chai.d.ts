declare namespace Chai {
  // Unfortunately it's not possible to use the types from ProseMirror to
  // augment namespace definitions.
  //
  // See:
  // - https://github.com/Microsoft/TypeScript/issues/4166
  // - https://github.com/Microsoft/TypeScript/pull/6213
  interface Assertion {
    nodeType(nodeType: new (...args: any[]) => any): Assertion;
    nodeSpec(nodeType: any): Assertion;
    textWithMarks(text: string, marks: any[]): Assertion;
  }
}
