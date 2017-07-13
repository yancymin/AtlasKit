import { expect } from 'chai';

import { customCategory } from '../../src/constants';
import { EmojiServiceResponse, EmojiServiceDescriptionWithVariations, ImageRepresentation, SpriteRepresentation } from '../../src/types';
import { denormaliseEmojiServiceResponse } from '../../src/api/EmojiUtils';

import { defaultMediaApiToken, mediaEmoji, mediaServiceEmoji } from '../TestData';

describe('EmojiUtils', () => {
  describe('#denormaliseEmojiServiceResponse', () => {
    const emojiFields = ['id', 'name', 'shortName', 'type', 'category', 'order'];

    const checkFields = (actual, expected, fields) => {
      fields.forEach((field) => {
        expect(actual[field], field).to.equal(expected[field]);
      });
    };

    it('denormaliseEmojiServiceResponse emoji with sprite', () => {
      const spriteRef = 'http://spriteref/test.png';
      const emoji: EmojiServiceDescriptionWithVariations = {
        id: '1f600',
        name: 'grinning face',
        shortName: 'grinning',
        type: 'STANDARD',
        category: 'PEOPLE',
        order: 1,
        skinVariations: [
          {
            id: '1f600-1f3fb',
            name: 'grinning face',
            shortName: ':grinning::skin-tone-2',
            type: 'STANDARD',
            category: 'PEOPLE',
            order: 1,
            representation: {
              spriteRef,
              x: 666,
              y: 777,
              height: 42,
              width: 43,
              xIndex: 6,
              yIndex: 23,
            }
          },
        ],
        representation: {
          spriteRef,
          x: 216,
          y: 2304,
          height: 72,
          width: 75,
          xIndex: 3,
          yIndex: 32,
        },
      };
      const spriteSheet = {
        url: spriteRef,
        row: 41,
        column: 56,
        height: 2952,
        width: 4032,
      };
      const emojiResponse = denormaliseEmojiServiceResponse({
        emojis: [emoji],
        meta: {
          spriteSheets: {
            [spriteRef]: spriteSheet,
          },
        },
      });
      const emojis = emojiResponse.emojis;
      expect(emojis.length).to.equal(1);
      const e = emojis[0];
      checkFields(e, emoji, emojiFields);
      const spriteFields = ['x', 'y', 'height', 'width', 'xIndex', 'yIndex'];
      checkFields(e.representation, emoji.representation, spriteFields);
      const spriteSheetFields = ['url', 'row', 'column', 'height', 'width'];
      const representation = e.representation as SpriteRepresentation;
      checkFields(representation && representation.sprite, spriteSheet, spriteSheetFields);
      expect(e.skinVariations && e.skinVariations.length).to.equal(1);
      if (e.skinVariations && emoji.skinVariations && emoji.skinVariations.length) {
        const skinEmoji0 = e.skinVariations[0];
        checkFields(skinEmoji0, emoji.skinVariations[0], spriteFields);
        const skinEmoji0Rep = skinEmoji0.representation as SpriteRepresentation;
        checkFields(skinEmoji0Rep.sprite, spriteSheet, spriteSheetFields);
      }
    });

    it('denormaliseEmojis emoji with image', () => {
      const emoji = {
        id: '13d29267-ff9e-4892-a484-1a1eef3b5ca3',
        name: 'standup.png',
        shortName: 'standup.png',
        type: 'SITE',
        category: customCategory,
        order: -1,
        skinVariations: [
          {
            id: '13d29267-ff9e-4892-a484-1a1eef3b5c45',
            name: 'standup-large.png',
            shortName: ':standup-large:',
            type: 'SITE',
            category: customCategory,
            order: -1,
            representation: {
              imagePath: 'https://something/something2.png',
              height: 666,
              width: 666,
            },
          },
        ],
        representation: {
          imagePath: 'https://something/something.png',
          height: 64,
          width: 64,
        },
      };
      const emojiResponse = denormaliseEmojiServiceResponse({
        emojis: [emoji],
      });
      const emojis = emojiResponse.emojis;
      expect(emojis.length).to.equal(1);
      const e = emojis[0];
      checkFields(e, emoji, emojiFields);
      checkFields(e.representation, emoji.representation, ['imagePath', 'height', 'width']);
      expect(e.skinVariations && e.skinVariations.length).to.equal(1);
      checkFields(e.skinVariations && e.skinVariations[0], emoji.skinVariations[0], ['imagePath', 'height', 'width']);
    });

    it('maps out the ascii field when present', () => {
      const emoji = {
        id: '1f603',
        name: 'smiling face with open mouth',
        fallback: '😃',
        type: 'STANDARD',
        category: 'PEOPLE',
        order: 2,
        representation: {
          spriteRef: 'http:/example.com/sprite.png',
          x: 34,
          y: 0,
          height: 32,
          width: 32,
          xIndex: 1,
          yIndex: 0
        },
        ascii: [
          ':D',
          ':-D',
          '=D'
        ],
        shortName: ':smiley:'
      };
      const emojiResponse = denormaliseEmojiServiceResponse({
        emojis: [emoji],
      });
      expect(emojiResponse.emojis[0].ascii).to.deep.equal([':D', ':-D', '=D']);
    });
  });

  describe('#denormaliseServiceRepresentation', () => {
    it('media emoji converted to media representation', () => {
      const mediaApiToken = defaultMediaApiToken();
      const emojiServiceData: EmojiServiceResponse = {
        emojis: [ mediaServiceEmoji ],
        meta: {
          mediaApiToken,
        },
      };
      const serviceRepresentation = mediaServiceEmoji.representation as ImageRepresentation;
      expect(serviceRepresentation.imagePath.indexOf(mediaApiToken.url), 'Test data matches').to.equal(0);

      const emojiData = denormaliseEmojiServiceResponse(emojiServiceData);
      expect(emojiData.mediaApiToken, 'mediaApiToken copied').to.deep.equal(mediaApiToken);
      expect(emojiData.emojis.length, 'Same number of emoji').to.equal(1);

      const convertedEmoji = emojiData.emojis[0];
      expect(convertedEmoji, 'Converted emoji').to.deep.equal(mediaEmoji);
    });
  });
});
