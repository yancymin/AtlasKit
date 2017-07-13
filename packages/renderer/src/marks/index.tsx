import * as React from 'react';
import Em from './em';
import Link from './link';
import Mono from './mono';
import Strike from './strike';
import Strong from './strong';
import SubSup from './subsup';
import Underline from './underline';
import Code from './code';
import { Renderable } from '../nodes';
import HardBreak from '../nodes/hardBreak';
import { isSafeUrl } from '../utils';

import { isSubSupType } from '../marks/subsup';

export interface Mark {
  type: string;
  attrs?: any;
}

enum MarkType {
  em,
  link,
  mono,
  strike,
  strong,
  subsup,
  underline,
  code,
  text,
  unknown
}

export const markOrder = [
  'link',
  'em',
  'strong',
  'strike',
  'mono',
  'subsup',
  'underline',
  'code',
  'text',
  'unknown'
];

export const getMarksByOrder = (marks: Mark[]) => {
  return [...marks].sort((a, b) => markOrder.indexOf(a.type) - markOrder.indexOf(b.type));
};

const getKey = (node: Renderable, index: number) => {
  const { type } = node;
  if (MarkType[type] === MarkType.subsup) {
    return `${type}-${node.attrs!['type']}-${index}`;
  }

  return `${type}-${index}`;
};

export const getValidMark = (mark: Renderable): Renderable => {
  const { content, type } = mark;

  if (type) {
    switch (MarkType[type]) {
      case MarkType.em:
        return {
          type,
          content
        };
      case MarkType.link: {
        const { attrs } = mark;
        if (attrs) {
          const { href, url } = attrs;
          let linkHref = href || url;

          if (linkHref.indexOf(':') === -1) {
            linkHref = `//${linkHref}`;
          }

          if (linkHref && isSafeUrl(linkHref)) {
            return {
              type,
              content,
              attrs: {
                href: linkHref
              }
            };
          }
        }
        break;
      }
      case MarkType.mono:
        return {
          type,
          content
        };
      case MarkType.strike:
        return {
          type,
          content
        };
      case MarkType.strong:
        return {
          type,
          content
        };
      case MarkType.subsup: {
        const { attrs } = mark;
        if (attrs && attrs['type']) {
          const subSupType = attrs['type'];
          if (isSubSupType(subSupType)) {
            return {
              type,
              content,
              attrs: {
                type: subSupType
              }
            };
          }
        }
        break;
      }
      case MarkType.underline:
        return {
          type,
          content
        };
      case MarkType.code:
        return {
          type,
          content
        };
      case MarkType.text: {
        const { text } = mark;
        if (text) {
          return {
            type,
            text
          };
        }
        break;
      }
    }
  }

  return {
    type: MarkType[MarkType.unknown],
    content
  };
};

export const renderMark = (mark: Renderable, index: number = 0) => {
  const validMark = getValidMark(mark);
  const content = (validMark.content || []).map((child, index) => renderMark(child as Renderable, index));
  const key = getKey(validMark, index);

  switch (MarkType[validMark.type]) {
    case MarkType.em:
      return <Em key={key}>{content}</Em>;
    case MarkType.link: {
      const { attrs } = validMark;
      const { href } = attrs as { href: string };
      // NOTE: https://product-fabric.atlassian.net/browse/ED-1236
      return <Link key={key} href={href} target="_blank">{content}</Link>;
    }
    case MarkType.mono:
      return <Mono key={key}>{content}</Mono>;
    case MarkType.strike:
      return <Strike key={key}>{content}</Strike>;
    case MarkType.strong:
      return <Strong key={key}>{content}</Strong>;
    case MarkType.subsup: {
      const { attrs } = validMark;
      const { type } = attrs as { type: 'sub' | 'sup' };
      return <SubSup key={key} type={type}>{content}</SubSup>;
    }
    case MarkType.underline:
      return <Underline key={key}>{content}</Underline>;
    case MarkType.code:
      return <Code key={key} text={content.join()} />;
    case MarkType.text:
      if (validMark.text === '\n') {
        return <HardBreak key={key} />;
      }
      return validMark.text;
    default: {
      // Mark is unkown, render it's content (if any)
      return validMark.content ? renderMark(validMark.content![0] as Renderable) : null;
    }
  }
};

export const isSameMark = (mark: Mark | null, otherMark: Mark | null) => {
  if (mark === otherMark) {
    return true;
  }

  if (!mark || !otherMark) {
    return false;
  }

  if (mark.type !== otherMark.type) {
    return false;
  }

  if ((mark.attrs && !otherMark.attrs) || (!mark.attrs && otherMark.attrs)) {
    return false;
  }

  // TODO: Use some deep-equal function instead
  return !Object.keys(mark.attrs || {}).some(attr => mark.attrs![attr] !== otherMark.attrs![attr]);
};
