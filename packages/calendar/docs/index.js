import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import StatefulCalendarExample from './StatefulCalendarExample';
import statefulCalendarExampleSrc from '!raw-loader!./StatefulCalendarExample';
import PropfulCalendarExample from './PropfulCalendarExample';
import propfulCalendarExampleSrc from '!raw-loader!./PropfulCalendarExample';
import PropfulCalendarOptions from './PropfulCalendarOptions';
import propfulCalendarOptionsSrc from '!raw-loader!./PropfulCalendarOptions';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      There are two Calendar components, one of which maintains internal state, and
      cannot have values passed in or out. The stateless component has its values
      set through props.
    </p>
    <Usage>
      {"import Calendar, { AkCalendar } from '@atlaskit/calendar';"}
    </Usage>
    <p>
      For the stateful version, be cautious that some functions such as
      the <code>onChange()</code> function which automatically navigate on the
      previous month and next month arrows for the stateless component will need
      to be manually configured for the stateful component.
    </p>
    <p>
      As well as clicking, the calendar can be navigated using the arrow keys.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Stateful Calendar',
    Component: StatefulCalendarExample,
    src: statefulCalendarExampleSrc,
  },
  {
    title: 'Calendar using props',
    Component: PropfulCalendarExample,
    src: propfulCalendarExampleSrc,
  },
  {
    title: 'All Calendar Options',
    Component: PropfulCalendarOptions,
    src: propfulCalendarOptionsSrc,
  },
];
