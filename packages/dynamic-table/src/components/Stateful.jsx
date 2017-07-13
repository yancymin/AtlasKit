import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import DynamicTableStateless from './Stateless';
import props from '../internal/props';
import { ASC, DESC } from '../internal/constants';

// We are disabling prop validation, as the rest of the props passed in are
// handled by validation of the stateless verion.
/* eslint-disable react/prop-types */

export default class DynamicTable extends PureComponent {
  static propTypes = {
    defaultPage: props.isInteger,
    defaultSortKey: props.sortKey,
    defaultSortOrder: PropTypes.oneOf([ASC, DESC]),
  }

  static defaultProps = {
    caption: null,
    defaultPage: 1,
    defaultSortKey: null,
    defaultSortOrder: null,
    emptyView: null,
    head: null,
    isFixedSize: false,
    onSetPage() {},
    onSort() {},
    rows: null,
    rowsPerPage: Infinity,
  }

  state = {
    page: this.props.defaultPage,
    sortKey: this.props.defaultSortKey,
    sortOrder: this.props.defaultSortOrder,
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      page: newProps.page,
      sortKey: newProps.defaultSortKey,
      sortOrder: newProps.defaultSortOrder,
    });
  }

  onSetPage = (page) => {
    this.props.onSetPage(page);
    this.setState({ page });
  };

  onSort = ({ key, item, sortOrder }) => {
    this.props.onSort({ key, item, sortOrder });
    this.setState({ sortKey: key, sortOrder, page: 1 });
  }

  render() {
    const { caption, emptyView, head, isFixedSize, rows, rowsPerPage } = this.props;
    const { page, sortKey, sortOrder } = this.state;

    return (
      <DynamicTableStateless
        caption={caption}
        emptyView={emptyView}
        head={head}
        isFixedSize={isFixedSize}
        onSetPage={this.onSetPage}
        onSort={this.onSort}
        page={page}
        rows={rows}
        rowsPerPage={rowsPerPage}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
    );
  }
}
