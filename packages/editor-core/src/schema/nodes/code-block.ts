import { NodeSpec, browser } from '../../prosemirror';
import { Definition as Text } from './text';

export type NoMark = {
  /**
   * @maxItems 0
   */
  marks?: Array<any>
};

/**
 * @name codeBlock_node
 * @additionalProperties false
 */
export interface Definition {
  type: 'codeBlock';
  content?: Array<Text & NoMark>;
  /**
   * @additionalProperties false
   */
  attrs?: {
    language?: 'abap' | 'actionscript' | 'ada' | 'arduino' | 'autoit' | 'c' | 'c++' | 'clojure'
    | 'coffeescript' | 'csharp' | 'css' | 'cuda' | 'd' | 'dart' | 'delphi' | 'elixir'
    | 'erlang' | 'fortran' | 'foxpro' | 'go' | 'groovy' | 'haskell' | 'haxe' | 'html'
    | 'java' | 'javascript' | 'julia' | 'kotlin' | 'latex' | 'livescript' | 'lua'
    | 'mathematica' | 'matlab' | 'objective-c' | 'objective-j' | 'objectpascal'
    | 'ocaml' | 'octave' | 'perl' | 'php' | 'powershell' | 'prolog' | 'puppet'
    | 'python' | 'qml' | 'r' | 'racket' | 'restructuredtext' | 'ruby' | 'rust'
    | 'sass' | 'scala' | 'scheme' | 'shell' | 'smalltalk' | 'sql' | 'standardml'
    | 'swift' | 'tcl' | 'tex' | 'typescript' | 'vala' | 'vbnet' | 'verilog'
    | 'vhdl' | 'xml' | 'xquery';
  };
}

const getLanguageFromEditorStyle = (dom: HTMLElement): string | undefined => {
  return dom.dataset['language'];
};

// example of BB style:
// <div class="codehilite language-javascript"><pre><span>hello world</span><span>\n</span></pre></div>
const getLanguageFromBitbucketStyle = (dom: HTMLElement): string | undefined => {
  if (dom && dom.classList.contains('codehilite')) {
    // code block html from Bitbucket always contains an extra new line
    return extractLanguageFromClass(dom.className);
  }
};

const extractLanguageFromClass = (className: string): string | undefined => {
  const languageRegex = /(?:^|\s)language-([^\s]+)/;
  const result = languageRegex.exec(className);
  if (result && result[1]) {
    return result[1];
  }
};

const removeLastNewLine = (dom: HTMLElement): HTMLElement => {
  const parent = dom && dom.parentElement;
  if (parent && parent.classList.contains('codehilite')) {
    dom.textContent = dom.textContent!.replace(/\n$/, '');
  }
  return dom;
};

export const codeBlock: NodeSpec = {
  attrs: { language: { default: null }, uniqueId: { default: null } },
  content: 'text*',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [{
    tag: 'pre',
    preserveWhitespace: 'full',
    getAttrs: (dom: HTMLElement) => {
      const language = (
        getLanguageFromBitbucketStyle(dom.parentElement!) ||
        getLanguageFromEditorStyle(dom.parentElement!) ||
        dom.getAttribute('data-language')!
      );
      dom = removeLastNewLine(dom);
      return { language };
    }
  },
  // Handle VSCode paste, it wraps copied content with
  // <div style="...white-space: pre;...">
  {
    tag: 'div[style]',
    preserveWhitespace: 'full',
    getAttrs: (dom: HTMLElement) => {
      if (
        dom.style.whiteSpace === 'pre' || dom.style.whiteSpace === 'pre-wrap' ||
        (dom.style.fontFamily && dom.style.fontFamily.toLowerCase().indexOf('monospace') > -1)
      ) {
        return {};
      }
      return false;
    }
  },
  // Handle GitHub/Gist paste
  {
    tag: 'table[style]',
    preserveWhitespace: 'full',
    getAttrs: (dom: HTMLElement) => {
      if (dom.querySelector('td[class*="blob-code"]')) {
        return {};
      }
      return false;
    }
  }],
  toDOM(node): [string, any, number] {
    const className = browser.ie && browser.ie_version <= 11 ? 'ie11' : '';
    return ['pre', { 'data-language': node.attrs.language, 'class': className }, 0];
  }
};
