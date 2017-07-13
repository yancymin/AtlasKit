import {FileDetails, LinkDetails, UrlPreview} from '@atlaskit/media-core';

// can NOT use MediaItemDetails because get the following error: https://github.com/Microsoft/TypeScript/issues/9944
export const isLinkDetails = (metadata?: FileDetails | LinkDetails | UrlPreview): metadata is UrlPreview => {
  return Boolean(metadata) && (metadata as UrlPreview).url !== undefined;
};
