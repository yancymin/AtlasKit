import { Observable } from 'rxjs/Observable';
import { MediaCollection } from '../collection';

export interface MediaCollectionProvider {
  observable(): Observable<MediaCollection>;
  loadNextPage(): void;
  refresh(): void;
}
