import {
  Fragment,
  Mark,
  Node as PMNode
} from '@atlaskit/editor-core';
import schema from '../schema';

/**
 * Deduce a set of marks from a style declaration.
 */
export function marksFromStyle(style: CSSStyleDeclaration): Mark[] {
  let marks: Mark[] = [];

  styles: for (let i = 0; i < style.length; i++) {
    const name = style.item(i);
    const value = style.getPropertyValue(name);

    switch (name) {
      case 'text-decoration-color':
      case 'text-decoration-style':
        continue styles;
      case 'text-decoration-line':
      case 'text-decoration':
        switch (value) {
          case 'line-through':
            marks = schema.marks.strike.create().addToSet(marks);
            continue styles;
        }
        break;
      case 'font-family':
        if (value === 'monospace') {
          marks = schema.marks.code.create().addToSet(marks);
          continue styles;
        }
    }

    throw new Error(`Unable to derive a mark for CSS ${name}: ${value}`);
  }

  return marks;
}

/**
 * Create a fragment by adding a set of marks to each node.
 */
export function addMarks(fragment: Fragment, marks: Mark[]): Fragment {
  let result = fragment;
  for (let i = 0; i < fragment.childCount; i++) {
    const child = result.child(i);
    let newChild = child;
    for (const mark of marks) {
      newChild = newChild.mark(mark.addToSet(newChild.marks));
    }
    result = result.replaceChild(i, newChild);
  }
  return result;
}

/**
 * Traverse the DOM node and build an array of the breadth-first-search traversal
 * through the tree.
 *
 * Detection of supported vs unsupported content happens at this stage. Unsupported
 * nodes do not have their children traversed. Doing this avoids attempting to
 * decode unsupported content descendents into ProseMirror nodes.
 */
export function findTraversalPath(roots: Node[]) {
  const inqueue = [...roots];
  const outqueue = [] as Node[];

  let elem;
  while (elem = inqueue.shift()) {
    outqueue.push(elem);
    let children;
    if (isNodeSupportedContent(elem) && (children = childrenOfNode(elem))) {
      let childIndex;
      for (childIndex = 0; childIndex < children.length; childIndex++) {
        const child = children[childIndex];
        inqueue.push(child);
      }
    }
  }
  return outqueue;
}

function childrenOfNode(node: Element): NodeList | null {
  const tag = getNodeName(node);
  if (tag === 'AC:STRUCTURED-MACRO') {
    return getAcTagNodes(node, 'AC:RICH-TEXT-BODY');
  }

  return node.childNodes;
}
/**
 * Return an array containing the child nodes in a fragment.
 *
 * @param fragment
 */
export function children(fragment: Fragment): PMNode[] {
  const nodes: PMNode[] = [];
  for (let i = 0; i < fragment.childCount; i++) {
    nodes.push(fragment.child(i));
  }
  return nodes;
}

/**
 * Quickly determine if a DOM node is supported (i.e. can be represented in the ProseMirror
 * schema).
 *
 * When a node is not supported, its children are not traversed — instead the entire node content
 * is stored inside an `unsupportedInline` or `unsupportedBlock` node.
 *
 * @param node
 */
function isNodeSupportedContent(node: Node): boolean {
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    return true;
  }

  if (node instanceof HTMLElement || node.nodeType === Node.ELEMENT_NODE) {
    const tag = getNodeName(node);
    switch (tag) {
      case 'DEL':
      case 'S':
      case 'B':
      case 'STRONG':
      case 'I':
      case 'EM':
      case 'CODE':
      case 'SUB':
      case 'SUP':
      case 'U':
      case 'BLOCKQUOTE':
      case 'SPAN':
      case 'H1':
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5':
      case 'H6':
      case 'BR':
      case 'HR':
      case 'UL':
      case 'OL':
      case 'LI':
      case 'P':
      case 'A':
      case 'FAB:MENTION':
      case 'FAB:MEDIA':
      case 'AC:STRUCTURED-MACRO':
        return true;
    }
  }

  return false;
}

/**
 * Ensure that each node in the fragment is a block, wrapping
 * in a block node if necessary.
 */
