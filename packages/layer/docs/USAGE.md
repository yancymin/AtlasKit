# Layer

The layer is responsible for the positioning of an element on a page. For example, you wrap a tooltip with a layer to make its position relative to a target. You can specify up to 12 different positions.

If you use a layer with a component that could be opened or closed, you have to make sure you re-render the layer the first time you open the component, otherwise it will end up with a wrong position.

![Example of Layer](https://i.imgur.com/f2UkGw8.gif)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

### HTML

This package exports the ak-layer React component.

Import the component in your React app as follows:

```js
import Layer from '@NAME@';

const myContent = (<div>I'm going to be aligned to the right!</div>);

ReactDOM.render(<Layer position="right middle" content={myContent}>
  <div>Some content</div>
</Layer>, container);
```

Any content that is passed to Layer as children will always be rendered and any content passed throught the `content` prop will be rendered aligned to the internal content.

## Layer
**Kind**: global class
* Properties

    *  [layer.position](#Layer+position) : <code>String</code>
    *  [layer.boundariesElement](#Layer+boundariesElement) : <code>String</code>
    *  [layer.autoPosition](#Layer+autoPosition) : <code>Boolean</code>
    *  [layer.offset](#Layer+offset) : <code>String</code>
    *  [layer.content](#Layer+content) : <code>ReactElement</code>
    *  [layer.onFlippedChange](#Layer+onFlippedChange) : <code>function</code>

<a name="new_Layer_new"></a>

### new Layer()
The layer is responsible for the positioning of an element on a page relative to
another element.

<a name="Layer+position"></a>

### layer.position : <code>String</code>
Position of a layer relative to its target.
The position attribute takes two positional arguments in the
format `position="edge edge-position"`, where `edge` specifies what edge to align the layer
to, and `edge-position` specifies where on that edge the layer should appear.
Refer to the table below for examples:

|             | top left    | top center    | top right    |              |
|-------------|-------------|---------------|--------------|--------------|
| left top    |             |               |              | right top    |
| left middle |             |    target     |              | right middle |
| left bottom |             |               |              | right bottom |
|             | bottom left | bottom center | bottom right |              |

**Kind**: instance property of <code>[Layer](#Layer)</code>
**Default**: <code>&quot;right middle&quot;</code>
**HTML Example**
```js
<Layer position="top left"></Layer>
```
<a name="Layer+boundariesElement"></a>

### layer.boundariesElement : <code>String</code>
Element to act as a boundary for the Layer.
The Layer will not sit outside this element if it can help it.
If, through it's normal positoning, it would end up outside the boundary the layer
will flip positions if the autoPosition prop is set.

Valid values are "window" and "viewport"
If not set the boundary will be the current viewport.

**Kind**: instance property of <code>[Layer](#Layer)</code>
**Default**: <code>&quot;viewport&quot;</code>
**HTML Example**
```js
<Layer autoPosition boundariesElement="window"></Layer>
```
<a name="Layer+autoPosition"></a>

### layer.autoPosition : <code>Boolean</code>
Sets whether a Layer will flip it's position if there is not enough space in
the requested position.
i.e. if a layer is set to position="top middle" but placing it there would cause
it to be outside the viewport (or the boundariesElement if that is set)
the Layer will instead be positioned in "bottom middle".

**Kind**: instance property of <code>[Layer](#Layer)</code>
**HTML Example**
```js
<Layer autoPosition={true}></Layer>
```
<a name="Layer+offset"></a>

### layer.offset : <code>String</code>
A string representing the offsets from the target element in the format
"[x-offset] [y-offset]", measured in pixels.

**Kind**: instance property of <code>[Layer](#Layer)</code>
**HTML Example**
```js
<Layer offset="0 2"></Layer>
```
<a name="Layer+content"></a>

### layer.content : <code>ReactElement</code>
HTML content to display in the layer. Will be aligned to the target according to
the `position` prop.

**Kind**: instance property of <code>[Layer](#Layer)</code>
**HTML Example**
```js
const myContent = (<div>Some content</div>);

ReactDOM.render(<Layer position="right middle" content={myContent}>
  <div>I'm the target!</div>
</Layer>, container);
```
<a name="Layer+onFlippedChange"></a>

### layer.onFlippedChange : <code>function</code>
Callback that is used to know when the `flipped` state of Layer changes. This
occurs when placing a Layered element in the requested position would cause Layer to be
rendered outside of the boundariesElement (usually viewport).

The callback will be passed an object with the following properties:
| Key       | Type    | Description                                                      |
| --------- | ------- | ---------------------------------------------------------------- |
| flipped   | boolean | whether the Layer has been moved away from its original position |
| actualPosition      | string  | the current position of the Layer ("top left", etc)    |
| originalPosition    | string | the position that Layer originally tried to position to |

**Kind**: instance property of <code>[Layer](#Layer)</code>
**HTML Example**
```js
const handleFlipChange = ({ flipped, actualPosition, originalPosition }) => { ... };

ReactDOM.render(<Layer position="right middle" onFlippedChange={handleFlipChange}>
  <div>I'm the target!</div>
</Layer>, container);
```