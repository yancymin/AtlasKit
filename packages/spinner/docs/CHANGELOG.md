# @atlaskit/spinner

## Unreleased

## 3.0.0 (2017-07-07)


* fix; refactor spinner to use TransitionGroup ([e0cef25](https://bitbucket.org/atlassian/atlaskit/commits/e0cef25))


* breaking; remove typescript interface file. when a spinner's isCompleting props is true and it has finished
its exit animation it will not longer take up space in the DOM.

ISSUES CLOSED: AK-2559

## 2.2.5 (2017-06-28)


* fix; triggering component release with previous fix ([20a9e93](https://bitbucket.org/atlassian/atlaskit/commits/20a9e93))

## 2.2.4 (2017-06-27)


* fix; fix Spinner onComplete invocation on Edge ([e998791](https://bitbucket.org/atlassian/atlaskit/commits/e998791))

## 2.2.3 (2017-05-29)


* fix; add index shim for unit tests ([838c743](https://bitbucket.org/atlassian/atlaskit/commits/838c743))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 2.2.2 (2017-05-25)


* fix; update util-shared-styles dependency in spinner ([603a1c1](https://bitbucket.org/atlassian/atlaskit/commits/603a1c1))

## 2.2.1 (2017-05-08)


* fix; removes spinner in button story from storybook ([96ed0f8](https://bitbucket.org/atlassian/atlaskit/commits/96ed0f8))

## 2.2.0 (2017-05-06)


* feature; add invertColor prop to Spinner to enable it to be used on dark backgrounds ([4981617](https://bitbucket.org/atlassian/atlaskit/commits/4981617))

## 2.1.0 (2017-05-02)


* feature; adds delay prop to Spinner for custom delays before showing spinner ([98679b7](https://bitbucket.org/atlassian/atlaskit/commits/98679b7))
* feature; fixes issue where long delays would remove the spin-in animation ([240bea9](https://bitbucket.org/atlassian/atlaskit/commits/240bea9))

## 2.0.3 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 2.0.2 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 2.0.1 (2017-03-28)


* fix; remove [@atlaskit](https://github.com/atlaskit)/spinner from same package devDependencies ([2eac9f0](https://bitbucket.org/atlassian/atlaskit/commits/2eac9f0))

## 2.0.0 (2017-03-27)


* fix; address IE focus management issue ([acad36d](https://bitbucket.org/atlassian/atlaskit/commits/acad36d))


null refactor the spinner component to use styled-components ([155956c](https://bitbucket.org/atlassian/atlaskit/commits/155956c))


* breaking; removed dependency \ as dependency \| added dependency \ \|

added peerDependency of \

## 1.0.5 (2017-03-22)


* fix; remove spinner delay when removing component ([5c2ebcf](https://bitbucket.org/atlassian/atlaskit/commits/5c2ebcf))

## 1.0.3 (2017-03-21)

## 1.0.3 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.0.2 (2017-03-03)


* fix; adds a 100ms delay before showing the spinner ([90d9a47](https://bitbucket.org/atlassian/atlaskit/commits/90d9a47))
* fix; minor docs/storybook updates to be more in line with the rest of the Atlaskit patterns ([83a0af1](https://bitbucket.org/atlassian/atlaskit/commits/83a0af1))

## 1.0.1 (2017-02-07)


* fix; Updates package to use scoped ak packages ([aa32414](https://bitbucket.org/atlassian/atlaskit/commits/aa32414))
