# @atlaskit/flag

## Unreleased

## 3.0.0 (2017-07-06)


* fix; add TransitionGroup to FlagGroup to handle lifecycle animations ([6dbb237](https://bitbucket.org/atlassian/atlaskit/commits/6dbb237))


* breaking; Removed shouldDismiss prop from Flag. Just set a FlagGroup's children declaratively and animation
will be handled automatically with TransitionGroup (you don't need to wait until the flag has
animated out before updating your state).

ISSUES CLOSED: AK-2558

## 2.2.1 (2017-06-19)


* fix; bump Flag icon dependency to 7.x ([35bb4fa](https://bitbucket.org/atlassian/atlaskit/commits/35bb4fa))

## 2.2.0 (2017-06-05)


* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))


* feature; added new optional bold flags, controlled by the Flag.appearance prop ([b78dca7](https://bitbucket.org/atlassian/atlaskit/commits/b78dca7))

## 2.1.2 (2017-05-12)


* fix; flag dismiss button focus style and spacing now correct ([c0130be](https://bitbucket.org/atlassian/atlaskit/commits/c0130be))

## 2.1.1 (2017-05-11)


* fix; bump modal-dialog dep, and change to a devDep ([d16f887](https://bitbucket.org/atlassian/atlaskit/commits/d16f887))

## 2.1.0 (2017-05-06)


* feature; allow flags to be dismissed programatically via shouldDismiss prop ([445dcb4](https://bitbucket.org/atlassian/atlaskit/commits/445dcb4))

## 2.0.4 (2017-05-02)


* fix; change to dependency on util-shared-styles to correct version ([a052c60](https://bitbucket.org/atlassian/atlaskit/commits/a052c60))

## 2.0.3 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 2.0.2 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 2.0.1 (2017-04-13)


* fix; update flag stories to use new readme component ([1c56c84](https://bitbucket.org/atlassian/atlaskit/commits/1c56c84))

## 2.0.0 (2017-04-04)


null refactor the flag component to use styled-components ([615208f](https://bitbucket.org/atlassian/atlaskit/commits/615208f))


* breaking; added peerDependency "styled-components”, removed dependency “classnames”

ISSUES CLOSED: AK-2028

## 1.0.9 (2017-03-23)


* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 1.0.7 (2017-03-21)

## 1.0.7 (2017-03-21)

## 1.0.6 (2017-03-21)


* fix; accept JSX in description prop ([c986abf](https://bitbucket.org/atlassian/atlaskit/commits/c986abf))
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.0.5 (2017-02-27)


* fix; update flag's icon dependency to latest ([e60c12a](https://bitbucket.org/atlassian/atlaskit/commits/e60c12a))

## 1.0.4 (2017-02-20)


* fix; use correctly scoped package names in npm docs ([91dbd2f](https://bitbucket.org/atlassian/atlaskit/commits/91dbd2f))

## 1.0.3 (2017-02-10)


* fix; Dummy commit to release components to registry ([5bac43b](https://bitbucket.org/atlassian/atlaskit/commits/5bac43b))
