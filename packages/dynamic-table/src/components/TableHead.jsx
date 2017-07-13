import PropTypes from 'prop-types';
import React from 'react';
import { ASC, DESC } from '../internal/constants';
import { Head, HeadCell } from '../styled/TableHead';
import props from '../internal/props';

const TableHead = ({ head, sortKey, sortOrder, isFixedSize, onSort }) => {
  if (!head) return null;

  const { cells, ...rest } = head;

  return (
    <Head {...rest}>
      <tr>
        {
          cells.map((cell, index) => {
            const { isSortable, key, content, ...restCellProps } = cell;
            return (
              <HeadCell
                key={key || index}
                onClick={isSortable && onSort(cell)}
                isFixedSize={isFixedSize}
                isSortable={isSortable}
                sortOrder={key === sortKey && sortOrder}
                {...restCellProps}
              >
                <span>
                  {content}
                </span>
              </HeadCell>
            );
          })
        }
      </tr>
    </Head>
  );
};

TableHead.propTypes = {
  onSort: PropTypes.func,
  head: props.head,
  sortKey: props.sortKey,
  sortOrder: PropTypes.oneOf([ASC, DESC]),
  isFixedSize: PropTypes.bool,
};

export default TableHead;
