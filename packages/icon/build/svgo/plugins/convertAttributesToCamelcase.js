const camelCase = require('camelcase');

exports.type = 'perItem';

exports.active = true;

exports.description = 'convert dash-cased attributes to camelCase';

exports.fn = function removeNamespacedAttributes(item) {
  item.eachAttr((attr) => {
    const camelCaseName = camelCase(attr.local);
    // Filter out attributes which have prefixes or do not need to be converted to camelCase
    if (camelCaseName !== attr.local && !attr.prefix) {
      item.addAttr({
        name: camelCaseName,
        local: camelCaseName,
        prefix: '',
        value: attr.value,
      });
      item.removeAttr(attr.name);
    }
  });
};
