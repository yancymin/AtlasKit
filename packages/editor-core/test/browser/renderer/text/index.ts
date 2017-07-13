import { expect } from 'chai';
import TextSerializer from '../../../../src/renderer/text';
import schema from '../../../../src/test-helper/schema';
import doc from './_document';
import expectedText from './_expected-text';

const docFromSchema = schema.nodeFromJSON(doc);

describe('Renderer - TextSerializer', () => {

  it('should render document', () => {
    const serializer = TextSerializer.fromSchema(schema);
    const text = serializer.serializeFragment(docFromSchema.content);

    expect(text).to.equal(expectedText);
  });
});
