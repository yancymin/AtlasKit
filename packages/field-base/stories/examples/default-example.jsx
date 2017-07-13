import React from 'react';
import FieldBase from '@atlaskit/field-base';
import Input from '@atlaskit/input';

export default (
  <div style={{ maxWidth: '200px' }}>
    <FieldBase invalidMessage="foo">
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    </FieldBase>
  </div>
);
