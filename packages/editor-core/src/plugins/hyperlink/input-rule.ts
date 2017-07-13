import { URL_REGEX, EMAIL_REGEX } from './regex';
import { Schema, inputRules, Plugin, InputRule } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';
import { normalizeUrl } from './utils';

const urlWithASpace = new RegExp(`${URL_REGEX.source}\\s$`);
const emailWithASpace = new RegExp(`${EMAIL_REGEX.source}\\s$`);

export function createLinkInputRule(regexp: RegExp, formatUrl: (url: string[]) => string): InputRule {
  return createInputRule(regexp, (state, match, start, end) => {
    const { schema } = state;
    if (state.doc.rangeHasMark(start, end, schema.marks.link)) {
      return;
    }

    const url = formatUrl(match);
    const markType = schema.mark('link', { href: url, });

    analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

    return state.tr.addMark(
      start,
      end,
      markType
    ).insertText(' ');
  });
}

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (!schema.marks.link) {
    return;
  }

  const urlWithASpaceRule = createLinkInputRule(urlWithASpace, match => match[3] ? match[1] : `http://${match[1]}`);
  const emailWithASpaceRule = createLinkInputRule(emailWithASpace, match => match[1] && `mailto:${match[1]}`);

  // [something](link) should convert to a hyperlink
  const markdownLinkRule = createInputRule(/(^|[^!])\[(.*?)\]\((\S+)\)$/, (state, match, start, end) => {
    const { schema } = state;
    const url = normalizeUrl(match[3]);
    const markType = schema.mark('link', { href: url });

    analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

    return state.tr.replaceWith(
      start + match[1].length,
      end,
      schema.text(
        match[2],
        [markType]
      )
    );
  });

  return inputRules({
    rules: [
      urlWithASpaceRule,
      emailWithASpaceRule,
      markdownLinkRule
    ]
  });
}

export default inputRulePlugin;
