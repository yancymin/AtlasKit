import * as chai from 'chai';
import * as sinon from 'sinon';
import {Pool} from '../../../src/providers/util/pool';
import {observableFromObservablePool} from '../../../src/providers/util/observableFromObservablePool';
import {Observable} from 'rxjs/Observable';

const assert = chai.assert;

describe('observableFromObservablePool()', () => {

  it('acquires the actual resource on subscription', () => {
    const pool = new Pool<Observable<number>>();
    const createFn = sinon.spy(() => Observable.create(0));
    const observable = observableFromObservablePool(pool, 'item', createFn);
    assert(createFn.notCalled);

    observable.subscribe();
    assert(createFn.calledOnce);
  });

  it('releases the actual resource when unsubscribed', () => {
    const pool = new Pool<Observable<number>>();
    const createFn = sinon.spy(() => new Observable(subscriber => { subscriber.next(0); }));
    const observable = observableFromObservablePool(pool, 'item', createFn);
    pool.release = sinon.spy(pool.release);

    assert((pool.release as any).notCalled);

    const subscription = observable.subscribe();
    subscription.unsubscribe();

    assert((pool.release as any).calledOnce);
  });

  it('wires up the observables correctly', () => {
    const pool = new Pool<Observable<number>>();
    const createFn = sinon.spy(() => new Observable(subscriber => { subscriber.next(0); }));
    const observable = observableFromObservablePool(pool, 'item', createFn);

    return new Promise((resolve, reject) => {
      observable.subscribe({
        next(x) {
          resolve();
        }
      });
    });
  });

});
