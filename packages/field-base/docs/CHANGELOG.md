# @atlaskit/field-base

## Unreleased

## 7.0.1 (2017-05-30)


* fix; field-base: fix alignment of warning icon ([3ea648f](https://bitbucket.org/atlassian/atlaskit/commits/3ea648f))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 6.0.0 (2017-05-25)


* fix; add onBlur and onStateless no-ops to example FieldStateless for stories ([0440540](https://bitbucket.org/atlassian/atlaskit/commits/0440540))


null refactor field-base to styled-components ([88defeb](https://bitbucket.org/atlassian/atlaskit/commits/88defeb))


* breaking; Named export \`FieldBase\` renamed to \`FieldBaseStateless\`, for consistency and clarity.

ISSUES CLOSED: #AK-2468

## 5.4.2 (2017-05-19)


* fix; fixed a typo in code and added a test ([cae6648](https://bitbucket.org/atlassian/atlaskit/commits/cae6648))

## 5.4.1 (2017-05-19)


* fix; handle possible onBlur-onFocus race conditions in field-base ([425b23f](https://bitbucket.org/atlassian/atlaskit/commits/425b23f))

## 5.4.0 (2017-05-10)


* fix; fixed warning icon size in field-base component ([47698ef](https://bitbucket.org/atlassian/atlaskit/commits/47698ef))
* fix; update dependencies ([c4b98eb](https://bitbucket.org/atlassian/atlaskit/commits/c4b98eb))


* feature; bump icon in emoji and field-base ([5f0a127](https://bitbucket.org/atlassian/atlaskit/commits/5f0a127))

## 5.3.4 (2017-05-06)


* fix; do not stretch non-textual content ([7066311](https://bitbucket.org/atlassian/atlaskit/commits/7066311))

## 5.3.3 (2017-05-04)


* fix; updating fieldbase label typography and ensuring spacing is on grid ([9bb9af6](https://bitbucket.org/atlassian/atlaskit/commits/9bb9af6))

## 5.3.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 5.3.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 5.3.0 (2017-04-20)


* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 5.2.0 (2017-04-18)

## 5.1.1 (2017-04-13)


* fix; update field-base stories to use new readme component ([b98df36](https://bitbucket.org/atlassian/atlaskit/commits/b98df36))


* feature; flip the warning dialog to the top if there is no space on the right ([73d28f9](https://bitbucket.org/atlassian/atlaskit/commits/73d28f9))

## 5.1.0 (2017-03-28)


* fix; clicking the warning icon when there is no warning message should focus the field ([6012cbd](https://bitbucket.org/atlassian/atlaskit/commits/6012cbd))
* fix; fix field-base being unable to wrap long text with no whitespace ([0ec4cf5](https://bitbucket.org/atlassian/atlaskit/commits/0ec4cf5))


* feature; add onDialogClick property ([df790ab](https://bitbucket.org/atlassian/atlaskit/commits/df790ab))
* feature; open the dialog whenever the field is focused, and close when the dialog and field ([bc1a70b](https://bitbucket.org/atlassian/atlaskit/commits/bc1a70b))

## 5.0.1 (2017-03-21)

## 5.0.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 5.0.0 (2017-03-07)


* fix; the isFitContainerWidthEnabled prop now correctly causes the field to fit the contai ([68ac90a](https://bitbucket.org/atlassian/atlaskit/commits/68ac90a))


* feature; replace onIconClick with onIconMouseDown, update smart component isFocused prop to ([ac909b0](https://bitbucket.org/atlassian/atlaskit/commits/ac909b0))


* breaking; Replaced onIconClick with onIconMouseDown. | Renamed smart FieldBase isFocused prop to
defaultIsFocused

## 4.1.0 (2017-03-06)


* feature; implement warning dialog for field base ([c131133](https://bitbucket.org/atlassian/atlaskit/commits/c131133))

## 4.0.0 (2017-03-03)


* feature; don't show warning icon when the field is disabled ([c7f89be](https://bitbucket.org/atlassian/atlaskit/commits/c7f89be))


* breaking; Warning icon is no longer shown when the field is disabled

ISSUES CLOSED: AK-1858

## 3.0.1 (2017-03-01)


* fix; fix incorrect height for compact subtle field base ([97e0030](https://bitbucket.org/atlassian/atlaskit/commits/97e0030))

## 3.0.0 (2017-03-01)

## 2.1.6 (2017-02-28)


* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 2.1.4 (2017-02-28)


* fix; dummy commit to fix broken stories and missing registry pages ([a31e92a](https://bitbucket.org/atlassian/atlaskit/commits/a31e92a))


* feature; remove compact appearance, replacing it with the isCompact boolean prop ([1156877](https://bitbucket.org/atlassian/atlaskit/commits/1156877))


* breaking; Removed compact appearance, added isCompact property

ISSUES CLOSED: AK-1825

## 2.1.4 (2017-02-28)


* fix; dummy commit to release stories for components ([a105c02](https://bitbucket.org/atlassian/atlaskit/commits/a105c02))

## 2.1.3 (2017-02-28)


* fix; Removes jsdocs annoations and moves them to usage.md ([2e6f725](https://bitbucket.org/atlassian/atlaskit/commits/2e6f725))

## 2.1.2 (2017-02-27)


* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))

## 2.1.1 (2017-02-24)


* fix; changed hasSpinner to isLoading in field base ([aad6d77](https://bitbucket.org/atlassian/atlaskit/commits/aad6d77))
* fix; fixes AK-1789 adds a hasSpinner to field-base + inline-edit update to use it ([32de1d0](https://bitbucket.org/atlassian/atlaskit/commits/32de1d0))

## 2.1.0 (2017-02-23)

## 2.0.5 (2017-02-20)


* fix; use correctly scoped package names in npm docs ([500fdf8](https://bitbucket.org/atlassian/atlaskit/commits/500fdf8))


* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))

## 2.0.4 (2017-02-19)


* Include typscript definition for [@atlaskit](https://github.com/atlaskit)/field-base ([09e5343](https://bitbucket.org/atlassian/atlaskit/commits/09e5343))

## 2.0.3 (2017-02-16)


* fix; fixes a bug when inline-edit switch to read view programatically ([3a93e51](https://bitbucket.org/atlassian/atlaskit/commits/3a93e51))

## 2.0.2 (2017-02-09)


* fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))

## 2.0.1 (2017-02-08)


* fix; fix 'jumping' of the invalid state ([aeda4bf](https://bitbucket.org/atlassian/atlaskit/commits/aeda4bf))

## 2.0.0 (2017-02-07)

## 1.0.4 (2017-02-06)


* fix; fix onFocus and onBlur handlers ([c3c2314](https://bitbucket.org/atlassian/atlaskit/commits/c3c2314))


* feature; type and isFirstChild props were added to the Label sub-component ([4379ebb](https://bitbucket.org/atlassian/atlaskit/commits/4379ebb))


* breaking; label now has 'type' prop with 'form' value by default. For the 'old' design (which

is only used in the inline edit component) type should be set to 'inline-edit' value.

## 1.0.3 (2017-02-06)


* fix; fix the jumping when focused ([5412538](https://bitbucket.org/atlassian/atlaskit/commits/5412538))
