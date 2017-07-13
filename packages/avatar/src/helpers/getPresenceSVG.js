// @flow
import React from 'react';

export default function getPresenceSvg(presence: string) {
  const Svg = props => (
    <svg height="100%" version="1.1" viewBox="0 0 8 8" width="100%" xmlns="http://www.w3.org/2000/svg" {...props} />
  );

  switch (presence) {
    case 'busy':
      return (
        <Svg>
          <circle fill="#ED5451" cx="4" cy="4" r="4" />
          <path fill="#FFFFFF" d="M3.3,1.9l2.8,2.8c0.2,0.2,0.2,0.5,0,0.7L5.4,6.1c-0.2,0.2-0.5,0.2-0.7,0L1.9,3.3c-0.2-0.2-0.2-0.5,0-0.7l0.7-0.7C2.8,1.7,3.1,1.7,3.3,1.9z" />
        </Svg>
      );
    case 'offline':
      return (
        <Svg>
          <path fill="#6C798E" d="M4,8 C6.209139,8 8,6.209139 8,4 C8,1.790861 6.209139,0 4,0 C1.790861,0 0,1.790861 0,4 C0,6.209139 1.790861,8 4,8 Z M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" />
          <path fill="#CFD4DB" d="M4,6 C5.1045695,6 6,5.1045695 6,4 C6,2.8954305 5.1045695,2 4,2 C2.8954305,2 2,2.8954305 2,4 C2,5.1045695 2.8954305,6 4,6 Z" />
        </Svg>
      );
    case 'online':
      return (
        <Svg>
          <circle fill="#48CC8C" cx="4" cy="4" r="4" />
        </Svg>
      );
    default:
      return null;
  }
}
