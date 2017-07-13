# @atlaskit/renderer

## Unreleased

## 5.4.2 (2017-07-11)


* fix; bump emoji to the latest version ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

## 5.4.1 (2017-07-04)


* fix; edit blockquote styling ([075465d](https://bitbucket.org/atlassian/atlaskit/commits/075465d))

## 5.4.0 (2017-06-30)


* feature; updated emoji dependency in renderer to have tooltipped emoji ([f92a2b2](https://bitbucket.org/atlassian/atlaskit/commits/f92a2b2))

## 5.3.0 (2017-06-30)


* feature; use full-fit resizeMode for Cards ([6d33627](https://bitbucket.org/atlassian/atlaskit/commits/6d33627))
* feature; use right resizeMode on MediaGroup nodes ([73087bb](https://bitbucket.org/atlassian/atlaskit/commits/73087bb))

## 5.2.0 (2017-06-26)


* feature; add applicationCard ([f83e94f](https://bitbucket.org/atlassian/atlaskit/commits/f83e94f))

## 5.1.0 (2017-06-23)


* feature; added accessLevel attr to mention node ([acc3001](https://bitbucket.org/atlassian/atlaskit/commits/acc3001))

## 5.0.2 (2017-06-21)


* fix; bumping code component ([1c7ee05](https://bitbucket.org/atlassian/atlaskit/commits/1c7ee05))

## 5.0.1 (2017-06-19)


* fix; remove numOfCards prop, always render FilmStripNavigator ([bdc95cb](https://bitbucket.org/atlassian/atlaskit/commits/bdc95cb))

## 5.0.0 (2017-06-14)


* feature; export interfaces/implementation of providers from mention, emoji and media ([38243da](https://bitbucket.org/atlassian/atlaskit/commits/38243da))
* feature; upgrade mentions and emoji in the renderer ([21560ab](https://bitbucket.org/atlassian/atlaskit/commits/21560ab))


* breaking; Upgrade requires including appropriate polyfills in bundling products. See USAGE.md

ISSUES CLOSED: FS-1029

## 4.2.2 (2017-05-31)

## 4.2.1 (2017-05-30)


* fix; add margin between sibling media groups ([4a30392](https://bitbucket.org/atlassian/atlaskit/commits/4a30392))
* fix; fix multiple spaces and tabs rendering ([a53d254](https://bitbucket.org/atlassian/atlaskit/commits/a53d254))

## 4.2.0 (2017-05-26)


* feature; adding code/codeBlock support to renderer/editor-hipchat ([bc9d6bf](https://bitbucket.org/atlassian/atlaskit/commits/bc9d6bf))

## 4.1.3 (2017-05-26)


* fix; use latest media components for every package except editor-core: can't use react-la ([5898695](https://bitbucket.org/atlassian/atlaskit/commits/5898695))

## 4.1.2 (2017-05-25)


* fix; defaulting to rendering paragraphs for unknown block-level nodes ([43adb4b](https://bitbucket.org/atlassian/atlaskit/commits/43adb4b))

## 4.1.1 (2017-05-24)


* fix; aligning dependencies ([68f0dc0](https://bitbucket.org/atlassian/atlaskit/commits/68f0dc0))

## 4.1.0 (2017-05-24)

## 4.0.0 (2017-05-23)


* fix; handle whitespaces (space & tab) in renderer ([fcfc4d4](https://bitbucket.org/atlassian/atlaskit/commits/fcfc4d4))


* feature; add rule support in renderer ([06f95cb](https://bitbucket.org/atlassian/atlaskit/commits/06f95cb))

## 3.4.0 (2017-05-22)


* feature; add panel support in renderer ([da2cf36](https://bitbucket.org/atlassian/atlaskit/commits/da2cf36))

## 3.3.0 (2017-05-19)


* feature; add blockquote support in renderer ([96cce0d](https://bitbucket.org/atlassian/atlaskit/commits/96cce0d))

## 3.2.0 (2017-05-19)


* feature; add bulletList, orderedList & listItem support in renderer ([805f971](https://bitbucket.org/atlassian/atlaskit/commits/805f971))
* feature; deal with a next text attribute in emoji storage format for the renderer ([76ad933](https://bitbucket.org/atlassian/atlaskit/commits/76ad933))
* feature; renderer handles storage format where emoji's have a text attribute instead of fall ([c021526](https://bitbucket.org/atlassian/atlaskit/commits/c021526))


* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941

## 3.1.1 (2017-05-17)

## 3.1.0 (2017-05-17)


* fix; render temporary media nodes ([ded8c7c](https://bitbucket.org/atlassian/atlaskit/commits/ded8c7c))


* feature; add heading support to renderer ([8ea70ab](https://bitbucket.org/atlassian/atlaskit/commits/8ea70ab))

## 3.0.0 (2017-05-17)


* fix; fix tslint errors ([1c07711](https://bitbucket.org/atlassian/atlaskit/commits/1c07711))
* fix; open links in new window ([78db544](https://bitbucket.org/atlassian/atlaskit/commits/78db544))
* fix; use new media components ([401c889](https://bitbucket.org/atlassian/atlaskit/commits/401c889))


* feature; renderer handles storage format where emoji's have a text attribute instead of fall ([57141c2](https://bitbucket.org/atlassian/atlaskit/commits/57141c2))


* breaking; ED-1690

ISSUES CLOSED: ED-1690
* breaking; Existing storage format will still work but if there is no emoji provider there may be nothing to
display (i.e. no fallback text)

ISSUES CLOSED: https://product-fabric.atlassian.net/browse/FS-941

## 2.1.2 (2017-05-11)


* fix; adding click handler back in to media cards ([0314d98](https://bitbucket.org/atlassian/atlaskit/commits/0314d98))
* fix; fixing broken editor-core test, rendering CardView if media node id starts with "tem ([ad99313](https://bitbucket.org/atlassian/atlaskit/commits/ad99313))

## 2.1.1 (2017-05-10)

## 2.1.0 (2017-05-09)


* fix; upgrade the media component state from mediastate immediately ([4fcfb13](https://bitbucket.org/atlassian/atlaskit/commits/4fcfb13))
* fix; show loading in sample emoji data. ([cc7bcf0](https://bitbucket.org/atlassian/atlaskit/commits/cc7bcf0))


* feature; upgrade Emoji version to released version with breaking style changes ([3a42593](https://bitbucket.org/atlassian/atlaskit/commits/3a42593))
* feature; upgrade emoji. Remove need for style overrides. ([73356fc](https://bitbucket.org/atlassian/atlaskit/commits/73356fc))

## 2.0.0 (2017-05-04)


* fix; upgrade media components of renderer ([c191971](https://bitbucket.org/atlassian/atlaskit/commits/c191971))


* breaking; in renderer properties and document structure

Renderer component property

"mediaProvider" should now be an instance of the latest @atlaskit/media-core MediaProvider (i.e. it

must have a "viewContext", it can have a "stateManager" etc)

Renderer component property "document"

is changed for media-type nodes: there's no more "collectionId" array, use "collection" string

instead
* breaking; ED-1496

## 1.29.5 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.29.4 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.29.3 (2017-04-11)


* fix; ignore unknown marks without content ([0943ae1](https://bitbucket.org/atlassian/atlaskit/commits/0943ae1))

## 1.29.2 (2017-04-11)


* fix; don't render link-marks for unsafe URL-patterns ([f171049](https://bitbucket.org/atlassian/atlaskit/commits/f171049))

## 1.29.1 (2017-04-11)


* fix; new lines aren't rendering in the web renderer ([9905ba6](https://bitbucket.org/atlassian/atlaskit/commits/9905ba6))

## 1.29.0 (2017-04-07)


* fix; remove unused import ([dc55f71](https://bitbucket.org/atlassian/atlaskit/commits/dc55f71))


* feature; add support for emoji rendering ([81d80b8](https://bitbucket.org/atlassian/atlaskit/commits/81d80b8))

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-03)

## 1.7.0 (2017-04-02)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)

## 1.7.0 (2017-03-31)


* fix; skiping tests on renderer pkg ([8e3d94b](https://bitbucket.org/atlassian/atlaskit/commits/8e3d94b))
* fix; fix rendering of mediaGroup ([5bd9918](https://bitbucket.org/atlassian/atlaskit/commits/5bd9918))

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)

## 1.7.0 (2017-03-29)


* feature; adding media to renderer ([71696c9](https://bitbucket.org/atlassian/atlaskit/commits/71696c9))

## 1.6.1 (2017-03-21)

## 1.6.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.6.0 (2017-03-16)


* feature; add CodeMark support ([423b8eb](https://bitbucket.org/atlassian/atlaskit/commits/423b8eb))

## 1.5.0 (2017-03-15)


* feature; improved node and mark type checking ([b8e4f07](https://bitbucket.org/atlassian/atlaskit/commits/b8e4f07))

## 1.4.0 (2017-03-13)


* feature; add hardbreak node ([87c02a4](https://bitbucket.org/atlassian/atlaskit/commits/87c02a4))

## 1.3.2 (2017-03-13)


* fix; link now uses the href-attribute instead of URL ([80be07e](https://bitbucket.org/atlassian/atlaskit/commits/80be07e))

## 1.3.1 (2017-03-08)


* fix; fixes rendering of text nodes with multiple marks ([01c87b8](https://bitbucket.org/atlassian/atlaskit/commits/01c87b8))

## 1.1.0 (2017-03-03)

## 1.1.0 (2017-03-02)

## 1.1.0 (2017-03-02)


* feature; adding support for mention highlight ([19fd79e](https://bitbucket.org/atlassian/atlaskit/commits/19fd79e))

## 1.0.1 (2017-02-28)

## 1.0.1 (2017-02-28)


* fix; dummy commit to release storys and fix registry ([7fa5bf9](https://bitbucket.org/atlassian/atlaskit/commits/7fa5bf9))

## 1.0.0 (2017-02-28)


* Renderer ([ce13c25](https://bitbucket.org/atlassian/atlaskit/commits/ce13c25))
