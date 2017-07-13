import PropTypes from 'prop-types';
import React from 'react';
import { ASC, DESC } from '../internal/constants';
import TableRow from './TableRow';
import props from '../internal/props';

const getSortedRows = (head, rows, sortKey, sortOrder) => {
  if (!sortKey || !head) return rows;

  const getSortingCellValue = cells =>
    cells.reduce((result, cell, index) => result || (
        (head.cells[index].key === sortKey) &&
        (cell.key !== undefined ? cell.key : cell.content)
    ), null);

  return rows.sort((a, b) => {
    const valA = getSortingCellValue(a.cells);
    const valB = getSortingCellValue(b.cells);

    const modifier = sortOrder === ASC ? 1 : -1;

    if (!valA || valA < valB) return -modifier;
    if (!valB || valA > valB) return modifier;
    return 0;
  });
};

const Body = ({ rows, head, sortKey, sortOrder, rowsPerPage, page, isFixedSize }) => {
  const sortedRows = getSortedRows(head, rows, sortKey, sortOrder) || [];

  return (
    <tbody>
      {sortedRows
        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
        .map((row, rowIndex) => <TableRow
          key={rowIndex}
          row={row}
          head={head}
          isFixedSize={isFixedSize}
        />)}
    </tbody>
  );
};

Body.propTypes = {
  head: props.head,
  rows: props.rows,
  sortKey: props.sortKey,
  sortOrder: PropTypes.oneOf([ASC, DESC]),
  rowsPerPage: props.isInteger,
  page: props.isInteger,
  isFixedSize: PropTypes.bool,
};

export default Body;
