import React, { PureComponent } from 'react';
import { mount } from 'enzyme';
import GlobalSecondaryActions from '../../src/components/js/GlobalSecondaryActions';

const describe = window.describe;
const it = window.it;

class Child extends PureComponent {
  render() {
    return <div>Hi there</div>;
  }
}

describe('<GlobalSecondaryActions />', () => {
  it('should render secondary items', () => {
    const wrapper = mount(
      <GlobalSecondaryActions
        actions={[<Child />, <Child />]}
      />
    );

    expect(wrapper.find(Child).length).toBe(2);
  });

  it('should throw an error if attempting to render with more than four secondary actions', () => {
    const mountWithTooManyActions = () => mount(
      <GlobalSecondaryActions
        actions={[<Child />, <Child />, <Child />, <Child />, <Child />]}
      />
    );
    expect(mountWithTooManyActions).toThrow();
  });

  it('should throw an error if attempting to update with more than four secondary actions', () => {
    const wrapper = mount(
      <GlobalSecondaryActions actions={[]} />
    );

    const updateWithTooManyActions = () =>
      wrapper.setProps('actions', [<Child />, <Child />, <Child />, <Child />, <Child />]);

    expect(updateWithTooManyActions).toThrow();
  });
});
