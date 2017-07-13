import PropTypes from 'prop-types';
import React, { Children, PureComponent } from 'react';
import EllipsisItem from './EllipsisItem';
import { defaultMaxItems } from '../constants';
import Container from '../styled/BreadcrumbsContainer';

const { toArray } = Children;

export default class BreadcrumbsStateless extends PureComponent {
  static propTypes = {
    /** Override collapsing of the nav when there are more than maxItems */
    isExpanded: PropTypes.bool,
    /** Set the maximum number of breadcrumbs to display. When there are more
    than the maximum number, only the first and last will be shown, with an
    ellipsis in between. */
    maxItems: PropTypes.number,
    /** A function to be called when you are in the collapsed view and click
    the ellpisis. */
    onExpand: PropTypes.func.isRequired,
    /** A single <BreadcrumbsItem> or an array of <BreadcrumbsItem>.  */
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  static defaultProps = {
    isExpanded: false,
    maxItems: defaultMaxItems,
  }

  renderAllItems() {
    const allNonEmptyItems = toArray(this.props.children);
    return allNonEmptyItems.map((child, index) => React.cloneElement(child, {
      hasSeparator: index < allNonEmptyItems.length - 1,
    }));
  }

  renderFirstAndLast() {
    const itemsToRender = this.renderAllItems();
    return [
      itemsToRender[0],
      <EllipsisItem
        hasSeparator
        key="ellipsis"
        onClick={this.props.onExpand}
      />,
      itemsToRender[itemsToRender.length - 1],
    ];
  }

  render() {
    return (
      <Container>
        {(this.props.isExpanded || toArray(this.props.children).length <= this.props.maxItems)
          ? this.renderAllItems()
          : this.renderFirstAndLast()
        }
      </Container>
    );
  }
}
