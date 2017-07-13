import { MediaState } from '@atlaskit/media-core';
import { default as ProviderFactory } from '../../providerFactory';
import { ErrorReporter } from '../../utils';

export type MediaPluginOptions = {
  providerFactory: ProviderFactory;
  errorReporter?: ErrorReporter;
  uploadErrorHandler?: (state: MediaState) => void;
};
