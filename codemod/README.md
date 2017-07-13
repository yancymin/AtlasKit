# Usage
See the Installation and Usage guide in the [jscodeshift repo](https://github.com/facebook/jscodeshift).
An example usage might look something like this:
```
jscodeshift -t codemod/icon/6-to-7 packages/navigation/stories
```
### Useful tips
* Pass the `-d` flag to do a dry run.
* Pass the `-p` flag to print the output of each transformation.
* By default the jscodeshift will only transform `.js` files. You can specify other extensions with the `--extensions` flag. e.g. `--extensions js,jsx`.

# Existing codemods
### @atlaskit/icon@7.0.0
```
jscodeshift -t codemod/icon/6-to-7 <target>
```
This codemod addresses the breaking change in icon 7.0.0 by refactoring all unsupported `import` statements.
Here's an example of outdated code:
```javascript
import Icon from '@atlaskit/icon/lib/Icon'; // Importing the Icon component
import { AtlassianIcon } from '@atlaskit/icon'; // Importing a glyph
```
This codemod would refactor the above to:
```javascript
import Icon from '@atlaskit/icon'; // Importing the Icon component
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian'; // Importing a glyph
```
Refer to the test suite for a comprehensive description of how this codemod behaves.
