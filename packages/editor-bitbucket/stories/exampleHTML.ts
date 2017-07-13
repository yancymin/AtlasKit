const html =
`<p>Regular,
  <strong>Strong</strong>,
  <em>Italic</em>,
  <em><strong>Strong Italic</strong></em>
</p>

<hr>

<p><a href="//atlassian.com">Regular link</a>,
  <a href="//atlassian.com"><strong>strong link</strong></a>,
  <a href="//atlassian.com"><em><strong>strong italic link</strong></em></a>
</p>

<hr>

<ul>
    <li>Bullet list item 1</li>
    <li>Bullet list item 2</li>
</ul>

<hr>

<ol>
    <li>Number list item 1</li>
    <li>Number list item 2</li>
</ol>

<hr>

<pre><code>private handleChange = () => {
  const { onChange } = this.props;
  if (onChange) {
    onChange(this);
  }
}</code></pre>

<hr>

<blockquote>
  <p>Block quote first paragraph</p>
  <p>Regular,
    <strong>Strong</strong>,
    <em>Italic</em>,
    <em><strong>Strong Italic</strong></em>
  </p>
  <ul>
    <li>Bullet list item 1</li>
    <li>Bullet list item 2</li>
  </ul>
  <ol>
    <li>Number list item 1</li>
    <li>Number list item 2</li>
  </ol>
</blockquote>

<hr>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<p>Emoji <img src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg"
 alt="diamond shape with a dot inside" title="diamond shape with a dot inside" class="emoji"> example</p>
`;

export default html;
