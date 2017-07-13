import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import IconForType from './IconForType';
import { types, defaultType } from './types';
import { Root, ButtonContents, Text } from '../styled/InlineMessage';

export default class InlineMessage extends PureComponent {
  static propTypes = {
    /** The elements to be displayed by the inline dialog. */
    children: PropTypes.node,
    /** Text to display first, bolded for emphasis. */
    title: PropTypes.string,
    /** Set the icon to be used before the title. Options are: connectivity,
    confirmation, info, warning, and error. */
    type: PropTypes.oneOf(types),
    /** Text to display second. */
    secondaryText: PropTypes.string,
    /** Position prop to be passed to the inline dialog. Determines where around
    the text the dialog is displayed. */
    position: InlineDialog.propTypes.position,
  }

  static defaultProps = {
    type: defaultType,
    position: 'bottom left',
  }

  state = {
    isOpen: false,
    isHovered: false,
  }

  onMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  onMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  toggleDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children, position, secondaryText, title, type } = this.props;

    return (
      <Root
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <InlineDialog
          content={children}
          isOpen={this.state.isOpen}
          position={position}
          shouldFlip
        >
          <Button
            appearance="subtle-link"
            onClick={this.toggleDialog}
          >
            <ButtonContents isHovered={this.state.isHovered}>
              <IconForType type={type} />
              {
                title ? (
                  <Text title isHovered={this.state.isHovered}>
                    {title}
                  </Text>
                ) : null
              }
              {
                secondaryText ? (
                  <Text isHovered={this.state.isHovered}>{secondaryText}</Text>
                ) : null
              }
            </ButtonContents>
          </Button>
        </InlineDialog>
      </Root>
    );
  }
}
