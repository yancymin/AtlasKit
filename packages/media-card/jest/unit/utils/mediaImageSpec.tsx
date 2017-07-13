import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MediaImage } from '../../../src/utils';
import {smallImage} from '@atlaskit/media-test-helpers';

describe('MediaImage', () => {
  const validURI = smallImage;
  const invalidURI = 'fooBar';

  // TODO: test fails on pipeline, find way of wait until img is loaded properly
  it.skip('Fires onError method when URI dont work', (done) => {
    const onError = function(ev) {
      expect(ev).to.instanceOf(Event);
      expect(this).to.instanceOf(HTMLElement);
      done();
    };

    mount(<MediaImage dataURI={invalidURI} onError={onError} />);
  });

  it('Implicitly disables cropping the image when dimensions are supplied', () => {
    const mediaImg = mount(<MediaImage
       dataURI={validURI}
       transparentFallback={false}
       crop={true}
       width={'50px'}
       height={'25px'}
    />);

    expect(mediaImg.find('.media-card').prop('className')).to.not.contain('crop');
  });

  it('Only adds the image to the background when transparentFallback is disabled', () => {
    const mediaImg = mount(<MediaImage dataURI={validURI} transparentFallback={false} />) as any;

    expect(mediaImg.find('.media-card').prop('style').backgroundImage).to.equal(`url(${validURI})`);
  });
});
