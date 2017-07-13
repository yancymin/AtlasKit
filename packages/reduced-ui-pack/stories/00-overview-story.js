import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code } from '@atlaskit/util-readme';

// We explicitly DONT use post-css loader here so that we get the unmangled class names
import '!style-loader!css-loader!less-loader!../src/index.less';

import { name, description, main } from '../package.json';

const OverviewExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your page</title>
  <link rel="stylesheet" href="node_modules/@atlaskit/css-reset/dist/bundle.css" />
  <link rel="stylesheet" href="node_modules/${name}/${main}" />
</head>
<body>
  <p>Hello world!</p>
</body>
</html>
`;

storiesOf(name, module)
  .add('Overview', () => (
    <Readme component={name} description={description}>
      <Code code={OverviewExample} />
    </Readme>
  ));
