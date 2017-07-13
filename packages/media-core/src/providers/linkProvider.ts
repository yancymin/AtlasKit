import {LinkItem, MediaApiConfig} from '../';
import {LinkService, MediaLinkService} from '../services/linkService';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';

export interface LinkProvider {
  observable(): Observable<LinkItem>;
}

export class LinkProvider {
  public static fromMediaApi(config: MediaApiConfig,
                             linkId: string,
                             clientId: string,
                             collectionName?: string): LinkProvider {
    return LinkProvider.fromLinkService(
      new MediaLinkService(config),
      linkId,
      clientId,
      collectionName
    );
  }

  public static fromLinkService(linkService: LinkService,
                                linkId: string,
                                clientId: string,
                                collectionName?: string): LinkProvider {
    return {
      observable() {
        const observable = new Observable<LinkItem>((observer) => {
          linkService.getLinkItem(linkId, clientId, collectionName)
            .then(linkItem => {
              observer.next(linkItem);
              observer.complete();
            }, error => {
              observer.error(error);
            });

          return () => {
          };
        }).publishReplay(1);

        observable.connect();

        return observable;
      }
    };
  }
}
