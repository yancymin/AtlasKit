// Types from mediapicker that are not exported

export interface MediaProgress {
  readonly absolute: number;
  readonly portion: number;
  readonly max: number;
  readonly overallTime: number;
  readonly expectedFinishTime: number;
  readonly timeLeft: number;
}

export interface MediaFile {
    readonly id: string;
    readonly name: string;
    readonly size: number;
    readonly creationDate: number;
    readonly type: string;
}

export interface MediaArtifact {
  processingStatus: string;
  url?: string;
}

export interface MediaApiData {
  id: string;
  processingStatus: string;
  artifacts?: {[name: string]: MediaArtifact};
}

export interface MediaUploadEnd {
  file: MediaFile;
  public: MediaApiData;
}

export interface MediaUploadStatusUpdate {
  file: MediaFile;
  progress: MediaProgress;
}

export interface MediaUploadError {
  file: MediaFile;
  error: any;
}

export declare class MediaError {
    readonly fileId: string;
    readonly name: string;
    readonly description: string;
}
