import {
  TableMap,
  Node,
} from '../../prosemirror';

export interface TableRelativePosition {
  from: number;
  to: number;
}

export const getColumnPos = (column, tableNode: Node): TableRelativePosition => {
  const map = TableMap.get(tableNode);
  const from = map.positionAt(0, column, tableNode);
  const to = map.positionAt(map.height - 1, column, tableNode);
  return {from, to};
};

export const getRowPos = (row, tableNode: Node): TableRelativePosition => {
  const map = TableMap.get(tableNode);
  const from = map.positionAt(row, 0, tableNode);
  const to = map.positionAt(row, map.width - 1, tableNode);
  return {from, to};
};

export const getTablePos = (tableNode: Node): TableRelativePosition => {
  const map = TableMap.get(tableNode);
  const from = map.positionAt(0, 0, tableNode);
  const to = map.positionAt(map.height - 1, map.width - 1, tableNode);
  return {from, to};
};
