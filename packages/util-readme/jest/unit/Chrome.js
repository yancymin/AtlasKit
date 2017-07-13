import { shallow } from 'enzyme';
import React from 'react';

import Chrome from '../../src/Chrome';

describe('Chrome', () => {
  it('renders the provided title', () => {
    expect(shallow(<Chrome title="foobarbaz">a</Chrome>).contains('foobarbaz')).toBe(true);
  });

  it('renders the provided children', () => {
    const children = ['a', 'b'];
    expect(shallow(<Chrome title="foobarbaz">{children}</Chrome>).contains(children)).toBe(true);
  });
});
