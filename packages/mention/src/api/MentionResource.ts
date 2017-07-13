import * as URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari

import { MentionDescription } from '../types';
import debug from '../util/logger';
import {SearchIndex} from '../util/searchIndex';

const MAX_QUERY_ITEMS = 100;
const MAX_NOTIFIED_ITEMS = 20;

export interface KeyValues {
  [index: string]: any;
}

export interface SecurityOptions {
  params?: KeyValues;
  headers?: KeyValues;
}

/**
 * Returns the current SecurityOptions for the mentions service.
 */
export interface SecurityProvider {
  (): SecurityOptions;
}

/**
 * Returns a promise to a SecurityOptions that has just been forcibly refreshed with a
 * new token. Will be used for single retry per request if a 401 is returned.
 */
export interface RefreshSecurityProvider {
  (): Promise<SecurityOptions>;
}

export interface ResultCallback<T> {
  (result: T, query?: string): void;
}

export interface ErrorCallback {
  (error: Error, query?: string): void;
}

export interface InfoCallback {
  (info: string): void;
}

export interface MentionsResult {
  mentions: MentionDescription[];
  query: string;
}

export interface MentionResourceConfig {
  /** the base url of the mentions service */
  url: string;
  securityProvider?: SecurityProvider;
  containerId?: string;
  productId?: string;
  refreshedSecurityProvider?: RefreshSecurityProvider;
  shouldHighlightMention?: (mention: MentionDescription) => boolean;
}

export interface ResourceProvider<Result> {
  /**
   * Subscribe to ResourceProvider results
   *
   * @param {string} key subscriber key used to unsubscribe
   * @param {ResultCallback<Result>} callback This callback only receives latest results
   * @param {ErrorCallback} errCallback This callback will errors
   * @param {InfoCallback} infoCallback This callback will info
   * @param {ResultCallback<Result>} allResultsCallback This callback will receive all results
   */
  subscribe(key: string,
            callback?: ResultCallback<Result>,
            errCallback?: ErrorCallback,
            infoCallback?: InfoCallback,
            allResultsCallback?: ResultCallback<Result>): void;

  /**
   * Unsubscribe to this resource provider results
   * @param {string} key key used when subscribing
   */
  unsubscribe(key: string): void;
}

export interface MentionProvider extends ResourceProvider<MentionDescription[]> {
  filter(query?: string): void;
  recordMentionSelection(mention: MentionDescription): void;
  shouldHighlightMention(mention: MentionDescription): boolean;
  isFiltering(query: string): boolean;
}

const emptySecurityProvider = () => {
  return {
    params: {},
    headers: {},
  };
};

const buildUrl = (baseUrl: string, path: string | undefined, data: KeyValues, secOptions: SecurityOptions) => {
  const searchParam = new URLSearchParams();
  for (const key in data) { // eslint-disable-line no-restricted-syntax
    if ({}.hasOwnProperty.call(data, key)) {
      searchParam.append(key, data[key]);
    }
  }
  if (secOptions && secOptions.params) {
    for (const key in secOptions.params) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(secOptions.params, key)) {
        const values = secOptions.params[key];
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            searchParam.append(key, values[i]);
          }
        } else {
          searchParam.append(key, values);
        }
      }
    }
  }
  let seperator = '';
  if (baseUrl.substr(-1) !== '/') {
    seperator = '/';
  }
  return `${baseUrl}${seperator}${path}?${searchParam.toString()}`;
};

const buildHeaders = (secOptions: SecurityOptions) => {
  const headers = new Headers();
  if (secOptions && secOptions.headers) {
    for (const key in secOptions.headers) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(secOptions.headers, key)) {
        const values = secOptions.headers[key];
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            headers.append(key, values[i]);
          }
        } else {
          headers.append(key, values);
        }
      }
    }
  }

  return headers;
};

/**
 * @returns Promise containing the json response
 */
