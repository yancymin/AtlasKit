import { expect } from 'chai';
import {
  isSafeUrl,
  isSubSupType,
  getValidNode,
  getValidMark,
  getValidUnknownNode,
  getMarksByOrder,
  isSameMark,
  markOrder,
} from '../../../src/renderer/validator';

import schema from '../../../stories/schema';
import { createSchema } from '../../../src/schema';

describe('Renderer - Validator', () => {

  describe('isSafeUrl', () => {
    const safeURLs = [
      'http:///www.atlassian.com',
      'https://www.atlassian.com',
      'ftp://some.site.com',
      'ftps://some.site.com',
      '//www.atlassian.com',
      '//hipchat.com',
      '//subdomain.somedomain.com',
      '//www.atlassian.com/somepage',
      'mailto:user@mail.com'
    ];

    const unsafeURLs = [
      'javascript:alert("Hello World!")',
      ' javascript:alert("Hello World!")',
      '\njavascript:alert("Hello World!")',
    ];

    it('should return true if URL starts with http://, https://, ftp://, ftps:// etc', () => {
      safeURLs.forEach(url => {
        expect(isSafeUrl(url)).to.equal(true);
      });
    });

    it('should return false for "unsafe" URLs', () => {
      unsafeURLs.forEach(url => {
        expect(isSafeUrl(url)).to.equal(false);
      });
    });
  });

  describe('isSubSupType', () => {
    it('should return false if type is not "sub" or "sup"', () => {
      expect(isSubSupType('banana')).to.equal(false);
    });

    it('should return true if type is "sub"', () => {
      expect(isSubSupType('sub')).to.equal(true);
    });

    it('should return true if type is "sup"', () => {
      expect(isSubSupType('sup')).to.equal(true);
    });
  });

  describe('getValidNode', () => {

    describe('applicationCard', () => {
      it('should return "text" if attrs is missing', () => {
        expect(getValidNode({ type: 'applicationCard' }).type).to.equal('text');
      });

      it('should return "text" if attrs.text is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {}
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.title is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard'
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.title.text is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: {}
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.link.url is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            link: {}
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.background.url is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            background: {}
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.preview.url is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            preview: {}
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.description.text is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            description: {}
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.details is not an array', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            details: { yes: 'no' }
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.details[].badge.value is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            details: [
              {
                badge: {}
              }
            ]
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.details[].lozenge.text is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            details: [
              {
                lozenge: {}
              }
            ]
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.details[].users is not an array', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            details: [
              {
                users: { yes: 'no'}
              }
            ]
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });

      it('should return "text" if attrs.details[].users[].icon is missing', () => {
        const applicationCard = {
          type: 'applicationCard',
          attrs: {
            text: 'applicationCard',
            title: { text: 'applicationCard' },
            details: [
              {
                users: [ { id: 'id'} ]
              }
            ]
          }
        };
        expect(getValidNode(applicationCard).type).to.equal('text');
      });
    });

    describe('doc', () => {
      it('should return "text" if version-field is missing', () => {
        expect(getValidNode({ type: 'doc' }).type).to.equal('text');
      });

      it('should return "text" if content-field is missing', () => {
        expect(getValidNode({ type: 'doc', version: 1 } as any).type).to.equal('text');
      });

      it('should return "text" if content-field is empty-array', () => {
        expect(getValidNode({ type: 'doc', version: 1, content: [] } as any).type).to.equal('text');
      });

      it('should return "doc" with content field and without version', () => {
        expect(getValidNode({ type: 'doc', version: 1, content: [{ type: 'unknown' }] } as any)).to.deep.equal({
          type: 'doc',
          content: [
            {
              type: 'text',
              text: '[unknown]',
            },
          ],
        });
      });
    });

    describe('emoji', () => {
      it('should pass through attrs as emoji', () => {
        const emojiId = { shortName: ':grinning:', id: '123', fallback: 'cheese' };
        const { type, attrs } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(type).to.equal('emoji');
        expect(attrs).to.deep.equal(emojiId);
      });

      it('should pass through attrs with only shortName as emoji', () => {
        const emojiId = { shortName: ':grinning:' };
        const { type, attrs } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(type).to.equal('emoji');
        expect(attrs).to.deep.equal(emojiId);
      });

      it('should reject emoji without shortName', () => {
        const emojiId = { id: '123', fallback: 'cheese' };
        const { type } = getValidNode({ type: 'emoji', attrs: emojiId });
        expect(type).to.equal('text');
      });
    });

    describe('hardBreak', () => {
      it('should return "hardBreak"', () => {
        expect(getValidNode({ type: 'hardBreak' })).to.deep.equal({ type: 'hardBreak' });
      });

      it('should discard any extranous attributes', () => {
        expect(getValidNode({ type: 'hardBreak', attrs: { color: 'green' } })).to.deep.equal({ type: 'hardBreak' });
      });
    });

    describe('mention', () => {
      it('should return "unknown" if it can not find an ID ', () => {
        expect(getValidNode({ type: 'mention', attrs: { text: '@Oscar' } }).type).to.deep.equal('text');
      });

      it('should use attrs.text if present', () => {
        expect(getValidNode({ type: 'mention', attrs: { text: '@Oscar', id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@Oscar',
            id: 'abcd-abcd-abcd'
          }
        });
      });

      it('should use attrs.displayName if present and attrs.text is missing', () => {
        expect(getValidNode({ type: 'mention', attrs: { displayName: '@Oscar', id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@Oscar',
            id: 'abcd-abcd-abcd'
          }
        });
      });

      it('should use .text if present and attrs.text and attrs.displayName is missing', () => {
        expect(getValidNode({ type: 'mention', text: '@Oscar', attrs: { id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@Oscar',
            id: 'abcd-abcd-abcd'
          }
        });
      });

      it('should set attrs.text to "@unknown" if no valid text-property is available', () => {
        expect(getValidNode({ type: 'mention', attrs: { id: 'abcd-abcd-abcd' } })).to.deep.equal({
          type: 'mention',
          attrs: {
            text: '@unknown',
            id: 'abcd-abcd-abcd'
          }
        });
      });

    });

    describe('paragraph', () => {
      it('should return "text" if content-field is missing', () => {
        expect(getValidNode({ type: 'paragraph' }).type).to.equal('text');
      });

      it('should return "paragraph" if content-field is empty array', () => {
        expect(getValidNode({ type: 'paragraph', content: [] }).type).to.equal('paragraph');
      });

      it('should return "paragraph" with content', () => {
        expect(getValidNode({ type: 'paragraph', content: [{ type: 'text', text: 'Hello World' }] })).to.deep.equal({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Hello World'
            }
          ]
        });
      });
    });

    describe('text', () => {
      it('should return "text" with text', () => {
        expect(getValidNode({ type: 'text', text: 'Hello World' })).to.deep.equal({
          type: 'text',
          text: 'Hello World',
        });

        expect(getValidNode({ type: 'text', text: 'Hello World', marks: [{ type: 'strong' }] })).to.deep.equal({
          type: 'text',
          text: 'Hello World',
          marks: [
            {
              type: 'strong'
            }
          ]
        });
      });
    });

    describe('mediaGroup', () => {
      it('should return "mediaGroup" with type and content', () => {
        expect(getValidNode({
          type: 'mediaGroup',
          content: [
            {
              type: 'media',
              attrs: {
                type: 'file',
                id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
                collection: 'MediaServicesSample'
              }
            }
          ]
        })).to.deep.equal({
          type: 'mediaGroup',
          content: [
            {
              type: 'media',
              attrs: {
                type: 'file',
                id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
                collection: 'MediaServicesSample'
              }
            }
          ]
        });
      });
    });

    describe('media', () => {
      it('should return "media" with attrs and type', () => {
        expect(getValidNode({
          type: 'media',
          attrs: {
            type: 'file',
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            collection: 'MediaServicesSample'
          }
        })).to.deep.equal({
          type: 'media',
          attrs: {
            type: 'file',
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            collection: 'MediaServicesSample'
          }
        });
      });
    });

    it('should overwrite the default schema if it gets a docSchema parameter', () => {
      // rule is taken out in following schema
      const schema = createSchema({
        nodes: [
          'doc',
          'paragraph',
          'text',
          'bulletList',
          'orderedList',
          'listItem',
          'heading',
          'blockquote',
          'codeBlock',
          'panel',
          'image',
          'mention',
          'hardBreak',
          'emoji',
          'mediaGroup',
          'media',
          'table',
          'tableCell',
          'tableHeader',
          'tableRow',
        ],
        marks: [
          'em',
          'strong',
          'code',
          'strike',
          'underline',
          'link',
          'mentionQuery',
          'emojiQuery',
          'textColor',
          'subsup',
        ]
      });

      const doc = {
        type: 'doc' as 'doc',
        version: 1 as 1,
        content: [
          {
            type: 'rule',
          }
        ]
      };
      const result = getValidNode(doc, schema);

      expect(result.content![0].type).to.equal('text');
      expect(result.content![0].text).to.equal('[rule]');
    });

  });

  describe('getValidUnknownNode', () => {

    describe('unknown inline nodes', () => {
      it('should return "text" node if content is absent', () => {
        const unknownInlineNode = getValidUnknownNode({ type: 'foobar' });
        expect(unknownInlineNode.type).to.equal('text');
      });

      it('should return "text" node if content is empty', () => {
        const unknownInlineNode = getValidUnknownNode({ type: 'foobar', content: [] });
        expect(unknownInlineNode.type).to.equal('text');
      });

      it('should store textUrl attribute in "href" attribute', () => {
        const unknownInlineNode = getValidUnknownNode({ type: 'foobar', attrs: { textUrl: 'https://www.atlassian.com' } });
        expect(unknownInlineNode.marks).to.have.length(1);
        expect(unknownInlineNode.marks![0].attrs.href).to.equal('https://www.atlassian.com');
      });

      it('should use default text', () => {
        const unknownInlineNode = getValidUnknownNode({ type: 'foobar', text: 'some text', attrs: { text: 'some text from attrs' } });
        expect(unknownInlineNode.text).to.equal('some text');
      });

      it('should use node.attrs.text if text is missing', () => {
        const unknownInlineNode = getValidUnknownNode({ type: 'foobar', attrs: { text: 'some text from attrs' } });
        expect(unknownInlineNode.text).to.equal('some text from attrs');
      });

      it('should use original type in square brackets if neither text nor attrs.text is missing', () => {
        const unknownInlineNode = getValidUnknownNode({ type: 'foobar' });
        expect(unknownInlineNode.text).to.equal('[foobar]');
      });
    });

    describe('unknown block nodes', () => {
      it('should build flattened tree from unknown block node #1', () => {
        const node = {
          type: 'foobar',
          content: [
            {
              type: 'text',
              text: 'hello'
            },
            {
              type: 'world-node-type',
              text: 'world'
            },
          ],
        };

        const unknownBlockNode = getValidUnknownNode(node);
        expect(unknownBlockNode).to.deep.equal({
          type: 'unknownBlock',
          content: [
            {
              type: 'text',
              text: 'hello'
            },
            {
              type: 'text',
              text: ' '
            },
            {
              type: 'text',
              text: 'world',
            },
          ],
        });
      });

      it('should build flattened tree from unknown block node #2', () => {
        const node = {
          type: 'foobar-table',
          content: [
            {
              type: 'foobar-row',
              content: [
                {
                  type: 'text',
                  text: 'hello mate'
                },
              ]
            },
            {
              type: 'foobar-row',
              content: [
                {
                  type: 'foobar-cell',
                  content: [
                    {
                      type: 'text',
                      text: 'this is'
                    },
                    {
                      type: 'special-sydney-node-type',
                      text: 'Sydney!'
                    }
                  ]
                }
              ]
            },
          ],
        };

        const unknownBlockNode = getValidUnknownNode(node);
        expect(unknownBlockNode).to.deep.equal({
          type: 'unknownBlock',
          content: [
            {
              type: 'text',
              text: 'hello mate'
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'this is'
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'Sydney!'
            }
          ],
        });
      });

      it('should build flattened tree from unknown block node #3', () => {
        const node = {
          type: 'foobar-table',
          content: [
            {
              type: 'foobar-row',
              content: [
                {
                  type: 'text',
                  text: 'hello mate'
                },
              ],
            },
            {
              type: 'foobar-row',
              content: [
                {
                  type: 'foobar-row',
                  content: [
                    {
                      type: 'foobar-cell',
                      content: [
                        {
                          type: 'text',
                          text: 'this is'
                        },
                        {
                          type: 'special-sydney-node-type',
                          attrs: {
                            textUrl: 'http://www.sydney.com.au/'
                          },
                          text: 'Sydney!',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        };

        const unknownBlockNode = getValidUnknownNode(node);
        expect(unknownBlockNode).to.deep.equal({
          type: 'unknownBlock',
          content: [
            {
              type: 'text',
              text: 'hello mate'
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'this is'
            },
            {
              type: 'text',
              text: ' '
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: 'http://www.sydney.com.au/',
                  },
                },
              ],
              text: 'Sydney!'
            },
          ],
        });
      });
    });

  });

  describe('getValidMark', () => {

    describe('unkown', () => {
      it('should return null if type is unkown', () => {
        expect(getValidMark({ type: 'banana' })).to.equal(null);
      });
    });

    describe('em', () => {
      it('should return "em"', () => {
        expect(getValidMark({ type: 'em' })).to.deep.equal({
          type: 'em',
        });
      });
    });

    describe('link', () => {
      it('should return null if attrs is missing', () => {
        expect(getValidMark({ type: 'link' })).to.equal(null);
      });

      it('should use attrs.href if present', () => {
        expect(getValidMark({ type: 'link', attrs: { href: 'https://www.atlassian.com' } })).to.deep.equal({
          type: 'link',
          attrs: {
            href: 'https://www.atlassian.com'
          },
        });
      });

      it('should add protocol to a url if it doesn`t exist', () => {
        expect(getValidMark({ type: 'link', attrs: { href: 'www.atlassian.com' } })).to.deep.equal({
          type: 'link',
          attrs: {
            href: 'http://www.atlassian.com'
          },
        });
      });

      it('should use attrs.url if present and attrs.href is missing', () => {
        expect(getValidMark({ type: 'link', attrs: { url: 'https://www.atlassian.com' } })).to.deep.equal({
          type: 'link',
          attrs: {
            href: 'https://www.atlassian.com'
          },
        });
      });
    });

    describe('strike', () => {
      it('should return "strike"', () => {
        expect(getValidMark({ type: 'strike' })).to.deep.equal({
          type: 'strike',
        });
      });
    });

    describe('strong', () => {
      it('should return "strong"', () => {
        expect(getValidMark({ type: 'strong' })).to.deep.equal({
          type: 'strong',
        });
      });
    });

    describe('subsup', () => {
      it('should return null if attrs is missing', () => {
        expect(getValidMark({ type: 'subsup' })).to.equal(null);
      });

      it('should return null if attrs.type is not sub or sup', () => {
        expect(getValidMark({ type: 'subsup', attrs: { type: 'banana' } })).to.equal(null);
      });

      it('should return "subsup" with correct type', () => {
        expect(getValidMark({ type: 'subsup', attrs: { type: 'sub' } })).to.deep.equal({
          type: 'subsup',
          attrs: {
            type: 'sub'
          },
        });

        expect(getValidMark({ type: 'subsup', attrs: { type: 'sup' } })).to.deep.equal({
          type: 'subsup',
          attrs: {
            type: 'sup'
          },
        });
      });
    });

    describe('underline', () => {
      it('should return "underline"', () => {
        expect(getValidMark({ type: 'underline' })).to.deep.equal({
          type: 'underline',
        });
      });
    });

  });

  describe('getMarksByOrder', () => {
    const { strong, strike, link, em, subsup, underline } = schema.marks;

    it('should return marks in right order', () => {
      const unorderedMarks = [
        strong.create(),
        link.create({ href: 'www.atlassian.com' }),
        em.create(),
        subsup.create(),
        underline.create(),
        strike.create(),
      ];

      const orderedMarks = getMarksByOrder(unorderedMarks);
      orderedMarks.forEach((mark, index) => {
        expect(markOrder[index]).to.equal(mark.type.name);
      });
    });
  });

  describe('isSameMark', () => {

    const { strong, strike, link } = schema.marks;

    const strongMark = strong.create();
    const strikeMark = strike.create();

    const linkMark1 = link.create({ href: 'www.atlassian.com' });
    const linkMark2 = link.create({ href: 'www.hipchat.com' });

    it('should return false if mark is null or otherMark is null', () => {
      expect(isSameMark(null, strongMark)).to.equal(false);
      expect(isSameMark(strongMark, null)).to.equal(false);
    });

    it('should return false if type is not the same', () => {
      expect(isSameMark(strongMark, strikeMark)).to.equal(false);
    });

    it('should return false if mark-type is the same but attributes is not', () => {
      expect(isSameMark(linkMark1, linkMark2)).to.equal(false);
    });

    it('should return true if type is the same and attributes match', () => {
      expect(isSameMark(linkMark1, linkMark1)).to.equal(true);
    });

  });
});
