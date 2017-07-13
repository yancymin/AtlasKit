import { shallow } from 'enzyme';
import React from 'react';

import Heading from '../../src/Heading';

describe('Heading', () => {
  it('defaults type to 1', () => {
    expect(shallow(<Heading>a</Heading>).type()).toBe('h1');
  });

  it('uses type to control the h tag used', () => {
    expect(shallow(<Heading type={3}>a</Heading>).type()).toBe('h3');
  });

  it('wraps children in the h tag', () => {
    const children = ['a', 'b', 'c'];
    expect(shallow(<Heading type={3}>{children}</Heading>).contains(children)).toBe(true);
  });
});
