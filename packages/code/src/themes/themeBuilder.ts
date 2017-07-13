import {
  akCodeFontFamily,
  akBorderRadius,
  akGridSize
} from '@atlaskit/util-shared-styles';

import { defaultColors } from './defaultTheme';

export interface Theme {
  lineNumberColor?: string;
  lineNumberBgColor?: string;
  backgroundColor?: string;
  textColor?: string;
  substringColor?: string;
  keywordColor?: string;
  attributeColor?: string;
  selectorTagColor?: string;
  docTagColor?: string;
  nameColor?: string;
  builtInColor?: string;
  literalColor?: string;
  bulletColor?: string;
  codeColor?: string;
  additionColor?: string;
  regexpColor?: string;
  symbolColor?: string;
  variableColor?: string;
  templateVariableColor?: string;
  linkColor?: string;
  selectorAttributeColor?: string;
  selectorPseudoColor?: string;
  typeColor?: string;
  stringColor?: string;
  selectorIdColor?: string;
  selectorClassColor?: string;
  quoteColor?: string;
  templateTagColor?: string;
  deletionColor?: string;
  titleColor?: string;
  sectionColor?: string;
  commentColor?: string;
  metaKeywordColor?: string;
  metaColor?: string;
  functionColor?: string;
  numberColor?: string;
}


const codeContainerStyle = {
  fontFamily: akCodeFontFamily,
  fontSize: '12px',
  top: akGridSize,
  left: '16px', // 2x akGridSize
  position: 'relative',
  paddingRight: '16px', // 2x akGridSize
  display: 'inline-block',
};

const lineNumberContainerStyle = (theme: Theme) => ({
  fontSize: '12px',
  lineHeight: '20px',
  color: theme.lineNumberColor,
  backgroundColor: theme.lineNumberBgColor,
  padding: akGridSize,
  float: 'left',
  textAlign: 'right',
  userSelect: 'none'
});

const codeBlockStyle = (theme: Theme) => ({
  // These properties map to highlightjs css selectors
  'hljs': {
    fontFamily: akCodeFontFamily,
    fontSize: '12px',
    lineHeight: '20px',
    background: theme.backgroundColor,
    color: theme.textColor,
    borderRadius: akBorderRadius,
    display: 'block',
    overflowX: 'auto',
    whiteSpace: 'pre',
    paddingRight: '16px',
    transform: 'translate3d(0,0,0)',
  },
  'hljs-subst': {
    color: theme.substringColor
  },
  'hljs-keyword': {
    color: theme.keywordColor,
    fontWeight: 'bolder'
  },
  'hljs-attribute': {
    color: theme.attributeColor
  },
  'hljs-selector-tag': {
    color: theme.selectorTagColor
  },
  'hljs-doctag': {
    color: theme.docTagColor
  },
  'hljs-name': {
    color: theme.nameColor
  },
  'hljs-built_in': {
    color: theme.builtInColor
  },
  'hljs-literal': {
    color: theme.literalColor
  },
  'hljs-bullet': {
    color: theme.bulletColor
  },
  'hljs-code': {
    color: theme.codeColor
  },
  'hljs-addition': {
    color: theme.additionColor
  },
  'hljs-regexp': {
    color: theme.regexpColor
  },
  'hljs-symbol': {
    color: theme.symbolColor
  },
  'hljs-variable': {
    color: theme.variableColor
  },
  'hljs-template-variable': {
    color: theme.templateVariableColor
  },
  'hljs-link': {
    color: theme.linkColor
  },
  'hljs-selector-attr': {
    color: theme.selectorAttributeColor
  },
  'hljs-selector-pseudo': {
    color: theme.selectorPseudoColor
  },
  'hljs-type': {
    color: theme.typeColor
  },
  'hljs-string': {
    color: theme.stringColor
  },
  'hljs-selector-id': {
    color: theme.selectorIdColor
  },
  'hljs-selector-class': {
    color: theme.selectorClassColor
  },
  'hljs-quote': {
    color: theme.quoteColor
  },
  'hljs-template-tag': {
    color: theme.templateTagColor
  },
  'hljs-deletion': {
    color: theme.deletionColor
  },
  'hljs-title': {
    color: theme.titleColor
  },
  'hljs-section': {
    color: theme.sectionColor
  },
  'hljs-comment': {
    color: theme.commentColor,
    fontFamily: `SFMono-MediumItalic, ${akCodeFontFamily}`,
    fontStyle: 'italic'
  },
  'hljs-meta-keyword': {
    color: theme.metaKeywordColor
  },
  'hljs-meta': {
    color: theme.metaColor
  },
  'hljs-emphasis': {
    fontStyle: 'italic'
  },
  'hljs-strong': {
    fontWeight: 'bolder'
  },
  'hljs-function': {
    color: theme.functionColor
  },
  'hljs-number': {
    color: theme.numberColor
  }
});

const inlineCodeStyle = (theme: Theme) => ({
  hljs: {
    fontFamily: akCodeFontFamily,
    fontSize: '12px',
    background: theme.backgroundColor,
    color: theme.textColor,
    borderRadius: akBorderRadius,
    display: 'inline',
    overflowX: 'auto',
    padding: '2px 4px',
    transform: 'translate3d(0,0,0)',
  }
});

export function applyTheme(theme: Theme = {}) {
  const newTheme = {...defaultColors, ...theme};
  return {
    lineNumberContainerStyle: lineNumberContainerStyle(newTheme),
    codeBlockStyle: codeBlockStyle(newTheme),
    inlineCodeStyle: {...codeBlockStyle(newTheme), ...inlineCodeStyle(newTheme)},
    codeContainerStyle
  };
}
