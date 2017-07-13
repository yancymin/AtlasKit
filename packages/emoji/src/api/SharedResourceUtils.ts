import * as URL from 'url';
import debug from '../util/logger';
import * as URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari

export interface KeyValues {
  [index: string]: any;
}

export interface SecurityOptions {
  params?: KeyValues;
  headers?: KeyValues;
}

/**
 * Returns a promise to a SecurityOptions that has just been forcibly refreshed with a
 * new token. Will be used for single retry per request if a 401 is returned.
 */
export interface RefreshSecurityProvider {
  (): Promise<SecurityOptions>;
}

/**
 * Returns the current SecurityOptions for the mentions service.
 */
export interface SecurityProvider {
  (): SecurityOptions;
}

export interface ServiceConfig {
  url: string;
  securityProvider?: SecurityProvider;
  refreshedSecurityProvider?: RefreshSecurityProvider;
}

export interface RequestServiceOptions {
  path?: string;
  queryParams?: KeyValues;
  requestInit?: RequestInit;
}

const buildUrl = (baseUrl: string, path: string = '', queryParams?: KeyValues, secOptions?: SecurityOptions): string => {
  const searchParam = new URLSearchParams(URL.parse(baseUrl).search || undefined);
  baseUrl = baseUrl.split('?')[0];
  if (queryParams) {
    for (const key in queryParams) {
      if ({}.hasOwnProperty.call(queryParams, key)) {
        searchParam.append(key, queryParams[key]);
      }
    }
  }
  if (secOptions && secOptions.params) {
    for (const key in secOptions.params) {
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
  if (path && baseUrl.substr(-1) !== '/') {
    seperator = '/';
  }
  let params = searchParam.toString();
  if (params) {
    params = '?' + params;
  }

  return `${baseUrl}${seperator}${path}${params}`;
};

const addToHeaders = (headers: Headers, keyValues?: KeyValues) => {
  if (keyValues) {
    for (const key in keyValues) {
      if ({}.hasOwnProperty.call(keyValues, key)) {
        const values = keyValues[key];
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
};

const buildHeaders = (secOptions?: SecurityOptions, extraHeaders?: KeyValues): Headers => {
  const headers = new Headers();
  addToHeaders(headers, extraHeaders);
  if (secOptions) {
    addToHeaders(headers, secOptions.headers);
  }
  return headers;
};

/**
 * @returns Promise containing the json response
 */
export const requestService = <T>(serviceConfig: ServiceConfig, options: RequestServiceOptions): Promise<T> => {
  const { url, securityProvider, refreshedSecurityProvider } = serviceConfig;
  const { path, queryParams, requestInit } = options;
  const secOptions = securityProvider && securityProvider();
  const requestUrl = buildUrl(url, path, queryParams, secOptions);
  const headers = buildHeaders(secOptions, requestInit && requestInit.headers);
  const requestOptions = {
    ...requestInit,
    headers,
    credentials: 'include' as RequestCredentials,
  };

  return fetch(new Request(requestUrl, requestOptions))
    .then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401 && refreshedSecurityProvider) {
        // auth issue - try once
        debug('401 attempting a forced refresh from securityProvider');
        return refreshedSecurityProvider().then(newSecOptions => {
          const retryServiceConfig = {
            url,
            securityProvider: () => newSecOptions,
          };
          return requestService(retryServiceConfig, options);
        });
      }
      return Promise.reject({
        code: response.status,
        reason: response.statusText,
      });
    });
};
