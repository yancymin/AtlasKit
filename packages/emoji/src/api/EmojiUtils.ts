import { requestService, RequestServiceOptions, ServiceConfig, KeyValues } from './SharedResourceUtils';
import {
  EmojiDescription,
  EmojiDescriptionWithVariations,
  EmojiMeta,
  EmojiRepresentation,
  EmojiResponse,
  EmojiServiceDescription,
  EmojiServiceDescriptionWithVariations,
  EmojiServiceRepresentation,
  EmojiServiceResponse,
  ImageRepresentation,
  SpriteServiceRepresentation,
} from '../types';
import { isImageRepresentation, isSpriteServiceRepresentation } from '../type-helpers';
import debug from '../util/logger';

export interface EmojiLoaderConfig extends ServiceConfig {
  getRatio?: () => number;
}

export const emojiRequest = (provider: EmojiLoaderConfig, options?: RequestServiceOptions): Promise<EmojiServiceResponse> => {
  const { getRatio = getPixelRatio, ...serviceConfig } = provider;
  const scaleQueryParams: KeyValues = calculateScale(getRatio);
  const { queryParams = {}, ...otherOptions } = options || {};
  const requestOptions = {
    ...otherOptions,
    queryParams: {
      ...scaleQueryParams,
      ...queryParams,
    },
  };
  return requestService<EmojiServiceResponse>(serviceConfig, requestOptions);
};

const calculateScale = (getRatio: () => number): KeyValues => {
  // Retina display
  if (getRatio() > 1) {
    return { scale: 'XHDPI' };
  }
  // Default set used for desktop
  return {};
};

const getPixelRatio = (): number => {
  return window.devicePixelRatio;
};

export const isMediaApiUrl = (url: string, meta?: EmojiMeta): boolean =>
  !!(meta && meta.mediaApiToken && url.indexOf(meta.mediaApiToken.url) === 0);

export const denormaliseServiceRepresentation = (representation: EmojiServiceRepresentation, meta?: EmojiMeta): EmojiRepresentation => {
  if (isSpriteServiceRepresentation(representation) && meta && meta.spriteSheets) {
    const { height, width, x, y, xIndex, yIndex, spriteRef } = representation as SpriteServiceRepresentation;
    const spriteSheet = meta.spriteSheets[spriteRef];
    if (spriteSheet) {
      return {
        sprite: spriteSheet,
        height,
        width,
        x,
        y,
        xIndex,
        yIndex,
      };
    }
  } else if (isImageRepresentation(representation)) {
    const { height, width, imagePath } = representation as ImageRepresentation;
    if (isMediaApiUrl(imagePath, meta)) {
      return {
        height,
        width,
        mediaPath: imagePath,
      };
    }
    return {
      height,
      width,
      imagePath,
    };
  }

  debug('failed conversion for representation', representation, meta);

  return undefined;
};

export const denormaliseSkinEmoji = (skinEmojis?: EmojiServiceDescription[], meta?: EmojiMeta): EmojiDescriptionWithVariations[] => {
  if (!skinEmojis) {
    return [];
  }
  return skinEmojis.map((skin): EmojiDescriptionWithVariations => {
    const { representation, ...other } = skin;
    return {
      ...other,
      representation: denormaliseServiceRepresentation(representation, meta),
    };
  });
};

/**
 * Denormalised an emoji response (emojis + sprite references) into an array of
 * emoji with local sprite definitions.
 */
export const denormaliseEmojiServiceResponse = (emojiData: EmojiServiceResponse): EmojiResponse  => {
  const emojis: EmojiDescription[] = emojiData.emojis.map((emoji: EmojiServiceDescriptionWithVariations): EmojiDescriptionWithVariations => {
    const { id, name, shortName, type, category, order, fallback, ascii } = emoji;
    const representation = denormaliseServiceRepresentation(emoji.representation, emojiData.meta);
    const skinVariations = denormaliseSkinEmoji(emoji.skinVariations, emojiData.meta);

    return {
      id,
      name,
      shortName,
      fallback,
      type,
      category,
      order,
      representation,
      skinVariations,
      ascii,
    };
  });

  const mediaApiToken = emojiData.meta && emojiData.meta.mediaApiToken;

  return {
    emojis,
    mediaApiToken,
  };
};
