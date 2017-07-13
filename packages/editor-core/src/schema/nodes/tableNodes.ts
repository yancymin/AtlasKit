import { tableNodes, NodeSpec } from '../../prosemirror';

// TS doesn't generate type if we destructure here
const nodes = tableNodes({
  tableGroup: 'block',
  cellContent: 'block+',
  cellAttributes: {
    background: {
      default: null,
      getFromDOM(dom) {
        return dom.style.backgroundColor || null;
      },
      setDOMAttr(value, attrs) {
        if (value) {
          attrs.style = (attrs.style || '') + `backgroundcolor: ${value};`;
        }
      }
    }
  }
});

const table: NodeSpec = {...nodes.table, content: 'tableRow+'};
const tableCell: NodeSpec = nodes.table_cell;
const tableHeader: NodeSpec = nodes.table_header;
const tableRow: NodeSpec = {...nodes.table_row, content: '(tableCell | tableHeader)*'};

export {
  table,
  tableCell,
  tableHeader,
  tableRow
};
