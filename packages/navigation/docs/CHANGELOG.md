# @atlaskit/navigation

## Unreleased

## 15.4.0 (2017-07-12)


* feature; Quick Search: polish pseduo-selection handling.  Switch ([7602f61](https://bitbucket.org/atlassian/atlaskit/commits/7602f61))

## 15.3.1 (2017-07-12)


* fix; fix action for AkNavigationItem to avoid covering the item when one has a long text ([2e0433e](https://bitbucket.org/atlassian/atlaskit/commits/2e0433e))

## 15.3.0 (2017-07-10)


* feature; escape closes drawers ([586bc06](https://bitbucket.org/atlassian/atlaskit/commits/586bc06))

## 15.2.1 (2017-07-06)


* fix; primary global navigation items stay visible when collapsed with many container item ([8f1093e](https://bitbucket.org/atlassian/atlaskit/commits/8f1093e))

## 15.2.0 (2017-07-06)


* feature; reducing contrast for global nav text to help with the blue sensitivity ([bf3cd88](https://bitbucket.org/atlassian/atlaskit/commits/bf3cd88))

## 15.1.0 (2017-07-05)


* fix; navigation broke due to gridsize not being exported ([3b181d1](https://bitbucket.org/atlassian/atlaskit/commits/3b181d1))


* feature; searchResults: Remove isRequired option on result group title prop ([0722213](https://bitbucket.org/atlassian/atlaskit/commits/0722213))

## 15.0.1 (2017-06-30)

## 15.0.0 (2017-06-28)


* fix; refactor drawers to be clearer on how they share code ([3b4c3d3](https://bitbucket.org/atlassian/atlaskit/commits/3b4c3d3))


* feature; added KB shortcuts for traversal and submission ([becc8ae](https://bitbucket.org/atlassian/atlaskit/commits/becc8ae))

## 14.0.4 (2017-06-26)


* fix; refactor nested navigation ([99e9607](https://bitbucket.org/atlassian/atlaskit/commits/99e9607))


* breaking; Significantly changes nested navigation API. We now interface with nested nav via a 'stack' prop
rather than children. See stories for usage examples

ISSUES CLOSED: AK-2596, AK-2439

## 14.0.3 (2017-06-25)

## 14.0.2 (2017-06-23)

## 14.0.1 (2017-06-23)


* fix; do not re-render navigation on scrolling ([5abad3d](https://bitbucket.org/atlassian/atlaskit/commits/5abad3d))
* fix; made ContainerNavigationChildren to use display: flex to be able to accept full-heig ([780a79b](https://bitbucket.org/atlassian/atlaskit/commits/780a79b))
* fix; navigation sub-components fall back to container theme if used outside Navigation co ([1f01ff2](https://bitbucket.org/atlassian/atlaskit/commits/1f01ff2))
* fix; searchResults hides empty result groups ([26c7601](https://bitbucket.org/atlassian/atlaskit/commits/26c7601))

## 14.0.0 (2017-06-20)

## 13.4.3 (2017-06-20)


* fix; fix right padding of image in ak nav in IE11 ([b0e3c5f](https://bitbucket.org/atlassian/atlaskit/commits/b0e3c5f))

## 13.4.2 (2017-06-19)


* feature; global secondary items are now visible when the navigation is collapsed ([ccd6ea7](https://bitbucket.org/atlassian/atlaskit/commits/ccd6ea7))


* breaking; The ContainerNavigation.showGlobalPrimaryActions prop has been renamed to
ContainerNavigation.showGlobalActions. This is only a breaking change if you are explicitly
rendering ContainerNavigation via the named export. If you are using the default Navigation export
only, this is not a breaking change for you.

ISSUES CLOSED: AK-2591

## 13.4.1 (2017-06-19)


* fix; removing data-__ak-navigation-container-closed as a way of controlling collapsed sty ([0086e41](https://bitbucket.org/atlassian/atlaskit/commits/0086e41))
* fix; add missing example for logged out navigation with icon ([54c829e](https://bitbucket.org/atlassian/atlaskit/commits/54c829e))

## 13.4.0 (2017-06-16)


* fix; added prop defaults.  Fixed propType definitions ([c024d9b](https://bitbucket.org/atlassian/atlaskit/commits/c024d9b))
* fix; align contain nav item actions vertically center ([3837f60](https://bitbucket.org/atlassian/atlaskit/commits/3837f60))
* fix; update Navigation icon dependency to [@atlaskit](https://github.com/atlaskit)/icon[@7](https://github.com/7).0.0 ([db382d6](https://bitbucket.org/atlassian/atlaskit/commits/db382d6))


* feature; create basic quick search component ([6ea5bda](https://bitbucket.org/atlassian/atlaskit/commits/6ea5bda))

## 13.3.0 (2017-06-09)

## 13.2.0 (2017-06-08)


* feature; create SearchResults component ([dff52fc](https://bitbucket.org/atlassian/atlaskit/commits/dff52fc))
* feature; hide the navigation collapsing indicator when the navigation is not collapsible ([b025095](https://bitbucket.org/atlassian/atlaskit/commits/b025095))

## 13.1.3 (2017-06-08)


* fix; fix issue where NavigationItem would flash when props changed ([290db4a](https://bitbucket.org/atlassian/atlaskit/commits/290db4a))

## 13.1.2 (2017-06-07)


* fix; fix alignment of theme stories to avoid content cutoff on small screens ([eca0d02](https://bitbucket.org/atlassian/atlaskit/commits/eca0d02))

## 13.1.1 (2017-06-07)


* fix; fix bug where container nav couldn't get the right colours when behaving as global ([d72779f](https://bitbucket.org/atlassian/atlaskit/commits/d72779f))

## 13.1.0 (2017-06-06)


* fix; only show blue resize button when resize bar is hovered ([cc96f74](https://bitbucket.org/atlassian/atlaskit/commits/cc96f74))

## 13.0.4 (2017-06-05)


* fix; address PR comments ([c885f2c](https://bitbucket.org/atlassian/atlaskit/commits/c885f2c))
* fix; fixed propType bug ([d88a7cd](https://bitbucket.org/atlassian/atlaskit/commits/d88a7cd))
* fix; removed unnecessary styles from Nav storybook fixture ([01e63bb](https://bitbucket.org/atlassian/atlaskit/commits/01e63bb))


* feature; add default prop for isLoading ([7d80fbb](https://bitbucket.org/atlassian/atlaskit/commits/7d80fbb))
* feature; add isLoading prop to Search ([a57579c](https://bitbucket.org/atlassian/atlaskit/commits/a57579c))

## 13.0.3 (2017-06-05)

## 13.0.2 (2017-06-02)


* fix; fix style issued caused by missing semicolons in styled-components ([8700817](https://bitbucket.org/atlassian/atlaskit/commits/8700817))

## 13.0.1 (2017-06-02)


* fix; navigation now works correctly with latest 2-colour icons ([6b779b8](https://bitbucket.org/atlassian/atlaskit/commits/6b779b8))
* fix; removed clearIcon prop from Search ([02b9363](https://bitbucket.org/atlassian/atlaskit/commits/02b9363))
* fix; updating icon names in Nav tests ([eb6410d](https://bitbucket.org/atlassian/atlaskit/commits/eb6410d))

## 13.0.0 (2017-06-02)


* fix; explicity calling truncate in ContainerTitleText and SubText ([be2d172](https://bitbucket.org/atlassian/atlaskit/commits/be2d172))
* fix; removing breaking whitespace in ContainerTitle ([9798191](https://bitbucket.org/atlassian/atlaskit/commits/9798191))


* feature; accept custom global themes via theme prop ([b863e68](https://bitbucket.org/atlassian/atlaskit/commits/b863e68))
* feature; add createGlobalTheme named export function ([fef8715](https://bitbucket.org/atlassian/atlaskit/commits/fef8715))


* breaking; The 'appearance' prop previously accepted by Navigation/GlobalNavigation/ContainerNavigation has
been removed. The same functionality can be achieved with the the new 'theme' prop supported by the
same components. This new 'theme' prop accepts a theme object. Common theme objects can be accessed
via the new 'presetThemes' named export. Alternatively, you can generate your own theme object (only
to be passed to Navigation.globalTheme or GlobalNavigation.theme) with the new createGlobalTheme
named export - see storybook for usage examples.

ISSUES CLOSED: AK-2434

## 12.2.1 (2017-05-31)

## 12.2.0 (2017-05-30)


* fix; fixing focus styles for navigation items ([f992f96](https://bitbucket.org/atlassian/atlaskit/commits/f992f96))


* feature; show a split back button in nested container navigation ([f26c123](https://bitbucket.org/atlassian/atlaskit/commits/f26c123))

## 12.1.0 (2017-05-30)


* feature; add caption prop to navigation item ([746368e](https://bitbucket.org/atlassian/atlaskit/commits/746368e))

## 12.0.0 (2017-05-30)

## 11.0.2 (2017-05-30)


* fix; fixing padding on collapsed navigation items ([4c24e6b](https://bitbucket.org/atlassian/atlaskit/commits/4c24e6b))


* feature; all colours in navigation are now based on themes ([971ae1a](https://bitbucket.org/atlassian/atlaskit/commits/971ae1a))


* breaking; This change is a breaking change because it involves: 1. making the appearance prop on some children
of ContainerNavigation and GlobalNavigation unused which can have unexpected consequences if you
where doing strange things with appearance props. 2. A context dependency is introduced in
components that previously did not have context dependencies. If you are using Navigation components
within Navigation then everything should be fine. However, if you are using them outside of
Navigation there will now be a dependency on theme in the context. Tooling for this use case has not
been created because it is not the designed us case.

ISSUES CLOSED: AK-2433 AK-2483

## 11.0.1 (2017-05-29)

## 11.0.0 (2017-05-29)

## 10.3.0 (2017-05-29)


* fix; temporary fix for the broken layered components inside navigation ([79a7811](https://bitbucket.org/atlassian/atlaskit/commits/79a7811))


* feature; removing nested back button api ([05f429f](https://bitbucket.org/atlassian/atlaskit/commits/05f429f))


* breaking; Removing nested back button api

## 10.2.3 (2017-05-26)

## 10.2.2 (2017-05-26)


* fix; fixing the zindex of the drawer blanket ([f9a2e08](https://bitbucket.org/atlassian/atlaskit/commits/f9a2e08))
* fix; opening secondary dropdowns from global nav no longer breaks in Safari ([8492cd1](https://bitbucket.org/atlassian/atlaskit/commits/8492cd1))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))
* fix; pin react-lorem-component version to avoid newly released broken version ([6f3d9c6](https://bitbucket.org/atlassian/atlaskit/commits/6f3d9c6))

## 10.2.1 (2017-05-25)


* fix; cleaning up how Navigation does positioning ([0c330fa](https://bitbucket.org/atlassian/atlaskit/commits/0c330fa))
* fix; increase NavigationItem horizontal spacing by 4px to match designs ([e04b0f9](https://bitbucket.org/atlassian/atlaskit/commits/e04b0f9))
* fix; fixed positioning of nav in stories across all browsers ([8d1751b](https://bitbucket.org/atlassian/atlaskit/commits/8d1751b))

## 10.2.0 (2017-05-22)


* feature; improved styles for full-width drawers in prep for use as focused tasks. ([b99264c](https://bitbucket.org/atlassian/atlaskit/commits/b99264c))

## 10.1.2 (2017-05-18)


* fix; fixing top vertical spacing in drawers ([191ba9e](https://bitbucket.org/atlassian/atlaskit/commits/191ba9e))


* feature; show a split back button in nested container navigation ([979f010](https://bitbucket.org/atlassian/atlaskit/commits/979f010))

## 10.1.1 (2017-05-11)


* fix; define Drawers bottom css property ([30bafad](https://bitbucket.org/atlassian/atlaskit/commits/30bafad))

## 10.1.0 (2017-05-10)


* fix; fixing indentation of the NavigationItemGroupHeader. Also fixing the compact-items s ([b26a5f8](https://bitbucket.org/atlassian/atlaskit/commits/b26a5f8))


* feature; adding improved keyboard handling to the search text input ([db84ac6](https://bitbucket.org/atlassian/atlaskit/commits/db84ac6))

## 10.0.0 (2017-05-10)


* feature; stop rendering elements that are not visible. Simplify and centralise the logic con ([48e8858](https://bitbucket.org/atlassian/atlaskit/commits/48e8858))


* breaking; Nested components are now only mounted when visible. Prop changes to ContainerNavigation.

ISSUES CLOSED: AK-2151

## 9.3.1 (2017-05-08)


* fix; bumping dependency version of memoize-one to avoid flow errors ([fb61e1c](https://bitbucket.org/atlassian/atlaskit/commits/fb61e1c))

## 9.3.0 (2017-05-05)


* fix; added hover style + refactored styled components ([e68a999](https://bitbucket.org/atlassian/atlaskit/commits/e68a999))
* fix; fixed Navigation storybook in Edge ([215dc6c](https://bitbucket.org/atlassian/atlaskit/commits/215dc6c))

## 9.2.1 (2017-05-04)


* fix; fixed color and alignment of NavigationItemGroupTitle ([3d6ea84](https://bitbucket.org/atlassian/atlaskit/commits/3d6ea84))
* fix; fixed navigation stories breaking with global theme. ([d1e76e0](https://bitbucket.org/atlassian/atlaskit/commits/d1e76e0))


* feature; navigation item as dropdown trigger ([ab6a046](https://bitbucket.org/atlassian/atlaskit/commits/ab6a046))

## 9.2.0 (2017-05-03)


* feature; disable spell checking for SearchInput text field ([5056f1c](https://bitbucket.org/atlassian/atlaskit/commits/5056f1c))

## 9.1.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 9.1.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 9.1.0 (2017-04-23)

## 9.0.0 (2017-04-20)

## 8.1.0 (2017-04-20)


* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 8.0.3 (2017-04-18)


* fix; fix subtext overflow problem in the ContainerItem ([fafc1e9](https://bitbucket.org/atlassian/atlaskit/commits/fafc1e9))
* fix; fix to work with IE11, removed fixed drawer items completely ([b550fe7](https://bitbucket.org/atlassian/atlaskit/commits/b550fe7))

## 8.0.2 (2017-04-10)


* fix; temporary fix for the positioning problem ([bfae468](https://bitbucket.org/atlassian/atlaskit/commits/bfae468))


null refactor NavigationItemGroup to use Styled Components ([8e7fc9e](https://bitbucket.org/atlassian/atlaskit/commits/8e7fc9e))


* feature; a ContainerHeader will now be fixed at the top of Container ([fda2c1f](https://bitbucket.org/atlassian/atlaskit/commits/fda2c1f))
* feature; refactor DrawerTrigger to styled component ([b9b8db0](https://bitbucket.org/atlassian/atlaskit/commits/b9b8db0))


null improving the performance of scroll-top-watcher and addding tests ([8fe4810](https://bitbucket.org/atlassian/atlaskit/commits/8fe4810))


* breaking; Removed the appearance prop from NavigationItemGroup

## 8.0.1 (2017-03-31)


* fix; fix drawer back button size after styled components conversion ([35137ae](https://bitbucket.org/atlassian/atlaskit/commits/35137ae))
* fix; interaction between open / collapsible / width properties of nav bar. ([cdca131](https://bitbucket.org/atlassian/atlaskit/commits/cdca131))
* fix; refactor ContainerLogo to use styled components ([2240a7d](https://bitbucket.org/atlassian/atlaskit/commits/2240a7d))


null convert ContainerNavigation to styled components, convert ContainerTitle to sty ([0b89e1c](https://bitbucket.org/atlassian/atlaskit/commits/0b89e1c))
null refactor NavigationItem to use context to determine appearance. Removed Navigat ([59e253e](https://bitbucket.org/atlassian/atlaskit/commits/59e253e))
null refactor NavigationItem to used Styled Components, delete ContainerItem / Drawer ([87600ca](https://bitbucket.org/atlassian/atlaskit/commits/87600ca))


* feature; add isCompact to NavigationItemGroup ([9c95f89](https://bitbucket.org/atlassian/atlaskit/commits/9c95f89))
* feature; add settings appearance support for NavigationItem ([67deb23](https://bitbucket.org/atlassian/atlaskit/commits/67deb23))
* feature; refactor GlobalItem to use StyledComponents ([232207d](https://bitbucket.org/atlassian/atlaskit/commits/232207d))


* breaking; GlobalItems no longer have isSelected (no longer part of the design spec). GlobalItems appearance is
now inherited from the GlobalNavigation (or the ContainerNavigation for the pop through items)
* breaking; ContainerTitle no longer as an appearance prop - use ContainerNavigation's appearance prop instead.
* breaking; NavigationItem no long has the isCompact prop - it was moved to NavigationItemGroup
* breaking; Removed NavigationItem.isCompact and replaced it ContainerNavigation.isCompact. NavigationItem

appearance is inherited from ContainerNavigation appearance. NavigationItem will also inherit the

Drawer appearance when it is placed in a Drawer. Global and Settings appearances will go on the

ContainerNavigation
* breaking; DrawerItem and ContainerItem have been deleted - use NavigationItem instead. It has the same API,

but will use its context for theming

## 8.0.0 (2017-03-24)


* feature; removed globalAccountItem and globalHelpItem. Added globalSecondaryActions. ([a600012](https://bitbucket.org/atlassian/atlaskit/commits/a600012))


* breaking; This release allows you to provide your own secondary actions for the global sidebar. The props of

globalAccountItem (React.PropTypes.node) and globalHelpItem (React.PropTypes.node) on Navigation

have been replaced with globalSecondaryActions (React.PropTypes.arrayOf(React.PropsTypes.node)).

This allows consumers to provide more than the default account item and help item. Navigation

currently supports a maximum of four secondary actions. The api change allows increased flexibility.

However, please consult the ADG for design rules around the content of these slots.

ISSUES CLOSED: AK-1681

## 7.3.0 (2017-03-23)


* fix; fix the container title overflow ([9a2b415](https://bitbucket.org/atlassian/atlaskit/commits/9a2b415))
* fix; fix undefined var in story ([686c390](https://bitbucket.org/atlassian/atlaskit/commits/686c390))


* feature; add appearance="global" and appearance="settings" to ContainerTitle ([eeecfcc](https://bitbucket.org/atlassian/atlaskit/commits/eeecfcc))

## 7.2.0 (2017-03-22)


* feature; nEXT-1786: Use default prop for settings sidebar appearance ([5160d02](https://bitbucket.org/atlassian/atlaskit/commits/5160d02))

## 7.1.3 (2017-03-22)

## 7.1.3 (2017-03-22)

## 7.1.1 (2017-03-21)

## 7.1.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 7.1.0 (2017-03-21)


* feature; adding subtitle support to ContainerTitle ([585c450](https://bitbucket.org/atlassian/atlaskit/commits/585c450))
* feature; nEXT-1786: Rename settings appearance CSS class ([af19fc4](https://bitbucket.org/atlassian/atlaskit/commits/af19fc4))
* feature; nEXT-1786: Update project settings appearance property name ([b850e1d](https://bitbucket.org/atlassian/atlaskit/commits/b850e1d))

## 7.0.0 (2017-03-21)


* fix; small typo fix in hasSeparator description ([3fbafac](https://bitbucket.org/atlassian/atlaskit/commits/3fbafac))

## 6.0.0 (2017-03-21)


null change the width of Navigation from 284px to 304px ([e433432](https://bitbucket.org/atlassian/atlaskit/commits/e433432))


* feature; fix a11y for the new resizer, change div els to nav els in GlobalNavigation and Con ([97114f0](https://bitbucket.org/atlassian/atlaskit/commits/97114f0))
* feature; add a story for the standalone drawer use case ([b7df251](https://bitbucket.org/atlassian/atlaskit/commits/b7df251))


* breaking; Increased the total width of Navigation in the isOpen state from 284px to 304px. Increased the width

of ContainerNavigation from 220px to 304px. It is possible that this will not require any code

changes, it will change the default open state width though, and the widths to which the Navigation

will snap open

## 5.1.2 (2017-03-14)

## 5.1.2 (2017-03-14)

## 5.1.1 (2017-03-14)


* fix; change spacing according to specs ([adbe4b2](https://bitbucket.org/atlassian/atlaskit/commits/adbe4b2))


* feature; add full width Drawers to Navigation ([b6d9a98](https://bitbucket.org/atlassian/atlaskit/commits/b6d9a98))
* feature; change Navigation width from 220px to 240px ([0a5f222](https://bitbucket.org/atlassian/atlaskit/commits/0a5f222))
* feature; nEXT-1786: Add dark blue (settings) appearance for navigation sidebar ([dd05c63](https://bitbucket.org/atlassian/atlaskit/commits/dd05c63))


* breaking; SearchDrawer.isWide / CreateDrawer.isWide has been removed. If you need a drawer

with custom width, please use a CustomDrawer, but for Search and Create purposes, use the

corresponding drawers.

ISSUES CLOSED: fixes AK-1633

## 5.1.0 (2017-03-08)


* fix; alignment fixes for the GlobalNavigation and ContainerNavigation ([3e745f1](https://bitbucket.org/atlassian/atlaskit/commits/3e745f1))
* fix; fix ContainerItem icon sizing and Drawer z-index in IE11 ([48600bd](https://bitbucket.org/atlassian/atlaskit/commits/48600bd))


* feature; add a separator line to the ContainerItemGroup ([4bfab26](https://bitbucket.org/atlassian/atlaskit/commits/4bfab26))

## 5.0.0 (2017-03-06)


* fix; fix the displayName for SearchDrawer ([cb785e6](https://bitbucket.org/atlassian/atlaskit/commits/cb785e6))


* feature; change the offsets of the Drawers so that DrawerItems are adjacent to the create / ([f11c600](https://bitbucket.org/atlassian/atlaskit/commits/f11c600))


* breaking; SearchDrawer and CreateDrawer no longer need vertical offsets and padding. They should have the

correct padding already, as the items are automatically offset.

ISSUES CLOSED: AK-549

## 4.1.2 (2017-03-06)

## 4.1.2 (2017-03-06)

## 4.1.1 (2017-03-03)


* fix; ensuring animation takes into account container padding ([c08f3be](https://bitbucket.org/atlassian/atlaskit/commits/c08f3be))
* fix; upgrade Drawer's dependancy on Blanket to version 1.2.0 ([9f64f0a](https://bitbucket.org/atlassian/atlaskit/commits/9f64f0a))

## 4.1.0 (2017-03-01)


* feature; added onAnimationEnd prop to nested nav component ([7074c2a](https://bitbucket.org/atlassian/atlaskit/commits/7074c2a))

## 4.0.0 (2017-02-27)


* feature; Allow extension of Drawers, and the ability to add custom drawers ([3f96753](https://bitbucket.org/atlassian/atlaskit/commits/3f96753))


* breaking; The way that Navigation's Drawers (search and create) work were refactored to allow more control over the Drawer's behaviours. See the documentation for more detail around how to specify custom Drawers.

* AkDrawer is now exported for use in Navigation. This is now API
* Navigation.drawers has been added – you can now specify an array of Drawers for use in Navigation:

```
<AkNavigation
    drawers={[
        <AkDrawer><p>Search</p></AkDrawer>,
        <AkDrawer isOpen><p>Create</p></AkDrawer>,
    ]}
/>
```

* The following props have been removed from Navigation
    - Navigation.createDrawerContent, Navigation.searchDrawerContent
        Use <AkDrawer>{content}</AkDrawer> instead
    - Navigation.drawerBackIcon
        Use AkDrawer.backIcon instead
    - Navigation.hasBlanket
        Blankets now come with AkDrawer, and are not optional
    - Navigation.isCreateDrawerOpen, Navigation.isSearchDrawerOpen
        Use AkDrawer.isOpen instead
    - Navigation.onBlanketClicked
        Use AkDrawer.onBlanketClicked instead [TODO]
    - Navigation.onCreateDrawerClose, Navigation.onSearchDrawerClose
        Use AkDrawer.onBackButton instead

## 3.1.5 (2017-02-20)


* fix; use correctly scoped package names in npm docs ([91dbd2f](https://bitbucket.org/atlassian/atlaskit/commits/91dbd2f))

## 3.1.4 (2017-02-16)

## 3.1.2 (2017-02-14)

## 3.1.2 (2017-02-14)


* Update editor-core test: add jQuery for feedback ([dd7e181](https://bitbucket.org/atlassian/atlaskit/commits/dd7e181))

## 3.1.1 (2017-02-13)


* fix invalid proptype "href", should be "string ([ab921fc](https://bitbucket.org/atlassian/atlaskit/commits/ab921fc))

## 3.1.0 (2017-02-13)


* add onResizeStart prop to AkNavigation ([acef2b6](https://bitbucket.org/atlassian/atlaskit/commits/acef2b6))

## 3.0.0 (2017-02-10)


* fix; refactor stories to use // rather than http:// ([a0826cf](https://bitbucket.org/atlassian/atlaskit/commits/a0826cf))

## 2.1.0 (2017-02-10)


null Change the behaviour of the onResize handler's arguments ([dc36c8a](https://bitbucket.org/atlassian/atlaskit/commits/dc36c8a))


* feature; add onClick to ContainerItems and DrawerItems ([47ef862](https://bitbucket.org/atlassian/atlaskit/commits/47ef862))
* feature; Page now has props for navigation and banner and positions them accordingly ([f7fc87a](https://bitbucket.org/atlassian/atlaskit/commits/f7fc87a))


* breaking; Changed the arguments given to onResize so that width is always available as a

parameter. Also remove the 50px window of snapping to close down to 284px.
* breaking; navigation no longer explicitly 100vh in height. It gets the height from the page

slot instead.

## 2.0.1 (2017-02-07)


* fix; Fixes naviation deps to point to logo 2.0.0 ([3d738c2](https://bitbucket.org/atlassian/atlaskit/commits/3d738c2))

## 2.0.0 (2017-02-06)


* fix; layer navigation at correct level so it works with modal ([5bef9db](https://bitbucket.org/atlassian/atlaskit/commits/5bef9db))

## 1.2.2 (2017-02-03)


* feature; Merge from master. Fix import for ContainerHeader ([af41160](https://bitbucket.org/atlassian/atlaskit/commits/af41160))


* breaking; Earlier breaking changes from renaming header prop to headerComponent

## 1.2.1 (2017-02-02)


* fix; fix ie11 rendering issues with navigation ([6f5fca3](https://bitbucket.org/atlassian/atlaskit/commits/6f5fca3))
* fix; fix to work with 24x24 pixel icon sizes in container items ([2807bf0](https://bitbucket.org/atlassian/atlaskit/commits/2807bf0))
* fix; upgrade to all of the [@atlaskit](https://github.com/atlaskit) scoped versions of components ([14bf6b4](https://bitbucket.org/atlassian/atlaskit/commits/14bf6b4))


null Remove unessary sinon import from test ([cea7306](https://bitbucket.org/atlassian/atlaskit/commits/cea7306))


* feature; Change prop description in readme story ([f8231e7](https://bitbucket.org/atlassian/atlaskit/commits/f8231e7))
* feature; JSDMC-1512: Remove unused prop in Navigation ([04a6810](https://bitbucket.org/atlassian/atlaskit/commits/04a6810))


* breaking; - Earlier breaking changes from renaming header prop to headerComponent
* breaking; - Earlier breaking changes from renaming header prop to headerComponent
