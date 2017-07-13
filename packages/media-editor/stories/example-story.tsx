import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {tallImage as imageDataUri} from '@atlaskit/media-test-helpers';

import {MediaEditor, LoadParameters} from '../src';
import {ShapeParameters} from '../src/common';
import {FullEditor} from './fullEditor';
import {name} from '../package.json';

const lightGrey = {red: 230, green: 230, blue: 230};
const transparent = {red: 0, green: 0, blue: 0, alpha: 0};
const red = {red: 255, green: 0, blue: 0};

const fixedDimensions = {width: 600, height: 480};
const shapeParameters = {color: red, lineWidth: 10, addShadow: true};

let loadParameters: LoadParameters;

const onLoad = (imageUrl: string, parameters: LoadParameters) => {
  action('load')(imageUrl, parameters);
  loadParameters = parameters;
};
const onError = (imageUrl: string, error: Error) => { action('error')(imageUrl, error.message, error); };
const onShapeParametersChanged = (params: ShapeParameters) => { action('shape parameters changed')(params); };

storiesOf(name, module)
  .add('fixed size', () => (
    <MediaEditor
      imageUrl={imageDataUri}
      dimensions={fixedDimensions}
      backgroundColor={lightGrey}
      shapeParameters={shapeParameters}
      tool={'arrow'}
      onLoad={onLoad}
      onError={onError}
      onShapeParametersChanged={onShapeParametersChanged}
    />
  ))
  .add('fixed with transparent background', () => (
    <MediaEditor
      imageUrl={imageDataUri}
      dimensions={fixedDimensions}
      backgroundColor={transparent}
      shapeParameters={shapeParameters}
      tool={'arrow'}
      onLoad={onLoad}
      onError={onError}
      onShapeParametersChanged={onShapeParametersChanged}
    />
  ))
  .add('full editor', () => (
    <FullEditor
      imageUrl={imageDataUri}
      backgroundColor={lightGrey}
      onLoad={onLoad}
      onError={onError}
    />
  ))
  .add('full editor with export button', () => (
    <div>
      <FullEditor
        imageUrl={imageDataUri}
        backgroundColor={lightGrey}
        onLoad={onLoad}
        onError={onError}
      />

      <button
        style={{position: 'absolute', width: '100px', height: '30px', right: '0', top: '0'}}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => {
          const image = loadParameters.imageGetter();
          if (image.isExported && image.content) {
            action('image received')(image);
            window.open(image.content);
          } else {
            action('image not received')(image);
          }
        }}
      >
        Export image
      </button>
    </div>
  ));
