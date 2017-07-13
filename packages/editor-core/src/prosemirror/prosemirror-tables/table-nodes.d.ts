import { NodeSpec, dom } from '../';

export interface TableNodesOptions {
  tableGroup?: string;
  cellContent: string;
  cellAttributes: { [key: string]: CellAttributes };
}

export interface CellAttributes {
  default: any;
  getFromDOM?: (dom: dom.DOMElement) => any;
  setDOMAttr?: (value: any, attrs: any) => any;
}

export interface TableNodes {
  table: NodeSpec;
  table_row: NodeSpec;
  table_cell: NodeSpec;
  table_header: NodeSpec;
}

export function tableNodes(options: TableNodesOptions): TableNodes;
