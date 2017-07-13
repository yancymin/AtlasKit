import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Container, {
  Description,
  DismissButton,
  Icon,
  Content,
  Title,
  Header,
} from '../styled/Flag';
import Expander from './Expander';
import Actions from './FlagActions';
import { APPEARANCE_ENUM, getAppearance } from '../shared-variables';

// Note: needed to copy these from APPEARANCE_ENUM because the readme storybook util
// can't currently handle importing these from shared-variables.js (sadpanda)
const appearanceEnumValues = ['error', 'info', 'normal', 'success', 'warning'];
const appearanceEnumDefault = 'normal';

export default class Flag extends PureComponent {
  static propTypes = {
    /** Array of clickable actions to be shown at the bottom of the flag. For flags where appearance
      * is 'normal', actions will be shown as links. For all other appearance values, actions will
      * shown as buttons.
      */
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    /** Makes the flag appearance bold. Setting this to anything other than 'normal' hides the
      * dismiss button.
      */
    appearance: PropTypes.oneOf(appearanceEnumValues),
    /** The secondary content shown below the flag title */
    description: PropTypes.node,
    /** The icon displayed in the top-left of the flag. Should be an instance of `@atlaskit/icon`.
      * Your icon will receive the appropriate default color, which you can override by wrapping the
      * icon in a containing element with CSS `color` set to your preferred icon color.
      */
    icon: PropTypes.element.isRequired,
    /** A unique identifier used for rendering and onDismissed callbacks. */
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** Private, do not use. */
    isDismissAllowed: PropTypes.bool,
    /** Private, do not use. Use the FlagGroup onDismissed handler. */
    onDismissed: PropTypes.func,
    /** The bold text shown at the top of the flag. */
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    appearance: appearanceEnumDefault,
    actions: [],
    isDismissAllowed: false,
  }

  state = {
    isExpanded: false,
  }

  getButtonFocusRingColor = () => (
    getAppearance(this.props.appearance).focusRingColor
  )

  dismissFlag = () => {
    if (this.props.isDismissAllowed && this.props.onDismissed) {
      this.props.onDismissed(this.props.id);
    }
  }

  isBold = () => this.props.appearance !== APPEARANCE_ENUM.defaultValue

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  renderToggleOrDismissButton = () => {
    const { appearance, isDismissAllowed, onDismissed } = this.props;
    if (!isDismissAllowed || (!this.isBold() && !onDismissed)) {
      return null;
    }

    const ChevronIcon = this.state.isExpanded ? ChevronUpIcon : ChevronDownIcon;
    const ButtonIcon = this.isBold() ? ChevronIcon : CrossIcon;
    const buttonLabel = this.isBold() ? 'Toggle flag body' : 'Dismiss flag';
    const buttonAction = this.isBold() ? this.toggleExpand : this.dismissFlag;

    return (
      <DismissButton
        focusRingColor={this.getButtonFocusRingColor()}
        appearance={appearance}
        type="button"
        onClick={buttonAction}
      >
        <ButtonIcon label={buttonLabel} size="small" />
      </DismissButton>
    );
  }

  renderBody = () => {
    const {
      appearance,
      actions,
      description,
    } = this.props;

    const isExpanded = !this.isBold() || this.state.isExpanded;

    const OptionalDescription = () => (
      description ? (
        <Description appearance={appearance}>{description}</Description>
      ) : null
    );

    return (
      <Expander isExpanded={isExpanded}>
        <OptionalDescription />
        <Actions actions={actions} appearance={appearance} />
      </Expander>
    );
  }

  render() {
    const {
      appearance,
      icon,
      title,
    } = this.props;

    const OptionalDismissButton = this.renderToggleOrDismissButton;

    const Body = this.renderBody;

    return (
      <Container appearance={appearance} role="alert" tabIndex="0">
        <Icon>{icon}</Icon>
        <Content>
          <Header>
            <Title appearance={appearance}>{title}</Title>
            <OptionalDismissButton />
          </Header>
          <Body />
        </Content>
      </Container>
    );
  }
}
