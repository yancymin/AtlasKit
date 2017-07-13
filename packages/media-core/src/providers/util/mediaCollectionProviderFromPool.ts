import {Observable} from 'rxjs/Observable';
import {MediaCollection} from '../../collection';
import {MediaCollectionProvider } from '../mediaCollectionProvider';
import {Pool} from './pool';

export function mediaCollectionProviderFromPool<T extends MediaCollectionProvider>(
  pool: Pool<T>,
  poolId: string,
  createProvider: () => T
): T {
  return pool.acquire(poolId, () => {
    const provider = createProvider();
    const oldObservableFn = provider.observable;

    // wrap the observable to release the provider from the pool when we unsubscribe
    provider.observable = () => new Observable<MediaCollection>(observer => {
      const observable = oldObservableFn.bind(provider)();
      const subscription = observable.subscribe(observer);
      return () => {
        subscription.unsubscribe();
        pool.release(poolId);
      };
    });

    return provider;
  });
}
