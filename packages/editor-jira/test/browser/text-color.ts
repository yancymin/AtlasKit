import { markFactory, nodeFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { checkParse, checkParseEncodeRoundTrips } from '../../test-helpers';
import { name } from '../../package.json';
import { JIRASchema, makeSchema } from '../../src/schema';

const schema = makeSchema({ allowTextColor: true }) as JIRASchema;

// Nodes
const doc = nodeFactory(schema.nodes.doc);
const p = nodeFactory(schema.nodes.paragraph);

// Marks
const textColor = (color: string) => markFactory(schema.marks.textColor!, { color });

describe(name, () => {
  describe('textColor', () => {
    checkParseEncodeRoundTrips('colour from palette',
      schema,
      `<p>Hello <font color="#2684ff">Atlassian</font>!</p>`,
      doc(p('Hello ', textColor('#2684ff')('Atlassian'), '!'))
    );

    checkParseEncodeRoundTrips('unknown colour',
      schema,
      `<p>Hello <font color="#663399">Atlassian</font>!</p>`,
      doc(p('Hello ', textColor('#663399')('Atlassian'), '!'))
    );

    checkParse('default colour',
      schema,
      [`<p>Hello <font color="#333333">Atlassian</font>!</p>`],
      doc(p('Hello Atlassian!'))
    );

    checkParse('3 digits hex colour',
      schema,
      [`<p>Hello <font color="#639">Atlassian</font>!</p>`],
      doc(p('Hello ', textColor('#663399')('Atlassian'), '!'))
    );

    checkParse('named colour',
      schema,
      [`<p>Hello <font color="royalblue">Atlassian</font>!</p>`],
      doc(p('Hello ', textColor('#4169e1')('Atlassian'), '!'))
    );

    checkParse('colour with extra whitespace',
      schema,
      [`<p>Hello <font color="   #663399   ">Atlassian</font>!</p>`],
      doc(p('Hello ', textColor('#663399')('Atlassian'), '!'))
    );

    checkParse('invalid colour',
      schema,
      [`<p>Hello <font color="lool">Atlassian</font>!</p>`],
      doc(p('Hello Atlassian!'))
    );
  });
});
