/* tslint:disable:no-unused-expression */
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { CardImageView } from '../../../src/utils/cardImageView';
import { FileIcon } from '../../../src/utils';
import { CardOverlay } from '../../../src/utils/cardImageView/cardOverlay';
import { UploadingView } from '../../../src/utils/uploadingView';

describe('CardImageView', () => {
  it('should render default icon according to mediaType', () => {
    const card = mount(<CardImageView mediaType="audio" status="complete"/>);
    expect(card.find(FileIcon).props().mediaType).to.equal('audio');
  });

  it('should render a custom icon when provided', () => {
    const iconUrl = 'path/to/icon';
    const card = mount(<CardImageView icon={iconUrl} status="complete"/>);

    expect(card.find('.custom-icon')).to.have.length(1);
    expect(card.find('.custom-icon').prop('src')).to.equal(iconUrl);
  });

  it('should render subtitle when provided', function() {
    const subtitle = 'Software Development and Collaboration Tools';
    const card = mount(<CardImageView subtitle={subtitle} status="complete" />);

    expect(card.find(CardOverlay).props().subtitle).to.equal(subtitle);
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "video"', function() {
    const card = shallow(<CardImageView mediaType="video" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.false;
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "audio"', function() {
    const card = shallow(<CardImageView mediaType="audio" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.false;
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "image"', function() {
    const card = shallow(<CardImageView mediaType="image" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.false;
  });

  it('should render the overlay as persistent when dataURI is a string and mediaType is "doc"', function() {
    const card = shallow(<CardImageView mediaType="doc" dataURI="some-data-uri" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.true;
  });

  it('should render the overlay as persistent when dataURI is undefined', function() {
    const card = shallow(<CardImageView mediaType="video" status="complete" />);

    expect(card.find(CardOverlay).props().persistent).to.be.true;
  });

  it('should render the UploadView with no overlay when status=uploading and card is NOT selectable', () => {
    const card = shallow(<CardImageView status="uploading" mediaName="foo" progress={90}/>);
    const uploadView = card.find(UploadingView);
    expect(uploadView).to.be.length(1);
    expect(uploadView.props()).to.include({
      title: 'foo',
      progress: 90
    });

    const overlay = card.find(CardOverlay);
    expect(overlay).to.have.length(0);
  });

  it('should render the UploadView with an overlay when status=uploading and card is selectable', () => {
    const card = shallow(<CardImageView status="uploading" mediaName="foo" progress={90} selectable={true} />);
    const uploadView = card.find(UploadingView);
    expect(uploadView).to.be.length(1);
    expect(uploadView.props()).to.include({
      title: 'foo',
      progress: 90
    });

    const overlay = card.find(CardOverlay);
    expect(overlay).to.have.length(1);
    expect(overlay.props()).to.include({
      persistent: true,
      selectable: true,
      selected: undefined
    });
  });

  it('should fire onClick when component is clicked', () => {
    const event = 'some-random-event';
    const handler = sinon.spy();
    const card = shallow(<CardImageView onClick={handler} />);

    card.simulate('click', event);
    expect(handler.calledOnce).to.be.true;
    expect(handler.calledOnce).to.be.true;
    expect(handler.firstCall.args[0]).to.deep.equal(event);
  });

  it('should fire onMouseEnter when component is hovered', () => {
    const event = 'some-random-event';
    const handler = sinon.spy();
    const card = shallow(<CardImageView onMouseEnter={handler} />);

    card.simulate('mouseEnter', event);
    expect(handler.calledOnce).to.be.true;
    expect(handler.calledOnce).to.be.true;
    expect(handler.firstCall.args[0]).to.deep.equal(event);
  });
});
