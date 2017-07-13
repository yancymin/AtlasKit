import { nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { checkParseEncodeRoundTrips, checkEncode, checkParse } from '../../test-helpers';
import { name } from '../../package.json';
import { JIRASchema, makeSchema } from '../../src/schema';

const schema = makeSchema({ allowCodeBlock: true }) as JIRASchema;

// Nodes
const code = (attrs: { language?: string }) => nodeFactory(schema.nodes.codeBlock!, attrs);
const doc = nodeFactory(schema.nodes.doc);

describe(name, () => {
  describe('code block', () => {
    checkParseEncodeRoundTrips('code_block node',
      schema,
      `<div class="code panel"><div class="codeContent panelContent"><pre class="code-javascript">var foo = "bar";</pre></div></div>`,
      doc(code({ language: 'javascript' })('var foo = "bar";'))
    );

    checkParseEncodeRoundTrips('multiline code_block node',
      schema,
      `<div class="code panel"><div class="codeContent panelContent"><pre class="code-javascript">var foo = "bar";\nfoo += "baz";</pre></div></div>`,
      doc(code({ language: 'javascript' })(`var foo = "bar";\nfoo += "baz";`))
    );

    checkEncode('default language is plain',
      schema,
      doc(code({})('var foo = "bar";')),
      `<div class="code panel"><div class="codeContent panelContent"><pre class="code-plain">var foo = "bar";</pre></div></div>`,
    );

    checkEncode('lowercase language',
      schema,
      doc(code({ language: 'JavaScript' })('var foo = "bar";')),
      `<div class="code panel"><div class="codeContent panelContent"><pre class="code-javascript">var foo = "bar";</pre></div></div>`,
    );

    checkParse('JIRA preformatted macros',
      schema,
      [`<div class="preformatted panel"><div class="preformattedContent panelContent"><pre>*no* further _formatting_</pre></div></div>`],
      doc(code({ language: 'plain' })('*no* further _formatting_'))
    );

    checkParse('strip spans',
      schema,
      [
        `<div class="code panel"><div class="codeContent panelContent"><pre class="code-java"><span class="code-comment">// Some comments here
</span><span class="code-keyword">public</span> <span class="code-object">String</span> getFoo()
{
    <span class="code-keyword">return</span> foo;
}</pre></div></div>`
      ],
      doc(code({ language: 'java' })(`// Some comments here
public String getFoo()
{
    return foo;
}`)
      )
    );

    checkParse('empty content',
      schema,
      ['<div class="code panel"><div class="codeContent panelContent"><pre class="code-plain"></pre></div></div>'],
      doc(code({ language: 'plain' })())
    );
  });
});
