import PropTypes from 'prop-types';
import { createError } from '@atlaskit/util-common';

function isFinitePositiveInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value && value >= 0;
}

function validateTotal(props, propName, componentName) {
  const value = props[propName];

  if (!isFinitePositiveInteger(value)) {
    const message = `'${propName}' should be a positive finite integer, got ${props[propName]} instead`;
    return createError(propName, componentName, message);
  }

  return null;
}
validateTotal.isRequired = false;

function validateCurrent(props, propName, componentName) {
  const value = props[propName];
  if (!isFinitePositiveInteger(value)) {
    const message = `'${propName}' should be a positive finite integer, got ${props[propName]} instead`;
    return createError(propName, componentName, message);
  }

  const total = props.total;
  if (value > total) {
    const message = `value of '${propName}' can't be greater than value of 'total'`;
    return createError(propName, componentName, message);
  }

  return null;
}
validateCurrent.isRequired = false;

const i18nShape = PropTypes.shape({
  prev: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
});

const defaultI18n = {
  prev: 'Prev',
  next: 'Next',
};

export {
  validateCurrent,
  validateTotal,
  i18nShape,
  defaultI18n,
};
