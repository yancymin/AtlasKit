import { Node, DOMParser } from '@atlaskit/editor-core';
import schema from './schema';
import arrayFrom from './util/array-from';

/**
 * This function gets markup rendered by Bitbucket server and transforms it into markup that
 * can be consumed by Prosemirror HTML parser, conforming to our schema.
 */
export function transformHtml(html: string): HTMLElement {
  const el = document.createElement('div');
  el.innerHTML = html;

  // Remove zero-width-non-joiner
  arrayFrom(el.querySelectorAll('p')).forEach((p: HTMLParagraphElement) => {
    const zwnj = /\u200c/g;
    if (p.textContent && zwnj.test(p.textContent)) {
      p.textContent = p.textContent.replace(zwnj, '');
    }
  });

  // Convert mention containers, i.e.:
  //   <a href="/abodera/" rel="nofollow" title="@abodera" class="mention mention-me">Artur Bodera</a>
  arrayFrom(el.querySelectorAll('a.mention')).forEach((a: HTMLLinkElement) => {
    const span = document.createElement('span');
    span.setAttribute('class', 'editor-entity-mention');
    span.setAttribute('contenteditable', 'false');

    const title = a.getAttribute('title') || '';
    if (title) {
      const usernameMatch = title.match(/^@(.*?)$/);
      if (usernameMatch) {
        const username = usernameMatch[1];
        span.setAttribute('mention-id', username);
      }
    }

    const text = a.textContent || '';
    if (text.indexOf('@') === 0) {
      span.textContent = a.textContent;
    } else {
      span.textContent = `@${a.textContent}`;
    }

    a.parentNode!.insertBefore(span, a);
    a.parentNode!.removeChild(a);
  });

  // Simplify <table>s into paragraphs
  arrayFrom(el.querySelectorAll('table')).forEach((table: HTMLTableElement) => {
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // Convert <thead> into a paragraph of bold, comma-separated phrases.
    if (thead) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');

      strong.innerText = arrayFrom(thead.querySelectorAll('th'))
        .map((th) => th.innerText)
        .filter((v) => (!!v))   // skip zombie cells
        .join(', ')
      ;
      p.appendChild(strong);
      table.parentNode!.insertBefore(p, table);
    }

    // Convert <tr> into a paragraphs of comma-separated phrases.
    if (tbody) {
      arrayFrom(tbody.querySelectorAll('tr')).forEach((tr: HTMLTableRowElement) => {
        const p = document.createElement('p');
        p.innerText = arrayFrom(tr.querySelectorAll('td'))
          .map((td) => td.innerText)
          .filter((v) => (!!v))   // skip zombie cells
          .join(', ')
        ;
        table.parentNode!.insertBefore(p, table);
      });
    }

    table.parentNode!.removeChild(table);
  });

  // Parse emojis i.e.
  //     <img src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg" alt="diamond shape with a dot inside" title="diamond shape with a dot inside" class="emoji">
  arrayFrom(el.querySelectorAll('img.emoji')).forEach((img: HTMLImageElement) => {
    const span = document.createElement('span');
    let shortName = img.getAttribute('data-emoji-short-name') || '';

    if (!shortName) {
      // Fallback to parsing Bitbucket's src attributes to find the
      // short name
      const src = img.getAttribute('src');
      const idMatch = !src ? false : src.match(/([^\/]+)\.[^\/]+$/);

      if (idMatch) {
        shortName = `:${decodeURIComponent(idMatch[1])}:`;
      }
    }

    if (shortName) {
      span.setAttribute('data-emoji-short-name', shortName);
    }

    img.parentNode!.insertBefore(span, img);
    img.parentNode!.removeChild(img);
  });

  // Convert all automatic links to plain text, because they will be re-created on render by the server
  arrayFrom(el.querySelectorAll('a[rel="nofollow"]')).forEach((a: HTMLLinkElement) => {
    const text = document.createTextNode(a.innerText);
    a.parentNode!.insertBefore(text, a);
    a.parentNode!.removeChild(a);
  });

  return el;
}

/**
 * This function gets html string and parses it into ProseMirror Node.
 * Note that all unsupported elements will be discarded after parsing.
 */
export function parseHtml(html: string): Node {
  return DOMParser.fromSchema(schema).parse(transformHtml(html));
}
