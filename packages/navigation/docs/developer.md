# Navigation

Welcome! This package contains the glorious `Navigation` related packages.

A few things to note when developing for `Navigation`:

## Feature lead

Alex Reardon <areardon@atlassian.com> is the feature lead of Navigation.


## Changes

- Please reach out before submitting a pull request; ideally even before you start your development.
- Add Alex Reardon to all pull requests
- All pull requests must have appropriate tests
- There will be no data layer code within navigation. If you need a data layer, please create a seperate package.

## Issues

All pull requests should have an associated issue in the [AtlasKit project](https://ecosystem.atlassian.net/browse/AK). Please ensure that you give the correct *issue type* and *priority*.

*Simple guide for issue types*

- bug: something is broken
- new feature: something you would like added
- improvement: optimisation, cleanup or simplification

*Simple guide for priority*

- blocker: broken **core** *functionality* or **extreme** *visual issue* with no workaround
- critical:
- major:
- minor: small visual issue. no impact on functionality
- trival: nitpick

## Avoid importing from `@atlaskit/util-shared-styles`

For basically everything you want to be importing from `shared-variables.js`. Even if we import from `@atlaskit/util-shared-styles` and then directly export it. This reduces the number of 'source of truth' files.

## Colours
If you are using a colour directly from `@atlaskit/util-shared-styles` you are doing the wrong thing. All colours should either be included from

1. All colours in are controlled by the theme:

```js
import styled from 'styled-components';
import { getProvided } from '../../theme/util';

export const styled.div`
  border-top: 1px solid ${({ theme }) => getProvided(theme).keyline};
`;
```

You can find the preset colours in `theme/presets.js`.

2. If the colour is not controlled by theme (which should be almost nothing) then it should be imported from `shared-variables.js`

```js
import { unthemedColors } from './shared-variables';

// do stuff
```

## Testing
A few notes:

- All new tests should be written in `test/unit`.
- Most of the components are theme aware. Please use the testing utilities in `test/theme-util.js` to ensure your tests will work correctly with the theme.