import * as chai from 'chai';
import * as sinon from 'sinon';
import {Observable} from 'rxjs/Observable';
import {Pool} from '../../../src/providers/util/pool';
import {MediaCollectionProvider} from '../../../src/providers/mediaCollectionProvider';
import {mediaCollectionProviderFromPool} from '../../../src/providers/util/mediaCollectionProviderFromPool';

const assert = chai.assert;

const noop = () => {/* do nothing */};

describe('mediaCollectionProviderFromPool()', () => {

  it('should create a provider when called once', () => {
    const pool = new Pool<MediaCollectionProvider>();
    const createFn = sinon.spy(() => ({
      observable: () => Observable.create(noop),
      refresh: sinon.spy(),
      loadNextPage: sinon.spy()
    }));

    mediaCollectionProviderFromPool(pool, 'id', createFn);
    assert(createFn.calledOnce);
  });

  it('should create one provider when called twice with the same ID', () => {
    const pool = new Pool<MediaCollectionProvider>();
    const createFn = sinon.spy(() => ({
      observable: () => Observable.create(noop),
      refresh: sinon.spy(),
      loadNextPage: sinon.spy()
    }));

    const provider1 = mediaCollectionProviderFromPool(pool, 'id', createFn);
    const provider2 = mediaCollectionProviderFromPool(pool, 'id', createFn);
    assert(createFn.calledOnce);
    assert.equal(provider1, provider2);
  });

  it('should create one provider when called twice with the same ID and subscribed', () => {
    const pool = new Pool<MediaCollectionProvider>();
    const createFn = sinon.spy(() => ({
      observable: () => Observable.create(noop),
      refresh: sinon.spy(),
      loadNextPage: sinon.spy()
    }));

    const provider1 = mediaCollectionProviderFromPool(pool, 'id', createFn);
    provider1.observable().subscribe(noop);
    const provider2 = mediaCollectionProviderFromPool(pool, 'id', createFn);
    assert(createFn.calledOnce);
    assert.equal(provider1, provider2);
  });

  it('should create two different providers when called twice with different IDs', () => {
    const pool = new Pool<MediaCollectionProvider>();
    const createFn = sinon.spy(() => ({
      observable: () => Observable.create(noop),
      refresh: sinon.spy(),
      loadNextPage: sinon.spy()
    }));

    const provider1 = mediaCollectionProviderFromPool(pool, 'id1', createFn);
    const provider2 = mediaCollectionProviderFromPool(pool, 'id2', createFn);
    assert(createFn.calledTwice);
    assert.notEqual(provider1, provider2);
  });

  it('should create two providers when called twice with the same ID but the first provider has been released', () => {
    const pool = new Pool<MediaCollectionProvider>();
    const createFn = sinon.spy(() => ({
      observable: () => Observable.create(noop),
      refresh: sinon.spy(),
      loadNextPage: sinon.spy()
    }));

    const provider1 = mediaCollectionProviderFromPool(pool, 'id', createFn);
    provider1.observable().subscribe(noop).unsubscribe();

    const provider2 = mediaCollectionProviderFromPool(pool, 'id', createFn);
    assert(createFn.calledTwice);
    assert.notEqual(provider1, provider2);
  });

});
