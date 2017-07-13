import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { CardContent } from '../../../src/utils/cardImageView/cardContent';
import { MediaImage } from '../../../src/utils/mediaImage';

describe('CardOverlay', () => {
  it('should render the image preview when mediaType is "video"', function() {
    const card = shallow(<CardContent mediaType="video" dataURI="some-data-uri" />);
    expect(card.find(MediaImage)).to.have.length(1);
  });

  it('should render the image preview when mediaType is "audio"', function() {
    const card = shallow(<CardContent mediaType="audio" dataURI="some-data-uri" />);
    expect(card.find(MediaImage)).to.have.length(1);
  });

  it('should render the image preview when mediaType is "image"', function() {
    const card = shallow(<CardContent mediaType="image" dataURI="some-data-uri" />);
    expect(card.find(MediaImage)).to.have.length(1);
  });

  it('should NOT render the image preview when mediaType is "doc"', function() {
    const card = shallow(<CardContent mediaType="doc" dataURI="some-data-uri" />);
    expect(card.find(MediaImage)).to.have.length(0);
  });

  it('should NOT render the image preview when data URI is undefined', function() {
    const card = shallow(<CardContent mediaType="video" />);
    expect(card.find(MediaImage)).to.have.length(0);
  });
});

