This package provides you with the ADG colors & typography in a programmatic way.


You can either use the less files by importing them via

```less
@import '~@atlaskit/util-shared-styles/src/colors.less';
@import '~@atlaskit/util-shared-styles/src/fonts.less';

.myclass {
  color: @ak-color-R100;
  font-family: @ak-font-family;
}
```

or use them within JS via

```js
import {
  akColorN500 as defaultColor,
  akColorR500 as highlightColor,
  akFontFamily as fontFamily,
} from '@atlaskit/util-shared-styles';
```
