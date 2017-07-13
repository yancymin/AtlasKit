import MentionResource from './_mock-ak-mention-resource';

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
  shouldHighlightMention(mention) {
    return mention.id === '19';
  }
});
