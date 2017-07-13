import React, { PropTypes, PureComponent } from 'react';
import Button from '../styled/Button';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Separator from '../styled/Separator';

/* eslint-disable react/prefer-stateless-function */
export default class EllipsisItem extends PureComponent {
  static propTypes = {
    hasSeparator: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    hasSeparator: false,
    onClick: () => {},
  };

  render() {
    return (
      <ItemWrapper>
        <Button
          appearance="subtle-link"
          spacing="none"
          onClick={this.props.onClick}
        >&hellip;</Button>
        {this.props.hasSeparator
          ? <Separator>/</Separator>
          : null
        }
      </ItemWrapper>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
