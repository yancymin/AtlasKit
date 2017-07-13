import * as chai from 'chai';
import { expect } from 'chai';
import { SinonSpy } from 'sinon';
import * as sinon from 'sinon';

import analytics from '../../../src/analytics/decorator';
import { AnalyticsHandler } from '../../../src/analytics/handler';
import service from '../../../src/analytics/service';
import { chaiPlugin } from '../../../src/test-helper';

chai.use(chaiPlugin);

describe('analytics decorator', () => {
  let spy: any;

  beforeEach(() => {
    spy = sinon.spy();
    service.handler = (spy as AnalyticsHandler);
  });

  afterEach(() => {
    spy = null;
    service.handler = null;
  });

  it('tracks events after class method is called', () => {
    class AnnotatedTestClass {
      @analytics('test.event')
      foo() { return true; }
    }

    const instance = new AnnotatedTestClass();
    expect(spy.called).to.equal(false);

    instance.foo();
    expect(spy.calledWith('test.event')).to.equal(true);
    expect(spy.callCount).to.equal(1);

    instance.foo();
    expect(spy.callCount).to.equal(2);
    expect(spy.calledWith('test.event')).to.equal(true);
  });

  it('tracks events after bound method (instance property) is called', () => {
    class AnnotatedTestClass2 {
      @analytics('test.event.foo')
      foo = () => true

      @analytics('test.event.bar')
      bar = () => true
    }

    const instance = new AnnotatedTestClass2();
    expect(spy.called).to.equal(false);

    instance.foo();
    expect(spy.calledWith('test.event.foo')).to.equal(true);
    expect(spy.callCount).to.equal(1);

    instance.bar();
    expect(spy.callCount).to.equal(2);
    expect(spy.calledWith('test.event.bar')).to.equal(true);
  });

  it('returns unique decorated bound method (property) per instance', () => {
    class AnnotatedTestClassWithBoundMethod {
      @analytics('test.event.foo')
      foo = () => true
    }

    const instance1 = new AnnotatedTestClassWithBoundMethod();
    const instance2 = new AnnotatedTestClassWithBoundMethod();

    expect(instance1.foo).to.not.eq(instance2.foo);
  });

  it('returns property value if decorating a non-function property', () => {
    sinon.stub(console, 'warn', () => { });

    class AnnotatedTestClassWithPrimitiveValue {
      @analytics('test.event.foo')
      foo = 15.15;
    }

    const instance = new AnnotatedTestClassWithPrimitiveValue();

    expect((console.warn as SinonSpy).called).to.equal(true);
    expect(instance.foo).to.eq(15.15);
    (console.warn as any).restore();
  });

  it('can track private methods being called', () => {
    class AnnotatedTestClass3 {
      @analytics('test.event.foo')
      foo = () => {
        this.bar();
        return true;
      }

      @analytics('test.event.bar')
      private bar = () => true
    }

    const instance = new AnnotatedTestClass3();
    expect(spy.called).to.equal(false);

    instance.foo();
    expect(spy.callCount).to.equal(2);
    expect(spy.calledWith('test.event.foo')).to.equal(true);
    expect(spy.calledWith('test.event.bar')).to.equal(true);
  });

  it('should not track event if it returns false', () => {
    class AnnotatedTestClass {
      @analytics('test.event.foo')
      foo = () => false
    }

    const instance = new AnnotatedTestClass();
    expect(spy.called).to.equal(false);

    instance.foo();
    expect(spy.called).to.equal(false);
  });
});
