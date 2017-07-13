import {
  EmojiDescription,
  EmojiDescriptionWithVariations,
  EmojiId,
  ImageRepresentation,
  MediaApiRepresentation,
  OptionalEmojiDescription,
  SpriteRepresentation,
  SpriteServiceRepresentation,
} from './types';

export const isSpriteServiceRepresentation = (rep): rep is SpriteServiceRepresentation => !!(rep && (<SpriteServiceRepresentation> rep).spriteRef);
export const isSpriteRepresentation = (rep): rep is SpriteRepresentation => !!(rep && (<SpriteRepresentation> rep).sprite);
export const isImageRepresentation = (rep): rep is ImageRepresentation => !!(rep && (<ImageRepresentation> rep).imagePath);
export const isMediaApiRepresentation = (rep): rep is MediaApiRepresentation => !!(rep && (<MediaApiRepresentation> rep).mediaPath);

/**
 * Determines if an emoji description is in a loading form (i.e. not suitable for rendering, e.g. a media emoji).
 */
export const isEmojiLoaded = (emoji: EmojiDescription) => !isMediaApiRepresentation(emoji.representation);

export const isEmojiDescriptionWithVariations = (emoji): emoji is EmojiDescriptionWithVariations =>
  !!(emoji && (<EmojiDescriptionWithVariations> emoji).skinVariations);

export const toEmojiId = (emoji: EmojiDescription): EmojiId => ({
  shortName: emoji.shortName,
  id: emoji.id,
  fallback: emoji.fallback,
});

export const toOptionalEmojiId = (emoji: OptionalEmojiDescription): EmojiId | undefined => {
  if (!emoji) {
    return undefined;
  }
  return toEmojiId(emoji);
};

export const isEmojiIdEqual = (l?: EmojiId, r?: EmojiId) => (
  (l === r) ||
  (l && r && l.id === r.id && l.shortName === r.shortName)
);

export const containsEmojiId = (emojis: EmojiDescription[], emojiId: EmojiId | undefined) => {
  if (!emojiId) {
    return false;
  }
  for(let i = 0; i < emojis.length; i++) {
    if (isEmojiIdEqual(emojis[i], emojiId)) {
      return true;
    }
  }
  return false;
};
