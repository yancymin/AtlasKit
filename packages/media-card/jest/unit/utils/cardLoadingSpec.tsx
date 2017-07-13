import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FileIcon from '@atlaskit/icon/glyph/file';
import LinkIcon from '@atlaskit/icon/glyph/link';

import { CardLoading } from '../../../src/utils';

describe.skip('CardLoading', () => {
  it('should render the right icon based on the itemType', () => {
    const fileLoading = shallow(<CardLoading mediaItemType="file" />);
    const linkLoading = shallow(<CardLoading mediaItemType="link" />);

    expect(fileLoading.find(FileIcon)).to.have.length(1);
    expect(linkLoading.find(LinkIcon)).to.have.length(1);
  });

  it('should render icon with the right size', () => {
    const smallLoadingCard = shallow(<CardLoading mediaItemType="link" iconSize="small"/>);
    const largeLoadingCard = shallow(<CardLoading mediaItemType="file" iconSize="large"/>);
    const defaultLoadingSize = shallow(<CardLoading mediaItemType="link"/>);

    expect(smallLoadingCard.find(LinkIcon).props().size).to.equal('small');
    expect(largeLoadingCard.find(FileIcon).props().size).to.equal('large');
    expect(defaultLoadingSize.find(LinkIcon).props().size).to.equal('medium');
  });
});
