import {Observable} from 'rxjs/Observable';
import {Pool} from './pool';

export function observableFromObservablePool<Result>(
  pool: Pool<Observable<Result>>,
  poolId: string,
  createObservable: () => Observable<Result>
): Observable<Result> {
  return new Observable(subscriber => {
    const observable = pool.acquire(poolId, createObservable);
    const subscription = observable.subscribe(subscriber);
    return () => {
      subscription.unsubscribe();
      pool.release(poolId);
    };
  });
}