const requestService = (baseUrl: string, path: string | undefined, data: KeyValues, opts: KeyValues,
                        secOptions: SecurityOptions, refreshedSecurityProvider?: RefreshSecurityProvider) => {
  const url = buildUrl(baseUrl, path, data, secOptions);
  const headers = buildHeaders(secOptions);
  const options = {
    ...opts,
    ...{ headers },
    credentials: 'include' as 'include',
  };
  return fetch(new Request(url, options))
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401 && refreshedSecurityProvider) {
        // auth issue - try once
        debug('401 attempting a forced refresh from securityProvider');
        return refreshedSecurityProvider().then(newSecOptions => (
          requestService(baseUrl, path, data, opts, newSecOptions)
        ));
      }

      return Promise.reject(new HttpError(response.status, response.statusText));
    });
};

class AbstractResource<Result> implements ResourceProvider<Result> {

  protected changeListeners: Map<string, ResultCallback<Result>>;
  protected errListeners: Map<string, ErrorCallback>;
  protected infoListeners: Map<string, InfoCallback>;
  protected allResultsListeners: Map<string, ResultCallback<Result>>;

  constructor() {
    this.changeListeners = new Map<string, ResultCallback<Result>>();
    this.allResultsListeners = new Map<string, ResultCallback<Result>>();
    this.errListeners = new Map<string, ErrorCallback>();
    this.infoListeners = new Map<string, InfoCallback>();
  }

  subscribe(key: string,
            callback?: ResultCallback<Result>,
            errCallback?: ErrorCallback,
            infoCallback?: InfoCallback,
            allResultsCallback?: ResultCallback<Result>): void {
    if (callback) {
      this.changeListeners.set(key, callback);
    }
    if (errCallback) {
      this.errListeners.set(key, errCallback);
    }
    if (infoCallback) {
      this.infoListeners.set(key, infoCallback);
    }
    if (allResultsCallback) {
      this.allResultsListeners.set(key, allResultsCallback);
    }
  }

  unsubscribe(key: string): void {
    this.changeListeners.delete(key);
    this.errListeners.delete(key);
    this.infoListeners.delete(key);
    this.allResultsListeners.delete(key);
  }
}

class AbstractMentionResource extends AbstractResource<MentionDescription[]> implements MentionProvider {

