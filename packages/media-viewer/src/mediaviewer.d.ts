import 'jquery';

export interface MediaFileAttributes {
  readonly src: string;
  readonly srcDownload: string;

  readonly id?: string;
  readonly type?: string;
  readonly title?: string;
  readonly src_hd?: string;
  readonly poster?: string;
  readonly thumbnail?: string;
  readonly downlodable?: boolean;
}

export interface MediaFile {
  readonly attributes: MediaFileAttributes;
}

export type MediaViewerAssets = {
  readonly basePath: string
};

export type MediaViewerType = 'image' | 'document' | 'video' | '3d';

export interface MediaViewerConfig {
  readonly assets?: MediaViewerAssets;
  readonly fetchToken?: (file: MediaFile) => JQueryPromise<MediaFileAttributes>;

  readonly appendTo?: (node: Node) => void;
  readonly files?: Array<MediaFileAttributes>;
  readonly commentService?: Object;

  readonly templateBackend?: Function;
  readonly moduleBackend?: Function;
  readonly pdfTransportFactory?: Function;

  readonly enableListLoop?: boolean;
  readonly enablePresentationMode?: boolean;
  readonly enableMiniMode?: boolean;
  readonly preloadImagesAfterCurrent?: number;
  readonly preloadImagesBeforeCurrent?: number;
  readonly videoDefaultQualityHd?: boolean;
  readonly customStorage?: Object;
  readonly viewers?: Array<MediaViewerType>;
  readonly embedded?: boolean;
  readonly contained?: boolean;
  readonly i18n?: Object;
}

export type MediaViewerMode = 'BASE' | 'PRESENTATION' | 'CONTAINED';

export interface MediaViewerInterface {
  open(fileQuery?: Object): JQueryPromise<void>;
  close(): void;

  setFiles(files: Array<MediaFileAttributes>, nextFileQuery?: Object): void;
  showFileNext(): JQueryPromise<MediaFileAttributes>;
  showFilePrev(): JQueryPromise<MediaFileAttributes>;
  showFileWithQuery(query: any): JQueryPromise<MediaFileAttributes>;

  getCurrent(): MediaFileAttributes;
  getCurrentFiles(): Array<MediaFileAttributes>;

  isOpen(): boolean;
  isShowingFirstFile(): boolean;
  isShowingLastFile(): boolean;

  on(eventName: 'fv.open', callback: () => void, context?: any): void;
  on(eventName: 'fv.close', callback: () => void, context?: any): void;
  on(eventName: 'fv.setFiles', callback: () => void, context?: any): void;
  on(eventName: 'fv.changeMode', callback: (mode: MediaViewerMode) => void, context?: any): void;
  on(eventName: 'fv.updateFiles', callback: () => void, context?: any): void;
  on(eventName: 'fv.changeFile', callback: (file: MediaFileAttributes) => void, context?: any): void;
  on(eventName: 'fv.showFile', callback: (file: MediaFileAttributes) => void, context?: any): void;
  on(eventName: 'fv.showFileError', callback: (file: MediaFileAttributes) => void, context?: any): void;
  on(eventName: 'reset', callback: (files: any) => void, context?: any): void;

  off(eventName: string, callback: Function, context?: any): any;
}

export interface MediaViewerConstructor {
  new (config: MediaViewerConfig): MediaViewerInterface;
}
