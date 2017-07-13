import { expect } from 'chai';

import { atlassianEmojis, emojiRepository, grinEmoji, evilburnsEmoji, standardEmojis } from '../../../src/emoji/test-data';

describe('#test data', () => {
  it('expected standard emojis', () => {
    expect(standardEmojis.length, '80 Standard Emoji').to.equal(80);
  });

  it('expected atlassian emojis', () => {
    expect(atlassianEmojis.length, '10 Atlassian Emoji').to.equal(10);
  });

  it('expected grin emoji', () => {
    const emoji = grinEmoji;
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('1f601');
      expect(emoji.shortName, 'shortName').to.equal(':grin:');
    }
  });

  it('expected evilburns emojis', () => {
    const emoji = evilburnsEmoji;
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('atlassian-evilburns');
      expect(emoji.shortName, 'shortName').to.equal(':evilburns:');
    }
  });

  it('expected grin emoji', () => {
    const emoji = emojiRepository.findById('1f601');
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('1f601');
      expect(emoji.shortName, 'shortName').to.equal(':grin:');
    }
  });

  it('expected evilburns emojis', () => {
    const emoji = emojiRepository.findById('atlassian-evilburns');
    expect(emoji, 'Emoji found').to.not.equal(undefined);
    if (emoji) {
      expect(emoji.id, 'id').to.equal('atlassian-evilburns');
      expect(emoji.shortName, 'shortName').to.equal(':evilburns:');
    }
  });
});
