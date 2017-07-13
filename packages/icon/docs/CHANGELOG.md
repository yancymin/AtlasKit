# @atlaskit/icon

## Unreleased

## 7.0.1 (2017-06-28)


* fix; changed icon wrapper display from inline-flex to inline-block ([64dc3de](https://bitbucket.org/atlassian/atlaskit/commits/64dc3de))

## 7.0.0 (2017-06-08)


* fix; refactored icon module and build process ([a68abba](https://bitbucket.org/atlassian/atlaskit/commits/a68abba))


* breaking; Module no longer exports named exports. Import a specific icon like so: import AtlassianIcon from
'@atlaskit/icon/glyph/atlassian';

ISSUES CLOSED: AK-2388

## 6.6.0 (2017-05-31)


* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))


* feature; added log-in icon to [@atlaskit](https://github.com/atlaskit)/icon and [@atlaskit](https://github.com/atlaskit)/reduced-ui-pack ([aa72586](https://bitbucket.org/atlassian/atlaskit/commits/aa72586))

## 6.5.4 (2017-05-12)


* fix; add package name and version to the hashing of classnames in [@atlaskit](https://github.com/atlaskit)/icon to preve ([a28bfe5](https://bitbucket.org/atlassian/atlaskit/commits/a28bfe5))

## 6.5.3 (2017-05-10)


* fix; do not import whole icon in media-card ([cc5ec63](https://bitbucket.org/atlassian/atlaskit/commits/cc5ec63))

## 6.5.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 6.5.1 (2017-04-26)

## 6.5.0 (2017-04-26)

## 6.4.0 (2017-04-26)


* fix; fixed bug in the new ExampleWithCode story type ([f30a4d3](https://bitbucket.org/atlassian/atlaskit/commits/f30a4d3))
* fix; checkbox icon now correctly a 2-colour icon again ([470642e](https://bitbucket.org/atlassian/atlaskit/commits/470642e))
* fix; icon SVG files updated. Fills made to be transparent for 2-color icons, and some ico ([264bb97](https://bitbucket.org/atlassian/atlaskit/commits/264bb97))
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))


* feature; Adds switcher icon ([220cc33](https://bitbucket.org/atlassian/atlaskit/commits/220cc33))
* feature; icons now have a primaryColor and secondaryColor prop ([9768e00](https://bitbucket.org/atlassian/atlaskit/commits/9768e00))

## 6.3.2 (2017-04-24)


* fix; fixing improper PropType for a prop 'glyph' ([cff41c5](https://bitbucket.org/atlassian/atlaskit/commits/cff41c5))

## 6.3.1 (2017-04-20)


* fix; fixes regressions where styles werent being loaded causing sizing to be broken ([1de6d0c](https://bitbucket.org/atlassian/atlaskit/commits/1de6d0c))

## 6.3.0 (2017-04-20)


* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 6.2.0 (2017-04-19)

## 6.1.0 (2017-04-19)


* feature; refactoring Icon to reduce bundle size and code complexity ([43c61f5](https://bitbucket.org/atlassian/atlaskit/commits/43c61f5))

## 6.0.1 (2017-04-18)


* fix; update icon stories to use new readme component ([1cdfa6d](https://bitbucket.org/atlassian/atlaskit/commits/1cdfa6d))


* feature; add media services scale large and small icons ([3bd9d86](https://bitbucket.org/atlassian/atlaskit/commits/3bd9d86))

## 5.0.0 (2017-03-28)

## 5.0.0 (2017-03-28)


* fix; remove icon baseline alignment story ([876c682](https://bitbucket.org/atlassian/atlaskit/commits/876c682))
* fix; use new 24px artboard size in 'too big' story ([404e6e0](https://bitbucket.org/atlassian/atlaskit/commits/404e6e0))


* feature; bulk icon update ([76367b5](https://bitbucket.org/atlassian/atlaskit/commits/76367b5))
* feature; update default icon sizes ([90850bd](https://bitbucket.org/atlassian/atlaskit/commits/90850bd))


* breaking; default SVG artboard sizes are now 24px, with some icons such as editor on the 16px artboard.
* breaking; icons are no longer guaranteed to baseline-align with sibling content. use flexbox to control

alignment.

ISSUES CLOSED: AK-1924
* breaking; This icon released contains a large amount of breaking naming changes due to deletions and renames.

Please update to this new major version and ensure your application is using the correct icon

exports via linting.

ISSUES CLOSED: AK-1924

## 4.0.0 (2017-03-27)

## 3.0.3 (2017-03-23)


* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))


* feature; icon sizes changed to be on grid ([f6748ea](https://bitbucket.org/atlassian/atlaskit/commits/f6748ea))


* breaking; Icon sizes changed. This does not change the default sizes, only the ones when there is a size prop

specified.

ISSUES CLOSED: AK-1515

## 3.0.1 (2017-03-21)

## 3.0.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 3.0.0 (2017-03-03)


* feature; move service desk icons out of the servicedesk directory ([f959e6b](https://bitbucket.org/atlassian/atlaskit/commits/f959e6b))


* breaking; Service desk icons now live in the root icons directory

ISSUES CLOSED: AK-1858

## 2.5.5 (2017-02-28)


* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 2.5.3 (2017-02-28)


* fix; dummy commit to fix broken stories and missing registry pages ([a31e92a](https://bitbucket.org/atlassian/atlaskit/commits/a31e92a))

## 2.5.3 (2017-02-28)


* fix; dummy commit to release stories for components ([a105c02](https://bitbucket.org/atlassian/atlaskit/commits/a105c02))

## 2.5.2 (2017-02-28)


* fix; removes jsdoc annotations from icons and removes scripts used to generate Icons.md ([e5302a0](https://bitbucket.org/atlassian/atlaskit/commits/e5302a0))

## 2.5.1 (2017-02-27)


* fix; update flag's icon dependency to latest ([32885ce](https://bitbucket.org/atlassian/atlaskit/commits/32885ce))

## 2.5.0 (2017-02-21)

## 2.4.3 (2017-02-20)


* fix; change directory icon specific names to generic icon names ([13bb38a](https://bitbucket.org/atlassian/atlaskit/commits/13bb38a))

## 2.4.2 (2017-02-20)

## 2.4.1 (2017-02-20)


* fix; fix fill color typo in jira/addon icon ([8900095](https://bitbucket.org/atlassian/atlaskit/commits/8900095))
* fix; copy in-code comment about reduced-ui-pack to readme ([24e2c37](https://bitbucket.org/atlassian/atlaskit/commits/24e2c37))
* fix; use correctly scoped package names in npm docs ([91dbd2f](https://bitbucket.org/atlassian/atlaskit/commits/91dbd2f))


* feature; add icons for directory privacy levels ([fb5f89b](https://bitbucket.org/atlassian/atlaskit/commits/fb5f89b))

## 2.4.0 (2017-02-16)


* feature; Force icons version bump to get mediakit icons ([64bf24e](https://bitbucket.org/atlassian/atlaskit/commits/64bf24e))

## 2.3.3 (2017-02-07)


* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))

## 2.3.2 (2017-02-06)

## 2.3.1 (2017-02-06)


* fix; Updates packages to use scoped ak packages ([26285cb](https://bitbucket.org/atlassian/atlaskit/commits/26285cb))
* fix; Fixes invite team icon for icons ([3b66fd7](https://bitbucket.org/atlassian/atlaskit/commits/3b66fd7))
