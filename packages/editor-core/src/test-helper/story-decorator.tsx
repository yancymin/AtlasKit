import * as React from 'react';
import { version } from '../index';

/**
 * This decorator displays current story name, package version and imported editor-core version.
 * To use this decorator, call addDecorator() in your storybook, like so:
 *
 *   import { version } from '../src';
 *   import { nameAndVersionStoryDecorator } from '@atlaskit/editor-core/test-helper';
 *
 *   storiesOf(name, module)
 *     .addDecorator(nameAndVersionStoryDecorator(version))
 *
 */
export default function (packageVersion) {
  return function (story: Function, context: { kind: string, story: string }) {
    return <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 10 }}>
        {context.story}
        <span style={{ display: 'inline-block', float: 'right', width: 'auto', whiteSpace: 'nowrap', color: 'rgb(130, 130, 130)' }}>
          {packageVersion} (editor-core@{version})
        </span>
      </h3>
      {story()}
    </div>;
  };
}
