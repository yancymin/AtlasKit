import { expect } from 'chai';
import markdownSerializer from '../../src/markdown-serializer';
import stringRepeat from '../../src/util/string-repeat';
import {
  a, blockquote, br, code_block, doc, em, h1, h2,
  h3, h4, h5, h6, hr, img, li, emoji, emojiQuery, mention,
  mentionQuery, code, ol, p, strike, strong, ul
} from './_schema-builder';

describe('Bitbucket markdown serializer: ', () => {
  const pre = code_block();

  it('should serialize paragraphs', () => {
    expect(markdownSerializer.serialize(doc(p('foo')))).to.eq('foo');
    expect(markdownSerializer.serialize(doc(
      p('foo'),
      p('bar'),
    ))).to.eq('foo\n\nbar');

    const longText = stringRepeat('foo ', 100);
    expect(markdownSerializer.serialize(doc(
      p(longText),
      p(longText)
    ))).to.eq(`${longText}\n\n${longText}`);
  });

  it('should preserve multiple blank lines using zero-non-width', () => {
    expect(markdownSerializer.serialize(doc(
      p('foo'),
      p(),
      p('bar')
    ))).to.eq('foo\n\n\u200c\n\nbar');

    expect(markdownSerializer.serialize(doc(
      p('foo'),
      p(),
      p(),
      p('bar')
    ))).to.eq('foo\n\n\u200c\n\n\u200c\n\nbar');
  });

  it('should espace 4 spaces at the beginning of the line with zero-width-non-joiner', () => {
    const fourSpaces = '    ';

    expect(markdownSerializer.serialize(doc(
      p(`${fourSpaces}hello`)
    ))).to.eq(`\u200c${fourSpaces}hello`);

    expect(markdownSerializer.serialize(doc(p(
      `hello${fourSpaces}there`
    )))).to.eq(`hello${fourSpaces}there`);
  });

  it('should preserve leading and traling blank lines using zero-non-width', () => {
    expect(markdownSerializer.serialize(doc(
      p(),
      p('bar')
    ))).to.eq('\u200c\n\nbar');

    expect(markdownSerializer.serialize(doc(
      p(),
      p(),
      p('bar')
    ))).to.eq('\u200c\n\n\u200c\n\nbar');

    expect(markdownSerializer.serialize(doc(
      p('foo'),
      p()
    ))).to.eq('foo\n\n\u200c');

    expect(markdownSerializer.serialize(doc(
      p('foo'),
      p(),
      p()
    ))).to.eq('foo\n\n\u200c\n\n\u200c');
  });

  describe('mentions', () => {
    it('should serialize mentions', () => {
      const node = doc(p(mention({ text: 'Oscar Wallhult', id: 'oscar' })));
      const test = markdownSerializer.serialize(node);
      expect(test).to.eq('@oscar');
    });

    it('should divide serialized mentions and text with one blank space', () => {
      const node = doc(p(mention({ text: 'Oscar Wallhult', id: 'oscar' }), 'text'));
      const test = markdownSerializer.serialize(node);
      expect(test).to.eq('@oscar text');
    });

    it('should not add a blank space in the end of the string for mentions', () => {
      const node = doc(p('text ', mention({ text: 'Oscar Wallhult', id: 'oscar' })));
      const test = markdownSerializer.serialize(node);
      expect(test).to.eq('text @oscar');
    });

    it('should not divide mention and text with additional space if text starts with the space', () => {
      const node = doc(p(mention({ text: 'Oscar Wallhult', id: 'oscar' }), ' text'));
      const test = markdownSerializer.serialize(node);
      expect(test).to.eq('@oscar text');
    });

    it('should divide mention and text with only one additional space if text starts with the spaces', () => {
      const node = doc(p(mention({ text: 'Oscar Wallhult', id: 'oscar' }), '  text'));
      const test = markdownSerializer.serialize(node);
      expect(test).to.eq('@oscar  text');
    });

    it('should not divide mention and italic text node with additional space if text starts with the space', () => {
      const node = doc(p(mention({ text: 'Oscar Wallhult', id: 'oscar' }), em(' text')));
      const test = markdownSerializer.serialize(node);
      expect(test).to.eq('@oscar *text*');
    });
  });

  describe('emoji', () => {
    it('should serialize emoji', () => {
      const node = doc(p(emoji({ shortName: ':grinning:' })));
      const test = markdownSerializer.serialize(node);
      expect(test).to.eq(':grinning:');
    });
  });

  it('should not skip [ & ]', () => {
    expect(markdownSerializer.serialize(doc(
      p('[hello]')
    ))).to.eq('[hello]');
  });

  describe('code block', () => {
    it('with simple text should be serialized', () => {
      expect(markdownSerializer.serialize(doc(pre('foo')))).to.eq('    foo');
    });

    it('with newlines preserves newlines in markdown', () => {
      expect(markdownSerializer.serialize(doc(
        pre('foo\nbar'),
      ))).to.eq('    foo\n    bar');
    });

    it('with adjacent code block keeps empty space between', () => {
      expect(markdownSerializer.serialize(doc(
        pre('foo'),
        pre('bar'),
      ))).to.eq('    foo\n\n    bar');
    });

    it('with attributes uses backtick notation and preserves attributes', () => {
      const js = code_block({ language: 'js' });
      expect(markdownSerializer.serialize(doc(
        js('foo'),
      ))).to.eq('```js\nfoo\n```');

      expect(markdownSerializer.serialize(doc(
        js('foo\nbar'),
      ))).to.eq('```js\nfoo\nbar\n```');
    });

    it('with no text is preserved', () => {
      expect(markdownSerializer.serialize(doc(
        pre(''),
      ))).to.eq('    \u200c');

      expect(markdownSerializer.serialize(doc(
        pre(),
      ))).to.eq('    \u200c');

      expect(markdownSerializer.serialize(doc(
        pre(),
      ))).to.eq('    \u200c');
    });

    it('via indentation with backticks is not escaped', () => {
      expect(markdownSerializer.serialize(doc(
        pre('`foo`\n````bar\nbaz\n`````'),
      ))).to.eq('    `foo`\n    ````bar\n    baz\n    `````');
    });

    it('via backticks that includes backticks is properly fenced', () => {
      const css = code_block({ language: 'css' });

      expect(markdownSerializer.serialize(doc(
        css('```js\nfoo\n```')
      ))).to.eq('````css\n```js\nfoo\n```\n````', 'Balanced fencing');

      expect(markdownSerializer.serialize(doc(
        css('````js\nfoo\n```')
      ))).to.eq('`````css\n````js\nfoo\n```\n`````', 'Unbalanced fencing in the code block');

      expect(markdownSerializer.serialize(doc(
        css('````')
      ))).to.eq('`````css\n````\n`````', 'Unmatched backtick fence');

      expect(markdownSerializer.serialize(doc(
        css('````js')
      ))).to.eq('`````css\n````js\n`````', 'Unmatched backtick fence with language definition');
    });
  });

  it('should serialize headings (level 1 - 6)', () => {
    expect(markdownSerializer.serialize(doc(h1('level 1')))).to.eq('# level 1');
    expect(markdownSerializer.serialize(doc(h2('level 2')))).to.eq('## level 2');
    expect(markdownSerializer.serialize(doc(h3('level 3')))).to.eq('### level 3');
    expect(markdownSerializer.serialize(doc(h4('level 4')))).to.eq('#### level 4');
    expect(markdownSerializer.serialize(doc(h5('level 5')))).to.eq('##### level 5');
    expect(markdownSerializer.serialize(doc(h6('level 6')))).to.eq('###### level 6');

    expect(markdownSerializer.serialize(doc(
      h1('foo'),
      h2('bar'),
      p('baz'),
    ))).to.eq(`# foo\n\n## bar\n\nbaz`);
  });

  it('should serialize horizontal_rule', () => {
    expect(markdownSerializer.serialize(doc(hr))).to.eq('---');
    expect(markdownSerializer.serialize(doc(
      p('foo'),
      hr,
      p('bar'),
    ))).to.eq('foo\n\n---\n\nbar');
  });

  describe('bullet list', () => {
    it('with elements should serialize', () => {
      expect(markdownSerializer.serialize(doc(ul(
        li(p('foo')),
        li(p('bar')),
        li(p('baz')),
      )))).to.eq('* foo\n* bar\n* baz\n\n');
    });

    it('surrounded with other block elements keeps empty line between', () => {
      expect(markdownSerializer.serialize(doc(
        p('para'),
        ul(
          li(p('foo')),
          li(p('bar')),
        ),
        p('baz'),
      ))).to.eq('para\n\n* foo\n* bar\n\nbaz');
    });

    it('with code block as first list item generate correct markdown', () => {
      expect(markdownSerializer.serialize(doc(
        ul(
          li(
            pre('code\nblock'),
          )
        )
      ))).to.eq(
        '* \n' +
        '        code\n' +
        '        block\n' +
        '\n' +
        '\n' +
        '\n'
      );
    });

    it('with code block preserves indentation', () => {
      expect(markdownSerializer.serialize(doc(
        ul(
          li(
            p('item'),
            pre('code\nblock'),
          )
        )
      ))).to.eq(
        '* item\n' +
        '\n' +
        '        code\n' +
        '        block\n' +
        '\n' +
        '\n' +
        '\n'
      );
    });

    it('with one empty element is preserved', () => {
      expect(markdownSerializer.serialize(doc(ul(li(p('')))))).to.eq('* \n\n');
    });

    it('with nesting should serialize', () => {
      expect(markdownSerializer.serialize(doc(
        ul(
          li(
            p('foo 1'),
            ul(
              li(
                p('bar 1'),
                ul(
                  li(p('baz 1')),
                  li(p('baz 2')),
                )
              ),
              li(p('bar 2')),
            )
          ),
          li(
            p('foo 2'),
          )
        )
      ))).to.eq(
        '* foo 1\n' +
        '\n' +
        '    * bar 1\n' +
        '    \n' +
        '        * baz 1\n' +
        '        * baz 2\n' +
        '        \n' +
        '    * bar 2\n' +
        '    \n' +
        '* foo 2\n' +
        '\n'
      );
    });

    it('with newline', () => {
      expect(markdownSerializer.serialize(doc(
        ul(
          li(
            p('item 1'),
            p('\n')
          ),
          li(p('item 2'))
        )
      ))).to.eq(
        '* item 1\n' +
        '\n' +
        '    \n' +
        '    \n' +
        '\n' +
        '\n' +
        '* item 2\n' +
        '\n'
      );
    });

    it('with list item containing two lines', () => {
      expect(markdownSerializer.serialize(doc(
        ul(
          li(
            p('item 1'),
            p('item 1 desc'),
          ),
          li(p('item 2'))
        )
      ))).to.eq(
        '* item 1\n' +
        '\n' +
        '    item 1 desc\n' +
        '\n' +
        '\n' +
        '* item 2\n' +
        '\n'
      );
    });
  });

  describe('ordered list', () => {
    it('with elements should serialize', () => {
      expect(markdownSerializer.serialize(doc(ol(
        li(p('foo')),
        li(p('bar')),
        li(p('baz')),
      )))).to.eq('1. foo\n2. bar\n3. baz\n\n');
    });

    it('surrounded with other block elements keeps empty line between', () => {
      expect(markdownSerializer.serialize(doc(
        p('para'),
        ol(
          li(p('foo')),
          li(p('bar')),
        ),
        p('baz'),
      ))).to.eq('para\n\n1. foo\n2. bar\n\nbaz');
    });

    it('with 10+ elements aligns numbers to right', () => {
      expect(markdownSerializer.serialize(doc(ol(
        li(p('item')),
        li(p('item')),
        li(p('item')),
        li(p('item')),
        li(p('item')),
        li(p('item')),
        li(p('item')),
        li(p('item')),
        li(p('item')),
        li(p('item')),
      )))).to.eq('1. item\n2. item\n3. item\n4. item\n5. item\n6. item\n7. item\n8. item\n9. item\n10. item\n\n');
    });

    it('with code block preserves indentation', () => {
      expect(markdownSerializer.serialize(doc(
        ol(
          li(
            p('item'),
            pre('code\nblock'),
          )
        )
      ))).to.eq(
       '1. item\n' +
       '\n' +
       '        code\n' +
       '        block\n' +
       '\n' +
       '\n' +
       '\n'
     );
    });

    it('with one empty element is preserved', () => {
      expect(markdownSerializer.serialize(doc(ol(li(p('')))))).to.eq('1. \n\n');
    });

    it('with nesting should serialize', () => {
      expect(markdownSerializer.serialize(doc(
        ol(
          li(
            p('foo 1'),
            ol(
              li(
                p('bar 1'),
                ol(
                  li(p('baz 1')),
                  li(p('baz 2')),
                )
              ),
              li(p('bar 2')),
            )
          ),
          li(
            p('foo 2'),
          )
        )
      ))).to.eq(
        '1. foo 1\n' +
        '\n' +
        '    1. bar 1\n' +
        '    \n' +
        '        1. baz 1\n' +
        '        2. baz 2\n' +
        '        \n' +
        '    2. bar 2\n' +
        '    \n' +
        '2. foo 2\n' +
        '\n'
      );
    });

    it('should generate correct markdown for blockquote as first block', () => {
      expect(markdownSerializer.serialize(doc(ol(
        li(blockquote(p('foo'), p('bar'), p('baz'))),
      )))).to.eq(
      '\n' +
      '1. > foo\n' +
      '  >\n' +
      '  > bar\n' +
      '  >\n' +
      '  > baz\n' +
      '\n' +
      '\n' +
      '\n');
    });
  });

  describe('mixed lists', () => {
    it('of nested ordered and unordered should serialize', () => {
      expect(markdownSerializer.serialize(doc(
        ol(
          li(
            p('foo 1'),
            ul(
              li(
                p('bar 1'),
                ol(
                  li(p('baz 1')),
                  li(
                    p('baz 2'),
                    ul(
                      li(p('banana'))
                    )
                  ),
                )
              ),
              li(p('bar 2')),
            )
          ),
          li(
            p('foo 2'),
          )
        )
      ))).to.eq(
        '1. foo 1\n' +
        '\n' +
        '    * bar 1\n' +
        '    \n' +
        '        1. baz 1\n' +
        '        2. baz 2\n' +
        '        \n' +
        '            * banana\n' +
        '            \n' +
        '        \n' +
        '    * bar 2\n' +
        '    \n' +
        '2. foo 2\n' +
        '\n'
        );
    });

    it('of consecutive ordered and unordered should serialize', () => {
      expect(markdownSerializer.serialize(doc(
        ol(
          li(p('foo 1')),
          li(p('foo 2'))
        ),
        ul(
          li(p('bar 1')),
          li(p('bar 2'))
        ),
        ol(
          li(p('baz 1')),
          li(p('baz 2'))
        )
      ))).to.eq(
        '1. foo 1\n' +
        '2. foo 2\n' +
        '\n' +
        '* bar 1\n' +
        '* bar 2\n' +
        '\n' +
        '1. baz 1\n' +
        '2. baz 2\n' +
        '\n'
        );
    });
  });

  describe('image', () => {
    it('with no alt to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com'
      })))).to.eq('![](http://example.com)');
    });

    it('with alt and no title to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image'
      })))).to.eq('![an image](http://example.com)');
    });

    it('with alt and title to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image',
        title: 'a title'
      })))).to.eq('![an image](http://example.com \'a title\')');
    });

    it('with title containing double-quote to serialize without escaping', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: 'an image',
        title: 'a " "title"'
      })))).to.eq('![an image](http://example.com \'a " "title"\')');
    });

    it('with alt containing quotes to serialize', () => {
      expect(markdownSerializer.serialize(doc(img({
        src: 'http://example.com',
        alt: '\'an\' "image"'
      })))).to.eq('![\'an\' "image"](http://example.com)');
    });

    it('inline with text to serialize', () => {
      expect(markdownSerializer.serialize(doc(
        p(
          'foo ',
          img({
            src: 'http://example.com',
            alt: 'an image',
            title: 'a title'
          }),
          ' bar',
        )
      ))).to.eq('foo ![an image](http://example.com \'a title\') bar');
    });

    it('in blockquote to serialize', () => {
      expect(markdownSerializer.serialize(doc(
        blockquote(
          p(
            img({
              src: 'http://example.com',
              alt: 'an image',
              title: 'a title'
            }),
            ' foo'
          )
        )
      ))).to.eq('> ![an image](http://example.com \'a title\') foo');

      expect(markdownSerializer.serialize(doc(
        blockquote(
          blockquote(
            p(
              img({
                src: 'http://example.com',
                alt: 'an image',
                title: 'a title'
              }),
              ' foo'
            )
          )
        )
      ))).to.eq('> > ![an image](http://example.com \'a title\') foo');
    });
  });

  it('should serialize hardBreak to newline', () => {
    expect(markdownSerializer.serialize(doc(
      p('foo ', br, 'bar')
    ))).to.eq('foo   \nbar');
  });

  describe('blockquotes', () => {
    it('of any level should serialized', () => {
      expect(markdownSerializer.serialize(doc(blockquote(p('foo'))))).to.eq('> foo');
      expect(markdownSerializer.serialize(doc(blockquote(blockquote(p('foo')))))).to.eq('> > foo');
      expect(markdownSerializer.serialize(doc(
        blockquote(p('foo')),
        blockquote(blockquote(p('bar'))),
        blockquote(blockquote(blockquote(p('baz')))),
        blockquote(p('bar')),
      ))).to.eq('> foo\n\n> > bar\n\n> > > baz\n\n> bar');
    });

    it('containing other elements should serialize', () => {
      expect(markdownSerializer.serialize(doc(blockquote(hr)))).to.eq('> ---');
      expect(markdownSerializer.serialize(doc(
        blockquote(
          p('foo'),
          hr,
          h2('bar'),
          blockquote(
            hr,
            p('baz')
          )
        ),
      ))).to.eq('> foo\n>\n> ---\n>\n> ## bar\n>\n> > ---\n> >\n> > baz');
    });
  });

  describe('marks -', () => {
    it('should ignore mentionQuery mark', () => {
      expect(markdownSerializer.serialize(doc(p(mentionQuery('@oscar'))))).to.eq('@oscar');
    });

    it('should ignore emojiQuery mark', () => {
      expect(markdownSerializer.serialize(doc(p(emojiQuery(':grin'))))).to.eq(':grin');
    });

    it('should serialize em', () => {
      expect(markdownSerializer.serialize(doc(p(em('foo'))))).to.eq('*foo*');
      expect(markdownSerializer.serialize(doc(p(
        'foo ',
        em('bar'),
        ' baz',
      )))).to.eq('foo *bar* baz');
    });

    it('should serialize strong', () => {
      expect(markdownSerializer.serialize(doc(p(strong('foo'))))).to.eq('**foo**');
      expect(markdownSerializer.serialize(doc(p(
        'foo ',
        strong('bar bar'),
        ' baz',
      )))).to.eq('foo **bar bar** baz');
    });

    it('should serialize strikethrough', () => {
      expect(markdownSerializer.serialize(doc(p(strike('foo'))))).to.eq('~~foo~~');
      expect(markdownSerializer.serialize(doc(p(
        'foo ',
        strike('bar bar'),
        ' baz',
      )))).to.eq('foo ~~bar bar~~ baz');
    });

    it('should serialize code', () => {
      expect(markdownSerializer.serialize(doc(p(code('foo'))))).to.eq('`foo`');
      expect(markdownSerializer.serialize(doc(p(
        'foo ',
        code('bar baz'),
        ' foo',
      )))).to.eq('foo `bar baz` foo');
    });

    describe('code', () => {
      it('containing backticks should be fenced properly', () => {
        expect(markdownSerializer.serialize(doc(p(
          'foo ',
          code('bar ` ` baz'),
          ' foo',
        )))).to.eq('foo ``bar ` ` baz`` foo');
      });

      it('containing backticks on the edges of a fence should be fenced properly', () => {
        expect(markdownSerializer.serialize(doc(p(
          'foo ',
          code('`bar`  ``baz``'),
          ' foo',
        )))).to.eq('foo ``` `bar`  ``baz`` ``` foo');
      });
    });

    xdescribe('links', () => {
      it('with no text to be ignored', () => {
        const link = a({ href: 'http://example.com' });

        expect(markdownSerializer.serialize(doc(p(
          link(''),
        )))).to.eq('');
      });

      it('with no title to serialize', () => {
        const link = a({ href: 'http://example.com' });

        expect(markdownSerializer.serialize(doc(p(
          link('foo'),
        )))).to.eq('[foo](http://example.com)');
      });

      it('with title to serialize', () => {
        const link = a({
          href: 'http://example.com',
          title: 'title'
        });

        expect(markdownSerializer.serialize(doc(p(
          link('foo'),
        )))).to.eq('[foo](http://example.com "title")');
      });

      it('with title containing double-quotes to serialize', () => {
        const link = a({
          href: 'http://example.com',
          title: 'some " "title"'
        });

        expect(markdownSerializer.serialize(doc(p(
          link('foo'),
        )))).to.eq('[foo](http://example.com "some " "title"")');
      });

      it('in blockquote to serialize', () => {
        expect(markdownSerializer.serialize(doc(
          blockquote(
            p(
              img({
                src: 'http://example.com',
                alt: 'an image',
                title: 'a title'
              }),
              ' foo'
            )
          )
        ))).to.eq('> ![an image](http://example.com "a title") foo');

        expect(markdownSerializer.serialize(doc(
          blockquote(
            blockquote(
              p(
                img({
                  src: 'http://example.com',
                  alt: 'an image',
                  title: 'a title'
                }),
                ' foo'
              )
            )
          )
        ))).to.eq('> > ![an image](http://example.com "a title") foo');
      });

      it('in heading to serialize', () => {
        expect(markdownSerializer.serialize(doc(
          h1(
            p(
              img({
                src: 'http://example.com',
                alt: 'an image',
                title: 'a title'
              }),
              ' foo'
            )
          )
        ))).to.eq('# ![an image](http://example.com "a title") foo');

        expect(markdownSerializer.serialize(doc(
          h2(
            p(
              img({
                src: 'http://example.com',
                alt: 'an image',
                title: 'a title'
              }),
              ' foo'
            )
          )
        ))).to.eq('## ![an image](http://example.com "a title") foo');
      });

      it('with space in url to serialize', () => {
        const link = a({
          href: '/url with space',
        });

        expect(markdownSerializer.serialize(doc(p(
          link('foo'),
        )))).to.eq('[foo](/url with space)');
      });

      it('with space in url and title to serialize', () => {
        const link = a({
          href: '/url with space',
          title: 'title'
        });

        expect(markdownSerializer.serialize(doc(p(
          link('foo'),
        )))).to.eq('[foo](/url with space "title")');
      });

      it('with special characters, characters should not be escaped', () => {
        const link = a({ href: 'hr~ef' });
        expect(markdownSerializer.serialize(doc(p(
          link('foo'),
        )))).to.eq('[foo](hr~ef)');
      });
    });

    describe('emphasis -', () => {
      it('asterisk within strings should be escaped', () => {
        expect(markdownSerializer.serialize(doc(p(
          '*foo bar*',
        )))).to.eq('\\*foo bar\\*');

        expect(markdownSerializer.serialize(doc(p(
          '**foo bar**',
        )))).to.eq('\\*\\*foo bar\\*\\*');

        expect(markdownSerializer.serialize(doc(p(
          '***foo bar***',
        )))).to.eq('\\*\\*\\*foo bar\\*\\*\\*');
      });

      it('underscore within strings should be escaped', () => {
        expect(markdownSerializer.serialize(doc(p(
          '_foo bar_',
        )))).to.eq('\\_foo bar\\_');

        expect(markdownSerializer.serialize(doc(p(
          '__foo bar__',
        )))).to.eq('\\_\\_foo bar\\_\\_');

        expect(markdownSerializer.serialize(doc(p(
          '___foo bar___',
        )))).to.eq('\\_\\_\\_foo bar\\_\\_\\_');
      });

      it('"strong em" should be escaped in its entirety', () => {
        expect(markdownSerializer.serialize(doc(p(
          '***strong**em*'
        )))).to.eq('\\*\\*\\*strong\\*\\*em\\*');
      });

      it('"smart em" should be escaped in its entirety', () => {
        expect(markdownSerializer.serialize(doc(p(
          '_smart_emphasis_'
        )))).to.eq('\\_smart\\_emphasis\\_');
      });

      it('combinations should be properly serialized', () => {
        expect(markdownSerializer.serialize(doc(p(
          em('hi'), '**there*',
        )))).to.eq('*hi*\\*\\*there\\*');

        expect(markdownSerializer.serialize(doc(p(
          strike(strong('foo bar baz'))
        )))).to.eq('**~~foo bar baz~~**');

        expect(markdownSerializer.serialize(doc(p(
          strong(strike('foo bar'), ' baz'),
        )))).to.eq('**~~foo bar~~ baz**');

        expect(markdownSerializer.serialize(doc(p(
          em(strike('foo bar'), ' baz'),
        )))).to.eq('*~~foo bar~~ baz*');

        expect(markdownSerializer.serialize(doc(p(
          code('**bar baz**'),
        )))).to.eq('`**bar baz**`');

        expect(markdownSerializer.serialize(doc(p(
          code('__bar_baz__'),
        )))).to.eq('`__bar_baz__`');
      });
    });

    describe('tilde ~', () => {
      it('should not escape tilde ~', () => {
        expect(markdownSerializer.serialize(doc(p(
          '~',
        )))).to.eq('~');
      });
    });
  });
});
