import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { PaginationStateless } from '@atlaskit/pagination';

import { ASC, DESC } from '../internal/constants';
import props from '../internal/props';
import TableHead from './TableHead';
import Body from './Body';
import EmptyBody from './EmptyBody';

import { Table, Caption } from '../styled/DynamicTable';

function toggleSortOrder(currentSortOrder) {
  switch (currentSortOrder) {
    case DESC:
      return ASC;
    case ASC:
      return DESC;
    default:
      return currentSortOrder;
  }
}

export default class DynamicTable extends Component {
  static propTypes = {
    caption: PropTypes.node,
    head: props.head,
    rows: props.rows,
    emptyView: PropTypes.node,
    isFixedSize: PropTypes.bool,
    rowsPerPage: props.isInteger,
    onSetPage: PropTypes.func,
    onSort: PropTypes.func,
    page: props.isInteger,
    sortKey: props.sortKey,
    sortOrder: PropTypes.oneOf([ASC, DESC]),
  }

  static defaultProps = {
    caption: null,
    head: null,
    rows: null,
    emptyView: null,
    isFixedSize: false,
    rowsPerPage: Infinity,
    onSetPage() {},
    onSort() {},
    page: 1,
    sortKey: null,
    sortOrder: null,
  }

  onSort = item => () => {
    const { sortKey, sortOrder, onSort } = this.props;
    const { key } = item;
    if (!key) return;
    const sortOrderFormatted = key !== sortKey ? ASC : toggleSortOrder(sortOrder);
    this.onSetPage(1);
    onSort({ key, item, sortOrder: sortOrderFormatted });
  }

  onSetPage = page => this.props.onSetPage(page);

  render() {
    const {
      caption, emptyView, head, isFixedSize, page, rows, rowsPerPage, sortKey, sortOrder,
    } = this.props;
    const totalPages = rows ? Math.ceil(rows.length / rowsPerPage) : 0;
    const bodyProps = { rows, head, sortKey, sortOrder, rowsPerPage, page, isFixedSize };
    const rowsExist = (rows && rows.length > 0);
    const emptyBody = (emptyView && <EmptyBody>
      {emptyView}
    </EmptyBody>);

    return (
      <div>
        <Table isFixedSize={isFixedSize}>
          {!!caption && <Caption>{caption}</Caption>}
          {head && <TableHead
            head={head}
            onSort={this.onSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />}
          {rowsExist && <Body {...bodyProps} />}
        </Table>
        {!totalPages ? null : (
          <PaginationStateless
            current={page}
            onSetPage={this.onSetPage}
            total={totalPages}
          />
        )}
        {!rowsExist && emptyBody}
      </div>
    );
  }
}
