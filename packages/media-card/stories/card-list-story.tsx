import * as React from 'react';
import { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { MediaCollection, MediaCollectionItem } from '@atlaskit/media-core';
import { StoryList, createStorybookContext, collectionNames, defaultCollectionName} from '@atlaskit/media-test-helpers';
import { CardList, CardListEvent } from '../src';
import { CardSwitcherWrapper, CardSwitcherRow, CardSwitcherBtn, CardSwitcherTitle } from './styled';

const wrongCollection = 'adfasdf';
const wrongClientId = 'wrong-client-id';

// TODO: Add CollectionCardDelete into media-core. see: https://jira.atlassian.com/browse/FIL-4004
// const deleteAction = CollectionCardDelete((item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
//   action('delete')(item, items);
// });

const anotherAction = {
  type: -2,
  label: 'Some other action',
  handler: (item: MediaCollectionItem, collection: MediaCollection, e?: Event) => {
    action('Some other action')(item, collection);
  }
};

const annotateAction = {
  type: -1,
  label: 'Annotate',
  handler: (item: MediaCollectionItem, collection: MediaCollection, e?: Event) => {
    action('annotate')(item, collection);
  }
};

// TODO: Add deleteAction back to story. see: https://jira.atlassian.com/browse/FIL-4004
const cardsActions = [/*deleteAction, */anotherAction, annotateAction];
const context = createStorybookContext();
const wrongContext = createStorybookContext(wrongClientId);

storiesOf('CardList', {})
  .add('Normal cards', () => (
    <CardList
      context={context}
      collectionName={defaultCollectionName}
    />
  ))
  .add('No lazy loading', () => (
    <CardList
      context={context}
      collectionName={defaultCollectionName}
      shouldLazyLoadCards={false}
    />
  ))
  .add('Loaded list toggling', () => {
    interface CardSwitcherProps {
      delay?: number;
      dataURI?: string;
    }

    interface CardSwitcherState {
      collectionName: string;
    }

    class CardSwitcher extends Component<CardSwitcherProps, CardSwitcherState> {
      constructor(props) {
        super(props);
        this.state = {collectionName: this.collections[0]};
      }

      render() {
        const {toggle} = this;
        const {collectionName} = this.state;

        return (
          <CardSwitcherWrapper>
            <CardSwitcherRow>
              <div>NO infinite scroll</div>
              <CardSwitcherBtn onClick={toggle}>Toggle collection</CardSwitcherBtn>
              <CardSwitcherTitle>{collectionName}</CardSwitcherTitle>
              <CardList
                context={context}
                collectionName={collectionName}
                pageSize={30}
                cardAppearance={'small'}
              />
            </CardSwitcherRow>
            <CardSwitcherRow>
              <div>With infinite scroll</div>
              <CardSwitcherBtn onClick={toggle}>Toggle collection</CardSwitcherBtn>
              <CardSwitcherTitle>{collectionName}</CardSwitcherTitle>
              <CardList
                context={context}
                collectionName={collectionName}
                pageSize={20}
                height={320}
                useInfiniteScroll={true}
                cardAppearance={'small'}
              />
            </CardSwitcherRow>
          </CardSwitcherWrapper>
        );
      }

      private get collections() {
        return collectionNames;
      }

      toggle = () => {
        const index = this.collections.indexOf(this.state.collectionName) === 0 ? 1 : 0;

        this.setState({collectionName: this.collections[index]});
      }
    }

    return <CardSwitcher />;
  })
  .add('Caching', () => (
     <StoryList>
       {[{
         title: 'Normal card',
         content: <CardList
           context={context}
           collectionName={defaultCollectionName}
           pageSize={30}
         />
       }, {
         title: 'Small card',
         content: <CardList
           context={context}
           collectionName={defaultCollectionName}
           pageSize={30}
           cardAppearance={'small'}
         />
       }, {
         title: 'Small card',
         content: <CardList
           context={context}
           collectionName={defaultCollectionName}
           pageSize={30}
           cardAppearance={'small'}
         />
       }, {
         title: 'Normal Card',
         content: <CardList
           context={context}
           collectionName={defaultCollectionName}
           pageSize={30}
         />
       }, {
         title: 'Normal card',
         content: <CardList
           context={context}
           collectionName={defaultCollectionName}
           pageSize={30}
         />
       }, {
         title: 'Normal card',
         content: <CardList
           context={context}
           collectionName={defaultCollectionName}
           pageSize={30}
         />
       }]}
     </StoryList>
   ))
   .add('Small cards', () => (
     <StoryList>
       {[{
         title: 'No parent width',
         content: <div style={{border: '1px solid', overflow: 'hidden'}}>
           <CardList
             context={context}
             collectionName={defaultCollectionName}
             cardAppearance={'small'}
           />
         </div>
       }, {
         title: 'Small parent width',
         content: <div style={{border: '1px solid', width: '50px', overflow: 'hidden'}}>
           <CardList
             context={context}
             collectionName={defaultCollectionName}
             cardAppearance={'small'}
           />
         </div>
       }, {
         title: 'Large parent width',
         content: (
            <div style={{border: '1px solid', width: '400px', overflow: 'hidden'}}>
              <CardList
                context={context}
                collectionName={defaultCollectionName}
                cardAppearance="small"
              />
          </div>
          )
       }]}
     </StoryList>
   ))
   .add('Actions and exposed events', () => {
     const cardClickHandler = (result: CardListEvent) => {
       result.event.preventDefault();
       action('click')([result.mediaCollectionItem, result.collectionName]);
     };

     const cardLists = [
       {
          title: 'Actions',
          content: (
            <CardList
              context={context}
              collectionName={defaultCollectionName}
              actions={cardsActions}
            />
          )
       },
       {
          title: 'onCardClick',
          content: (
            <CardList
              context={context}
              collectionName={defaultCollectionName}
              onCardClick={cardClickHandler}
            />
          )
       }
     ];

     return (
       <div style={{margin: '40px'}}>
         <StoryList>
           {cardLists}
         </StoryList>
       </div>
     );
   })
   .add('Custom loading state', () => {
     const customLoadingComponent = <div>this is a custom loading...</div>;
     return <CardList
       context={context}
       loadingComponent={customLoadingComponent}
       collectionName={defaultCollectionName}
       actions={cardsActions}
     />;
   })
   .add('Custom error state', () => {
     const style = {
       color: 'red',
       fontSize: '30px'
     };
     const customErrorComponent = <div style={style}>Something went wrong :\</div>;
     return <CardList
       context={wrongContext}
       errorComponent={customErrorComponent}
       collectionName={wrongCollection}
       actions={cardsActions}
     />;
   })
   .add('Custom empty state', () => {
     const customEmptyComponent = <div>No items (this is a custom component)</div>;
     return <CardList
       context={context}
       emptyComponent={customEmptyComponent}
       collectionName={wrongCollection}
       actions={cardsActions}
     />;
   })
   .add('With pageSize (3)', () => {
     return <CardList
       context={context}
       collectionName={defaultCollectionName}
       actions={cardsActions}
       pageSize={3}
     />;
   })
  .add('With Card Width and Height', () => {
    return <CardList
      context={context}
      collectionName={defaultCollectionName}
      cardDimensions={{width: '200px', height: '100px'}}
      actions={cardsActions}
      pageSize={3}
    />;
  })
  .add('With infinite scroll', () => {
    return <div >
      <CardList
        context={context}
        collectionName={defaultCollectionName}
        actions={cardsActions}
        pageSize={10}
        height={500}
      />
    </div>;
  })
  .add('With infinite scroll with small cards', () => {
    return <div style={{display: 'inline-block', width: '300px', background: 'white', border: '2px solid'}}>
      <CardList
        context={context}
        collectionName={defaultCollectionName}
        actions={cardsActions}
        cardAppearance="small"
        pageSize={20}
        height={500}
      />
    </div>;
  })
  .add('With infinite scroll and card width', () => {
    return <CardList
      context={context}
      collectionName={defaultCollectionName}
      cardDimensions={{width: '200px', height: '100px'}}
      actions={cardsActions}
      pageSize={10}
      height={500}
    />;
  })
  .add('With infinite scroll and no lazy loading', () => (
    <CardList
      context={context}
      collectionName={defaultCollectionName}
      actions={cardsActions}
      pageSize={10}
      height={500}
      shouldLazyLoadCards={false}
    />
  ))
  .add('Refresh cards', () => {

    const sampleURLs = [
      'https://instagram.fmel2-1.fna.fbcdn.net/t51.2885-15/s750x750/sh0.08/e35/18013123_289517061492259_5387236423503970304_n.jpg',
      'https://instagram.fmel2-1.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p750x750/17932355_1414135458643877_7397381955274145792_n.jpg',
      'https://instagram.fmel2-1.fna.fbcdn.net/t51.2885-15/e35/17934651_290135948064496_9023380363640045568_n.jpg',
      'https://instagram.fmel2-1.fna.fbcdn.net/t51.2885-15/e35/18013337_1868376446765095_7156944441888997376_n.jpg',
      'https://instagram.fmel2-1.fna.fbcdn.net/t50.2886-16/17993161_923799904389578_6802183987235127296_n.mp4',
      'https://instagram.fmel2-1.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/18013865_724397224396655_6018996846838415360_n.jpg'
    ];

    const handleAddItem = () => {
      const url = sampleURLs[Math.floor(Math.random() * sampleURLs.length)];
      context.getUrlPreviewProvider(url).observable().subscribe(
        metadata => context.addLinkItem(url, defaultCollectionName, metadata)
      );
    };

    const handleRefresh = () => {
      context.refreshCollection(defaultCollectionName, 10);
    };

    const RefreshDemo = (): JSX.Element => { // tslint:disable-line:variable-name
      return (
        <div style={{display: 'flex'}}>
          <div style={{width: '25%'}}>
            <CardList
              context={context}
              pageSize={10}
              collectionName={defaultCollectionName}
            />
          </div>
          <div style={{width: '25%'}}>
            <CardList
              context={context}
              pageSize={10}
              collectionName={defaultCollectionName}
              cardAppearance="small"
            />
          </div>
          <div>
            <button onClick={handleAddItem}>Add an item to the collection</button>
            <button onClick={handleRefresh}>Refresh the collection</button>
          </div>
        </div>
      );
    };

    return <RefreshDemo />;
  });
