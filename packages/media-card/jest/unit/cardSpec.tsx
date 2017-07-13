/* tslint:disable */ //:no-unused-expressions
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import LazyLoad from 'react-lazy-load-zz';
import { fakeContext } from '@atlaskit/media-test-helpers';

import { Card, UrlPreviewIdentifier, MediaIdentifier, CardEvent } from '../../src';
import { MediaCard } from '../../src/root/mediaCard';

describe('Card', () => {
  const linkIdentifier: MediaIdentifier = {
    id: 'some-random-id',
    mediaItemType: 'link',
    collectionName: 'some-collection-name'
  };
  const fileIdentifier: MediaIdentifier = {
    id: 'some-random-id',
    mediaItemType: 'file',
    collectionName: 'some-collection-name'
  };

  it('should render media card with UrlPreviewProvider when passed a UrlPreviewIdentifier', () => {
    const dummyUrl = 'http://some.url.com';
    const mediaItemType = 'link';

    const identifier: UrlPreviewIdentifier = {
      url: dummyUrl,
      mediaItemType
    };

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getUrlPreviewProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={identifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getUrlPreviewProvider.calledOnce).to.be.true;
    expect(context.getUrlPreviewProvider.calledWithExactly(dummyUrl)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should render media card with MediaItemProvider when passed a MediaIdentifier with mediaItemType "link"', () => {
    const {id, mediaItemType, collectionName} = linkIdentifier;

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={linkIdentifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getMediaItemProvider.calledOnce).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should render media card with MediaItemProvider when passed a MediaIdentifier with mediaItemType "file"', () => {
    const {id, mediaItemType, collectionName} = fileIdentifier;

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={fileIdentifier} />);
    const mediaCard = card.find(MediaCard);

    expect(context.getMediaItemProvider.calledOnce).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.deep.equal(dummyProvider);
  });

  it('should render media card with a new MediaItemProvider when the context changes', () => {
    const dummyProvider = 'second provider';

    const firstContext = fakeContext({
      getMediaItemProvider: 'first provider'
    });

    const secondContext = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={firstContext} identifier={fileIdentifier} />);
    card.setProps({context: secondContext, fileIdentifier});
    const mediaCard = card.find(MediaCard);

    const {id, mediaItemType, collectionName} = fileIdentifier;
    expect(secondContext.getMediaItemProvider.calledOnce).to.be.true;
    expect(secondContext.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.equal(dummyProvider);
  });

  it('should render media card with a new MediaItemProvider when the identifier changes', () => {
    const firstIdentifier: MediaIdentifier = fileIdentifier;
    const secondIdentifier: MediaIdentifier = linkIdentifier;

    const dummyProvider = {observable: 'dummy provider ftw!'};

    const context = fakeContext({
      getMediaItemProvider: dummyProvider
    }) as any;

    const card = shallow(<Card context={context} identifier={firstIdentifier} />);
    card.setProps({context, identifier: secondIdentifier});
    const mediaCard = card.find(MediaCard);

    const {id, mediaItemType, collectionName} = secondIdentifier;
    expect(context.getMediaItemProvider.calledTwice).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(id, mediaItemType, collectionName)).to.be.true;

    expect(mediaCard).to.have.length(1);
    expect(mediaCard.props().provider).to.equal(dummyProvider);
  });

  it('should fire onClick when passed in as a prop and MediaCard fires onClick', () => {
    const context = fakeContext() as any;
    const clickHandler = sinon.spy();

    const card = shallow(<Card context={context} identifier={fileIdentifier} onClick={clickHandler} />);
    const mediaCardOnClick = card.find(MediaCard).props().onClick;

    if (!mediaCardOnClick) {
      throw new Error('MediaCard onClick was undefined');
    }

    expect(clickHandler.called).to.be.false;

    mediaCardOnClick({} as any);
    expect(clickHandler.calledOnce).to.be.true;
  });

  it('should pass onMouseEnter to MediaCard', () => {
    const context = fakeContext() as any;
    const hoverHandler = (result: CardEvent) => {};
    const card = shallow(<Card context={context} identifier={fileIdentifier} onMouseEnter={hoverHandler} />);

    expect(card.find(MediaCard).props().onMouseEnter).to.deep.equal(hoverHandler);
  });

  it('should use lazy load by default', () => {
    const context = fakeContext() as any;
    const hoverHandler = (result: CardEvent) => {};
    const card = mount(<Card context={context} identifier={fileIdentifier} onMouseEnter={hoverHandler} />);

    expect(card.find(LazyLoad)).to.have.length(1);
  });

  it('should not use lazy load when "isLazy" is false', () => {
    const context = fakeContext() as any;
    const hoverHandler = (result: CardEvent) => {};
    const card = mount(<Card isLazy={false} context={context} identifier={fileIdentifier} onMouseEnter={hoverHandler} />);

    expect(card.find(LazyLoad)).to.have.length(0);
  });

  it('should pass properties down to MediaCard', () => {
    const context = fakeContext() as any;
    const card = shallow(<Card context={context} identifier={fileIdentifier} appearance="small" dimensions={{width: 100, height: 50}}/>);

    expect(card.find(MediaCard).props().appearance).to.equal('small');
    expect(card.find(MediaCard).props().dimensions).to.deep.equal({width: 100, height: 50});
  });

  it('should create a card placeholder with the right props', () => {
    const context = fakeContext() as any;
    const card = shallow(<Card context={context} identifier={fileIdentifier} appearance="small" dimensions={{width: 100, height: 50}}/>);
    const placeholder = (card.instance() as Card).placeholder;

    expect(placeholder.props.status).to.equal('loading');
    expect(placeholder.props.appearance).to.equal('small');
    expect(placeholder.props.dimensions).to.deep.equal({width: 100, height: 50});
  });

  it('should use "crop" as default resizeMode', () => {
    const fetchImageDataUriSpy = sinon.spy(() => Promise.resolve());
    const context = fakeContext({
      getDataUriService: {
        fetchImageDataUri: fetchImageDataUriSpy
      }
    });
    const card = mount(<Card context={context} identifier={fileIdentifier} isLazy={false}/>);
    const mediaCard = card.find(MediaCard);

    expect(mediaCard.prop('resizeMode')).to.be.equal('crop');
    expect(card.find('CardView').prop('resizeMode')).to.be.equal('crop');
    expect(fetchImageDataUriSpy.args[0][3]).to.be.equal('crop');
  });

  it('should pass right resizeMode down', () => {
    const fetchImageDataUriSpy = sinon.spy(() => Promise.resolve());
    const context = fakeContext({
      getDataUriService: {
        fetchImageDataUri: fetchImageDataUriSpy
      }
    });
    const card = mount(<Card context={context} identifier={fileIdentifier} isLazy={false} resizeMode="full-fit"/>);
    const mediaCard = card.find(MediaCard);

    expect(mediaCard.prop('resizeMode')).to.be.equal('full-fit');
    expect(card.find('CardView').prop('resizeMode')).to.be.equal('full-fit');
    expect(fetchImageDataUriSpy.args[0][3]).to.be.equal('full-fit');
  });
});
