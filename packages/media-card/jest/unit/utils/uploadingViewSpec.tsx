import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {CardActionType} from '@atlaskit/media-core';

import {UploadingView} from '../../../src/utils/uploadingView';
import {MediaImage, Menu} from '../../../src/utils';

describe('UploadingView', () => {
  it('should not render the cancel action when deleteAction is not provided', () => {
    const card = shallow(<UploadingView progress={0}/>);
    expect(card.find(Menu)).to.have.length(0);
  });

  it('should not render the cancel action when an action that is not type delete is provided', () => {
    const randomAction = {label: 'Close', type: undefined, handler: () => {}};
    const card = shallow(<UploadingView progress={0} deleteAction={randomAction} />);
    expect(card.find(Menu)).to.have.length(0);
  });

  it('should render the cancel action when a deleteAction is provided', () => {
    const deleteAction = {label: 'Delete', type: CardActionType.delete, handler: () => {}};
    const card = shallow(<UploadingView progress={0} deleteAction={deleteAction}/>);
    expect(card.find(Menu)).to.have.length(1);
  });

  it('should not render the image when dataURI is not provided', () => {
    const card = shallow(<UploadingView progress={0}/>);
    expect(card.find(MediaImage)).to.have.length(0);
  });

  it('should render the image when dataURI is provided', () => {
    const card = shallow(<UploadingView progress={0} dataURI="data:png"/>);
    expect(card.find(MediaImage)).to.have.length(1);
  });
});
