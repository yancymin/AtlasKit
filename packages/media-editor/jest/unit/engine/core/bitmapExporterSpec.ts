import {expect} from 'chai';
import * as sinon from 'sinon';

import {Core} from '../../../../src/engine/core/binaries/editorCore';
import {BitmapExporter} from '../../../../src/engine/core/bitmapExporter';

type Module = Core.NativeModule;

describe('MediaEditor BitmapExporter', () => {
  let canvas: HTMLCanvasElement;
  let bitmapExporter: BitmapExporter;
  let module: {
    HEAPU8: {
      buffer: ArrayBuffer
    }
  };

  beforeEach(() => {
    canvas = document.createElement('canvas');
    const nativeModule = <Module> <any> (sinon.mock(module));
    bitmapExporter = new BitmapExporter(canvas, nativeModule);
  });

  it('prepare method should return false for negative width', () => {
    expect(bitmapExporter.prepare(-1, 10)).to.be.false;
  });

  it('prepare method should return false for negative height', () => {
    expect(bitmapExporter.prepare(10, -1)).to.be.false;
  });

  it('prepare method should return false for zero width', () => {
    expect(bitmapExporter.prepare(0, 10)).to.be.false;
  });

  it('prepare method should return false for zero height', () => {
    expect(bitmapExporter.prepare(10, 0)).to.be.false;
  });

  it('prepare method should return true for correct width and height', () => {
    expect(bitmapExporter.prepare(10, 10)).to.be.true;
  });

  it('should return data from canvas', () => {
    const base64Image = 'data:image/png';
    sinon.stub(canvas, 'toDataURL').returns(base64Image);

    bitmapExporter.prepare(10, 10);
    const data = bitmapExporter.getBase64Image('image/png');
    expect(data).to.equal(base64Image);
  });
});
