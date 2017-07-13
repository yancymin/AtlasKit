import { expect } from 'chai';
import { default as hipchatEncoder } from '../../../src/encoders/hipchat';
import { default as hipchatDecoder } from '../../../src/decoders/hipchat';

const input = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello'
        },
        {
          type: 'emoji',
          attrs: {
            'shortName': ':smile:',
            'id': '1f604',
            'fallback': '😄'
          }
        },
        {
          type: 'mention',
          attrs: {
            text: '@World',
            id: '1234'
          }
        },
        {
          type: 'hardBreak'
        },
        {
          type: 'text',
          text: 'Bold',
          marks: [
            {
              type: 'strong'
            }
          ]
        },
        {
          type: 'text',
          text: 'Underline',
          marks: [
            {
              type: 'Underline'
            }
          ]
        },
        {
          type: 'text',
          text: 'Italic',
          marks: [
            {
              type: 'em'
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
    }
  ]
};

const output = [
  {
    type: 'text',
    text: 'Hello',
    marks: []
  },
  {
    type: 'emoji',
    text: '😄',
    attrs: {
      'shortName': ':smile:',
      'id': '1f604',
      'fallback': '😄'
    }
  },
  {
    type: 'mention',
    text: '@World',
    attrs: {
      text: '@World',
      id: '1234'
    }
  },
  {
    type: 'text',
    text: '\n',
    marks: []
  },
  {
    type: 'text',
    text: 'Bold',
    marks: [
      {
        type: 'strong'
      }
    ]
  },
  {
    type: 'text',
    text: 'Underline',
    marks: [
      {
        type: 'Underline'
      }
    ]
  },
  {
    type: 'text',
    text: 'Italic',
    marks: [
      {
        type: 'em'
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
          url: 'www.atlassian.com'
        }
      }
    ]
  }
];

describe('@atlaskit/editor-hipchat encode-decode', () => {

  describe('hipchat-format', () => {
    describe('encode', () => {
      it('should produce hipchat-friendly output', () => {
        const encoded = hipchatEncoder(input);
        expect(encoded).to.deep.equal(output);
      });

      it('should merge content from multiple paragraphs and insert line breaks', () => {
        const encoded = hipchatEncoder({
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Hello'
                }
              ]
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'World!'
                }
              ]
            }
          ]
        });

        expect(encoded).to.deep.equal(
          [
            {
              type: 'text',
              text: 'Hello',
              marks: []
            },
            {
              type: 'text',
              text: '\n',
              marks: []
            },
            {
              type: 'text',
              text: 'World!',
              marks: []
            }
          ]
        );
      });
    });

    describe('decode', () => {
      it('should produce editor-friendly output', () => {
        const encoded = hipchatDecoder(output);
        expect(encoded).to.deep.equal(input);
      });

      it('should should replace "\\n" with hardBreak', () => {
        const encoded = hipchatDecoder([
          {
            type: 'text',
            text: 'Hello',
            marks: []
          },
          {
            type: 'text',
            text: '\n',
            marks: []
          },
          {
            type: 'text',
            text: 'World',
            marks: []
          },
        ]
        );

        expect(encoded).to.deep.equal(
          {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Hello',
                  },
                  {
                    type: 'hardBreak',
                  },
                  {
                    type: 'text',
                    text: 'World',
                  }
                ]
              }
            ]
          }
        );
      });
    });
  });

});
