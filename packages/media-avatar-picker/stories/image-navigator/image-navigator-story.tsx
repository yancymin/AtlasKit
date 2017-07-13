/* tslint:disable:variable-name */
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import {tallImage, remoteImage} from '@atlaskit/media-test-helpers';
import {ImageNavigator} from '../../src';

let onLoadParams;
let imageElement;

const onLoad = (params) => {
  onLoadParams = params;
};
const exportImage = () => {
  const imageData = onLoadParams.export();

  imageElement.src = imageData;
};

function handleImgRef(img) {
  imageElement = img;
}

storiesOf('Image navigator', {})
  .add('Local image', () => {
    return <div>
            <ImageNavigator imageSource={tallImage} onLoad={onLoad} />
            <button onClick={exportImage}>Export</button>
            <img style={{position: 'absolute', top: 0, left: '300px'}} src="" alt="" ref={handleImgRef} />
           </div>;
  })
  .add('Remote image', () => {
    return <div>
            <ImageNavigator imageSource={remoteImage} onLoad={onLoad} />
            <button onClick={exportImage}>Export</button>
            <img style={{position: 'absolute', top: 0, left: '300px'}} src="" alt="" ref={handleImgRef} />
           </div>;
  })
  .add('Uploader', () => {
    return <div>
            <ImageNavigator onLoad={onLoad} />
            <button onClick={exportImage}>Export</button>
            <img style={{position: 'absolute', top: 0, left: '300px'}} src="" alt="" ref={handleImgRef} />
           </div>;
  });
