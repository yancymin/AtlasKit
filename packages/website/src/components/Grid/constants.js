import PropTypes from 'prop-types';
import { css } from 'styled-components';

export const SIZES = {
  1: '100%',

  '1/2': '50%',
  '1/3': '33.33%',
  '2/3': '66.66%',
  '1/4': '25%',
  '3/4': '75%',

  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',

  '1/6': '16.66%',
  '5/6': '83.33%',
};

export const SizeType = PropTypes.oneOf(Object.keys(SIZES));

export function createResponsiveColumns(breaks) {
  let sm, md, lg; // eslint-disable-line

  if (breaks.sm) sm = css`@media (min-width: 600px) { width: ${SIZES[breaks.sm]}; }`;
  if (breaks.md) md = css`@media (min-width: 900px) { width: ${SIZES[breaks.md]}; }`;
  if (breaks.lg) lg = css`@media (min-width: 1200px) { width: ${SIZES[breaks.lg]}; }`;

  return css`
    width: ${SIZES[breaks.xs]};
    ${sm}
    ${md}
    ${lg}
  `;
}
