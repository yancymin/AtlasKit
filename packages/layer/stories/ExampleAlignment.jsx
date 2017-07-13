import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './styles.less';

import AKLayer from '../src';

// eslint-disable-next-line  react/prefer-stateless-function
export default class ExampleAlignment extends PureComponent {
  static propTypes = {
    position: PropTypes.string,
    targetContent: PropTypes.string,
    longContent: PropTypes.bool,
  }

  static defaultProps = {
    longContent: false,
  }

  render() {
    const popperContent = (
      <div style={{ background: '#fca' }}>{this.props.longContent ?
        (<div>
          <p>This is the layer content</p>
          <p>It should be positioned with position: {this.props.position}</p>
        </div>) : this.props.position}
      </div>
    );

    return (
      <div>
        <AKLayer {...this.props} content={popperContent}>
          <div className={styles.alignmentContainer}>
            {this.props.targetContent}
          </div>
        </AKLayer>
      </div>
    );
  }
}
