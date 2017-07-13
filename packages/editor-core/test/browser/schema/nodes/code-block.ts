import { expect } from 'chai';
import { codeBlock, createSchema } from '../../../../src';
import { DEFAULT_LANGUAGES } from '../../../../src/ui/LanguagePicker/languageList';
import { fromHTML, toHTML } from '../../../../src/test-helper';

describe('@atlaskit/editor-core/schema codeBlock node', () => {
  const schema = makeSchema();

  it('should have code property to be true', () => {
    expect(schema.nodes.codeBlock.spec.code).to.equal(true);
  });

  describe('parse from html', () => {
    context('parse from editor encoded HTML', () => {
      context('when language is not set', () => {
        it('converts to block code node', () => {
          const doc = fromHTML('<pre><span>window.alert("hello");<span></pre>', schema);

          expect(doc.firstChild!.type.spec).to.equal(codeBlock);
        });

        it('has language attribute as null', () => {
          const doc = fromHTML('<pre><span>window.alert("hello");<span></pre>', schema);

          expect(doc.firstChild!.attrs['language']).to.eq(null);
        });
      });

      context('when language is set', () => {
        it('converts to block code node', () => {
          const doc = fromHTML('<pre data-language="javascript"><span>window.alert("hello");<span></pre>', schema);

          expect(doc.firstChild!.type.spec).to.equal(codeBlock);
        });

        DEFAULT_LANGUAGES.forEach((language) => {
          it(`extracts language "${language.name}" from data-language attribute`, () => {
            const doc = fromHTML(`<pre data-language='${language.name}'><span>window.alert("hello");<span></pre>`, schema);

            expect(doc.firstChild!.attrs['language']).to.eq(language.name);
          });
        });
      });

      it('preserves all newlines and whitespace', () => {
        const doc = fromHTML('<pre><span></span>    bar\n       baz\n</pre>', schema);

        expect(doc.firstChild!.textContent).to.eq('    bar\n       baz\n');
      });
    });

    context('parse from Bitbucket', () => {
      context('when language is not set', () => {
        it('converts to block code node', () => {
          const doc = fromHTML('<div class="codehilite"><pre><span>window.alert("hello");<span></pre></div>', schema);

          expect(doc.firstChild!.type.spec).to.equal(codeBlock);
        });

        it('has language attribute as null', () => {
          const doc = fromHTML('<div class="codehilite"><pre><span>window.alert("hello");<span></pre></div>', schema);
          const codeBlock = doc.firstChild!;

          expect(codeBlock.attrs.language).to.eq(null);
        });
      });

      context('when other class similar to language is set', () => {
        it('has language attribute as null', () => {
          const doc = fromHTML('<div class="codehilite nolanguage-javascript"><pre><span>window.alert("hello");<span></pre></div>', schema);
          const codeBlock = doc.firstChild!;

          expect(codeBlock.attrs.language).to.eq(null);
        });
      });
    });

    context('when language is set', () => {
      it('converts to block code node', () => {
        const doc = fromHTML('<div class="codehilite language-javascript"><pre><span>window.alert("hello");<span></pre></div>', schema);

        expect(doc.firstChild!.type.spec).to.equal(codeBlock);
      });

      DEFAULT_LANGUAGES.forEach((language) => {
        it(`extracts language attribute from class "language-${language.name}"`, () => {
          const doc = fromHTML(`<div class="codehilite language-${language.name}"><pre><span>window.alert("hello");<span></pre></div>`, schema);
          const codeBlock = doc.firstChild!;

          expect(codeBlock.attrs.language).to.eq(language.name);
        });
      });

      it('removes last new line', () => {
        const doc = fromHTML('<div class="codehilite"><pre><span>hello world;<span><span>\n<\span></pre></div>', schema);

        expect(doc.firstChild!.textContent).to.eq('hello world;');
      });

      it('preserves newlines in the middle and whitespace', () => {
        const doc = fromHTML('<div class="codehilite"><pre><span></span>    bar\n       baz</pre></div>', schema);

        expect(doc.firstChild!.textContent).to.eq('    bar\n       baz');
      });
    });
  });

  describe('convert to HTML', () => {
    const schema = makeSchema();

    context('when language is not set', () => {
      it('converts to pre tag', () => {
        const codeBlock = schema.nodes.codeBlock.create();
        expect(toHTML(codeBlock, schema)).to.have.string('<pre');
      });

      it('does not set data-language attributes', () => {
        const codeBlock = schema.nodes.codeBlock.create();
        expect(toHTML(codeBlock, schema)).to.not.have.string('data-language');
      });
    });

    context('when language is set to null', () => {
      it('does not set data-language attributes', () => {
        const codeBlock = schema.nodes.codeBlock.create({ language: null });
        expect(toHTML(codeBlock, schema)).to.not.have.string('data-language');
      });
    });

    context('when language is set to undefined', () => {
      it('does not set data-language attributes', () => {
        const codeBlock = schema.nodes.codeBlock.create({ language: undefined });
        expect(toHTML(codeBlock, schema)).to.not.have.string('data-language');
      });
    });

    context('when language is set to a value', () => {
      it('converts to pre tag', () => {
        const codeBlock = schema.nodes.codeBlock.create({ language: 'javascript' });
        expect(toHTML(codeBlock, schema)).to.have.string('<pre');
      });

      it('sets data-language attributes', () => {
        const codeBlock = schema.nodes.codeBlock.create({ language: 'javascript' });
        expect(toHTML(codeBlock, schema)).to.have.string('data-language="javascript"');
      });
    });
  });
});

function makeSchema() {
  return createSchema({
    nodes: ['doc', 'paragraph', 'text', 'codeBlock']
  });
}
