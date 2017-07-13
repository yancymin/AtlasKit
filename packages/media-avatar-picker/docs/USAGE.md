# @atlaskit/media-avatar-picker

Provides a set of components to resize, drag, select and export user avatars. It also includes a default list of 
predefined avatars.

## Installation

```sh
yarn add @atlaskit/media-avatar-picker
```

## Using the component

### AvatarPickerDialog

```
import {AvatarPickerDialog, Avatar} from '@atlaskit/media-avatar-picker';

const avatars: Array<Avatar> = [];

<AvatarPickerDialog avatars={avatars} />
```

### ImageCropper

```
import {ImageCropper} from '@atlaskit/media-avatar-picker';

<ImageCropper imageSource={'http://remote-url.jpg'} imageWidth={300} scale={0.08} top={-80} left={-80} onDragStarted={action('DragStarted')} />
```

### ImageNavigator

```
import {ImageNavigator} from '@atlaskit/media-avatar-picker';

const onLoad = (params) => {
  console.log(params.export());
};

<ImageNavigator imageSource={tallImage} onLoad={onLoad} />
```

### PredefinedAvatarList

```
import {Avatar, PredefinedAvatarList} from '@atlaskit/media-avatar-picker';

const avatars: Array<Avatar> = [];

<PredefinedAvatarList avatars={avatars} selectedAvatar={avatars[0]} />
```

### Slider

```
import {Slider} from '@atlaskit/media-avatar-picker';

<Slider value={20} min={0} max={100} onChange={action('onChange')} />
```
