import { Mark } from '../../../prosemirror';
import { ReactComponentConstructor } from '../';

import Code from './code';
import Em from './em';
import Link from './link';
import Strike from './strike';
import Strong from './strong';
import Subsup from './subsup';
import Underline from './underline';

export const markToReact = {
  'code': Code,
  'em': Em,
  'link': Link,
  'strike': Strike,
  'strong': Strong,
  'subsup': Subsup,
  'underline': Underline,
};

export const toReact = (mark: Mark): ReactComponentConstructor => {
  return markToReact[mark.type.name];
};

export {
  Code,
  Em,
  Link,
  Strike,
  Strong,
  Subsup,
  Underline,
};
