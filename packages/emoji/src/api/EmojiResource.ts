import { customCategory } from '../constants';
import { EmojiDescription, EmojiId, EmojiResponse, EmojiUpload, OptionalEmojiDescription, SearchOptions } from '../types';
import { isMediaApiRepresentation } from '../type-helpers';
import EmojiLoader from './EmojiLoader';
import EmojiRepository, { EmojiSearchResult } from './EmojiRepository';
import { requestService, ServiceConfig } from './SharedResourceUtils';
import { AbstractResource, OnProviderChange, Provider } from './SharedResources';
import MediaEmojiResource from './MediaEmojiResource';

export interface EmojiResourceConfig {
  /**
   * The service configuration for recording emoji selections.
   * A post will be performed to this URL with the EmojiId as the body.
   */
  recordConfig?: ServiceConfig;

  /**
   * This defines the different providers. Later providers will override earlier
   * providers when performing shortName based look up.
   */
  providers: ServiceConfig[];

  /**
   * Must be set to true to enable upload support in the mention components.
   *
   * Can be used for the restriction of the upload UI based on permissions, or feature flags.
   *
   * Note this also requires that other conditions are met (for example, one of the providers
   * must support upload for the UploadingEmojiResource implementation of UploadingEmojiProvider).
   */
  allowUpload?: boolean;
}

export interface OnEmojiProviderChange extends OnProviderChange<EmojiSearchResult, any, void> {}

export interface Retry<T> {
  (): Promise<T>;
}

export interface ResolveReject<T> {
  resolve(result: T): void;
  reject(reason?: any): void;
}

export interface EmojiProvider extends Provider<string, EmojiSearchResult, any, undefined, SearchOptions> {
  /**
   * Returns the first matching emoji matching the shortName, or null if none found.
   *
   * Will load media api images before returning.
   */
  findByShortName(shortName: string): Promise<OptionalEmojiDescription>;

  /**
   * Returns the first matching emoji matching the emojiId.id.
   *
   * If not found or emojiId.id is undefined, fallback to a search by shortName.
   *
   * Will load media api images before returning.
   */
  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription>;

  /**
   * Return the emoji that matches the supplied id or undefined. As with findByEmojiId, this call should load
   * the media api images before returning.
   */
  findById(id: string): Promise<OptionalEmojiDescription>;

  /**
   * Finds emojis belonging to specified category.
   *
   * Does not automatically load Media API images.
   */
  findInCategory(categoryId: string): Promise<EmojiDescription[]>;

  /**
   * Returns a map matching ascii representations to their corresponding EmojiDescription.
   */
  getAsciiMap(): Promise<Map<string, EmojiDescription>>;

  /**
   * Records an emoji selection, for example for using in tracking recent emoji.
   *
   * Optional.
   */
  recordSelection?(id: EmojiId): Promise<any>;
}

export interface UploadingEmojiProvider extends EmojiProvider {
  /**
   * Returns true if upload is supported.
   *
   * Waits until resources have loaded before returning.
   */
  isUploadSupported(): Promise<boolean>;

  /**
   * Uploads an emoji to the configured repository.
   *
   * Will return a promise with the EmojiDescription once completed.
   *
   * The last search will be re-run to ensure the new emoji is considered in the search.
   */
  uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription>;

  /**
   * Allows the preloading of data (e.g. authentication tokens) to speed the uploading of emoji.
   */
  prepareForUpload();
}

/**
 * Checks if the emojiProvider can support uploading at a feature level.
 *
 * Follow this up with an isUploadSupported() check to see if the provider is actually
 * configured to support uploads.
 */
export const supportsUploadFeature = (emojiProvider: EmojiProvider): emojiProvider is UploadingEmojiProvider => {
  const { isUploadSupported, prepareForUpload, uploadCustomEmoji } = emojiProvider as UploadingEmojiProvider;
  return !!(isUploadSupported && prepareForUpload && uploadCustomEmoji);
};

export interface LastQuery {
  query?: string;
  options?: SearchOptions;
}

// Batch size === 1 row in the emoji picker
const mediaEmojiBatchSize = 8;

export const addCustomCategoryToResult = (includeCustom: boolean, searchResult: EmojiSearchResult): EmojiSearchResult => {
  if (searchResult.categories[customCategory] || !includeCustom) {
    return searchResult;
  }

  const categories = {
    ...searchResult.categories,
    [customCategory]: true,
  };
  return {
    ...searchResult,
    categories
  };
};

