import Emoji from './components/common/Emoji';
import EmojiPlaceholder from './components/common/EmojiPlaceholder';
import ResourcedEmoji from './components/common/ResourcedEmoji';
import EmojiPicker from './components/picker/EmojiPicker';
import EmojiTypeAhead from './components/typeahead/EmojiTypeAhead';
import EmojiResource, { EmojiProvider, UploadingEmojiProvider } from './api/EmojiResource';
import { AbstractResource } from './api/SharedResources';
import EmojiRepository, { EmojiSearchResult } from './api/EmojiRepository';
import EmojiLoader from './api/EmojiLoader';
import { denormaliseEmojiServiceResponse } from './api/EmojiUtils';
import { toEmojiId, toOptionalEmojiId } from './type-helpers';
import { customCategory, defaultEmojiHeight, emojiPickerWidth, emojiPickerHeight } from './constants';

export {
  // Classes
  AbstractResource,
  Emoji,
  EmojiPlaceholder,
  EmojiLoader,
  EmojiPicker,
  EmojiResource,
  EmojiRepository,
  EmojiTypeAhead,
  ResourcedEmoji,
  // functions
  denormaliseEmojiServiceResponse,
  toEmojiId,
  toOptionalEmojiId,
  // interfaces
  EmojiProvider,
  UploadingEmojiProvider,
  EmojiSearchResult,
  // Constants
  emojiPickerWidth,
  emojiPickerHeight,
  defaultEmojiHeight,
  customCategory,
};

export * from './types';

export default EmojiPicker;
