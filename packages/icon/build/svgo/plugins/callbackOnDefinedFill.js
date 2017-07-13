exports.type = 'perItem';

exports.active = true;

exports.description = 'calls back when it finds a color fill';

exports.params = {
  allowedValues: ['currentColor', 'none', 'inherit'],
  callback: console.log.bind(console), // eslint-disable-line no-console
};

exports.fn = function callbackOnDefinedFill(item, params) {
  var fill; // eslint-disable-line no-var
  if (item.hasAttr('fill')) {
    fill = item.attr('fill').value;
    if (fill && params.allowedValues.indexOf(fill) === -1) {
      params.callback(fill);
    }
  }
};
