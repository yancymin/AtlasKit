import axios from 'axios';
import { defaultCollectionName } from './collectionNames';
import { JwtToken, JwtTokenProvider } from '@atlaskit/media-core';

const cachedTokens = {};
const baseURL = 'https://media-playground.internal.app.dev.atlassian.io';

export class StoryBookTokenProvider {
  static tokenProvider(collectionName: string): Promise<JwtToken> {
    const params = { collection: collectionName || defaultCollectionName };
    if (cachedTokens[collectionName]) {
      return cachedTokens[collectionName];
    }

    const tokenRequest: Promise<JwtToken> = Promise.resolve(axios.get('/token', {
      baseURL,
      headers: {},
      params
    }).then(response => response.data.token));

    cachedTokens[params.collection] = tokenRequest;

    return tokenRequest;
  }

  static withAccess(access: { [resourceUrn: string]: string[] }): JwtTokenProvider {
    return (collection?: string) => {
      const config = { baseURL };
      const cacheKey = JSON.stringify(access);

      if (collection) {
        config['params'] = { collection };
      }

      if (cachedTokens[cacheKey]) {
        return cachedTokens[cacheKey];
      }

      const tokenRequest = axios.post('/token', { access }, config)
        .then(response => response.data.token) as Promise<JwtToken>;

      cachedTokens[cacheKey] = tokenRequest;

      return tokenRequest;
    };
  }
}
