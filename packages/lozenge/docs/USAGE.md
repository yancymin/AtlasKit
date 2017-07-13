# Lozenge

Use lozenges to highlight an item's status for quick recognition. Lozenges can be emphasised and can use color to help convey meanings that users can learn and recognize across our products. Use subtle lozenges by default and in instances where they may dominate the screen, such as in long tables.

![Example lozenge](https://i.imgur.com/SMl58ZZ.png)

![Example lozenge](https://i.imgur.com/jbjMaOq.png)


## Try it out

Interact with a [live demo of the @NAME@ component with code examples](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
# or
yarn add @NAME@
```

## Using the component

Import the component in your React app as follows:

```js
import Lozenge from '@NAME@';
ReactDOM.render(<Lozenge />, container);
```

## Lozenge
**Kind**: global class
* Properties

    *  [lozenge.isBold](#Lozenge+isBold) : <code>boolean</code>
    *  [lozenge.appearance](#Lozenge+appearance) : <code>string</code>
    *  [lozenge.children](#Lozenge+children) : <code>node</code>

<a name="new_Lozenge_new"></a>

### new Lozenge()
Create instances of the component programmatically, or using markup.

**JS Example**
```js
import Lozenge from 'ak-lozenge';
const component = new Lozenge();
```
<a name="Lozenge+isBold"></a>

### lozenge.isBold : <code>boolean</code>
Toggles the bolder appearance.

**Kind**: instance property of <code>[Lozenge](#Lozenge)</code>
**Default**: <code>false</code>
<a name="Lozenge+appearance"></a>

### lozenge.appearance : <code>string</code>
Affects the visual style of the badge.
Allowed values are: 'default', 'success', 'removed', 'inprogress', 'new', 'moved'.

**Kind**: instance property of <code>[Lozenge](#Lozenge)</code>
**Default**: <code>&quot;default&quot;</code>
<a name="Lozenge+children"></a>

### lozenge.children : <code>node</code>
The content passed to the lozenge

**Kind**: instance property of <code>[Lozenge](#Lozenge)</code>
