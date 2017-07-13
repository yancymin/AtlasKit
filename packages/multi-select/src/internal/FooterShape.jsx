import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** ************************************************************************************************
  This file exists so that we have a component we can pass the @atlaskit/readme Props component
**************************************************************************************************/

export default class FooterShape extends PureComponent {
  static propTypes = {
    content: PropTypes.string,
    elemBefore: PropTypes.node,
    onActivate: PropTypes.func,
    appearance: PropTypes.string,
  }
}
