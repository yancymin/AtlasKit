# MediaFilmstrip

Provides a component that shows multiple media cards horizontally. Allows to navigate through the stored cards.

![Example @NAME@](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/@NAME@/docs/screencast.gif)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

**FilmStripView**

```javascript
import {FilmStripView} from '@atlaskit/media-filmstrip';
import {CardActionType} from '@atlaskit/media-core';

// Menu actions on cards
var menuActions = [
  {
    label: 'Open',
    type: CardActionType.custom,
    handler: openHandler
  },
  {
    label: 'Delete',
    type: CardActionType.delete,
    handler: eventHander  
  }
];

// Event triggered when the user clicks on a card
var clickAction = function (clickedItem, allItems) {
  console.log(clickedItem, allItems);
}

// Items to be shown in the filmstrip
var items = [
  {
    id: 'bac57089-23dd-4482-bc1d-657b21f1304a',
    progress: 0.75,
    dataURI: fileDataUri,
    mediaName: 'in progress...',
    mediaType: 'image',
    mediaSize: 8041
  },
  {
    id: 'c41f1a45-fb26-42c5-a385-2c35c269b2e3',
    dataURI: imageDataUri,
    mediaName: 'some image',
    mediaType: 'image',
    mediaSize: 8041
  }
];
    
<FilmStripView
  items={items}
  onClick={clickAction}
  menuActions={menuActions}
  width={550}
 />
```
