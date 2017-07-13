import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { FileCardImageView } from '../../../src/files';
import { CardOverlay } from '../../../src/utils/cardImageView/cardOverlay';

describe('FileCardView', () => {
  it('should render card with non-persisting overlay when supplied mediaType is "image" and dataUri string is supplied', function() {
    const card = mount(<FileCardImageView mediaType="image" dataURI="data" status="complete"/>);
    expect(card.find(CardOverlay).props().persistent).to.deep.equal(false);
  });

  it('should render empty wrapper when error prop is true', function() {
    const card = mount(<FileCardImageView error="Some random error occurred" status="error" />);
    expect(card.find('.wrapper').children()).to.have.length(0);
  });

  it('should render card overlay with the error prop true when supplied error prop is true', function() {
    const errorStr = 'Some random error occurred';
    const card = mount(<FileCardImageView error={errorStr} status="error" />);
    expect(card.find(CardOverlay).props().error).to.deep.equal(errorStr);
  });

  it('should NOT render an overlay when loading prop is true', function() {
    const card = mount(<FileCardImageView status="loading" />);
    expect(card.find(CardOverlay)).to.have.length(0);
  });

  it('should pass onClick handlers through to root component', () => {
    const handler = () => {};
    const card = shallow(<FileCardImageView status="loading" onClick={handler} />);

    expect(card.props().onClick).to.deep.equal(handler);
  });

  it('should pass onMouseEnter handlers through to root component', () => {
    const handler = () => {};
    const card = shallow(<FileCardImageView status="loading" onMouseEnter={handler} />);

    expect(card.props().onMouseEnter).to.deep.equal(handler);
  });
});
