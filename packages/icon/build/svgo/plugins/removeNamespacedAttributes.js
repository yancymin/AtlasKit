exports.type = 'perItem';

exports.active = true;

exports.description = 'Removes attributes with a namespace (e.g. xmlns:link, ns:foo, ...)';

exports.fn = function removeNamespacedAttributes(item) {
  item.eachAttr((attr) => {
    if (attr.prefix && attr.local) {
      item.removeAttr(attr.name);
    }
  });
};
