import * as React from 'react';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { FileCardViewSmall, FileCardViewSmallProps } from '../../../src/files';
import { FileIcon, ErrorIcon } from '../../../src/utils/index';

describe('FileCardViewSmall', () => {
  it('should display a file icon when loading', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        loading={true}
      />);
    expect(cardView.find('.loading')).to.have.lengthOf(1);
  });

  it('should display image when image loaded', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        mediaName={'some-name'}
        mediaType={'image'}
        mediaSize={1024}
        dataURI={'some-data-uri'}
      />) as any;

    expect(cardView.find('.media-card').first().props().style.backgroundImage).to.contain('some-data-uri');
    expect(cardView.find('.title').first().text()).to.equal('some-name');
    expect(cardView.find('.size').first().text()).to.equal('1 KB');
  });

  it('should display file icon when file loaded and dataURI is undefined', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        mediaName={'some-audio'}
        mediaType={'audio'}
        mediaSize={1024}
      />);

    expect(cardView.find(FileIcon).length).to.equal(1);
    expect(cardView.find('.title').first().text()).to.equal('some-audio');
    expect(cardView.find('.size').first().text()).to.equal('1 KB');
  });

  it('should display error and try again message when error with handler passed', () => {
    // We need to be sure that we can click on the "Try again" message and this click doesn't trigger
    // click on the card
    const errorActionMock = sinon.spy();
    const onClickMock = sinon.spy();

    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        error={'some-error'}
        onRetry={{handler: errorActionMock}}
        onClick={onClickMock}
      />);

    expect(cardView.find(ErrorIcon).length).to.equal(1);
    expect(cardView.find('.error').length).to.equal(1);
    expect(cardView.find('.retry').length).to.equal(1);

    cardView.simulate('click');
    expect(onClickMock.callCount).to.equal(1);

    cardView.find('.retry').first().childAt(0).simulate('click');
    expect(errorActionMock.callCount).to.equal(1);
    expect(onClickMock.callCount).to.equal(1);
  });

  it('should display error when error without handler passed', () => {
    const cardView = mount<FileCardViewSmallProps, {}>(
      <FileCardViewSmall
        error={'some-error'}
      />);

    expect(cardView.find(ErrorIcon).length).to.equal(1);
    expect(cardView.find('.error').length).to.equal(1);
    expect(cardView.find('.retry').length).to.equal(0);
  });

  it('should pass onClick handlers through to root component', () => {
    const handler = () => {};
    const card = shallow(<FileCardViewSmall onClick={handler} />);

    expect(card.props().onClick).to.deep.equal(handler);
  });

  it('should pass onMouseEnter handlers through to root component', () => {
    const handler = () => {};
    const card = shallow(<FileCardViewSmall onMouseEnter={handler} />);

    expect(card.props().onMouseEnter).to.deep.equal(handler);
  });
});
