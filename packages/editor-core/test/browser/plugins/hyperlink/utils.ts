import { expect } from 'chai';
import { normalizeUrl } from '../../../../src/plugins/hyperlink/utils';

describe('hyperlink', () => {
  describe('#normalizeUrl', () => {
    const examples = [
      ['prettyandsimple@example.com', 'mailto:prettyandsimple@example.com'],
      ['mailto:prettyandsimple@example.com', 'mailto:prettyandsimple@example.com'],
      ['example.com', 'http://example.com'],
      ['http://example.com', 'http://example.com'],
      ['/index.php', '/index.php'],
      ['./index.php', './index.php'],
      ['#hash', '#hash'],
      ['', '']
    ];

    examples.forEach(([actual, expected]) => {
      it(`should convert from "${actual}" -> "${expected}"`, () => {
        expect(normalizeUrl(actual)).to.eq(expected);
      });
    });
  });
});
