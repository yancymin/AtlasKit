import * as React from 'react';
import { AkCode } from '../../src';

const exampleInlineCode = `const map = new Map({ key: 'value' })`;

export default (
    <span>This is inline code: <AkCode language="javascript" text={exampleInlineCode} />, check it out.</span>
);
