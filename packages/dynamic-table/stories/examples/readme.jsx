import React from 'react';
import { Code } from '@atlaskit/util-readme';

export default (
  <div>
    <blockquote>Table component with pagination and sorting functionality.</blockquote>
    <h1>Structure</h1>
    <p>Every <strong>BodyCell</strong> has the following shape:</p>
    <Code>
      {
        `
            const BodyCellShape = PropTypes.shape(
                key: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string,
                    PropTypes.bool,
                ]),
                content: PropTypes.node,
            )
        `
    }
    </Code>
    <p>where:</p>
    <ul>
      <li><strong>key</strong> is a <em>raw</em> value of the cell.</li>
      <li><strong>content</strong> is the displayed representation of said value.</li>
      <li>any extra props will be passed down to <code>{'<td>'}</code> tag.</li>
    </ul>

    <p><strong>HeadCells</strong> extend upon that shape:</p>
    <Code>
      {
        `
        const HeadCellShape = React.PropTypes.shape(
            key: React.PropTypes.oneOfType([
                React.PropTypes.number,
                React.PropTypes.string,
                React.PropTypes.bool,
            ]),
            content: React.PropTypes.node,
            width: React.PropTypes.number,
            isSortable: React.PropTypes.bool,
            shouldTruncate: React.PropTypes.bool
        )
        `
    }
    </Code>
    <p>where:</p>
    <ul>
      <li>
        <strong>width</strong> is a percentage of the total width of the table the column occupies.
        </li>
      <li>
        <strong>isSortable</strong> should the column be sortable
        (make sure the <strong>key</strong> is present).
        </li>
      <li>
        <strong>shouldTruncate</strong> should the {'column\'s'} content be truncated with ellipsis when {'table\'s'} prop <code>isFixedSize === true</code>.
        </li>
      <li>
        any extra props will be passed down to <code>{'<th>'}</code> tag.
      </li>
    </ul>

    <h2>Props Types</h2>

    <h3>head</h3>
    <p>Table head</p>
    <p><strong>type</strong>: <code>object</code></p>
    <Code>
      {`
            React.PropTypes.shape({
                cells: React.PropTypes.arrayOf(HeadCellShape),
            })
        `}
    </Code>

    <p>any extra props will be passed down to <code>{'<thead>'}</code> tag.</p>

    <h3>rows</h3>
    <p>Table rows</p>
    <p><strong>type</strong>: <code>array</code></p>
    <Code>
      {`
            React.PropTypes.arrayOf(React.PropTypes.shape({
                cells: React.PropTypes.arrayOf(RowCellShape),
            }));
        `}
    </Code>
    <ul>
      <li>
            any extra props on each <strong>row</strong> will be passed down to <code>{'<tr>'}</code> tag
        </li>
      <li>
            any extra props on each <strong>cell</strong> will be passed down to <code>{'<td>'}</code> tag
        </li>
    </ul>

    <h3>defaultSortKey</h3>
    <p><strong>type</strong>: <code>string</code></p>
    <p>Key to sort by by default.</p>

    <h3>defaultSortOrder</h3>
    <p><strong>type</strong>: <code>string</code></p>
    <p><strong>default</strong>: <code>{'ASC'}</code></p>
    <p>Either <code>{'ASC'}</code> or <code>{'DESC'}</code>.</p>

    <h3>isFixedSize</h3>
    <p><strong>type</strong>: bool</p>
    <p><strong>default</strong>: <code>false</code></p>
    <p>
        Adds <code>table-layout: fixed</code> css rule to the table.
        Affects whether the columns can be truncated.
    </p>

    <h3>rowsPerPage</h3>
    <p><strong>type</strong>: <code>int</code></p>
    <p><strong>default</strong>: <code>Infinity</code></p>
    <p>Number of rows per page.</p>

    <h3>onSetPage</h3>
    <p><strong>type</strong>: <code>React.PropTypes.func</code></p>
    <p>Callback, invoked on pagination navigation</p>

    <h3>onSort</h3>
    <p><strong>type</strong>: <code>React.PropTypes.func</code></p>
    <p>Callback, invoked on table sort.</p>

    <h3>emptyView</h3>
    <p><strong>type</strong>: <code>React.PropTypes.node</code></p>
    <p><strong>default</strong>: <code>null</code></p>
    <p>React element to display when table contains no data.</p>

    <h3>defaultPage</h3>
    <p><strong>type</strong>: int</p>
    <p><strong>default</strong>: <code>1</code></p>
    <p>Current page.</p>
  </div>
);
