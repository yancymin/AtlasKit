// TODO Replace with https://github.com/svg/svgo/pull/612 once merged

const uid = require('uid');

exports.type = 'perItem';

exports.active = true;

exports.description = 'Adds an aria-labelledby and a referenced <title> and <description> section';

exports.params = {
  title: '',
  desc: '',
};

exports.fn = function addAriaLabel(item, params) {
  if (item.isElem('svg')) {
    const ids = [];

    ['desc', 'title'].forEach((elem) => {
      const value = params[elem];
      if (value) {
        let id;
        if (typeof params.idFn === 'function') {
          id = params.idFn(elem);
        } else {
          id = `${elem}-${uid()}`;
        }
        ids.push(id);

        let pos = 0;
        let replace = 0;
        item.content.forEach((subItem, index) => {
          if (subItem.isElem(elem)) {
            pos = index;
            replace = 1;
          }
        });
        item.spliceContent(pos, replace, new item.constructor({
          elem,
          local: elem,
          prefix: '',
          content: [new item.constructor({ text: value })],
          attrs: [new item.constructor({
            name: 'id',
            local: 'id',
            prefix: '',
            value: id,
          })],
        }));
      }
    });

    if (ids.length) {
      if (item.hasAttr('aria-labelledby')) {
        item.removeAttr('aria-labelledby');
      }
      item.addAttr({
        name: 'aria-labelledby',
        local: 'aria-labelledby',
        prefix: '',
        value: ids.join(' '),
      });
    }
  }
};
