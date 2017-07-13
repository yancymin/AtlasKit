import { emoji as emojiData } from '@atlaskit/util-data-test';

const toEmojiAttrs = (emoji) => {
  const { shortName, id, fallback } = emoji;
  return {
    shortName,
    id,
    text: fallback || shortName,
  };
};

const toEmojiId = (emoji) => {
   const { shortName, id, fallback } = emoji;
   return { shortName, id, fallback };
};

const { emojiTestData, emojiStoryData } = emojiData;
export const grinEmojiAttrs = toEmojiAttrs(emojiTestData.grinEmoji);
export const evilburnsEmojiAttrs = toEmojiAttrs(emojiTestData.evilburnsEmoji);

export const grinEmojiId = toEmojiId(emojiTestData.grinEmoji);
export const evilburnsEmojiId = toEmojiId(emojiTestData.evilburnsEmoji);


export const lorem = emojiStoryData.lorem;

export const document = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello, ',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'strong'
            },
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: ' Look I can do '
        },
        {
          type: 'text',
          text: 'italic ',
          marks: [
            {
              type: 'em'
            }
          ]
        },
        {
          type: 'text',
          text: ', strong ',
          marks: [
            {
              type: 'em'
            },
            {
              type: 'strong'
            }
          ]
        },
        {
          type: 'text',
          text: 'and underlined text!',
          marks: [
            {
              type: 'em'
            },
            {
              type: 'strong'
            },
            {
              type: 'underline'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'My favourite emoji are '
        },
        {
          type: 'emoji',
          attrs: {
            ...grinEmojiAttrs,
          }
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'emoji',
          attrs: {
            ...evilburnsEmojiAttrs,
          }
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':not-an-emoji:',
          }
        },
        {
          type: 'text',
          text: '. What are yours?',
          marks: [
            {
              type: 'unkown mark'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'My name is '
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-ABCDE',
            text: '@Oscar Wallhult'
          }
        },
        {
          type: 'text',
          text: ' :D',
          marks: [
            {
              type: 'unkown mark'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mention with a displayName'
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-FGHI',
            displayName: '@oscar'
          }
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mention with a text-property'
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-FGHI',
          },
          text: '@oscar'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mention with restricted access'
        },
        {
          type: 'mention',
          attrs: {
            id: 'ABCDE-ABCDE-ABCDE-FGHI',
            accessLevel: 'APPLICATION'
          },
          text: '@oscar'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is  a   text    with	multiple		spaces 			and				tabs.'
        },
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'italic',
          marks: [
            {
              type: 'em'
            }
          ]
        },
        {
          type: 'text',
          text: 'link',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'monospace',
          marks: [
            {
              type: 'mono'
            }
          ]
        },
        {
          type: 'text',
          text: 'strike-through',
          marks: [
            {
              type: 'strike'
            }
          ]
        },
        {
          type: 'text',
          text: 'strong',
          marks: [
            {
              type: 'strong'
            }
          ]
        },
        {
          type: 'text',
          text: 'sub',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sub'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'sup',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sup'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'underline',
          marks: [
            {
              type: 'underline'
            }
          ]
        },
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'some inline code: '
        },
        {
          type: 'text',
          text: 'const foo = bar();',
          marks: [
            {
              type: 'code'
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'unkown type',
          attrs: {
            text: 'fallback text'
          }
        },
        {
          type: 'very unkown'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a line with '
         },
         {
          type: 'hardBreak'
         },
         {
           type: 'text',
           text: 'a hardbreak in it.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a paragraph with a text node'
        },
        {
          type: 'text',
          text: '\n'
        },
        {
          type: 'text',
          text: 'that contains a new line'
        },
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a '
        },
        {
          type: 'mention',
          attrs: {
            text: '@mention',
            id: 'mention'
          }
        },
        {
          type: 'text',
          text: '. And this is a broken '
        },
        {
          type: 'mention',
          attrs: {
            textxtx: '@mention',
            id: 'mention'
          }
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is  a   text    with	multiple		spaces 			and				tabs.'
        },
      ]
    },
    {
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
    },
    {
      type: 'mediaGroup',
      content: [
        {
          type: 'media',
          attrs: {
            type: 'file',
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            collection: 'MediaServicesSample'
          }
        },
        {
          type: 'media',
          attrs: {
            type: 'file',
            id: '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40',
            collection: 'MediaServicesSample'
          }
        }
      ]
    },
    {
      type: 'mediaGroup',
      content: [
        {
          type: 'media',
          attrs: {
            type: 'file',
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            collection: 'MediaServicesSample'
          }
        },
        {
          type: 'media',
          attrs: {
            type: 'file',
            id: '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40',
            collection: 'MediaServicesSample'
          }
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Click me! ',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'javascript:alert("hello world")'
              }
            }
          ]
        },
        {
          type: 'text',
          text: 'www.atlassian.com',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'www.atlassian.com'
              }
            }
          ]
        }
      ]
    },
    {
      type: 'codeBlock',
      content: [
        {
          type: 'text',
          text: `// Create a map.
final IntIntOpenHashMap map = new IntIntOpenHashMap();
map.put(1, 2);
map.put(2, 5);
map.put(3, 10);`
        },
        {
          type: 'text',
          text: `
int count = map.forEach(new IntIntProcedure()
{
   int count;
   public void apply(int key, int value)
   {
       if (value >= 5) count++;
   }
}).count;
System.out.println("There are " + count + " values >= 5");`
        }
      ],
      attrs: {
        language: 'javascript'
      }
    },
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [
        {
          type: 'text',
          text: 'Heading 1'
        },
      ]
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: 'Heading 2',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'www.atlassian.com'
              }
            }
          ]
        }
      ]
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: 'Heading 3',
        }
      ]
    },
    {
      type: 'heading',
      attrs: { level: 4 },
      content: [
        {
          type: 'text',
          text: 'Heading 4',
        }
      ]
    },
    {
      type: 'heading',
      attrs: { level: 5 },
      content: [
        {
          type: 'text',
          text: 'Heading 5',
        }
      ]
    },
    {
      type: 'heading',
      attrs: { level: 6 },
      content: [
        {
          type: 'text',
          text: 'Heading 6',
        }
      ]
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'First list item'
                }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Second list item'
                }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Third list item'
                }
              ]
            }
          ]
        },
      ]
    },
    {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'First list item'
                }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Second list item'
                }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Third list item'
                }
              ]
            }
          ]
        },
      ]
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'All that is gold does not glitter, not all those who wander are lost; The old that is strong does not wither, deep roots are not reached by the frost.',
            },
          ]
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'From the ashes a fire shall be woken, a light from the shadows shall spring; Renewed shall be blade that was broken, the crownless again shall be king.',
            }
          ]
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'J.R.R. Tolkien, The Fellowship of the Ring.',
              marks: [
                {
                  type: 'em',
                }
              ],
            }
          ]
        },
      ]
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'info'
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is an info panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                }
              ],
            },
          ]
        },
      ]
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'note'
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a note panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                }
              ],
            },
          ]
        },
      ]
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'tip'
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a tip panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                }
              ],
            },
          ]
        },
      ]
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'warning'
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a warning panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                }
              ],
            },
          ]
        },
      ]
    },
    {
      type: 'rule'
    },
    {
      type: 'applicationCard',
      text: '',
      attrs: {
        link: {
          url: 'http://atlassian.com'
        },
        'collapsible': true,
        'title': {
          'text': 'Sascha Reuter commented on a file: Desktop sidebar states.png'
        },
        'user': {
          'icon': {
            'url': 'https://extranet.atlassian.com/download/attachments/2246873520/sreuter-57703-pp-1530510_4271148635152_5186589029777108540_n.jpg',
            'label': 'Sascha Reuter'
          }
        },
        'description': {
          'title': 'Can haz description',
          'text': '\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius mattis massa, quis ornare orci. Integer congue\nrutrum velit, quis euismod eros condimentum quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris\nlobortis nibh id odio egestas luctus. Nunc nulla lacus, congue eu nibh non, imperdiet varius lacus. Nulla sagittis\nmagna et tincidunt volutpat. Nunc augue lorem, eleifend et tempor ut, malesuada ac lorem. Praesent quis feugiat eros,\net vehicula nibh. Maecenas vehicula commodo nisi, at rutrum ipsum posuere sit amet. Integer sit amet nisl sed ligula\nconsectetur feugiat non at ligula. Cras dignissim suscipit magna at mattis. Maecenas ante leo, feugiat vestibulum velit\na, commodo finibus velit. Maecenas interdum ullamcorper velit non suscipit. Proin tempor, magna vitae dapibus laoreet,\nquam dui convallis lectus, in vestibulum arcu eros eu velit. Quisque vel dolor enim.\n'
        },
        'details': [{
          'icon': {
            'url': 'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png',
            'label': 'Issue type'
          },
          'text': 'Story'
        },
        {
          'badge': {
            'value': 101,
            'max': 99,
            'appearance': 'important'
          }
        },
        {
          'lozenge': {
            'text': 'In Progress',
            'appearance': 'inprogress'
          }
        },
        {
          'title': 'Watchers',
          'users': [{
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar',
              'label': 'James Newell'
            }
          }, {
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar',
              'label': 'Jon Blower'
            }
          }, {
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar',
              'label': 'Scott Simpson'
            }
          }]
        }, {
          'icon': {
            'url': 'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png',
            'label': 'Issue type'
          },
          'text': 'Story'
        }, {
          'badge': {
            'value': 101,
            'max': 99,
            'appearance': 'important'
          }
        }, {
          'lozenge': {
            'text': 'In Progress',
            'appearance': 'inprogress'
          }
        }, {
          'title': 'Watchers',
          'users': [{
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar',
              'label': 'James Newell'
            }
          }, {
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar',
              'label': 'Jon Blower'
            }
          }, {
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar',
              'label': 'Scott Simpson'
            }
          }]
        }, {
          'icon': {
            'url': 'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png',
            'label': 'Issue type'
          },
          'text': 'Story'
        }, {
          'badge': {
            'value': 101,
            'max': 99,
            'appearance': 'important'
          }
        }, {
          'lozenge': {
            'text': 'In Progress',
            'appearance': 'inprogress'
          }
        }, {
          'title': 'Watchers',
          'users': [{
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar',
              'label': 'James Newell'
            }
          }, {
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar',
              'label': 'Jon Blower'
            }
          }, {
            'icon': {
              'url': 'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar',
              'label': 'Scott Simpson'
            }
          }]
        }], 'context': {
          'text': 'Design Home / ... / Media Cards Design',
          'icon': {
            'url': 'https://image.ibb.co/jSrC8F/f4b5e33d6b1d36556114a18b594768f41f32673e.png',
            'label': 'foobar'
          },
          'link': {
            'url': 'https://confluence.atlassian.com/'
          }
        }, 'actions': [{
          'title': 'View'
        }, {
          'title': 'Open'
        }, {
          'title': 'Join'
        }, {
          'title': 'Reply'
        }], 'preview': {
          'url': 'https://image.ibb.co/ghKzoF/1a99566b0c8e0589ca327bb1efe0be5ca1419aa8.png'
        }
      }
    }
  ]
};
