# @NAME@

This packages provides core components shared across all Atlassian Editor packages.

It's the home for shared editor functionality and implements shared editor behaviours, and is the
preferred destination for editor functionality.

## Package organisation

### Analytics

**Source location:** `src/analytics/`
**Import:** `import { … } from '@NAME@'`

A set of tools for emitting analytics relating to user interaction with the product. These can be wired
into product integrations. Transport is left as the responsibility for the product.

### Plugins

**Source location:** `src/plugins/`
**Import:** `import { … } from '@NAME@'`

Plugins (and "plugin states") are the mechanisms by which functionality is added to the editor.

**Plugin principles:**

- Plugins should avoid making too many assumptions about the shape of the schema. Different products
  use different schemas, so the plugin should gracefully handle the absence of nodes or marks, or
  fail loudly in the constructor.
- A good rule of thumb is one plugin per content-type. For example:

    - `HyperlinkPlugin` for hyperlinks.
    - `MentionsPlugin` for mentions.
    - `RulePlugin` for horizontal rules.

- Plugins are responsible for attaching keymaps and input rules that are specific to the content.
  For example MentionsPlugin intercepts arrow keys when the selection is in a mention query and
  uses them to navigate items in the mention picker.
- Plugins will be used on all platforms (browser + mobile native).
- Plugins should expose "logical APIs" that are suitable for integrating into UI components. For
  example the HyperlinkState expose:

    ```typescript
    class HyperlinkState {
      // …

      // public state
      href?: string;
      text?: string;
      active = false;
      canAddLink = false;
      element?: HTMLElement;

      // …
    }
    ```

    These fields allow a UI to present the current hyperlink href and text, and position a floating
    toolbar at the correct position on the screen (thanks to `element` being exposed).

### ProseMirror

**Source location:** `src/prosemirror/`
**Import:** `import { … } from '@NAME@'`

The prosemirror directory provides a flat export of ProseMirror 0.10 objects, to solve the recurring
problem figuring out which `prosemirror/dist/*` package to import from.

A hoped side-benefit of this approach is a simplified upgrade-path for code for ProseMirror upgrades.

It also includes TypeScript definitions for a large chunk of ProseMirror's API surface, and that of
browserkeymap too. As a general practice, ProseMirror objects should be imported via this directory.

### Schema

**Source location:** `src/schema/`
**Import:** `import { … } from '@NAME@'`

The schema modules implement node and mark types for use in product-specific schemas. Node and mark
types are responsible for:

- encoding to DOM for editable content, including styling
- decoding (matching against) pasted HTML content into ProseMirror nodes

**Schema principles:**

- The name of a node type or mark type must **always** be the same across different schemas. As such
  node types and mark types should make an assertion in their constructor that they are named
  correctly.

Some complex node and mark types (to use as examples):

- [`MentionQueryMarkType`](https://bitbucket.org/atlassian/atlaskit/src/master/packages/editor-core/src/schema/marks/mention-query.ts) -- used to indicate a new editing context where typed characters perform a
  user-search, and arrow keys and enter are used to navigate a user-picker.
- [`MentionNodeType`](https://bitbucket.org/atlassian/atlaskit/src/master/packages/editor-core/src/schema/nodes/mention.ts) -- an immutable node that represents a user.

### UI

**Source location:** `src/ui/`
**Import:** `import { … } from '@NAME@'`

The UI modules are responsible for implementing non-content elements of the user interface, for
example:

- `src/ui/ChromeCollapsed` -- A collapsed editor that provides an initial affordance in the UI,
  suitable for a comment editor.
- `src/ui/ChromeExpanded` -- An expanded editor that includes a fixed toolbar, save & cancel
  buttons, surrounding borders, etc.
- `src/ui/Chrome` -- An encapsulation of `ChromeCollapsed` and `ChromeExpanded`, providing "click to
  expand" behaviour.
- `src/ui/FloatingToolbar` -- A floating popup that can be used as the base for a floating toolbar (e.g.
  `HyperlinkEdit`).
- `src/ui/Toolbar*` -- A collection of button-groups that are suitable for placing in the fixed
  toolbar.

A few notes on development:

- The UI is only intended for use in a web browser, it is not used for the mobile native web view
  editor.
- Although ProseMirror is not built on React, the UI **is**.
- Styling is achived via [styled-components](https://github.com/styled-components/styled-components).
- The UI can be coupled to (have knowledge of) plugins, but not the other way around.

    This allows the plugins to be used on mobile with a completely different UI (a native one) to
    that which is used on web.

The UI modules are exported from the top level `index.ts`, which means that they'll be pulled in in
the ES5 distribution. If you're building a mobile editor the ES2015 sources should be used instead
as they can enable tree shaking with webpack 2.

### Test helpers

**Source location:** `src/test-helper/`
**Import:** `import { … } from '@NAME@/src/test-helper'`

A set of testing utilities are provided that making testing the editor easier, these include:

- [Chai](http://chaijs.com/) extensions for making assertions about ProseMirror nodes, fragments,
  slices, etc.
- Tools for emiting DOM events (e.g. clicks or pastes).
- Tools for creating DOM sandboxes.
- Tools for inserting content into a ProseMirror.
- Tools for constructing a ProseMirror with an initial text selection.
- Tools for creating node builders based on a schema.
- A plugin for making ProseMirror synchronously flush to the DOM.

Test helpers are *not* exported from the root package, as a courtesy to ES5 consumers that are
unable to imploy tree shaking.

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

Unless you're developing a new editor for a product, you've probably arrived at the wrong package. Consider using:

- [editor-bitbucket](https://npmjs.com/package/@atlaskit/editor-bitbucket)
- [editor-cq](https://npmjs.com/package/@atlaskit/editor-cq)
- [editor-hipchat](https://npmjs.com/package/@atlaskit/editor-hipchat)
- [editor-jira](https://npmjs.com/package/@atlaskit/editor-jira)

If you're sure you want to consume this package, refer to one of the packages above for an example
of how to use it.

One important omission from this package are pre-built schemas. Due to the nature of different
products using different storage backend, per-product schemas exist in product-specific editor
packages that ensure that authored content does not violate the constraints of the underlying
storage.

The schemas in those packages are composed on node and mark types defined in this package.
