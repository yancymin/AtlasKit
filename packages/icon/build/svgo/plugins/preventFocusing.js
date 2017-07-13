exports.type = 'full';

exports.active = true;

exports.description = 'prevents SVGs from being focusable in IE/Edge';

const focusableAttribute = {
  name: 'focusable',
  prefix: '',
  value: false,
  local: 'focusable',
};

// Internet Explorer and Edge are the only browsers that consider
// SVGs to be focusable by default (╯°□°）╯︵ ┻━┻
//
// This leads to weird behaviour, for example if you have buttons
// containing SVG icons, you'll need to tab *twice* to move from
// one to the next.
//
// Setting focusable="false" prevents this behaviour, and results
// in consistent behaviour across all browsers.

exports.fn = function addFocusableFalseAttr(data) {
  const svg = data.content[0];
  if (svg.isElem('svg') && !svg.hasAttr(focusableAttribute.name)) {
    svg.addAttr(focusableAttribute);
  }
  return data;
};
