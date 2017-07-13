import React from 'react';
import PropTypes from 'prop-types';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import { ActionsContainer, ActionsItem, ErrorIcon } from '../styled/FooterStyles';

const mapActions = items => items.map((item, index) => (
  <ActionsItem key={index}>
    {item}
  </ActionsItem>
));

const FooterItems = ({ actions, errorActions, errorIconLabel, isError, isSaving }) => {
  if (isSaving || (!actions && !errorActions)) return null;

  const items = isError ? mapActions(errorActions) : mapActions(actions);

  return (
    <ActionsContainer>
      {isError ? <ErrorIcon>
        <WarningIcon label={errorIconLabel} />
      </ErrorIcon> : null}
      {items}
    </ActionsContainer>
  );
};

FooterItems.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  errorActions: PropTypes.arrayOf(PropTypes.node),
  errorIconLabel: PropTypes.string,
  isError: PropTypes.bool,
  isSaving: PropTypes.bool,
};

export default FooterItems;