export class EmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
  protected recordConfig?: ServiceConfig;
  protected emojiRepository: EmojiRepository;
  protected lastQuery: LastQuery;
  protected activeLoaders: number = 0;
  protected retries: Map<Retry<any>, ResolveReject<any>> = new Map();
  protected mediaEmojiResource?: MediaEmojiResource;

  constructor(config: EmojiResourceConfig) {
    super();
    this.recordConfig = config.recordConfig;

    // Ensure order is retained by tracking until all done.
    const emojiResponses: EmojiResponse[] = [];

    this.activeLoaders = config.providers.length;

    config.providers.forEach((provider, index) => {
      const loader = new EmojiLoader(provider);
      const emojis = loader.loadEmoji();
      emojis.then((emojiResponse) => {
        this.activeLoaders--;
        emojiResponses[index] = emojiResponse;
        this.initEmojiRepository(emojiResponses);
        this.initMediaEmojiResource(emojiResponse, provider);
        this.performRetries();
        this.refreshLastFilter();
      }).catch((reason) => {
        this.activeLoaders--;
        this.notifyError(reason);
      });
    });

    if (config.providers.length === 0) {
      throw new Error('No providers specified');
    }
  }

  private initEmojiRepository(emojiResponses: EmojiResponse[]): void {
    let emojis: EmojiDescription[] = [];
    emojiResponses.forEach(emojiResponse => {
      emojis = emojis.concat(emojiResponse.emojis);
    });
    this.emojiRepository = new EmojiRepository(emojis);
  }

  protected initMediaEmojiResource(emojiResponse: EmojiResponse, provider: ServiceConfig): void {
    if (!this.mediaEmojiResource && emojiResponse.mediaApiToken) {
      this.mediaEmojiResource = new MediaEmojiResource(provider, emojiResponse.mediaApiToken);
    }
  }

  private performRetries(): void {
    const currentRetries = this.retries;
    this.retries = new Map();
    currentRetries.forEach((resolveReject, retry) => {
      retry().then(response => {
        resolveReject.resolve(response);
      })
      .catch(reason => {
        resolveReject.reject(reason);
      });
    });
  }

  protected refreshLastFilter(): void {
    if (typeof this.lastQuery !== 'undefined') {
      const { query, options } = this.lastQuery;
      this.filter(query, options);
    }
  }

  protected isLoaded = () => {
    return !this.activeLoaders;
  }

  protected retryIfLoading<T>(retry: Retry<T>, defaultResponse?: T): Promise<T | undefined> {
    if (!this.isLoaded()) {
      return new Promise<T>((resolve, reject) => {
        this.retries.set(retry, { resolve, reject });
      });
    }
    return Promise.resolve<T | undefined>(defaultResponse);
  }

  protected notifyResult(result: EmojiSearchResult): void {
    if (result.query === this.lastQuery.query) {
      super.notifyResult(result);
      this.loadMediaEmoji(result);
    }
  }

  private loadMediaEmoji(result: EmojiSearchResult) {
    const { emojis, ...other } = result;
    const mediaEmojis = emojis.filter(emoji => isMediaApiRepresentation(emoji.representation));
    // only load a batch of media emoji at a time (next notifyResult will load the next batch)
    const mediaEmojiResource = this.mediaEmojiResource;
    if (mediaEmojiResource && mediaEmojis.length) {
      const activeLoadersAtStart = this.activeLoaders;
      const mediaImageLoaders: Promise<EmojiDescription>[] =
        mediaEmojis.slice(0, mediaEmojiBatchSize).map(mediaEmoji =>
          mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji)
        );
      Promise.all(mediaImageLoaders).then(loadedEmojis => {
        if (result.query === this.lastQuery.query && activeLoadersAtStart === this.activeLoaders) {
          // these loaded emojis are still relevant...
          const newEmojis: EmojiDescription[] = [];
          emojis.forEach(emoji => {
            if (loadedEmojis.length && isMediaApiRepresentation(emoji.representation)) {
              const loadedEmoji = loadedEmojis.shift() as EmojiDescription;
              const representation = loadedEmoji.representation;
              if (!isMediaApiRepresentation(representation)) {
                // loaded, keep, if not loaded, drop as it's not going to load
                newEmojis.push(loadedEmoji);
              }
            } else {
              newEmojis.push(emoji);
            }
          });

          this.notifyResult({
            ...other,
            emojis: newEmojis,
          });
        }
      });
    }
  }

  filter(query?: string, options?: SearchOptions): void {
    this.lastQuery = {
      query: query || '',
      options,
    };
    if (this.emojiRepository) {
      const searchResult = this.emojiRepository.search(query, options);
      this.notifyResult(addCustomCategoryToResult(!!this.mediaEmojiResource, searchResult));
    } else {
      // not ready
      this.notifyNotReady();
    }
  }

  findByShortName(shortName: string): Promise<OptionalEmojiDescription> {
    if (this.isLoaded()) {
      // Wait for all emoji to load before looking by shortName (to ensure correct priority)
      const emoji = this.emojiRepository.findByShortName(shortName);
      if (!emoji) {
        return Promise.resolve(emoji);
      }
      return this.loadIfMediaEmoji(emoji);
    }
    return this.retryIfLoading(() => this.findByShortName(shortName), undefined);
  }

  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
    const { id, shortName } = emojiId;
    if (this.emojiRepository) {
      if (id) {
        const emoji = this.emojiRepository.findById(id);
        if (emoji) {
          return this.loadIfMediaEmoji(emoji);
        }
        if (this.isLoaded()) {
          // all loaded but not found by id, try server to see if
          // this is a newly uploaded emoji
          if (this.mediaEmojiResource) {
            return this.mediaEmojiResource.findSiteEmoji(emojiId).then(emoji => {
              if (!emoji) {
                // if not, fallback to searching by shortName to
                // at least render an alternative
                return this.findByShortName(shortName);
              }
              this.addCustomEmoji(emoji);
              return this.loadIfMediaEmoji(emoji);
            });
          }

          // if not, fallback to searching by shortName to
          // at least render an alternative
          return this.findByShortName(shortName);
        }
      } else {
        // no id fallback to shortName
        return this.findByShortName(shortName);
      }
    }
    return this.retryIfLoading(() => this.findByEmojiId(emojiId), undefined);
  }

  findById(id: string): Promise<OptionalEmojiDescription> {
    if (this.emojiRepository) {
      const emoji = this.emojiRepository.findById(id);
      if (emoji) {
        return this.loadIfMediaEmoji(emoji);
      }
    }

    return this.retryIfLoading(() => this.findById(id), undefined);
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    if (this.emojiRepository) {
      return Promise.resolve(this.emojiRepository.findInCategory(categoryId));
    }
    return this.retryIfLoading(() => this.findInCategory(categoryId), []);
  }

  getAsciiMap(): Promise<Map<string, EmojiDescription>> {
    if (this.isLoaded()) {
      return Promise.resolve(this.emojiRepository.getAsciiMap());
    }
    return this.retryIfLoading(() => this.getAsciiMap(), new Map());
  }

  recordSelection(id: EmojiId): Promise<any> {
    const { recordConfig } = this;
    if (recordConfig) {
      const queryParams = {
        emojiId: id,
      };
      const requestInit = {
        method: 'POST',
      };
      return requestService(recordConfig, { queryParams, requestInit });
    }
    return Promise.reject('Resource does not support recordSelection');
  }

  protected addCustomEmoji(emoji: EmojiDescription) {
    this.emojiRepository.addCustomEmoji(emoji);
  }

  /**
   * Loads the media image data for the image and returns
   * as an it as an Image representation.
   *
   * If it is not a media emoji, the original emoji is returned.
   *
   * If for some reason there is not media tokens available the
   * original emoji is returned.
   *
   * Optional if not using Atlassian media api for custom emoji storage.
   */
  private loadIfMediaEmoji(emoji: EmojiDescription): Promise<EmojiDescription> {
    if (!this.mediaEmojiResource) {
      return Promise.resolve(emoji);
    }
    return this.mediaEmojiResource.getMediaEmojiAsImageEmoji(emoji);
  }
}

export default class UploadingEmojiResource extends EmojiResource implements UploadingEmojiProvider {
  protected allowUpload: boolean;

  constructor(config: EmojiResourceConfig) {
    super(config);
    this.allowUpload = !!config.allowUpload;
  }

  isUploadSupported(): Promise<boolean> {
    if (!this.allowUpload) {
      return Promise.resolve(false);
    }
    if (this.mediaEmojiResource) {
      return Promise.resolve(true);
    }
    return this.retryIfLoading(() => this.isUploadSupported(), false);
  }

  uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription> {
    return this.isUploadSupported().then(supported => {
      if (!supported || !this.mediaEmojiResource) {
        return Promise.reject('No media api support is configured');
      }

      return this.mediaEmojiResource.uploadEmoji(upload).then(emoji => {
        this.addCustomEmoji(emoji);
        this.refreshLastFilter();
        return emoji;
      });
    });
  }

  prepareForUpload() {
    if (this.mediaEmojiResource) {
      this.mediaEmojiResource.prepareForUpload();
    }
    return this.retryIfLoading(() => this.prepareForUpload());
  }
}
