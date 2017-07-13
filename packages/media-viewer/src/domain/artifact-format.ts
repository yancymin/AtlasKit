import { MediaItem, FileItem, FileDetails } from '@atlaskit/media-core';

export interface ArtifactFormat {
  readonly type: string;
  readonly name: string;
}

export class ArtifactFormat {
  static fromMediaItem(mediaItem: MediaItem): ArtifactFormat | undefined {
    if (mediaItem.type === 'file') {
      return ArtifactFormat.fromFileItem(mediaItem);
    }
  }

  static fromFileItem(fileItem: FileItem): ArtifactFormat | undefined {
    return ArtifactFormat.fromFileDetails(fileItem.details);
  }

  static fromFileDetails(details: FileDetails): ArtifactFormat | undefined {
    return ArtifactFormat.fromMimeType(details.mimeType)
      || ArtifactFormat.fromMediaType(details.mediaType);
  }

  static fromMimeType(mimeType?: string): ArtifactFormat | undefined {
    const byMimeType = {
      'image/gif': {
        type: 'image/gif',
        name: 'original'
      }
    };

    if (mimeType) {
      return byMimeType[mimeType];
    }
  }

  static fromMediaType(mediaType?: string): ArtifactFormat | undefined {
    const byMediaType = {
      doc: {
        type: 'application/pdf',
        name: 'document.pdf'
      },
      image: {
        type: 'image/jpeg',
        name: 'image.jpg'
      },
      audio: {
        type: 'audio/mpeg',
        name: 'audio.mp3'
      },
      video: {
        type: 'video/mp4',
        name: 'video_640.mp4'
      },
      archive: {
        type: 'not/supported',
        name: 'original'
      },
      model: {
        type: 'application/x-sea',
        name: 'model.sea'
      },
      unknown: {
        type: 'not/supported',
        name: 'original'
      }
    };

    if (mediaType) {
      return byMediaType[mediaType];
    }
  }
}
