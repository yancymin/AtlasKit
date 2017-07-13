
import { positionToPopperPosition } from '../../src/internal/helpers';

describe('Tooltip helpers', () => {
  describe('positionToPopperPosition', () => {
    const testCases = [
      { position: 'top', expected: 'top center' },
      { position: 'bottom', expected: 'bottom center' },
      { position: 'left', expected: 'left middle' },
      { position: 'right', expected: 'right middle' },
    ];

    testCases.forEach((test) => {
      it(`should correctly translate position=${test.position}`, () => {
        expect(positionToPopperPosition(test.position)).toBe(test.expected);
      });
    });
  });
});
