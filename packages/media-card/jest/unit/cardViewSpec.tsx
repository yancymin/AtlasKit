/* tslint:disable */ //:no-unused-expressions
import * as React from 'react';
import * as sinon from 'sinon';

import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {FileDetails, LinkDetails} from '@atlaskit/media-core';

import {CardView} from '../../src/root/cardView';
import {LinkCard} from '../../src/links';
import {FileCard} from '../../src/files';

describe('CardView', () => {
  const file: FileDetails = {
    id: 'abcd',
    name: 'my-file'
  };
  const link: LinkDetails = {
    id: 'abcd',
    type: 'wha',
    url: 'https://example.com',
    title: 'foobar'
  };

  it('should render FileCard when no metadata is passed', () => {
    const element = shallow(
      <CardView
        status="loading"
        appearance="small"
      />
    );
    const linkCard = element.find(FileCard);
    expect(linkCard).to.be.length(1);
  });

  it('should render LinkCard with details', () => {
    const element = shallow(
      <CardView
        status="loading"
        metadata={link}
        appearance="small"
      />
    );

    const linkCard = element.find(LinkCard);
    expect(linkCard).to.be.length(1);
    expect(linkCard.props().details).to.equal(link);
  });

  it('should render LinkCard with other props', () => {
    const element = shallow(
      <CardView
        status="loading"
        metadata={link}
        appearance="small"
      />
    );

    const linkCard = element.find(LinkCard);
    expect(linkCard).to.be.length(1);
    expect(linkCard.prop('appearance')).to.equal('small');
  });

  it('should render FileCard with details', () => {
    const element = shallow(
      <CardView
        status="loading"
        metadata={file}
        appearance="small"
      />
    );

    const card = element.find(FileCard);
    expect(card).to.be.length(1);
    expect(card.props().details).to.equal(file);
  });

  it('should render FileCard with other props', () => {
    const element = shallow(
      <CardView
        status="loading"
        metadata={file}
        appearance="small"
      />
    );

    const fileCard = element.find(FileCard);
    expect(fileCard).to.be.length(1);
    expect(fileCard.prop('appearance')).to.equal('small');
  });

  it('should render LinkCard and NOT use details to determine which card to render when mediaItemType is "link"', () => {
    const element = shallow(
      <CardView
        mediaItemType="link"
        status="loading"
        metadata={file}
      />
    );

    const linkCard = element.find(LinkCard);
    expect(linkCard).to.be.length(1);
  });

  it('should render FileCard and NOT use details to determine which card to render when mediaItemType is "file"', () => {
    const element = shallow(
      <CardView
        mediaItemType="file"
        status="loading"
        metadata={link}
      />
    );

    const linkCard = element.find(FileCard);
    expect(linkCard).to.be.length(1);
  });

  it('should fire onClick and onMouseEnter events when file details are passed in', () => {
    const clickHandler = sinon.spy();
    const hoverHandler = sinon.spy();
    const card = mount(<CardView status="loading" metadata={file} onClick={clickHandler} onMouseEnter={hoverHandler} />);

    card.simulate('click');
    card.simulate('mouseEnter');

    expect(clickHandler.calledOnce).to.be.true;
    const clickHandlerArg = clickHandler.firstCall.args[0];
    expect(clickHandlerArg.mediaItemDetails).to.deep.equal(file);

    expect(hoverHandler.calledOnce).to.be.true;
    const hoverHandlerArg = hoverHandler.firstCall.args[0];
    expect(hoverHandlerArg.mediaItemDetails).to.deep.equal(file);
  });

  it('should fire onClick and onMouseEnter events when link details are passed in', () => {
    const clickHandler = sinon.spy();
    const hoverHandler = sinon.spy();
    const card = shallow(<CardView status="loading" metadata={link} onClick={clickHandler} onMouseEnter={hoverHandler} />);

    card.simulate('click');
    card.simulate('mouseEnter');

    expect(clickHandler.calledOnce).to.be.true;
    const clickHandlerArg = clickHandler.firstCall.args[0];
    expect(clickHandlerArg.mediaItemDetails).to.deep.equal(link);

    expect(hoverHandler.calledOnce).to.be.true;
    const hoverHandlerArg = hoverHandler.firstCall.args[0];
    expect(hoverHandlerArg.mediaItemDetails).to.deep.equal(link);
  });

  it('should NOT fire onSelectChange when card is NOT selectable', () => {
    const handler = sinon.spy();
    const card = shallow(<CardView status="loading" metadata={file} onSelectChange={handler} />);
    card.setProps({selected: true});

    expect(handler.called).to.be.false;
  });

  it('should fire onSelectChange when selected state is changed by the consumer and selectable is true', () => {
    const handler = sinon.spy();
    const card = shallow(<CardView status="loading" metadata={file} onSelectChange={handler} selectable={true} />);
    card.setProps({selected: true});

    expect(handler.calledOnce).to.be.true;
    expect(handler.firstCall.args[0]).to.deep.equal({selected: true, mediaItemDetails: file});
  });

  it('should render a cropped image by default', () => {
    const card = mount(<CardView status="complete" dataURI="a" metadata={file}/>);

    expect(card.find('MediaImage').prop('crop')).to.be.true;
  });

  it('should render not render a cropped image if we specify a different resizeMode', () => {
    const card = mount(<CardView status="complete" dataURI="a" metadata={file} resizeMode="full-fit"/>);

    expect(card.find('MediaImage').prop('crop')).to.be.false;
  });
});
