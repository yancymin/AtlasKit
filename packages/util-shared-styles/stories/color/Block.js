import React from 'react';
import { Tooltip } from '@atlaskit/tooltip';
import Clipboard from 'clipboard';
import { action } from '@kadira/storybook';

import styles from './styles.less';

class Block extends React.PureComponent {
  componentDidMount() {
    if (this.block) {
      this.clipboard = new Clipboard(this.block);
      const copyAction = action(`copied ${this.props.description} to clipboard`);
      this.clipboard.on('success', ({ text: color }) => copyAction(color));
    } else {
      this.clipboard.destroy();
    }
  }

  render() {
    return (
      <Tooltip
        description={this.props.backgroundColor}
        className={styles.Trigger}
      >
        <div
          data-clipboard-text={this.props.backgroundColor}
          ref={n => (this.block = n)}
          aria-describedby={this.props.tooltipId}
          className={styles.Block}
          style={{
            backgroundColor: this.props.backgroundColor,
            color: this.props.foregroundColor,
            borderColor: this.props.foregroundColor,
          }}
        >
          <div className={styles.description}>{this.props.description}</div>
        </div>
      </Tooltip>
    );
  }
}

Block.propTypes = {
  description: React.PropTypes.string.isRequired,
  backgroundColor: React.PropTypes.string.isRequired,
  foregroundColor: React.PropTypes.string.isRequired,
  tooltipId: React.PropTypes.string.isRequired,
};

export default Block;
