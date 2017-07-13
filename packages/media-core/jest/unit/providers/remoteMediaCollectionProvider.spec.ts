import { expect } from 'chai';
import * as sinon from 'sinon';
import { defaultCollectionName } from '@atlaskit/media-test-helpers';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';

import { CollectionServiceStub } from '../_stubs/collection-service-stub';
import { RemoteMediaCollectionProviderFactory } from '../../../src/providers/remoteMediaCollectionProviderFactory';

describe('RemoteMediaCollectionProvider', () => {
  const pageCount = 10;
  const itemsPerPageCount = 10;
  const totalItemCount = pageCount * itemsPerPageCount;
  const sortDirection = 'desc';

  it('should load the first page on construction', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, totalItemCount, itemsPerPageCount);
    const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
      collectionService,
      defaultCollectionName,
      itemsPerPageCount,
      sortDirection
    );

    const subscription = collectionProvider.observable()
      .subscribe({
        next: collection => {
          expect(collection.id).to.be.equal(defaultCollectionName);
          expect(collection.items).to.be.length(itemsPerPageCount);
          subscription.unsubscribe();
          done();
        }
      });
  });

  it('should load the next page', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, totalItemCount, itemsPerPageCount);
    const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
      collectionService,
      defaultCollectionName,
      itemsPerPageCount,
      sortDirection
    );

    // Load next page when we have finished loading the first one.
    const subscription1 = collectionProvider.observable()
      .take(1)
      .do(collection => collectionProvider.loadNextPage())
      .subscribe({
        next: () => subscription1.unsubscribe()
      });

    const subscription2 = collectionProvider.observable()
      .skip(1)
      .take(1)
      .subscribe({
        next: collection => {
          expect(collection.items).to.be.length(2 * itemsPerPageCount);
          expect(collection.items[2 * itemsPerPageCount - 1].details.occurrenceKey).to.be.equal('file-19');
          subscription2.unsubscribe();
          done();
        }
      });
  });

  it('should load all the pages until it finds occurrence key', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, totalItemCount, itemsPerPageCount);
    const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
      collectionService,
      defaultCollectionName,
      itemsPerPageCount,
      sortDirection
    );

    collectionProvider.loadNextPageUntil(item => item.details.occurrenceKey === 'file-66');

    const subscription = collectionProvider.observable()
      .skip(6)
      .take(1)
      .subscribe({
        next: collection => {
          expect(collection.items).to.be.length(7 * itemsPerPageCount);
          expect(collection.items[7 * itemsPerPageCount - 1].details.occurrenceKey).to.be.equal('file-69');
          subscription.unsubscribe();
          done();
        }
      });
  });

  it('should load all the pages if it can\'t find the occurrence key', (done) => {
    const collectionService = CollectionServiceStub.from(defaultCollectionName, totalItemCount, itemsPerPageCount);
    const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
      collectionService,
      defaultCollectionName,
      itemsPerPageCount,
      sortDirection
    );

    collectionProvider.loadNextPageUntil(item => item.details.occurrenceKey === 'file-not-found');

    const subscription = collectionProvider.observable()
      .subscribe({
        next: collection => {
          if (collection.items.length === totalItemCount) {
            expect(collection.items[totalItemCount - 1].details.occurrenceKey).to.be.equal('file-99');
            subscription.unsubscribe();
            done();
          }
        }
      });
  });

  describe('refresh', () => {

    it('should fetch and not add any new items to the collection when there are no new items', done => {
      const getCollectionItems = sinon.stub();

      const firstPageItems = [{details: {id: 'd'}}, {details: {id: 'e'}}, {details: {id: 'f'}}];

      getCollectionItems
        .onFirstCall().returns(Promise.resolve({
          items: [...firstPageItems],
          nextInclusiveStartKey: undefined
        }))
        .onSecondCall().returns(Promise.resolve({
          items: [...firstPageItems],
          nextInclusiveStartKey: undefined
        }))
      ;

      const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
        {getCollectionItems},
        defaultCollectionName,
        itemsPerPageCount,
        sortDirection
      );

      let firstTime = true;
      const subscription = collectionProvider.observable()
        .subscribe({
          next: collection => {
            if (firstTime) {
              firstTime = false;
              collectionProvider.refresh();
            } else {
              expect(collection.items).to.be.length(firstPageItems.length);
              expect(collection.items).to.be.deep.equal([...firstPageItems]);
              subscription.unsubscribe();
              done();
            }
          }
        })
      ;
    });

    it('should fetch and add new items from the first page to the collection when we have loaded the first page', done => {
      const getCollectionItems = sinon.stub();

      const firstPageItems = [{details: {id: 'd'}}, {details: {id: 'e'}}, {details: {id: 'f'}}];
      const newItems = [{details: {id: 'a'}}, {details: {id: 'b'}}, {details: {id: 'c'}}];

      getCollectionItems
        .onFirstCall().returns(Promise.resolve({
          items: [...firstPageItems],
          nextInclusiveStartKey: undefined
        }))
        .onSecondCall().returns(Promise.resolve({
          items: [...newItems, ...firstPageItems],
          nextInclusiveStartKey: undefined
        }))
      ;

      const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
        {getCollectionItems},
        defaultCollectionName,
        itemsPerPageCount,
        sortDirection
      );

      let firstTime = true;
      const subscription = collectionProvider.observable()
        .subscribe({
          next: collection => {
            if (firstTime) {
              firstTime = false;
              collectionProvider.refresh();
            } else {
              expect(collection.items).to.be.length(newItems.length + firstPageItems.length);
              expect(collection.items).to.be.deep.equal([...newItems, ...firstPageItems]);
              subscription.unsubscribe();
              done();
            }
          }
        })
      ;
    });

    it('should fetch and add new items from the first page to the collection when we have loaded the first page and multiple items have the same ID', done => {
      const getCollectionItems = sinon.stub();

      const firstPageItems = [{details: {id: 'a', occurrenceKey: 'X'}}];
      const newItems = [{details: {id: 'a', occurrenceKey: 'Y'}}];

      getCollectionItems
        .onFirstCall().returns(Promise.resolve({
          items: [...firstPageItems],
          nextInclusiveStartKey: undefined
        }))
        .onSecondCall().returns(Promise.resolve({
          items: [...newItems, ...firstPageItems],
          nextInclusiveStartKey: undefined
        }))
      ;

      const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
        {getCollectionItems},
        defaultCollectionName,
        itemsPerPageCount,
        sortDirection
      );

      let firstTime = true;
      const subscription = collectionProvider.observable()
        .subscribe({
          next: collection => {
            if (firstTime) {
              firstTime = false;
              collectionProvider.refresh();
            } else {
              expect(collection.items).to.be.length(newItems.length + firstPageItems.length);
              expect(collection.items).to.be.deep.equal([...newItems, ...firstPageItems]);
              subscription.unsubscribe();
              done();
            }
          }
        })
      ;
    });

    it('should fetch and add new items from the first page to the collection when we have loaded the second page', done => {
      const getCollectionItems = sinon.stub();

      const firstPageItems = [{details: {id: 'd'}}, {details: {id: 'e'}}, {details: {id: 'f'}}];
      const secondPageItems = [{details: {id: 'g'}}, {details: {id: 'h'}}, {details: {id: 'i'}}];
      const newItems = [{details: {id: 'a'}}, {details: {id: 'b'}}, {details: {id: 'c'}}];

      getCollectionItems
        .onFirstCall().returns(Promise.resolve({
          items: [...firstPageItems],
          nextInclusiveStartKey: 'xyz'
        }))
        .onSecondCall().returns(Promise.resolve({
          items: [...secondPageItems],
          nextInclusiveStartKey: undefined // we're at the end of the collection
        }))
        .onThirdCall().returns(Promise.resolve({
          items: [...newItems, ...firstPageItems],
          nextInclusiveStartKey: 'xyz'
        }))
      ;

      const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
        {getCollectionItems},
        defaultCollectionName,
        itemsPerPageCount,
        sortDirection
      );

      let callCount = 0;
      const subscription = collectionProvider.observable()
        .subscribe({
          next: collection => {
            switch (callCount) {

              case 0:
                expect(collection.items).to.be.length(secondPageItems.length);
                collectionProvider.loadNextPage();
                break;

              case 1:
                expect(collection.items).to.be.length(firstPageItems.length + secondPageItems.length);
                collectionProvider.refresh();
                break;

              case 2:
                expect(collection.items).to.be.length(newItems.length + firstPageItems.length + secondPageItems.length);
                expect(collection.items).to.be.deep.equal([...newItems, ...firstPageItems, ...secondPageItems]);
                subscription.unsubscribe();
                done();
                break;

            }
            ++callCount;
          }
        })
      ;
    });

    it('should fetch and add new items from the first two pages to the collection when we have loaded the first page', done => {
      const getCollectionItems = sinon.stub();

      const firstPageItems = [{details: {id: 'g'}}, {details: {id: 'h'}}, {details: {id: 'i'}}];
      const newItemsPage1 = [{details: {id: 'a'}}, {details: {id: 'b'}}, {details: {id: 'c'}}];
      const newItemsPage2 = [{details: {id: 'd'}}, {details: {id: 'e'}}, {details: {id: 'f'}}];

      getCollectionItems
        .onFirstCall().returns(Promise.resolve({
          items: [...firstPageItems],
          nextInclusiveStartKey: 'xyz'
        }))
        .onSecondCall().returns(Promise.resolve({
          items: [...newItemsPage1],
          nextInclusiveStartKey: 'xyz'
        }))
        .onThirdCall().returns(Promise.resolve({
          items: [...newItemsPage2],
          nextInclusiveStartKey: 'xyz'
        }))
        .onCall(3).returns(Promise.resolve({
          items: [...firstPageItems],
          nextInclusiveStartKey: 'xyz'
        }))
      ;

      const collectionProvider = RemoteMediaCollectionProviderFactory.fromCollectionService(
        {getCollectionItems},
        defaultCollectionName,
        itemsPerPageCount,
        sortDirection
      );

      let callCount = 0;
      const subscription = collectionProvider.observable()
        .subscribe({
          next: collection => {
            switch (callCount) {

              case 0:
                expect(collection.items).to.be.length(3);
                collectionProvider.refresh();
                break;

              case 1:
                expect(collection.items).to.be.length(9);
                expect(collection.items).to.be.deep.equal([...newItemsPage1, ...newItemsPage2, ...firstPageItems]);
                subscription.unsubscribe();
                done();
                break;

            }
            ++callCount;
          }
        })
      ;
    });

  });

});
