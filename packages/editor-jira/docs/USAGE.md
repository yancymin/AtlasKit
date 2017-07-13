# @NAME@

This component provides a WYSIWYG editor for JIRA. It's based on Atlassian Editor technology, but includes a JIRA specific
schema and user experience.

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).


## Installation

```sh
npm install @NAME@
```

## Usage

Don't forget to add these polyfills to your product build if you're using emoji or mentions in the editor and you want to target older browsers:

 * Promise ([polyfill](https://www.npmjs.com/package/es6-promise), [browser support](http://caniuse.com/#feat=promises))
 * Fetch API ([polyfill](https://www.npmjs.com/package/whatwg-fetch), [browser support](http://caniuse.com/#feat=fetch))
 * URLSearchParams API ([polyfill](https://www.npmjs.com/package/url-search-params), [browser support](http://caniuse.com/#feat=urlsearchparams))
 * Element.closest ([polyfill](https://www.npmjs.com/package/element-closest), [browser support](http://caniuse.com/#feat=element-closest))

## `Editor` API

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