  shouldHighlightMention(mention: MentionDescription): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  filter(query?: string): void {
    throw new Error(`not yet implemented.\nParams: query=${query}`);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  recordMentionSelection(mention: MentionDescription): void {
    // Do nothing
  }

  isFiltering(query: string): boolean {
    return false;
  }

  protected _notifyListeners(mentionsResult: MentionsResult): void {
    debug('ak-mention-resource._notifyListeners',
      mentionsResult && mentionsResult.mentions && mentionsResult.mentions.length,
      this.changeListeners);

    this.changeListeners.forEach((listener, key) => {
      try {
        listener(mentionsResult.mentions.slice(0, MAX_NOTIFIED_ITEMS), mentionsResult.query);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }

  protected _notifyAllResultsListeners(mentionsResult: MentionsResult): void {
    debug('ak-mention-resource._notifyAllResultsListeners',
      mentionsResult && mentionsResult.mentions && mentionsResult.mentions.length,
      this.changeListeners);

    this.allResultsListeners.forEach((listener, key) => {
      try {
        listener(mentionsResult.mentions.slice(0, MAX_NOTIFIED_ITEMS), mentionsResult.query);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }

  protected _notifyErrorListeners(error: Error, query?: string): void {
    this.errListeners.forEach((listener, key) => {
      try {
        listener(error, query);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }

  protected _notifyInfoListeners(info: string): void {
    this.infoListeners.forEach((listener, key) => {
      try {
        listener(info);
      } catch (e) {
        // ignore error fromr listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }
}

/**
 * Provides a Javascript API
 */
class MentionResource extends AbstractMentionResource {

  private config: MentionResourceConfig;
  private lastReturnedSearch: number;
  private searchIndex: SearchIndex;
  private activeSearches: Set<string>;

  constructor(config: MentionResourceConfig) {
    super();

    if (!config.url) {
      throw new Error('config.url is a required parameter');
    }

    this.config = config;
    this.lastReturnedSearch = 0;
    this.searchIndex = new SearchIndex();
    this.activeSearches = new Set();
  }

  shouldHighlightMention(mention: MentionDescription) {
    if (this.config.shouldHighlightMention) {
      return this.config.shouldHighlightMention(mention);
    }

    return false;
  }

  notify(searchTime: number, mentionResult: MentionsResult, query?: string) {
    if (searchTime > this.lastReturnedSearch) {
      this.lastReturnedSearch = searchTime;
      this._notifyListeners(mentionResult);
    } else {
      const date = new Date(searchTime).toISOString().substr(17, 6);
      debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
    }

    this._notifyAllResultsListeners(mentionResult);
  }

  notifyError(error: Error, query?: string) {
    this._notifyErrorListeners(error, query);
    if (query) {
      this.activeSearches.delete(query);
    }
  }

  filter(query?: string): void {
    const searchTime = Date.now();

    if (!query) {
      this.initialState().then((results) => this.notify(searchTime, results, query), error => this.notifyError(error, query));
    } else {
      this.activeSearches.add(query);
      this.search(query).then((results) => this.notify(searchTime, results, query), error => this.notifyError(error, query));
    }
  }

  recordMentionSelection(mention: MentionDescription): Promise<void> {
    return this.recordSelection(mention).then(() => {
    }, error => debug(`error recording mention selection: ${error}`, error));
  }

  isFiltering(query: string): boolean {
    return this.activeSearches.has(query);
  }

  /**
   * Returns the initial mention display list before a search is performed for the specified
   * container.
   *
   * @param containerId
   * @returns Promise
   */
  private initialState(): Promise<MentionsResult> {
    const secOptions = this.config.securityProvider ? this.config.securityProvider() : emptySecurityProvider();
    const refreshedSecurityProvider = this.config.refreshedSecurityProvider;
    const data: KeyValues = {};
    const options: KeyValues = {};

    if (this.config.containerId) {
      data['containerId'] = this.config.containerId;
    }

    if (this.config.productId) {
      data['productIdentifier'] = this.config.productId;
    }

    return requestService(this.config.url, 'bootstrap', data, options, secOptions, refreshedSecurityProvider)
      .then((result) => {
        this.searchIndex.reset();
        this.searchIndex.indexResults(result.mentions);
        return result;
      });
  }

  private search(query: string): Promise<MentionsResult> {
    if (this.searchIndex.hasDocuments()) {
      return this.searchIndex.search(query).then(result => {
        const searchTime = Date.now() + 1; // Ensure that search time is different than the local search time
        this.remoteSearch(query).then(result => {
          this.activeSearches.delete(query);
          this.notify(searchTime, result, query);
          this.searchIndex.indexResults(result.mentions);
        },
        err => {
          this._notifyErrorListeners(err);
        });

        return result;
      });
    }

    return this.remoteSearch(query).then(result => {
      this.searchIndex.indexResults(result.mentions);
      return result;
    });
  }

  private remoteSearch(query: string): Promise<MentionsResult> {
    const secOptions = this.config.securityProvider ? this.config.securityProvider() : emptySecurityProvider();
    const refreshedSecurityProvider = this.config.refreshedSecurityProvider;
    const data = {
      query,
      limit: MAX_QUERY_ITEMS
    };
    const options = {};
    if (this.config.containerId) {
      data['containerId'] = this.config.containerId;
    }

    if (this.config.productId) {
      data['productIdentifier'] = this.config.productId;
    }

    return requestService(this.config.url, 'search', data, options, secOptions, refreshedSecurityProvider);
  }

  private recordSelection(mention: MentionDescription): Promise<void> {
    const secOptions = this.config.securityProvider ? this.config.securityProvider() : emptySecurityProvider();
    const refreshedSecurityProvider = this.config.refreshedSecurityProvider;
    const data = {
      selectedUserId: mention.id,
    };
    const options = {
      method: 'POST',
    };

    if (this.config.productId) {
      data['productIdentifier'] = this.config.productId;
    }

    return requestService(this.config.url, 'record', data, options, secOptions, refreshedSecurityProvider);
  }
}

export class HttpError implements Error {
  name: string;
  message: string;
  statusCode: number;
  stack?: string;

  constructor(statusCode: number, statusMessage: string) {
    this.statusCode = statusCode;
    this.message = statusMessage;
    this.name = 'HttpError';
    this.stack = (new Error()).stack;
  }
}

export { AbstractResource, AbstractMentionResource };
export default MentionResource;
