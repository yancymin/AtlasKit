import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ApplicationCard from '../../../../../src/renderer/react/nodes/applicationCard';
import { AppCardView } from '@atlaskit/media-card';

describe('Renderer - React/Nodes/ApplicationCard', () => {
  const attrs = {
    text: 'applicationCard',
    title: {
      text: 'applicationCard'
    }
  };
  const applicationCard = shallow(
    <ApplicationCard
      {...attrs}
    />
  );

  it('should wrap content with <AppCardView>-tag', () => {
    expect(applicationCard.find(AppCardView)).to.have.length(1);
  });

});
