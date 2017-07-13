import { mount } from 'enzyme';
import React from 'react';

import DynamicProps from '../../src/DynamicProps';

describe('DynamicProps', () => {
  it('renders a placeholder when there are no proptypes', () => {
    const componentSrc = `
export default class MyComponent extends React.Component {
  render() {
    return '';
  }
}`;
    expect(mount(<DynamicProps componentSrc={componentSrc} />).text()).toEqual(expect.stringContaining('There are no props for this component'));
  });

  it('does not render the placeholder when there are proptypes', () => {
    const componentSrc = `
export default class MyComponent extends React.Component {
  static propTypes = {
    foo: PropTypes.string,
  }
  render() {
    return '';
  }
}`;
    const wrapper = mount(<DynamicProps componentSrc={componentSrc} />);
    expect(wrapper.text()).not.toEqual(expect.stringContaining('There are no props for this component'));
    expect(wrapper.find('h3').text()).toEqual(expect.stringContaining('foo'));
  });

  it('renders a custom name when provided', () => {
    const componentSrc = `
export default class MyComponent extends React.Component {
  render() {
    return '';
  }
}`;
    const wrapper = mount(<DynamicProps componentName="Custom" componentSrc={componentSrc} />);
    expect(wrapper.find('h2').text()).toEqual(expect.stringContaining('Custom Props'));
  });
});
