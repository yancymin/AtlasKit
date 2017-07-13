# @atlaskit/avatar

## Unreleased

## 5.0.0 (2017-07-12)


* feature; added the xxlarge size to Avatar ([5cfbfb5](https://bitbucket.org/atlassian/atlaskit/commits/5cfbfb5))
* feature; adds AvatarGroup export with 'stack' and 'grid' appearances ([59dac0c](https://bitbucket.org/atlassian/atlaskit/commits/59dac0c))
* feature; adds AvatarItem named export to Avatar ([9939bfd](https://bitbucket.org/atlassian/atlaskit/commits/9939bfd))
* feature; adds name prop to Avatar (replaces label) ([5cfe547](https://bitbucket.org/atlassian/atlaskit/commits/5cfe547))
* feature; adds tooltips for Avatars ([816402a](https://bitbucket.org/atlassian/atlaskit/commits/816402a))
* feature; avatar how handles href, onClick and arbitrary \`component\` prop functionality ([763e00c](https://bitbucket.org/atlassian/atlaskit/commits/763e00c))
* feature; presence prop now accepts a react element in addition to its enumerable values (rep ([dfcc3f7](https://bitbucket.org/atlassian/atlaskit/commits/dfcc3f7))
* feature; replaced presenceBorderColor prop with \`borderColor\` ([0e4c171](https://bitbucket.org/atlassian/atlaskit/commits/0e4c171))


* breaking; Removed presenceBorderColor prop (replaced with \`borderColor\`)
* breaking; \`icon\` prop has been replaced with a more accepting \`presence\` prop
* breaking; Label prop has been replaced with \`name\`

## 4.0.6 (2017-06-27)


* fix; when src is removed after mount show default image ([d3e9e2a](https://bitbucket.org/atlassian/atlaskit/commits/d3e9e2a))

## 4.0.5 (2017-05-26)

## 4.0.4 (2017-05-26)


* fix; change align-items: middle to align-items: center ([8740b22](https://bitbucket.org/atlassian/atlaskit/commits/8740b22))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 4.0.3 (2017-05-23)


* fix; update util-shared-styles and util-readme dependencies ([9c0e218](https://bitbucket.org/atlassian/atlaskit/commits/9c0e218))

## 4.0.2 (2017-05-11)


* fix; load avatar from src prop correctly ([d94798e](https://bitbucket.org/atlassian/atlaskit/commits/d94798e))

## 4.0.1 (2017-05-10)


* fix; testing releasing more than 5 packages at a time ([e69b832](https://bitbucket.org/atlassian/atlaskit/commits/e69b832))

## 4.0.0 (2017-05-03)


* feature; optional square avatar appearance ([c43c905](https://bitbucket.org/atlassian/atlaskit/commits/c43c905))


* breaking; Previously you could pass a custom Presence to an Avatar via the Avatar's children. Now, these

custom Presence or icon elements should be passed to the new 'icon' prop. This change has been made

to avoid overloading the concept of Presence and to make the API clearer.

ISSUES CLOSED: AK-1645

## 3.0.3 (2017-04-27)


* fix; isolate getPresenceSVG in its own module so we only export a single React Component ([ca8e14b](https://bitbucket.org/atlassian/atlaskit/commits/ca8e14b))
* fix; remove unused constants.js, import correctly from Avatar component for tests ([fcaccb9](https://bitbucket.org/atlassian/atlaskit/commits/fcaccb9))

## 3.0.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 3.0.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 3.0.0 (2017-04-13)


null refactor avatar to styled-components ([21a371c](https://bitbucket.org/atlassian/atlaskit/commits/21a371c))


* breaking; added peerDependency "styled-components", removed dependency "classnames"

ISSUES CLOSED: AK-2099

## 2.1.5 (2017-04-04)


* fix; fixes avatar to be able to be tested using mocha and jsdom ([7a0f9fb](https://bitbucket.org/atlassian/atlaskit/commits/7a0f9fb))

## 2.1.4 (2017-03-23)


* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 2.1.2 (2017-03-21)

## 2.1.2 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 2.1.1 (2017-03-14)

## 2.1.0 (2017-03-06)


* feature; adds 'xsmall' size to avatar appearance (16px) ([d8da663](https://bitbucket.org/atlassian/atlaskit/commits/d8da663))

## 2.0.2 (2017-02-16)


* fix; refactor stories to use // rather than http:// ([a0826cf](https://bitbucket.org/atlassian/atlaskit/commits/a0826cf))

## 2.0.1 (2017-02-10)


* fix; Dummy commit to release components to registry ([5bac43b](https://bitbucket.org/atlassian/atlaskit/commits/5bac43b))
