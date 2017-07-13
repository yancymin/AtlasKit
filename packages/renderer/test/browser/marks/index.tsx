import { mount } from 'enzyme';
import { expect } from 'chai';
import {
  getMarksByOrder,
  getValidMark,
  isSameMark,
  markOrder,
  renderMark,
} from '../../../src/marks';
import Strong from '../../../src/marks/strong';

describe('Marks', () => {

  describe('getMarksByOrder', () => {
    it('should return marks in right order', () => {
      const unorderedMarks = [
        {
          type: 'strong'
        },
        {
          type: 'link'
        },
        {
          type: 'em'
        },
        {
          type: 'mono'
        },
        {
          type: 'subsup'
        },
        {
          type: 'underline'
        },
        {
          type: 'strike'
        },
      ];

      const orderedMarks = getMarksByOrder(unorderedMarks);
      orderedMarks.forEach((mark, index) => {
        expect(markOrder[index]).to.equal(mark.type);
      });
    });
  });

  describe('getValidMark', () => {

    describe('unkown', () => {
      it('should return "unkown" if type is unkown', () => {
        expect(getValidMark({ type: 'banana' }).type).to.equal('unknown');
      });

      it('should pass through content', () => {
        expect(getValidMark({ type: 'banana', attrs: { color: 'yellow'  }, content: [] })).to.deep.equal({
          type: 'unknown',
          content: []
        });
      });
    });

    describe('em', () => {
      it('should return "em" and pass through content', () => {
        expect(getValidMark({ type: 'em', content: [ { type: 'text', text: 'Hello World' } ] })).to.deep.equal({
          type: 'em',
          content: [
            {
              type: 'text',
              text: 'Hello World'
            }
          ]
        });
      });
    });

    describe('link', () => {
      it('should return "unknown" if attrs is missing', () => {
        expect(getValidMark({ type: 'link' }).type).to.equal('unknown');
      });

      it('should use attrs.href if present', () => {
        expect(getValidMark({ type: 'link', attrs: { href: 'https://www.atlassian.com' }, content: [] })).to.deep.equal({
          type: 'link',
          attrs: {
            href: 'https://www.atlassian.com'
          },
          content: []
        });
      });

      it('should use attrs.url if present and attrs.href is missing', () => {
        expect(getValidMark({ type: 'link', attrs: { url: 'https://www.atlassian.com' }, content: [] })).to.deep.equal({
          type: 'link',
          attrs: {
            href: 'https://www.atlassian.com'
          },
          content: []
        });
      });
    });

    describe('mono', () => {
      it('should return "mono" and pass through content', () => {
        expect(getValidMark({ type: 'mono', content: [ { type: 'text', text: 'Hello World' } ] })).to.deep.equal({
          type: 'mono',
          content: [
            {
              type: 'text',
              text: 'Hello World'
            }
          ]
        });
      });
    });

    describe('strike', () => {
      it('should return "strike" and pass through content', () => {
        expect(getValidMark({ type: 'strike', content: [ { type: 'text', text: 'Hello World' } ] })).to.deep.equal({
          type: 'strike',
          content: [
            {
              type: 'text',
              text: 'Hello World'
            }
          ]
        });
      });
    });

    describe('strong', () => {
      it('should return "strong" and pass through content', () => {
        expect(getValidMark({ type: 'strong', content: [ { type: 'text', text: 'Hello World' } ] })).to.deep.equal({
          type: 'strong',
          content: [
            {
              type: 'text',
              text: 'Hello World'
            }
          ]
        });
      });
    });

    describe('subsup', () => {
      it('should return "unknown" if attrs is missing', () => {
        expect(getValidMark({ type: 'subsup' }).type).to.equal('unknown');
      });

      it('should return "unknown" if attrs.type is not sub or sup', () => {
        expect(getValidMark({ type: 'subsup', attrs: { type: 'banana'} }).type).to.equal('unknown');
      });

      it('should return "subsup" with correct type', () => {
        expect(getValidMark({ type: 'subsup', attrs: { type: 'sub' }, content: [] })).to.deep.equal({
          type: 'subsup',
          attrs: {
            type: 'sub'
          },
          content: []
        });

        expect(getValidMark({ type: 'subsup', attrs: { type: 'sup' }, content: [] })).to.deep.equal({
          type: 'subsup',
          attrs: {
            type: 'sup'
          },
          content: []
        });
      });
    });

    describe('underline', () => {
      it('should return "underline" and pass through content', () => {
        expect(getValidMark({ type: 'underline', content: [ { type: 'text', text: 'Hello World' } ] })).to.deep.equal({
          type: 'underline',
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
      it('should return "text" and pass through text value', () => {
        expect(getValidMark({ type: 'text', text: 'Hello World' })).to.deep.equal({
          type: 'text',
           text: 'Hello World'
        });
      });
    });

  });

  describe('isSameMark', () => {

    it('should return false if mark is null or otherMark is null', () => {
      expect(isSameMark(null, { type: 'strong' })).to.equal(false);
      expect(isSameMark({ type: 'strong' }, null)).to.equal(false);
    });

    it('should return false if type is not the same', () => {
      expect(isSameMark({ type: 'strong' }, { type: 'strike' })).to.equal(false);
    });

    it('should return false if mark has attributes but otherMark does not, or vice-versa', () => {
      expect(isSameMark({ type: 'link', attrs: {} }, { type: 'link' })).to.equal(false);
      expect(isSameMark({ type: 'link' }, { type: 'link', attrs: {} })).to.equal(false);
    });

    it('should return false if mark-type is the same but attributes is not', () => {
      expect(isSameMark({ type: 'link', attrs: { url: 'www.atlassian.com' } }, { type: 'link', attrs: { url: 'www.hipchat.com' } })).to.equal(false);
    });

    it('should return true if type is the same and attributes match', () => {
      expect(isSameMark({ type: 'link', attrs: { url: 'www.atlassian.com' } }, { type: 'link', attrs: { url: 'www.atlassian.com' } })).to.equal(true);
    });

  });

  describe('renderMark', () => {

    it('should render the right mark based on type', () => {
      const mark = mount(renderMark( { type: 'strong', content: [ { type: 'text', text: 'hello world' } ]}));
      expect(mark.is(Strong)).to.equal(true);
    });

    it('should render as text if given a textnode', () => {
      expect(renderMark( { type: 'text', text: 'hello world' } as any)).to.equal('hello world');
    });

    it('should ignore unknown mark and render the content, if any', () => {
      expect(renderMark( { type: 'stroooong', content: [ { type: 'text', text: 'hello world' } ]})).to.equal('hello world');
      expect(renderMark( { type: 'stroooong' })).to.equal(null);
    });


  });

});