export function ensureBlocks(fragment: Fragment): Fragment {
  // This algorithm is fairly simple:
  //
  // 1. When a block is encountered, keep it as-is.
  // 2. When an unsupported inline is encountered, convert it to an unsupported block.
  // 3. When a sequence of supported (i.e. *not* `unsupportedInline`) inlines is encountered,
  //     wrap it in a a paragraph.
  //
  // There's an assumption/guess in step #2 that all unsupported nodes should be treated as
  // blocks if they exist in the content at a point where blocks are expected.
  //
  // It's seems possible for CXHTML documents to be poorly formed, where inline content exists
  // in positions where block content is expected. For example the top-level content is not wrapped
  // in a paragraph, but is expected to be a top-level block node.
  //
  //     Foo bar baz
  //
  // In this scenario it's effectively wrapped in a paragraph:
  //
  //     <p>Foo bar baz</p>
  //
  // This is more common in places like list items, or block quotes:
  //
  //     <ul>
  //       <li>Foo bar</li>
  //     </ul>
  //     <blockquote>Foo bar</blockquote>
  //
  // Both `<li>` (`listItem`) and `<blockquote>` (`blockQuote`) expect *block* content, and so
  // in both cases `Foo bar` is wrapped in a paragraph.
  const nodes = children(fragment);
  const blocks: PMNode[] = [];

  let i;
  for (i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.isBlock) {
      blocks.push(node);
    } else if (node.type === schema.nodes.confluenceUnsupportedInline) {
      blocks.push(schema.nodes.confluenceUnsupportedBlock.create(node.attrs));
    } else {
      // An inline node is found. Now step through until we find the last inline
      // node, then throw everything in a paragraph.
      let j;
      for (j = i + 1; j < nodes.length; j++) {
        const node = nodes[j];
        if (node.isBlock || node.type === schema.nodes.confluenceUnsupportedInline) {
          break;
        }
      }
      blocks.push(schema.nodes.paragraph.createChecked({}, nodes.slice(i, j)));
      i = j;
    }
  }

  return Fragment.fromArray(blocks);
}

export function getAcName(node: Element): string | undefined {
  return (node.getAttribute('ac:name') || '').toUpperCase();
}

export function getNodeName(node: Node): string {
  return node.nodeName.toUpperCase();
}

export function getAcParameter(node: Element, parameter: string): string | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === 'AC:PARAMETER' && getAcName(child) === parameter.toUpperCase()) {
      return child.textContent;
    }
  }

  return null;
}

export function getAcTagContent(node: Element, tagName: string): string | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === tagName) {
      return child.textContent;
    }
  }

  return null;
}

export function getAcTagNodes(node: Element, tagName: string): NodeList | null {
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i] as Element;
    if (getNodeName(child) === tagName) {
      // return html collection only if childNodes are found
      return child.childNodes.length ? child.childNodes : null;
    }
  }

  return null;
}

export function getMacroAttribute(node: Element, attribute: string): string {
  return (node.getAttribute('data-macro-' + attribute) || '');
}

export function getMacroParameters(node: Element): any {
  const params = {};

  getMacroAttribute(node, 'parameters').split('|').forEach(paramStr => {
    const param = paramStr.split('=');
    if (param.length) {
      params[param[0]] = param[1];
    }
  });
  return params;
}

export function createCodeFragment(codeContent: string, language?: string | null, title?: string | null): Fragment {
  const content: PMNode[] = [];
  let nodeSize = 0;

  if (!!title) {
    const titleNode = schema.nodes.heading.create({ level: 5 }, schema.text(title, [schema.marks.strong.create()]));
    content.push(titleNode);
    nodeSize += titleNode.nodeSize;
  }

  const codeBlockNode = schema.nodes.codeBlock.create({ language }, schema.text(codeContent));

  content.push(codeBlockNode);
  nodeSize += codeBlockNode.nodeSize;

  return Fragment.from(content);
}

export function hasClass(node: Element, className: string): boolean {
  if (node && node.className) {
    return node.className.indexOf(className) > -1;
  }
  return false;
}
