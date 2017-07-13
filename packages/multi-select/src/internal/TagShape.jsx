import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** ************************************************************************************************
  This file exists so that we have a component we can pass the @atlaskit/readme Props component
  We don't use the actual tag component because we don't want to expose all of the props of Tag,
  just the ones we choose.

  Duplicating the propTypes here is not great, hopefully we can fix in the future with the new
  propTypes readme component
**************************************************************************************************/

export default class TagShape extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    elemBefore: PropTypes.node,
  }

  static defaultProps = {
    appearance: 'default',
  }
}
