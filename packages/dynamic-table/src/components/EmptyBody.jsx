import PropTypes from 'prop-types';
import React from 'react';
import EmptyBodyStyle from '../styled/EmptyBody';

const EmptyBody = ({ children }) =>
  <EmptyBodyStyle>
    {children}
  </EmptyBodyStyle>;

EmptyBody.propTypes = {
  children: PropTypes.node,
};

export default EmptyBody;
