import { EmojiDescription, toEmojiId } from '@atlaskit/emoji';
import { emoji as emojiData } from '@atlaskit/util-data-test';

const emojiRepository = emojiData.emojiTestData.emojiRepository;

export const grinningId = toEmojiId(emojiRepository.findByShortName(':grinning:') as EmojiDescription);
export const laughingId = toEmojiId(emojiRepository.findByShortName(':laughing:') as EmojiDescription);
export const thumbsupId = toEmojiId(emojiRepository.findByShortName(':thumbsup:') as EmojiDescription);
export const grinId = toEmojiId(emojiRepository.findByShortName(':grin:') as EmojiDescription);
export const smileyId = toEmojiId(emojiRepository.findByShortName(':smiley:') as EmojiDescription);

