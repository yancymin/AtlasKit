import { getFlipBehavior } from '../../src/internal/helpers';

describe('Layer', () => {
  describe('helpers', () => {
    describe('getFlipBehavior', () => {
      it('with autoFlip = true, returns null', () => {
        const props = {
          position: 'right',
          autoFlip: true,
        };
        expect(getFlipBehavior(props)).toBe(null);
      });

      it('with autoFlip = false, returns null', () => {
        const props = {
          position: 'right',
          autoFlip: false,
        };
        expect(getFlipBehavior(props)).toBe(null);
      });

      it('with single value in array', () => {
        const props = {
          position: 'left',
          autoFlip: ['right'],
        };
        expect(getFlipBehavior(props)).toEqual(['left', 'right']);
      });

      it('with multiple values in array', () => {
        const props = {
          position: 'right',
          autoFlip: ['top', 'left', 'bottom'],
        };
        expect(getFlipBehavior(props)).toEqual(['right', 'top', 'left', 'bottom']);
      });
    });
  });
});
