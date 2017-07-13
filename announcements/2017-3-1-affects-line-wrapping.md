# Affects line wrapping

There was a bug in cz-lerna-changelog@1.2.0 where the affects line would wrap
after 100 characters. This meant that lerna-semantic-release would not pick up
the components on the next line.

This has been fixed in 1.2.1, and is now updated in AtlasKit.

You may need to re-release components (make dummy commits that affect your
components) that had release commits where you affected more than one component.

If you don't, the changes will be bundled into the next release.
