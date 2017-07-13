import React, { PropTypes } from 'react';
import Button from '@atlaskit/button';
import Lorem from 'react-lorem-component';
import { action } from '@kadira/storybook';
import ModalDialog from '../src';

function doSomethingOnDismiss() {
  action('the "onDialogDismissed" handler is fired')();
}

export default class ModalDemo extends React.PureComponent {
  static propTypes = {
    header: PropTypes.element,
    children: PropTypes.element,
    footer: PropTypes.element,
  }

  render() {
    const { header, children, footer } = this.props;

    return (
      <ModalDialog
        footer={
          footer || <Button appearance="primary">Create issue</Button>
        }
        header={
          header || <span>New issue</span>
        }
        isOpen
        onDialogDismissed={doSomethingOnDismiss}
        {...this.props}
      >
        {children || <Lorem count="1" />}
      </ModalDialog>
    );
  }
}
