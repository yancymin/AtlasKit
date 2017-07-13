const itemPropDescriptions = {
  filterValues: 'An array of strings to compare against Multi-select\'s filterValue. An item displays only if one of its filterValues matches the multi-select\'s filterValue. If not provided, it falls back to content\'s value.',
  content: 'The text/content to display in the option and in the rendered tags (selected options).',
  description: 'The text/content to display underneath the content. Doesn`t show in the rendered tags',
  value: 'Value sent when option is selected in a form.',
  isDisabled: 'Whether an option is selectable or not.',
  isSelected: 'Whether an option is selected or not (affects appearance of option, not of selectedItems)',
  elemBefore: 'Content to display before the `content` in the option (icons, avatars, etc)',
  tag: 'Extra options passed to the Tag when an item is selected. Only elemBefore and appearance are passed on. See Item Tag readme for more details on this.',
};

const itemPropTypes = {
  filterValues: 'ArrayOf(string)',
  value: 'OneOf(string, number)',
  tag: 'TagOptions',
  isSelected: 'bool',
  isDisabled: 'bool',
  elemBefore: 'node',
};

const itemPropDefault = {
  isDisabled: 'false',
  isSelected: 'false',
};

const tagPropDescriptions = {
  appearance: 'Modifier used to change the rendered appearance of a tag ("default" or "rounded")',
  elemBefore: 'Used to render content before the text of the Tag (usually used for Avatars or Icons)',
};

const footerPropDescriptions = {
  content: 'Text to show in the footer',
  elemBefore: 'An element (usualy an icon) to show before the text',
  onActivate: 'Handler to be called when footer is clicked or Enter is pressed',
  appearance: 'Appearance of the footer. Can be either "default" or "primary".',
};

const footerPropTypes = {
  content: 'string',
  elemBefore: 'node',
  onActivate: 'func',
  appearance: 'string',
};

/* eslint-disable import/prefer-default-export */
export {
  itemPropDescriptions,
  itemPropTypes,
  itemPropDefault,
  tagPropDescriptions,
  footerPropDescriptions,
  footerPropTypes,
};
/* eslint-enable import/prefer-default-export */
