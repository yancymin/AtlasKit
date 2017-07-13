import React from 'react';
import FieldBase, { Label } from '../src';

const containerStyles = {
  display: 'inline-flex',
  flexDirection: 'column',
};

/* eslint-disable react/prop-types */
export default props => (
  <div style={{ ...containerStyles, ...{ padding: props.disablePadding ? '0' : '20px' } }}>
    <Label
      label={props.label}
      htmlFor={props.id}
      isLabelHidden={props.isLabelHidden}
      isRequired={props.isRequired}
      appearance={props.labelAppearance}
      isFirstChild={props.isFirstChild}
    />
    <FieldBase
      invalidMessage={props.invalidMessage}
      isCompact={props.isCompact}
      defaultIsDialogOpen={props.defaultIsDialogOpen}
      defaultIsFocused={props.defaultIsFocused}
      isInvalid={props.isInvalid}
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      appearance={props.appearance}
      isPaddingDisabled={props.isPaddingDisabled}
      isFitContainerWidthEnabled={props.isFitContainerWidthEnabled}
      isLoading={props.isLoading}
    >
      {props.children}
    </FieldBase>
  </div>
);
