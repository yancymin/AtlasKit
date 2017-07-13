import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import MediaGroup, { LargeCard, FilmStripWrapper } from '../../../src/nodes/mediaGroup';
import Media, { MediaNode } from '../../../src/nodes/media';

describe('MediaGroup', () => {
  const mediaNode1: MediaNode = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample'
    }
  };

  const mediaNode2: MediaNode = { ...mediaNode1 };

  it('should wrap content in a FilmStripWrapper component', () => {
    const mediaGroupSmall = mount(<MediaGroup><Media item={mediaNode1}/></MediaGroup>);
    expect(mediaGroupSmall.find(FilmStripWrapper)).to.have.length(1);

    const mediaGroupLarge = mount(<MediaGroup><Media item={mediaNode1}/><Media item={mediaNode2}/></MediaGroup>);
    expect(mediaGroupLarge.find(FilmStripWrapper)).to.have.length(1);
  });

  it('should render only child with large card dimensions', () => {
    const mediaGroup = shallow(<MediaGroup><Media item={mediaNode1}/></MediaGroup>);
    const wrapperProps = mediaGroup.find(Media).props();
    expect(wrapperProps.cardDimensions).to.equal(LargeCard);
  });

  it('should render children with their own card dimensions', () => {
    const mediaGroup = shallow(<MediaGroup><Media item={mediaNode1}/><Media item={mediaNode2}/></MediaGroup>);
    const mediaNodes =  mediaGroup.find(Media);
    expect(mediaNodes).to.have.length(2);

    mediaNodes.forEach(media => {
      const wrapperProps = media.props();
      expect(wrapperProps.cardDimensions).to.not.equal(LargeCard);
    });
  });

  it('should always render a FilmStripNavigator component', () => {
    const mediaGroupSmall = mount(<MediaGroup><Media item={mediaNode1}/></MediaGroup>);
    expect(mediaGroupSmall.find(FilmStripNavigator)).to.have.length(1);

    const mediaGroupLarge = mount(<MediaGroup><Media item={mediaNode1}/><Media item={mediaNode2}/></MediaGroup>);
    expect(mediaGroupLarge.find(FilmStripNavigator)).to.have.length(1);
  });

});
