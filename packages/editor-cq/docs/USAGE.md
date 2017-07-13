# @NAME@

This component provides a packaged version of the Atlassian Editor for use in Confluence Questions.

It's specific to CQ in that it:

- has a schema that's compatible with Confluence's "storage format" (in shape)
- provides encoding and decoding from Confluence's storage format

## Try it out

Interact with a [live demo of the @NAME@ component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).


## Installation

Install from NPM:

```sh
npm install @NAME@
```

Two flavours of JavaScript are published:

- ES5 (referenced by the `main` field in `package.json`)
- ES2015 (referenced by the `jsnext:main` field in `package.json`)

If you're using webpack, adjust your [`resolve.packageMains`](https://webpack.github.io/docs/configuration.html#resolve-packagemains) accordingly.


## Usage

The editor is built as a React component that can be used directly in a JSX file.

**Example:**

```jsx
import React, { Component } from 'react';
import Editor from '@NAME@';

class Page extends Component {
  render() {
    return (
      <div>
        <Editor
          isExpandedByDefault
          onSave={this.handleSave}
        />
      </div>
    );
  }

  handleSave = (editor) => {
    alert(`Saved with value Confluence Storage value: ${editor.value}`);
  }
}
```

Don't forget to add these polyfills to your product build if you're using emoji or mentions in the editor and you want to target older browsers:

 * Promise ([polyfill](https://www.npmjs.com/package/es6-promise), [browser support](http://caniuse.com/#feat=promises))
 * Fetch API ([polyfill](https://www.npmjs.com/package/whatwg-fetch), [browser support](http://caniuse.com/#feat=fetch))
 * URLSearchParams API ([polyfill](https://www.npmjs.com/package/url-search-params), [browser support](http://caniuse.com/#feat=urlsearchparams))
 * Element.closest ([polyfill](https://www.npmjs.com/package/element-closest), [browser support](http://caniuse.com/#feat=element-closest))

## `Editor` API

```jsx
import Editor from '@NAME@';
```

### Props

#### `mentionProvider?: Promise<MentionProvider>`

A resource required for enabling Fabric mentions support. Please refer to the
[source of MentionProvider interface](https://bitbucket.org/atlassian/atlaskit/src/master/packages/mention/src/api/MentionResource.ts?at=master&fileviewer=file-view-default) for more details.

#### `mediaProvider?: Promise<MediaProvider>`

A resource required for enabling Fabric mentions support. Please refer to the
[source of MediaProvider interface](https://bitbucket.org/atlassian/atlaskit/src/master/packages/editor-core/src/media/index.ts?at=master&fileviewer=file-view-default) for more details.

#### `isExpandedByDefault?: boolean`

The initial "expanded" value. When the editor is expanded it can have content added by the user.
The non-expanded mode renders a small placeholder field that when focused, will switch to the expanded
mode.

#### `expanded?: boolean`

A run-time way for controlling Editor expansion. Setting this to "true" will expand the editor,
if it was collapsed; setting this to "false" will collapse the Editor if it was expanded. Note that
properties are write-only so this can not be used to check if the Editor is currently expanded.

#### `defaultValue?: string`

The initial value for the editor, in Confluence Storage format.

#### `onCancel?: (editor?: Editor) => void`

A callback triggered when the cancel button is pressed. The cancel button is only rendered if this
prop is provided. Omitting this prop can be used to hide the button.

#### `onChange?: (editor?: Editor) => void`

A callback triggered when a content change is made.

#### `onSave?: (editor?: Editor) => void`

A callback triggered when the save button is pressed. The save button is only rendered if this
prop is provided. Omitting this prop can be used to hide the button.

#### `placeholder?: string`

A string to use in the non-expanded placeholder, e.g. `"What do you want to say?"`.

### Methods / setters / getters

#### `focus(): void`

Focuses the the editor.

#### `clear(): void`

Clears the content from the editor, returning it to an empty state.

#### `isEmpty(): boolean`

Returns true if the editor content is empty.

#### `get value(): string | undefined`

Returns the value of the editor in Confluence Storage format. This getter computes the value
on request, as such only access this getter when the value is actually required.


#### `errorReporter?: ErrorReportingHandler`

If you're using some error reporting service/tool in your product you can help Atlassian Editor track and store its own errors inside your error reporting service. Provide "errorReporter" property to the Editor component and describe "captureMessage" and "captureException" methods for this.

```typescript
// if you're using Sentry
import * as Raven from 'raven';

// this is optional, use it only for TS support
import { ErrorReportingHandler, ErrorReporterTags } from '@atlaskit/editor-core';

Raven
  .config(DSN_URI, { release: RELEASE_VERSION })
  .install();

class ErrorReporter implements ErrorReportingHandler {
  captureMessage(msg: string, tags?: ErrorReporterTags) {
    Raven.captureMessage(msg, { ...tags, module: 'editor' });
  }

  captureException(err: Error, tags?: ErrorReporterTags) {
    Raven.captureException(err, { ...tags, module: 'editor' });
  }
}

const errorReporter = new ErrorReporter();

export default (
  <Editor errorReporter={errorReporter}/>
);
```
