import { description } from '../../package.json';

export const readmeDescription = `${description}. This is the basic (controlled) version of this component, which does not handle its own state. Supply a callback via the onRadioChange property to update your state when a radio item is selected.`;
export const readmeDescriptionSmart = `${description}. This is the smart (uncontrolled) version of this component, which handles its own state. You can also pass an onRadioChange callback to be notified of state changes (the state will be updated automatically).`;

export const radioGroupPropDescriptions = {
  isRequired: 'Whether the user must select a value before submitting the form.',
  items: 'An array of objects describing the radio buttons to render. See below for more details.',
  label: 'The text to display above the radio buttons. Should describes the group of radio buttons and prompt the user action.',
  onRadioChange: 'Function to call when a radio is selected and fires a change event. This should update the items property to select the newly-selected item.',
};

export const itemKeys = [
  {
    name: 'defaultSelected',
    type: 'Boolean',
    description: 'Whether the item should be selected by default. This default will be overridden once a user selects another item.',
  },
  {
    name: 'isSelected',
    type: 'Boolean',
    description: 'Whether the item is selected (i.e. the radio button is checked).',
  },
  {
    name: 'isDisabled',
    type: 'Boolean',
    description: 'Whether the item is disabled. A disabled item cannot be selected by the user.',
  },
  {
    name: 'label',
    type: 'String',
    description: 'The text label to display for the radio item.',
  },
  {
    name: 'name',
    type: 'String',
    description: 'The name of the item, which is submitted with the form data.',
  },
  {
    name: 'value',
    type: 'String',
    description: 'The value of the item, which is submitted with the form data.',
  },
];
export const itemsProps = itemKeys.filter(item => item.name !== 'defaultSelected');
export const itemsPropsSmart = itemKeys.filter(item => item.name !== 'selected');
