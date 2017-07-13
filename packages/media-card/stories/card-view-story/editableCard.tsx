import * as React from 'react';
import {Component} from 'react';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import {
  videoFileDetails,
  imageFileDetails,
  audioFileDetails,
  docFileDetails,
  unknownFileDetails,
  genericLinkDetails,
  gifDataUri,
  smallImage,
  smallTransparentImage,
  tallImage,
  wideImage,
  wideTransparentImage
} from '@atlaskit/media-test-helpers';
import {MediaItemDetails, ImageResizeMode} from '@atlaskit/media-core';
import Toggle from '@atlaskit/toggle';
import Slider from '@atlaskit/field-range';
import {CardView} from '../../src/root/cardView';
import {CardAppearance, CardStatus, CardDimensions} from '../../src';
import {openAction, closeAction, deleteAction, actions} from './chapters/utils';
import {EditableCardOptions, EditableCardContent, SliderWrapper, OptionsWrapper, CardDimensionsWrapper} from './styled';
import {defaultImageCardDimensions} from '../../src/utils/cardDimensions';

const appearanceOptions = [
  { value: 'auto', label: 'Auto', defaultSelected: true },
  { value: 'small', label: 'Small', },
  { value: 'image', label: 'Image' },
  { value: 'square', label: 'Square' },
  { value: 'horizontal', label: 'Horizontal' }
];
const metadataOptions = [
  { value: 'fileImage', label: 'File image', defaultSelected: true },
  { value: 'fileVideo', label: 'File video' },
  { value: 'fileAudio', label: 'File audio' },
  { value: 'fileDoc', label: 'File doc' },
  { value: 'fileUnknown', label: 'File unknown' },
  { value: 'genericLink', label: 'Link generic' }
];
const dataURIOptions = [
  { value: gifDataUri, label: 'Gif', defaultSelected: true },
  { value: smallImage, label: 'Small', },
  { value: smallTransparentImage, label: 'Small transparent', },
  { value: tallImage, label: 'Tall', },
  { value: wideImage, label: 'Wide', },
  { value: wideTransparentImage, label: 'Wide transparent', },
  { value: undefined, label: 'No Image', }
];
const statusOptions = [
  {value: 'complete', label: 'complete', defaultSelected: true},
  {value: 'uploading', label: 'uploading'},
  {value: 'loading', label: 'loading'},
  {value: 'processing', label: 'processing'},
  {value: 'error', label: 'error'}
];
const resizeModeOptions = [
  {value: 'crop', label: 'crop', defaultSelected: true},
  {value: 'fit', label: 'fit'},
  {value: 'full-fit', label: 'full-fit'}
];

