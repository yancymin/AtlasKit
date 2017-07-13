# MediaEditor

Media Editor is a WebGL-based component that lets you annotate images.

![Example @NAME@](https://bytebucket.org/atlassian/atlaskit/raw/@BITBUCKET_COMMIT@/packages/@NAME@/docs/screencast.gif)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

The React component is named `MediaEditor`.

To use it you have to provide the following properties:

- `imageUrl` - URL of the image that should be loaded to the editor;
- `dimensions` - width and height of the editor window;
- `screenScaleFactor` (optional) - number of pixels in a screen unit;
- `backgroundColor` - background color of the editor, transparency is not supported yet;
- `shapeParameters` - color, line width, presence of shadow for created or selected shapes;
- `tool` - currently selected tool.

You should also provide the functions:

- `onLoad` - called when the image is loaded in the editor;
- `onError` - called when an error occurred during image loading;
- `onShapeParametersChanged` - occurs when the user clicks on a shape, you should update the properties of MediaEditor.

`onLoad` function provides you `loadParameters` in the second argument. You should save this value. When you need to export the image call `loadParameters.imageGetter()`.

```javascript
import {MediaEditor, LoadParameters, ShapeParameters} from '@atlaskit/media-editor';

const background = {red: 230, green: 230, blue: 230};
const shapeColor = {red: 255, green: 0, blue: 0};
const shapeParameters = {color: shapeColor, lineWidth: 10, addShadow: true};

const fixedDimensions = {width: 600, height: 480};

let loadParameters: LoadParameters;

const onLoad = (imageUrl: string, parameters: LoadParameters) => {
  loadParameters = parameters;
  console.log(`Loaded: ${imageUrl}`); 
};

const onError = (imageUrl: string, error: Error) => { 
  console.error(`Could not load ${imageUrl}. Error: ${error.message}`); 
};

const onShapeParametersChanged = (params: ShapeParameters) => { 
  console.log(`Shape parameters changed: ${params}`); 
};

<MediaEditor
  imageUrl={imageDataUri}
  dimensions={fixedDimensions}
  backgroundColor={background}
  shapeParameters={shapeParameters}
  tool={'arrow'}
  onLoad={onLoad}
  onError={onError}
  onShapeParametersChanged={onShapeParametersChanged}
/>
```
