import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import AkButton from '@atlaskit/button';

import styles from '../styles/profilecard.less';

export default class ErrorMessage extends PureComponent {
  static propTypes = {
    reload: PropTypes.func,
  };
  static defaultProps = {};

  render() {
    return (
      <div className={styles.errorMessage}>
        <CrossCircleIcon label="icon error" size="large" />
        <p>
          Oops, looks like we’re having issues
          <br />
          {this.props.reload ? <span>Try again and we’ll give it another shot</span> : null}
        </p>
        {this.props.reload ? <AkButton
          appearance="link"
          compact
          onClick={this.props.reload}
        >Try again</AkButton> : null}
      </div>
    );
  }
}
