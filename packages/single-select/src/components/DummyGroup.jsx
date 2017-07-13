import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import DummyItem from './DummyItem';

/** ************************************************************************************************
  This file exists so that we have a component we can pass the @atlaskit/readme Props component
**************************************************************************************************/

export default class DummyGroup extends PureComponent {
  static propTypes = {
    heading: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape(DummyItem.propTypes)),
  }
}
