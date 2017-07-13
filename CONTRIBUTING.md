
# Contributing to AtlasKit

## Code of Conduct
This project is bound by a [Code of Conduct][CODEOFCONDUCT].

## Reporting Issues

This section guides you through submitting a bug report for AtlasKit. Following these guidelines helps us and the community understand your issue, reproduce the behavior, and find related issues.

When you are creating an issue, please include as many details as possible. Fill out [the required template](ISSUE_TEMPLATE.md), the information it asks helps us resolve issues faster.

### Before submitting an issue

* **Perform a [cursory search][IssueTracker]** to see if the problem has already been reported. If it has, add a comment to the existing issue instead of opening a new one.

### How do I submit a (good) issue?

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. Add a link to a codepen example using [this codepen](http://go.atlassian.com/ak-codepen) as starting point. When listing steps, **don't just say what you did, but explain how you did it**. For example, if you opened a inline dialog, explain if you used the mouse, or a keyboard shortcut.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Include details about your configuration and environment:

* **Which version of the component are you using?** You can get this information by running `yarn ls | grep '@atlaskit'` or `npm list | grep '@atlaskit'` from the command line.
* **What's the name and version of the browser and OS you're using**?


### Code Contributions

#### Why should I contribute?

1. While we strive to look at new issues as soon as we can, because of the many priorities we juggle and limited resources, issues raised often don't get looked into soon enough.
2. We want your contributions. We are always trying to improve our docs, processes and tools to make it easier to submit your own changes.
3. With the build system and auto-deployment to npm, using AtlasKit components in your projects simplifies your development stack. Treat AtlasKit as part of your codebase and make changes in it.
4. At Atlassian, "Play, As A Team" is one of our values. We encourage cross team contributions and collaborations.

Please raise a new issue [here][IssueTracker]. (Atlassians, please use this [internal link][AtlassianBug].)


# How do I...


## Setup my local environment

Please follow the **Installation** and the **Tests** section of the [README](./README.md) to get started.


## Generate a new component skeleton
```
yarn run create my-component-name
```

Will create a new templated component under `packages/my-component-name` with everything you need to get started.

## Flesh-out a component
The entry point to your component will be defined in it's `package.json` under the `ak:webpack:raw` key.

## Verify a component bundle
If you want to check that webpack is correctly bundling your component, you can build it locally to confirm.

```
yarn run prepublish/single my-component-name
```

This will build the component and place the generated bundle under `packages/my-component-name/dist/`.

## Document a component
Components should be documented using storybook readmes. Look at existing components and the `@atlaskit/util-readme` component for examples of how to do this.

Components also have a `docs/USAGE.md` file which is used to generate a `README.md` file for use in npm. This should only have the bare minimum information in it and should point
the user to the registry for more detailed information. See other components (and the component template) for examples of this.

## Test a component

### Storybook
AtlasKit uses [React Storybook](https://github.com/kadirahq/react-storybook) to provide interactive examples of each component.

#### Viewing the storybook

* To run a storybook for a single component: `yarn run storybook @atlaskit/my-component-name`

#### Publishing the storybook

* To output all storybooks as a static website: `yarn run storybook/static -- -o your_target_dir`
* To output a single component storybook as a static website: `yarn run storybook/static/single @atlaskit/my-component-name -- -o your_target_dir`


### Browserstack tests
Browserstack is a tool that lets you run your unit tests in a larger set of browsers running different versions.

To run the Browserstack tests for a single component:

```
BROWSERSTACK_USERNAME=... BROWSERSTACK_KEY=... yarn run test/wc/single/browserstack my-component
```

You can also run all the Browserstack tests with Docker (as they are run in the CI):

```
BROWSERSTACK_USERNAME=... BROWSERSTACK_KEY=... docker-compose -f docker-compose-browserstack.yml up
```

### Follow code style guidelines
We are adhering to the [Airbnb](https://github.com/airbnb/javascript) javascript linting rules, which can be quite strict.

Eslint will automatically run when attempting to commit, but can also run at any time using: `yarn run lint`

*Note:* a lot of linting issues can be fixed automatically by passing the --fix flag to eslint: `yarn run lint -- --fix`

### Modifying ESLint rules

In order to modify the ESLint rules, you can add the rules to the `.eslintrc` file in the `eslint-config-ak-base` package.

The packages are linked to the main AtlasKit directory so that the new eslint configuration will be effective immediately.

Changes to the ESLint rules should be treated like any other package:

- If you fix a rule, it should be considered a fix
- If you add a rule, it should be considered a feature
- If you change / remove a rule, it should be considered breaking

## Using TypeScript for a component

AtlasKit supports using TypeScript to write components. TypeScript brings static type checking to the JavaScript ecosystem and lets you concisely describe the interfaces between components (which is incredibly powerful for a set reusable shared components like Atlaskit).

Using TypeScript is optional, leaving the decision to be made on a per-component basis.

In case of "no module X" errors when importing other AtlasKit packages, they might be missing types. Make sure that `package.json` of imported packages contains "types" section pointing to a TS file (i.e. "src/index.d.ts"). In most cases it's enough to describe the main React component with its Props, which is the public API for most Atlaskit packages.

* To get started, use the `yarn run create-ts my-component-name` command.
* A single version of TypeScript is used in the repo, however each component has its own `tsconfig.json` for configuration.

### Configuration

The structure of a TypeScript component contains a few important files, so it's helpful to familiarise yourself with them:

* `/tsconfig.json` -- Component-specific configuration.
* `/build/es5/tsconfig.json` -- ES5 distribution configuration.
* `/build/es2015/tsconfig.json` -- ES2015 distribution configuration.
* `package.json` -- Contains an NPM `build` script.
* `/index.ts` -- An entrypoint to the package (used only in development).
* `/.npmignore` -- Excludes `/index.ts` from being published (`main` and `jsnext:main` are used as entrypoints in published components).

The `packages/util-component-ts-template` component should serve as a reference for these.

### Linting

[TSLint](https://palantir.github.io/tslint/) is used (instead of ESLint) to lint TypeScript files (`.d.ts`, `.ts`, `.tsx`). TSLint also supports linting JavaScript files (`.js`) but this is disabled in favour of ESLint.

* To run TSLint (without ESLint) across all components: `yarn run validate/tslint`
* To run TSLint only for changed files: `yarn run validate/tslint/changed`
* To automatically fix TSLint violations: `yarn run validate/tslint/fix`
* To lint in VS Code, install the TSLint extension and set the `"tslint.ignoreDefinitionFiles": false` workspace setting.

All packages should use a consistent set of TSLint rules (found in `tslint.json`).

#### Custom TSLint rules

Custom TSLint rules can be written and contributed to the repo to enforce patterns. This can be used as to 'incubate' new rules before promoting them to standalone packages, or to house rules that are Atlaskit specific.

These rules live in `build/tslint/rules`.

### Packaging

All packages should aim to publish TypeScript declaration files, as this is an extremely powerful mechanism for validating contracts between components. Publishing declarations allows TypeScript consumers to automatically verify interface stability when updating components.

The TypeScript compiler alone (no Babel) is used to publish ES5 and ES2015 distributions, using configuration in each package:

* `packages/*/build/es5/tsconfig.json`
* `packages/*/build/es2015/tsconfig.json`

Summary of published assets:

* `dist/es2015` -- ES2015 compatible assets (referenced via `jsnext:main` in `package.json`).
* `dist/es5` -- ES5 compatible assets (referenced via `main` in `package.json`).
* `dist/types` -- TypeScript declarations.
* `package.json` -- contains `types`, `main`, and `jsnext:main` entrypoint references.
* `src/` -- contains original sources, for use with [source maps](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#).

#### Component-specific TypeScript configuration

In some cases it's desirable to customise the TypeScript configuration for a specific component. The `tsconfig.json` file in each component provides this flexibility.

For example if a component requires an ES2015 global like `Promise`, it needs to include the appropriate `lib` value in its `tsconfig.json`:

```json
{
  "extends": "../../build/types/tsconfig.base",
  "include": [
    "**/*"
  ],
  "compilerOptions": {
    "lib": [
      "dom",
      "es5",
      "scripthost",
      "es2015.collection",
      "es2015.iterable",
      "es2015.promise"
    ]
  }
}
```

This configuration would compile the package using only the listed ES2015 declarations.

It is the responsibility of each package to document their environment requirements (e.g. presence of `window.Promise`).

### Using `test-helper`

Use the `test-helper` like below. Please don't directly import from `src`;

```js
import { exportName } from '@atlaskit/editor-core/dist/es5/test-helper';
```

### Using `@types/` declarations

AtlasKit supports consumers using the `"strictNullChecks": true` compiler option, by itself using that option. A side effect of this is that global untyped packages are not implicitly `any`, and must instead have types provided.

This means that if you're using a package that doesn't ship with types, there are two options:

* Install an appropriate `@types/package-name` package from NPM (in Atlaskit's root `package.json`), or
* Write a `build/types/package-name.d.ts` file that contains the types
* Raise an issue / pull request to the upstream library to include types

In both of these cases, `build/types/tsconfig.base.json` needs to be updated.

**Pitfalls of `@types/` declarations:**

`@types/package-name` declarations are ambient and contain `declare module "package-name" {}` statements. This style of declaration must be executed once **any only once**. Unfortunately this requirement can be violated when multiple packages declare a `@types/` package as a `dependencies`, since NPM can choose to install multiple instances of a package in its nested `node_modules/` hierarchy. There are two solutions here:

* Add the `@types/package-name` dependency to Atlaskit's root `package.json`. In components either don't declare the `@types/package-name` dependency, or use `peerDependency` instead of `dependency`.
* Encourage library authors to bundle TypeScript declarations in their own package, to avoid the need for an `@types/package-name` package entirely.

### TypeScript consumers

TypeScript users that are consuming packages that are not-TypeScript should rely on `declare module '@atlaskit/*'` inside `build/type/wildcare.d.ts` to provide types; as not all packages contains a types.

## Commit changes
To ensure that all commit messages are formatted correctly, we use Commitizen in this repository. It provides a [Yeoman](http://yeoman.io/)-like interface that creates your commit messages for you. Running commitizen is as simple as running `yarn run commit` from the root of the repo. You can pass all the same flags you would normally use with `git commit`.

```
yarn run commit -- -a
```
Note: it automatically runs [linting](#markdown-header-follow-code-style-guidelines) and validation *before* you commit, to prevent you from having to answer all the questions twice.


## Merge into master
All new feature code must be completed in a feature branch and have a corresponding Feature or Bug issue in the AtlasKit project. Create your branch off `master` and include both the issue key and brief summary in the branch name like this: `issue/AK-9001-dropdown-click-events-now-propagate-correctly`.

Once you are happy with your changes, you must push your branch to Bitbucket and create a pull request. All pull requests must have at least 2 reviewers from the AtlasKit team. Once the pull request has been approved it may be merged into master.

**Attention! Achtung! Bнимaние! Atención! ध्यान! 注意!**: *Merging into master will automatically release a component. See below for more details*

## Release a component
Releasing components is completely automated. The process of releasing will begin when changes are made to the `master` branch:

* Linting is run
* Tests will be run in Browserstack
* Component dist is built
* [semantic-release](https://github.com/atlassian/lerna-semantic-release) will bump the versions for any component that has changed
* Change log is generated automatically from commit messages
* Component will be published to npm

## Update a root dependency of AtlasKit
All root dependencies in AtlasKit are controlled through `yarn`, hence use the `package.json` and `yarn.lock` files to manage this.

You will **never** need to update these two files manually (for deps, scripts are fine). **ALL** changes to do with deps should be done through yarn itself.

### Adding a root dependency
This is the same as adding a dependency to any other package.

```sh
yarn add packageName
```

This will update the `package.json` and `yarn.lock` files and reinstall all dependencies. You can also use the normal npm semver ranges in your installation (some terminals will require you to quote this)

```sh
yarn add "packageName@^1.2.3"
```

### Removing a root dependency
This is the same as removing a dependency in any other package

```sh
yarn remove packageName
```

Ensure you use yarn for this and you don't just remove it the line from `package.json`.

### Modifying an existing root dependency
Again, it is vitally important that **all** upgrades/changes are done through yarn. Do **not** modify package.json versions manually.

```sh
yarn upgrade packageName
# will update a package to the @latest version on npm
yarn upgrade "packageName@^1.2.3"
# will update a package to the latest version that fulfills that semver range (also updates the package.json and yarn.lock files)
```

### Fixing a merge conflict with root dependencies
This can feel slightly cumbersome, but the easiest way to solve these conflicts is to:

* Note the changes you have made to the `package.json` (added dependency XYZ, set dependency ABC to use version "^1.2.3", etc)
* (If you've made changes to any scripts, you will want to copy those somewhere)
* Take all of master's changes over the top of yours
    ```sh
    git checkout --theirs yarn.lock package.json
    ```
* Redo each of your changes using the appropriate yarn commands.
    ```sh
    yarn add XYZ
    yarn upgrade "ABC@^1.2.3"
    ```
* Commit as usual
    ```sh
    git add yarn.lock package.json
    yarn run commit
    ```

Doing it like this will ensure you don't update any extra dependencies that you don't need to.

**DO NOT** delete the `yarn.lock` file under any circumstance, this can lead to a lot of issues in places you wont be expecting.

## Add a package dependency
The easiest way to install a dependency within a package is to either add it directly to the package's `package.json` and bootstrapping that package (see `Getting Started`) or by
performing a `yarn add` from **within** the package itself (this will create a `yarn.lock` file that we do not push to the repository).

Our package dependencies are not pinned in any way.

If you're using TypeScript and encounter TS errors "no module X", one of the packages might be missing TS types. See [Using TypeScript for a component](#markdown-header-using-typescript-for-a-component) section for more details.

## Make changes to the Pipelines build
AtlasKit uses Bitbucket Pipelines for it's continuous integration. The build scripts are defined in `bitbucket-pipelines.yml`.

### CloudFront caching

If you ever need to purge the CF cache for AtlasKit (Storybooks, Registry, PR artifacts) you can use the `invalidate-atlaskit-cache` branch. Just rerun the last build or merge `master` into it.

### AtlasKit Docker image
Bitbucket pipelines works using a Docker image. This contains the initial setup required to run the build. If you need to make changes to `Dockerfile`, you will need to push them to Dockerhub:

Build the new Docker image:

```
yarn run build/docker/image
```

**Note:** Use the shared credentials to publish to docker (ask for access).

If you want to create a new image and download all the latest dependencies without actually changing the Dockerfile, you can use:

```console
yarn run build/docker/image -- --no-cache
```

**Note:** Make sure you also update the `bitbucket-pipelines.yml` file with the name of your new image!


### Checking Consistency of the repository

There are several ways that things can become out of date within the Atlaskit repository. The build is designed in a way that most
issues will fix themselves on the next master build, but some are not possible to fix like this. To help track down these issues we
have a health check script that can be used to quickly identify possible issues.

```sh
yarn run health-check
```

Will display a table of components and versions, highlighing any discrepencies between local, npm and the registry.

It will also look for storybooks on the registry that are not available.

The root cause of each of these can vary widely, and all should be investigated. Most of the time, simply pushing a dummy commit
with `"fix(dummy): ..."` should be enough.

</section>

[CODEOFCONDUCT]: ./CODE_OF_CONDUCT.md
[IssueTracker]: https://bitbucket.org/atlassian/atlaskit/issues?status=new&status=open
[AtlassianBug]: http://go/ak-bug
