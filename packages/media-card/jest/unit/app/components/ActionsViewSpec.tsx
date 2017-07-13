import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {AppCardAction} from '../../../../src/app/model';
import {ActionsView} from '../../../../src/app/components/ActionsView';
import Button from '@atlaskit/button';
import DropdownMenu from '@atlaskit/dropdown-menu';
import {ActionsMenu} from '../../../../src/app/styled/ActionsView';

describe('ActionsView', () => {

  it('should render no button and no menu items when there are zero actions', () => {
    const actions: AppCardAction[] = [];
    const element = shallow(<ActionsView actions={actions} isInversed={false}/>);
    expect(element.find(Button)).to.have.length(0);
    expect(element.find(ActionsMenu)).to.have.length(0);
  });

  it('should render a button and zero menu items when there is one action', () => {
    const actions: AppCardAction[] = [{title: 'Open'}];
    const element = shallow(<ActionsView actions={actions} isInversed={false}/>);
    expect(element.find(Button)).to.have.length(1);
    expect(element.find(ActionsMenu)).to.have.length(0);
  });

  it('should render a button and two menu items when there are more than one actions', () => {
    const actions: AppCardAction[] = [
      {title: 'Open'},
      {title: 'View'},
      {title: 'Reply'}
    ];
    const element = shallow(<ActionsView actions={actions} isInversed={false}/>);
    expect(element.find(Button)).to.have.length(2);
    expect(element.find(DropdownMenu)).to.have.length(1);
    const groups: Array<any> = element.find(DropdownMenu).prop('items');
    expect(groups).to.be.an('array').to.have.length(1);
    expect(groups[0].items).to.be.an('array').to.have.length(2);
    expect(groups[0].items[0]).to.have.property('content', 'View');
    expect(groups[0].items[1]).to.have.property('content', 'Reply');
  });

});
