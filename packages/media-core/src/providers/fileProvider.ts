import {FileItem, MediaApiConfig, MediaItem} from '../';
import {FileService, MediaFileService} from '../services/fileService';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import {LRUCache} from 'lru-fast';

export const FILE_PROVIDER_RETRY_INTERVAL = 2000;

export interface FileProvider {
  observable(): Observable<FileItem>;
}

export class FileProvider {
  public static fromMediaApi(config: MediaApiConfig,
                             cache: LRUCache<string, MediaItem>,
                             fileId: string,
                             clientId: string,
                             collection?: string,
                             pollInterval?: number): FileProvider {
    return FileProvider.fromFileService(
      new MediaFileService(config, cache),
      fileId,
      clientId,
      collection,
      pollInterval);
  }

  public static fromFileService(fileService: FileService,
                                fileId: string,
                                clientId: string,
                                collectionName?: string,
                                pollInterval?: number): FileProvider {
    return {
      observable() {
        const observable = new Observable<FileItem>(subscriber => {
          let handle: number;
          const timeout = pollInterval || 1000;

          const fetch = () => {
            fileService.getFileItem(fileId, clientId, collectionName)
              .then(fileItem => {
                  if (fileItem.details.processingStatus !== 'pending') {
                    subscriber.next(fileItem);
                    subscriber.complete();
                  } else {
                    subscriber.next(fileItem);
                    handle = setTimeout(() => fetch(), timeout);
                  }
                },
                error => {
                  subscriber.error(error);
                });
          };

          fetch();

          return () => {
            if (handle !== null) {
              clearTimeout(handle);
            }
          };
        }).publishReplay(1);

        observable.connect();

        return observable;
      }
    };
  }
}
