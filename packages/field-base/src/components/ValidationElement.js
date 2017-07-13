import React, { PropTypes } from 'react';
import Spinner from '@atlaskit/spinner';
import Icon from '@atlaskit/icon/glyph/warning';
import WarningIcon from '../styled/WarningIcon';

const ValidationElement = ({ isDisabled, isInvalid, isLoading }) => {
  if (!isDisabled && isInvalid) {
    return (
      <WarningIcon>
        <Icon label="warning" size="medium" />
      </WarningIcon>
    );
  }
  return isLoading ? <Spinner /> : null;
};

ValidationElement.propTypes = {
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default ValidationElement;
