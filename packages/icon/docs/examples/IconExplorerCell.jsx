import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import { FieldText } from '@atlaskit/field-text';
import Modal from '@atlaskit/modal-dialog';
import Tooltip from '@atlaskit/tooltip';
import { akColorN30A, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { size } from '@atlaskit/icon';

const IconExplorerLink = styled.a`
  &,
  &:hover,
  &:active,
  &:focus {
    border-radius: ${akGridSizeUnitless / 2}px;
    color: inherit;
    cursor: pointer;
    display: block;
    line-height: 0;
    padding: 10px;
  }

  &:hover {
    background: ${akColorN30A};
  }
`;

const IconModalHeader = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  > * {
    margin-right: 5px;
  }
`;

class IconExplorerCell extends PureComponent {
  state = {
    isModalOpen: false,
  }

  openModal = () => {
    this.setState({ isModalOpen: true });

    // Need to wait 1 tick for the modal to mount before this.input exists
    window.requestAnimationFrame(() => this.input.select());
  }

  closeModal = () => {
    this.setState({ isModalOpen: false });
  }

  copyAndCloseModal = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { component: Icon, ...props } = this.props;

    return (
      <div>
        <Tooltip description={props.componentName}>
          <IconExplorerLink onClick={this.openModal}>
            <Icon label={props.componentName} size={size.medium} />
          </IconExplorerLink>
        </Tooltip>
        <Modal
          footer={
            <Button onClick={this.closeModal}>Close</Button>
          }
          header={
            <IconModalHeader>
              <Icon label={props.componentName} size={size.medium} />
              {props.componentName}
            </IconModalHeader>
          }
          isOpen={this.state.isModalOpen === true}
          onDialogDismissed={this.closeModal}
        >
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <div
            onClick={() => this.input.select()}
            ref={(ref) => { this.importCodeField = ref; }}
            role="presentation"
          >
            <FieldText
              isLabelHidden
              isReadOnly
              label=""
              onChange={() => {}}
              shouldFitContainer
              value={`import ${props.componentName} from '${props.package}';`}
              ref={(ref) => { this.input = ref ? ref.input : null; }}
            />
          </div>
          {/* eslint-enable jsx-a11y/no-static-element-interactions */}
        </Modal>
      </div>
    );
  }
}

export default IconExplorerCell;
