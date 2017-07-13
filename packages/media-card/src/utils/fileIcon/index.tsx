/* tslint:disable:variable-name */
import * as React from 'react';
import {Component} from 'react';
import audio from '@atlaskit/icon/glyph/audio';
import doc from '@atlaskit/icon/glyph/document';
import image from '@atlaskit/icon/glyph/image';
import video from '@atlaskit/icon/glyph/media-services/video';
import unknown from '@atlaskit/icon/glyph/page';

import {FileTypeIcon} from './styled';

export interface FileIconProps {
  mediaType?: string;
  style?: any;
  iconUrl?: string;
}

const icons = {
  audio,
  doc,
  image,
  video,
  unknown
};

export class FileIcon extends Component<FileIconProps, {}> {
  render() {
    const type = this.props.mediaType || 'unknown';
    const fileTypeIconClass = `file-type-icon ${type}`;
    const IconType = icons[type] || icons['unknown'];
    const defaultIcon = <IconType className={fileTypeIconClass} size="small" label="fileIcon"/>;
    const icon = this.props.iconUrl ? <img src={this.props.iconUrl} className="custom-icon" alt={type} /> : defaultIcon;

    return <FileTypeIcon style={this.props.style} className={fileTypeIconClass}>
            {icon}
           </FileTypeIcon>;
  }
}
