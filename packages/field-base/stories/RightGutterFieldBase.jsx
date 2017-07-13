import React from 'react';
import Input from '@atlaskit/input';
import uid from 'uid';
import FieldBase, { Label } from '../src';

/* eslint-disable react/prop-types */
export default (props) => {
  const id = uid();
  return (
    <div>
      <Label
        label={props.label}
        htmlFor={id}
      />
      <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
        <FieldBase isFitContainerWidthEnabled>
          <Input id={id} value="Input children" isEditing />
        </FieldBase>
        <div style={{ marginLeft: 4 }}>
          {props.rightGutter}
        </div>
      </div>
    </div>
  );
};
