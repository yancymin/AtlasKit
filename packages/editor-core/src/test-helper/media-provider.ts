import {
  ContextConfig as MediaContextConfig,
  MediaProvider,
  MediaStateManager,
} from '@atlaskit/media-core';

/**
 * Add "import * as mediaTestHelpers from '@atlaskit/media-test-helpers'"
 * at the beginning of your file and pass "mediaTestHelpers" into this function
 */
export function storyMediaProviderFactory (
  mediaTestHelpers,
  collection?: string,
  stateManager?: MediaStateManager,
  includeUploadContext = true,
) {
  const {
    defaultClientId,
    defaultServiceHost,
    defaultCollectionName,
    StoryBookTokenProvider,
  } = mediaTestHelpers;

  const collectionName = collection || defaultCollectionName;

  return Promise.resolve<MediaProvider>({
    stateManager,
    uploadParams: {
      collection: collectionName,
    },
    viewContext: Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: defaultServiceHost,
      tokenProvider: StoryBookTokenProvider.tokenProvider
    }),
    uploadContext: !includeUploadContext ? undefined : Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: 'https://dt-api.internal.app.dev.atlassian.io',
      tokenProvider: StoryBookTokenProvider.withAccess({
        [`urn:filestore:collection:${collectionName}`]: [
          'read', 'insert'
        ],
        'urn:filestore:chunk:*': ['create', 'read'],
        'urn:filestore:upload': ['create'],
        'urn:filestore:upload:*': ['read', 'update']
      })
    }),
    linkCreateContext: Promise.resolve<MediaContextConfig>({
      clientId: defaultClientId,
      serviceHost: 'https://dt-api-filestore.internal.app.dev.atlassian.io',
      tokenProvider: StoryBookTokenProvider.withAccess({
        [`urn:filestore:collection:${collectionName}`]: [
          'read', 'update'
        ],
        'urn:filestore:file:*': ['read'],
        'urn:filestore:chunk:*': ['read']
      })
    }),
  });
}


export type promisedString = Promise<string>;
export type resolveFn = (...any) => any;
export type thumbnailStore = { [id: string]: promisedString | resolveFn };

export function fileToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new (window as any).FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onabort = function () {
      reject('abort');
    };
    reader.onerror = function (err) {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
}

export function isImage(type: string) {
  return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}
