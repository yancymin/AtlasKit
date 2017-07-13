AtlasKit
==============
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![node](https://img.shields.io/badge/node-6.10%2B-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/npm-3.8%2B-brightgreen.svg)]()
[![yarn](https://img.shields.io/badge/yarn-0.18.1-brightgreen.svg)]()

AtlasKit is the technical implementation of the [Atlassian Design Guidelines][ADG]. It is a collection of reusable components that can be downloaded independently into your projects. Each component is also independently versioned and published to npm. The full list of components can be found in the [AtlasKit Registry][AtlasKitRegistry].

**This project is bound by a [Code of Conduct][codeofconduct].**

Usage
======

#### Example for React projects

AtlasKit components are built for React. Here's an example of using the Avatar component:

1. First, you specify a component into your project as a dependency using npm: `npm install @atlaskit/avatar`
2. Then you can use it in your React projects like this:

```
import React from 'react';
import Avatar from '@atlaskit/avatar';

export default (
  <Avatar
    src="https://design.atlassian.com/images/avatars/project-128.png"
    presence="online"
    size="large"
  />
);
```
Check out the [AtlasKit Registry][AtlasKitRegistry] to learn more.

#### Example for non-React projects

There is a subset of components available as styles called the Reduced UI pack.
To use:

1. You include these into your the HTML projects.

```
<link rel="stylesheet" href="//unpkg.com/@atlaskit/css-reset@latest" />
<link rel="stylesheet" href="//unpkg.com/@atlaskit/reduced-ui-pack@latest" />
```
2. Then you can style HTML with

`<button class="ak-button ak-button__appearance-primary">Submit</button>`

Check out the [Reduced UI pack](http://go.atlassian.com/reduced-ui-pack) for more examples and details.


Installation
============

#### Before you start

* [node](https://nodejs.org/) version should be 6 or above (to check `node -v`)
* [npm](https://www.npmjs.com/) version should be 3 or above (to check `npm --version`) or use [nvm](https://github.com/creationix/nvm)
* [yarn](https://yarnpkg.com/) should be installed globally (see yarn website for installation instructions)

#### Clone the repo and install

```
git clone git@bitbucket.org:atlassian/atlaskit.git
yarn
```
You're now ready to start developing in AtlasKit!

Each component/util lives in it's own package under the `packages` directory. You can build those all at once or individually using

```
yarn run bootstrap
# cleans, installs and links all packages in the repository
```

```
yarn run bootstrap/single @atlaskit/packageName
# cleans, installs and links only a single package
```

```
yarn run bootstrap/single/with-deps @atlaskit/packageName
# cleans, installs and links a single package AND all of it's dependencies
```

Once you made some changes, stage them and then commit them using `yarn run commit` (This will use [Commitizen](https://github.com/commitizen/cz-cli) under the covers).


Documentation
=============
A comprehensive list of components and detailed usage of each can be found in the [AtlasKit Registry][AtlasKitRegistry].

You can also find how each component is meant to be used from a design perspective on the [Atlassian Design Guidelines][ADG] website.


Tests
=====

### Running unit tests

* To run unit tests for a single component: `yarn run test/single @atlaskit/my-component-name`
* To continuously run tests for a single component: `yarn run test/single/watch @atlaskit/my-component`

> You can pass arguments to Karma like this to override the AtlasKit defaults: `yarn run test/single @atlaskit/my-component-name -- --browsers=Chrome`

**Note: The above information is slightly out of date in some cases as we are currently undergoing a major refactor for how we run tests**

Some packages will have moved to the new unit testing framework (using mocha to run jsdom rather than karma).

For these packages you'll need to run the `test/unit` script

```
yarn run test/unit
```

To run tests for a single package you can pass the package name (the name used in the directory not the package.json) like so:

```
yarn run test/unit avatar
```

And to pass any extra flags you need to separate them using `--`

```
yarn run test/unit avatar -- --watch
```


Reporting issues
============

We believe in open contributions and the power of a strong development community. Please read our [Contributing guidelines][CONTRIBUTING] on how to contribute back and report issues to AtlasKit.


Contributors
============

Pull requests, issues and comments are welcomed. For pull requests:

* Add tests for new features and bug fixes
* Follow the existing style
* Separate unrelated changes into multiple pull requests
* Read [Contributing guidelines][CONTRIBUTING] for more details

See the existing issues for things to start contributing.

For bigger changes, make sure you start a discussion first by creating
an issue and explaining the intended change.

Atlassian requires contributors to sign a Contributor License Agreement,
known as a CLA. This serves as a record stating that the contributor is
entitled to contribute the code/documentation/translation to the project
and is willing to have it used in distributions and derivative works
(or is willing to transfer ownership).

Prior to accepting your contributions we ask that you please follow the appropriate
link below to digitally sign the CLA. The Corporate CLA is for those who are
contributing as a member of an organization and the individual CLA is for
those contributing as an individual.

* [CLA for corporate contributors](https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=e1c17c66-ca4d-4aab-a953-2c231af4a20b)
* [CLA for individuals](https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=3f94fbdc-2fbe-46ac-b14c-5d152700ae5d)

License
========

This is a [mono-repo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md), which means that different parts of this repository can have different licenses.

The base level of the repository is licensed under [Apache 2.0][LICENSE]. There are separate license files (`LICENSE`)  for each component under `/packages` that specify the license restrictions for each component. While most components are licensed under the Apache 2.0 license, please note packages containing styles, assets & icons are most likely licensed under the [Atlassian Design Guidelines license][ADG_License].

If you fork this repository you can continue to use those Atlassian Design Guidelines licensed components only under the given license restrictions. If you want to redistribute this repository, you will need to replace these Atlassian Design Guidelines licensed components with your own implementation.

Copyright (c) 2016 Atlassian and others.


[ADG]: http://atlassian.design/ "Atlassian Design Guidelines"
[ADG_License]: http://atlassian.design/license
[CONTRIBUTING]: ./CONTRIBUTING.md
[LICENSE]: ./LICENSE
[AtlasKitRegistry]: http://go.atlassian.com/atlaskit  "AtlasKit Registry"
[CODEOFCONDUCT]: ./CODE_OF_CONDUCT.md
