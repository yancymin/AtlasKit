import { denormaliseEmojiServiceResponse, EmojiDescription, EmojiDescriptionWithVariations, EmojiRepository, EmojiServiceResponse } from '@atlaskit/emoji';
import { mockEmojiResourceFactory, MockEmojiResource, MockEmojiResourceConfig } from './mock-emoji-resource';

export const spriteEmoji: EmojiDescription = {
  id: 'grimacing',
  shortName: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 666,
  representation: {
    sprite: {
      url: 'https://path-to-spritesheet.png',
      row: 6,
      column: 6,
      height: 1024,
      width: 1024,
    },
    xIndex: 1,
    yIndex: 1,
    x: 123,
    y: 456,
    height: 72,
    width: 72,
  },
};

export const imageEmoji: EmojiDescription = {
  id: 'grimacing',
  shortName: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 777,
  representation: {
    imagePath: 'https://path-to-image.png',
    width: 24,
    height: 24,
  },
};

declare var require: {
    <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const standardServiceEmojis: EmojiServiceResponse = require('./test-emoji-standard.json') as EmojiServiceResponse;
// tslint:disable-next-line:no-var-requires
export const atlassianServiceEmojis: EmojiServiceResponse = require('./test-emoji-atlassian.json') as EmojiServiceResponse;

export const standardEmojis: EmojiDescription[] = denormaliseEmojiServiceResponse(standardServiceEmojis).emojis;
export const atlassianEmojis: EmojiDescription[] = denormaliseEmojiServiceResponse(atlassianServiceEmojis).emojis;
export const emojis: EmojiDescription[] = [ ...standardEmojis, ...atlassianEmojis ];

export const emojiRepository = new EmojiRepository(emojis);

export const grinEmoji = emojiRepository.findByShortName(':grin:') as EmojiDescriptionWithVariations;
export const watchEmoji = emojiRepository.findByShortName(':watch:') as EmojiDescriptionWithVariations;
export const evilburnsEmoji = emojiRepository.findByShortName(':evilburns:') as EmojiDescriptionWithVariations;
export const thumbsupEmoji = emojiRepository.findByShortName(':thumbsup:') as EmojiDescriptionWithVariations;

export const getEmojiResourcePromise = (config?: MockEmojiResourceConfig): Promise<MockEmojiResource> => mockEmojiResourceFactory(emojiRepository, config);

export const generateSkinVariation = (base: EmojiDescription, idx: number): EmojiDescription => {
  const { id, shortName, name } = base;
  return {
    id: `${id}-${idx}`,
    shortName: `${shortName.substring(0, shortName.length - 1)}-${idx}:`,
    name: `${name} ${idx}`,
    type: 'SITE',
    category: 'CHEESE',
    representation: {
      imagePath: `https://path-to-skin-variation-tone${idx}.png`,
      width: 24,
      height: 24,
    },
  };
};
