/* tslint:disable:no-unused-expression */
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import LazyLoad from 'react-lazy-load-zz';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';

import {fakeContext} from '@atlaskit/media-test-helpers';
import {MediaCollectionFileItem, FileDetails} from '@atlaskit/media-core';

import {CardList, CardListProps, CardListState} from '../../../src/list';
import {MediaCard} from '../../../src/root/mediaCard';
import {InfiniteScroll} from '../../../src/list/infiniteScroll';
import {LazyContent} from '../../../src/utils';

describe('CardList', () => {
  const collectionName = 'MyMedia';
  const expectedMediaItemProvider = 'the media item provider';
  const oldItem: MediaCollectionFileItem = {
    type: 'file',
    details: {
      id: 'some-file/link-id',
      occurrenceKey: 'some-occurrence-key',
      processingStatus: 'pending'
    }
  };
  const collection = {items: [oldItem]};
  const expectedMediaItems = [
    {
      type: 'link',
      details: {
        id: 'abcd',
        type: 'link'
      }
    },
    {
      type: 'file',
      details: {
        id: 'efgh',
        type: 'file'
      }
    }
  ];
  const contextWithInclusiveStartKey = fakeContext({
    getMediaCollectionProvider: {
      observable() {
        return Observable.of({
          items: expectedMediaItems,
          nextInclusiveStartKey: 'xyz'
        });
      }
    },
    getMediaItemProvider: {
      observable() {
        return Observable.of(expectedMediaItemProvider);
      }
    }
  }) as any;
  const contextWithDefaultCollection = fakeContext({
    getMediaCollectionProvider: {
      observable() {
        return Observable.create(observer => {
          observer.next(collection);
        });
      }
    }
  });
  it('should create a MediaItemProvider for each MediaItem in the collection', () => {
    const context = contextWithInclusiveStartKey;
    mount(<CardList context={context} collectionName={collectionName}/>);

    expect(context.getMediaCollectionProvider.callCount).to.be.equal(expectedMediaItems.length);
    expect(context.getMediaItemProvider.callCount).to.be.equal(expectedMediaItems.length);
    expect(context.getMediaItemProvider.calledWithExactly(expectedMediaItems[0].details.id, expectedMediaItems[0].type, collectionName, expectedMediaItems[0])).to.be.true;
    expect(context.getMediaItemProvider.calledWithExactly(expectedMediaItems[1].details.id, expectedMediaItems[1].type, collectionName, expectedMediaItems[1])).to.be.true;
  });

  it('should pass a provider to MediaCard', () => {
    const collection = {items: expectedMediaItems};
    const context = contextWithInclusiveStartKey;
    const card = mount(<CardList context={context} collectionName={collectionName} shouldLazyLoadCards={false}/>);

    card.setState({loading: false, error: undefined, collection});
    // re-render now that we've subscribed (relying on the stubbed provider being synchronous)
    expect(card.find(MediaCard)).to.have.length(2);
    card.find(MediaCard).forEach(mediaCard =>
      expect((mediaCard.prop('provider').observable() as any).value).to.be.equal(expectedMediaItemProvider)
    );
  });

  it('should be loading=true when mounted', () => {
    const context = fakeContext();
    const card = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>);
    expect(card.state().loading).to.be.true;
  });

  it('should be loading=false when we start loading the next page', () => {
    const context = contextWithInclusiveStartKey;
    const card = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
    card.setState({loading: false, loadNextPage: sinon.spy()});
    card.instance().loadNextPage();
    expect(card.state().loading).to.be.false;
  });

  it('should not animate items the first time', () => {
    const item: MediaCollectionFileItem = {
      type: 'file',
      details: {
        id: 'some-file/link-id',
        occurrenceKey: 'some-occurrence-key',
        processingStatus: 'pending'
      }
    };
    const context = fakeContext();
    const collectionName = 'MyMedia';
    const collection = {items: [item]};
    const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
    list.setState({loading: false, error: undefined, collection});
    expect(list.state('shouldAnimate')).to.be.false;
  });

  it('should animate items when they are new', () => {
    const oldItem: MediaCollectionFileItem = {
      type: 'file',
      details: {
        id: '1',
        occurrenceKey: 'a',
        processingStatus: 'pending'
      }
    };
    const newItem: MediaCollectionFileItem = {
      type: 'file',
      details: {
        id: '2',
        occurrenceKey: 'a',
        processingStatus: 'pending'
      }
    };
    const collection = {items: [oldItem]};
    const context = fakeContext();
    const collectionName = 'MyMedia';
    const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
    const instance = list.instance();

    list.setState({loading: false, error: undefined, collection});
    instance.handleNextItems({context, collectionName})(collection);
    expect(list.state('firstItemKey')).to.be.equal(`${oldItem.details.id}-${oldItem.details.occurrenceKey}`);

    const newCollection = {items: [newItem, ...collection.items]};
    list.setState({collection: newCollection});
    instance.handleNextItems({context, collectionName})(newCollection);
    expect(list.state('firstItemKey')).to.be.equal(`${newItem.details.id}-${newItem.details.occurrenceKey}`);
    expect(list.state('shouldAnimate')).to.be.true;
  });

  it('should reset previous state when props change', () => {
    const item: MediaCollectionFileItem = {
      type: 'file',
      details: {
        id: '1',
        occurrenceKey: 'a',
        processingStatus: 'pending'
      }
    };
    const collection = {items: [item]};
    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.create(observer => {
            observer.next(collection);
          });
        }
      }
    });
    const collectionName = 'MyMedia';
    const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
    const spy = sinon.spy();

    list.instance().setState = spy;
    list.setProps({context, collectionName: 'otherCollection'});

    expect(spy.firstCall.args[0].collection).to.be.undefined;
    expect(spy.firstCall.args[0].firstItemKey).to.be.undefined;
  });

  it('should fire onCardClick handler with updated MediaItemDetails when a Card in the list is clicked', () => {
    const newItemDetails: FileDetails = {
      processingStatus: 'succeeded'
    };

    const newItem: MediaCollectionFileItem = {
      type: 'file',
      details: {
        ...oldItem.details,
        ...newItemDetails
      }
    };

    const collection = {items: [oldItem, oldItem, oldItem], nextInclusiveStartKey: 'xyz'};

    const context = fakeContext({
      getMediaCollectionProvider: {
        observable() {
          return Observable.create(observer => {
            observer.next(collection);
          });
        }
      },
      getMediaItemProvider: {
        observable() {
          return Observable.create(observer => {
            observer.next(newItemDetails);
          });
        }
      }
    });


    const onCardClickHandler = sinon.spy();

    const wrapper = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName} onCardClick={onCardClickHandler} />) as any;
    wrapper.setState({loading: false, error: undefined, collection});
    wrapper.find(MediaCard).first().simulate('click', {mediaItemDetails: newItemDetails});

    expect(onCardClickHandler.calledOnce).to.be.true;
    expect(onCardClickHandler.firstCall.args[0].mediaCollectionItem).to.deep.equal(newItem);
    expect(onCardClickHandler.firstCall.args[0].collectionName).to.deep.equal(collectionName);
  });

  describe('.render()', () => {
    it('should render the loading view when the list is loading', () => {
      const context = fakeContext();
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: true});
      expect(list.children().text()).to.contain('loading...');
    });

    it('should render the empty view when the list is not loading and the error is an axios response with a status of 404', () => {
      const context = fakeContext();
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: false, error: {response: {status: 404}}});
      expect(list.children().text()).to.contain('No items');
    });

    it('should render the error view when the the list is not loading and the error is not an axios response with a status of 404', () => {
      const context = fakeContext();
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: false, error: new Error()});
      expect(list.children().text()).to.contain('ERROR');
    });

    // TODO: when would this even occur? loading=true is set when the collection is set! and error=xyz is set when the collection is undefined
    it('should render the loading view when the the list is not loading, there is no error and the collection has not been retrieved', () => {
      const context = fakeContext();
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName}/>) as any;
      list.setState({loading: false, error: undefined, collection: undefined});
      expect(list.children().text()).to.contain('loading...');
    });

    it('should render wrapped in an <InfiniteScroll> when useInfiniteScroll=true', () => {
      const context = fakeContext();
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName} useInfiniteScroll={true}/>) as any;
      list.setState({loading: false, error: undefined, collection: {items: []}});
      expect(list.is(InfiniteScroll)).to.be.true;
    });

    it('should not render wrapped in an <InfiniteScroll> when useInfiniteScroll=false', () => {
      const context = fakeContext();
      const list = shallow<CardListProps, CardListState>(<CardList context={context} collectionName={collectionName} useInfiniteScroll={false}/>) as any;
      list.setState({loading: false, error: undefined, collection: {items: []}});
      expect(list.is(InfiniteScroll)).to.be.false;
    });

    it('should render wrapped in an <LazyLoad> by default', () => {
      const context = contextWithDefaultCollection;
      const list = mount(<CardList useInfiniteScroll={false} context={context} collectionName={collectionName} />) as any;

      list.setState({loading: false, error: undefined, collection});

      expect(list.find(LazyLoad)).to.have.length(1);
    });

    it('should not render wrapped in an <LazyLoad> when shouldLazyLoadCards=false', () => {
      const context = contextWithDefaultCollection;
      const list = mount(<CardList useInfiniteScroll={false} context={context} collectionName={collectionName} shouldLazyLoadCards={false} />) as any;

      list.setState({loading: false, error: undefined, collection});

      expect(list.find(LazyLoad)).to.have.length(0);
    });

    it('should not wrap existing items into LazyContent', () => {
      const context = contextWithDefaultCollection;
      const list = mount(<CardList useInfiniteScroll={false} context={context} collectionName={collectionName}/>) as any;

      list.setState({loading: false, error: undefined, shouldAnimate: true, collection});
      expect(list.find(LazyContent)).to.have.length(0);
    });
  });
});
