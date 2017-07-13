import {
  Mark,
  MarkdownSerializer as PMMarkdownSerializer,
  MarkdownSerializerState as PMMarkdownSerializerState,
  Node,
} from '@atlaskit/editor-core';
import stringRepeat from './util/string-repeat';
import schema from './schema';
/**
 * This function escapes all plain-text sequences that might get converted into markdown
 * formatting by Bitbucket server (via python-markdown).
 * @see MarkdownSerializerState.esc()
 */
function escapeMarkdown(str: string, startOfLine?: boolean): string {
  str = str.replace(/[`*\\+_]/g, '\\$&');
  if (startOfLine) {
    str = str.replace(/^[#-*]/, '\\$&').replace(/^(\d+)\./, '$1\\.');
  }
  return str;
}

/**
 * Look for series of backticks in a string, find length of the longest one, then
 * generate a backtick chain of a length longer by one. This is the only proven way
 * to escape backticks inside code block and inline code (for python-markdown)
 */
const generateOuterBacktickChain: (text: string, minLength?: number) => string = (() => {
  function getMaxLength(text: String): number {
    return (text.match(/`+/g) || [])
      .reduce((prev, val) => (val.length > prev.length ? val : prev), '')
      .length
      ;
  }

  return function (text: string, minLength = 1): string {
    const length = Math.max(minLength, getMaxLength(text) + 1);
    return stringRepeat('`', length);
  };
})();

const isListNode = (node: Node) => node.type.name === 'bulletList' || node.type.name === 'orderedList';

const nodes = {
  blockquote(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    state.wrapBlock('> ', null, node, () => state.renderContent(node));
  },
  codeBlock(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    if (!node.attrs.language) {
      state.wrapBlock('    ', null, node, () => state.text(node.textContent ? node.textContent : '\u200c', false));
    } else {
      const backticks = generateOuterBacktickChain(node.textContent, 3);
      state.write(backticks + node.attrs.language + '\n');
      state.text(node.textContent ? node.textContent : '\u200c', false);
      state.ensureNewLine();
      state.write(backticks);
    }
    state.closeBlock(node);
  },
  heading(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    state.write(state.repeat('#', node.attrs.level) + ' ');
    state.renderInline(node);
    state.closeBlock(node);
  },
  rule(state: MarkdownSerializerState, node: Node) {
    state.write(node.attrs.markup || '---');
    state.closeBlock(node);
  },
  bulletList(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    for (let i = 0; i < node.childCount; i++) {
      const child = node.child(i);
      state.render(child, node, i);
    }
  },
  orderedList(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    for (let i = 0; i < node.childCount; i++) {
      const child = node.child(i);
      state.render(child, node, i);
    }
  },
  listItem(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    const delimiter = parent.type.name === 'bulletList' ? '* ' : `${index + 1}. `;
    for (let i = 0; i < node.childCount; i++) {
      const child = node.child(i);
      if (child.type.name === 'codeBlock' && i === 0) {
        state.write(delimiter);
      }
      if (!(child.type.name === 'paragraph' && i === 0)) {
        state.write('\n');
      }
      if (!isListNode(child) && i === 0 && child.type.name !== 'codeBlock') {
        state.wrapBlock('  ', delimiter, node, () => state.render(child, parent, i));
      } else {
        state.wrapBlock('    ', null, node, () => state.render(child, parent, i));
      }
      if (!(child.type.name === 'paragraph' && i === 0) && !isListNode(child)) {
        state.write('\n');
      }
      state.flushClose(1);
    }
    if (index === parent.childCount - 1) {
      state.write('\n');
    }
  },
  paragraph(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    state.renderInline(node);
    state.closeBlock(node);
  },
  image(state: MarkdownSerializerState, node: Node) {
    // Note: the 'title' is not escaped in this flavor of markdown.
    state.write('![' + state.esc(node.attrs.alt || '') + '](' + state.esc(node.attrs.src) +
      (node.attrs.title ? ` '${node.attrs.title}'` : '') + ')');
  },
  hardBreak(state: MarkdownSerializerState) {
    state.write('  \n');
  },
  text(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    const previousNode = index === 0 ? null : parent.child(index - 1);
    const previousNodeIsAMention = (previousNode && previousNode.type === schema.nodes.mention);
    const currentNodeStartWithASpace = (node.textContent.indexOf(' ') === 0);
    const trimTrailingWhitespace = (previousNodeIsAMention && currentNodeStartWithASpace);
    let text = trimTrailingWhitespace
      ? node.textContent.replace(' ', '') // only first blank space occurrence is replaced
      : node.textContent;

    // BB converts 4 spaces at the beginning of the line to code block
    // that's why we escape 4 spaces with zero-width-non-joiner
    const fourSpaces = '    ';
    if (!previousNode && /^\s{4}/.test(node.textContent)) {
      text = node.textContent.replace(fourSpaces, '\u200c' + fourSpaces);
    }

    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const startOfLine = state.atBlank() || !!state.closed;
      state.write();
      state.out += escapeMarkdown(lines[i], startOfLine);
      if (i !== lines.length - 1) {
        state.out += '\n';
      }
    }
  },
  empty_line(state: MarkdownSerializerState, node: Node) {
    state.write('\u200c'); // zero-width-non-joiner
    state.closeBlock(node);
  },
  mention(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    const isLastNode = (parent.childCount === index + 1);
    const delimiter = isLastNode ? '' : ' ';

    state.write(`@${node.attrs.id}${delimiter}`);
  },
  emoji(state: MarkdownSerializerState, node: Node, parent: Node, index: number) {
    state.write(node.attrs.shortName);
  }
};

