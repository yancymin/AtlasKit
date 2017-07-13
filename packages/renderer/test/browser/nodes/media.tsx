import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { MediaProvider } from '@atlaskit/media-core';
import {
  Card,
  CardProps,
  CardView,
  CardViewProps,
  MediaIdentifier,
} from '@atlaskit/media-card';
import Media, { MediaNode } from '../../../src/nodes/media';

const mediaProvider: Promise<MediaProvider> = Promise.resolve({
  viewContext: Promise.resolve({})
});

describe('Media', () => {

  const mediaNode = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  } as MediaNode;

  it('should render a CardView component if there is no mediaProvider prop', () => {
    const mediaComponent = shallow(<Media item={mediaNode}/>);
    const props: CardViewProps = mediaComponent.find(CardView).props();
    expect(mediaComponent.find(CardView).length).to.equal(1);
    expect(props.mediaItemType).to.equal('file');
    expect(props.status).to.equal('loading');
  });

  it('should render a Card component if it has a mediaProvider property', async () => {
    const mediaComponent = shallow(<Media item={mediaNode}/>);
    expect(mediaComponent.find(CardView).length).to.equal(1);

    mediaComponent.setProps({ mediaProvider });
    const resolvedMediaProvider = await mediaProvider;
    await resolvedMediaProvider.viewContext;

    expect(mediaComponent.find(CardView).length).to.equal(0);
    expect(mediaComponent.find(Card).length).to.equal(1);
  });

  it('should render a Card component with the proper props', async () => {
    const mediaComponent = shallow(<Media item={mediaNode} mediaProvider={mediaProvider}/>);
    const resolvedMediaProvider = await mediaProvider;
    await resolvedMediaProvider.viewContext;

    expect(mediaComponent.find(Card).length).to.equal(1);

    const cardProps: CardProps = mediaComponent.find(Card).props();
    const identifier = cardProps.identifier as MediaIdentifier;
    expect(identifier.id).to.equal('5556346b-b081-482b-bc4a-4faca8ecd2de');
    expect(identifier.collectionName).to.equal('MediaServicesSample');
  });

});
