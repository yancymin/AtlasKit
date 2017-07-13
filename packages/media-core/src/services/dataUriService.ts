import createRequest, {CreateRequestFunc} from './util/createRequest';
import { MediaItem, JwtTokenProvider } from '../';

export type DataUri = string;
export type ImageResizeMode = 'crop' | 'fit' | 'full-fit';

export interface DataUriService {
  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri>;
  fetchImageDataUri(mediaItem: MediaItem, width: number, height: number, mode?: ImageResizeMode): Promise<DataUri>;
}

export class MediaDataUriService implements DataUriService {

  private request: CreateRequestFunc;

  constructor(
    private readonly clientId: string,
    private readonly serviceHost: string,
    private readonly tokenProvider: JwtTokenProvider,
    private readonly collectionName?: string) {
      this.request = createRequest({
        config: {
          serviceHost: this.serviceHost,
          tokenProvider: this.tokenProvider
        },
        clientId: this.clientId,
        collectionName: this.collectionName
      });
  }

  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri> {
    return this.fetchSomeDataUri(
      `/file/${mediaItem.details.id}/binary`, {
        'max-age': 3600,
        collection: this.collectionName
      });
  }

  fetchImageDataUri(mediaItem: MediaItem, width: number, height: number, mode: ImageResizeMode = 'crop'): Promise<DataUri> {
    return this.fetchSomeDataUri(
      `/file/${mediaItem.details.id}/image`, {
        width,
        height,
        mode,
        'max-age': 3600,
        collection: this.collectionName
      });
  }

  fetchSomeDataUri(url: string, params: Object): Promise<DataUri> {
    return this.request({
      url,
      params,
      responseType: 'image'
    })
      .then(this.readBlob);
  }

  private readBlob(blob: Blob): Promise<DataUri> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', () => reject(reader.error));

      reader.readAsDataURL(blob);
    });
  }
}
