import React from 'react';
import { CommentTime } from '@atlaskit/comment';

const mouseOverHandler = e => console.log(`${e.target.textContent} was moused over.`);
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const now = new Date();

export default (
  <CommentTime href="/time" onMouseOver={mouseOverHandler}>
    {`${now.getDate()} ${monthNames[now.getMonth()]}, ${now.getFullYear()}`}
  </CommentTime>
);
