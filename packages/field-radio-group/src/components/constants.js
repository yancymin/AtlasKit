import PropTypes from 'prop-types';

export const itemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
);

// ================================================================
// NOTE: Duplicated in Radio Group and AkFieldRadioGroup until
// docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// ================================================================

export const itemsDefault = [];

export const itemsPropTypeSmart = PropTypes.arrayOf(
  PropTypes.shape({
    defaultSelected: PropTypes.bool,
    isDisabled: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
);
