import { shallow } from 'enzyme';
import React from 'react';

import { name } from '../../package.json';
import ButtonGroup from '../../src';
import styles from '../../src/styles.less';

describe(name, () => {
  describe('basic behavior', () => {
    it('should render all the children', () => {
      const group = shallow(<ButtonGroup><div>1</div><div>2</div><div>3</div></ButtonGroup>);
      expect(group.contains(<div>1</div>)).toBe(true);
      expect(group.contains(<div>2</div>)).toBe(true);
      expect(group.contains(<div>3</div>)).toBe(true);
      expect(group.children().length).toBe(3);
    });

    it(`should have className ${styles.wrapper}`, () => {
      const group = shallow(<ButtonGroup />);
      expect((group).hasClass((styles.wrapper))).toBe(true);
    });
  });
});
