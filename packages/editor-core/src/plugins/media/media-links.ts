import {
  atTheEndOfDoc,
  endPositionOfParent
} from '../../utils';
import {
  EditorView,
  AddMarkStep,
  ReplaceStep,
  Transaction,
  Fragment,
  Mark,
  MarkType,
} from '../../prosemirror';
import { posOfMediaGroupBelow, posOfParentMediaGroup } from './utils';

export interface RangeWithUrls {
  start: number;
  end: number;
  urls: string[];
}

export const insertLinks = (view: EditorView, linkRanges: RangeWithUrls[], collection?: string): void => {
  if (linkRanges.length <= 0 || !collection) {
    return;
  }

  const { state, dispatch } = view;
  const { tr } = state;

  const linksInfo = reduceLinksInfo(state, linkRanges);

  const linkNodes = linksInfo.urls.map((url) => {
    return state.schema.nodes.media.create({ id: url, type: 'link', collection: collection });
  });

  const $latestPos = tr.doc.resolve(linksInfo.latestPos);

  const insertPos = posOfMediaGroupBelow(state, $latestPos, false)
    || posOfParentMediaGroup(state, $latestPos, false)
    || endPositionOfParent($latestPos);

  // insert a paragraph after if reach the end of doc
  if (atTheEndOfDoc(state)) {
    tr.insert(insertPos, state.schema.nodes.paragraph.create());
  }

  tr.replaceWith(insertPos, insertPos, linkNodes);
  dispatch(tr);
};

export const detectLinkRangesInSteps = (tr: Transaction, link: MarkType): RangeWithUrls[] => {
  const linkRanges: RangeWithUrls[] = [];

  tr.steps.forEach((step) => {
    let rangeWithUrls;
    if (step instanceof AddMarkStep) {
      rangeWithUrls = findRangesWithUrlsInAddMarkStep(step as AddMarkStep, link);
    } else if (step instanceof ReplaceStep) {
      rangeWithUrls = findRangesWithUrlsInReplaceStep(step as ReplaceStep, link);
    }

    if (rangeWithUrls) {
      linkRanges.push(rangeWithUrls);
    }
  });

  return linkRanges;
};

const reduceLinksInfo = (state, linkRanges: RangeWithUrls[]): { latestPos: number, urls: string[] } => {
  const posAtTheEndOfDoc = state.doc.nodeSize - 4;

  const linksInfo = linkRanges.reduce((linksInfo, rangeWithUrl) => {
    linksInfo.urls = linksInfo.urls.concat(rangeWithUrl.urls);
    if (rangeWithUrl.end > linksInfo.latestPos) {
      linksInfo.latestPos = rangeWithUrl.end;
    }

    if (posAtTheEndOfDoc < linksInfo.latestPos) {
      linksInfo.latestPos = posAtTheEndOfDoc;
    }
    return linksInfo;
  }, { latestPos: 0, urls: [] as string[] });

  return linksInfo;
};

const findRangesWithUrlsInAddMarkStep = (step: AddMarkStep, link: MarkType): RangeWithUrls | undefined => {
  const { mark } = step;
  if (isValidLinkMark(mark, link)) {
    return { start: step.from, end: step.to, urls: [mark.attrs.href] };
  }
};

const isValidLinkMark = (mark: Mark, link: MarkType): boolean => {
  return mark.type === link && mark.attrs.href.length;
};

const findRangesWithUrlsInReplaceStep = (step: ReplaceStep, link: MarkType): RangeWithUrls | undefined => {
  const { slice } = step;
  const urls: string[] = findLinksInNodeContent([], slice.content, link);
  if (urls.length > 0) {
    // The end position is step.from + slice.size || step.to is because
    // it can be replaced by a smaller size content
    // if simply use step.to, it might be out of range later.
    return { start: step.from, end: Math.min(step.from + slice.size, step.to), urls: urls };
  }
};

const findLinksInNodeContent = (urls: string[], content: Fragment, link: MarkType) => {
  content.forEach((child) => {
    const linkMarks = child.marks.filter((mark) => {
      return isValidLinkMark(mark, link);
    });

    if (linkMarks.length > 0) {
      urls.push(linkMarks[0].attrs.href);
    }

    findLinksInNodeContent(urls, child.content, link);
  });

  return urls;
};
