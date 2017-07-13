exports.type = 'perItem';

exports.active = true;

exports.description = 'adds role="presentation" to circle, path and rect elements';

exports.params = {
  tags: ['circle', 'path', 'rect'],
};

exports.fn = function addPresentationAttribute(item, params) {
  if (!item.hasAttr('role') && params.tags.indexOf(item.elem) !== -1) {
    item.addAttr({
      name: 'role',
      local: 'role',
      prefix: '',
      value: 'presentation',
    });
  }
};
