import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AKButton from '@atlaskit/button';
import BitbucketAdminIcon from 'ak-icon/glyph/bitbucket/admin';
import AKInlineDialog from '@atlaskit/inline-dialog';

class ButtonActivatedDialog extends PureComponent {
  static propTypes = {
    content: PropTypes.node,
    position: PropTypes.string,
  }

  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleOnClose = (data) => {
    this.setState({
      isOpen: data.isOpen,
    });
  }

  render() {
    return (
      <AKInlineDialog
        content={this.props.content}
        position={this.props.position}
        isOpen={this.state.isOpen}
        onClose={this.handleOnClose}
      >
        <AKButton
          onClick={this.handleClick}
          iconBefore={<BitbucketAdminIcon />}
          isSelected
        />
      </AKInlineDialog>
    );
  }
}

export default ButtonActivatedDialog;
