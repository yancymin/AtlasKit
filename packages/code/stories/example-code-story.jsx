import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
  akColorN50,
  akColorN90,
  akColorN400,
  akColorN600,
  akColorG200,
  akColorB100,
  akColorR100,
  akColorT300,
  akColorT500,
  akColorP75,
} from '@atlaskit/util-shared-styles';

import { name } from '../package.json';

/* eslint-disable import/no-duplicates, import/first */
import { AkCode, AkCodeBlock } from '@atlaskit/code';
/* eslint-enable import/no-duplicates, import/first */

storiesOf(name, module)
  .add('Code Example', () => {
    const props = {
      text: 'const map = new Map({ key: \'value\' })',
      language: 'javascript',
    };
    return (
      <span>Here is some inline code: <AkCode {...props} /></span>
    );
  }
  )
  .add('CodeBlock Example', () => {
    const props = {
      text: `import _ from 'lodash';

export class HttpError {
  constructor({ message, statusCode }) {
    this.message = message;
    this.statusCode = statusCode;
    this.stack = new Error().stack;
  }
}`,
      language: 'javascript',
      showLineNumbers: true,

    };
    return (
      <AkCodeBlock {...props} />
    );
  }
  )
  .add('CodeBlock With Custom Theme Example', () => {
    const theme = {
      lineNumberColor: akColorN90,
      lineNumberBgColor: akColorN600,
      backgroundColor: akColorN400,
      textColor: akColorN50,
      substringColor: akColorN400,
      keywordColor: akColorP75,
      attributeColor: akColorT500,
      selectorTagColor: akColorP75,
      nameColor: akColorP75,
      builtInColor: akColorP75,
      literalColor: akColorP75,
      bulletColor: akColorP75,
      codeColor: akColorP75,
      additionColor: akColorP75,
      regexpColor: akColorT300,
      symbolColor: akColorT300,
      variableColor: akColorT300,
      templateVariableColor: akColorT300,
      linkColor: akColorB100,
      selectorAttributeColor: akColorT300,
      selectorPseudoColor: akColorT300,
      typeColor: akColorT500,
      stringColor: akColorG200,
      selectorIdColor: akColorT500,
      selectorClassColor: akColorT500,
      quoteColor: akColorT500,
      templateTagColor: akColorT500,
      deletionColor: akColorT500,
      titleColor: akColorR100,
      sectionColor: akColorR100,
      commentColor: akColorN90,
      metaKeywordColor: akColorG200,
      metaColor: akColorN400,
      functionColor: akColorG200,
      numberColor: akColorB100,
    };
    const props = {
      text: `// Create a map.
final IntIntOpenHashMap map = new IntIntOpenHashMap();
map.put(1, 2);
map.put(2, 5);
map.put(3, 10);

int count = map.forEach(new IntIntProcedure()
{
   int count;
   public void apply(int key, int value)
   {
       if (value >= 5) count++;
   }
}).count;
System.out.println("There are " + count + " values >= 5");`,
      language: 'java',
      showLineNumbers: true,
      theme,
    };
    return (
      <AkCodeBlock {...props} />
    );
  }
  );
