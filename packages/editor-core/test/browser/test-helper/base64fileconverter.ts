import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  convertedHandlerCallback, Converter, dropHandler, pasteHandler
} from '../../../src/test-helper/base64fileconverter';

describe('@atlaskit/editor-core/test-helper base64fileconverter', () => {
  let savedFileReader: any;

  beforeEach(() => {
    savedFileReader = (window as any).FileReader;
  });

  afterEach(() => {
    (window as any).FileReader = savedFileReader;
  });

  const mockFile = (args: { size?: number, type?: string } = {}): File => ({
    size: typeof args.size !== 'undefined' ? args.size : 1,
    type: typeof args.type !== 'undefined' ? args.type : 'png',
  } as any);

  describe('pasteHandler', () => {
    it('Should not convert files when there is no clipboardData', () => {
      const converterStub = {} as Converter;
      const clipboardEventStub = {} as ClipboardEvent;
      const cb = sinon.spy();

      const resp = pasteHandler(converterStub, clipboardEventStub, cb);

      expect(cb.callCount).to.equal(0);
      expect(resp).to.equal(false);
    });

    it('Should not convert files when there is no dataTransfer', () => {
      const converterStub = {} as Converter;
      converterStub.HAS_BASE64_FILE_SUPPORT = true;
      converterStub.convert = sinon.spy();

      const dataTransferItem: DataTransferItem = {
        kind: 'file',
        getAsFile: sinon.spy(),
      } as any;

      const clipboardEvent: ClipboardEvent = {
        clipboardData: {
          items: [dataTransferItem],
        },
      } as any;

      expect(pasteHandler(converterStub, clipboardEvent, sinon.spy())).to.equal(true);
    });
  });

  describe('dropHandler', () => {
    it('Should not convert files when there is no dataTransfer', () => {
      const converterStub = {} as Converter;
      const dragEventStub = {} as DragEvent;

      const cb = sinon.spy();

      expect(dropHandler(converterStub, dragEventStub, cb)).to.equal(false);
      expect(cb.callCount).to.equal(0);
    });

    it('Should convert files when there is dataTransfer', () => {
      const converterStub = {} as Converter;
      converterStub.HAS_BASE64_FILE_SUPPORT = true;

      const convertStub = sinon.spy((files: FileList, cb: convertedHandlerCallback) => cb(`data:png;base64,AYAYSAASn`));
      converterStub.convert = convertStub;

      const dragEventStub: DragEvent = {
        dataTransfer: {
          files: [mockFile()],
        },
      } as any;

      const cb = sinon.spy();

      expect(dropHandler(converterStub, dragEventStub, cb)).to.equal(true);
      expect(cb.callCount).to.equal(1);
    });
  });

  describe('base64fileconverter', () => {
    it('Should configure supportedTypes and maxFileSizeInBytes during instantiation', () => {
      const converter = new Converter(['png'], 1000);

      expect(converter.supportedTypes[0]).to.equal('png');
      expect(converter.maxFileSizeInBytes).to.equal(1000);
    });

    it('Should not convert files greater than maxFileSizeInBytes', () => {
      const converter = new Converter(['png'], 1000);
      const cb = sinon.spy();
      const errCb = sinon.spy();

      const fileReaderStub = () => { };
      fileReaderStub.prototype.onload = sinon.spy();
      fileReaderStub.prototype.readAsBinaryString = sinon.spy();

      const file = mockFile({ size: 1001 });

      (window as any).FileReader = fileReaderStub;
      converter.convert([file], cb, errCb);

      expect(errCb.firstCall.args[0]).to.equal(file);
      expect(errCb.callCount).to.equal(1);
    });

    it('Should not convert files that are not on the supportedTypes', () => {
      const converter = new Converter(['png'], 1000);
      const cb = sinon.spy();
      const errCb = sinon.spy();

      const fileReaderStub = () => { };
      fileReaderStub.prototype.onload = sinon.spy();
      fileReaderStub.prototype.readAsBinaryString = sinon.spy();

      const file = mockFile({ type: 'notsupported' });

      (window as any).FileReader = fileReaderStub;
      converter.convert([file], cb, errCb);

      expect(errCb.firstCall.args[0]).to.equal(file);
      expect(errCb.callCount).to.equal(1);
    });

    it('Should not trigger error callback when file match supportedTypes and maxFileSizeInBytes', () => {
      const converter = new Converter(
        ['png'],
        1000
      );
      const cb = sinon.spy();
      const errCb = sinon.spy();

      const fileReaderStub = () => { };
      fileReaderStub.prototype.onload = sinon.spy();
      fileReaderStub.prototype.readAsBinaryString = sinon.spy();

      const file = mockFile({ size: 1, type: 'png' });

      (window as any).FileReader = fileReaderStub;
      converter.convert([file], cb, errCb);

      expect(errCb.callCount).to.equal(0);
    });
  });
});
