import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';

import {
  DefaultMediaStateManager,
  MediaStateManager,
} from '@atlaskit/media-core';

import {
  chaiPlugin
} from '../../../../src/test-helper';
import PickerFacade from '../../../../src/plugins/media/picker-facade';
import { ErrorReportingHandler } from '../../../../src/utils';
import MockMediaPicker from './mock-media-picker';

chai.use(chaiPlugin);
chai.use(chaiAsPromised);

describe('Media PickerFacade', () => {
  let stateManager: MediaStateManager | undefined;
  let facade: PickerFacade | undefined;
  let mockPickerFactory: any;
  let mockPicker: MockMediaPicker;
  const dropzoneContainer = document.createElement('div');
  const uploadParams = {
    collection: 'mock',
    dropzoneContainer: dropzoneContainer
  };
  const tokenProvider = (collectionName?: string) => Promise.resolve('mock-token');
  const contextConfig = {
    clientId: 'mock',
    serviceHost: 'http://test',
    tokenProvider: tokenProvider
  };
  const testFileId = `${Math.round(Math.random() * 100000)}`;
  const testTemporaryFileId = `temporary:${testFileId}`;
  const testFilePublicId = '7899d969-c1b2-4460-ad3e-44d51ac85452';
  const testFileData = {
    id: testFileId,
    name: 'test name',
    size: Math.round(Math.random() * 1047552),
    type: 'test/file',
    creationDate: (new Date().getTime())
  };
  const testFileProgress = {
    portion: Math.random()
  };
  const errorReporter: ErrorReportingHandler = {
    captureException: (err: any) => {},
    captureMessage: (msg: any) => {},
  };

  beforeEach(() => {
    mockPicker = new MockMediaPicker();
    stateManager = new DefaultMediaStateManager();
    mockPickerFactory = (pickerType: string, pickerConfig: any) => {
      mockPicker.pickerType = pickerType;
      mockPicker.pickerConfig = pickerConfig;

      return mockPicker;
    };
    facade = new PickerFacade('mock', uploadParams, contextConfig, stateManager, errorReporter, mockPickerFactory);
  });

  afterEach(() => {
    stateManager = undefined;
    facade!.destroy();
    facade = undefined;
    mockPickerFactory();
  });

  it('listens to picker events', () => {
    expect(mockPicker.listeners).to.have.property('upload-start');
    expect(mockPicker.listeners).to.have.property('upload-preview-update');
    expect(mockPicker.listeners).to.have.property('upload-status-update');
    expect(mockPicker.listeners).to.have.property('upload-processing');
    expect(mockPicker.listeners).to.have.property('upload-end');
  });

  it('removes listeners on destruction', () => {
    facade!.destroy();
    expect(Object.keys(mockPicker.listeners).length).to.equal(0);
  });

  it('calls picker\'s teardown() on destruction', () => {
    facade!.destroy();
    expect(mockPicker.torndown).to.eq(true);
  });

  it('calls picker\'s deactivate() on destruction', () => {
    mockPicker.teardown = undefined;
    facade!.destroy();
    expect(mockPicker.deactivated).to.eq(true);
  });

  it('activates picker upon construciton', () => {
    expect(mockPicker.activated).to.eq(true);
  });

  describe('configures picker', () => {
    it('with correct upload params and context', () => {
      expect(mockPicker.pickerType).to.eq('mock');
      expect(mockPicker.pickerConfig).to.have.property('uploadParams', uploadParams);
      expect(mockPicker.pickerConfig).to.have.property('apiUrl', contextConfig.serviceHost);
      expect(mockPicker.pickerConfig).to.have.property('apiClientId', contextConfig.clientId);
      expect(mockPicker.pickerConfig).to.have.property('container', dropzoneContainer);
      expect(mockPicker.pickerConfig).to.have.property('tokenSource')
        .which.has.property('getter')
          .which.is.a('function');
    });

    it('constructs correct tokenSource which calls resolve method', (done) => {
      expect(contextConfig.tokenProvider()).to.eventually.eq('mock-token');

      const getter = mockPicker.pickerConfig.tokenSource.getter;
      getter(() => {}, () => done());
    });

    it('respects dropzone container', () => {
      expect(mockPicker.pickerConfig).to.have.property('tokenSource');
    });
  });

  describe('proxies events to MediaStateManager', () => {
    it('for upload starting', () => {
      const cb = sinon.spy();
      stateManager!.subscribe(testTemporaryFileId, cb);
      mockPicker.__triggerEvent('upload-start', {
        file: testFileData
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        status: 'uploading',
        fileName: testFileData.name,
        fileSize: testFileData.size,
        fileMimeType: testFileData.type,
      })).to.eq(true);
    });

    it('for new uploads via onNewMedia()', () => {
      const cb = sinon.spy();
      facade!.onNewMedia(cb);

      mockPicker.__triggerEvent('upload-start', {
        file: testFileData
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        status: 'uploading',
        fileName: testFileData.name,
        fileSize: testFileData.size,
        fileMimeType: testFileData.type,
      })).to.eq(true);
    });

    it('for upload progress', () => {
      const cb = sinon.spy();
      stateManager!.subscribe(testTemporaryFileId, cb);
      mockPicker.__triggerEvent('upload-status-update', {
        file: testFileData,
        progress: testFileProgress,
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        status: 'uploading',
        progress: testFileProgress.portion,
        fileName: testFileData.name,
        fileSize: testFileData.size,
        fileMimeType: testFileData.type,
      })).to.eq(true);
    });

    it('for upload preview availability', () => {
      const cb = sinon.spy();
      const preview = new Blob();
      stateManager!.subscribe(testTemporaryFileId, cb);
      mockPicker.__triggerEvent('upload-preview-update', {
        file: testFileData,
        preview
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        thumbnail: preview
      })).to.eq(true);
    });

    it('for upload processing', () => {
      const cb = sinon.spy();
      stateManager!.subscribe(testTemporaryFileId, cb);
      mockPicker.__triggerEvent('upload-processing', {
        file: { ...testFileData, publicId: testFilePublicId },
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        publicId: testFilePublicId,
        status: 'processing',
        fileName: testFileData.name,
        fileSize: testFileData.size,
        fileMimeType: testFileData.type,
      })).to.eq(true);
    });

    it('for upload ready for finalization', () => {
      const cb = sinon.spy();
      const finalizeCb = () => {};
      stateManager!.subscribe(testTemporaryFileId, cb);
      mockPicker.__triggerEvent('upload-finalize-ready', {
        file: { ...testFileData, publicId: testFilePublicId },
        finalize: finalizeCb
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        publicId: testFilePublicId,
        status: 'unfinalized',
        finalizeCb: finalizeCb,
        fileName: testFileData.name,
        fileSize: testFileData.size,
        fileMimeType: testFileData.type,
      })).to.eq(true);
    });

    it('for upload error', () => {
      const cb = sinon.spy();
      stateManager!.subscribe(testTemporaryFileId, cb);
      mockPicker.__triggerEvent('upload-error', {
        file: { ...testFileData, publicId: testFilePublicId },
        error: {
          name: 'some-error',
          description: 'something went wrong'
        }
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        publicId: testFilePublicId,
        status: 'error',
        error: {
          name: 'some-error',
          description: 'something went wrong'
        },
        fileName: testFileData.name,
        fileSize: testFileData.size,
        fileMimeType: testFileData.type,
      })).to.eq(true);
    });

    it('for upload end', () => {
      const cb = sinon.spy();
      stateManager!.subscribe(testTemporaryFileId, cb);
      mockPicker.__triggerEvent('upload-end', {
        file: { ...testFileData, publicId: testFilePublicId },
      });
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        publicId: testFilePublicId,
        status: 'ready',
        fileName: testFileData.name,
        fileSize: testFileData.size,
        fileMimeType: testFileData.type,
      })).to.eq(true);
    });

    it('for upload that has been cancelled', () => {
      const cb = sinon.spy();
      stateManager!.updateState(testTemporaryFileId, {
        id: testTemporaryFileId,
        status: 'uploading'
      });

      stateManager!.subscribe(testTemporaryFileId, cb);
      facade!.cancel(testTemporaryFileId);

      expect(cb.calledOnce).to.eq(true);
      expect(cb.calledWithExactly({
        id: testTemporaryFileId,
        status: 'cancelled'
      })).to.eq(true);
    });
  });

  it('After upload has transitioned from "uploading", subsequent "status update" events must not downgrade status (ED-2062)', () => {
    const finalizeCb = () => {};
    stateManager!.updateState(testTemporaryFileId, {
      id: testTemporaryFileId,
      status: 'uploading'
    });

    mockPicker.__triggerEvent('upload-finalize-ready', {
      file: { ...testFileData, publicId: testFilePublicId },
      finalize: finalizeCb
    });

    mockPicker.__triggerEvent('upload-status-update', {
      file: testFileData,
      progress: testFileProgress,
    });

    expect(stateManager!.getState(testTemporaryFileId)).to.deep.eq({
      id: testTemporaryFileId,
      publicId: testFilePublicId,
      status: 'unfinalized',
      progress: testFileProgress.portion,
      fileName: testFileData.name,
      fileSize: testFileData.size,
      fileMimeType: testFileData.type,
      finalizeCb: finalizeCb
    });

    mockPicker.__triggerEvent('upload-processing', {
      file: { ...testFileData, publicId: testFilePublicId },
    });

    mockPicker.__triggerEvent('upload-status-update', {
      file: testFileData,
      progress: testFileProgress,
    });

    expect(stateManager!.getState(testTemporaryFileId)!.status).to.eq('processing');

    mockPicker.__triggerEvent('upload-end', {
      file: { ...testFileData, publicId: testFilePublicId },
    });

    mockPicker.__triggerEvent('upload-status-update', {
      file: testFileData,
      progress: testFileProgress,
    });

    expect(stateManager!.getState(testTemporaryFileId)!.status).to.eq('ready');
  });

});
