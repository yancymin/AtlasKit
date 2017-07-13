# @atlaskit/media-core

## Unreleased

## 8.2.0 (2017-06-28)


* fix; use full-fit mode instead of crop for /image endpoint ([4de7d32](https://bitbucket.org/atlassian/atlaskit/commits/4de7d32))


* feature; allow to pass imageResizeMode to fetchImageDataUri ([379aade](https://bitbucket.org/atlassian/atlaskit/commits/379aade))

## 8.1.0 (2017-06-06)


* feature; allow createRequest method to prevent preflight requests ([3f50ebc](https://bitbucket.org/atlassian/atlaskit/commits/3f50ebc))
* feature; prevent preflight requests in CollectionService & LinkService ([25d87da](https://bitbucket.org/atlassian/atlaskit/commits/25d87da))

## 8.0.1 (2017-05-29)


* fix; export media state status from media-core ([fb8dcb5](https://bitbucket.org/atlassian/atlaskit/commits/fb8dcb5))

## 7.0.0 (2017-05-18)


* feature; changed CollectionProvider and its pooling behaviour ([ce4679c](https://bitbucket.org/atlassian/atlaskit/commits/ce4679c))


* breaking; changed CollectionProvider and its pooling behaviour

ISSUES CLOSED: FIL-4226

## 6.1.1 (2017-05-11)


* fix; preventing unsubscribe from modifying array iterator, preventing 'unfinalized' statu ([26e42b8](https://bitbucket.org/atlassian/atlaskit/commits/26e42b8))

## 6.1.0 (2017-05-09)

## 6.0.3 (2017-05-08)

## 6.0.2 (2017-05-03)


* fix; add missing signature on interface ([009fe3a](https://bitbucket.org/atlassian/atlaskit/commits/009fe3a))
* fix; move editor-relate media components into media-core (defaultMediaProvider, mediaStat ([c85be66](https://bitbucket.org/atlassian/atlaskit/commits/c85be66))
* fix; use common mediaProvider for both renderer and editor-core ([7ed6650](https://bitbucket.org/atlassian/atlaskit/commits/7ed6650))


* feature; add Webp support to requests ([1239b33](https://bitbucket.org/atlassian/atlaskit/commits/1239b33))

## 6.0.1 (2017-04-27)

## 6.0.0 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 5.5.2 (2017-04-27)


* fix; added a refresh() method on the collection controller" ([17c6b1f](https://bitbucket.org/atlassian/atlaskit/commits/17c6b1f))


* feature; added a refresh() method on the collection controller ([866c778](https://bitbucket.org/atlassian/atlaskit/commits/866c778))


* breaking; The complete callback is no longer called on the CollectionProvider

## 5.5.1 (2017-04-26)

## 5.5.0 (2017-04-26)


* feature; added a refresh() method on the collection controller ([87b008b](https://bitbucket.org/atlassian/atlaskit/commits/87b008b))

## 5.4.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))
* fix; updated media packages key words and maintainers ([01bcbc5](https://bitbucket.org/atlassian/atlaskit/commits/01bcbc5))

## 5.4.0 (2017-04-18)


* fix; call function isIE() ([85a5f07](https://bitbucket.org/atlassian/atlaskit/commits/85a5f07))
* fix; call utility function ([0a7f1c1](https://bitbucket.org/atlassian/atlaskit/commits/0a7f1c1))
* fix; fix tests to run in IE ([62b4e00](https://bitbucket.org/atlassian/atlaskit/commits/62b4e00))


* feature; add utility function to detect if we need to specify crossorigin property for img e ([5536b7a](https://bitbucket.org/atlassian/atlaskit/commits/5536b7a))

## 5.3.0 (2017-04-10)


* feature; expose media collection provider interface ([9071b45](https://bitbucket.org/atlassian/atlaskit/commits/9071b45))

## 5.2.1 (2017-04-07)


* fix; fix unhandled promise error and broken test (which isn't actually failing) ([b213f0c](https://bitbucket.org/atlassian/atlaskit/commits/b213f0c))

## 5.2.0 (2017-04-06)


* fix; change nextInclusiveStartKey on RemoteCollectionItemsResponse to be optional ([8ee8039](https://bitbucket.org/atlassian/atlaskit/commits/8ee8039))


* feature; collection controller can load next page until given predicate ([1424c57](https://bitbucket.org/atlassian/atlaskit/commits/1424c57))

## 5.1.0 (2017-04-04)


* feature; export DataUriService ([1cd019c](https://bitbucket.org/atlassian/atlaskit/commits/1cd019c))

## 5.0.4 (2017-03-31)

## 5.0.3 (2017-03-31)


* fix; make addLinkItem method send metadata properly ([21a0cc1](https://bitbucket.org/atlassian/atlaskit/commits/21a0cc1))
* fix; return an error when the URLPreview endpoint returns an error with a successful stat ([a85b1c0](https://bitbucket.org/atlassian/atlaskit/commits/a85b1c0))

## 5.0.2 (2017-03-29)

## 5.0.1 (2017-03-29)


* fix; repush stories for broken releases ([9032923](https://bitbucket.org/atlassian/atlaskit/commits/9032923))

## 4.0.0 (2017-03-28)

## 4.0.0 (2017-03-28)


* fix; bump media packages and fix ts errors ([dcc463d](https://bitbucket.org/atlassian/atlaskit/commits/dcc463d))
* fix; pass missing collectionName to createRequest ([5ea22d8](https://bitbucket.org/atlassian/atlaskit/commits/5ea22d8))


* feature; modified Context.getMediaItemProvider to use a MediaItem if provided ([a6128cd](https://bitbucket.org/atlassian/atlaskit/commits/a6128cd))


* breaking; Changed the CollectionService response to be similar to an array of MediaItems. Typed

processingStatus.

ISSUES CLOSED: FIL-3542

## 2.0.0 (2017-03-25)


null expose config on context ([256fde2](https://bitbucket.org/atlassian/atlaskit/commits/256fde2))


* feature; add collection action and event handler ([d6a07a3](https://bitbucket.org/atlassian/atlaskit/commits/d6a07a3))
* feature; add details support in collections service ([477ee0f](https://bitbucket.org/atlassian/atlaskit/commits/477ee0f))
* feature; add occurrence key to media collection item ([3705deb](https://bitbucket.org/atlassian/atlaskit/commits/3705deb))


* breaking; Context API changed
* breaking; MediaCollectionItem API changed
* breaking; CollectionService API changed

## 1.99.1 (2017-03-24)


* fix; refactor media-core services to use a common method for doing XHR ([80a3576](https://bitbucket.org/atlassian/atlaskit/commits/80a3576))

## 1.3.0 (2017-03-23)


* fix; fixing the build ([ba21a9d](https://bitbucket.org/atlassian/atlaskit/commits/ba21a9d))

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)


* feature; added 'super' card component ([559579f](https://bitbucket.org/atlassian/atlaskit/commits/559579f))


* breaking; Card API, LinkCard API, FileCard API

ISSUES CLOSED: FIL-3919

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-16)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)


* feature; media core changes as part of shipit ([d13526e](https://bitbucket.org/atlassian/atlaskit/commits/d13526e))

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)


* feature; added application links to media-card and restructured ([618650e](https://bitbucket.org/atlassian/atlaskit/commits/618650e))

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)


* fix; add addLinkItem interface member to context ([b548257](https://bitbucket.org/atlassian/atlaskit/commits/b548257))

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)


* feature; updated linkCard to take either a stored link or url ([704f16d](https://bitbucket.org/atlassian/atlaskit/commits/704f16d))

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)


* fix; fix TS issues with media-card ([6fd3f27](https://bitbucket.org/atlassian/atlaskit/commits/6fd3f27))


* feature; add method 'addLinkItem' to the link service ([0b0d9d3](https://bitbucket.org/atlassian/atlaskit/commits/0b0d9d3))

## 1.2.2 (2017-03-06)


* fix; fix processing status (fixes card file caching) ([668780e](https://bitbucket.org/atlassian/atlaskit/commits/668780e))


* feature; migrate FilmStrip component + create media-test-helpers ([8896543](https://bitbucket.org/atlassian/atlaskit/commits/8896543))
* feature; move MediaKit into Atlaskit ([98de4f3](https://bitbucket.org/atlassian/atlaskit/commits/98de4f3))

## 1.2.1 (2017-03-06)


* fix; declare axios as dependency ([609768c](https://bitbucket.org/atlassian/atlaskit/commits/609768c))

## 1.2.0 (2017-03-02)


* fix; moved lru-fast to dependencies ([85f7f8f](https://bitbucket.org/atlassian/atlaskit/commits/85f7f8f))
* fix; specified lru-fast as a dependency within media-core instead of devDependency ([c505959](https://bitbucket.org/atlassian/atlaskit/commits/c505959))


* feature; migrated card from mediakit repo to atlaskit ([438a050](https://bitbucket.org/atlassian/atlaskit/commits/438a050))

## 1.1.1 (2017-02-27)

## 1.1.0 (2017-02-27)


* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))


* feature; move providers, services, and context to AtlasKit ([31ca242](https://bitbucket.org/atlassian/atlaskit/commits/31ca242))

## 1.0.0 (2017-02-12)


* feature; commits ([7f474ea](https://bitbucket.org/atlassian/atlaskit/commits/7f474ea))
* feature; add media-core models ([63f2d78](https://bitbucket.org/atlassian/atlaskit/commits/63f2d78))
