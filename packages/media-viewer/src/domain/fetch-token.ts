import { JwtTokenProvider } from '@atlaskit/media-core';
import * as $ from 'jquery';
import { parse, stringify } from 'query-string';

import { MediaFile, MediaFileAttributes } from '../mediaviewer';

export const fetchToken =
  (clientId: string, tokenProvider: JwtTokenProvider, collectionName?: string) =>
    ({ attributes }: MediaFile) => {
      const deferred = $.Deferred<MediaFileAttributes>();
      tokenProvider(collectionName)
        .then(token => {
          deferred.resolve({
            src: refreshAuthentication(attributes.src, clientId, collectionName, token) || '',
            srcDownload: refreshAuthentication(attributes.srcDownload, clientId, collectionName, token) || '',
            src_hd: refreshAuthentication(attributes.src_hd, clientId, collectionName, token),
            poster: refreshAuthentication(attributes.poster, clientId, collectionName, token),
          });
        })
        .catch(deferred.reject);


      return deferred.promise();
    };

function refreshAuthentication(
  url: string | undefined,
  clientId: string,
  collectionName: string | undefined,
  token: string): string | undefined {
  if (url) {
    const { urlWithoutQueryString, queryString } = split(url);
    return `${urlWithoutQueryString}?${refreshQueryString(queryString, clientId, collectionName, token)}`;
  }
}

function refreshQueryString(
  queryString: string | undefined,
  clientId: string,
  collectionName: string | undefined,
  token: string): string {
  if (queryString) {
    const query = parse(queryString);
    query.client = clientId;
    query.collection = collectionName;
    query.token = token;

    return stringify(query);
  } else {
    return stringify({
      client: clientId,
      collection: collectionName,
      token
    });
  }
}

function split(url: string): { urlWithoutQueryString: string, queryString?: string } {
  const index = url.indexOf('?');

  if (index > 0) {
    return {
      urlWithoutQueryString: url.substring(0, index),
      queryString: url.substring(index + 1, url.length)
    };
  } else {
    return {
      urlWithoutQueryString: url
    };
  }
}
