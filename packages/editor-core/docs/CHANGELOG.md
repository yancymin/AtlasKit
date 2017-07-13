# @atlaskit/editor-core

## Unreleased

## 39.1.1 (2017-07-12)

## 39.1.0 (2017-07-12)

## 39.0.1 (2017-07-12)


* fix; analytics service not called while toggling list using keyboard. ([ddd227f](https://bitbucket.org/atlassian/atlaskit/commits/ddd227f))

## 38.0.0 (2017-07-12)


* fix; moved renderer UI component export from /src/ui to /src/renderer ([50e11df](https://bitbucket.org/atlassian/atlaskit/commits/50e11df))
* fix; test build to check if storybook build is fixed. ([abb7889](https://bitbucket.org/atlassian/atlaskit/commits/abb7889))


* breaking; moved renderer UI component export from /src/ui to /src/renderer

## 37.5.0 (2017-07-11)


* fix; fix jumping of code block when editor has a scroll. ([eb4e4a4](https://bitbucket.org/atlassian/atlaskit/commits/eb4e4a4))

## 37.4.0 (2017-07-11)


* fix; bump emoji to the latest version ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))


* feature; convert media plugin to support the new editor architecture ([a2da079](https://bitbucket.org/atlassian/atlaskit/commits/a2da079))
* feature; fS-1125 Code review remarks ([d2b4cc0](https://bitbucket.org/atlassian/atlaskit/commits/d2b4cc0))

## 37.3.2 (2017-07-10)


* fix; fix Enter key behavior in code-block. ([f662ad0](https://bitbucket.org/atlassian/atlaskit/commits/f662ad0))
* fix; fix event handling for code-mirror code-blocks. ([d392bde](https://bitbucket.org/atlassian/atlaskit/commits/d392bde))
* fix; fixing the issue of updating prose-mirror editor state from code-mirror node-view wh ([d0c0cef](https://bitbucket.org/atlassian/atlaskit/commits/d0c0cef))


* feature; Adding code mirror node-view package ([14719a6](https://bitbucket.org/atlassian/atlaskit/commits/14719a6))

## 37.3.1 (2017-07-10)

## 37.3.0 (2017-07-10)


* fix; fix for analytics event to ve invoked only if user action was successful. ([67eca8e](https://bitbucket.org/atlassian/atlaskit/commits/67eca8e))
* fix; fix hyperlink handlePaste because it breaks table pasting ([7903c0e](https://bitbucket.org/atlassian/atlaskit/commits/7903c0e))
* fix; improve block quote styling for editor ([afb02d0](https://bitbucket.org/atlassian/atlaskit/commits/afb02d0))
* fix; remove CSS hack for disabled ToolbarAdvancedTextFormatting UI element ([0a92ff0](https://bitbucket.org/atlassian/atlaskit/commits/0a92ff0))


* feature; export WithProviders from editor-core ([1fda740](https://bitbucket.org/atlassian/atlaskit/commits/1fda740))
* feature; fS-1125 Resolve mentions query by using previous exact match ([28e2d4c](https://bitbucket.org/atlassian/atlaskit/commits/28e2d4c))

## 37.2.1 (2017-07-07)

## 37.2.0 (2017-07-07)


* fix; rename table nodes to camelCase ([194a773](https://bitbucket.org/atlassian/atlaskit/commits/194a773))

## 37.1.0 (2017-07-07)

## 36.0.0 (2017-07-07)


* fix; cleanup ([ca3537c](https://bitbucket.org/atlassian/atlaskit/commits/ca3537c))


* feature; add saveOnEnter plugin for the new editor architecture ([cb97a0b](https://bitbucket.org/atlassian/atlaskit/commits/cb97a0b))
* feature; added advance menu for tables ([7256a52](https://bitbucket.org/atlassian/atlaskit/commits/7256a52))
* feature; tabbing in the last cell creates a new row ([eef9878](https://bitbucket.org/atlassian/atlaskit/commits/eef9878))
* feature; use withProvider instead of subscriptions in plugin state ([24b3026](https://bitbucket.org/atlassian/atlaskit/commits/24b3026))


* breaking; It's a breaking change for editor-hipchat since it uses MentionPicker and EmojiTypeAhead directly
not through Chrome

ISSUES CLOSED: ED-2037

## 35.2.1 (2017-07-06)

## 35.2.0 (2017-07-06)


* fix; link parsing logic should not parse link inside another link. ([314da7f](https://bitbucket.org/atlassian/atlaskit/commits/314da7f))

## 35.1.2 (2017-07-06)


* fix; fix unnecessary blinking of media cards in editor ([4271fdb](https://bitbucket.org/atlassian/atlaskit/commits/4271fdb))

## 35.1.1 (2017-07-06)


* fix; removed redundant test ([d8fc745](https://bitbucket.org/atlassian/atlaskit/commits/d8fc745))

## 35.1.0 (2017-07-05)


* fix; removed extra whitespace. ([5289a72](https://bitbucket.org/atlassian/atlaskit/commits/5289a72))


* feature; now auto-convert ascii emoji starting with a colon to the matching emoji when follo ([f1e5579](https://bitbucket.org/atlassian/atlaskit/commits/f1e5579))

## 35.0.3 (2017-07-05)


* fix; use newest media components, fix renderer lazy-load media bugs ([e7d02cf](https://bitbucket.org/atlassian/atlaskit/commits/e7d02cf))

## 35.0.2 (2017-07-05)


* fix; add missing storybook data in new renderer and update marks/code to use AkCode ([84e0114](https://bitbucket.org/atlassian/atlaskit/commits/84e0114))
* fix; fix test ([d438aad](https://bitbucket.org/atlassian/atlaskit/commits/d438aad))
* fix; removed setState on scroll hack ([f1f43d8](https://bitbucket.org/atlassian/atlaskit/commits/f1f43d8))

## 35.0.1 (2017-07-05)


* fix; do not destroy passed providerFactory on Renderer unmount ([8ef3509](https://bitbucket.org/atlassian/atlaskit/commits/8ef3509))
* fix; fix splitListItem ([cbf2388](https://bitbucket.org/atlassian/atlaskit/commits/cbf2388))
* fix; fix the issue where Paragraph sometimes doen't comes with a content attribute ([c58f300](https://bitbucket.org/atlassian/atlaskit/commits/c58f300))
* fix; fix toolbar position 1px gap due to border-bottom of the Editor ([1a33dc0](https://bitbucket.org/atlassian/atlaskit/commits/1a33dc0))
* fix; include updated full.json ([630d54e](https://bitbucket.org/atlassian/atlaskit/commits/630d54e))
* fix; json schema's patterns for application card urls. ([f57ad01](https://bitbucket.org/atlassian/atlaskit/commits/f57ad01))
* fix; make ascii-to-emoji auto-conversion great again when preceded by a hard break ([88ad29b](https://bitbucket.org/atlassian/atlaskit/commits/88ad29b))
* fix; make sure insert links handled empty href. ([9ee7106](https://bitbucket.org/atlassian/atlaskit/commits/9ee7106))
* fix; removed unused import. ([4eadc1b](https://bitbucket.org/atlassian/atlaskit/commits/4eadc1b))

## 35.0.0 (2017-07-04)

## 34.11.1 (2017-07-04)


* fix; fix "src_1.mediaPluginFactory is not a function" ([27a8a25](https://bitbucket.org/atlassian/atlaskit/commits/27a8a25))
* fix; move tablefloating toolbar with scroll ([6078aac](https://bitbucket.org/atlassian/atlaskit/commits/6078aac))


* feature; merged master ([77ec826](https://bitbucket.org/atlassian/atlaskit/commits/77ec826))

## 34.11.0 (2017-07-04)


* fix; edit blockquote styling ([7e9baca](https://bitbucket.org/atlassian/atlaskit/commits/7e9baca))

## 34.10.0 (2017-07-04)


* fix; allow relative urls in isSafeUrl validator ([f47d228](https://bitbucket.org/atlassian/atlaskit/commits/f47d228))
* fix; fix a typo in ApplicationCard test ([4216d91](https://bitbucket.org/atlassian/atlaskit/commits/4216d91))
* fix; fix cols/rows insertion in table plugin ([fe25257](https://bitbucket.org/atlassian/atlaskit/commits/fe25257))
* fix; fix tables plugin tests ([a0f01be](https://bitbucket.org/atlassian/atlaskit/commits/a0f01be))
* fix; fixed tables isRowSelection and isColSelection naming ([c31012d](https://bitbucket.org/atlassian/atlaskit/commits/c31012d))
* fix; renderer exported MarkdownSerializer conflicts with PM's MarkdownSerializer ([99c7684](https://bitbucket.org/atlassian/atlaskit/commits/99c7684))
* fix; renderer MarkdownSerializer always returns undefined ([3d4ed46](https://bitbucket.org/atlassian/atlaskit/commits/3d4ed46))


* feature; added hover selection decoration ([79a3fd1](https://bitbucket.org/atlassian/atlaskit/commits/79a3fd1))
* feature; adding parsing of pasted content slices to generate link marks. ([8c24435](https://bitbucket.org/atlassian/atlaskit/commits/8c24435))
* feature; updated json-schema to reflect the latest changes ([2e47036](https://bitbucket.org/atlassian/atlaskit/commits/2e47036))
* feature; bump prosemirror to 0.22.0, tables to 0.1.0" ([4551ab9](https://bitbucket.org/atlassian/atlaskit/commits/4551ab9))

## 34.9.1 (2017-07-03)


* fix; destroy editorView and plugin state after each test. ([47b0476](https://bitbucket.org/atlassian/atlaskit/commits/47b0476))
* fix; emoji typeahead now shows up after a hardBreak node ([cae95b9](https://bitbucket.org/atlassian/atlaskit/commits/cae95b9))
* fix; mentioni typeahead now shows up after a hardBreak node ([464abdb](https://bitbucket.org/atlassian/atlaskit/commits/464abdb))


* feature; updated rows/cols selection on mouse over ([e9c2ade](https://bitbucket.org/atlassian/atlaskit/commits/e9c2ade))

## 34.9.0 (2017-07-03)


* fix; adding div around editor content to add max-height. ([a142ed5](https://bitbucket.org/atlassian/atlaskit/commits/a142ed5))
* fix; make sure no link detection on undo. ([f9dda85](https://bitbucket.org/atlassian/atlaskit/commits/f9dda85))
* fix; should validate applicationCard according to the spec ([5364a95](https://bitbucket.org/atlassian/atlaskit/commits/5364a95))
* fix; use Array.some to make the code more readable ([c3822ea](https://bitbucket.org/atlassian/atlaskit/commits/c3822ea))
* fix; use same API for MarkdownSerializer as other serializers do ([fc4e380](https://bitbucket.org/atlassian/atlaskit/commits/fc4e380))
* fix; fixed types in all pluginState tests. ([2e8d75f](https://bitbucket.org/atlassian/atlaskit/commits/2e8d75f))
* fix; removed unused import. ([a3e320b](https://bitbucket.org/atlassian/atlaskit/commits/a3e320b))


* feature; add json-schema generator ([97a9603](https://bitbucket.org/atlassian/atlaskit/commits/97a9603))
* feature; added rows/cols selection on floating controls mouse over ([b55f55c](https://bitbucket.org/atlassian/atlaskit/commits/b55f55c))
* feature; redesign of insert row/col buttons ([d02cf77](https://bitbucket.org/atlassian/atlaskit/commits/d02cf77))
* feature; redesigned insert buttons ([5801507](https://bitbucket.org/atlassian/atlaskit/commits/5801507))

## 34.8.0 (2017-06-30)


* feature; updated emoji to include tooltip in editor ([c7f323c](https://bitbucket.org/atlassian/atlaskit/commits/c7f323c))

## 34.7.0 (2017-06-30)


* fix; make sure can insert links when replace step fragment larger than existing fragment. ([caf03ea](https://bitbucket.org/atlassian/atlaskit/commits/caf03ea))
* fix; should not re-import editor-core package ([1471d3b](https://bitbucket.org/atlassian/atlaskit/commits/1471d3b))

## 34.5.0 (2017-06-30)

## 34.5.0 (2017-06-30)


* feature; rendered link card. ([663b647](https://bitbucket.org/atlassian/atlaskit/commits/663b647))

## 34.4.1 (2017-06-29)


* feature; insert link card to the correct position. ([87c45ce](https://bitbucket.org/atlassian/atlaskit/commits/87c45ce))

## 34.4.0 (2017-06-29)


* fix; addes in ApplicationCard support for renderer in editor-core ([af55b2c](https://bitbucket.org/atlassian/atlaskit/commits/af55b2c))
* fix; fix label on block-type dropdown ([b837db6](https://bitbucket.org/atlassian/atlaskit/commits/b837db6))
* fix; making maxHeight an optional property and removing it from storybook. ([3a67577](https://bitbucket.org/atlassian/atlaskit/commits/3a67577))
* fix; minor fixes to address PR feedback ([67864bb](https://bitbucket.org/atlassian/atlaskit/commits/67864bb))


* feature; fS-1090 Bump version of mention and test data ([b4730b3](https://bitbucket.org/atlassian/atlaskit/commits/b4730b3))
* feature; fS-1090 fix tslint ([dd2a2f6](https://bitbucket.org/atlassian/atlaskit/commits/dd2a2f6))
* feature; moving inline-code button to toolbar ([116880f](https://bitbucket.org/atlassian/atlaskit/commits/116880f))

## 34.3.5 (2017-06-29)

## 34.3.4 (2017-06-29)

## 34.3.3 (2017-06-29)


* fix; add codeBlock support to new renderer ([2763767](https://bitbucket.org/atlassian/atlaskit/commits/2763767))
* fix; fix prosemirror nodes assertion helper ([995dcaf](https://bitbucket.org/atlassian/atlaskit/commits/995dcaf))


* feature; add interfaces for json-schema generation ([46d0ec9](https://bitbucket.org/atlassian/atlaskit/commits/46d0ec9))
* feature; add option to set max height of the editor ([e7a96ef](https://bitbucket.org/atlassian/atlaskit/commits/e7a96ef))

## 34.3.2 (2017-06-28)

## 34.3.1 (2017-06-28)


* fix; "status-update" picker events were downgrading media status back to "uploading" ([d22a330](https://bitbucket.org/atlassian/atlaskit/commits/d22a330))
* fix; added typescript types in table plugin and react components ([cd43807](https://bitbucket.org/atlassian/atlaskit/commits/cd43807))
* fix; change API for React UI Renderer component ([079e84f](https://bitbucket.org/atlassian/atlaskit/commits/079e84f))
* fix; copy hipchat schema into the editor-core ([7b47bdf](https://bitbucket.org/atlassian/atlaskit/commits/7b47bdf))
* fix; fix blur/focus logic for color toolbar ([58d7358](https://bitbucket.org/atlassian/atlaskit/commits/58d7358))
* fix; fixed escaping from the table with ArrowUp/ArrowDown ([084f6b9](https://bitbucket.org/atlassian/atlaskit/commits/084f6b9))
* fix; fixed the comment typo ([caa6fa9](https://bitbucket.org/atlassian/atlaskit/commits/caa6fa9))
* fix; fS-1090 Make sure we're exiting the mention context after inserting ([5efd91c](https://bitbucket.org/atlassian/atlaskit/commits/5efd91c))
* fix; handle unknown nodes in renderer ([2956d5c](https://bitbucket.org/atlassian/atlaskit/commits/2956d5c))
* fix; mediaComponent shall use StateManager from Plugin State when in Editor. ([61df737](https://bitbucket.org/atlassian/atlaskit/commits/61df737))
* fix; prevent javascript links for link mark ([20f2d7f](https://bitbucket.org/atlassian/atlaskit/commits/20f2d7f))
* fix; removing code block or panel should not remove enclosing block. ([9c7586e](https://bitbucket.org/atlassian/atlaskit/commits/9c7586e))
* fix; updated table keymaps ([795d8bb](https://bitbucket.org/atlassian/atlaskit/commits/795d8bb))


* feature; added function in media plugin to detect whether the transaction has new links. ([fff1175](https://bitbucket.org/atlassian/atlaskit/commits/fff1175))
* feature; fS-1090 Dynamically resolve mentions when typing fast ([8bcb355](https://bitbucket.org/atlassian/atlaskit/commits/8bcb355))
* feature; refactored detectLinkRanges to return position with list of urls. ([6de21d8](https://bitbucket.org/atlassian/atlaskit/commits/6de21d8))


* breaking; Rename allowsPastingLinks to allowsLinks

## 34.3.0 (2017-06-26)


* fix; use expect instead of expect not to if we knows what to expect. ([fa1ca0c](https://bitbucket.org/atlassian/atlaskit/commits/fa1ca0c))
* fix; fixed media plugin test failure after merge master. ([0110cdf](https://bitbucket.org/atlassian/atlaskit/commits/0110cdf))

## 34.2.2 (2017-06-26)

## 34.2.1 (2017-06-23)


* fix; clicking trash icon on floating toolbars of panel or code-blocks should delete the b ([b1a7720](https://bitbucket.org/atlassian/atlaskit/commits/b1a7720))
* fix; default value of language picker should  not be language but placeholder. ([098b298](https://bitbucket.org/atlassian/atlaskit/commits/098b298))
* fix; fix path in test helpers ([dcc0ffb](https://bitbucket.org/atlassian/atlaskit/commits/dcc0ffb))
* fix; fix required types on applicationCard type. ([c13f04c](https://bitbucket.org/atlassian/atlaskit/commits/c13f04c))

## 34.2.0 (2017-06-23)


* fix; fixed tslint, cursor position when deleting rows ([e6e2792](https://bitbucket.org/atlassian/atlaskit/commits/e6e2792))


* feature; add applicationCard node. ([8dd08a1](https://bitbucket.org/atlassian/atlaskit/commits/8dd08a1))

## 34.1.1 (2017-06-23)


* fix; fixed position inside table when adding new rows ([52ed7db](https://bitbucket.org/atlassian/atlaskit/commits/52ed7db))

## 34.1.0 (2017-06-23)


* fix; added accessLevel to mention node in renderer of editor-core ([50be806](https://bitbucket.org/atlassian/atlaskit/commits/50be806))
* fix; updated test-helpers for table ([f13d324](https://bitbucket.org/atlassian/atlaskit/commits/f13d324))
* fix; changed button ref handler to prevent local test failures ([3dbe3f1](https://bitbucket.org/atlassian/atlaskit/commits/3dbe3f1))


* feature; added prosemirror-tables package, table nodes to schema and table plugin ([74ee019](https://bitbucket.org/atlassian/atlaskit/commits/74ee019))

## 33.3.1 (2017-06-22)


* fix; fixed floating toolbar position when table has offset ([d48fea5](https://bitbucket.org/atlassian/atlaskit/commits/d48fea5))
* fix; remove table-prototype package ([15ea532](https://bitbucket.org/atlassian/atlaskit/commits/15ea532))
* fix; tables cleanup ([c51c60d](https://bitbucket.org/atlassian/atlaskit/commits/c51c60d))
* fix; fixed typescript error. ([1072668](https://bitbucket.org/atlassian/atlaskit/commits/1072668))

## 33.3.0 (2017-06-21)


* feature; removed handleNewMediaPicked and expose insertFile as media plugin API ([a6a5152](https://bitbucket.org/atlassian/atlaskit/commits/a6a5152))


* breaking; removed handleNewMediaPicked and expose insertFile as media plugin API

## 33.2.2 (2017-06-21)


* fix; fix order of colours in colour picker ([5572a97](https://bitbucket.org/atlassian/atlaskit/commits/5572a97))
* fix; fixed floating toolbar position ([f433ad7](https://bitbucket.org/atlassian/atlaskit/commits/f433ad7))
* fix; list autoformatting should not work inside code block. ([32685e7](https://bitbucket.org/atlassian/atlaskit/commits/32685e7))
* fix; make sure inserting media is working with node selected. ([4f7abec](https://bitbucket.org/atlassian/atlaskit/commits/4f7abec))
* fix; refactor and fixed bug that didn't delete selected text when there is existing media ([94eb3a5](https://bitbucket.org/atlassian/atlaskit/commits/94eb3a5))
* fix; uncaught rejected provider promises, ui not updating. ([237cd54](https://bitbucket.org/atlassian/atlaskit/commits/237cd54))


* feature; apply the same operation to insertLink. ([538ffac](https://bitbucket.org/atlassian/atlaskit/commits/538ffac))
* feature; set selection to the next paragraph after inserting media ([ebdf46c](https://bitbucket.org/atlassian/atlaskit/commits/ebdf46c))
* feature; dummy commit to mark release of editor-core. ([7276311](https://bitbucket.org/atlassian/atlaskit/commits/7276311))

## 33.2.1 (2017-06-21)


* fix; addes in support for Heading in new renderer ([0a48838](https://bitbucket.org/atlassian/atlaskit/commits/0a48838))
* fix; fixed cursor position when inserting/deleting cells ([5c5134e](https://bitbucket.org/atlassian/atlaskit/commits/5c5134e))

## 33.2.0 (2017-06-21)


* fix; fix popup alignment ([f1087b5](https://bitbucket.org/atlassian/atlaskit/commits/f1087b5))
* fix; fix tslint error ([9f53fe7](https://bitbucket.org/atlassian/atlaskit/commits/9f53fe7))
* fix; fixed tslint error, tableCellStartPos ([824a135](https://bitbucket.org/atlassian/atlaskit/commits/824a135))
* fix; fS-1073 Trigger empty search when setting mentions provider to improve responsivenes ([3218cb8](https://bitbucket.org/atlassian/atlaskit/commits/3218cb8))
* fix; insert default content type after media instead of hard coded to p. ([da356ab](https://bitbucket.org/atlassian/atlaskit/commits/da356ab))
* fix; fS-1073 Bump mention version ([668eff6](https://bitbucket.org/atlassian/atlaskit/commits/668eff6))


* feature; add JSONSerializer ([0546b04](https://bitbucket.org/atlassian/atlaskit/commits/0546b04))
* feature; added alignX and alignY extra params to popup ([92d716d](https://bitbucket.org/atlassian/atlaskit/commits/92d716d))
* feature; added removing of selected cells ([b6c47f5](https://bitbucket.org/atlassian/atlaskit/commits/b6c47f5))
* feature; create a new p when insert media on a non empty content block. ([5d9ec4b](https://bitbucket.org/atlassian/atlaskit/commits/5d9ec4b))
* feature; make sure insert media works with text selected. ([377d655](https://bitbucket.org/atlassian/atlaskit/commits/377d655))
* feature; prepend to existing media group if detecting previous adjacent node is media group ([d72636a](https://bitbucket.org/atlassian/atlaskit/commits/d72636a))

## 33.1.0 (2017-06-20)


* fix; fixed tests that does not set the right selction. ([7a644a6](https://bitbucket.org/atlassian/atlaskit/commits/7a644a6))
* fix; support Emoji nodes in react renderer ([ac83cfa](https://bitbucket.org/atlassian/atlaskit/commits/ac83cfa))


* feature; added floating toolbar, changed popper to popup ([eef3307](https://bitbucket.org/atlassian/atlaskit/commits/eef3307))

## 33.0.2 (2017-06-20)


* fix; fix media copy optional attrs during insert ([e08a07e](https://bitbucket.org/atlassian/atlaskit/commits/e08a07e))
* fix; do not import whole [@atlaskit](https://github.com/atlaskit)/icon – missed import ([b3854f5](https://bitbucket.org/atlassian/atlaskit/commits/b3854f5))

## 33.0.1 (2017-06-20)


* fix; it inserts a new p no matter it's an empty p or not. ([265f573](https://bitbucket.org/atlassian/atlaskit/commits/265f573))
* fix; do not import whole [@atlaskit](https://github.com/atlaskit)/icon ([27a1633](https://bitbucket.org/atlassian/atlaskit/commits/27a1633))


* feature; create a new paragraph below when inserting a media node at the end of the doc. ([1be170e](https://bitbucket.org/atlassian/atlaskit/commits/1be170e))
* feature; dissallow nested tables ([e761dea](https://bitbucket.org/atlassian/atlaskit/commits/e761dea))

## 32.0.0 (2017-06-19)


* fix; add defaultSchema, use it in src/ui/Renderer ([24ac8eb](https://bitbucket.org/atlassian/atlaskit/commits/24ac8eb))
* fix; pass providers and eventhandlers into React serializer ([7ab3e44](https://bitbucket.org/atlassian/atlaskit/commits/7ab3e44))


null update media node to reflect the new architecture ([6b8ee3b](https://bitbucket.org/atlassian/atlaskit/commits/6b8ee3b))


* feature; added focus logic back ([415d516](https://bitbucket.org/atlassian/atlaskit/commits/415d516))
* feature; added ToolbarEmojiPicker button ([67498c6](https://bitbucket.org/atlassian/atlaskit/commits/67498c6))
* feature; exit inline code with arrowRight ([9fb3e74](https://bitbucket.org/atlassian/atlaskit/commits/9fb3e74))
* feature; integrated accessLevel data from mentions with NodeSpec ([305f94c](https://bitbucket.org/atlassian/atlaskit/commits/305f94c))
* feature; bumped mentions to latest version ([fed0d26](https://bitbucket.org/atlassian/atlaskit/commits/fed0d26))


* breaking; Introduced new private attrs in media node, see ED-1964

ISSUES CLOSED: ED-1931

## 31.2.1 (2017-06-19)


* feature; added corner insert buttons ([1dda2c8](https://bitbucket.org/atlassian/atlaskit/commits/1dda2c8))
* feature; added insert buttons for cols and rows ([92d6275](https://bitbucket.org/atlassian/atlaskit/commits/92d6275))
* feature; added insertion of cols and rows ([4d4ae8a](https://bitbucket.org/atlassian/atlaskit/commits/4d4ae8a))

## 31.2.0 (2017-06-17)


* fix; cleanup ([6e7da47](https://bitbucket.org/atlassian/atlaskit/commits/6e7da47))
* fix; destroy providerFactory internals when components get unmounted ([726a55e](https://bitbucket.org/atlassian/atlaskit/commits/726a55e))


* feature; added visual trigger for tables ([6302237](https://bitbucket.org/atlassian/atlaskit/commits/6302237))
* feature; changes required in editor-core for code-mirror package. ([f4f575c](https://bitbucket.org/atlassian/atlaskit/commits/f4f575c))
* feature; improved selection detection ([8d3a8a0](https://bitbucket.org/atlassian/atlaskit/commits/8d3a8a0))

## 31.1.0 (2017-06-16)


* fix; extract bundled TypeScript definitions for orderedmap, use [@types](https://github.com/types)/orderedmap ([6759110](https://bitbucket.org/atlassian/atlaskit/commits/6759110))

## 31.0.1 (2017-06-16)

## 31.0.0 (2017-06-15)


* fix; do not serialize media nodes in text serializer ([4b69821](https://bitbucket.org/atlassian/atlaskit/commits/4b69821))


* feature; add Confluence and Bitbucket schemas to editor-core. ([5cd2b16](https://bitbucket.org/atlassian/atlaskit/commits/5cd2b16))
* feature; new popups and dropdowns for editor-core ([0e738d9](https://bitbucket.org/atlassian/atlaskit/commits/0e738d9))


* breaking; Might introduce some regressions, releasing new major version as a precaution

ISSUES CLOSED: ED-1468 ED-1440

## 30.2.2 (2017-06-15)


* fix; don't trigger emoji typeahead when colon is preceded by a non-word non-whitespace ch ([f301589](https://bitbucket.org/atlassian/atlaskit/commits/f301589))


* feature; add ascii emoji input rule to automatically match and convert ascii representations ([b404019](https://bitbucket.org/atlassian/atlaskit/commits/b404019))
* feature; cleaned up table plugin and ui component a bit ([62af12b](https://bitbucket.org/atlassian/atlaskit/commits/62af12b))
* feature; keep the leading colon in the query being passed to the typeahead ([362d541](https://bitbucket.org/atlassian/atlaskit/commits/362d541))

## 30.2.1 (2017-06-14)


* fix; blur collapsed input before setting focus to expanded editor ([b1e3273](https://bitbucket.org/atlassian/atlaskit/commits/b1e3273))
* fix; fixed row/cols selection and focus bugs ([606694a](https://bitbucket.org/atlassian/atlaskit/commits/606694a))
* fix; simplier text serializer ([18f0c79](https://bitbucket.org/atlassian/atlaskit/commits/18f0c79))

## 30.2.0 (2017-06-14)

## 30.1.3 (2017-06-14)


* fix; add AbstractMentionResource export to editor-core ([308ad31](https://bitbucket.org/atlassian/atlaskit/commits/308ad31))
* fix; commenting out ToolbarEmojiPicker related files ([174c676](https://bitbucket.org/atlassian/atlaskit/commits/174c676))
* fix; fix table typescript error ([5eb7a64](https://bitbucket.org/atlassian/atlaskit/commits/5eb7a64))

## 30.1.2 (2017-06-13)


* fix; fix test failure due to group declaration marks ([1f1438f](https://bitbucket.org/atlassian/atlaskit/commits/1f1438f))
* fix; fix typo on mention import ([1d44c5c](https://bitbucket.org/atlassian/atlaskit/commits/1d44c5c))
* fix; fixed background overlapping border of table cell in Firefox ([c03902c](https://bitbucket.org/atlassian/atlaskit/commits/c03902c))
* fix; include mark group declarations to avoid false-position errors. ([c5c6ea5](https://bitbucket.org/atlassian/atlaskit/commits/c5c6ea5))


* feature; added active state to toolbar buttons ([f456d5b](https://bitbucket.org/atlassian/atlaskit/commits/f456d5b))
* feature; added TableToolbar ([1d016ea](https://bitbucket.org/atlassian/atlaskit/commits/1d016ea))
* feature; upgrade emoji to support custom uploads. ([3b28226](https://bitbucket.org/atlassian/atlaskit/commits/3b28226))
* feature; consistent version of mentions between renderer and editor-core ([4924655](https://bitbucket.org/atlassian/atlaskit/commits/4924655))

## 30.1.1 (2017-06-09)


* fix; use mark groups to create some indirection for exclusions. ([b976d58](https://bitbucket.org/atlassian/atlaskit/commits/b976d58))
* fix; simplify function declaration because "contextual typing" ([17f5476](https://bitbucket.org/atlassian/atlaskit/commits/17f5476))

## 30.1.0 (2017-06-09)


* feature; Add Confluence-specific editor nodes to editor-core. ([b1d7185](https://bitbucket.org/atlassian/atlaskit/commits/b1d7185))

## 29.0.0 (2017-06-08)


* fix; remove context in editor core storybook ([79facc0](https://bitbucket.org/atlassian/atlaskit/commits/79facc0))


* feature; added table nodeView and tracking of focus state change ([e29715e](https://bitbucket.org/atlassian/atlaskit/commits/e29715e))
* feature; removed context setting in editor ([da582cd](https://bitbucket.org/atlassian/atlaskit/commits/da582cd))


* breaking; removed context setting in editor

## 28.1.3 (2017-06-08)

## 28.1.2 (2017-06-07)


* fix; brackets should be a valid character for links. ([0d8b437](https://bitbucket.org/atlassian/atlaskit/commits/0d8b437))

## 28.1.1 (2017-06-07)


* fix; replace non empty selection with '@' and mentionQuery mark ([4b06d91](https://bitbucket.org/atlassian/atlaskit/commits/4b06d91))
* fix; replace non empty selection with ":" and emojiQuery mark ([db48be0](https://bitbucket.org/atlassian/atlaskit/commits/db48be0))


* feature; moved to prosemirror-tables dependency ([94fc851](https://bitbucket.org/atlassian/atlaskit/commits/94fc851))

## 28.1.0 (2017-06-07)


* feature; add basic text serializer code ([5ef88c7](https://bitbucket.org/atlassian/atlaskit/commits/5ef88c7))
* feature; add more nodes and tests ([475a3f4](https://bitbucket.org/atlassian/atlaskit/commits/475a3f4))
* feature; export renderer stuff ([99e3f9e](https://bitbucket.org/atlassian/atlaskit/commits/99e3f9e))

## 28.0.0 (2017-06-06)


* fix; fix display text cache for link ([284f7d8](https://bitbucket.org/atlassian/atlaskit/commits/284f7d8))
* fix; importing tables from dist instead of using source files ([e4da0e7](https://bitbucket.org/atlassian/atlaskit/commits/e4da0e7))
* fix; increase specificity of input class produced by styled-component ([021b7f7](https://bitbucket.org/atlassian/atlaskit/commits/021b7f7))


* feature; added table plugin and schema ([01e016a](https://bitbucket.org/atlassian/atlaskit/commits/01e016a))

## 27.1.0 (2017-06-05)


* fix; re-use existing mediapickers instead of destroying/creating a new one for every room ([a881d7d](https://bitbucket.org/atlassian/atlaskit/commits/a881d7d))


* feature; added prosemirror-tables and typescript definitions ([6aafb7b](https://bitbucket.org/atlassian/atlaskit/commits/6aafb7b))

## 26.0.0 (2017-06-02)


* fix; ensure mention button is disabled in unsupported nodes ([d46b6ef](https://bitbucket.org/atlassian/atlaskit/commits/d46b6ef))
* fix; ensure mention button is enabled after auto-formatted code mark ([55ae762](https://bitbucket.org/atlassian/atlaskit/commits/55ae762))
* fix; use latest mentions and emoji components ([5d5a1e4](https://bitbucket.org/atlassian/atlaskit/commits/5d5a1e4))


* feature; incorporate text-color spec changes ([8eb647f](https://bitbucket.org/atlassian/atlaskit/commits/8eb647f))
* feature; upgrade PM to 0.21 ([787e9bf](https://bitbucket.org/atlassian/atlaskit/commits/787e9bf))


* breaking; The openLeft and openRight properties of Slice objects have been renamed to openStart and openEnd
* breaking; use latest mentions and emoji components without polyfills: update editors-* docs with information about it

## 25.10.0 (2017-06-01)


* fix; focus editorView when media nodes are added to the document ([36c3e27](https://bitbucket.org/atlassian/atlaskit/commits/36c3e27))

## 25.9.0 (2017-06-01)


* fix; do not create a new paragraph when arrowUp/Down inside non-nested paragraph ([fcb405f](https://bitbucket.org/atlassian/atlaskit/commits/fcb405f))

## 25.8.0 (2017-06-01)


* fix; fixed bug that converting to hyperlink remove other marks. ([1407ac9](https://bitbucket.org/atlassian/atlaskit/commits/1407ac9))
* fix; fixed typescript ([2b1264e](https://bitbucket.org/atlassian/atlaskit/commits/2b1264e))


* feature; export colorPalette from editor-core ([b01db7c](https://bitbucket.org/atlassian/atlaskit/commits/b01db7c))

## 25.7.0 (2017-06-01)


* fix; fixed analytics tracking on hyperlink enter autoformatting ([3d6047f](https://bitbucket.org/atlassian/atlaskit/commits/3d6047f))
* fix; fixed bug that hyperlink will be converted even has a hard break between them. ([fc648dd](https://bitbucket.org/atlassian/atlaskit/commits/fc648dd))
* fix; fixed typescript. ([4215a2b](https://bitbucket.org/atlassian/atlaskit/commits/4215a2b))


* feature; error-reporting passed as a property ([3bd3827](https://bitbucket.org/atlassian/atlaskit/commits/3bd3827))

## 25.6.3 (2017-05-31)


* fix; add missing export for text-color plugin ([51659db](https://bitbucket.org/atlassian/atlaskit/commits/51659db))
* fix; cleaned up codeBlock node ([5b85e12](https://bitbucket.org/atlassian/atlaskit/commits/5b85e12))


* feature; make sure link doesnot get override when hit shift+enter or enter. ([9015fad](https://bitbucket.org/atlassian/atlaskit/commits/9015fad))

## 25.6.2 (2017-05-31)


* fix; added fix for pasting codeblock from github and bb ([e8755a1](https://bitbucket.org/atlassian/atlaskit/commits/e8755a1))
* fix; added support for pasting from Gist ([b8eede9](https://bitbucket.org/atlassian/atlaskit/commits/b8eede9))
* fix; style fix in trash icon in language picker. ([4026e3e](https://bitbucket.org/atlassian/atlaskit/commits/4026e3e))


* feature; add disabled property for ChromeExpanded ([67e8627](https://bitbucket.org/atlassian/atlaskit/commits/67e8627))

## 25.6.1 (2017-05-31)

## 25.6.0 (2017-05-31)


* feature; adding disabled flag to block-type and advance-formatting toolbar options ([cd3e48e](https://bitbucket.org/atlassian/atlaskit/commits/cd3e48e))
* feature; adding trash option in language picker floating toolbar. ([7b3d1dc](https://bitbucket.org/atlassian/atlaskit/commits/7b3d1dc))

## 25.5.0 (2017-05-30)


* fix; eD-1689 Add tooltips to image buttons ([9826c37](https://bitbucket.org/atlassian/atlaskit/commits/9826c37))
* fix; removed tech debt that create schema not using createSchmea function provided. ([b50b366](https://bitbucket.org/atlassian/atlaskit/commits/b50b366))
* fix; fixed indent. ([119a304](https://bitbucket.org/atlassian/atlaskit/commits/119a304))


* feature; convert hyperlink on shift+enter and enter ([1010f56](https://bitbucket.org/atlassian/atlaskit/commits/1010f56))

## 25.4.0 (2017-05-30)


* feature; added the same hack for all browsers ([d65de62](https://bitbucket.org/atlassian/atlaskit/commits/d65de62))
* feature; update color values and usages as per #AK-2482 ([ae8fae5](https://bitbucket.org/atlassian/atlaskit/commits/ae8fae5))

## 25.3.1 (2017-05-30)


* fix; firefox bug fix of color palette component ([3519721](https://bitbucket.org/atlassian/atlaskit/commits/3519721))
* fix; firefox toolbar icons fix when shrinking the editor width ([9a80f62](https://bitbucket.org/atlassian/atlaskit/commits/9a80f62))

## 25.3.0 (2017-05-29)


* feature; only convert link on hitting space after hyperlink. ([2c79e1a](https://bitbucket.org/atlassian/atlaskit/commits/2c79e1a))
* feature; should only convert to hyperlink on hitting space if it's not already a hyperlink. ([e40936e](https://bitbucket.org/atlassian/atlaskit/commits/e40936e))

## 25.2.1 (2017-05-29)


* fix; fix removing unfinalized files ([b2c1f1e](https://bitbucket.org/atlassian/atlaskit/commits/b2c1f1e))
* fix; phantom media bugs ([a67b136](https://bitbucket.org/atlassian/atlaskit/commits/a67b136))
* fix; remove docCompact and "compact" behaviour ([4a2644b](https://bitbucket.org/atlassian/atlaskit/commits/4a2644b))


* feature; update toDOM for server side rendering ([815d6e5](https://bitbucket.org/atlassian/atlaskit/commits/815d6e5))

## 25.2.0 (2017-05-29)

## 25.1.1 (2017-05-26)

## 25.1.0 (2017-05-26)


* fix; fix pasting from different IDEs ([5c3ec74](https://bitbucket.org/atlassian/atlaskit/commits/5c3ec74))
* fix; use latest media components for every package except editor-core: can't use react-la ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))

## 25.0.1 (2017-05-26)


* fix; fixed tests for UI components ([83d6e6a](https://bitbucket.org/atlassian/atlaskit/commits/83d6e6a))
* fix; fixed tslint in storybook ([702f9e7](https://bitbucket.org/atlassian/atlaskit/commits/702f9e7))

## 24.0.0 (2017-05-25)


* fix; fixed tslint errors ([0e618f9](https://bitbucket.org/atlassian/atlaskit/commits/0e618f9))
* fix; remove unused browserkeymap dependency. ([66c267f](https://bitbucket.org/atlassian/atlaskit/commits/66c267f))
* fix; tslist errors fixes ([178f638](https://bitbucket.org/atlassian/atlaskit/commits/178f638))


null version bump for atlaskit components. ([67b15f7](https://bitbucket.org/atlassian/atlaskit/commits/67b15f7))


* feature; added styled components to Chrome expanded and Chrome collapsed components ([5018087](https://bitbucket.org/atlassian/atlaskit/commits/5018087))
* feature; chromeExpanded styles cleanup ([1b34ab6](https://bitbucket.org/atlassian/atlaskit/commits/1b34ab6))
* feature; moved nodes to styled-componenets ([d8efd85](https://bitbucket.org/atlassian/atlaskit/commits/d8efd85))
* feature; moved typestyle to styled-components in schema nodes and marks, fixed tslint ([dc6b033](https://bitbucket.org/atlassian/atlaskit/commits/dc6b033))
* feature; moved UI components from typestyle to styled-components ([2859562](https://bitbucket.org/atlassian/atlaskit/commits/2859562))
* feature; dummy commit to mark release of editor-core. ([93ffd5a](https://bitbucket.org/atlassian/atlaskit/commits/93ffd5a))
* feature; removed typestyle from package.json ([455c1bf](https://bitbucket.org/atlassian/atlaskit/commits/455c1bf))


* breaking; Upgrading atlaskit components.

## 22.0.0 (2017-05-25)


* fix; fix UI ([d6c006d](https://bitbucket.org/atlassian/atlaskit/commits/d6c006d))
* fix; remove PositionedNode interface, pass getPos as a prop instead + restore media nodes ([5ba9939](https://bitbucket.org/atlassian/atlaskit/commits/5ba9939))
* fix; restore master behaviour for undo ([e98721a](https://bitbucket.org/atlassian/atlaskit/commits/e98721a))


* feature; new API for nodeViews containing React components ([d26748e](https://bitbucket.org/atlassian/atlaskit/commits/d26748e))


* breaking; Use getNodeViews(providerFactory, {...}) API for nodeViews. Check story changes for example usage.

## 21.1.1 (2017-05-24)


* fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))
* fix; use latest media components ([aea882a](https://bitbucket.org/atlassian/atlaskit/commits/aea882a))

## 21.1.0 (2017-05-24)

## 21.0.3 (2017-05-24)


* fix; fix Pasting link is hyperlink floating toolbar. ([16fa287](https://bitbucket.org/atlassian/atlaskit/commits/16fa287))
* fix; made inline code inclusive=true ([12d02c5](https://bitbucket.org/atlassian/atlaskit/commits/12d02c5))
* fix; mime type emitting. ([768484f](https://bitbucket.org/atlassian/atlaskit/commits/768484f))
* fix; undoing would revert to a state with temporary media id. ([660ad0a](https://bitbucket.org/atlassian/atlaskit/commits/660ad0a))


* feature; Moving Renderer to editor-core (phase-1) ([635e02b](https://bitbucket.org/atlassian/atlaskit/commits/635e02b))

## 21.0.2 (2017-05-22)


* fix; handle excludes of mark in createSchema ([bf4326a](https://bitbucket.org/atlassian/atlaskit/commits/bf4326a))

## 21.0.1 (2017-05-19)

## 21.0.0 (2017-05-18)

## 20.1.0 (2017-05-17)


* feature; making changing hyperline title more intuitive. ([81633a7](https://bitbucket.org/atlassian/atlaskit/commits/81633a7))

## 19.0.0 (2017-05-17)


* feature; add API for file upload from data url. ([b4d73cf](https://bitbucket.org/atlassian/atlaskit/commits/b4d73cf))
* feature; add colour picker plugin ([9ff8373](https://bitbucket.org/atlassian/atlaskit/commits/9ff8373))


* breaking; introduce new excludes in `code` and `link` marks

ISSUES CLOSED: ED-1581

## 17.0.0 (2017-05-17)


* fix; change emoji nodes in the editor to store a 'text' attribute instead of a 'fallback' ([ab1d6d6](https://bitbucket.org/atlassian/atlaskit/commits/ab1d6d6))
* fix; encoding and parsing of media nodes ([6a7817d](https://bitbucket.org/atlassian/atlaskit/commits/6a7817d))
* fix; make storyMediaProviderFactory a factory x2 (pass media-test-helpers as a first para ([2e68b31](https://bitbucket.org/atlassian/atlaskit/commits/2e68b31))
* fix; manually bump the major version of the core ([0891a79](https://bitbucket.org/atlassian/atlaskit/commits/0891a79))


* breaking; If an existing stored document contains a fallback attribute for an emoji node then that attribute
will be ignored on rendering.

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941
* breaking; ED-1688

ISSUES CLOSED: ED-1688

## 16.9.2 (2017-05-16)

## 16.9.1 (2017-05-16)


* fix; refactoring to remove function binding not needed. ([7dd6127](https://bitbucket.org/atlassian/atlaskit/commits/7dd6127))
* fix; use latest mediacard ([6a1a560](https://bitbucket.org/atlassian/atlaskit/commits/6a1a560))

## 16.9.0 (2017-05-16)


* fix; change emoji nodes in the editor to store a 'text' attribute instead of a 'fallback' ([5a164da](https://bitbucket.org/atlassian/atlaskit/commits/5a164da))
* fix; use media-test-helpers as a dependency, otherwise it won't be installed if editor-co ([404041d](https://bitbucket.org/atlassian/atlaskit/commits/404041d))


* feature; adding shortcut for undo-autoformatting ([6f61b78](https://bitbucket.org/atlassian/atlaskit/commits/6f61b78))


* breaking; If an existing stored document contains a fallback attribute for an emoji node then that attribute
will be ignored on rendering.

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941

## 16.8.3 (2017-05-15)


* fix; bump media card to latest major version ([4576eaa](https://bitbucket.org/atlassian/atlaskit/commits/4576eaa))

## 16.8.2 (2017-05-12)


* fix; cleaned up ([456deab](https://bitbucket.org/atlassian/atlaskit/commits/456deab))
* fix; cleanup ([1eed006](https://bitbucket.org/atlassian/atlaskit/commits/1eed006))
* fix; disable emoji button until the emoji popup is fixed ([dea398d](https://bitbucket.org/atlassian/atlaskit/commits/dea398d))
* fix; fixed mention query when editor is not in focus ([5ac5203](https://bitbucket.org/atlassian/atlaskit/commits/5ac5203))
* fix; set focus only if there was no focus before ([2b24723](https://bitbucket.org/atlassian/atlaskit/commits/2b24723))

## 16.8.1 (2017-05-11)

## 16.8.0 (2017-05-11)


* feature; reducing bundle size by updating dependencies ([4ded258](https://bitbucket.org/atlassian/atlaskit/commits/4ded258))

## 16.7.5 (2017-05-11)


* fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))
* fix; preventing unsubscribe from modifying array iterator, preventing 'unfinalized' statu ([26e42b8](https://bitbucket.org/atlassian/atlaskit/commits/26e42b8))
* fix; removing unnecessary state references, correctly spreading mediaState ([67ed91b](https://bitbucket.org/atlassian/atlaskit/commits/67ed91b))
* fix; setting mediaState immediately before subscribing to changes ([b56fa13](https://bitbucket.org/atlassian/atlaskit/commits/b56fa13))
* fix; use new mediacard selector for selected elements ([73a21fa](https://bitbucket.org/atlassian/atlaskit/commits/73a21fa))

## 16.7.3 (2017-05-10)

## 16.7.3 (2017-05-10)

## 16.7.2 (2017-05-10)

## 16.7.1 (2017-05-10)

## 16.7.0 (2017-05-09)


* fix; bump media components, use new upload view ([e6b6b1f](https://bitbucket.org/atlassian/atlaskit/commits/e6b6b1f))

## 16.6.1 (2017-05-09)


* fix; adding meaningful  atl text to images in editor. ([1083b5e](https://bitbucket.org/atlassian/atlaskit/commits/1083b5e))
* fix; fixed toolbarMention test ([b465d5c](https://bitbucket.org/atlassian/atlaskit/commits/b465d5c))
* fix; fixes a bug where code-mark was required in the schema in order for text-formatting ([a96e359](https://bitbucket.org/atlassian/atlaskit/commits/a96e359))
* fix; fixes tests in master ([4ce390a](https://bitbucket.org/atlassian/atlaskit/commits/4ce390a))

## 16.6.0 (2017-05-09)


* fix; fixed typo ([869de09](https://bitbucket.org/atlassian/atlaskit/commits/869de09))
* fix; updated title of the mention button ([4b02c62](https://bitbucket.org/atlassian/atlaskit/commits/4b02c62))


* feature; added atlassian.editor.mention.autoformatting analytics ([88a197e](https://bitbucket.org/atlassian/atlaskit/commits/88a197e))

## 16.5.0 (2017-05-09)

## 16.4.2 (2017-05-08)


* fix; make sure .focus() isn't called when editor is already focused ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))


* feature; added creation of mentions by clicking on mentions toolbar icon ([c72c45e](https://bitbucket.org/atlassian/atlaskit/commits/c72c45e))

## 16.4.1 (2017-05-08)


* fix; fixed inline code behaviour when pressing backspace ([5ba82ae](https://bitbucket.org/atlassian/atlaskit/commits/5ba82ae))


* feature; upgrade Emoji version to released version with breaking style changes ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))

## 16.4.0 (2017-05-06)


* fix; fixed language selection in code-block whith 4+ backticks ([be80b3e](https://bitbucket.org/atlassian/atlaskit/commits/be80b3e))


* feature; upgrade emoji. Remove need for style overrides. ([f2550dc](https://bitbucket.org/atlassian/atlaskit/commits/f2550dc))

## 16.3.5 (2017-05-05)


* fix; exception when removing media node with the X button. ([6372630](https://bitbucket.org/atlassian/atlaskit/commits/6372630))
* fix; first time typing @ in firefox doesn't trigger mentions ([caf9a4e](https://bitbucket.org/atlassian/atlaskit/commits/caf9a4e))


* feature; bump typestyle version ([5ac9717](https://bitbucket.org/atlassian/atlaskit/commits/5ac9717))

## 16.3.4 (2017-05-04)


* fix; tests ([52bfd82](https://bitbucket.org/atlassian/atlaskit/commits/52bfd82))

## 16.3.2 (2017-05-04)

## 16.3.2 (2017-05-03)

## 16.3.1 (2017-05-03)

## 16.2.0 (2017-05-03)


* fix; fix validate tslint commits ([728a7ee](https://bitbucket.org/atlassian/atlaskit/commits/728a7ee))

## 16.2.0 (2017-05-03)


* fix; do not dispatch transaction on blur in code-block and panel plugins ([741d5fd](https://bitbucket.org/atlassian/atlaskit/commits/741d5fd))
* fix; export default media state manager, media provider (rw) and media state from editor- ([77466f8](https://bitbucket.org/atlassian/atlaskit/commits/77466f8))
* fix; flickering of cards during picking and uploading. ([518eefc](https://bitbucket.org/atlassian/atlaskit/commits/518eefc))
* fix; harden code to run in NodeJS environment. ([cc78477](https://bitbucket.org/atlassian/atlaskit/commits/cc78477))
* fix; move unknown to complete ([d34f43a](https://bitbucket.org/atlassian/atlaskit/commits/d34f43a))
* fix; rename 'module' global to be NodeJS safe. ([f7e8bb0](https://bitbucket.org/atlassian/atlaskit/commits/f7e8bb0))
* fix; use common mediaProvider for both renderer and editor-core ([7ed6650](https://bitbucket.org/atlassian/atlaskit/commits/7ed6650))
* fix; use unknown only once ([622d1a5](https://bitbucket.org/atlassian/atlaskit/commits/622d1a5))


* feature; add helper for creating schema with order of marks and nodes preserved ([eca4720](https://bitbucket.org/atlassian/atlaskit/commits/eca4720))
* feature; add presentational attributes for media node toDOM, for static HTML rendering (e.g. ([9d43e9b](https://bitbucket.org/atlassian/atlaskit/commits/9d43e9b))

## 16.1.0 (2017-05-03)


* fix; move editor-relate media components into media-core (defaultMediaProvider, mediaStat ([c85be66](https://bitbucket.org/atlassian/atlaskit/commits/c85be66))
* fix; temporary use complete media status for uploading files ([9052812](https://bitbucket.org/atlassian/atlaskit/commits/9052812))
* fix; update hyperlink only when edititng popup is closed ([7e7ed4a](https://bitbucket.org/atlassian/atlaskit/commits/7e7ed4a))
* fix; use new media components ([a494fd5](https://bitbucket.org/atlassian/atlaskit/commits/a494fd5))

## 16.0.1 (2017-05-02)


* fix; fix changePanelType and removePanelType for fixes in panel structure. ([e2c31a9](https://bitbucket.org/atlassian/atlaskit/commits/e2c31a9))
* fix; fix that langrage picker should close if user blur it without selection language. ([8fb53fa](https://bitbucket.org/atlassian/atlaskit/commits/8fb53fa))
* fix; prevent focus of all tags in language picket except input. ([dac74e9](https://bitbucket.org/atlassian/atlaskit/commits/dac74e9))
* fix; setting value for boolean jsx attributes. ([f38e54a](https://bitbucket.org/atlassian/atlaskit/commits/f38e54a))


* feature; add support for compact behaviour, add media support to editor-hipchat, update editor-hipchat schema to one paragraph only ([f8fe04d](https://bitbucket.org/atlassian/atlaskit/commits/f8fe04d))
* feature; using atlaskit single-select component for language picker. ([3b7e94b](https://bitbucket.org/atlassian/atlaskit/commits/3b7e94b))

## 15.0.0 (2017-05-01)


* fix build errors ([7a297bd](https://bitbucket.org/atlassian/atlaskit/commits/7a297bd))


* bump editor-core version to trigger release. ([5039055](https://bitbucket.org/atlassian/atlaskit/commits/5039055))

## 15.0.0 (2017-05-01)


* fix; remove custom keymap handling for panels. ([1a48186](https://bitbucket.org/atlassian/atlaskit/commits/1a48186))


* feature; add unfinalized media state status. ([3c3a277](https://bitbucket.org/atlassian/atlaskit/commits/3c3a277))

## 15.0.0 (2017-04-28)


* fix; disable IE11 resize handles for panels. ([7c3da71](https://bitbucket.org/atlassian/atlaskit/commits/7c3da71))


* feature; media support in core, media support for editor-cq ([f0309bf](https://bitbucket.org/atlassian/atlaskit/commits/f0309bf))


* breaking; Large number of changes in editor-core, playing it safe and marking as BC break.

## 14.6.4 (2017-04-27)

## 14.6.3 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 14.6.2 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 14.6.1 (2017-04-24)


* fix; blank space after mention should only be inserted is not already present. ([4a767e7](https://bitbucket.org/atlassian/atlaskit/commits/4a767e7))


* feature; added h6 support. ([cffc40a](https://bitbucket.org/atlassian/atlaskit/commits/cffc40a))

## 14.6.0 (2017-04-24)


* fix; set default of title and alt to be null so that it does not render redundant element ([eae2e6b](https://bitbucket.org/atlassian/atlaskit/commits/eae2e6b))

## 14.5.2 (2017-04-24)


* fix; exporting LanguagePicker ([a8dbbb6](https://bitbucket.org/atlassian/atlaskit/commits/a8dbbb6))
* fix; refactor hyperlink plugin to have one input panel ([71c3db1](https://bitbucket.org/atlassian/atlaskit/commits/71c3db1))


* feature; added alt and title to image. ([d7b2d63](https://bitbucket.org/atlassian/atlaskit/commits/d7b2d63))
* feature; triple enter to exit code block. ([7ed01f7](https://bitbucket.org/atlassian/atlaskit/commits/7ed01f7))

## 14.5.1 (2017-04-21)


* fix; adding hardbreaks in panel on enter key press. ([a32ae3b](https://bitbucket.org/atlassian/atlaskit/commits/a32ae3b))

## 14.5.0 (2017-04-20)


* feature; rewinded patched version to 0.20.3 in order to fix cursor problem ([50078a1](https://bitbucket.org/atlassian/atlaskit/commits/50078a1))

## 14.4.2 (2017-04-20)


* fix; mention query and emoji query should be dismissed after hitting "space" when there's ([91573b2](https://bitbucket.org/atlassian/atlaskit/commits/91573b2))

## 14.4.1 (2017-04-20)


* fix; fixing ordering for Escape keymap callbacks execution. ([3bd6026](https://bitbucket.org/atlassian/atlaskit/commits/3bd6026))

## 14.4.0 (2017-04-20)


* fix; updated ParseRule interface in prosemirror-model ([192f793](https://bitbucket.org/atlassian/atlaskit/commits/192f793))

## 14.3.4 (2017-04-19)


* fix; hyperlink floating toolbar should be visible when user uses Cmd-K to create a link. ([dcaead6](https://bitbucket.org/atlassian/atlaskit/commits/dcaead6))
* fix; link toolbar should be visible when its clicked. ([0301955](https://bitbucket.org/atlassian/atlaskit/commits/0301955))

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)


* fix; skipped 2 bb tests repated to pasting ([22774bc](https://bitbucket.org/atlassian/atlaskit/commits/22774bc))

## 14.3.4 (2017-04-19)

## 14.3.4 (2017-04-19)


* fix; use commit for our own github repo instead of branch. ([d62dd7c](https://bitbucket.org/atlassian/atlaskit/commits/d62dd7c))
* fix; use prosemirror-view fork with commit id dependency on prosemirror-model fork ([fcd92f5](https://bitbucket.org/atlassian/atlaskit/commits/fcd92f5))


* feature; updated patches for prosemirror-view, removed unneseccaty tests for code block pastin ([18c26f4](https://bitbucket.org/atlassian/atlaskit/commits/18c26f4))

## 14.3.3 (2017-04-19)

## 14.3.2 (2017-04-19)


* fix; fix conversion of partial selection in code block when selection is towards end or i ([cf8faa7](https://bitbucket.org/atlassian/atlaskit/commits/cf8faa7))
* fix; fix empty link problem in hyperlink popup ([a5a89d2](https://bitbucket.org/atlassian/atlaskit/commits/a5a89d2))
* fix; keep focus inside editor when clicking on toolbar buttons ([eb58e21](https://bitbucket.org/atlassian/atlaskit/commits/eb58e21))
* fix; mention and emoji throws error when inserted ([c203acb](https://bitbucket.org/atlassian/atlaskit/commits/c203acb))
* fix; applied patch for prosemirror-view to fix pasting in IE11/Edge ([77c1a9c](https://bitbucket.org/atlassian/atlaskit/commits/77c1a9c))

## 14.3.1 (2017-04-18)

## 14.1.0 (2017-04-18)

## 14.1.0 (2017-04-18)

## 14.1.0 (2017-04-18)


* fix; cleanup ([9063a3c](https://bitbucket.org/atlassian/atlaskit/commits/9063a3c))
* fix; updated autoformatting to make in exclusive right after conversion ([c9311cd](https://bitbucket.org/atlassian/atlaskit/commits/c9311cd))

## 13.0.0 (2017-04-18)


* fix; fixing reges in input rule for string. ([853f0d0](https://bitbucket.org/atlassian/atlaskit/commits/853f0d0))
* fix; it should be possible to change selected lines of code block to another block type. ([db5bffb](https://bitbucket.org/atlassian/atlaskit/commits/db5bffb))
* fix; making ordered list list-item styles more specific to ensure they are not applied to ([aca7124](https://bitbucket.org/atlassian/atlaskit/commits/aca7124))
* lock version of popper.js to prevent regression. ([61a8698](https://bitbucket.org/atlassian/atlaskit/commits/61a8698))
* fix; mention and emoji needs to be added before blocktype plugin ([cee19b4](https://bitbucket.org/atlassian/atlaskit/commits/cee19b4))

## 12.0.3 (2017-04-13)

## 12.0.2 (2017-04-13)


* fix; make mono and link right exclusive, the rest - right inclusive ([d55f5c3](https://bitbucket.org/atlassian/atlaskit/commits/d55f5c3))
* fix; updated mention node to follow spec ([a97673e](https://bitbucket.org/atlassian/atlaskit/commits/a97673e))
* fix; use prosemirror-view fork without node_modules directory ([772e87a](https://bitbucket.org/atlassian/atlaskit/commits/772e87a))


* feature; add protocols to links ([2ae6a2c](https://bitbucket.org/atlassian/atlaskit/commits/2ae6a2c))


* breaking; Renamed attrs.displayName to attrs.text for mention node

ISSUES CLOSED: ED-1448

## 12.0.1 (2017-04-12)


* fix; ED-1370 removed forgotten singleton plugins. ([78737b2](https://bitbucket.org/atlassian/atlaskit/commits/78737b2))

## 11.0.0 (2017-04-12)


* fix; should not spread history plugin ([c7fb67f](https://bitbucket.org/atlassian/atlaskit/commits/c7fb67f))


* feature; removed reconfigure in plugin util ([77ef77b](https://bitbucket.org/atlassian/atlaskit/commits/77ef77b))
* feature; manually update core version. ([de54a2f](https://bitbucket.org/atlassian/atlaskit/commits/de54a2f))


* breaking; Removed singleton of plugins

## 10.8.1 (2017-04-12)


* fix; fixed codeBlock nodeSpec to pass tests ([5d7da72](https://bitbucket.org/atlassian/atlaskit/commits/5d7da72))
* fix; make sure core storybook is working with new plugin structure. ([ad25e0c](https://bitbucket.org/atlassian/atlaskit/commits/ad25e0c))
* fix; removed reconfigured in blocktype ([bb276ce](https://bitbucket.org/atlassian/atlaskit/commits/bb276ce))


* feature; BREAKING CHANGES: return plugins as an array instead of single plugin. ([32e5c6d](https://bitbucket.org/atlassian/atlaskit/commits/32e5c6d))

## 10.8.0 (2017-04-12)

## 10.7.1 (2017-04-12)


* fix; add check if subsup enable to ToolbarAdvancedTextFormatting ([31ccd56](https://bitbucket.org/atlassian/atlaskit/commits/31ccd56))
* fix; updating refs mechanism ([c4c849b](https://bitbucket.org/atlassian/atlaskit/commits/c4c849b))

## 10.7.0 (2017-04-11)

## 10.6.1 (2017-04-11)


* fix; removed supportedLanguages attr from codeBlock nodeSpec ([2cc1082](https://bitbucket.org/atlassian/atlaskit/commits/2cc1082))

## 10.6.0 (2017-04-11)

## 10.5.3 (2017-04-11)

## 10.5.2 (2017-04-11)

## 10.5.1 (2017-04-11)


* fix; add style for selected mention node ([81a4bcb](https://bitbucket.org/atlassian/atlaskit/commits/81a4bcb))
* fix; ([10d2631](https://bitbucket.org/atlassian/atlaskit/commits/10d2631))
* fix; nesting ordered list styles to be applied upto depth 9. ([9a3a818](https://bitbucket.org/atlassian/atlaskit/commits/9a3a818))
* fix; turn off code block fencing inside code block ([a2e12ed](https://bitbucket.org/atlassian/atlaskit/commits/a2e12ed))


* feature; adding styles for nested ordered lists. ([3cda0d6](https://bitbucket.org/atlassian/atlaskit/commits/3cda0d6))

## 10.5.0 (2017-04-10)


* feature; add ability to skip {} in test with backslash ([e763a5e](https://bitbucket.org/atlassian/atlaskit/commits/e763a5e))

## 10.4.6 (2017-04-10)


* fix; export NodeView from prosemirror declarations from editor-core ([444869a](https://bitbucket.org/atlassian/atlaskit/commits/444869a))

## 10.4.5 (2017-04-10)


* fix; emojiPlugin throws an error if there's no code mark in schema ([b363742](https://bitbucket.org/atlassian/atlaskit/commits/b363742))

## 10.4.4 (2017-04-10)


* fix; disable inputrules inside code ([8b65767](https://bitbucket.org/atlassian/atlaskit/commits/8b65767))

## 10.4.3 (2017-04-07)

## 10.4.2 (2017-04-07)


* fix; fix css override for emoji for compatibility with Bitbucket ([2a426c5](https://bitbucket.org/atlassian/atlaskit/commits/2a426c5))

## 10.4.1 (2017-04-06)


* fix; fix toggling for ordered list items. ([40182ec](https://bitbucket.org/atlassian/atlaskit/commits/40182ec))
* fix; fix un-toggling of nested lists. ([813f8ec](https://bitbucket.org/atlassian/atlaskit/commits/813f8ec))
* fix; removed override of paste function. added missing analytics for code autoformat ([d97d57c](https://bitbucket.org/atlassian/atlaskit/commits/d97d57c))


* feature; added supportedLanguages to codeblock node as attribute, filtering languages in dro ([3025754](https://bitbucket.org/atlassian/atlaskit/commits/3025754))

## 10.4.0 (2017-04-06)


* fix; add superscript/subscript toolbars to AdvancedTextFormatting ([02cc810](https://bitbucket.org/atlassian/atlaskit/commits/02cc810))
* fix; removed spaces in languageList map to make tests pass ([f7a4b5d](https://bitbucket.org/atlassian/atlaskit/commits/f7a4b5d))

## 10.3.0 (2017-04-06)


* feature; added support for languages used in Confluence ([a49a987](https://bitbucket.org/atlassian/atlaskit/commits/a49a987))

## 10.2.1 (2017-04-06)


* fix; align margins of paragraphs inside lists to list item margins. ([478840b](https://bitbucket.org/atlassian/atlaskit/commits/478840b))
* fix; fix clear-formatting when selection is empty and at the end of a block. ([6db9454](https://bitbucket.org/atlassian/atlaskit/commits/6db9454))
* fix; fixed bug that image, hr are not selectable. ([919c8e3](https://bitbucket.org/atlassian/atlaskit/commits/919c8e3))
* fix; moved removeStoredMarks in the end of the transaction chain ([318b57e](https://bitbucket.org/atlassian/atlaskit/commits/318b57e))


* feature; enter key-press on an empty nested list item should create a list item in parent li ([f1d14cc](https://bitbucket.org/atlassian/atlaskit/commits/f1d14cc))
* feature; mentions lozenge checks if user data has nickname and renders if present ([7be8bbe](https://bitbucket.org/atlassian/atlaskit/commits/7be8bbe))

## 10.1.0 (2017-04-05)

## 10.1.0 (2017-04-05)


* fix; added more comments and updated addMark in text-formatting ([9d98cc1](https://bitbucket.org/atlassian/atlaskit/commits/9d98cc1))
* fix; fix mention picker randomly jumps if attached above mention query ([0b733df](https://bitbucket.org/atlassian/atlaskit/commits/0b733df))
* fix; use Emoji typeahead count() available in 13.1.0 ([dfce4a2](https://bitbucket.org/atlassian/atlaskit/commits/dfce4a2))


* feature; fix space/enter special cases in emoji typeahead. Reintroduce missing emoji tests. ([8c1e7ba](https://bitbucket.org/atlassian/atlaskit/commits/8c1e7ba))
* feature; port current emoji editor support to new prosemirror ([bfebd34](https://bitbucket.org/atlassian/atlaskit/commits/bfebd34))
* feature; upgrade Emoji to latest, supporting latest storage format. ([813de18](https://bitbucket.org/atlassian/atlaskit/commits/813de18))
* feature; updated package.json to use Prosemirror v.20.1 ([06a039b](https://bitbucket.org/atlassian/atlaskit/commits/06a039b))

## 8.0.0 (2017-04-04)


* fix; fixes for IE for image-uploader plugin ([6236dea](https://bitbucket.org/atlassian/atlaskit/commits/6236dea))
* fix; removed prosemirror dependency from package.json ([d65b5b6](https://bitbucket.org/atlassian/atlaskit/commits/d65b5b6))


* feature; BREAKING CHANGE: upgraded prosemirror to 0.19.* ([a435da9](https://bitbucket.org/atlassian/atlaskit/commits/a435da9))

## 7.6.1 (2017-03-31)


* fix; bumped mentions in editor-core ([049a7b3](https://bitbucket.org/atlassian/atlaskit/commits/049a7b3))

## 7.6.0 (2017-03-23)


* feature; use atlaskit z-index variables to define z-index for floating panels ([19d565a](https://bitbucket.org/atlassian/atlaskit/commits/19d565a))

## 7.5.1 (2017-03-22)

## 7.5.1 (2017-03-22)


* fix; fix default for variation, and fix emoji tests in editor-core ([47f2ded](https://bitbucket.org/atlassian/atlaskit/commits/47f2ded))

## 7.4.0 (2017-03-21)

## 7.4.0 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; remove redundant dependencies and replace ak-* -> [@atlaskit](https://github.com/atlaskit)/* ([2ef4127](https://bitbucket.org/atlassian/atlaskit/commits/2ef4127))

## 7.3.0 (2017-03-21)


* fix; ensure variation is a number or undefined when passed to ResourcedEmoji ([a3a5459](https://bitbucket.org/atlassian/atlaskit/commits/a3a5459))


* feature; support emojis based only on a shortcut (legacy emoji support) ([78ecbab](https://bitbucket.org/atlassian/atlaskit/commits/78ecbab))

## 7.2.0 (2017-03-20)

## 7.1.0 (2017-03-20)

## 7.0.1 (2017-03-20)


* feature; use popper to position mention picker ([e9721d4](https://bitbucket.org/atlassian/atlaskit/commits/e9721d4))

## 6.0.0 (2017-03-20)


* fix; emojiProvider should be optional in Chrome ([6ea3d4c](https://bitbucket.org/atlassian/atlaskit/commits/6ea3d4c))
* fix; stop using attr for EmojiProvider. Fix styling for emoji placeholder. ([16e5c7f](https://bitbucket.org/atlassian/atlaskit/commits/16e5c7f))
* fix; use Emoji types where possible in editor-core ([ef13260](https://bitbucket.org/atlassian/atlaskit/commits/ef13260))


* feature; update editor-core to use asynchronous emojis. ([025c8a7](https://bitbucket.org/atlassian/atlaskit/commits/025c8a7))
* feature; bump editor-core version to stop linking in atlaskit build due to breaking changes. ([ef1c904](https://bitbucket.org/atlassian/atlaskit/commits/ef1c904))


* breaking; Configuration for Emoji is not backward compatible and will need to be updated.

ISSUES CLOSED: FS-781

## 5.2.0 (2017-03-17)

## 5.1.1 (2017-03-17)


* fix; fixing redo keymapping for mac from Cmd-Shift-Y to Cmd-Shift-Z. ([afac345](https://bitbucket.org/atlassian/atlaskit/commits/afac345))


* feature; update behavior of code to match with the spec ([9db0ae5](https://bitbucket.org/atlassian/atlaskit/commits/9db0ae5))

## 5.1.0 (2017-03-16)


* feature; don't show advanced text formatting button if we don't have anything to draw there ([7f1f008](https://bitbucket.org/atlassian/atlaskit/commits/7f1f008))

## 4.0.0 (2017-03-15)


* fix; when converting multiple blocks to code block a single code block should get generat ([53a0f2d](https://bitbucket.org/atlassian/atlaskit/commits/53a0f2d))


null rename mono to code ([1084700](https://bitbucket.org/atlassian/atlaskit/commits/1084700))


* breaking; Removed mono mark in favour of code mark

## 3.10.0 (2017-03-15)

## 3.9.2 (2017-03-15)

## 3.9.1 (2017-03-15)

## 3.8.0 (2017-03-14)

## 3.8.0 (2017-03-14)


* fix; update the way editor-core exposes test-helpers and types ([f756f11](https://bitbucket.org/atlassian/atlaskit/commits/f756f11))

## 3.7.0 (2017-03-14)

## 3.6.3 (2017-03-14)


* fix; fix prosemirror proxy type info in editor-core ([fbb65f2](https://bitbucket.org/atlassian/atlaskit/commits/fbb65f2))

## 3.6.2 (2017-03-13)

## 3.6.1 (2017-03-13)


* fix; fix DND/Paste behaviour in Safari, fix errors in IE ([fa15767](https://bitbucket.org/atlassian/atlaskit/commits/fa15767))
* fix; add missing type info in editor-core ([025fa29](https://bitbucket.org/atlassian/atlaskit/commits/025fa29))


* feature; adding clear-formatting option to advance toolbar formatting dropdown and clear-for ([2149b59](https://bitbucket.org/atlassian/atlaskit/commits/2149b59))

## 3.6.0 (2017-03-13)


* fix; add missing key prop for ToolbarBlockType ([94dd489](https://bitbucket.org/atlassian/atlaskit/commits/94dd489))
* fix; revert the refactoring in ToolbarBlockType to fix broken unit test cases. ([efa7cff](https://bitbucket.org/atlassian/atlaskit/commits/efa7cff))


* feature; adding keyboard mapping for link. ([842c8dc](https://bitbucket.org/atlassian/atlaskit/commits/842c8dc))
* feature; dummy commit to mark a release in editor-core. ([8b50189](https://bitbucket.org/atlassian/atlaskit/commits/8b50189))

## 3.5.0 (2017-03-09)


* fix; restrict 'heading' node to make link the only allowed mark in the JSON schema. ([3278459](https://bitbucket.org/atlassian/atlaskit/commits/3278459))


* feature; add 'code' mark to the JSON schema. ([c3b1f1f](https://bitbucket.org/atlassian/atlaskit/commits/c3b1f1f))
* feature; adding blank space at the end when adding monospace using input rules. ([1ad0b7b](https://bitbucket.org/atlassian/atlaskit/commits/1ad0b7b))

## 3.4.0 (2017-03-08)

## 3.3.1 (2017-03-07)

## 3.3.0 (2017-03-07)


* fix; commenting out breaking unit test cases. ([a916441](https://bitbucket.org/atlassian/atlaskit/commits/a916441))
* fix; remove 'image_node' from the JSON schema ([8e03f06](https://bitbucket.org/atlassian/atlaskit/commits/8e03f06))
* fix; remove un-necessary variable assignment. ([89e22ad](https://bitbucket.org/atlassian/atlaskit/commits/89e22ad))
* fix; update media node spec. ([b04daf0](https://bitbucket.org/atlassian/atlaskit/commits/b04daf0))

## 3.2.5 (2017-03-07)

## 3.2.4 (2017-03-07)


* fix; prevent setting selection outside of document ([bb500a1](https://bitbucket.org/atlassian/atlaskit/commits/bb500a1))


* Add JSON schema for v1 document structure. ([6dd3ab7](https://bitbucket.org/atlassian/atlaskit/commits/6dd3ab7))

## 3.2.3 (2017-03-07)


* fix; fixes blowing up the editor when it's detached from dom ([1416403](https://bitbucket.org/atlassian/atlaskit/commits/1416403))

## 3.2.2 (2017-03-06)

## 3.2.1 (2017-03-06)


* fix; cleanup ([c07f305](https://bitbucket.org/atlassian/atlaskit/commits/c07f305))
* fix; corrected variable name ([6034a00](https://bitbucket.org/atlassian/atlaskit/commits/6034a00))


* feature; completed changes for hyperlink functionality. ([bc8bd99](https://bitbucket.org/atlassian/atlaskit/commits/bc8bd99))

## 3.2.0 (2017-03-06)


* fix; fixes unlink with 2 links in the document ([ad346c5](https://bitbucket.org/atlassian/atlaskit/commits/ad346c5))


* feature; bumping the [@atlaskit](https://github.com/atlaskit)/mention dependency ([ed78e82](https://bitbucket.org/atlassian/atlaskit/commits/ed78e82))

## 3.1.0 (2017-03-06)


* fix; changing redo shortcut for MAC to Cmd-Shift-Y and for Windows to Ctrl-Y. ([c480e46](https://bitbucket.org/atlassian/atlaskit/commits/c480e46))
* fix; reduce spacing between formatting bar buttons to 4px. ([e14c0cc](https://bitbucket.org/atlassian/atlaskit/commits/e14c0cc))


* feature; changing key-map for redo to Ctrl-Shift-Y. ([0eff95c](https://bitbucket.org/atlassian/atlaskit/commits/0eff95c))
* feature; replace ak-* with [@atlaskit](https://github.com/atlaskit)/* packages in editor-core ([e5abf88](https://bitbucket.org/atlassian/atlaskit/commits/e5abf88))

## 2.0.0 (2017-03-02)


* fix; updating media-core ([9d01b05](https://bitbucket.org/atlassian/atlaskit/commits/9d01b05))


null Changing the way editor-core and test-helper are built ([95490c7](https://bitbucket.org/atlassian/atlaskit/commits/95490c7))


* breaking; importing test-helper like so "import { something } from @atlaskit/editor-core/test-helper" will no longer work. Now it requires imports to be written like so: "import { something } from @atlaskit/editor-core/src/test-helper"

ISSUES CLOSED: FAB-2606

## 1.20.0 (2017-03-02)

## 1.19.4 (2017-03-01)


* fix; fix newest editor-core errors in editor-desktop ([2a17e90](https://bitbucket.org/atlassian/atlaskit/commits/2a17e90))


* feature; use [@atlaskit](https://github.com/atlaskit)/emoji instead of ak-emoji in editor-core ([5aa5b38](https://bitbucket.org/atlassian/atlaskit/commits/5aa5b38))

## 1.19.3 (2017-02-28)


* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 1.19.1 (2017-02-28)


* fix; dummy commit to fix broken stories and missing registry pages ([a31e92a](https://bitbucket.org/atlassian/atlaskit/commits/a31e92a))

## 1.19.1 (2017-02-28)


* fix; dummy commit to release stories for components ([a105c02](https://bitbucket.org/atlassian/atlaskit/commits/a105c02))

## 1.19.0 (2017-02-28)

## 1.18.1 (2017-02-28)

## 1.18.0 (2017-02-27)


* fix; change in hyperlink plugin to add missing state variable toolbarVisible. ([c261e6f](https://bitbucket.org/atlassian/atlaskit/commits/c261e6f))


* feature; adding small arrow to advance text styling dropwodn menu trigger. ([0f728d9](https://bitbucket.org/atlassian/atlaskit/commits/0f728d9))

## 1.17.2 (2017-02-27)


* another cleanup ([e6d086e](https://bitbucket.org/atlassian/atlaskit/commits/e6d086e))
* cleanup ([060c9a7](https://bitbucket.org/atlassian/atlaskit/commits/060c9a7))
* undo fix in markdown-inputrules ([39e105b](https://bitbucket.org/atlassian/atlaskit/commits/39e105b))
* undo with Cmd+Z for IE11 fix ([be45a6c](https://bitbucket.org/atlassian/atlaskit/commits/be45a6c))
* updated undo when pasting a content ([a6cd5f3](https://bitbucket.org/atlassian/atlaskit/commits/a6cd5f3))
* fix; fixed bug that up and down not working in lists ([e9efd74](https://bitbucket.org/atlassian/atlaskit/commits/e9efd74))


* feature; Remove plugins update call for Panel, Hyperlink and Code-block when editor is focused ([dd36501](https://bitbucket.org/atlassian/atlaskit/commits/dd36501))
* updated dependency version ([b192339](https://bitbucket.org/atlassian/atlaskit/commits/b192339))

## 1.17.1 (2017-02-23)

## 1.17.0 (2017-02-23)


* Position tooltip for ToolbarBlock and AdcancedTextFormatting closer to the parent ([a7d42ac](https://bitbucket.org/atlassian/atlaskit/commits/a7d42ac))
* version imports and exports. ([e99a324](https://bitbucket.org/atlassian/atlaskit/commits/e99a324))

## 1.16.0 (2017-02-22)


* inheritate font style from BB ([35467c0](https://bitbucket.org/atlassian/atlaskit/commits/35467c0))

## 1.15.4 (2017-02-22)


* autoconversion of code block in a nested structure ([ed8d65a](https://bitbucket.org/atlassian/atlaskit/commits/ed8d65a))
* cleanup ([6dead5a](https://bitbucket.org/atlassian/atlaskit/commits/6dead5a))


* Allow append an image on text selection or node selection. ([e86fca5](https://bitbucket.org/atlassian/atlaskit/commits/e86fca5))
* Disable hyperlink button if hyperlink is not compatible with current node. ([567e6d1](https://bitbucket.org/atlassian/atlaskit/commits/567e6d1))
* Hide and show image icon when it's available to be insert or not. ([6e2bec0](https://bitbucket.org/atlassian/atlaskit/commits/6e2bec0))

## 1.15.3 (2017-02-21)


* Fix visual regression: restore margins between ToolbarButtons ([6c23197](https://bitbucket.org/atlassian/atlaskit/commits/6c23197))

## 1.15.2 (2017-02-20)


* fix; use correctly scoped package names in npm docs ([91dbd2f](https://bitbucket.org/atlassian/atlaskit/commits/91dbd2f))
* Use atlaskit tooltips instead of browser native tooltips ([d0018eb](https://bitbucket.org/atlassian/atlaskit/commits/d0018eb))
* fix; Fixed bug that there is a border for code block in IE11. ([8748634](https://bitbucket.org/atlassian/atlaskit/commits/8748634))

## 1.15.1 (2017-02-20)

## 1.15.0 (2017-02-20)

## 1.14.0 (2017-02-19)


* fix; Fixed bug that converting to code block when text does not start with fence ([7f40722](https://bitbucket.org/atlassian/atlaskit/commits/7f40722))
* fix; Hyper link toolbar should not disappear as user starts typing in toolbar input. ([e60b43b](https://bitbucket.org/atlassian/atlaskit/commits/e60b43b))
* fix; Panel subscribers should not be invoked for a dom event in editor which is not inside ([94bf5d8](https://bitbucket.org/atlassian/atlaskit/commits/94bf5d8))

## 1.13.2 (2017-02-17)


* add component version as API, upgrade cmps to [@ak](https://github.com/ak)/editor-core, send pkg and core version when ([e3d4654](https://bitbucket.org/atlassian/atlaskit/commits/e3d4654))

## 1.13.1 (2017-02-16)


* fix; Bumping mention to latest version ([81e5d34](https://bitbucket.org/atlassian/atlaskit/commits/81e5d34))


* feature; update code block with formatted language. ([d679009](https://bitbucket.org/atlassian/atlaskit/commits/d679009))

## 1.13.0 (2017-02-16)


* feature; Added analytics track for fence language format. ([683e692](https://bitbucket.org/atlassian/atlaskit/commits/683e692))

## 1.12.1 (2017-02-16)


* feature; Allow user to input language using fence code format. ([58639da](https://bitbucket.org/atlassian/atlaskit/commits/58639da))

## 1.4.0 (2017-02-16)


* fix; Use prosemirror fork in editor with backported fix for not editable nodes ([2ab7015](https://bitbucket.org/atlassian/atlaskit/commits/2ab7015))
* fix; Exports IsScopedToCloudClientId type from src/media ([c287554](https://bitbucket.org/atlassian/atlaskit/commits/c287554))

## 1.4.0 (2017-02-16)

## 1.4.0 (2017-02-16)

## 1.4.0 (2017-02-16)


* fix; Fix bug that cannot create new p if only contains mention. ([b0f18c2](https://bitbucket.org/atlassian/atlaskit/commits/b0f18c2))

## 1.4.0 (2017-02-15)


* Bumping mention version ([5eab5b2](https://bitbucket.org/atlassian/atlaskit/commits/5eab5b2))
* Fixes styling of mention-node ([bb1a878](https://bitbucket.org/atlassian/atlaskit/commits/bb1a878))
* Mentions shouldn't break on two lines ([867b873](https://bitbucket.org/atlassian/atlaskit/commits/867b873))
* Updating dependencies after rebasing ([978f11b](https://bitbucket.org/atlassian/atlaskit/commits/978f11b))


* feature; Allow triple ticks and enter to create code block ([bb04293](https://bitbucket.org/atlassian/atlaskit/commits/bb04293))
* Improving mention plugin ([e93e57e](https://bitbucket.org/atlassian/atlaskit/commits/e93e57e))

## 1.4.0 (2017-02-15)


* Link tooltip position is broken ([e155079](https://bitbucket.org/atlassian/atlaskit/commits/e155079))


* feature; Advance text formatting button should be disabled if current selection is code block. ([9b51b63](https://bitbucket.org/atlassian/atlaskit/commits/9b51b63))

## 1.4.0 (2017-02-15)

## 1.4.0 (2017-02-15)


* fix; Removing blur handling from mention picker. ([fb97160](https://bitbucket.org/atlassian/atlaskit/commits/fb97160))

## 1.4.0 (2017-02-15)


* Cursor blinks in IE even if it's under ToolbarBlockType ([5bc498f](https://bitbucket.org/atlassian/atlaskit/commits/5bc498f))


* feature; Changes in hyperlink and code-block floating toolbars to hide them when editor is blu ([d7ed561](https://bitbucket.org/atlassian/atlaskit/commits/d7ed561))
* feature; Language picker should disappear when editor is blur. ([b0a4417](https://bitbucket.org/atlassian/atlaskit/commits/b0a4417))
* feature; Mention to dismiss when editor is blur. ([78b394f](https://bitbucket.org/atlassian/atlaskit/commits/78b394f))
* feature; Added alias to language list. ([3140001](https://bitbucket.org/atlassian/atlaskit/commits/3140001))

## 1.3.1 (2017-02-14)

## 1.3.1 (2017-02-14)


* Load clientside JS for JIRA issue collector only on feedback button click ([8661b3b](https://bitbucket.org/atlassian/atlaskit/commits/8661b3b))
* Remove modal-dialog dependency for editor-core ([22c2248](https://bitbucket.org/atlassian/atlaskit/commits/22c2248))
* Update editor-core test: add jQuery for feedback ([dd7e181](https://bitbucket.org/atlassian/atlaskit/commits/dd7e181))
* Use JIRA issue collector instead of wufoo ([407f234](https://bitbucket.org/atlassian/atlaskit/commits/407f234))
* fix; add comma back. ([139c43b](https://bitbucket.org/atlassian/atlaskit/commits/139c43b))
* Use spinner in ToolbarFeedback while JIRA issue collector has not been fully loaded ([674f772](https://bitbucket.org/atlassian/atlaskit/commits/674f772))


* feature; make sure up and down work with non test block nested ([fe0e675](https://bitbucket.org/atlassian/atlaskit/commits/fe0e675))
* feature; Panel floating toolbar should disappear when editor is blur. ([3850610](https://bitbucket.org/atlassian/atlaskit/commits/3850610))
* feature; up and down should create paragraph and have right block type shown ([82dbe30](https://bitbucket.org/atlassian/atlaskit/commits/82dbe30))

## 1.3.0 (2017-02-13)


* feature; add EditorServicesConfig and media related interfaces. ([4ac9ea6](https://bitbucket.org/atlassian/atlaskit/commits/4ac9ea6))
* feature; Make sure up and down works on non text block. ([2860417](https://bitbucket.org/atlassian/atlaskit/commits/2860417))
* feature; Should not create a new p if empty text content ([2d26463](https://bitbucket.org/atlassian/atlaskit/commits/2d26463))

## 1.2.3 (2017-02-13)

## 1.2.3 (2017-02-13)


* Restore FloatingToolbar component of editor-core ([d6d07c8](https://bitbucket.org/atlassian/atlaskit/commits/d6d07c8))
* Use modal-dialog instead of FloatingToolbar for feedback panel ([eae6d8c](https://bitbucket.org/atlassian/atlaskit/commits/eae6d8c))


* feature; Removed double enter to exit code block ([2b21126](https://bitbucket.org/atlassian/atlaskit/commits/2b21126))

## 1.2.2 (2017-02-10)

## 1.2.1 (2017-02-10)


* fix; Fixes typing in the beginning of the link becomes a part of a link ([a873987](https://bitbucket.org/atlassian/atlaskit/commits/a873987))
* fix; Fixing styles of selected option in panel floating toolbar. ([40adb05](https://bitbucket.org/atlassian/atlaskit/commits/40adb05))


* feature; add universal Editor config types. ([9bcbe3f](https://bitbucket.org/atlassian/atlaskit/commits/9bcbe3f))
* feature; improve experience of code block. Implementation from Jyoti. ([0f07a6c](https://bitbucket.org/atlassian/atlaskit/commits/0f07a6c))


null Removed redundant comments code. ([66cdc26](https://bitbucket.org/atlassian/atlaskit/commits/66cdc26))

## 1.2.0 (2017-02-09)


* fix; switch some editor-core deps to [@atlaskit](https://github.com/atlaskit)/ ([34337fa](https://bitbucket.org/atlassian/atlaskit/commits/34337fa))
* fix; Added back missing panel changes. ([cbe9e44](https://bitbucket.org/atlassian/atlaskit/commits/cbe9e44))
* fix; Fixing hover style of icons in panel floating toolbar. ([3c74821](https://bitbucket.org/atlassian/atlaskit/commits/3c74821))
* fix; Toolbar dropdown for advance test formatting options should close when an option is cl ([86711ca](https://bitbucket.org/atlassian/atlaskit/commits/86711ca))


* feature; Moveup to create a new paragraph. ([3f6a62e](https://bitbucket.org/atlassian/atlaskit/commits/3f6a62e))

## 1.1.3 (2017-02-08)


* Horizontal scrollbar in IE11/Safari for FloatingToolbar ([219e763](https://bitbucket.org/atlassian/atlaskit/commits/219e763))

## 1.1.2 (2017-02-08)


* Disabling hyperlink detection on paste ([98d20cd](https://bitbucket.org/atlassian/atlaskit/commits/98d20cd))

## 1.1.1 (2017-02-07)


* feature; arrow down will create a new line below ([6aadf7d](https://bitbucket.org/atlassian/atlaskit/commits/6aadf7d))
* feature; Changes in floating toolbar for panels. ([8dcbb60](https://bitbucket.org/atlassian/atlaskit/commits/8dcbb60))
* feature; Create new paragraph on only one level up. ([f99952a](https://bitbucket.org/atlassian/atlaskit/commits/f99952a))
* feature; Improving the user experience of floating panel toolbar. ([a90b139](https://bitbucket.org/atlassian/atlaskit/commits/a90b139))
* feature; Moveup to create a new paragraph. ([46bb341](https://bitbucket.org/atlassian/atlaskit/commits/46bb341))

## 1.1.0 (2017-02-07)


* Horizontal scrollbar in IE11 for FloatingToolbar ([e2dd757](https://bitbucket.org/atlassian/atlaskit/commits/e2dd757))
* fix; Fixes disappearing of mention mark on iOS ([978804b](https://bitbucket.org/atlassian/atlaskit/commits/978804b))


* feature; improve experience of code block floating toolbar. ([abf7f17](https://bitbucket.org/atlassian/atlaskit/commits/abf7f17))
* feature; Moveup to create a new paragraph. ([8b5616f](https://bitbucket.org/atlassian/atlaskit/commits/8b5616f))

## 1.0.6 (2017-02-06)


* fix; fix failing test. ([811002b](https://bitbucket.org/atlassian/atlaskit/commits/811002b))
* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))


* feature; Adding panel feature to editor-core. ([900c3db](https://bitbucket.org/atlassian/atlaskit/commits/900c3db))
* feature; Adding toolbar option for monospace and strikethrough. ([ed44fb0](https://bitbucket.org/atlassian/atlaskit/commits/ed44fb0))
* feature; More changes to toolbar option of monospace and strikethrough. ([43aaf91](https://bitbucket.org/atlassian/atlaskit/commits/43aaf91))
