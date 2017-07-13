import { mount } from 'enzyme';
import { expect } from 'chai';
import * as sinon from 'sinon';
import ReactSerializer from '../../../../src/renderer/react';
import schema from '../../../../stories/schema';
import * as validator from '../../../../src/renderer/validator';

const doc = {
  'type': 'doc',
  'content': [
    {
      'type': 'paragraph',
      'content': [
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
      ]
    }
  ]
};

const docFromSchema = schema.nodeFromJSON(doc);

describe('Renderer - ReactSerializer', () => {

  describe('serializeFragment', () => {

    it('should render document', () => {
      const reactSerializer = ReactSerializer.fromSchema(schema);
      const reactDoc = mount(reactSerializer.serializeFragment(docFromSchema.content) as any);

      const root = reactDoc.find('div');
      const paragraph = root.find('p');
      const link = paragraph.find('a');
      const strong = link.find('strong');

      expect(root.length).to.equal(1);
      expect(paragraph.length).to.equal(1);
      expect(link.length).to.equal(1);
      expect(strong.length).to.equal(1);

      expect(link.text()).to.equal('Hello, World!');
      expect(link.props()).to.have.property('href', 'https://www.atlassian.com');
      expect(strong.text()).to.equal('World!');
    });

  });

  describe('buildMarkStructure', () => {

    const { strong } = schema.marks;

    it('should wrap text nodes with marks', () => {

      const textNodes = [
        schema.text('Hello '),
        schema.text('World!', strong.create())
      ];

      const output = ReactSerializer.buildMarkStructure(textNodes);
      expect(output[0].type.name).to.equal('text');
      expect((output[0] as any).text).to.equal('Hello ');
      expect(output[1].type.name).to.equal('strong');
      expect((output[1] as any).content[0].type.name).to.equal('text');
      expect((output[1] as any).content[0].text).to.equal('World!');
    });
  });

  describe('getMarks', () => {
    const { strong, strike, underline } = schema.marks;
    const node = schema.text('Hello World', [strong.create(), strike.create(), underline.create()]);

    it('should call getMarksByOrder', () => {
      const spy = sinon.spy(validator, 'getMarksByOrder');
      ReactSerializer.getMarks(node);
      expect(spy.calledWith(node.marks)).to.equal(true);
    });
  });

});
