# @atlaskit/page

## Unreleased

## 4.0.1 (2017-05-26)


* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))
* fix; pin react-lorem-component version to avoid newly released broken version ([6f3d9c6](https://bitbucket.org/atlassian/atlaskit/commits/6f3d9c6))

## 4.0.0 (2017-05-15)


null refactoring the Page component so it no longer needs to know the width of the N ([888c008](https://bitbucket.org/atlassian/atlaskit/commits/888c008))


* breaking; Removing navigationWidth prop from the Page component

## 3.1.3 (2017-04-28)


* fix; page no longer renders badly if there is not much content and a banner specified ([8c94555](https://bitbucket.org/atlassian/atlaskit/commits/8c94555))

## 3.1.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 3.1.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 3.1.0 (2017-04-18)


* feature; updated avatar dependency versions for comment, dropdown-menu, droplist, and page ([e4d2ae7](https://bitbucket.org/atlassian/atlaskit/commits/e4d2ae7))

## 3.0.4 (2017-03-23)


* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 3.0.2 (2017-03-21)

## 3.0.2 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 3.0.1 (2017-03-07)


* fix; fixes the storybook for page so that it interacts with banner correctly ([3c4ac16](https://bitbucket.org/atlassian/atlaskit/commits/3c4ac16))

## 3.0.0 (2017-02-10)

## 2.0.2 (2017-02-09)


* fix; Grids no longer have a min-height ([8491a1d](https://bitbucket.org/atlassian/atlaskit/commits/8491a1d))
* fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))


* feature; Add [@atlaskit](https://github.com/atlaskit)/navigation support to Page ([fcb10f1](https://bitbucket.org/atlassian/atlaskit/commits/fcb10f1))
* feature; add isBannerOpen to Page, to allow integration with the Banner component ([9444506](https://bitbucket.org/atlassian/atlaskit/commits/9444506))
* feature; add support to Page for navigation width resizing ([9ffa440](https://bitbucket.org/atlassian/atlaskit/commits/9ffa440))
* feature; Page now has props for navigation and banner and positions them accordingly ([f7fc87a](https://bitbucket.org/atlassian/atlaskit/commits/f7fc87a))


* breaking; navigation no longer explicitly 100vh in height. It gets the height from the page

slot instead.
* breaking; grids no longer have a min-height

## 2.0.1 (2017-02-06)


* fix; Updates package to use scoped ak packages ([f20663d](https://bitbucket.org/atlassian/atlaskit/commits/f20663d))
