# @atlaskit/mention

## Unreleased

## 7.2.0 (2017-07-07)


* feature; fS-1125 Add callback parameter when subscribing to receive all results no just the ([cf7636a](https://bitbucket.org/atlassian/atlaskit/commits/cf7636a))
* feature; fS-1125 Adding test ([af91b18](https://bitbucket.org/atlassian/atlaskit/commits/af91b18))

## 7.1.1 (2017-07-06)


* fix; fS-1121 Don't return special mention when typing letter 'm' ([6c2ddd3](https://bitbucket.org/atlassian/atlaskit/commits/6c2ddd3))

## 7.1.0 (2017-07-04)


* feature; restyle the Mentions error pop-up with a funkier exclamation sign and better wording ([8820193](https://bitbucket.org/atlassian/atlaskit/commits/8820193))

## 7.0.1 (2017-06-29)

## 7.0.0 (2017-06-28)


* fix; fS-1090 Fix test ([4262bee](https://bitbucket.org/atlassian/atlaskit/commits/4262bee))


* feature; fS-1090 Expose searchIndex so we can reuse it in test data + fix formatting ([aab39e6](https://bitbucket.org/atlassian/atlaskit/commits/aab39e6))

## 6.0.1 (2017-06-28)


* fix; update avatar dependency ([64f6640](https://bitbucket.org/atlassian/atlaskit/commits/64f6640))


* feature; fS-1090 Expose isFiltering on MentionProvider interface && add query parameter in t ([6881c4b](https://bitbucket.org/atlassian/atlaskit/commits/6881c4b))


* breaking; New method isFiltering(query: string) on MentionProvider interface

## 6.0.0 (2017-06-27)


* fix; fix the Promise handling when a search is performed locally and remotely. ([1380702](https://bitbucket.org/atlassian/atlaskit/commits/1380702))


* breaking; The onOpen handlers will now be called when searches error. Previously they would only be called
when there were search results.

ISSUES CLOSED: FA-910

## 5.3.2 (2017-06-22)


* fix; fix for long standing react warning. :yakshave: ([cf88128](https://bitbucket.org/atlassian/atlaskit/commits/cf88128))
* fix; uncaught rejected provider promises, ui not updating. ([237cd54](https://bitbucket.org/atlassian/atlaskit/commits/237cd54))

## 5.3.1 (2017-06-20)

## 5.3.0 (2017-06-20)


* fix; fS-1073 Code review remarks ([003dc28](https://bitbucket.org/atlassian/atlaskit/commits/003dc28))
* fix; fS-1073 Code review remarks + fix tests ([7611a77](https://bitbucket.org/atlassian/atlaskit/commits/7611a77))
* fix; fS-1073 Filter mention locally from previous search results ([0c4788a](https://bitbucket.org/atlassian/atlaskit/commits/0c4788a))
* fix; fS-1073 Reset search index on bootstrap ([5582b3c](https://bitbucket.org/atlassian/atlaskit/commits/5582b3c))

## 5.2.0 (2017-06-19)


* feature; enable the display of more specific error messages in the MentionList ([db5efae](https://bitbucket.org/atlassian/atlaskit/commits/db5efae))

## 5.1.2 (2017-06-15)


* fix; fix correct usage of react lifecycle and controlled input component. ([3ccd3ec](https://bitbucket.org/atlassian/atlaskit/commits/3ccd3ec))

## 5.1.1 (2017-06-14)


* fix; add AbstractMentionResource export to editor-core ([308ad31](https://bitbucket.org/atlassian/atlaskit/commits/308ad31))
* fix; fixed positioning for tooltip rendered for non-permitted mention ([83851e6](https://bitbucket.org/atlassian/atlaskit/commits/83851e6))
* fix; render tooltip on same line as Mention component ([4b18886](https://bitbucket.org/atlassian/atlaskit/commits/4b18886))
* fix; style fix to render tooltip properly in Firefox ([32d223d](https://bitbucket.org/atlassian/atlaskit/commits/32d223d))


* feature; mentionItem without nickname rendered only using name ([b2fa672](https://bitbucket.org/atlassian/atlaskit/commits/b2fa672))

## 5.1.0 (2017-06-05)


* fix; fS-691 Change whoops style to white and use akicon ([6f023d0](https://bitbucket.org/atlassian/atlaskit/commits/6f023d0))


* feature; fS-1026 When displaying the mention typeahead, I want to see users who don't have a ([a31d317](https://bitbucket.org/atlassian/atlaskit/commits/a31d317))

## 5.0.1 (2017-06-01)


* fix; remove 'graphql' url component from presence's config ([b975e98](https://bitbucket.org/atlassian/atlaskit/commits/b975e98))

## 5.0.0 (2017-06-01)


* fix; add polyfills for all storybooks, use es6-promise, URLSearchParams, Fetch API and Elemen ([db2f5cf](https://bitbucket.org/atlassian/atlaskit/commits/db2f5cf))
* fix; fix remaining mention tests ([d34d43b](https://bitbucket.org/atlassian/atlaskit/commits/d34d43b))
* fix; move all polyfills into devDeps ([d275563](https://bitbucket.org/atlassian/atlaskit/commits/d275563))
* fix; remove polyfills from mention and emoji packages, use styled-components instead of t ([f47a58e](https://bitbucket.org/atlassian/atlaskit/commits/f47a58e))
* fix; restore classname for confluence selenium tests ([e59c2f7](https://bitbucket.org/atlassian/atlaskit/commits/e59c2f7))


* breaking; ED-1701, ED-1702, ED-1704

ISSUES CLOSED: ED-1701, ED-1702, ED-1704

## 4.2.3 (2017-05-09)


* fix; fixed storybooks and bumped lozenge and avatar dependencies in mentions ([71ddb2a](https://bitbucket.org/atlassian/atlaskit/commits/71ddb2a))

## 4.2.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 4.2.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 4.2.0 (2017-04-10)


* feature; add a class to mention node ([5996b7a](https://bitbucket.org/atlassian/atlaskit/commits/5996b7a))

## 4.1.1 (2017-04-07)


* fix; properly handle the case where mention provider is null or undefined ([cf5dc91](https://bitbucket.org/atlassian/atlaskit/commits/cf5dc91))

## 4.1.0 (2017-04-04)


* feature; displays nickname rather than username in MentionItem if exists for user ([d3f4a81](https://bitbucket.org/atlassian/atlaskit/commits/d3f4a81))

## 4.0.5 (2017-03-27)


* fix; updated avatar version from ^1.0.0 to ^2.0.0 in mention ([4ef6a16](https://bitbucket.org/atlassian/atlaskit/commits/4ef6a16))

## 4.0.4 (2017-03-23)


* fix; resourcedMention component doesn't update provider correctly ([fa0c8fc](https://bitbucket.org/atlassian/atlaskit/commits/fa0c8fc))

## 4.0.2 (2017-03-21)

## 4.0.2 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 4.0.1 (2017-03-17)


* fix; upgrade TypeScript to 2.2.1 ([2aa28fc](https://bitbucket.org/atlassian/atlaskit/commits/2aa28fc))

## 4.0.0 (2017-03-13)


* feature; rendering performance optimisations. ([c99a94e](https://bitbucket.org/atlassian/atlaskit/commits/c99a94e))


* breaking; MentionItem no longer spreads Mention props as component props, moving to a single
mention prop instead.
Mention no longer duplicates time and status. Now only in presence property object.
Event callbacks have changes, but in general should be code compatible.

ISSUES CLOSED: FS-285

## 3.0.0 (2017-03-08)


* fix; fix some failing unit tests. ([4a4e32c](https://bitbucket.org/atlassian/atlaskit/commits/4a4e32c))


* feature; fS-214: Allow mentions to work with the session service; both using a header and a ([8e48507](https://bitbucket.org/atlassian/atlaskit/commits/8e48507))


* breaking; A different URL should be provided to the Mentions component

ISSUES CLOSED: FS-214

## 2.1.0 (2017-03-02)


* feature; adding a resourced mention-component that takes a mentionProvider-promise ([aff9907](https://bitbucket.org/atlassian/atlaskit/commits/aff9907))

## 2.0.0 (2017-03-01)


* feature; adding method highlightning mentions ([08a1291](https://bitbucket.org/atlassian/atlaskit/commits/08a1291))


* breaking; MentionProvider now expects a "shouldHighlightMention"-method

## 1.4.0 (2017-02-23)


* Component for rendering mentions ([7a83043](https://bitbucket.org/atlassian/atlaskit/commits/7a83043))

## 1.3.6 (2017-02-23)


* Fixing internal types in MentionResource to reflect actual types. ([6829ace](https://bitbucket.org/atlassian/atlaskit/commits/6829ace))

## 1.3.5 (2017-02-21)


* Typescript configuration changes to match latest core configuration. ([aa13d3f](https://bitbucket.org/atlassian/atlaskit/commits/aa13d3f))

## 1.3.4 (2017-02-17)


* fix; select colour changed from dark to light ([1dc44ec](https://bitbucket.org/atlassian/atlaskit/commits/1dc44ec))


null undo padding change ([3c1f0c6](https://bitbucket.org/atlassian/atlaskit/commits/3c1f0c6))

## 1.3.3 (2017-02-16)

## 1.3.2 (2017-02-16)


* fix; Query should be optional ([4e05ce1](https://bitbucket.org/atlassian/atlaskit/commits/4e05ce1))
* fix; refactor stories to use // rather than http:// ([a0826cf](https://bitbucket.org/atlassian/atlaskit/commits/a0826cf))
* Fixing types in mention resource ([60a3538](https://bitbucket.org/atlassian/atlaskit/commits/60a3538))

## 1.3.1 (2017-02-10)


* fix; Updates package to have correct dev-dependency for util-common-test ([403d232](https://bitbucket.org/atlassian/atlaskit/commits/403d232))

## 1.3.0 (2017-02-09)


* Adding method for getting number of mentions and made positioning props optional again ([51d0591](https://bitbucket.org/atlassian/atlaskit/commits/51d0591))


* uncomment tests that turned out not that flakey ([f100134](https://bitbucket.org/atlassian/atlaskit/commits/f100134))

## 1.2.0 (2017-02-07)


* Disable failing test, remove unused file. ([5075309](https://bitbucket.org/atlassian/atlaskit/commits/5075309))

## 1.1.1 (2017-02-07)


* fix; Updates docs  to mention using yarn to install ([5af03bf](https://bitbucket.org/atlassian/atlaskit/commits/5af03bf))
* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))
* Bump to a real version of lozenge ([b77862d](https://bitbucket.org/atlassian/atlaskit/commits/b77862d))
* Fix dependency on util-shared-styles ([9b4e3c6](https://bitbucket.org/atlassian/atlaskit/commits/9b4e3c6))
* Remove legacy .js file, add MentionItem export. ([5c021e2](https://bitbucket.org/atlassian/atlaskit/commits/5c021e2))

## 1.1.0 (2017-02-06)


* fix; Updates package to use scoped ak packages ([db5c2f6](https://bitbucket.org/atlassian/atlaskit/commits/db5c2f6))


* Export MentionItem for not list/picker use cases. ([7cdd17f](https://bitbucket.org/atlassian/atlaskit/commits/7cdd17f))
* Expose selectIndex and selectId apis on the relevant components. ([25d7ebf](https://bitbucket.org/atlassian/atlaskit/commits/25d7ebf))
* Migrating to typescrypt ([1bff7bc](https://bitbucket.org/atlassian/atlaskit/commits/1bff7bc))
