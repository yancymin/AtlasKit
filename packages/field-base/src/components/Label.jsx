import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { LabelWrapper, RequiredIndicator, LabelInner } from '../styled/Label';

export default class Label extends PureComponent {
  static propTypes = {
    /** the label text to display */
    label: PropTypes.string.isRequired,
    /** whether to hide the label */
    isLabelHidden: PropTypes.bool,
    /** onclick handler */
    onClick: PropTypes.func,
    /** show a style indicating that the label is for a required field */
    isRequired: PropTypes.bool,
    /** the labels control element */
    htmlFor: PropTypes.string,
    /** any children to render, displayed underneath the label */
    children: PropTypes.node,
    /** controls the appearance of the label */
    appearance: PropTypes.oneOf(['default', 'inline-edit']),
    /** controls the top margin of the label */
    isFirstChild: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    const {
      appearance,
      children,
      htmlFor,
      isFirstChild,
      isLabelHidden,
      isRequired,
      label,
      onClick,
    } = this.props;

    return (
      <LabelWrapper htmlFor={htmlFor}>
        <LabelInner
          isHidden={isLabelHidden}
          inlineEdit={appearance === 'inline-edit'}
          firstChild={isFirstChild}
        >
          <span onClick={onClick}>{label}</span>
          {isRequired ?
            <RequiredIndicator role="presentation">*</RequiredIndicator>
            : null
          }
        </LabelInner>
        {children}
      </LabelWrapper>
    );
  }
}
