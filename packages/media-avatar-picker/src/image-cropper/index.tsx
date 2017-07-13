/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import {CircularMask, Container, DragOverlay, RectMask, Image} from './styled';
import {isImageRemote} from '@atlaskit/media-core';

export interface LoadParameters {
  export: () => string;
}

export type OnLoadHandler = (params: LoadParameters) => void;

export interface ImageCropperProp {
  imageSource: string;
  scale?: number; // Value from 0 to 1
  containerSize?: number;
  isCircularMask?: boolean;
  top: number;
  left: number;
  imageWidth?: number;
  onDragStarted?: () => void;
  onImageSize?: (width: number, height: number) => void;
  onLoad?: OnLoadHandler;
}

const defaultScale = 1;

export class ImageCropper extends Component<ImageCropperProp, {}> {
  private imageElement: HTMLImageElement;

  static defaultProps = {
    containerSize: 200,
    isCircleMask: false,
    scale: defaultScale,
    onDragStarted: () => {},
    onImageSize: () => {},
  };

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad({
        export: this.export
      });
    }
  }

  onDragStarted = () => this.props.onDragStarted && this.props.onDragStarted();

  onImageLoaded = (e) => {
    if (this.props.onImageSize) {
      this.props.onImageSize(e.target.naturalWidth, e.target.naturalHeight);
    }
    this.imageElement = e.target;
  }

  render() {
    const {
      isCircularMask,
      containerSize,
      top,
      left,
      imageSource
    } = this.props;

    const containerStyle = {
      width: `${containerSize}px`,
      height: `${containerSize}px`
    };

    const width = this.width ? `${this.width}px` : 'auto';

    const imageStyle = {
      width,
      display: width === 'auto' ? 'none' : 'block',
      top: `${top}px`,
      left: `${left}px`,
    };
    const crossOrigin = isImageRemote(imageSource) ? 'anonymous' : undefined;

    return <Container style={containerStyle}>
      <Image crossOrigin={crossOrigin} src={imageSource} style={imageStyle} onLoad={this.onImageLoaded} />
      {isCircularMask ? <CircularMask /> : <RectMask />}
      <DragOverlay onMouseDown={this.onDragStarted} />
    </Container>;
  }

  private get width() {
    const {imageWidth, scale} = this.props;

    return imageWidth ? imageWidth * (scale || defaultScale) : 0;
  }

  export = () : string => {
    let imageData = '';
    const containerPadding = 20;
    const canvas = document.createElement('canvas');
    const {top, left, scale, containerSize} = this.props;
    const size = containerSize || 0;
    const scaleWithDefault = scale || 1;
    const destinationSize = Math.max(size - containerPadding * 2, 0);

    canvas.width = destinationSize;
    canvas.height = destinationSize;

    const context = canvas.getContext('2d');

    if (context) {
      const sourceLeft = (-left + containerPadding) / scaleWithDefault;
      const sourceTop = (-top + containerPadding) / scaleWithDefault;
      const sourceWidth = destinationSize / scaleWithDefault;
      const sourceHeight = destinationSize / scaleWithDefault;

      context.drawImage(this.imageElement,
        sourceLeft, sourceTop, sourceWidth, sourceHeight,
        0, 0, destinationSize, destinationSize);
      imageData = canvas.toDataURL();
    }

    return imageData;
  }
}
