import { storiesOf } from '@kadira/storybook';
import React from 'react';

import AKTooltip, { Tooltip as DumbTooltip } from '../src/index';
import FourDirectionTooltip from './FourDirectionTooltip';
import { name } from '../package.json';

const buttonStyles = {
  backgroundColor: 'orange',
  padding: '5px',
};

const containerStyle = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
};

const relativePosition = {
  position: 'relative',
  height: '100px',
  width: '100px',
  marginLeft: '50vw',
  marginTop: '50vh',
};

storiesOf(name, module)
  .add('a dumb tooltip', () => (
    <div>
      <div style={containerStyle}>
        <DumbTooltip position="top" description="This is a tooltip with position = top" visible>
          <span style={buttonStyles}>Tooltips are great!</span>
        </DumbTooltip>
      </div>
    </div>
  ))
  .add('a smart tooltip', () => (
    <div>
      <div style={containerStyle}>
        <AKTooltip position="top" description="This is a tooltip with position = top">
          <span style={buttonStyles}>Hover over me</span>
        </AKTooltip>
      </div>
    </div>
  ))
  .add('a smart tooltip that changes position', () => (
    <div>
      <div style={containerStyle}>
        <FourDirectionTooltip />
      </div>
    </div>
  ))
  .add('a smart tooltip in a relatively positioned parent', () => (
    <div>
      <div style={relativePosition}>
        <FourDirectionTooltip />
      </div>
    </div>
  ));
