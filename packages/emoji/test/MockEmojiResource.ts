import * as uid from 'uid';

import { customCategory, customType } from '../src/constants';
import { EmojiDescription, EmojiId, EmojiUpload, OptionalEmojiDescription, SearchOptions } from '../src/types';
import { addCustomCategoryToResult, UploadingEmojiProvider } from '../src/api/EmojiResource';
import EmojiRepository, { EmojiSearchResult } from '../src/api/EmojiRepository';
import { AbstractResource } from '../src/api/SharedResources';
import debug from '../src/util/logger';

export interface PromiseBuilder<R> {
  (result: R): Promise<R>;
}

export interface MockEmojiResourceConfig {
  promiseBuilder?: PromiseBuilder<any>;
  uploadSupported?: boolean;
  uploadError?: string;
}

export const emojiFromUpload = (upload: EmojiUpload) => {
  const { shortName, name, dataURL, height, width } = upload;
  return {
    id: uid(),
    shortName,
    name,
    fallback: shortName,
    type: customType,
    category: customCategory,
    order: -1,
    representation: {
      width,
      height,
      imagePath: dataURL,
    }
  };
};

export class MockNonUploadingEmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> {
  protected emojiRepository: EmojiRepository;
  protected promiseBuilder: PromiseBuilder<any>;
  protected lastQuery: string = '';

  recordedSelections: EmojiId[] = [];

  constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig) {
    super();
    this.emojiRepository = emojiService;
    this.promiseBuilder = (result) => Promise.resolve(result);
    if (config) {
      if (config.promiseBuilder) {
        this.promiseBuilder = config.promiseBuilder;
      }
    }
  }

  filter(query: string, options?: SearchOptions) {
    debug('MockEmojiResource.filter', query);
    this.lastQuery = query;
    this.promiseBuilder(this.emojiRepository.search(query, options)).then((result: EmojiSearchResult) => {
      this.notifyResult(result);
    });
  }

  findByShortName(shortName: string): Promise<OptionalEmojiDescription> {
    const emoji = this.emojiRepository.findByShortName(shortName);
    debug('MockEmojiResource.findByShortcut', shortName, emoji);
    return this.promiseBuilder(emoji);
  }

  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
    const { id, shortName } = emojiId;
    if (id) {
      const emoji = this.emojiRepository.findById(id);
      debug('MockEmojiResource.findById', emojiId, emoji);
      return this.promiseBuilder(emoji);
    }
    const emoji = this.emojiRepository.findByShortName(shortName);
    debug('MockEmojiResource.findById; not id using shortName', emojiId, emoji);
    return this.promiseBuilder(emoji);
  }

  findById(id: string): Promise<OptionalEmojiDescription> {
    const emoji = this.emojiRepository.findById(id);
    debug('MockEmojiResource.findById', id, emoji);
    return this.promiseBuilder(emoji);
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    const emojis = this.emojiRepository.findInCategory(categoryId);
    return this.promiseBuilder(emojis);
  }

  getAsciiMap(): Promise<Map<string, EmojiDescription>> {
    return this.promiseBuilder(this.emojiRepository.getAsciiMap());
  }

  recordSelection?(id: EmojiId): Promise<any> {
    this.recordedSelections.push(id);
    return this.promiseBuilder(undefined);
  }
}

export interface UploadDetail {
  upload: EmojiUpload;
  emoji: EmojiDescription;
}

export class MockEmojiResource extends MockNonUploadingEmojiResource implements UploadingEmojiProvider {
  private uploads: UploadDetail[] = [];
  private uploadSupported: boolean;
  private uploadError?: string;

  constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig) {
    super(emojiService, config);
    this.uploadSupported = false;
    if (config) {
      this.uploadSupported = !!config.uploadSupported;
      this.uploadError = config.uploadError;
    }
  }

  filter(query: string, options?: SearchOptions) {
    debug('MockEmojiResource.filter', query);
    this.lastQuery = query;
    this.promiseBuilder(this.emojiRepository.search(query, options)).then((result: EmojiSearchResult) => {
      this.notifyResult(addCustomCategoryToResult(this.uploadSupported, result));
    });
  }

  isUploadSupported(): Promise<boolean> {
    return this.promiseBuilder(this.uploadSupported);
  }

  uploadCustomEmoji(upload: EmojiUpload) {
    if (this.uploadError) {
      return Promise.reject(this.uploadError);
    }
    const emoji = emojiFromUpload(upload);
    this.uploads.push({
      upload,
      emoji,
    });
    this.emojiRepository.addCustomEmoji(emoji);
    this.filter(this.lastQuery);
    return this.promiseBuilder(emoji);
  }

  getUploads(): UploadDetail[] {
    return this.uploads;
  }

  prepareForUpload() {}

  // Make public for testing
  notifyNotReady() {
    super.notifyNotReady();
  }

}

export const mockNonUploadingEmojiResourceFactory = (emojiRepository: EmojiRepository, config?: MockEmojiResourceConfig, promiseBuilder?: PromiseBuilder<MockNonUploadingEmojiResource>) => {
  const mockEmojiResource = new MockNonUploadingEmojiResource(emojiRepository, config);
  if (promiseBuilder) {
    return promiseBuilder(mockEmojiResource);
  }
  return Promise.resolve(mockEmojiResource);
};

export const mockEmojiResourceFactory = (emojiRepository: EmojiRepository, config?: MockEmojiResourceConfig, promiseBuilder?: PromiseBuilder<MockEmojiResource>) => {
  const mockEmojiResource = new MockEmojiResource(emojiRepository, config);
  if (promiseBuilder) {
    return promiseBuilder(mockEmojiResource);
  }
  return Promise.resolve(mockEmojiResource);
};
