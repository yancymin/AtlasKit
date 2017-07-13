import { EMAIL_REGEX, URL_REGEX_G, EMAIL_REGEX_G } from './regex';
import { Slice, Fragment, Node, Schema } from '../../prosemirror';

export function isEmail(url: string): boolean {
  return EMAIL_REGEX.test(url);
}

// http:, https:, ftp:, mailto:
export function hasProtocol(url: string): boolean {
  return /^[a-zA-Z0-9]+:(\/\/)?/.test(url);
}

// #hash, /path, ./path
export function isRelative(url: string) {
  return /^[#\/]|(\.\/)/.test(url);
}

/**
 * Adds protocol to url if needed.
 */
export function normalizeUrl(url: string) {
  if (!url || hasProtocol(url) || isRelative(url)) {
    return url;
  }

  if (isEmail(url)) {
    return `mailto:${url}`;
  }

  return `http://${url}`;
}

export function linkifyText(schema: Schema<any, any>, text: string): Slice|undefined {
  const matches: any[] = findLinkMatches(text);
  if (matches.length === 0) {
    return undefined;
  }
  matches.sort((m1, m2) => (m1.start - m2.start));
  let start = 0;
  const fragments: any = [];
  matches.forEach(match => {
    if (match.start > start) {
      fragments.push(schema.text(text.slice(start, match.start)));
    }
    fragments.push(schema.text(match.title, [schema.marks.link.create({ href: match.href })]));
    start = match.end;
  });
  if (start < text.length) {
    fragments.push(schema.text(text.slice(start, text.length)));
  }
  const combinedFragment = Fragment.fromArray(fragments);
  return new Slice(combinedFragment, 0, 0);
}

export function linkifyContent(schema: Schema<any, any>, slice: Slice): Slice | undefined {
  const fragment = linkinfyFragment(schema, slice.content);
  if (fragment) {
    return new Slice(fragment, slice.openStart, slice.openEnd);
  }
}

function linkinfyFragment(schema: Schema<any, any>, fragment: Fragment): Fragment | undefined {
  const linkified: Node[] = [];
  for (let i = 0, len = fragment.childCount; i < len; i++) {
    const child: Node = fragment.child(i);
    if (child.type === schema.nodes.table) {
      return;
    }
    if (child.isText) {
      const text = child.textContent as string;
      const link = child.type.schema.marks['link'];
      const matches: any[] = findLinkMatches(text);
      let pos = 0;
      matches.forEach(match => {
        if (match.start > 0) {
          linkified.push(child.cut(pos, match.start));
        }
        linkified.push(
          child.cut(match.start, match.end).mark(link.create({href: match.href}).addToSet(child.marks))
        );
        pos = match.end;
      });
      if (pos < text.length) {
        linkified.push(child.cut(pos));
      }
    } else {
      linkified.push(child.copy(linkinfyFragment(schema, child.content)));
    }
  }
  return Fragment.fromArray(linkified);
}

interface Match {
  start: number;
  end: number;
  title: string;
  href: string;
}

function findLinkMatches(text: string): Match[] {
  const matches: Match[] = [];
  let match: RegExpExecArray | null;
  while(match = URL_REGEX_G.exec(text)) {
    if (!isMatchOverlapping(matches, match)) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        title: match[0],
        href: match[0],
      });
    }
  }
  while(match = EMAIL_REGEX_G.exec(text)) {
    if (!isMatchOverlapping(matches, match)) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        title: match[0],
        href: `mailto:${match[0]}`,
      });
    }
  }
  return matches;
}

/**
 * The function check that the regex match for url or email does not overlap an existing url or email.
 * This is required as letter separator like / . are valid characters in url,
 * and that can reasult in multiple marks being added for 1 link.
 */
function isMatchOverlapping(matches: Match[], match: RegExpExecArray | null): boolean {
  let isOverlapping: boolean = false;
  if(match) {
    if (matches.some(m => match.index >= m.start && match.index <= m.end)) {
      isOverlapping = true;
    }
    const matchEnd = match.index + match[0].length;
    if (matches.some(m => matchEnd >= m.start && matchEnd <= m.end)) {
      isOverlapping = true;
    }
  }
  return isOverlapping;
}
