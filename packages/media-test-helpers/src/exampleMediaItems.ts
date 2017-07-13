import {MediaItemType, UrlPreview, LinkDetails, FileDetails} from '@atlaskit/media-core';
import {defaultCollectionName as collectionName} from './collectionNames';

const fileType: MediaItemType = 'file';
const linkType: MediaItemType = 'link';

// === URL PREVIEW ===

export const genericUrlPreviewId = {
  url: 'https://atlassian.com',
  mediaItemType: linkType
};

export const youTubeUrlPreviewId = {
  url: 'https://www.youtube.com/watch?v=4OkP5_1qb7Y',
  mediaItemType: linkType
};

export const spotifyUrlPreviewId = {
  mediaItemType: linkType,
  url: 'https://play.spotify.com/track/2Foc5Q5nqNiosCNqttzHof'
};

export const soundcloudUrlPreviewId = {
  mediaItemType: linkType,
  url: 'https://soundcloud.com/kodak-black/tunnel-vision-1'
};

export const publicTrelloBoardUrlPreviewId = {
  mediaItemType: linkType,
  url: 'https://trello.com/b/rq2mYJNn/public-trello-boards'
};

export const privateTrelloBoardUrlPreviewId = {
  mediaItemType: linkType,
  url: 'https://trello.com/b/hlo7gRqs/shpxxxviii-60'
};

export const videoUrlPreviewId = {
  url: 'http://techslides.com/demos/sample-videos/small.mp4',
  mediaItemType: linkType
};

export const imageUrlPreviewId = {
  url: 'https://i.ytimg.com/vi/iLbyjaF8Cyc/maxresdefault.jpg',
  mediaItemType: linkType
};

export const audioUrlPreviewId = {
  url: 'https://devchat.cachefly.net/javascriptjabber/JSJ243_Immutable.js_with_Lee_Byron.mp3',
  mediaItemType: linkType
};

export const docUrlPreviewId = {
  url: 'https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf',
  mediaItemType: linkType
};

export const unknownUrlPreviewId = {
  url: 'https://www.reddit.com/r/javascript/',
  mediaItemType: linkType
};

// === LINK ===

export const genericLinkId = {
  id: '15a9fb95-2d72-4d28-b338-00fd6bea121b',
  mediaItemType: linkType,
  collectionName
};

export const spotifyLinkId = {
  id: '410f38f7-ce31-4527-a69d-740e958bf1d1',
  mediaItemType: linkType,
  collectionName
};

export const youtubeLinkId = {
  id: '3095fca9-9b76-4669-8905-bc874eebd3db',
  mediaItemType: linkType,
  collectionName
};

export const trelloLinkId = {
  id: '9a2e988d-406c-489c-aa91-f2b03857d4d5',
  mediaItemType: linkType,
  collectionName
};

export const twitterLinkId = {
  id: 'b1c15338-a600-4104-be95-aeb878ff768c',
  mediaItemType: linkType
};

export const playerLinkId = {
  id: 'f0e80555-cf97-44ae-afef-9cbfae8c73c7',
  mediaItemType: linkType,
  collectionName
};

export const errorLinkId = {
  id: 'error-file-id',
  mediaItemType: linkType,
  collectionName
};

export const imageLinkId = {
  id: '2c83687c-3183-4db0-8d64-e70013163e76',
  mediaItemType: linkType,
  collectionName
};

// === FILE ===

export const genericFileId = {
  id: '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40',
  mediaItemType: fileType,
  collectionName
};

export const audioFileId = {
  id: 'a965c8df-1d64-4db8-9de5-16dfa8fd2e12', // mp3 audio
  mediaItemType: fileType,
  collectionName
};

export const videoFileId = {
  id: '1b01a476-83b4-4f44-8192-f83b2d00913a', // mp4 video
  mediaItemType: fileType,
  collectionName
};

