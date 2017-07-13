# Emoji

Use emoji...

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

Import the component in your React app as follows:

```js
import EmojiPicker from '@NAME@';
ReactDOM.render(<EmojiPicker />, container);
```

Don't forget to add these polyfills to your product build if you want to target older browsers:

 * Promise ([polyfill](https://www.npmjs.com/package/es6-promise), [browser support](http://caniuse.com/#feat=promises))
 * Fetch API ([polyfill](https://www.npmjs.com/package/whatwg-fetch), [browser support](http://caniuse.com/#feat=fetch))
 * URLSearchParams API ([polyfill](https://www.npmjs.com/package/url-search-params), [browser support](http://caniuse.com/#feat=urlsearchparams))
 * Element.closest ([polyfill](https://www.npmjs.com/package/element-closest), [browser support](http://caniuse.com/#feat=element-closest))

## Storybook

The storybook includes a set of stories for running against a live server. See ```ak-emoji/external-emoji```.

You can specify the URL's manually in the textarea on the story (as json configuration suitable for EmojiResource),
or specify it when running story in the local-config.json in the root of this component.

There is an example file local-config-example.json that can be copied.
