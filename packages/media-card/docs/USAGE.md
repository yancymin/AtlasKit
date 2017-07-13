# MediaCard

Exports 3 components:

1. Card
2. CardView
3. CardList

![Example @NAME@](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/@NAME@/docs/screencast.gif)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
yarn add @NAME@
```

## Using the component

**Card**

```typescript
import {Card} from '@atlaskit/media-card';
import {ContextFactory} from '@atlaskit/media-core';

const context = ContextFactory.create({ clientId, serviceHost, tokenProvider });

// url preview
const urlPreviewId = {
  mediaItemType: 'link',
  url: 'https://atlassian.com'
};

<Card context={context} identifier={urlPreviewId} />

// stored link 
const linkId = {
  mediaItemType: 'link',
  id: 'some-link-id',
  collectionName: 'some-collection-name'
};

<Card context={context} identifier={linkId} />

// stored file 
const fileId = {
  mediaItemType: 'file',
  id: 'some-file-id',
  collectionName: 'some-collection-name'
};

<Card context={context} identifier={fileId} />
```

