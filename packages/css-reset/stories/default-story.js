import { storiesOf } from '@kadira/storybook';
import React from 'react';

import '../src/index.less';

import { name } from '../package.json';

/* eslint-disable quotes, max-len,  */

storiesOf(name, module)
  .add('Headings', () => (
    <div>
      <h1>This &lt;h1&gt; element is using h800</h1>
      <h2>This &lt;h2&gt; element is using h700</h2>
      <h3>This &lt;h3&gt; element is using h600</h3>
      <h4>This &lt;h4&gt; element is using h500</h4>
      <h5>This &lt;h5&gt; element is using h400</h5>
      <h6>This &lt;h6&gt; element is using h300</h6>
    </div>
  ))
  .add('Links', () => (
    <div>
      <p><a href=".">Standard link</a></p>
      <p>Link with descenders: <a href=".">jump quickly!</a></p>
      <h2>Link in a <a href=".">heading</a></h2>
      <ul>
        <li><a href=".">links can also</a></li>
        <li><a href=".">appear in lists</a></li>
        <li><a href=".">like this</a></li>
      </ul>
    </div>
  ))
  .add('Lists (flat)', () => (
    <div>
      <h2>{`<ul>`}</h2>
      <ul>
        <li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </ul>
      <h2>&lt;ol&gt;</h2>
      <ol>
        <li>First list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </ol>
      <h2>&lt;dl&gt;</h2>
      <dl>
        <dt>First definition</dt>
        <dd>Definition description</dd>
        <dd>Definition description</dd>
        <dt>Second definition</dt>
        <dd>Definition description</dd>
        <dt>Third definition</dt>
      </dl>
    </div>
  ))
  .add('Lists (nested)', () => (
    <div>
      <h2>&lt;ul&gt;</h2>
      <ul>
        <li>First list item</li>
        <li>Second list item</li>
        <li>
          <p>Third list item</p>
          <ul>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
          </ul>
        </li>
        <li>
          <p>Fourth list item</p>
          <ol>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
          </ol>
        </li>
      </ul>
      <h2>&lt;ol&gt;</h2>
      <ol>
        <li>First list item</li>
        <li>Second list item</li>
        <li>
          <p>Third list item</p>
          <ul>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
            <li>Nested lists as well</li>
          </ul>
        </li>
        <li>
          <p>Fourth list item</p>
          <ol>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
            <li>Nested ordered lists as well</li>
          </ol>
        </li>
      </ol>
      <h2>&lt;dl&gt;</h2>
      <dl>
        <dt>First definition</dt>
        <dd>Definition description</dd>
        <dd>Definition description</dd>
        <dt>Second definition</dt>
        <dd>Definition description</dd>
        <dt>Third definition</dt>
        <dd>
          <p>Paragraphs should be fine when followed by</p>
          <ul>
            <li>lists like</li>
            <li>this one</li>
          </ul>
          <ol>
            <li>or ordered lists</li>
            <li>like this one</li>
          </ol>
        </dd>
      </dl>
    </div>
  ))
  .add('Tables (simple)', () => (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple</td>
            <td>3</td>
            <td>$5.42</td>
          </tr>
          <tr>
            <td>Orange</td>
            <td>6</td>
            <td>$4.60</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>12</td>
            <td>$3.79</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))
  .add('Tables (complex)', () => (
    <div>
      <table>
        <caption>Table captions are like headings for tabular data</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Total</th>
            <td>21</td>
            <td>$13.81</td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>Apple</td>
            <td>3</td>
            <td>$5.42</td>
          </tr>
          <tr>
            <td>Orange</td>
            <td>6</td>
            <td>$4.60</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>12</td>
            <td>$3.79</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))
  .add('Quotes', () => (
    <div>
      <h2>{`<blockquote>`} with {`<cite>`}</h2>
      <blockquote>
        <p>All that is gold does not glitter, not all those who wander are lost; The old that is strong does not wither, deep roots are not reached by the frost.</p>
        <p> From the ashes a fire shall be woken, a light from the shadows shall spring; Renewed shall be blade that was broken, the crownless again shall be king.</p>
        <p><cite>J.R.R. Tolkien, The Fellowship of the Ring</cite>.</p>
      </blockquote>
      <h2>Inline quotes with {`<q>`} and {`<cite>`}</h2>
      <p>The old addage <q>Be yourself; everyone else is already taken. <cite>Oscar Wilde</cite></q> is very fitting.</p>
    </div>
  ))
  .add('Code/Pre', () => (
    <div>
      <h2>Preformatted text using {`<pre>`}</h2>
      <pre>{
`  Item    | Qty
-------------------
  Apples  |   5
  Oranges |  10
  Grapes  |  99`
      }</pre>
      <h2>Code blocks with {`<pre> and <code>`}</h2>
      <pre>
        <code>{
`<div class="foo">
  <h1>Example markup snippet</h1>
  <p>Sona si Latine loqueris. Si <b>Hoc Legere</b> Scis Nimium Eruditionis Habes. Sentio aliquos togatos contra me conspirare.</p>
</div>`}
        </code>
      </pre>
      <h2>Inline {`<code>`}</h2>
      <p>Simply paste <code>{`body { font-weight: bold; }`}</code> into your file.</p>
    </div>
  ))
  .add('Misc elements', () => (
    <div>
      <h2>{`<time>`}</h2>
      <p>Can you move that meeting on <time datetime="2022-01-01 10:00">May 15</time> to the pub?</p>
      <h2>{`<dfn>`} and {`<abbr>`}</h2>
      <p><dfn>Recursion</dfn>: the repeated application of a recursive procedure or definition. See also: recursion.</p>
      <p>The <abbr title="AtlasKit">AK</abbr> library provides a typography component &mdash; make sure you put a title (or AkTooltip) on your {`<abbr>`} elements.</p>
      <h2>{`<ins>`} and {`<del>`}</h2>
      <p>Ice cream <del>sucks</del><ins>is awesome</ins>!</p>
      <h2>{`<sub>`} and {`<sup>`}</h2>
      <p>These elements<a href="."><sup>1</sup></a> should still<a href="."><sub>2</sub></a> have default styling<sup>3</sup> as well<sub>4</sub></p>
      <h2>Keyboard commands with {`<kbd>`}</h2>
      <p>Simply press <kbd>Alt</kbd> + <kbd>F4</kbd> to preview your changes.</p>
      <h2>Variables in a mathematical expression with {`<var>`}</h2>
      <p>A simple equation: <var>x</var> = <var>y</var> + 2</p>
      <h2>{`<small>`} text</h2>
      <p><small>Only use this size text if there is a good rationale.</small></p>
    </div>
  ));
