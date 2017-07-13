import {ColorWithAlpha} from '../../../../src/common';
import {DefaultDrawingArea, OutputSize} from '../../../../src/engine/components/drawingArea';
import {expect} from 'chai';

describe('MediaEditor DrawingArea', () => {
  const backColor: ColorWithAlpha = {red: 0xAB, green: 0xDD, blue: 0x89, alpha: 0x32};
  const size: OutputSize = {width: 1234, height: 678, screenScaleFactor: 32};
  const canvas: HTMLCanvasElement = document.createElement('canvas');

  it('should return passed parameters', () => {
    const drawingArea = new DefaultDrawingArea(canvas, size, backColor);

    expect(drawingArea.canvas).to.equal(canvas);
    expect(drawingArea.outputSize).to.deep.equal(size);
    expect(drawingArea.backgroundColor).to.deep.equal(backColor);
  });

  it('should provide resize event', () => {
    const drawingArea = new DefaultDrawingArea(canvas, size, backColor);

    expect(drawingArea.resize).to.exist;
  });

  it('should trigger resize event on setSize', (done) => {
    const drawingArea = new DefaultDrawingArea(canvas, size, backColor);
    expect(drawingArea.outputSize).to.deep.equal(size);

    const newSize = {width: 500, height: 43, screenScaleFactor: 2};
    drawingArea.resize.listen((size) => {
      expect(drawingArea.outputSize).to.deep.equal(newSize);
      expect(size).to.deep.equal(newSize);
      done();
    });
    drawingArea.setSize(newSize);
  });
});
