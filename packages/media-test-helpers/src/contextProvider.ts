import { StoryBookTokenProvider } from './tokenProvider';
import { collectionNames } from './collectionNames';
import { ContextFactory, Context } from '@atlaskit/media-core';

export const defaultClientId = '5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
export const defaultServiceHost = 'https://dt-api-filestore.internal.app.dev.atlassian.io';

export const createStorybookContext = (clientId = defaultClientId, serviceHost = defaultServiceHost): Context => {
  const scopes = {
    'urn:filestore:file:*': ['read'],
    'urn:filestore:chunk:*': ['read']
  };
  collectionNames.forEach(c => {
    scopes[`urn:filestore:collection:${c}`] = ['read', 'update'];
  });
  const tokenProvider = StoryBookTokenProvider.withAccess(scopes);
  return ContextFactory.create({ clientId, serviceHost, tokenProvider });
};
