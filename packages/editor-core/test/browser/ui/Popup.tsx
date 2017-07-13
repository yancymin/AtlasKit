import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as sinon from 'sinon';
import { browser } from '../../../src';

import {
  isBody, findOverflowScrollParent,
  getVerticalPlacement, getHorizontalPlacement,
  calculatePosition,
} from '../../../src/ui/Popup/utils';

import Popup from '../../../src/ui/Popup';

describe('Popup', () => {
  describe('Utils', () => {
    describe('#isBody', () => {
      it('should return true if passed element is body', () => {
        expect(isBody(document.body)).to.eq(true);
      });

      it('should return false if passed element is not body', () => {
        expect(isBody(document as any)).to.eq(false);
      });
    });

    describe('#findOverflowScrollParent', () => {
      let boundary;
      let target;

      afterEach(() => {
        boundary.parentElement.removeChild(boundary);
      });

      it('should find scroll parent of target', () => {
        boundary = document.createElement('div');
        boundary.style.overflow = 'scroll';
        target = document.createElement('div');
        boundary.appendChild(target);
        document.body.appendChild(boundary);

        expect(findOverflowScrollParent(target)).to.eq(boundary);
      });

      it('should return false if there aren\'t any scroll parents of target', () => {
        boundary = document.createElement('div');
        target = document.createElement('div');
        boundary.appendChild(target);
        document.body.appendChild(boundary);

        expect(findOverflowScrollParent(target)).to.eq(false);
      });
    });

    describe('#getVerticalPlacement', () => {
      it('should return default value without fitHeight param', () => {
        expect(getVerticalPlacement(document.body, document.body, 0)).to.eq('bottom');
      });

      describe('with alignY', () => {
        it('should return "top" if "alignY" equals "top"', () => {
          const boundary: any = {};
          const target: any = {};
          expect(getVerticalPlacement(target, boundary, undefined, 'top')).to.eq('top');
        });
      });

      describe('with fitHeight param', () => {
        const boundary: any = {
          getBoundingClientRect: () => ({ top: 0, height: 300 }),
          scrollTop: 0
        };

        it('should return "bottom" if "fitHeight" fits below target', () => {
          const target: any = {
            getBoundingClientRect: () => ({ top: 0, height: 30 })
          };
          expect(getVerticalPlacement(target, boundary, 100)).to.eq('bottom');
        });

        it('should return "top" if "fitHeight" doesn\'t fit below target but fits above', () => {
          const target: any = {
            getBoundingClientRect: () => ({ top: 270, height: 30 })
          };
          expect(getVerticalPlacement(target, boundary, 100)).to.eq('top');
        });

        it('should return "top" if "fitHeight" fits above the target inside parent with scrollTop > 0', () => {
          const target: any = {
            getBoundingClientRect: () => ({ top: 470, height: 30 })
          };
          const boundary: any = {
            getBoundingClientRect: () => ({ top: 250, height: 200 }),
            scrollTop: 200
          };
          expect(getVerticalPlacement(target, boundary, 100)).to.eq('top');
        });

        it('should return "bottom" if doesn\'t fit in either direction but there is more space below', () => {
          const target: any = {
            getBoundingClientRect: () => ({ top: 120, height: 30 })
          };
          expect(getVerticalPlacement(target, boundary, 200)).to.eq('bottom');
        });

        it('should return "top" if doesn\'t fit in either direction but there is more space above', () => {
          const target: any = {
            getBoundingClientRect: () => ({ top: 160, height: 30 })
          };
          expect(getVerticalPlacement(target, boundary, 200)).to.eq('top');
        });

        it('should return "bottom" if it fits in both directions evenly', () => {
          const target: any = {
            getBoundingClientRect: () => ({ top: 135, height: 30 })
          };
          expect(getVerticalPlacement(target, boundary, 100)).to.eq('bottom');
        });
      });
    });

    describe('#getHorizontalPlacement', () => {
      it('should return default value without fitWidth param', () => {
        expect(getHorizontalPlacement(document.body, document.body, 0)).to.eq('left');
      });

      describe('with alignX', () => {
        it('should return "left" if "alignX" equals "left"', () => {
          const boundary: any = {};
          const target: any = {};
          expect(getHorizontalPlacement(target, boundary, undefined, 'left')).to.eq('left');
        });
      });

      describe('with fitWidth param', () => {
        const boundary: any = {
          getBoundingClientRect: () => ({ left: 0, width: 300 }),
          scrollHeight: 300,
          scrollTop: 0
        };

        it('should return "left" if "fitWidth" fits from left to right', () => {
          const target: any = {
            getBoundingClientRect: () => ({ left: 0, width: 30 })
          };
          expect(getHorizontalPlacement(target, boundary, 100)).to.eq('left');
        });

        it('should return "right" if "fitWidth" doesn\'t fit from left to right, but fits from right to left', () => {
          const target: any = {
            getBoundingClientRect: () => ({ left: 270, width: 30 })
          };
          expect(getHorizontalPlacement(target, boundary, 100)).to.eq('right');
        });

        it('should return "left" if doesn\'t fit in either direction but there is more space from left to right', () => {
          const target: any = {
            getBoundingClientRect: () => ({ left: 90, width: 30 })
          };
          expect(getHorizontalPlacement(target, boundary, 200)).to.eq('left');
        });

        it('should return "right" if doesn\'t fit in either direction but there is more space from right to left', () => {
          const target: any = {
            getBoundingClientRect: () => ({ left: 160, width: 30 })
          };
          expect(getHorizontalPlacement(target, boundary, 200)).to.eq('right');
        });

        it('should return "left" if it fits in both directions evenly', () => {
          const target: any = {
            getBoundingClientRect: () => ({ left: 135, width: 30 })
          };
          expect(getHorizontalPlacement(target, boundary, 100)).to.eq('left');
        });
      });
    });

    describe('#calculatePosition', () => {
      const body: any = {
        getBoundingClientRect: () => ({ top: 0, left: 0, right: 500, width: 500, height: 300 }),
        scrollTop: 0,
        scrollLeft: 0
      };

      const popup: any = {
        offsetParent: body
      };

      function insertCss(code) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = code;
        document.getElementsByTagName('head')[0].appendChild( style );
        return style;
      }

      let scrollParent;
      let oldMargin;
      let style;
      beforeEach(() => {
        scrollParent = document.createElement('div');
        scrollParent.className = 'no-scrollbars';
        scrollParent.style.overflow = 'scroll';
        scrollParent.style.position = 'relative';
        scrollParent.style.height = '300px';
        scrollParent.style.width = '500px';
        style = insertCss(`
          .no-scrollbars::-webkit-scrollbar {
            display: none;
          }
        `);

        oldMargin = document.body.style.margin;
        document.body.style.margin = '0';
        document.body.appendChild(scrollParent);
      });

      afterEach(() => {
        scrollParent.parentElement.removeChild(scrollParent);
        style.parentElement.removeChild(style);
        document.body.style.margin = oldMargin;
      });

      it('should return {} without target or popup', () => {
        expect(calculatePosition({ placement: ['top', 'left'], popup: document.body, offset: [] })).to.deep.eq({});
        expect(calculatePosition({ placement: ['top', 'left'], target: document.body, offset: [] })).to.deep.eq({});
      });

      describe('[top, left]', () => {
        const target: any = {
          getBoundingClientRect: () => ({ top: 270, left: 0, width: 30, height: 30 })
        };
        it('should calculate correct position if boundry is body', () => {
          expect(calculatePosition({
            placement: ['top', 'left'],
            target,
            popup,
            offset: [0, 0]
          })).to.deep.eq({ left: 0, bottom: 30 });
        });

        it('should calculate correct position if boundry is body with offsets', () => {
          expect(calculatePosition({
            placement: ['top', 'left'],
            target,
            popup,
            offset: [10, 10]
          })).to.deep.eq({ left: 10, bottom: 40 });
        });

        it('should calculate correct position inside scroll parent', () => {
          const customTarget = document.createElement('div');
          customTarget.style.height = '30px';

          const placeholder = document.createElement('div');
          placeholder.style.height = '200px';

          const customPopup = document.createElement('div');

          scrollParent.appendChild(placeholder);
          scrollParent.appendChild(customTarget);
          scrollParent.appendChild(customPopup);

          expect(calculatePosition({
            placement: ['top', 'left'],
            target: customTarget,
            popup: customPopup,
            offset: [10, 10]
          })).to.deep.eq({ left: 10, bottom: 110 });
        });
      });

      describe('[top, right]', () => {
        const target: any = {
          getBoundingClientRect: () => ({
            top: 270,
            left: 470,
            right: 500,
            width: 30,
            height: 30
          })
        };

        it('should calculate correct position if offsetParent has border-bottom', () => {
          const borderBottomWidth = 3;
          const style = {borderBottomWidth: `${borderBottomWidth}px`};
          const popup: any = {offsetParent: {...body, style}};
          expect(calculatePosition({
            placement: ['top', 'right'],
            target,
            popup,
            offset: [0, 0]
          })).to.deep.eq({ right: 0, bottom: 30 - borderBottomWidth });
        });

        it('should calculate correct position if boundry is body', () => {
          expect(calculatePosition({
            placement: ['top', 'right'],
            target,
            popup,
            offset: [0, 0]
          })).to.deep.eq({ right: 0, bottom: 30 });
        });

        it('should calculate correct position if boundry is body with offsets', () => {
          expect(calculatePosition({
            placement: ['top', 'right'],
            target,
            popup,
            offset: [10, 10]
          })).to.deep.eq({ right: 10, bottom: 40 });
        });

        it('should calculate correct position inside scroll parent', () => {
          // Skip FF and IE because of the variable scroll bar width
          if (browser.gecko || browser.ie) {
            return;
          }

          const customTarget = document.createElement('div');
          customTarget.style.height = '30px';
          customTarget.style.marginLeft = '470px';

          const placeholder = document.createElement('div');
          placeholder.style.height = '200px';

          const customPopup = document.createElement('div');

          scrollParent.appendChild(placeholder);
          scrollParent.appendChild(customTarget);
          scrollParent.appendChild(customPopup);

          expect(calculatePosition({
            placement: ['top', 'right'],
            target: customTarget,
            popup: customPopup,
            offset: [10, 10]
          })).to.deep.eq({ right: 10, bottom: 110 });
        });
      });

      describe('[bottom, left]', () => {
        const target: any = {
          getBoundingClientRect: () => ({ top: 0, left: 0, width: 30, height: 30 })
        };

        it('should calculate correct position if offsetParent has border-bottom', () => {
          const borderBottomWidth = 3;
          const style = {borderBottomWidth: `${borderBottomWidth}px`};
          const popup: any = {offsetParent: {...body, style}};
          expect(calculatePosition({
            placement: ['bottom', 'left'],
            target,
            popup,
            offset: [0, 0]
          })).to.deep.eq({ left: 0, top: 30 - borderBottomWidth });
        });

        it('should calculate correct position if boundry is body', () => {
          expect(calculatePosition({
            placement: ['bottom', 'left'],
            target,
            popup,
            offset: [0, 0]
          })).to.deep.eq({ left: 0, top: 30 });
        });

        it('should calculate correct position if boundry is body with offsets', () => {
          expect(calculatePosition({
            placement: ['bottom', 'left'],
            target,
            popup,
            offset: [10, 10]
          })).to.deep.eq({ left: 10, top: 40 });
        });

        it('should calculate correct position inside scroll parent', () => {
          const customTarget = document.createElement('div');
          customTarget.style.height = '30px';

          const customPopup = document.createElement('div');

          scrollParent.appendChild(customTarget);
          scrollParent.appendChild(customPopup);

          expect(calculatePosition({
            placement: ['bottom', 'left'],
            target: customTarget,
            popup: customPopup,
            offset: [10, 10]
          })).to.deep.eq({ left: 10, top: 40 });
        });
      });

      describe('[bottom, right]', () => {
        const target: any = {
          getBoundingClientRect: () => ({
            top: 0,
            left: 470,
            right: 500,
            width: 30,
            height: 30
          })
        };
        it('should calculate correct position if boundry is body', () => {
          expect(calculatePosition({
            placement: ['bottom', 'right'],
            target,
            popup,
            offset: [0, 0]
          })).to.deep.eq({ right: 0, top: 30 });
        });

        it('should calculate correct position if boundry is body with offsets', () => {
          expect(calculatePosition({
            placement: ['bottom', 'right'],
            target,
            popup,
            offset: [10, 10]
          })).to.deep.eq({ right: 10, top: 40 });
        });

        it('should calculate correct position inside scroll parent', () => {
          // Skip FF and IE because of the variable scroll bar width
          if (browser.gecko || browser.ie) {
            return;
          }

          const customTarget = document.createElement('div');
          customTarget.style.height = '30px';
          customTarget.style.marginLeft = '470px';

          const customPopup = document.createElement('div');

          scrollParent.appendChild(customTarget);
          scrollParent.appendChild(customPopup);

          expect(calculatePosition({
            placement: ['bottom', 'right'],
            target: customTarget,
            popup: customPopup,
            offset: [10, 10]
          })).to.deep.eq({ right: 10, top: 40 });
        });
      });
    });
  });

  describe('UI', () => {
    let target;
    beforeEach(() => {
      target = document.createElement('div');
      document.body.appendChild(target);
    });

    afterEach(() => {
      target.parentElement.removeChild(target);
    });

    it('should not render anything without target', () => {
      const popup = mount(<Popup/>);
      expect(popup.html()).to.equal(null);
      popup.unmount();
    });

    it('should render something with target', () => {
      const popup = mount(<Popup target={target} />);
      expect(popup.html()).to.not.equal(null);
      popup.unmount();
    });

    it('should call onPositionCalculated everytime position changes', () => {
      const onPositionCalculated = sinon.stub().returns({});
      const popup = mount(<Popup target={target} onPositionCalculated={onPositionCalculated} />);
      expect(onPositionCalculated.calledOnce).to.eq(true);
      popup.setProps({ fitHeight: 10 });
      expect(onPositionCalculated.calledTwice).to.eq(true);
      popup.unmount();
    });

    it('should replace position with a result of onPositionCalculated callback', () => {
      const position = {};
      const onPositionCalculated = () => position;
      const popup = mount(<Popup target={target} onPositionCalculated={onPositionCalculated} />);
      expect((popup.state() as any).position).to.eq(position);
      popup.unmount();
    });

    it('should call onPlacementChanged callback once placment is changed', () => {
      const onPlacementChanged = sinon.stub();
      const popup = mount(<Popup target={target} onPlacementChanged={onPlacementChanged} />);
      expect(onPlacementChanged.calledOnce).to.eq(true);
      popup.unmount();
    });

    it('should fail if target and popup are not in the same offset parent', () => {
      const target = document.createElement('div');

      const offsetParent = document.createElement('div');
      offsetParent.style.position = 'relative';
      offsetParent.appendChild(target);

      const popupParent = document.createElement('div');
      popupParent.style.position = 'relative';

      document.body.appendChild(offsetParent);
      document.body.appendChild(popupParent);

      expect(() => mount(<Popup target={target} />, { attachTo: popupParent })).to.throw(Error);

      offsetParent.parentElement!.removeChild(offsetParent);
      popupParent.parentElement!.removeChild(popupParent);
    });

    it('should fail if target and popup are in overflow: scroll container but their offset parent is not', () => {
      const parent = document.createElement('div');
      parent.style.overflow = 'scroll';

      const target = document.createElement('div');
      const popupParent = document.createElement('div');

      parent.appendChild(target);
      parent.appendChild(popupParent);
      document.body.appendChild(parent);

      expect(() => mount(<Popup target={target} />, { attachTo: popupParent })).to.throw(Error);

      parent.parentElement!.removeChild(parent);
    });
  });
});
