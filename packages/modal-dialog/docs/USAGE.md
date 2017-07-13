# ModalDialog

This component displays content in a layer that sits above the rest of the page content. Users won't be able to interact with the page until the dialog is closed.

![Example tags](https://i.imgur.com/QB0x4My.png)

##Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

This package exports a React component.

Import the component in your React app as follows:

```js
import ModalDialog from '@NAME@';
ReactDOM.render(
  <ModalDialog
    isOpen
    header={
      <h2>Modal header</h2>
    }
    footer={
      <p>Modal footer</p>
    }
  >
    <p>Modal body goes here</p>
  </ModalDialog>
, container);
```

## ModalDialog
**Kind**: global class
* Properties

    *  [modalDialog.isOpen](#ModalDialog+isOpen) : <code>Boolean</code>
    *  [modalDialog.width](#ModalDialog+width) : <code>string</code>
    *  [modalDialog.onDialogDismissed](#ModalDialog+onDialogDismissed) : <code>function</code>
    *  [ModalDialog.header](#ModalDialog.header) : <code>element</code>
    *  [ModalDialog.children](#ModalDialog.children) : <code>element</code>
    *  [ModalDialog.footer](#ModalDialog.footer) : <code>element</code>

<a name="new_ModalDialog_new"></a>

### new ModalDialog()
A modal dialog which blankets the page

**JS Example**
```js
import ModalDialog from 'ak-modal-dialog';
ReactDOM.render(<ModalDialog />, container);
```
<a name="ModalDialog+isOpen"></a>

### modalDialog.isOpen : <code>Boolean</code>
Whether the modal dialog is open/visible

**Kind**: instance property of <code>[ModalDialog](#ModalDialog)</code>
**Default**: <code>false</code>
<a name="ModalDialog+width"></a>

### modalDialog.width : <code>string</code>
The maximum width tier of the dialog
Allowed values are: 'small' (400px), 'medium' (600px), 'large' (800px), 'x-large' (968px),
or any integer value defining the pixel width (e.g. 300), or any string value defining the
pixel or percentage width including unit (e.g. 300px, 75%).

**Kind**: instance property of <code>[ModalDialog](#ModalDialog)</code>
**Default**: <code>&quot;default&quot;</code>
<a name="ModalDialog+onDialogDismissed"></a>

### modalDialog.onDialogDismissed : <code>function</code>
Handler function to be called when the blanket is clicked

**Kind**: instance property of <code>[ModalDialog](#ModalDialog)</code>
<a name="ModalDialog.header"></a>

### ModalDialog.header : <code>element</code>
Elements to be placed at top of modal dialog

**Kind**: static property of <code>[ModalDialog](#ModalDialog)</code>
<a name="ModalDialog.children"></a>

### ModalDialog.children : <code>element</code>
Content to be placed in the middle of the modal dialog

**Kind**: static property of <code>[ModalDialog](#ModalDialog)</code>
<a name="ModalDialog.footer"></a>

### ModalDialog.footer : <code>element</code>
Elements to be placed at bottom of modal dialog

**Kind**: static property of <code>[ModalDialog](#ModalDialog)</code>
