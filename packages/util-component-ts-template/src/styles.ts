import {
  akColorN500,
  akGridSize
} from '@atlaskit/util-shared-styles';
import { style } from 'typestyle';

export const root = style({
  border: `1px solid ${akColorN500}`,
  borderRadius: `calc(${akGridSize} / 2)`,
  margin: `calc(${akGridSize} * 4)`,
  padding: akGridSize
});
