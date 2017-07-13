/* tslint:disable:no-unused-expression */
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { LinkCardGenericView } from '../../../src/links';
import { Details } from '../../../src/links/styled';
import { Title, Link, ErrorContainer, ErrorHeader } from '../../../src/links/cardGenericView/styled';

describe('LinkCardGenericView', () => {
  const title = 'Hello world';
  const linkUrl = 'http://localhost:9001/';
  const thumbnailUrl = 'http://localhost:9001/some/thumbnail';
  const iconUrl = 'http://localhost:9001/some/icon';
  const event = 'some-random-event';

  it('should only render the title and linkUrl when not supplied with optional props', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).to.eql(title);
    expect(card.find(Link).text()).to.eql(linkUrl);
    expect(card.find('.media-card')).to.have.length(0);
  });

  it('should render in horizontal display mode by default', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);
    expect(card.find('.media-card')).to.have.length(1);
  });

  it('should render in square display mode when specified', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} appearance="square" />);
    expect(card.find('.media-card')).to.have.length(1);
  });

  it('should render a thumnail when supplied', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />) as any;

    expect(card.find('.media-card')).to.have.length(1);
    expect(card.find('.media-card').props().style.backgroundImage).to.contain(thumbnailUrl);
  });

  it.skip('should NOT render a thumnail when supplied thumbnail url errors', (done) => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />);

    // TODO: test fails on pipeline, find way of wait until img is loaded properly
    // Waits until the image tries to load the uri and calls the error handler which hanpens async.
    setTimeout(() => {
      expect(card.state('thumbnailError')).to.be.true;
      done();
    }, 10);
  });

  it('should render an icon when supplied', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} iconUrl={iconUrl} />);

    expect(card.find('.media-card')).to.have.length(0);
    expect(card.find(`img[src='${iconUrl}']`)).to.have.length(1);
  });

  it('should NOT render an icon when supplied icon url errors', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} iconUrl={iconUrl} />);
    card.find(`img[src='${iconUrl}']`).simulate('error');

    expect(card.find('.media-card')).to.have.length(0);
    expect(card.find(`img[src='${iconUrl}']`)).to.have.length(0);
  });

  it('should render the site name instead of link url inside of they <a> tag when it is supplied as a prop', () => {
    const site = 'Hello world';

    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} site={site}/>);
    expect(card.find(Link).text()).to.eql(site);
  });

  it('currently ignores the loading prop', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).to.eql(title);
    expect(card.find(Link).text()).to.eql(linkUrl);
    expect(card.find('.media-card')).to.have.length(0);
  });

  it('displays error when error prop is passed in', () => {
    const error = 'Some random error occured';
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl} error={error}/>);

    expect(card.find(Details)).to.have.length(0);
    expect(card.find(ErrorContainer)).to.have.length(1);
    expect(card.find(ErrorHeader)).to.have.length(1);
    expect(card.find(ErrorHeader).text()).to.equal(error);
  });

  it('should fire onClick when component is clicked', () => {
    const handler = sinon.spy();
    const card = shallow(<LinkCardGenericView title={title} linkUrl={linkUrl} onClick={handler} />);

    card.simulate('click', event);
    expect(handler.calledOnce).to.be.true;
    expect(handler.calledOnce).to.be.true;
    expect(handler.firstCall.args[0]).to.deep.equal(event);
  });

  it('should fire onMouseEnter when component is hovered', () => {
    const handler = sinon.spy();
    const card = shallow(<LinkCardGenericView title={title} linkUrl={linkUrl} onMouseEnter={handler} />);

    card.simulate('mouseEnter', event);
    expect(handler.calledOnce).to.be.true;
    expect(handler.calledOnce).to.be.true;
    expect(handler.firstCall.args[0]).to.deep.equal(event);
  });

  it('should wrap the component into an A element', () => {
    const card = mount(<LinkCardGenericView title={title} linkUrl={linkUrl}/>);

    expect(card.getDOMNode()).to.be.instanceOf(HTMLAnchorElement);
  });
});
