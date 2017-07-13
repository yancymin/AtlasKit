import axios from 'axios';
import {MediaApiConfig} from '../../config';
import {checkWebpSupport} from '../../utils';

export type ResponseType = 'json' | 'image';
export interface CreateRequestFunc {
  (requestOptions: RequestOptions): Promise<any>;
}

export interface RequesterOptions {
  clientId: string;
  collectionName?: string;
  preventPreflight?: boolean;
  config: MediaApiConfig;
}

export interface RequestOptions {
  method?: string;
  url: string;
  params?: Object;
  headers?: Object;
  data?: Object;
  responseType?: ResponseType;
}

const buildHeaders = (requesterOptions: RequesterOptions, requestOptions: RequestOptions, token: string) => {
  const headers = {
    ...requestOptions.headers,
    'Content-Type': 'application/json'
  } as any;
  // We can add custom headers if we don't want to avoid preflight - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method
  if (!requesterOptions.preventPreflight) {
    headers['X-Client-Id'] = requesterOptions.clientId;
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (requestOptions.responseType === 'image') {
    return checkWebpSupport().then(isWebpSupported => {
      // q=0.8 stands for 'quality factor' => http://stackoverflow.com/a/10496722
      const noWebpAcceptHeader = 'image/*,*/*;q=0.8';
      const webpAcceptHeader = 'image/webp,image/*,*/*;q=0.8';

      headers.accept = isWebpSupported ? webpAcceptHeader : noWebpAcceptHeader;
      return headers;
    });
  }

  return Promise.resolve(headers);
};

const buildParams = (requesterOptions: RequesterOptions, requestOptions: RequestOptions, token: string) => {
  const {params} = requestOptions;
  const {collectionName: collection, preventPreflight, clientId} = requesterOptions;
  const defaultParams = {
    collection,
    ...params
  };
  const authParams = preventPreflight ? {
    token,
    client: clientId
  } : {};

  return {
    ...defaultParams,
    ...authParams
  };
};

const responseTypeToAxios = (responseType?: ResponseType): string => {
  responseType = responseType || 'json';

  const responseTypeMap = {
    image: 'blob',
    json: 'json'
  };

  return responseTypeMap[responseType];
};

export default (requesterOptions: RequesterOptions) => (requestOptions: RequestOptions) : any => {
  return requesterOptions.config.tokenProvider(requesterOptions.collectionName).then(token => {
    return buildHeaders(requesterOptions, requestOptions, token).then(headers => {
      const responseType = responseTypeToAxios(requestOptions.responseType);
      const params = buildParams(requesterOptions, requestOptions, token);
      const {method, url, data} = requestOptions;
      const {config} = requesterOptions;

      return axios({
        method: method || 'get',
        url: url,
        baseURL: config.serviceHost,
        headers,
        params,
        data: data,
        responseType
      }).then(response => response.data);
    });
  });
};
