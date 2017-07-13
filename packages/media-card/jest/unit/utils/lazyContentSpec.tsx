import * as React from 'react';
import { Component } from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { LazyContent } from '../../../src/utils';
import { LazyLoadCard } from '../../../src/root/card/styled';


describe('LazyContent', () => {
  class Placeholder extends Component<{}, {}> {
    render() {
      return <div>Loading</div>;
    }
  }

  class Content extends Component<{}, {}> {
    render() {
      return <div>Content</div>;
    }
  }

  const placeholder = <Placeholder />;
  const content = <Content />;

  it('should render placeholder and LazyCard when content is not visible', () => {
    const lazyContent = shallow(
      <LazyContent placeholder={placeholder}>
        {content}
      </LazyContent>
    );

    lazyContent.setState({isVisible: false});

    expect(lazyContent.find(Placeholder)).to.have.length(1);
    expect(lazyContent.find(LazyLoadCard)).to.have.length(1);
  });

  it('should not render the content if its not in the viewport', () => {
    const lazyContent = mount(
      <LazyContent placeholder={placeholder}>
        {content}
      </LazyContent>
    );

    lazyContent.setState({isVisible: false});
    expect(lazyContent.find(Content)).to.have.length(0);
  });


  it('should render the content when it becomes visible', () => {
    const lazyContent = shallow(
      <LazyContent placeholder={placeholder}>
        {content}
      </LazyContent>
    );

    lazyContent.setState({isVisible: true});
    expect(lazyContent.find(Placeholder)).to.have.length(0);
    expect(lazyContent.find(Content)).to.have.length(1);
  });
});
