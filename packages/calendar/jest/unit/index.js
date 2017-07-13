import React from 'react';
import { mount, shallow } from 'enzyme';
import { getMonthName } from '../../src/util';

import { name } from '../../package.json';
import { AkCalendar } from '../../src';
import { Announcer, MonthAndYear } from '../../src/styled';
import DateComponent from '../../src/Date';

const now = new Date();
const nowMonth = now.getMonth() + 1;
const nowYear = now.getFullYear();

describe(name, () => {
  it('should render the component', () => {
    const wrapper = shallow(<AkCalendar />);
    expect(wrapper.length).toBeGreaterThan(0);
    expect(wrapper.find(Announcer)).toHaveLength(1);
    expect(wrapper.find(DateComponent).length).toBeGreaterThan(0);
  });

  it('should highlight current date', () => {
    const wrapper = mount(<AkCalendar />);
    expect(wrapper.find(MonthAndYear).at(0).text().includes(`${getMonthName(nowMonth)} ${nowYear}`))
      .toBe(true);
  });

  it('should call onSelect', (done) => {
    const wrapper = shallow(<AkCalendar
      month={1}
      year={2016}
      onSelect={({ day, month, year, iso }) => {
        expect(day).toBe(1);
        expect(month).toBe(1);
        expect(year).toBe(2016);
        expect(iso).toBe('2016-01-01');
        done();
      }}
    />);
    wrapper.find(DateComponent).find({
      children: 1,
      sibling: false,
    }).simulate('click', {
      day: 1,
      month: 1,
      year: 2016,
    });
  });

  it('specifying selected days should select the specified days', () => {
    const wrapper = mount(<AkCalendar
      month={1}
      year={2016}
      selected={['2016-01-01', '2016-01-02']}
    />);

    expect(wrapper.find({
      children: 1,
      selected: true,
    })).toHaveLength(1);

    expect(wrapper.find({
      children: 2,
      selected: true,
    })).toHaveLength(1);
  });
});
