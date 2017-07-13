# @atlaskit/editor-jira

## 18.2.3 (2017-07-13)


## 18.2.3 (2017-07-13)

* bug fix; re-releasing packages that failed previous release
* fix; bump editor-core in all editor-* packages ([9814e09](https://bitbucket.org/atlassian/atlaskit/commits/9814e09))
* fix; bump editor-core to version 39.0.0 ([41a0491](https://bitbucket.org/atlassian/atlaskit/commits/41a0491))

## 18.2.2 (2017-07-07)


* fix; add view context support in encoder ([6e36036](https://bitbucket.org/atlassian/atlaskit/commits/6e36036))

## 18.2.1 (2017-07-04)


* fix; make sure that editorView exists before getting mediaPluginState ([923135a](https://bitbucket.org/atlassian/atlaskit/commits/923135a))

## 18.2.0 (2017-07-03)


* feature; improve media encoding in JIRA ([17695b1](https://bitbucket.org/atlassian/atlaskit/commits/17695b1))

## 18.1.2 (2017-06-26)


* fix; fIxing plugin order in editorcq, editor-jira and editor-bitbucket. ([4ac0594](https://bitbucket.org/atlassian/atlaskit/commits/4ac0594))

## 18.1.1 (2017-06-21)


* fix; fix optional attrs after media insertion ([f461365](https://bitbucket.org/atlassian/atlaskit/commits/f461365))

## 18.1.0 (2017-06-20)


* fix; destroy providerFactory on editor unmount ([5759528](https://bitbucket.org/atlassian/atlaskit/commits/5759528))


* feature; add support for encoding/parsing adjacent attachments as mediaGroup ([6accb7a](https://bitbucket.org/atlassian/atlaskit/commits/6accb7a))

## 18.0.0 (2017-06-16)


* fix; use latest editor-core with new dropdowns/popup ([a0b3aa7](https://bitbucket.org/atlassian/atlaskit/commits/a0b3aa7))


* breaking; In order to use editor inside of the "overflow: hidden" container you need to pass
'popupsMountPoint' prop wich must be a reference to DOM element where to mount popups otherwise they
will be cut by "overflow: hidden" container.

## 17.0.1 (2017-06-15)


* fix; prevent editor jira from blowing up by checking if mediaPluginState exists ([6b07bad](https://bitbucket.org/atlassian/atlaskit/commits/6b07bad))

## 16.0.0 (2017-06-12)

## 16.0.0 (2017-06-09)


* fix; bump editor-core to the new major version ([7c87399](https://bitbucket.org/atlassian/atlaskit/commits/7c87399))
* fix; remove context prop from the editors (not used anymore) ([fd147c0](https://bitbucket.org/atlassian/atlaskit/commits/fd147c0))


* breaking; ED-1369
* breaking; ED-1704

## 15.10.0 (2017-06-07)


* fix; refactor partly editor-jira html.ts tests. ([8e3e03f](https://bitbucket.org/atlassian/atlaskit/commits/8e3e03f))
* fix; removed duplicated tests. ([508f045](https://bitbucket.org/atlassian/atlaskit/commits/508f045))


* feature; updated jira to have hyperlink new behaviours. ([5fa3840](https://bitbucket.org/atlassian/atlaskit/commits/5fa3840))

## 15.9.0 (2017-06-05)


* fix; use latest editor-core with new PM ([caffe29](https://bitbucket.org/atlassian/atlaskit/commits/caffe29))


* feature; add colour picker to editor-jira ([18c17f5](https://bitbucket.org/atlassian/atlaskit/commits/18c17f5))

## 15.8.0 (2017-06-02)


* feature; add "errorReporter" property to all editors. Check out docs/USAGE.md for example usage ([63bd615](https://bitbucket.org/atlassian/atlaskit/commits/63bd615))

## 15.7.0 (2017-05-31)


* fix; use latest editor-core ([eebbb00](https://bitbucket.org/atlassian/atlaskit/commits/eebbb00))
* fix; use new nodeviews ([2763163](https://bitbucket.org/atlassian/atlaskit/commits/2763163))


* feature; add mediaProvider property support to editor-jira and also media nodes support ([56e6a3c](https://bitbucket.org/atlassian/atlaskit/commits/56e6a3c))

## 15.6.1 (2017-05-17)


* fix; properly handle empty blockqoute and code blocks in parser for editor-jira ([4834d2c](https://bitbucket.org/atlassian/atlaskit/commits/4834d2c))
* fix; use new published core version ([8c50b0b](https://bitbucket.org/atlassian/atlaskit/commits/8c50b0b))

## 15.4.0 (2017-05-09)

## 15.4.0 (2017-05-09)

## 15.4.0 (2017-05-09)


* fix; make sure .focus() isn't called when editor is already focused ([2f7336e](https://bitbucket.org/atlassian/atlaskit/commits/2f7336e))


* feature; use createSchema helper in editor-jira ([03c862a](https://bitbucket.org/atlassian/atlaskit/commits/03c862a))

## 15.3.4 (2017-05-08)

## 15.3.3 (2017-05-05)


* fix; fix focus at expand of JIRA editor. ([447c0c9](https://bitbucket.org/atlassian/atlaskit/commits/447c0c9))
* fix; parse preformatted-macros to code with language=plain ([3fae2ef](https://bitbucket.org/atlassian/atlaskit/commits/3fae2ef))

## 15.3.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 15.3.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 15.3.0 (2017-04-24)


* fix; revert blur blocking wrapper and updates editor-core version ([b351032](https://bitbucket.org/atlassian/atlaskit/commits/b351032))


* feature; update editor-core to 14.5.2 ([33150d0](https://bitbucket.org/atlassian/atlaskit/commits/33150d0))

## 15.2.0 (2017-04-18)


* feature; updated package to use latest core. ([00d5644](https://bitbucket.org/atlassian/atlaskit/commits/00d5644))

## 15.1.1 (2017-04-12)


* feature; updated editor cq and hipchat to use the latest plugin structure. ([9a81587](https://bitbucket.org/atlassian/atlaskit/commits/9a81587))

## 15.1.0 (2017-04-12)


* fix; prevent blur event to propagate to parent containers of editor-jira ([46bca8d](https://bitbucket.org/atlassian/atlaskit/commits/46bca8d))


* feature; add subsup under the allowSubSup flag ([d9b703e](https://bitbucket.org/atlassian/atlaskit/commits/d9b703e))

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)


* fix; export schema interfaces ([ac3c9ac](https://bitbucket.org/atlassian/atlaskit/commits/ac3c9ac))

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-11)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)

## 2.0.0 (2017-04-10)


* fix; fix code mark in schema for editor-jira ([c43acff](https://bitbucket.org/atlassian/atlaskit/commits/c43acff))
* fix; fix review marks ([ef373b8](https://bitbucket.org/atlassian/atlaskit/commits/ef373b8))
* fix; upgrade editor-jira to use the latest atlaskit/editor-core with new prosemirror API ([e1d0ea6](https://bitbucket.org/atlassian/atlaskit/commits/e1d0ea6))


* breaking; ED-1194

## 1.18.0 (2017-04-04)

## 1.18.0 (2017-04-04)

## 1.18.0 (2017-04-04)

## 1.17.1 (2017-04-04)


* fix; strip span tags in the code block from jira ([21640a2](https://bitbucket.org/atlassian/atlaskit/commits/21640a2))


* feature; add blockquote supprot to editor-jira ([f4316d0](https://bitbucket.org/atlassian/atlaskit/commits/f4316d0))

## 1.17.0 (2017-04-03)


* feature; convert JIRA preformatted macros down to code block ([860663d](https://bitbucket.org/atlassian/atlaskit/commits/860663d))

## 1.16.1 (2017-03-31)

## 1.16.0 (2017-03-28)


* feature; enable markdown inputrules for JIRA ([bc1637c](https://bitbucket.org/atlassian/atlaskit/commits/bc1637c))

## 1.15.0 (2017-03-28)


* fix; correct list types for nested bullet lists ([fa81c73](https://bitbucket.org/atlassian/atlaskit/commits/fa81c73))

## 1.14.0 (2017-03-27)


* feature; add code-block support to editor-jira ([ee6a1cd](https://bitbucket.org/atlassian/atlaskit/commits/ee6a1cd))
* feature; parse jira issue marker to plain text ([040fc13](https://bitbucket.org/atlassian/atlaskit/commits/040fc13))

## 1.13.0 (2017-03-23)


* feature; bump editor-core version ([94da2a6](https://bitbucket.org/atlassian/atlaskit/commits/94da2a6))

## 1.12.0 (2017-03-23)

## 1.11.0 (2017-03-22)


* feature; enable nested lists in editor-jira ([622d52e](https://bitbucket.org/atlassian/atlaskit/commits/622d52e))
* feature; remove redundant deps and update editor-core to version without redundant deps ([326f225](https://bitbucket.org/atlassian/atlaskit/commits/326f225))

## 1.10.1 (2017-03-21)

## 1.10.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.10.0 (2017-03-21)


* feature; bump editor-core version in editor-jira ([26ad7d9](https://bitbucket.org/atlassian/atlaskit/commits/26ad7d9))

## 1.9.0 (2017-03-20)

## 1.8.0 (2017-03-17)

## 1.7.1 (2017-03-17)


* fix; upgrade TypeScript to 2.2.1 ([2aa28fc](https://bitbucket.org/atlassian/atlaskit/commits/2aa28fc))
* fix; migrate from `mono` to `code` ([8824a64](https://bitbucket.org/atlassian/atlaskit/commits/8824a64))


* feature; add flag to disable advanced text formatting in editor-jira ([5ef4805](https://bitbucket.org/atlassian/atlaskit/commits/5ef4805))

## 1.7.0 (2017-03-15)


* feature; adding clear formatting option to editor-bitbucket, editor-jira and editor-cq. ([995877f](https://bitbucket.org/atlassian/atlaskit/commits/995877f))
* feature; adding data-parent attrubute to list html content generated by JIRA encoder. ([fe96d7a](https://bitbucket.org/atlassian/atlaskit/commits/fe96d7a))

## 1.5.0 (2017-03-14)

## 1.5.0 (2017-03-14)


* feature; add links support for editor-jira ([40c6bcd](https://bitbucket.org/atlassian/atlaskit/commits/40c6bcd))

## 1.4.0 (2017-03-13)


* feature; add custom encoders for Jira, currently supports only mention encoder ([e113578](https://bitbucket.org/atlassian/atlaskit/commits/e113578))
* feature; add mentions support to editor-jira ([7a01b55](https://bitbucket.org/atlassian/atlaskit/commits/7a01b55))

## 1.3.3 (2017-03-08)

## 1.3.2 (2017-03-03)


* fix; adding DefaultKeymapsPlugin for new Redo keymaps to editor-bitbucket, editor-jira an ([b70508b](https://bitbucket.org/atlassian/atlaskit/commits/b70508b))
* fix; bumping editor-core dependency ([8ccd2fc](https://bitbucket.org/atlassian/atlaskit/commits/8ccd2fc))
* fix; updating editor-core version ([03f989f](https://bitbucket.org/atlassian/atlaskit/commits/03f989f))


* updated dependency version ([b192339](https://bitbucket.org/atlassian/atlaskit/commits/b192339))

## 1.3.1 (2017-02-23)


* version imports and exports. ([e99a324](https://bitbucket.org/atlassian/atlaskit/commits/e99a324))

## 1.3.0 (2017-02-20)


* add component version as API, upgrade cmps to [@ak](https://github.com/ak)/editor-core, send pkg and core version when ([e3d4654](https://bitbucket.org/atlassian/atlaskit/commits/e3d4654))

## 1.2.0 (2017-02-14)


* feature; Allow JIRA editor to be collapsed ([9044171](https://bitbucket.org/atlassian/atlaskit/commits/9044171))

## 1.1.4 (2017-02-07)

## 1.1.3 (2017-02-07)


* fix; Add a readme story. ([b607b6d](https://bitbucket.org/atlassian/atlaskit/commits/b607b6d))
* fix; Rearrange tsconfig.json organisation to allow per-package configuration. ([6c6992d](https://bitbucket.org/atlassian/atlaskit/commits/6c6992d))

## 1.1.2 (2017-02-03)


* Encode empty documents as '' rather than &nbsp; ([940fb5e](https://bitbucket.org/atlassian/atlaskit/commits/940fb5e))
* Handle JIRA encoding multiple <br> and <hr>. ([f177d4c](https://bitbucket.org/atlassian/atlaskit/commits/f177d4c))
* fix; Add a Readme story. ([68791cf](https://bitbucket.org/atlassian/atlaskit/commits/68791cf))
