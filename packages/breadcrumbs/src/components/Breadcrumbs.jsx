import React, { PropTypes, PureComponent } from 'react';
import BreadcrumbsStateless from './BreadcrumbsStateless';

export default class Breadcrumbs extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  state = { isExpanded: false }

  expand = () => this.setState({ isExpanded: true });

  render() {
    return (
      <BreadcrumbsStateless
        {...this.props}
        isExpanded={this.state.isExpanded}
        onExpand={this.expand}
      >
        {this.props.children}
      </BreadcrumbsStateless>
    );
  }
}