export const generateStoriesForEditableCards = () => {
  interface EditableCardProps {

  }

  interface EditableCardState {
    appearance: CardAppearance;
    status: CardStatus;
    dimensions: CardDimensions;
    metadata: MediaItemDetails;
    dataURI: string;
    progress: number;
    menuActions: any;
    selectable: boolean;
    selected: boolean;
    resizeMode: ImageResizeMode;
  }

  class EditableCard extends Component<EditableCardProps, EditableCardState> {
    debounced: any;

    constructor(props) {
      super(props);

      this.state = {
        appearance: 'auto',
        status: 'complete',
        metadata: imageFileDetails,
        dataURI: gifDataUri,
        dimensions: {
          width: defaultImageCardDimensions.width,
          height: defaultImageCardDimensions.height
        },
        progress: 0,
        menuActions: actions,
        selectable: false,
        selected: false,
        resizeMode: 'crop'
      };
    }

    render() {
      const {appearance, status, dataURI, dimensions, metadata, menuActions, progress, selectable, selected, resizeMode} = this.state;
      const width = parseInt(`${dimensions.width}`, 0);
      const height = parseInt(`${dimensions.height}`, 0);

      return (
        <div>
          <EditableCardOptions>
            <h3>Edit me</h3>
            <SliderWrapper>
              <div>
                Width ({width})
                <Slider value={width} min={144} max={800} onChange={this.onWidthChange} />
              </div>
              <div>
                Height ({height})
                <Slider value={height} min={50} max={800} onChange={this.onHeightChange} />
              </div>
              <div>
                Progress ({progress})
                <Slider value={progress} min={0} max={1} onChange={this.onProgressChange} />
              </div>
              <div>
                Actions <hr/>
                <div>
                  <input type="checkbox" onChange={this.onActionsChange(openAction)} checked={this.isActionChecked(openAction)}/> Open
                </div>
                <div>
                  <input type="checkbox" onChange={this.onActionsChange(closeAction)} checked={this.isActionChecked(closeAction)}/> Close
                </div>
                <div>
                  <input type="checkbox" onChange={this.onActionsChange(deleteAction)} checked={this.isActionChecked(deleteAction)}/> Delete
                </div>
              </div>
              <div>
                Selectable
                <Toggle
                  isDefaultChecked={false}
                  onChange={this.onSelectableChange}
                />
                <hr />
                Selected
                <Toggle
                  isDefaultChecked={false}
                  onChange={this.onSelectedChange}
                />
              </div>
            </SliderWrapper>
            <OptionsWrapper>
              <FieldRadioGroup
                label="Appearance"
                items={appearanceOptions}
                onRadioChange={this.onAppearanceChange}
              />
              <FieldRadioGroup
                label="Metadata"
                items={metadataOptions}
                onRadioChange={this.onMetadataChange}
              />
              <FieldRadioGroup
                label="URI"
                items={dataURIOptions}
                onRadioChange={this.onDataURIChange}
              />
              <FieldRadioGroup
                label="Status"
                items={statusOptions}
                onRadioChange={this.onStatusChange}
              />
              <FieldRadioGroup
                label="Resize mode"
                items={resizeModeOptions}
                onRadioChange={this.onResizeModeChange}
              />
            </OptionsWrapper>
          </EditableCardOptions>
          <EditableCardContent>
            <CardDimensionsWrapper>
              {width}x{height}
            </CardDimensionsWrapper>
            <CardView
              appearance={appearance}
              status={status}
              metadata={metadata}
              dataURI={dataURI}
              dimensions={dimensions}
              actions={menuActions}
              progress={progress}
              selectable={selectable}
              selected={selected}
              resizeMode={resizeMode}
            />
          </EditableCardContent>
        </div>
      );
    }

    onSelectedChange = (e) => {
      this.setState({selected: !this.state.selected});
    }

    onSelectableChange = (e) => {
      this.setState({selectable: !this.state.selectable});
    }

    isActionChecked = action => this.state.menuActions.includes(action);

    onActionsChange = (action) => (e) => {
      const {checked} = e.target;
      const {menuActions} = this.state;

      if (checked) {
        menuActions.push(action);
      } else {
        menuActions.splice(menuActions.indexOf(action), 1);
      }

      this.setState({menuActions});
    }

    onAppearanceChange = (e) => {
      const appearance = e.target.value;
      this.setState({appearance});
    }

    onMetadataChange = (e) => {
      const label = e.target.value;

      this.setState({
        metadata: {
          fileImage: imageFileDetails,
          fileVideo: videoFileDetails,
          fileAudio: audioFileDetails,
          fileDoc: docFileDetails,
          fileUnknown: unknownFileDetails,
          genericLink: genericLinkDetails,
        }[label]
      });
    }

    onDataURIChange = (e) => {
      const dataURI = e.target.value;

      this.setState({dataURI});
    }

    onStatusChange = (e) => {
      const status = e.target.value;

      this.setState({status});
    }

    onResizeModeChange = (e) => {
      const resizeMode = e.target.value;

      this.setState({resizeMode});
    }

    onWidthChange = (e) => {
      const dimensions = this.state.dimensions;

      dimensions.width = e;
      this.setState({dimensions});
    }

    onHeightChange = (e) => {
      const dimensions = this.state.dimensions;

      dimensions.height = e;
      this.setState({dimensions});
    }

    onProgressChange = (progress) => {
      this.setState({progress});
    }
  }

  return <EditableCard />;
};
