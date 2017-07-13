import { markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { checkParse, checkEncode, checkParseEncodeRoundTrips } from '../../test-helpers';

import { name } from '../../package.json';
import { JIRASchema, makeSchema } from '../../src/schema';
import { expect } from 'chai';
import { encode, parse } from '../../src/html';

export const schema = makeSchema({ allowSubSup: true }) as JIRASchema;

// Nodes
let doc = nodeFactory(schema.nodes.doc);
let p = nodeFactory(schema.nodes.paragraph);
let br = schema.node(schema.nodes.hardBreak);
let h1 = nodeFactory(schema.nodes.heading, { level: 1 });
let h2 = nodeFactory(schema.nodes.heading, { level: 2 });
let h3 = nodeFactory(schema.nodes.heading, { level: 3 });
let h4 = nodeFactory(schema.nodes.heading, { level: 4 });
let h5 = nodeFactory(schema.nodes.heading, { level: 5 });
let h6 = nodeFactory(schema.nodes.heading, { level: 6 });
let hr = nodeFactory(schema.nodes.rule);

// Marks
let em = markFactory(schema.marks.em);
let strong = markFactory(schema.marks.strong);
let sub = markFactory(schema.marks.subsup, { type: 'sub' });
let sup = markFactory(schema.marks.subsup, { type: 'sup' });
let u = markFactory(schema.marks.underline);

describe(`${name} html:`, () => {
  describe('paragraphs:', () => {
    checkParseEncodeRoundTrips('empty',
      schema,
      '',
      doc(p('')));

    checkParseEncodeRoundTrips('a paragraph with text',
      schema,
      '<p>Text here.</p>',
      doc(p('Text here.')));

    checkParseEncodeRoundTrips('two adjacent paragraphs',
      schema,
      '<p>Text here.</p><p>And more here.</p>',
      doc(
        p('Text here.'),
        p('And more here.'),
      ));

    checkParseEncodeRoundTrips('a paragraph with a hard break in it',
      schema,
      '<p>Text on two<br />lines.</p>',
      doc(
        p('Text on two', br, 'lines.'),
      ));
  });

  describe('breaks:', () => {
    checkParseEncodeRoundTrips('a hard break in a paragraph',
      schema,
      '<p>one<br />two</p>',
      doc(p('one', br, 'two')));

    checkParseEncodeRoundTrips('multiple hard break in a paragraph',
      schema,
      '<p>one<br /><br />two</p>',
      doc(p('one', br, br, 'two')));
  });

  describe('marks formatting:', () => {
    describe('checkParseEncodeRoundTrips', () => {
      let customSchema;
      let code;

      before(() => {
        customSchema = makeSchema({ allowAdvancedTextFormatting: true, allowSubSup: true }) as JIRASchema;
        code = markFactory(customSchema.marks.code);
        doc = nodeFactory(customSchema.nodes.doc);
        p = nodeFactory(customSchema.nodes.paragraph);
        strong = markFactory(customSchema.marks.strong);
      });

      it(`parses HTML: <tt> tag`, () => {
        const node = doc(p(
          'Text with ',
          code('code words'),
          '.'
        ));
        const actual = parse('<p>Text with <tt>code words</tt>.</p>', customSchema);
        expect(actual).to.deep.equal(node);
      });

      it(`encodes HTML: <tt> tag`, () => {
        const node = doc(p(
          'Text with ',
          code('code words'),
          '.'
        ));
        const encoded = encode(node, customSchema);
        expect('<p>Text with <tt>code words</tt>.</p>').to.deep.equal(encoded);
      });

      it(`round-trips HTML: <tt> tag`, () => {
        const node = doc(p(
          'Text with ',
          code('code words'),
          '.'
        ));
        const roundTripped = parse(encode(node, customSchema), customSchema);
        expect(roundTripped).to.deep.equal(node);
      });

      it(`parses HTML: <tt> and <b>`, () => {
        const node = doc(p(
          'Text with ',
          strong(code('code words')),
          '.'
        ));
        const htmls = [
          '<p>Text with <tt><b>code words</b></tt>.</p>',
          '<p>Text with <b><tt>code words</tt></b>.</p>'
        ];
        for (const html of htmls) {
          const actual = parse(html, customSchema);
          expect(actual).to.deep.equal(node);
        }
      });
    });

    checkParseEncodeRoundTrips('<ins> tag',
      schema,
      '<p>Text with <ins>underline words</ins>.</p>',
      doc(p(
        'Text with ',
        u('underline words'),
        '.'
      )));

    checkParseEncodeRoundTrips('<em> tag',
      schema,
      '<p>Text with <em>emphasised words</em>.</p>',
      doc(p(
        'Text with ',
        em('emphasised words'),
        '.'
      )));

    checkParseEncodeRoundTrips('<b> tag',
      schema,
      '<p>Text with <b>strong words</b>.</p>',
      doc(p(
        'Text with ',
        strong('strong words'),
        '.'
      )));

    checkParse('<b> and <em>',
      schema,
      [
        '<p>Text with <b><em>strong emphasised words</em></b>.</p>',
        '<p>Text with <em><b>strong emphasised words</b></em>.</p>'
      ],
      doc(p(
        'Text with ',
        em(strong('strong emphasised words')),
        '.'
      )));

    checkEncode('<b> and <em>',
      schema,
      doc(p(
        'Text with ',
        em(strong('strong emphasised words')),
        '.'
      )),
      '<p>Text with <em><b>strong emphasised words</b></em>.</p>');

    describe('checkParseEncodeRoundTrips', () => {
      it(`parses HTML: <del> tag`, () => {
        const customSchema = makeSchema({ allowAdvancedTextFormatting: true, allowSubSup: true }) as JIRASchema;
        const strike = markFactory(customSchema.marks.strike);
        doc = nodeFactory(customSchema.nodes.doc);
        p = nodeFactory(customSchema.nodes.paragraph);
        const node = doc(p(strike('struck')));
        const actual = parse('<p><del>struck</del></p>', customSchema);
        expect(actual).to.deep.equal(node);
      });

      it(`encodes HTML: <del> tag`, () => {
        const customSchema = makeSchema({ allowAdvancedTextFormatting: true, allowSubSup: true }) as JIRASchema;
        const strike = markFactory(customSchema.marks.strike);
        doc = nodeFactory(customSchema.nodes.doc);
        p = nodeFactory(customSchema.nodes.paragraph);
        const node = doc(p(strike('struck')));
        const encoded = encode(node, customSchema);
        expect('<p><del>struck</del></p>').to.deep.equal(encoded);
      });

      it(`round-trips HTML: <del> tag`, () => {
        const customSchema = makeSchema({ allowAdvancedTextFormatting: true, allowSubSup: true }) as JIRASchema;
        const strike = markFactory(customSchema.marks.strike);
        doc = nodeFactory(customSchema.nodes.doc);
        p = nodeFactory(customSchema.nodes.paragraph);
        const node = doc(p(strike('struck')));
        const roundTripped = parse(encode(node, customSchema), customSchema);
        expect(roundTripped).to.deep.equal(node);
      });
    });

    checkParseEncodeRoundTrips('<sub>',
      schema,
      '<p>Text with <sub>subscript emphasised words</sub>.</p>',
      doc(p(
        'Text with ',
        sub('subscript emphasised words'),
        '.'
      )));

    checkEncode('<em> and <sub>',
      schema,
      doc(p(
        'Text with ',
        em(sub('subscript emphasised words')),
        '.'
      )),
      '<p>Text with <em><sub>subscript emphasised words</sub></em>.</p>');

    checkParse('<em> and <sub>',
      schema,
      [
        '<p>Text with <em><sub>subscript emphasised words</sub></em>.</p>',
        '<p>Text with <sub><em>subscript emphasised words</em></sub>.</p>'
      ],
      doc(p(
        'Text with ',
        em(sub('subscript emphasised words')),
        '.'
      )));

    checkParseEncodeRoundTrips('<sup>',
      schema,
      '<p>Text with <sup>subscript emphasised words</sup>.</p>',
      doc(p(
        'Text with ',
        sup('subscript emphasised words'),
        '.'
      )));

    checkEncode('<em> and <sup>',
      schema,
      doc(p(
        'Text with ',
        em(sup('subscript emphasised words')),
        '.'
      )),
      '<p>Text with <em><sup>subscript emphasised words</sup></em>.</p>');

    checkParse('<em> and <sup>',
      schema,
      [
        '<p>Text with <em><sup>subscript emphasised words</sup></em>.</p>',
        '<p>Text with <sup><em>subscript emphasised words</em></sup>.</p>'
      ],
      doc(p(
        'Text with ',
        em(sup('subscript emphasised words')),
        '.'
      )));
  });

  describe('heading:', () => {
    checkParseEncodeRoundTrips('<h1> with anchor',
      schema,
      '<h1><a name="Readallaboutit%21"></a>Read all about it!</h1>',
      doc(h1('Read all about it!')));

    checkParseEncodeRoundTrips('<h2> with anchor',
      schema,
      '<h2><a name="Readallaboutit%21"></a>Read all about it!</h2>',
      doc(h2('Read all about it!')));

    checkParseEncodeRoundTrips('<h3> with anchor',
      schema,
      '<h3><a name="Readallaboutit%21"></a>Read all about it!</h3>',
      doc(h3('Read all about it!')));

    checkParseEncodeRoundTrips('<h4> with anchor',
      schema,
      '<h4><a name="Readallaboutit%21"></a>Read all about it!</h4>',
      doc(h4('Read all about it!')));

    checkParseEncodeRoundTrips('<h5> with anchor',
      schema,
      '<h5><a name="Readallaboutit%21"></a>Read all about it!</h5>',
      doc(h5('Read all about it!')));

    checkParseEncodeRoundTrips('<h6> with anchor',
      schema,
      '<h6><a name="Readallaboutit%21"></a>Read all about it!</h6>',
      doc(h6('Read all about it!')));

    checkParseEncodeRoundTrips('<h1> with nested <b>',
      schema,
      '<h1><a name="Readallaboutit%21"></a>Read all <b>about</b> it!</h1>',
      doc(
        h1(
          'Read all ',
          strong('about'),
          ' it!'
        )
      ));

    checkParseEncodeRoundTrips('<h1> with nested <b><em>',
      schema,
      '<h1><a name="Readallaboutit%21"></a>Read all <em><b>about</b></em> it!</h1>',
      doc(
        h1(
          'Read all ',
          em(strong('about')),
          ' it!'
        )
      ));
  });

  describe('horizontal rule', () => {
    checkParseEncodeRoundTrips('single <hr />',
      schema,
      '<hr />',
      doc(hr()));

    checkParseEncodeRoundTrips('multiple <hr />',
      schema,
      '<hr /><hr />',
      doc(hr(), hr()));
  });

  describe('issue macros', () => {
    checkParse('to plain text',
      schema,
      [
        '<span class="jira-issue-macro" data-jira-key="ED-1" >' +
        '<a href="https://product-fabric.atlassian.net/browse/ED-1" class="jira-issue-macro-key issue-link"  title="BitBucket RTE experiment" >' +
        '<img class="icon" src="https://product-fabric.atlassian.net/images/icons/issuetypes/epic.svg" />' +
        'ED-1' +
        '</a>' +
        '<span class="aui-lozenge aui-lozenge-subtle aui-lozenge-current jira-macro-single-issue-export-pdf">' +
        'In Progress' +
        '</span>' +
        '</span>'
      ],
      doc(p('ED-1')));
  });
});

// Color text span
// ```````````````````````````````` xample
// <span style="color: rgb(23,43,77);">Background</span>
// .
// {"type":"doc","content":[
// 		{"type":"text","text":"Background",
// 			"marks":[{"type":"color", "attrs": { "color": "rgb(23,43,77)"}}]
// 		}
// ]}
// ````````````````````````````````

// Alignment span - @todo can these appear on anything other than a p? is this the right markup?
// ```````````````````````````````` xample
// <p style="text-align: right;">Right wing</p>
// .
// {"type":"doc","content":[ {"type":"paragraph",
// 	"attrs": {"align":"right"},
// 	"content": [{"type":"text","text":"Right wing"}]
// }]}
// ````````````````````````````````


// All the less used formatting types
// ```````````````````````````````` xample
// <s>struck</s> <del>struck</del> <u>under</u> <ins>ins</ins> <sup>high</sup> <sub>low</sub> <small>tiny</small> <big>huge</big>
// .
// {"type":"doc","content":[
// 	{"type":"text","text":"struck","marks":[{"type":"strikethrough"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"struck","marks":[{"type":"strikethrough"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"under","marks":[{"type":"underline"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"ins","marks":[{"type":"underline"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"high","marks":[{"type":"superscript"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"low","marks":[{"type":"subscript"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"tiny","marks":[{"type":"small"}]},
// 	{"type":"text","text":" "},
// 	{"type":"text","text":"huge","marks":[{"type":"big"}]}
// ]}
// ````````````````````````````````


// ## Other Blocks
// ```````````````````````````````` xample
// <blockquote>Elementary my dear Watson</blockquote>
// .
// {"type":"doc","content":[
// 	{"type":"blockquote", "content":[
// 			{"type":"text","text":"Elementary my dear Watson"}
// 	]}
// ]}
// ````````````````````````````````
// Pre
// ```````````````````````````````` xample
// <pre>Elementary my dear Watson</pre>
// .
// {"type":"doc","content":[
// 	{"type":"pre", "content":[
// 			{"type":"text","text":"Elementary my dear Watson"}
// 	]}
// ]}
// ````````````````````````````````
