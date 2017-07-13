import { expect } from 'chai';
import * as sinon from 'sinon';

import { renderDocument, Serializer } from '../../../src/renderer';
import * as  validator from '../../../src/renderer/validator';
import schema from '../../../stories/schema';

const doc = {
  'version': 1,
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

class MockSerializer implements Serializer<string> {
  serializeFragment(fragment: any) {
    return 'dummy';
  }
}

describe('Renderer', () => {

  describe('renderDocument', () => {

    const serializer = new MockSerializer();

    it('should call getValidDocument', () => {
      const spy = sinon.spy(validator, 'getValidDocument');
      renderDocument(doc, serializer, schema);
      expect(spy.calledWith(doc)).to.equal(true);
    });

    it('should call schema.nodeFromJSON', () => {
      const spy = sinon.spy(schema, 'nodeFromJSON');
      renderDocument(doc, serializer, schema);
      expect(spy.called).to.equal(true);
    });


    it('should call serializer.serializeFragment', () => {
      const spy = sinon.spy(serializer, 'serializeFragment');
      renderDocument(doc, serializer, schema);
      expect(spy.called).to.equal(true);
    });

  });

});
