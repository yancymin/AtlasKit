import Editor from '@atlaskit/editor-jira';
import { action } from '@kadira/storybook';
import * as React from 'react';

const handleSave = () => action('save');
const handleChange = () => action('change');

export default (
  <Editor
    onSave={handleSave}
    onChange={handleChange}
    isExpandedByDefault={true}
  />
);
