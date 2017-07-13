// @flow
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import DimensionPublisher from '../../../src/view/dimension-publisher/dimension-publisher';
import getDimension from '../../utils/get-dimension-util';
import type { Margin } from '../../../src/state/get-dimension';
import type { Id, Dimension, HTMLElement } from '../../../src/types';

const itemId: Id = 'item-1';

class Item extends Component {
  /* eslint-disable react/sort-comp */
  props: {
    publish: (dimension: Dimension) => void,
    shouldPublish?: boolean,
  }

  state: {|
    ref: ?HTMLElement
  |}

  state = {
    ref: null,
  }

  setRef = (ref: ?HTMLElement) => {
    this.setState({
      ref,
    });
  }

  render() {
    return (
      // $ExpectError - for an unknown reason flow is having a hard time with this
      <DimensionPublisher
        itemId={itemId}
        type="TYPE"
        targetRef={this.state.ref}
        shouldPublish={Boolean(this.props.shouldPublish)}
        publish={this.props.publish}
      >
        <div ref={this.setRef}>hi</div>
      </DimensionPublisher>
    );
  }
}

describe('DimensionPublisher', () => {
  afterEach(() => {
    // clean up any stubs
    if (Element.prototype.getBoundingClientRect.restore) {
      Element.prototype.getBoundingClientRect.restore();
    }
    if (window.getComputedStyle.restore) {
      window.getComputedStyle.restore();
    }
  });

  it('should not publish if not asked to', () => {
    const publish = sinon.stub();
    const wrapper = mount(<Item publish={publish} />);

    wrapper.setProps({
      shouldPublish: false,
    });

    expect(publish.called).to.equal(false);
  });

  it('should publish the dimensions of the target', () => {
    const publish = sinon.stub();
    const dimension: Dimension = getDimension({ id: itemId });

    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: dimension.withoutMargin.top,
      bottom: dimension.withoutMargin.bottom,
      left: dimension.withoutMargin.left,
      right: dimension.withoutMargin.right,
      height: dimension.withoutMargin.height,
      width: dimension.withoutMargin.width,
    });
    sinon.stub(window, 'getComputedStyle').returns({
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
    });

    const wrapper = mount(<Item publish={publish} />);

    wrapper.setProps({
      shouldPublish: true,
    });

    expect(publish.calledWith(dimension)).to.equal(true);
  });

  it('should consider any margins when calculating dimensions', () => {
    const margin: Margin = {
      top: 10,
      right: 30,
      bottom: 40,
      left: 50,
    };
    const publish = sinon.stub();
    const base: Dimension = getDimension({ id: itemId });
    const expected: Dimension = getDimension({ id: itemId, margin });
    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: base.withoutMargin.top,
      bottom: base.withoutMargin.bottom,
      left: base.withoutMargin.left,
      right: base.withoutMargin.right,
      height: base.withoutMargin.height,
      width: base.withoutMargin.width,
    });
    sinon.stub(window, 'getComputedStyle').returns({
      marginTop: `${margin.top}`,
      marginRight: `${margin.right}`,
      marginBottom: `${margin.bottom}`,
      marginLeft: `${margin.left}`,
    });

    const wrapper = mount(<Item publish={publish} />);

    wrapper.setProps({
      shouldPublish: true,
    });

    expect(publish.args[0][0]).to.deep.equal(expected);
  });

  it('should not publish unless it is freshly required to do so', () => {
    const publish = sinon.stub();
    const dimension: Dimension = getDimension({ id: itemId });
    sinon.stub(Element.prototype, 'getBoundingClientRect').returns({
      top: dimension.withMargin.top,
      bottom: dimension.withMargin.bottom,
      left: dimension.withMargin.left,
      right: dimension.withMargin.right,
      height: dimension.withMargin.height,
      width: dimension.withMargin.width,
    });

    // initial publish
    const wrapper = mount(<Item publish={publish} />);
    wrapper.setProps({
      shouldPublish: true,
    });
    expect(publish.calledOnce).to.equal(true);

    // should not publish if the props have not changed
    wrapper.update();
    expect(publish.calledOnce).to.equal(true);

    // should publish when freshly required to do so
    wrapper.setProps({
      shouldPublish: false,
      publish,
    });
    wrapper.setProps({
      shouldPublish: true,
      publish,
    });
    expect(publish.calledTwice).to.equal(true);
  });
});
