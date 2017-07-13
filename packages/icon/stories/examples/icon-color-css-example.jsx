import React, { PureComponent } from 'react';
import HomeCircleIcon from '@atlaskit/icon/glyph/home-circle';
import {
  akColorB500,
  akColorB75,
  akColorPrimary1,
  akColorPrimary2,
  akColorSecondary1,
  akColorSecondary2,
  akColorSecondary3,
  akColorSecondary4,
} from '@atlaskit/util-shared-styles';

const purple = '.purple { color: rebeccapurple; fill: yellow; }';
const blue = `.blue { color: ${akColorB500}; fill: ${akColorB75}; }`;
const rainbow = `
.rainbow {
  animation: 5s ease-in 1s infinite both rainbow;
}
@keyframes rainbow {
  0%   { color: ${akColorPrimary1}; }
  20%  { color: ${akColorPrimary2}; }
  40%  { color: ${akColorSecondary1}; }
  60%  { color: ${akColorSecondary2}; }
  80%  { color: ${akColorSecondary3}; }
  100% { color: ${akColorSecondary4}; }
}`;
const styles = (
  <style>
    {purple}
    {blue}
    {rainbow}
  </style>
);

export default class Example extends PureComponent {
  render() {
    return (
      <div>
        {styles}
        <span className="purple"><HomeCircleIcon secondaryColor="inherit" size="xlarge" /></span>
        <span className="blue"><HomeCircleIcon secondaryColor="inherit" size="xlarge" /></span>
        <span className="rainbow"><HomeCircleIcon size="xlarge" /></span>
      </div>
    );
  }
}
