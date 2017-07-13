import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio'; // eslint-disable-line import/no-extraneous-dependencies
import { name } from '../../package.json';
import expectedSvgIds from '../../src/internal/iconIds';

const icons = fs.readFileSync(path.join(__dirname, '../../dist/icons-sprite.svg'), { encoding: 'utf-8' });

describe(name, () => {
  // it.skip('default export less file', () => {});
  it('icon export should contain expected SVG symbol ids', () => {
    const arrayCompare = (actual, expected) => {
      expect(actual.length).toBe(expected.length);

      for (let i = 0; i < actual.length; i++) {
        if (actual[i] !== expected[i]) {
          let actualContext = '... ';
          let expectedContext = '... ';

          for (let j = -2; j <= 2; j++) {
            if (i + j >= 0 && i + j < actual.length) {
              actualContext = `${actualContext} ${actual[i + j]}, `;
              expectedContext = `${expectedContext} ${expected[i + j]}, `;
            }
          }

          if (i + 1 < expected.length && actual[i] === expected[i + 1]) {
            return `Missing value ${expected[i]}: ${actualContext} !== ${expectedContext}`;
          }
          return `Found unexpected value ${actual[i]}: ${actualContext} !== ${expectedContext}`;
        }
      }
      return '';
    };
    // NOTE Please remember:
    // An addition is a feature
    // a removal or rename is a BREAKING CHANGE

    // Load the spritesheet
    const $ = cheerio.load(icons);

    // Get the id of each symbol in the spritesheet
    const symbolIds = $('symbol').map((i, symbol) => (
      $(symbol).attr('id')
    )).get();

    const actual = symbolIds.sort();
    const expected = expectedSvgIds.sort();
    const failedMatches = arrayCompare(actual, expected);
    expect(failedMatches).toBe('');

    // If you find yourself here and wonder why this list is not auto-generated, then bear in
    // mind that tests are supposed to tell you when a piece of software breaks.
    // As the sole purpose of this component is providing icons:
    //
    // * changing an icon is a patch
    // * adding an icon is a feature
    // * removing an icon is a breaking change
    // * renaming an icon is a breaking change
    //
    // If we were to auto-generate this list, then renaming, adding or removing would NOT
    // break any tests and thus not hint the developer at what kind of change he/she is making
  });
});
