# @atlaskit/reactions

## Unreleased

## 10.6.2 (2017-06-01)


* fix; fS-1015 Reactions randomly reorder themselves + other bugfixes ([f50a254](https://bitbucket.org/atlassian/atlaskit/commits/f50a254))

## 10.6.1 (2017-05-30)


* fix; fS-957 Make reactions wrap to newline ([2ad5cfd](https://bitbucket.org/atlassian/atlaskit/commits/2ad5cfd))

## 10.6.0 (2017-05-26)


* fix; fS-992 Emoji picker is too big for issue detail modal ([fb9ca62](https://bitbucket.org/atlassian/atlaskit/commits/fb9ca62))
* fix; fS-992 Remove popup component ([6aa5ee2](https://bitbucket.org/atlassian/atlaskit/commits/6aa5ee2))


* feature; fS-985 expose analyticService ([fbe4f67](https://bitbucket.org/atlassian/atlaskit/commits/fbe4f67))

## 10.5.1 (2017-05-22)


* fix; fS-963 Bump emoji version and fix css ([d168d44](https://bitbucket.org/atlassian/atlaskit/commits/d168d44))

## 10.3.0 (2017-05-19)

## 10.3.0 (2017-05-19)

## 10.3.0 (2017-05-19)


* fix; fS-963 Fix css ([f9f634a](https://bitbucket.org/atlassian/atlaskit/commits/f9f634a))
* fix; fS-963 Fix optimistic add/delete ([9ebe60b](https://bitbucket.org/atlassian/atlaskit/commits/9ebe60b))
* fix; fS-963 Fix PR feedbacks ([88199b4](https://bitbucket.org/atlassian/atlaskit/commits/88199b4))
* fix; fS-963 Fix reactions reappearing after deletion because of detailledreaction call ([85776d8](https://bitbucket.org/atlassian/atlaskit/commits/85776d8))
* fix; fS-963 fix test ([13232c4](https://bitbucket.org/atlassian/atlaskit/commits/13232c4))
* fix; fS-963 fix test & bump emoji ([443d8ff](https://bitbucket.org/atlassian/atlaskit/commits/443d8ff))
* fix; fS-963 Fix tests ([f10c4c6](https://bitbucket.org/atlassian/atlaskit/commits/f10c4c6))


* feature; fS-965 Update reactions design ([0451638](https://bitbucket.org/atlassian/atlaskit/commits/0451638))

## 10.2.2 (2017-05-11)


* fix; add containerAri where needed to match service contract ([bb2adca](https://bitbucket.org/atlassian/atlaskit/commits/bb2adca))
* fix; fix typescript error ([81249fb](https://bitbucket.org/atlassian/atlaskit/commits/81249fb))

## 10.2.1 (2017-05-03)


* fix; harden code to run in NodeJS environment. ([cc78477](https://bitbucket.org/atlassian/atlaskit/commits/cc78477))

## 10.2.0 (2017-05-02)


* fix; fixes a bug where long names where not being truncated ([e1ec953](https://bitbucket.org/atlassian/atlaskit/commits/e1ec953))


* feature; adding support to optionally set the text of the trigger-button ([6b5dc09](https://bitbucket.org/atlassian/atlaskit/commits/6b5dc09))

## 10.1.0 (2017-05-01)


* feature; adding support for detailed reactions ([81c6873](https://bitbucket.org/atlassian/atlaskit/commits/81c6873))
* feature; fS-767 Add analytics to reaction component ([1b5208f](https://bitbucket.org/atlassian/atlaskit/commits/1b5208f))

## 10.0.0 (2017-04-28)


* feature; adds the ablity to enable/disable all emojis ([ccacd6f](https://bitbucket.org/atlassian/atlaskit/commits/ccacd6f))


* breaking; By default the reaction picker will only allow a predefined set of emojis.

## 9.0.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 9.0.1 (2017-04-26)

## 9.0.0 (2017-04-26)


* fix; fixes emoji-size in reactions and using string rather than emojiid ([87a6af9](https://bitbucket.org/atlassian/atlaskit/commits/87a6af9))
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))


* feature; adding containerAri ([e88190a](https://bitbucket.org/atlassian/atlaskit/commits/e88190a))


* breaking; containerAri is now a required prop for ResourcedReactionPicker and ResourcedReactions. It's also

required as first argument in toggleReaction, addReaction and deleteReaction

## 5.0.0 (2017-04-19)

## 5.0.0 (2017-04-19)

## 5.0.0 (2017-04-19)

## 5.0.0 (2017-04-19)


* feature; upgrade to latest emoji component and emoji id spec ([ae59982](https://bitbucket.org/atlassian/atlaskit/commits/ae59982))


* breaking; Emoji representation has changes due to upgrading of emoji component.

ISSUES CLOSED: FS-887

## 4.0.1 (2017-03-21)

## 4.0.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 4.0.0 (2017-03-09)


* feature; bump emoji dependency to ensure getting all needed exports. ([62f2487](https://bitbucket.org/atlassian/atlaskit/commits/62f2487))
* feature; upgrade to latest asynchronous Emoji ([78ce481](https://bitbucket.org/atlassian/atlaskit/commits/78ce481))


* breaking; Latest Emoji upgrade and some events are breaking changes.

## 3.0.0 (2017-03-09)


* feature; adding resourced components that takes a ReactionProvivder-promise ([b503bd9](https://bitbucket.org/atlassian/atlaskit/commits/b503bd9))


* breaking; Renamed ReactionsService to ReactionsResource, The Reactions-component now takes a

"reactionsProvider" instead of "reactionsService"

## 2.0.1 (2017-02-27)


* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))

## 1.0.0 (2017-02-17)


* Fix the build and the readme story ([1915b49](https://bitbucket.org/atlassian/atlaskit/commits/1915b49))
* Fix type error in reactions-service ([09080e3](https://bitbucket.org/atlassian/atlaskit/commits/09080e3))
* Trying to fix failing CI ([2fc74cc](https://bitbucket.org/atlassian/atlaskit/commits/2fc74cc))


* Added autopoll support and logic for ignorning outdated updates ([bc7724f](https://bitbucket.org/atlassian/atlaskit/commits/bc7724f))
* Reactions Picker ([70e015a](https://bitbucket.org/atlassian/atlaskit/commits/70e015a))
