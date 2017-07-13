const fs = require('fs');
const path = require('path');
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const SVGSpriter = require('svg-sprite'); // eslint-disable-line import/no-extraneous-dependencies
const mkdirp = require('mkdirp'); // eslint-disable-line import/no-extraneous-dependencies
const uid = require('uid'); // eslint-disable-line import/no-extraneous-dependencies
const cheerio = require('cheerio'); // eslint-disable-line import/no-extraneous-dependencies

const addTitleIds = {
  type: 'perItem',
  active: true,
  fn: (item) => {
    if (item.isElem('svg')) {
      const titleElem = item.content.find(subItem => subItem.isElem('title'));
      if (titleElem) {
        const id = `title-${uid()}`;
        titleElem.addAttr({
          name: 'id',
          local: 'id',
          prefix: '',
          value: id,
        });
      }
    }
  },
};

const spriterConfig = {
  dest: './dist',
  // this generates the id attr for each svg in the sprite
  shape: {
    id: {
      generator: (name, file) => {
        const iconName = file.path.replace('../icon/icons/src/', '').replace('.svg', '');
        return `ak-icon-${iconName}`;
      },
    },
    transform: [
      { svgo: { plugins: [{ addTitleIds }] } },
    ],
  },
  // this puts an inline style on the sprite to prevent it from being displayed on the page
  mode: {
    symbol: {
      dest: '.',
      inline: true,
      sprite: 'icons-sprite.svg',
    },
  },
};

const spriter = new SVGSpriter(spriterConfig);

// Add SVG source files from 'ak-icon'
glob.sync('../icon/icons/src/**/*.svg', {}).forEach((svgFile) => {
  spriter.add(svgFile, path.basename(svgFile), fs.readFileSync(svgFile, { encoding: 'utf-8' }));
});

// Compile the sprite
spriter.compile((error, result) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }

  const { path: spritePath, contents } = result.symbol.sprite;
  mkdirp.sync(path.dirname(spritePath));

  // Some post-processing to link <title> to symbol.aria-labelledby
  // and set focusable=false (for IE11)
  // Note: tried to do this with SVGO plugins above but no dice.
  const $ = cheerio.load(contents);

  $('symbol').each((i, sym) => {
    const titleId = $(sym).find('title').attr('id');
    $(sym).attr('aria-labelledby', titleId);
    $(sym).attr('focusable', 'false');
  });

  fs.writeFileSync(spritePath, $.html());
});