export const imageFileId = {
  id: '5556346b-b081-482b-bc4a-4faca8ecd2de', // jpg image
  mediaItemType: fileType,
  collectionName
};
export const smallImageFileId = {
  id: 'f251bd05-4b2d-485d-a088-57d112ca7945',
  mediaItemType: fileType,
  collectionName
};

export const wideImageFileId = {
  id: '3b6621a2-5b72-400e-ad95-447610dbb770',
  mediaItemType: fileType,
  collectionName
};

export const largeImageFileId = {
  id: '0607a6a8-b2ec-49a7-b6d3-d767cb49e844',
  mediaItemType: fileType,
  collectionName
};

export const docFileId = {
  id: '71cd7e7d-4e86-4b89-a0b4-7f6ffe013c94',
  mediaItemType: fileType,
  collectionName
};

export const unknownFileId = {
  id: 'e0652e68-c596-4800-8a91-1920e6b8a585',
  mediaItemType: fileType,
  collectionName
};

export const errorFileId = {
  id: 'error-file-id',
  mediaItemType: fileType,
  collectionName
};

// === DETAILS ===

export const genericUrlPreview: UrlPreview = {
  url: 'https://www.atlassian.com/',
  type: 'link',
  site: 'Atlassian',
  title: 'Atlassian | Software Development and Collaboration Tools',
  description: 'Millions of users globally rely on Atlassian products every day for improving software development, project management, collaboration, and code quality.',
  author: {
    name: 'Atlassian'
  },
  resources: {
    icon: {
      url: 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/apple-touch-icon-152x152.png',
      type: 'image/png',
      width: 152,
      height: 152
    },
    thumbnail: {
      url: 'https://wac-cdn.atlassian.com/dam/jcr:89e146b4-642e-41fc-8e65-7848337d7bdd/atlassian_charlie_square.png',
      type: 'image/png',
      width: 400,
      height: 400
    }
  }
};

export const genericLinkDetails: LinkDetails = {
  id: 'foo',
  ...genericUrlPreview
};

export const genericFileDetails: FileDetails = {
  id: 'fd4c4672-323a-4b6c-8326-223169e2a13e',
  mediaType: 'image',
  mimeType: 'image/gif',
  name: 'picker-thread-leaking.gif',
  size: 2958464,
  processingStatus: 'succeeded',
  artifacts: {
    'thumb_320.jpg': {
      url: '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_320.jpg/binary',
      processingStatus: 'succeeded'
    },
    'thumb_large.jpg': {
      url: '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_320.jpg/binary',
      processingStatus: 'succeeded'
    },
    'thumb_120.jpg': {
      url: '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_120.jpg/binary',
      processingStatus: 'succeeded'
    },
    'thumb.jpg': {
      url: '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/thumb_120.jpg/binary',
      processingStatus: 'succeeded'
    },
    'meta.json': {
      url: '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/meta.json/binary',
      processingStatus: 'succeeded'
    },
    'image.jpg': {
      url: '/file/fd4c4672-323a-4b6c-8326-223169e2a13e/artifact/image.jpg/binary',
      processingStatus: 'succeeded'
    }
  }
};

export const imageFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'image',
  name: 'image_file.jpg',
  size: 2958464
};

export const videoFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'video',
  name: 'video_file.mp4',
  size: 29584640
};

export const audioFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'audio',
  name: 'audio_file.mp3',
  size: 2958464
};

export const docFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'doc',
  name: 'doc_file.pdf',
  size: 2958464
};

export const unknownFileDetails: FileDetails = {
  id: 'some-id',
  mediaType: 'unknown',
  name: 'doc_file.pdf',
  size: 2958464
};

export const genericDataURI = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABkAAAAAQAAAGQAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAKgAwAEAAAAAQAAAAIAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAAIAAgMBEQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAQECAQEBAgICAgICAgICAQICAgICAgICAgL/2wBDAQEBAQEBAQEBAQECAQEBAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL/3QAEAAH/2gAMAwEAAhEDEQA/AP0U8M2NmPDfh8C0tgBomkgAW8OAPsFvwK/lh7s+5u+/4n//2Q==';
