import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import TagShape from './TagShape';

/** ************************************************************************************************
  This file exists so that we have a component we can pass the @atlaskit/readme Props component
  We reuse the definition to define the itemShape in StatelessMultiSelect as well
**************************************************************************************************/

export default class ItemShape extends PureComponent {
  static propTypes = {
    /** Hold an array of strings to compare against multi-select's filterValue */
    filterValues: PropTypes.arrayOf(PropTypes.string),
    /** The content to be displayed in the drop list and also in the tag when selected.  */
    content: PropTypes.string,
    /** Text to be displayed below the item in the drop list. */
    description: PropTypes.string,
    /** The value to be used when multi-select is submitted in a form. Also used internally. */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line react/no-unused-prop-types, max-len
    /** Set whether the item is selectable. */
    isDisabled: PropTypes.bool,
    /** Set whether the item is selected. Selected items will be displayed as a
    tag instead of in the drop list. */
    isSelected: PropTypes.bool,
    /** Element before item. Used to provide avatar when desired. */
    elemBefore: PropTypes.node,
    /** Object which will pass on some properties to the @atlaskit/tag element when selected. */
    tag: PropTypes.shape(TagShape.PropTypes), // eslint-disable-line react/no-unused-prop-types
  }

  static defaultProps = {
    isDisabled: false,
    isSelected: false,
  }
  render() {
    return null;
  }
}
