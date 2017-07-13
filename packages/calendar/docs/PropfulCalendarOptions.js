import React from 'react';
import { AkCalendar } from '@atlaskit/calendar';

const AkCalendarOptions = () => (
  <AkCalendar
    month={5}
    year={2017}
    disabled={['2017-05-01', '2017-05-02']}
    previouslySelected={['2017-05-03', '2017-05-04']}
    selected={['2017-05-05', '2017-05-06']}
    focused={7}
    today="2017-05-08"
  />
);

export default AkCalendarOptions;
