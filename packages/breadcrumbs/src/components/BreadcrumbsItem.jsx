import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import AKTooltip from '@atlaskit/tooltip';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Button from '../styled/Button';
import Separator from '../styled/Separator';
import { itemTruncateWidth } from '../constants';

export default class BreadcrumbsItem extends PureComponent {
  static propTypes = {
    /** Whether this item will be followed by a separator. */
    hasSeparator: PropTypes.bool,
    /** The url or path which the breadcrumb should act as a link to. */
    href: PropTypes.string,
    /** An icon to display before the breadcrumb. */
    iconBefore: PropTypes.element,
    /** An icon to display after the breadcrumb. */
    iconAfter: PropTypes.element,
    /** The text to appear within the breadcrumb as a link. */
    text: PropTypes.string,
    target: PropTypes.oneOf(['_blank', '_parent', '_self', '_top']),
  }

  static defaultProps = {
    hasSeparator: false,
    href: '#',
  }

  state = { hasOverflow: false }

  componentDidMount() {
    this.updateOverflow();
  }

  componentWillReceiveProps() {
    // Reset the state
    this.setState({ hasOverflow: false });
  }

  componentDidUpdate() {
    this.updateOverflow();
  }

  updateOverflow() {
    if (!this.button) return false;
    // We need to find the DOM node for the button component in order to measure its size.
    const el = ReactDOM.findDOMNode(this.button); // eslint-disable-line react/no-find-dom-node
    const overflow = el.clientWidth >= itemTruncateWidth;
    if (overflow !== this.state.hasOverflow) {
      this.setState({ hasOverflow: overflow });
    }
    return overflow;
  }

  renderButton = () => (
    <Button
      appearance="subtle-link"
      iconAfter={this.props.iconAfter}
      iconBefore={this.props.iconBefore}
      spacing="none"
      href={this.props.href}
      target={this.props.target}
      ref={el => (this.button = el)}
    >
      {this.props.text}
    </Button>
  );

  renderButtonWithTooltip = () => (
    <AKTooltip
      description={this.props.text}
      position="bottom"
    >
      {this.renderButton()}
    </AKTooltip>
  );

  render() {
    return (
      <ItemWrapper>
        {this.state.hasOverflow
          ? this.renderButtonWithTooltip()
          : this.renderButton()
        }
        {this.props.hasSeparator
          ? <Separator>/</Separator>
          : null
        }
      </ItemWrapper>
    );
  }
}
