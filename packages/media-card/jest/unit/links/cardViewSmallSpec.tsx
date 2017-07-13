import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import { LinkCardViewSmall } from '../../../src/links';
import { CardGenericViewSmall } from '../../../src/utils/cardGenericViewSmall';
import { Href } from '../../../src/utils/href';
import { Title, Size, LoadingWrapper } from '../../../src/utils/cardGenericViewSmall/styled';

describe('LinkCardViewSmall', () => {
  const title = 'Hello world';
  const linkUrl = 'http://localhost:9001/';

  it('should only render the title and linkUrl when not supplied with optional props', () => {
    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl}/>);

    expect(card.find(Title).text()).to.eql(title);
    expect(card.find(Size).text()).to.eql(linkUrl);
    expect(card.find('.media-card')).to.have.length(0);
  });

  it('should render a thumnail when supplied', () => {
    const thumbnailUrl = 'http://localhost:9001/some/thumbnail';

    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl} thumbnailUrl={thumbnailUrl} />) as any;

    expect(card.find('.media-card')).to.have.length(1);
    expect(card.find('.media-card').props().style.backgroundImage).to.contain(thumbnailUrl);
  });

  it('should render loading placeholders', () => {
    const card = mount(<LinkCardViewSmall title={title} linkUrl={linkUrl} loading={true} />);

    expect(card.find(LoadingWrapper)).to.have.length(1);
    expect(card.find('.media-card')).to.have.length(0);
  });

  it('should pass the site name to CardGenericViewSmall as subtitle prop instead of the link url when it is a string', () => {
    const site = 'Some random site name';
    const card = shallow(<LinkCardViewSmall title={title} site={site} linkUrl={linkUrl} loading={true} />);

    expect(card.find(CardGenericViewSmall).props().subtitle).to.deep.equal(site);
  });

  it('should pass onClick handlers through to the generic view component', () => {
    const handler = () => {};
    const card = shallow(<LinkCardViewSmall title={title} linkUrl={linkUrl} onClick={handler} />);

    expect(card.find(CardGenericViewSmall).props().onClick).to.deep.equal(handler);
  });

  it('should pass onMouseEnter handlers through to the generic view component', () => {
    const handler = () => {};
    const card = shallow(<LinkCardViewSmall title={title} linkUrl={linkUrl} onMouseEnter={handler} />);

    expect(card.find(CardGenericViewSmall).props().onMouseEnter).to.deep.equal(handler);
  });

  it('should not render a link tag when loading is "true"', () => {
    const card = shallow(<LinkCardViewSmall title={title} linkUrl={linkUrl} loading={true} />);
    expect(card.find(Href)).to.have.length(0);
  });

  it('should not render a link tag when error is truthy', () => {
    const card = shallow(<LinkCardViewSmall title={title} linkUrl={linkUrl} error="some error occurred" />);
    expect(card.find(Href)).to.have.length(0);
  });
});
