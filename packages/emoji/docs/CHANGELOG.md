# @atlaskit/emoji

## Unreleased

## 18.4.2 (2017-07-10)


* fix; added missing URLSearchParams in emoji ([b028827](https://bitbucket.org/atlassian/atlaskit/commits/b028827))

## 18.4.1 (2017-07-10)


* fix; size emoji to 20px by default. ([776fc42](https://bitbucket.org/atlassian/atlaskit/commits/776fc42))

## 18.4.0 (2017-07-05)


* feature; exact matches on emoji shortName will cause it to be selected ([8dbc1cb](https://bitbucket.org/atlassian/atlaskit/commits/8dbc1cb))

## 18.3.0 (2017-07-04)


* fix; emojiRepository returns emojis starting with numbers ([d98b5d8](https://bitbucket.org/atlassian/atlaskit/commits/d98b5d8))


* feature; improve rendering performance of emoji picker with virtual list. ([212e076](https://bitbucket.org/atlassian/atlaskit/commits/212e076))

## 18.2.1 (2017-06-29)

## 18.2.0 (2017-06-27)

## 18.1.0 (2017-06-26)


* fix; accept webp if in a supported browser. ([87c612b](https://bitbucket.org/atlassian/atlaskit/commits/87c612b))


* feature; allow enabling of upload support via EmojiResourceConfig ([234cdc6](https://bitbucket.org/atlassian/atlaskit/commits/234cdc6))
* feature; removed inbuilt tooltip for ADG3 compliant version ([2089361](https://bitbucket.org/atlassian/atlaskit/commits/2089361))

## 18.0.6 (2017-06-22)


* fix; don't index minus in emoji name. ([55398db](https://bitbucket.org/atlassian/atlaskit/commits/55398db))

## 18.0.5 (2017-06-21)


* fix; make sure we don't try to get the AsciiMap from EmojiRepository until all emoji have ([0b047b2](https://bitbucket.org/atlassian/atlaskit/commits/0b047b2))

## 18.0.4 (2017-06-20)

## 18.0.3 (2017-06-20)


* fix; fix default type ahead search to allow queries starting with a colon ([ed5dc16](https://bitbucket.org/atlassian/atlaskit/commits/ed5dc16))

## 18.0.2 (2017-06-20)


* fix; changed double quotes to single quotes ([266fe04](https://bitbucket.org/atlassian/atlaskit/commits/266fe04))
* fix; fixed linting errors in Emojis ([9aed8a9](https://bitbucket.org/atlassian/atlaskit/commits/9aed8a9))

## 18.0.1 (2017-06-15)


* fix; fix correct usage of react lifecycle and controlled input component. ([3ccd3ec](https://bitbucket.org/atlassian/atlaskit/commits/3ccd3ec))

## 17.0.0 (2017-06-15)


* fix; ensure there are no emoji duplicates when matching by ascii representation ([7d847b4](https://bitbucket.org/atlassian/atlaskit/commits/7d847b4))
* fix; emojiPicker stories use Layer component to anchor to input field ([0819541](https://bitbucket.org/atlassian/atlaskit/commits/0819541))


* feature; add ascii->emoji map to EmojiResource and EmojiRepository ([e9dbd69](https://bitbucket.org/atlassian/atlaskit/commits/e9dbd69))
* feature; add support for mapping new optional ascii field in EmojiDescription ([b3846a4](https://bitbucket.org/atlassian/atlaskit/commits/b3846a4))
* feature; fS-976 removed interal Popup from EmojiPicker and integrated with layer ([f081739](https://bitbucket.org/atlassian/atlaskit/commits/f081739))
* feature; introduce the new method findById(String) to EmojiProvider ([99c7549](https://bitbucket.org/atlassian/atlaskit/commits/99c7549))
* feature; properly handle emoji selection in typeahead when dealing with ascii match ([5a79e60](https://bitbucket.org/atlassian/atlaskit/commits/5a79e60))


* breaking; target, position, zIndex, offsetX and offsetY removed as props from EmojiPicker

ISSUES CLOSED: FS-976
* breaking; Added required getAsciiMap() method to EmojiProvider. Consumers will need to
implement it in their concrete classes.
* breaking; The introduction of findById(String) to EmojiProvider is a breaking change.

ISSUES CLOSED: FS-935

## 16.2.0 (2017-06-07)

## 16.1.0 (2017-06-06)


* fix; fix flexbox issue in IE11 ([383e10f](https://bitbucket.org/atlassian/atlaskit/commits/383e10f))
* fix; minor fixes, and tests for loading site emoji if not found. ([ad17ab6](https://bitbucket.org/atlassian/atlaskit/commits/ad17ab6))
* fix; tidy up conditional check, variable name ([39ad1f2](https://bitbucket.org/atlassian/atlaskit/commits/39ad1f2))
* fix; workaround react bug with EmojiUploadPicker in IE11 ([a161053](https://bitbucket.org/atlassian/atlaskit/commits/a161053))


* feature; look for an emoji on the server if unable to find it locally by id. ([5d9367f](https://bitbucket.org/atlassian/atlaskit/commits/5d9367f))

## 16.0.0 (2017-06-01)


* fix; add polyfills for all storybooks, use es6-promise, URLSearchParams, Fetch API and Elemen ([db2f5cf](https://bitbucket.org/atlassian/atlaskit/commits/db2f5cf))
* fix; move all polyfills into devDeps ([d275563](https://bitbucket.org/atlassian/atlaskit/commits/d275563))
* fix; remove polyfills from mention and emoji packages, use styled-components instead of t ([f47a58e](https://bitbucket.org/atlassian/atlaskit/commits/f47a58e))
* fix; rollback style changes for emoji component ([cd2bebd](https://bitbucket.org/atlassian/atlaskit/commits/cd2bebd))


* feature; upload emoji to media api support ([c230ac8](https://bitbucket.org/atlassian/atlaskit/commits/c230ac8))


* breaking; ED-1701, ED-1702, ED-1704

ISSUES CLOSED: ED-1701, ED-1702, ED-1704

## 15.0.0 (2017-05-22)


* feature; emojiPlaceholder prop rename title -> shortName to avoid confusion. ([974f48d](https://bitbucket.org/atlassian/atlaskit/commits/974f48d))
* feature; support media api based emoji ([b102cee](https://bitbucket.org/atlassian/atlaskit/commits/b102cee))


* breaking; EmojiPlaceholder prop change is breaking. title -> shortName

ISSUES CLOSED: FS-782

## 14.2.0 (2017-05-17)


* feature; trigger release of emoji component ([08e4e62](https://bitbucket.org/atlassian/atlaskit/commits/08e4e62))

## 14.1.0 (2017-05-10)


* fix; fixed emoji icon position ([5987e98](https://bitbucket.org/atlassian/atlaskit/commits/5987e98))


* feature; bumped typestyle in emoji ([2708133](https://bitbucket.org/atlassian/atlaskit/commits/2708133))

## 14.0.3 (2017-05-09)


* fix; emoji can handle empty parameter list ([b1ca73c](https://bitbucket.org/atlassian/atlaskit/commits/b1ca73c))


* feature; bump icon in emoji and field-base ([5f0a127](https://bitbucket.org/atlassian/atlaskit/commits/5f0a127))

## 14.0.2 (2017-05-09)


* fix; added dependencies to package.json to import URL library ([5895ba1](https://bitbucket.org/atlassian/atlaskit/commits/5895ba1))
* fix; fixed debounce function timeout clearing ([65d2d23](https://bitbucket.org/atlassian/atlaskit/commits/65d2d23))
* fix; query params can be included in the base url for the emoji service ([2de1256](https://bitbucket.org/atlassian/atlaskit/commits/2de1256))

## 14.0.1 (2017-05-08)


* fix; moved resize event handling to popper ([a876317](https://bitbucket.org/atlassian/atlaskit/commits/a876317))

## 14.0.0 (2017-05-08)

## 13.4.5 (2017-05-08)


* fix; allows absolute position to be passed to props of EmojiPicker ([e31615d](https://bitbucket.org/atlassian/atlaskit/commits/e31615d))
* fix; fix emoji picker search styling ([59bec8b](https://bitbucket.org/atlassian/atlaskit/commits/59bec8b))
* fix; fix missing border radius on image based emoji ([a0bc069](https://bitbucket.org/atlassian/atlaskit/commits/a0bc069))
* fix; fix picker button sizing due to padding removal on Emoji ([a0930d4](https://bitbucket.org/atlassian/atlaskit/commits/a0930d4))
* fix; handle non-square emoji ([930aabc](https://bitbucket.org/atlassian/atlaskit/commits/930aabc))
* fix; only show pointer cursor in typeahead / picker emoji. ([957be05](https://bitbucket.org/atlassian/atlaskit/commits/957be05))
* fix; order field given larger weight when sorting emojis ([90818d8](https://bitbucket.org/atlassian/atlaskit/commits/90818d8))
* fix; selecting an emoji primarily matches on id then fallbacks to shortName if not found ([e8914b9](https://bitbucket.org/atlassian/atlaskit/commits/e8914b9))
* fix; simplify emoji so can be used as is in rendering ([0ebf05e](https://bitbucket.org/atlassian/atlaskit/commits/0ebf05e))
* fix; fix external story not initialising component correctly from config. ([e458ab1](https://bitbucket.org/atlassian/atlaskit/commits/e458ab1))


* breaking; Emoji markup and default padding/margins has changed. Anyone relying on this will likely have visual

breakages (i.e. the editor/renderer/reactions). Do visual review after upgrading.

ISSUES CLOSED: FS-904

## 13.4.4 (2017-05-01)

## 13.4.3 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 13.4.2 (2017-04-26)


* fix; fS-923 In the picker search, the cursor jumps to the end of the editor when typing ([cc7986d](https://bitbucket.org/atlassian/atlaskit/commits/cc7986d))
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 13.4.1 (2017-04-19)

## 13.4.0 (2017-04-19)


* fix; don't setState on promise return if component unmounted ([41facf8](https://bitbucket.org/atlassian/atlaskit/commits/41facf8))

## 13.3.0 (2017-04-18)


* feature; added ref field to access EmojiPicker component through the editor ([6f09435](https://bitbucket.org/atlassian/atlaskit/commits/6f09435))
* feature; optimise EmojiPicker rendering to improve responsiveness when all Emoji visible. ([9302aca](https://bitbucket.org/atlassian/atlaskit/commits/9302aca))

## 13.2.2 (2017-04-13)


* fix; fixed rendering of names in emoji typeahead when scrollbar is present ([49da9f8](https://bitbucket.org/atlassian/atlaskit/commits/49da9f8))

## 13.2.1 (2017-04-11)


* fix; cross browser fixes for Emoji ([b464f1e](https://bitbucket.org/atlassian/atlaskit/commits/b464f1e))
* fix; fix cropping of short name in IE/Edge ([add87b1](https://bitbucket.org/atlassian/atlaskit/commits/add87b1))
* fix; fix flexbox layout for compatibility with IE11. ([e111027](https://bitbucket.org/atlassian/atlaskit/commits/e111027))
* fix; fS-331 emoji picker search preserves order of resulting emojis within categories ([d92d07e](https://bitbucket.org/atlassian/atlaskit/commits/d92d07e))
* fix; fS-790 searching for emojis returns results grouped by initial category order ([7644e0a](https://bitbucket.org/atlassian/atlaskit/commits/7644e0a))
* fix; rearranged category order in selector to match standard coming in from service ([6b3f2eb](https://bitbucket.org/atlassian/atlaskit/commits/6b3f2eb))
* fix; remove extra padding on buttons in firefox. Adjust width of search to match design a ([2e522e7](https://bitbucket.org/atlassian/atlaskit/commits/2e522e7))

## 13.2.0 (2017-04-11)


* fix; disable clear on input in IE, as it doesn't fire an onChange event. ([7232430](https://bitbucket.org/atlassian/atlaskit/commits/7232430))
* fix; fix active category syncing on scroll in the Emoji Pickers. ([8278cc7](https://bitbucket.org/atlassian/atlaskit/commits/8278cc7))
* fix; polyfill Element.closest. Fix category selector disabled behaviour/hover behaviour. ([420b90f](https://bitbucket.org/atlassian/atlaskit/commits/420b90f))


* feature; remove categories from search results. Disable category selector. ([70ac388](https://bitbucket.org/atlassian/atlaskit/commits/70ac388))

## 13.1.1 (2017-04-11)


* fix; emoji should be wrapped in span instead of div ([87076d7](https://bitbucket.org/atlassian/atlaskit/commits/87076d7))
* fix; fix inconsistent naming for usage of EmojiRepository ([df7200a](https://bitbucket.org/atlassian/atlaskit/commits/df7200a))


* feature; performance improvements to EmojiPicker ([3b1f537](https://bitbucket.org/atlassian/atlaskit/commits/3b1f537))

## 13.1.0 (2017-04-04)


* feature; add count() method to EmojiTypeAhead for number of matching emoji displayed. ([f06ac39](https://bitbucket.org/atlassian/atlaskit/commits/f06ac39))

## 12.0.0 (2017-03-31)


* fix; update test data to match service. Fix missing mapping for fallback. ([99931b2](https://bitbucket.org/atlassian/atlaskit/commits/99931b2))


* feature; change what identifies an Emoji. ([8e4c476](https://bitbucket.org/atlassian/atlaskit/commits/8e4c476))
* feature; upgrade to new service schema, and new render rules. ([e61e059](https://bitbucket.org/atlassian/atlaskit/commits/e61e059))


* breaking; The service schema have changed, component changing to match as well as refine rendering to match

spec.

ISSUES CLOSED: FS-833
* breaking; EmojiId now must contain a shortcut in all cases. id is optional, but preferred. This maximises

compatibility with different storage formats (such as markdown).

ISSUES CLOSED: FS-833

## 11.2.3 (2017-03-24)


* fix; added the types property to package.json for emoji ([630d3b2](https://bitbucket.org/atlassian/atlaskit/commits/630d3b2))

## 11.2.1 (2017-03-21)

## 11.2.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 11.2.0 (2017-03-21)


* feature; allow rendering an emoji using only a shortcut. ([fcc400e](https://bitbucket.org/atlassian/atlaskit/commits/fcc400e))
* feature; export EmojiPlaceholder for consumers wishing to use ResourcedEmoji and ResourcedEm ([48c755e](https://bitbucket.org/atlassian/atlaskit/commits/48c755e))
* feature; separate shortcut based ResourceEmoji from EmojiId based implementation ([1972e5d](https://bitbucket.org/atlassian/atlaskit/commits/1972e5d))

## 11.1.1 (2017-03-17)


* fix; upgrade TypeScript to 2.2.1 ([2aa28fc](https://bitbucket.org/atlassian/atlaskit/commits/2aa28fc))

## 11.1.0 (2017-03-09)


* feature; export addition interfaces/classes for Emoji ([b9f32a1](https://bitbucket.org/atlassian/atlaskit/commits/b9f32a1))

## 10.0.0 (2017-03-07)


* fix; make sure an id change in ResourcedEmoji is properly refresh. ([c72c651](https://bitbucket.org/atlassian/atlaskit/commits/c72c651))
* fix; rename ResourcedEmoji prop from id to emojiId for clarity. ([b519e0a](https://bitbucket.org/atlassian/atlaskit/commits/b519e0a))
* fix; require at least one provider to EmojiResource. ([f6feada](https://bitbucket.org/atlassian/atlaskit/commits/f6feada))


* feature; Support asynchronous emoji resource loading, searching, lookups, and rendering. ([298b5ac](https://bitbucket.org/atlassian/atlaskit/commits/298b5ac))


* breaking; Changes resource API to reflect async nature. More similar to Mention
resources, and first steps to a common base.
* breaking; EmojiPicker is now using EmojiResource instead of EmojiService to support
asynchronous loading and rendering.
* breaking; EmojiTypeAhead is now using EmojiResource instead of EmojiService to support
asynchronous loading and rendering.

ISSUES CLOSED: FS-780

## 9.0.2 (2017-02-27)


* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))

## 9.0.1 (2017-02-22)


* fix; Import only 1 icon instead of whole icon package ([c5fd67b](https://bitbucket.org/atlassian/atlaskit/commits/c5fd67b))

## 2.0.0 (2017-02-22)


* Fix typescript build issue ([5209dee](https://bitbucket.org/atlassian/atlaskit/commits/5209dee))

## 2.0.0 (2017-02-21)

## 2.0.0 (2017-02-21)


* Typescript configuration changes to match latest core configuration. ([aa13d3f](https://bitbucket.org/atlassian/atlaskit/commits/aa13d3f))

## 2.0.0 (2017-02-21)

## 2.0.0 (2017-02-20)

## 2.0.0 (2017-02-20)

## 2.0.0 (2017-02-20)


* Migrating to typescript. Introduce breaking API changes. ([739cbde](https://bitbucket.org/atlassian/atlaskit/commits/739cbde))


* onSelection signature changed for both EmojiTypeAhead and EmojiPicker
* Type and prop changes across most components.
* EmojiResource response structure has changed to allow returning of media api token,
* event signatures from the type ahead component has changed.
Bump emoji version to prevent local linking by reactions

FS-318

## 1.0.1 (2017-02-20)


* Force release of [@atlaskit](https://github.com/atlaskit)/emoji ([0a322a7](https://bitbucket.org/atlassian/atlaskit/commits/0a322a7))
