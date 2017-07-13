import React, { PureComponent } from 'react';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';

export default class LozengeExamples extends PureComponent {
  state = {
    openNumModal: false,
    openPxModal: false,
    percentModal: false,
    openSmallModal: false,
  }

  toggleNumModal = () => this.setState({ openNumModal: !this.state.openNumModal })
  togglePxModal = () => this.setState({ openPxModal: !this.state.openPxModal })
  togglePercentModal = () => this.setState({ percentModal: !this.state.percentModal })
  toggleSmallModal = () => this.setState({ openSmallModal: !this.state.openSmallModal })

  render() {
    return (
      <ButtonGroup>
        <Button onClick={this.toggleNumModal}>Width as number</Button>
        <ModalDialog
          width={300}
          header="300 as a number"
          footer={<Button onClick={this.toggleNumModal}>Close Modal</Button>}
          isOpen={this.state.openNumModal}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.togglePxModal}>Width of 300px</Button>
        <ModalDialog
          width="300px"
          header="300px as a string"
          footer={<Button onClick={this.togglePxModal}>Close Modal</Button>}
          isOpen={this.state.openPxModal}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.togglePercentModal}>Width of 50%</Button>
        <ModalDialog
          width="50%"
          header="50% as a string"
          footer={<Button onClick={this.togglePercentModal}>Close Modal</Button>}
          isOpen={this.state.percentModal}
        >
          The modal dialog main content
        </ModalDialog>
        <Button onClick={this.toggleSmallModal}>Width small</Button>
        <ModalDialog
          width="small"
          header="Pre-defined size option"
          footer={<Button onClick={this.toggleSmallModal}>Close Modal</Button>}
          isOpen={this.state.openSmallModal}
        >
          The modal dialog main content
        </ModalDialog>
      </ButtonGroup>
    );
  }
}
