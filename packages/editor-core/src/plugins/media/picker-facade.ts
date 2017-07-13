import { MediaPicker } from 'mediapicker';
import {
  ContextConfig,
  MediaStateManager,
  MediaState,
  UploadParams,
} from '@atlaskit/media-core';

import { ErrorReportingHandler } from '../../utils';

export type PickerEvent = {
  file: PickerEventFile,
  preview?: Blob
  progress?: PickerEventProgress,
  error?: PickerEventError,
  finalize?: () => void,
};

export type PickerEventFile = {
  id: string,           // unique id, which is generated when user picked the file
  name: string,         // file name
  size: number,         // size in bytes
  publicId?: string     // public id of the file, if it was uploaded
  creationDate: number, // timestamp of file creation date
  type: string          // mimetype
};

export type PickerEventProgress = {
  absolute?: number,           // amount of bytes uploaded
  portion?: number,            // percentage of file uploaded (0.55 = 55%)
  max?: number,                // size of the file
  overallTime?: number,        // the total amount of time needed to upload this file (in ms)
  expectedFinishTime?: number, // timestamp of approximate finish time
  timeLeft?: number            // time before finish (in ms)
};

export type PickerEventError = {
  description: string, // description for an error. example: "Token verification failed: invalid token". Can be empty.
  name: string,        // type of error. Available types: 'object_create_fail' (failed to create file object), 'metadata_fetch_fail', 'token_fetch_fail', 'token_source_empty', 'upload_fail'
  fileId?: string      // if available, the id of the file that failed to upload
};

export default class PickerFacade {
  private picker: any;
  private onStartListeners: Array<(state: MediaState) => void> = [];
  private errorReporter: ErrorReportingHandler;
  private uploadParams: UploadParams;

  constructor(
    pickerType: string,
    uploadParams: UploadParams,
    contextConfig: ContextConfig,
    private stateManager: MediaStateManager,
    errorReporter: ErrorReportingHandler,
    mediaPickerFactory?: (pickerType: string, pickerConfig: any) => any
  ) {
    this.errorReporter = errorReporter;
    this.uploadParams = uploadParams;

    if (!mediaPickerFactory) {
      mediaPickerFactory = MediaPicker;
    }

    const picker = this.picker = mediaPickerFactory(
      pickerType,
      this.buildPickerConfigFromContext(contextConfig)
    );

    picker.on('upload-start', this.handleUploadStart);
    picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
    picker.on('upload-status-update', this.handleUploadStatusUpdate);
    picker.on('upload-processing', this.handleUploadProcessing);
    picker.on('upload-finalize-ready', this.handleUploadFinalizeReady);
    picker.on('upload-error', this.handleUploadError);
    picker.on('upload-end', this.handleUploadEnd);

    if (picker.activate) {
      picker.activate();
    }
  }

  destroy() {
    const { picker } = this;

    if (!picker) {
      return;
    }

    picker.removeAllListeners();

    try {
      if (picker.deactivate) {
        picker.deactivate();
      }

      if (picker.teardown) {
        picker.teardown();
      }
    } catch (ex) {
      this.errorReporter.captureException(ex);
    }

    this.picker = null;
  }

  setUploadParams(params: UploadParams): void {
    this.uploadParams = params;
    this.picker.setUploadParams(params);
  }

  show(): void {
    if (this.picker.show) {
      this.picker.show();
    }
  }

  cancel(tempId: string): void {
    const state = this.stateManager.getState(tempId);

    if (!state || (state.status === 'cancelled')) {
      return;
    }

    try {
      this.picker.cancel(tempId);
    } catch (e) {
      // We're deliberatelly consuming a known Media Picker exception, as it seems that
      // the picker has problems cancelling uploads before the popup picker has been shown
      // TODO: remove after fixing https://jira.atlassian.com/browse/FIL-4161
      if (!/((popupIframe|cancelUpload).*?undefined)|(undefined.*?(popupIframe|cancelUpload))/.test(`${e}`)) {
        throw e;
      }
    }

    this.stateManager.updateState(tempId, {
      id: tempId,
      status: 'cancelled',
    });
  }

  upload(url: string, fileName: string): void {
    if (this.picker.upload) {
      this.picker.upload(url, fileName);
    }
  }

  onNewMedia(cb: (state: MediaState) => any) {
    this.onStartListeners.push(cb);
  }

  private buildPickerConfigFromContext(context: ContextConfig) {
    return {
      uploadParams: this.uploadParams,
      apiUrl: context.serviceHost,
      apiClientId: context.clientId,
      container: this.getDropzoneContainer(),
      tokenSource: { getter: (reject, resolve) => {
        context.tokenProvider(this.uploadParams.collection).then(resolve, reject);
      }},
    };
  }

  private getDropzoneContainer() {
    const { dropzoneContainer } = this.uploadParams;

    return dropzoneContainer ? dropzoneContainer : document.body;
  }

  private handleUploadStart = (event: PickerEvent) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;
    const state = {
      id: tempId,
      status: 'uploading',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    };

    this.stateManager.updateState(tempId, state as MediaState);
    this.onStartListeners.forEach(cb => cb.call(cb, state));
  }

  private handleUploadStatusUpdate = (event: PickerEvent) => {
    const { file, progress } = event;
    const tempId = `temporary:${file.id}`;
    const currentState = this.stateManager.getState(tempId);
    const currentStatus = currentState && currentState.status ? currentState.status : 'unknown';

    this.stateManager.updateState(tempId, {
      id: tempId,
      status: currentStatus === 'unknown' ? 'uploading' : currentStatus,
      progress: progress ? progress.portion : undefined,
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadProcessing = (event: PickerEvent) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'processing',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadFinalizeReady = (event: PickerEvent) => {
    const { file } = event;
    const { finalize } = event;
    const tempId = `temporary:${file.id}`;

    if (!finalize) {
      throw new Error('Editor: Media: Picker emitted finalize-ready event but didn\'t provide finalize callback');
    }

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      finalizeCb: finalize,
      status: 'unfinalized',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadError = (event: PickerEvent) => {
    const { file, error } = event;

    if (!file || !file.id) {
      const err = new Error(`Media: unknown upload-error received from Media Picker: ${error && error.name}`);
      this.errorReporter.captureException(err);

      return;
    }

    const tempId = `temporary:${file.id}`;
    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'error',
      error: error ? { description: error!.description, name: error!.name } : undefined,
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadEnd = (event: PickerEvent) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'ready',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadPreviewUpdate = (event: PickerEvent) => {
    const tempId = `temporary:${event.file.id}`;

    if (event.preview !== undefined) {
      this.stateManager.updateState(tempId, {
        id: tempId,
        thumbnail: event.preview
      });
    }
  }
}
