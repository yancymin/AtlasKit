# Drag and Drop

![example.gif](https://dl.dropboxusercontent.com/s/4oy05eutn1jmzrm/example.gif)

The goal of this library is to create a beautiful drag and drop experience for lists. It provides highly performant physics based mouse and keyboard dragging without creating any wrapping DOM nodes.

## `DragDropContext`

In order to use drag and drop, you need to have the part of your react tree that you want to be able to use drag and drop in wrapped in a `DragDropContext`. It is advised to just wrap your entire application in a `DragDropContext`. Having nested `DragDropContext`'s is *not* supported. You will be able to achieve your desired conditional dragging and dropping using the props of `Droppable` and `Draggable`. You can think of `DragDropContext` as having a similar purpose to the [react-redux Provider component](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store)

### Prop type information

```js
type Hooks = {|
  onDragStart?: (id: DraggableId, location: DraggableLocation) => void,
  onDragEnd: (result: DropResult) => void,
|}

type Props = Hooks & {|
  children?: ReactElement,
|}
```

### Basic usage

```js
class App extends React.Component {
  onDragStart = () => {...}
  onDragEnd = () => {...}

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <div>Hello world</div>
      </DragDropContext>
    )
  }
}
```

### `Hook`s

These are top level application events that you can use to perform your own state updates.


### `onDragStart` (optional)

This function will get notified when a drag starts. You are provided with the following details:

- `id`: the id of the `Draggable` that is now dragging
- `location`: the location (`droppableId` and `index`) of where the dragging item has started within a `Droppable`.

This function is *optional* and therefore does not need to be provided. It is **highly recommended** that you use this function to block updates to all `Draggable` and `Droppable` components during a drag. (See *Best `hooks` practices*)

**Type information**

```js
onDragStart?: (id: DraggableId, location: DraggableLocation) => void

// supporting types
type Id = string;
type DroppableId: Id;
type DraggableId: Id;
type DraggableLocation = {|
  droppableId: DroppableId,
  // the position of the draggable within a droppable
  index: number
|};
```

### `onDragEnd` (required)

This function is *extremely* important and has an important role to play in the application lifecycle. **This function must result in the *synchronous* reordering of a list of `Draggables`**

It is provided with all the information about a drag:

### `result: DragResult`

- `result.draggableId`: the id of the `Draggable` was dragging.
- `result.source`: the location that the `Draggable` started in.
- `result.destination`: the location that the `Draggable` finished in. The `destination` will be `null` if the user dropped into no position (such as outside any list) *or* if they dropped the `Draggable` back into the same position that it started in.

### Synchronous reordering

Because this library does not control your state, it is up to you to *synchronously* reorder your lists based on the `result`.

*Here is what you need to do:*
- if the `destination` is `null`: all done!
- if `source.droppableId` equals `destination.droppableId` you need to remove the item from your list and insert it at the correct position.
- if `source.droppableId` does not equal `destination.droppable` you need to the `Draggable` from the `source.droppableId` list and [add it](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) into the correct position of the `destination.droppableId` list.

(links assume you store your ids in arrays)

### Type information

```js
onDragEnd: (result: DropResult) => void

// supporting types
type DropResult = {|
  draggableId: DraggableId,
  source: DraggableLocation,
  // may not have any destination (drag to nowhere)
  destination: ?DraggableLocation
|}

type Id = string;
type DroppableId: Id;
type DraggableId: Id;
type DraggableLocation = {|
  droppableId: DroppableId,
  // the position of the droppable within a droppable
  index: number
|};
```

### Best practices for `hooks`

**Block updates during a drag**

It is **highly** recommended that while a user is dragging that you block any state updates that might impact the amount of `Draggable`s and `Droppable`s, or their dimensions. Please listen to `onDragStart` and block updates to the `Draggable`s and `Droppable`s until you receive at `onDragEnd`.

When the user starts dragging we take a snapshot of all of the dimensions of the applicable `Draggable` and `Droppable` nodes. If these change during a drag we will not know about it.

Here are a few poor user experiences that can occur if you change things *during a drag*:

- If you increase the amount of nodes the library will not know about them and they will not be moved when the user would expect them to be.
- If you decrease the amount of nodes then there might be gaps and unexpected movements in your lists.
- If you change the dimensions of any node, it can cause the changed node as well as others to move at incorrect times.
- If you remove the node that the user is dragging the drag will instantly end
- If you change the dimension of the dragging node then other things will not move out of the way at the correct time.


**`onDragStart` and `onDragEnd` pairing**

We try very hard to ensure that each `onDragStart` event is paired with a single `onDragEnd` event. However, there maybe a rouge situation where this is not the case. If that occurs - it is a bug. Currently there is no mechanism to tell the library to cancel a current drag externally.

**Dynamic hooks**
Your *hook* functions will only be captured *once at start up*. Please do not change the function after that. If there is a valid use case for this then dynamic hooks could be supported. However, at this time it is not.


## `Droppable`

`Droppable` components can be **dropped on by a `Draggable`**. They also **contain** `Draggable`s. A `Draggable` must be contained within a `Droppable`.

```js
<Droppable
  droppableId="droppable-1"
  type="PERSON"
>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      style={{backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey'}}
    >
      I am a droppable!
    </div>
  )}
</Droppable>
```

### Props

- `droppableId`: A *required* `DroppableId(string)` that uniquely identifies the droppable for the application. Please do not change this prop - especially during a drag.
- `type`: An *optional* `TypeId(string)` that can be used to simply accept a class of `Draggable`. For example, if you use the type `PERSON` then it will only allow `Draggable`s of type `PERSON` to be dropped on itself. `Draggable`s of type `TASK` would not be able to be dropped on a `Droppable` with type `PERSON`. If no `type` is provided, it will be set to `'DEFAULT'`. Currently the `type` of the `Draggable`s within a `Droppable` **must be** the same. This restriction might be loosened in the future if there is a valid use case.
- `isDropDisabled`: An *optional* flag to control whether or not dropping is currently allowed on the `Droppable`. You can use this to implement your own conditional dropping logic. It will default to `false`.

### Children function

The React children of a `Droppable` must be a function that returns a `ReactElement`.

```js
<Droppable droppableId="droppable-1">
  {(provided, snapshot) => (
    // ...
  )}
</Droppable>
```

The function is provided with two arguments:

**1. provided: (Provided)**

```js
type Provided = {|
  innerRef: (HTMLElement) => mixed,
|}
```

In order for the droppable to function correctly, **you must** bind the `provided.innerRef` to the highest possible DOM node in the `ReactElement`. We do this in order to avoid needing to use `ReactDOM` to look up your DOM node.

```js
<Droppable droppableId="droppable-1">
  {(provided, snapshot) => (
    <div ref={provided.innerRef}>
      Good to go
    </div>
  )}
</Droppable>
```

**2. snapshot: (StateSnapshot)**

```js
type StateSnapshot = {|
  isDraggingOver: boolean,
|}
```

The `children` function is also provided with a small about of state relating to the current drag state. This can be optionally used to enhance your component. A common use case is changing the appearance of a `Droppable` while it is being dragged over.

```js
<Droppable droppableId="droppable-1">
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      style={{backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey'}}
    >
      I am a droppable!
    </div>
  )}
</Droppable>
```

### Conditionally dropping

> Keep in mind that this is not supported at this time. In this current initial version we only support reordering within a single list.

- `Droppable`s can only be dropped on by `Draggable`s who share the same `type`. This is a simple way of allowing conditional dropping. If you do not provide a `type` for the `Droppable` then it will only accept `Draggable`s which also have the default type. `Draggable`s and `Droppable`s both will have their `types` set to `'DEFAULT'` when none is provided. There is currently no way to set multiple `types`, or a `type` wildcard that will accept `Draggable`s of multiple any types. This could be added if there is a valid use case.
- Using the `isDropDisabled` prop you can conditionally allow dropping. This allows you to do arbitrarily complex conditional transitions. This will only be considered if the `type` of the `Droppable` matches the `type` of the currently dragging `Draggable`.
- You can disable dropping on a `Droppable` altogether by always setting `isDropDisabled` to false. You can do this to create a list that is never able to be dropped on, but contains `Draggable`s.
- Technically you do not need to use `type` and do all of your conditional drop logic with the `isDropDisabled` function. The `type` parameter is a convenient shortcut for a common use case.

## `Draggable`

`Draggable` components can be dragged around and dropped onto `Droppable`s. A `Draggable` must always be contained within a `Droppable`. It is **possible** to reorder a `Draggable` within its home `Droppable` or move to another `Droppable`. It is **possible** because a `Droppable` is free to control what it allows to be dropped on it.

> Note: moving between `Droppable` is currently not supported in the initial version.

```js
<Draggable
  draggableId="draggable-1"
  type="PERSON"
>
  {(provided, snapshot) => (
    <div
      ref={draggableProvided.innerRef}
      style={draggableProvided.draggableStyle}
      {...draggableProvided.dragHandleProps}
    >
      <h4>My draggable</h4>
    </div>
  )}
</Draggable>
```

### Props

- `draggableId`: A *required* `DraggableId(string)` that uniquely identifies the `Draggable` for the application. Please do not change this prop - especially during a drag.
- `type`: An *optional* type (`TypeId(string)`) of the `Draggable`. This is used to control what `Droppable`s the `Draggable` is permitted to drop on. `Draggable`s can only drop on `Droppable`s that share the same `type`. If no `type` is provided, it will be set to `'DEFAULT'`. Currently the `type` of a `Draggable` **must be** the same as its container `Droppable`. This restriction might be loosened in the future if there is a valid use case.
- `isDragDisabled`: An *optional* flag to control whether or not dropping is currently allowed on the `Droppable`. You can use this to implement your own conditional dropping logic. It will default to `false`.

### Children function

The React children of a `Draggable` must be a function that returns a `ReactElement`.

```js
<Draggable draggableId="draggable-1">
  {(provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        style={provided.draggableStyle}
        {...provided.dragHandleProps}
      >
        Drag me!
      </div>
      {provided.placeholder}
    </div>
  )}
</Draggable>
```

The function is provided with two arguments:

**1. provided: (Provided)**

```js
type Provided = {|
  innerRef: (HTMLElement) => void,
  draggableStyle: ?DraggableStyle,
  dragHandleProps: ?DragHandleProvided,
  placeholder: ?ReactElement,
|}
```

Everything within the *provided* object must be applied for the `Draggable` to function correctly.

- `provided.innerRef (innerRef: (HTMLElement) => void)`: In order for the `Droppable` to function correctly, **you must** bind the `innerRef` function to the `ReactElement` that you want to be considered the `Draggable` node. We do this in order to avoid needing to use `ReactDOM` to look up your DOM node.

```js
<Draggable draggableId="draggable-1">
  {(provided, snapshot) => (
    <div ref={provided.innerRef}>
      Drag me!
    </div>
  )}
</Draggable>
```

**Type information**

```js
innerRef: (HTMLElement) => void
```

- `provided.draggableStyle (?DraggableStyle)`: This is an `Object` or `null` that contains an a number of styles that needs to be applied to the `Draggable`. This needs to be applied to the same node that you apply `provided.innerRef` to. The controls the movement of the draggable when it is dragging and not dragging. You are welcome to add your own styles to this object - but please do not remove or replace any of the properties.

**Be careful with position:absolute**

*LTDR*: do not apply any `top`, `left`, `bottom`, `right` styles to the dragging element.

One of the styles of `provided.draggableStyle` is `position:absolute`. This intended position of the element is the original position. No `top`, `left`, `bottom`, `right` values are applied to enable this. Be careful that you are not applying one of these styles (`top`, `left`, `bottom`, `right`) to the element or its positioning will be broken. This is especially true if one of your parents has `position:relative` on it.

```js
<Draggable draggableId="draggable-1">
  {(provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        style={provided.draggableStyle}
      >
        Drag me!
      </div>
    </div>
  )}
</Draggable>
```

**Extending with your own styles**

```js
<Draggable draggable="draggable-1">
  {(provided, snapshot) => {
    const style = {
      ...provided.draggableStyle,
      backgroundColor: snapshot.isDragging : 'blue' : 'white',
      fontSize: 18,
    }
    return (
      <div>
        <div
          ref={provided.innerRef}
          style={style}
        >
          Drag me!
        </div>
      </div>
    );
  }}
</Draggable>
```

**Type information**

```js
type DraggableStyle = MovementStyle | (PlacementStyle & MovementStyle);

type PlacementStyle = {|
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: ZIndex,
  width: number,
  height: number,
|}

type MovementStyle = {|
  transform: string,
|}
```

- `provided.placeholder (?ReactElement)` The `Draggable` element has `position:absolute` applied to it while it is dragging. The role of the `placeholder` is to sit in the place that the `Draggable` was during a drag. It is needed to stop the `Droppable` list from collapsing when you drag. It is advised to render it as a sibling to the `Draggable` node.

```js
<Draggable draggableId="draggable-1">
  {(provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        style={provided.draggableStyle}
      >
        Drag me!
      </div>
      {/* Always render me - I will be null if not required */}
      {provided.placeholder}
    </div>
  )}
</Draggable>
```

- `provided.dragHandleProps (?DragHandleProps)` every `Draggable` has a *drag handle*. This is what is used to drag the whole `Draggable`. Often this will be the same as the node as the `Draggable`, but sometimes it can be a child of the `Draggable`. `DragHandleProps` need to be applied to the node that you want to be the drag handle. This is a number of props that need to be applied to the `Draggable` node. The simpliest approach is to spread the props onto the draggable node (`{...provided.dragHandleProps}`). However, you are also welcome to [monkey patch](https://davidwalsh.name/monkey-patching) these props if you also need to respond to them. DragHandleProps will be `null` when `isDragDisabled` is set to `true`.

**Type information**

```js
type DragHandleProps = {|
  onMouseDown: (event: MouseEvent) => void,
  onKeyDown: (event: KeyboardEvent) => void,
  onClick: (event: MouseEvent) => void,
  tabIndex: number,
  'aria-grabbed': boolean,
  draggable: boolean,
  onDragStart: () => void,
  onDrop: () => void
|}
```

**Standard example**

```js
<Draggable draggableId="draggable-1">
  {(provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        style={provided.draggableStyle}
        {...provided.dragHandleProps}
      >
        Drag me!
      </div>
      {provided.placeholder}
    </div>
  )}
</Draggable>
```

**Custom drag handle**

```js
<Draggable draggableId="draggable-1">
  {(provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        style={provided.draggableStyle}
      >
        <h2>Hello there</h2>
        <div {...provided.dragHandleProps}>
          Drag handle
        </div>
      </div>
      {provided.placeholder}
    </div>
  )}
</Draggable>
```

**Monkey patching**

> If you want to also use one of the props in `DragHandleProps`

```js
const myOnClick = (event) => console.log('clicked on', event.target);

<Draggable draggableId="draggable-1">
  {(provided, snapshot) => {
    const onClick = (() => {
      // dragHandleProps might be null
      if(!provided.dragHandleProps) {
        return myOnClick;
      }

      // creating a new onClick function that calls my onClick
      // event as well as the provided one.
      return (event) => {
        provided.dragHandleProps.onClick(event);
        // You may want to check if event.defaultPrevented
        // is true and optionally fire your handler
        myOnClick(event);
      }
    })();

    return (
      <div>
        <div
          ref={provided.innerRef}
          style={provided.draggableStyle}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          Drag me!
        </div>
        {provided.placeholder}
      </div>
    );
  }}
</Draggable>
```

**2. snapshot: (StateSnapshot)**

```js
type StateSnapshot = {|
  isDragging: boolean,
|}
```

The `children` function is also provided with a small about of state relating to the current drag state. This can be optionally used to enhance your component. A common use case is changing the appearance of a `Draggable` while it is being dragged.

```js
<Draggable draggableId="draggable-1">
  {(provided, snapshot) => {
    const style = {
      ...provided.draggableStyle,
      backgroundColor: snapshot.isDragging ? 'blue' : 'grey',
    };

    return (
      <div>
        <div
          ref={provided.innerRef}
          style={style}
          {...provided.dragHandleProps}
        >
          Drag me!
        </div>
        {provided.placeholder}
      </div>
    );
  }}
</Draggable>
```

### Sloppy clicks and click blocking

A drag will not start until a user has dragged their mouse past a small threshold. If this threshold is not exceeded then the library will not impact the mouse click and will release the event to the browser.

When a user presses the mouse down on an element, we cannot determine if the user was clicking or dragging. If the sloppy click threshold was not exceeded then the event will be treated as if it where a click and the click event will bubble up unmodified. If the user has started dragging by moving the mouse beyond the sloppy click threshold then the click event will be prevented. This behavior allows you to wrap an element that has click behavior such as an anchor and have it work just like a standard anchor while also allowing it to be dragged.

### Focus management

This library does not create any wrapper elements. This means that it will not impact the usage tab flow of a document. For example, if you are wrapping an *anchor* tag then the user will tab to the anchor directly and not an element surrounding the *anchor*. Whatever element you wrap will be given a `tab-index` to ensure that users can tab to the element to perform keyboard dragging.

## Engineering health

### Typed

This codebase is typed with [flowtype](flowtype.org) to promote greater internal consistency and more resilient code.

### Tested

This code base employs a number of different testing strategies including unit, performance and integration tests. Testing various aspects of the system helps to promote its quality and stability.

While code coverage is [not a guarantee of code health](https://stackoverflow.com/a/90021/1374236), it is a good indicator. This code base currently sits at **~95% coverage**.

### Performance

This codebase is designed to be extremely performant. It builds on prior investigations into React performance that you can read about [here](https://medium.com/@alexandereardon/performance-optimisations-for-react-applications-b453c597b191) and [here](https://medium.com/@alexandereardon/performance-optimisations-for-react-applications-round-2-2042e5c9af97). It is designed to perform the minimum number of renders required for each task.

## Keyboard handling

Currently the keyboard handling is hard coded. This could be changed in the future to become a prop of `Draggable`. Here is the existing keyboard mapping:

- **tab `↹`** - standard browser tabbing will navigate through the `Droppable`'s. The library does not do anything fancy with `tab` while users are selecting. Once a drag has started, `tab` is blocked for the duration of the drag.
- **spacebar ` `** - lift a focused `Draggable`. Also, drop a dragging `Draggable` where the drag was started with a `spacebar`.
- **Up arrow `↑`** - move a `Draggable` that is dragging up on a vertical list
- **Down arrow `↓`** - move a `Draggable` that is dragging down on a vertical list
- **Escape `esc`** - cancel an existing drag - regardless of whether the user is dragging with the keyboard or mouse.

### Short term backlog

- Correct scroll handling while dragging with keyboard or mouse
- Moving items between vertical lists (until this lands conditional dropping will not be available)

### Medium term backlog

- Dragging within a horizontal list
- Moving items between horizontal lists
- Moving a `Draggable` from a vertical list to a horizontal list
- Nesting

### Long term backlog

- Automatically disabling physics for a drag when the frame rate drops below a threshold. This can be because of low system resources, or when the are 100's of impacted items during a drag
- A mechanism to perform dragging without user input
- Dragging multiple items at a time
- And lots more!

## Author

Alex Reardon - areardon@atlassian.com