import React, { PureComponent } from 'react';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';

export default class LozengeExamples extends PureComponent {
  state = {
    baseModalOpen: false,
    bodyOnlyModalOpen: false,
  }

  toggleBodyOnlyModalOpen = () => (
    this.setState({ bodyOnlyModalOpen: !this.state.bodyOnlyModalOpen })
  )
  openBaseModal = () => this.setState({ baseModalOpen: true })
  closeBaseModal = () => this.setState({ baseModalOpen: false })

  render() {
    return (
      <ButtonGroup>
        <Button onClick={this.openBaseModal}>Open Modal</Button>
        <ModalDialog
          header="The Modal Header"
          footer={
            <div>
              <p>Here is the modal footer</p>
              <Button onClick={this.closeBaseModal}>Close Modal</Button>
            </div>
          }
          onDialogDismissed={this.closeBaseModal}
          isOpen={this.state.baseModalOpen}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.toggleBodyOnlyModalOpen}>Header-footerless modal</Button>
        <ModalDialog isOpen={this.state.bodyOnlyModalOpen}>
          <div>
            <p>With only the body of the modal, things look cramped</p>
            <Button onClick={this.toggleBodyOnlyModalOpen}>Close Modal</Button>
          </div>
        </ModalDialog>
      </ButtonGroup>
    );
  }
}
