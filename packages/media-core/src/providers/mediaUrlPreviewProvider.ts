import { MediaApiConfig, UrlPreview } from '../';
import { Observable } from 'rxjs/Observable';
import { UrlPreviewProvider } from './urlPreviewProvider';
import { Pool } from './util/pool';
import { observableFromObservablePool } from './util/observableFromObservablePool';

export type MediaUrlPreviewObservablePool = Pool<Observable<UrlPreview>>;

export class MediaUrlPreviewProvider extends UrlPreviewProvider {
  public static fromMediaApi(config: MediaApiConfig, url: string, clientId: string) {
    return UrlPreviewProvider.fromMediaApi(config, url, clientId);
  }

  public static fromPool(pool: MediaUrlPreviewObservablePool, config: MediaApiConfig, url: string, clientId: string) {
    return {
      observable() {
        return observableFromObservablePool(pool, url, () => {
          return MediaUrlPreviewProvider.fromMediaApi(config, url, clientId).observable();
        });
      }
    };
  }

  public static createPool(): MediaUrlPreviewObservablePool {
    return new Pool<Observable<UrlPreview>>();
  }
}
