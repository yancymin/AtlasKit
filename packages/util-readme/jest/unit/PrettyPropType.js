import { mount } from 'enzyme';
import React from 'react';

import PrettyPropType from '../../src/PrettyPropType';

describe('PrettyPropType', () => {
  it('skips simple prop types', () => {
    const el = mount(<PrettyPropType type={{ name: 'string' }} />);
    expect(el.children()).toHaveLength(0);
  });

  it('enumerates complex proptypes', () => {
    const wrapper = mount(<PrettyPropType
      type={{
        name: 'enum',
        value: [
          { value: "'default'" },
          { value: "'primary'" },
          { value: "'important'" },
          { value: "'added'" },
          { value: "'removed'" },
        ],
      }}
    />);
    expect(wrapper.text()).toEqual(expect.stringContaining("One of ('default''primary''important''added''removed')"));
  });
});
