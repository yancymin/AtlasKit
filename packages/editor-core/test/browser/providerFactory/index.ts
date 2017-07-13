import { expect } from 'chai';
import * as sinon from 'sinon';
import ProviderFactory from '../../../src/providerFactory';

describe('ProviderFactory', () => {

  const provider = Promise.resolve('Hello');
  const providerName1 = 'greetingProvider';
  const providerName2 = 'anotherProvider';
  const handler1 = sinon.spy();
  const handler2 = sinon.spy();
  const handler3 = sinon.spy();

  describe('setProvider', () => {
    let providerFactory;

    beforeEach(() => {
      providerFactory = new ProviderFactory();
    });

    afterEach(() => {
      providerFactory.destroy();
    });

    it('should update map with new provider', () => {
      const spy = sinon.spy((providerFactory as any).providers, 'set');
      providerFactory.setProvider(providerName1, provider);

      expect(spy.called).to.equal(true);
      expect(spy.calledWith(providerName1, provider)).to.equal(true);
      spy.restore();
    });

    it('should remove provider from map if undefined', () => {
      const spySet = sinon.spy((providerFactory as any).providers, 'set');
      const spyDelete = sinon.spy((providerFactory as any).providers, 'delete');
      providerFactory.setProvider(providerName1, undefined);

      expect(spySet.called).to.equal(false);
      expect(spyDelete.called).to.equal(true);
      expect(spyDelete.calledWith(providerName1)).to.equal(true);
      spySet.restore();
      spyDelete.restore();
    });

    it('should trigger notifyUpdated', () => {
      const spy = sinon.spy(providerFactory, 'notifyUpdated');
      providerFactory.setProvider(providerName1, provider);
      providerFactory.setProvider(providerName1, undefined);

      expect(spy.called).to.equal(true);
      expect(spy.callCount).to.equal(2);
      expect(spy.firstCall.calledWith(providerName1, provider)).to.equal(true);
      expect(spy.lastCall.calledWith(providerName1, undefined)).to.equal(true);
      spy.restore();
    });

  });

  describe('removeProvider', () => {
    let providerFactory;

    beforeEach(() => {
      providerFactory = new ProviderFactory();
    });

    it('should remove provider from map', () => {
      const spyDelete = sinon.spy((providerFactory as any).providers, 'delete');
      providerFactory.removeProvider(providerName1);

      expect(spyDelete.called).to.equal(true);
      expect(spyDelete.calledWith(providerName1)).to.equal(true);
      spyDelete.restore();
    });

    it('should trigger notifyUpdated', () => {
      const spy = sinon.spy(providerFactory, 'notifyUpdated');
      providerFactory.removeProvider(providerName1);

      expect(spy.called).to.equal(true);
      expect(spy.calledWith(providerName1)).to.equal(true);
      spy.restore();
    });

  });

  describe('subscribe', () => {
    let providerFactory;

    beforeEach(() => {
      providerFactory = new ProviderFactory();
    });

    afterEach(() => {
      handler1.reset();
    });

    it('should update map with new handler', () => {
      const spy = sinon.spy((providerFactory as any).subscribers, 'set');
      providerFactory.subscribe(providerName1, handler1);

      expect(spy.called).to.equal(true);
      expect(spy.calledWith(providerName1, [handler1])).to.equal(true);
      spy.restore();
    });

    it('should trigger handler', () => {
      providerFactory.setProvider(providerName1, provider);
      providerFactory.subscribe(providerName1, handler1);

      expect(handler1.called).to.equal(true);
      expect(handler1.calledWith(providerName1, provider)).to.equal(true);
    });

  });

  describe('unsubscribe', () => {
    let providerFactory;

    beforeEach(() => {
      providerFactory = new ProviderFactory();
      providerFactory.subscribe(providerName1, handler2);
    });

    it('should remove handler from subscriber map', () => {
      const spy = sinon.spy((providerFactory as any).subscribers, 'set');
      providerFactory.unsubscribe(providerName1, handler1);

      expect(spy.called).to.equal(true);
      expect(spy.calledWith(providerName1, [handler2])).to.equal(true);
      spy.restore();
    });

    it('should remove provider subscription if there are no handlers left', () => {
      const spy = sinon.spy((providerFactory as any).subscribers, 'delete');
      providerFactory.unsubscribe(providerName1, handler2);

      expect(spy.called).to.equal(true);
      expect(spy.calledWith(providerName1)).to.equal(true);
      spy.restore();
    });
  });

  describe('notifyUpdated', () => {
    let providerFactory;

    beforeEach(() => {
      providerFactory = new ProviderFactory();
      providerFactory.subscribe(providerName1, handler1);
      providerFactory.subscribe(providerName1, handler2);
      providerFactory.subscribe(providerName2, handler3);
    });

    afterEach(() => {
      handler1.reset();
      handler2.reset();
      handler3.reset();
    });

    it('should call all handlers for provider', () => {
      (providerFactory as any).notifyUpdated(providerName1, provider);
      expect(handler1.called).to.equal(true);
      expect(handler2.called).to.equal(true);
      expect(handler3.called).to.equal(false);
      expect(handler1.calledWith(providerName1, provider)).to.equal(true);
      expect(handler2.calledWith(providerName1, provider)).to.equal(true);
    });
  });

  describe('destroy', () => {
    it('should clear all handlers and providers', () => {
      const providerFactory = new ProviderFactory();
      providerFactory.setProvider(providerName1, provider);
      providerFactory.subscribe(providerName1, handler1);

      expect(providerFactory.isEmpty()).to.equal(false);
      providerFactory.destroy();
      expect(providerFactory.isEmpty()).to.equal(true);
    });
  });

});