const marks = {
  em: { open: '*', close: '*', mixable: true },
  strong: { open: '**', close: '**', mixable: true },
  strike: { open: '~~', close: '~~', mixable: true },
  link: {
    open: '[',
    close(state: MarkdownSerializerState, mark: any) {
      // Note: the 'title' is not escaped in this flavor of markdown.
      return '](' + mark.attrs['href'] + (mark.attrs['title'] ? ` '${mark.attrs['title']}'` : '') + ')';
    }
  },
  code: { open: '`', close: '`' },
  mentionQuery: { open: '', close: '', mixable: false },
  emojiQuery: { open: '', close: '', mixable: false }
};

export class MarkdownSerializer extends PMMarkdownSerializer {
  serialize(content: Node, options?: { [key: string]: any }): string {
    const state = new MarkdownSerializerState(this.nodes, this.marks, options);

    state.renderContent(content);
    return state.out === '\u200c' ? '' : state.out; // Return empty string if editor only contains a zero-non-width character
  }
}

export class MarkdownSerializerState extends PMMarkdownSerializerState {

  renderContent(parent: Node): void {
    parent.forEach((child: Node, offset: number, index: number) => {
      if (
        // If child is an empty Textblock we need to insert a zwnj-character in order to preserve that line in markdown
        (child.isTextblock && !child.textContent) &&
        // If child is a Codeblock we need to handle this seperately as we want to preserve empty code blocks
        !(child.type === schema.nodes.codeBlock) &&
        !(child.content && (child.content as any).size > 0)
      ) {
        return nodes.empty_line(this, child);
      }

      return this.render(child, parent, index);
    });
  }

  /**
   * This method override will properly escape backticks in text nodes with "code" mark enabled.
   * Bitbucket uses python-markdown which does not honor escaped backtick escape sequences \`
   * inside a backtick fence.
   *
   * @see node_modules/prosemirror-markdown/src/to_markdown.js
   * @see MarkdownSerializerState.renderInline()
   */
  renderInline(parent: Node): void {
    const active: Mark[] = [];

    const progress = (node: Node | null, _?: any, index?: number) => {
      let marks = node ? node.marks : [];
      const code = marks.length && marks[marks.length - 1].type === schema.marks.code && marks[marks.length - 1];
      const len = marks.length - (code ? 1 : 0);

      // Try to reorder 'mixable' marks, such as em and strong, which
      // in Markdown may be opened and closed in different order, so
      // that order of the marks for the token matches the order in
      // active.
      outer: for (let i = 0; i < len; i++) {
        const mark: Mark = marks[i];
        if (!this.marks[mark.type.name].mixable) {
          break;
        }
        for (let j = 0; j < active.length; j++) {
          const other = active[j];
          if (!this.marks[other.type.name].mixable) {
            break;
          }
          if (mark.eq(other)) {
            if (i > j) {
              marks = marks.slice(0, j).concat(mark).concat(marks.slice(j, i)).concat(marks.slice(i + 1, len));
            } else if (j > i) {
              marks = marks.slice(0, i).concat(marks.slice(i + 1, j)).concat(mark).concat(marks.slice(j, len));
            }
            continue outer;
          }
        }
      }

      // Find the prefix of the mark set that didn't change
      let keep = 0;
      while (keep < Math.min(active.length, len) && marks[keep].eq(active[keep])) {
        ++keep;
      }

      // Close the marks that need to be closed
      while (keep < active.length) {
        this.text(this.markString(active.pop()!, false), false);
      }

      // Open the marks that need to be opened
      while (active.length < len) {
        const add = marks[active.length];
        active.push(add);
        this.text(this.markString(add, true), false);
      }

      if (node) {
        if (!code || !node.isText) {
          this.render(node, parent, index!);
        } else if (node.text) {
          // Generate valid monospace, fenced with series of backticks longer that backtick series inside it.
          let text = node.text;
          const backticks = generateOuterBacktickChain(node.text as string, 1);

          // Make sure there is a space between fences, otherwise python-markdown renderer will get confused
          if (text.match(/^`/)) {
            text = ' ' + text;
          }

          if (text.match(/`$/)) {
            text += ' ';
          }

          this.text(backticks + text + backticks, false);
        }
      }
    };

    parent.forEach((child: Node, offset: number, index: number) => {
      progress(child, parent, index);
    });

    progress(null);
  }
}

export default new MarkdownSerializer(nodes, marks);
