import * as React from 'react';
import { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { normalizeLanguage, languageList } from './supportedLanguages';
import { Theme, applyTheme } from './themes/themeBuilder';

export interface CodeBlockProps {
  text: string;
  language?: string;
  showLineNumbers?: boolean;
  theme?: Theme;
}

export default class CodeBlock extends PureComponent<CodeBlockProps, {}> {

  static displayName = 'CodeBlock';

  static propTypes = {

    /** The code to be formatted */
    text: PropTypes.string.isRequired,

    /** The language in which the code is written */
    language: PropTypes.oneOf(languageList),

    /** Indicates whether or not to show line numbers */
    showLineNumbers: PropTypes.bool,

    /** A custom theme to be applied, implements the Theme interface */
    theme: PropTypes.object
  };

  static defaultProps = {
    showLineNumbers: true,
    language: 'md',
    theme: {}
  };

  handleCopy(event) {
    /**
     * We don't want to copy the markup after highlighting, but rather the preformatted text in the selection
     */
    const data = event.nativeEvent.clipboardData;
    if (data) {
      event.preventDefault();
      const selectedText = window.getSelection().toString();
      const document = `<!doctype html><html><head></head><body><pre>${selectedText}</pre></body></html>`;
      data.clearData();
      data.setData('text/html', document);
      data.setData('text/plain', selectedText);
    }
  }

  render() {
    const { language } = this.props;
    const { lineNumberContainerStyle, codeBlockStyle, codeContainerStyle } = applyTheme(this.props.theme);
    const props = {
      language: normalizeLanguage(language),
      style: codeBlockStyle,
      showLineNumbers: this.props.showLineNumbers,
      PreTag: 'span',
      codeTagProps: { style: codeContainerStyle },
      lineNumberContainerStyle
    };
    const codeText = this.props.text.toString();

    return (
      <SyntaxHighlighter
        {...props}
        onCopy={this.handleCopy}
      >
        {codeText}
      </SyntaxHighlighter>
    );
  }
}
