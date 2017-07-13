import createRequest from './util/createRequest';
import {FileItem, MediaApiConfig, MediaItem} from '../';
import {LRUCache} from 'lru-fast';

export interface FileService {
  getFileItem(fileId: string, clientId: string, collection?: string): Promise<FileItem>;
}

export class MediaFileService implements FileService {

  constructor(private config: MediaApiConfig, private cache: LRUCache<string, MediaItem>) {

  }

  getFileItem(fileId: string, clientId: string, collectionName?: string): Promise<FileItem> {
    const request = createRequest({
      config: this.config,
      clientId: clientId,
      collectionName: collectionName,
      preventPreflight: true
    });

    const cacheKey = [fileId, 'file'].join('-');
    const cachedValue = this.cache.get(cacheKey);

    if (cachedValue) {
      return Promise.resolve(cachedValue);
    } else {
      return request({url: `/file/${fileId}`})
        .then(json => json.data)
        .then(fileDetails => {
          const fileItem =  <FileItem> {
            type: 'file',
            details: {
              id: fileDetails.id,
              mediaType: fileDetails.mediaType,
              mimeType: fileDetails.mimeType,
              name: fileDetails.name,
              processingStatus: fileDetails.processingStatus,
              size: fileDetails.size,
              artifacts: fileDetails.artifacts
            }
          };
          if (fileDetails.processingStatus === 'succeeded') {
            this.cache.set(cacheKey, fileItem);
          }
          return fileItem;
        });
    }
  }
}
