import * as chai from 'chai';
import * as sinon from 'sinon';
import {Pool} from '../../../src/providers/util/pool';

const expect = chai.expect;
const assert = chai.assert;

describe('Pool', () => {

  it('invokes the create function when creating the first item', () => {
    const pool = new Pool<number>();
    const createFn = sinon.spy(() => 0);

    const v = pool.acquire('item', createFn);

    expect(v).to.equal(0);
    assert(createFn.calledOnce);
  });

  it('does not invokes the create function when creating the second item', () => {
    const pool = new Pool<number>();
    const createFn = sinon.spy(() => 0);

    const v1 = pool.acquire('item', createFn);
    const v2 = pool.acquire('item', createFn);

    expect(v1).to.equal(v2);
    assert(createFn.calledOnce);
  });

  it('invokes the create function again when releasing all created items', () => {
    const pool = new Pool<number>();
    const createFn = sinon.spy(() => 0);

    const v1 = pool.acquire('item', createFn);
    pool.release('item');
    const v2 = pool.acquire('item', createFn);

    expect(v1).to.equal(v2);
    assert(createFn.calledTwice);
  });

  it('invokes the create function for separate ids multiple times', () => {
    const pool = new Pool<number>();
    const createFn = sinon.spy(() => 0);

    pool.acquire('item1', createFn);
    pool.acquire('item2', createFn);

    assert(createFn.calledTwice);
  });

});
