# AkMediaTestHelpers

Contains all utilities related with stories and specs that affect media-* components

## Using the component

Use the component in your React app as follows:

```
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers';

const tokenProvider = StoryBookTokenProvider.tokenProvider;
const context = ContextFactory.create({ 'clientId', 'serviceHost', tokenProvider });
```

```javascript
import {StoryList} from '@atlaskit/media-test-helpers';

storiesOf('My story', {})
  .add('Examples', () => (
    <StoryList>
      {[{
          title: 'Example 1',
          content: <div>One</div>
        },
        {
          title: 'Example 2',
          content: <div>Two</div>
        }
      ]}
    </StoryList>
  )

```
