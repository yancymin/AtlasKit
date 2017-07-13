import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { Tooltip } from '@atlaskit/tooltip';
import AkButton from '@atlaskit/button';
import ToolbarButton from '../../../src/ui/ToolbarButton';

const noop = () => {};

describe('@atlaskit/editor-core/ui/ToolbarButton', () => {
  it('should not render tooltip if title is not set', () => {
    const toolbarButtonElem = mount(<ToolbarButton
      onClick={noop}
      selected={false}
      disabled={false}
    />);

    expect(toolbarButtonElem.find(Tooltip)).to.have.length(0);
  });

  it('should render tooltip if title is set', () => {
    const toolbarButtonElem = mount(<ToolbarButton
      onClick={noop}
      selected={false}
      disabled={false}
      title="tooltip text"
    />);

    expect(toolbarButtonElem.find(Tooltip)).to.have.length(1);
  });

  it('should show tooltip on mouseover', () => {
    const toolbarButtonElem = mount(<ToolbarButton
      onClick={noop}
      selected={false}
      disabled={false}
      title="tooltip text"
    />);

    const tooltip = toolbarButtonElem.find(Tooltip);
    tooltip.simulate('mouseover');

    expect(tooltip.prop('visible')).to.equal(true);
  });

  it('should hide tooltip on mouseout', () => {
    const toolbarButtonElem = mount(<ToolbarButton
      onClick={noop}
      selected={false}
      disabled={false}
      title="tooltip text"
    />);

    const tooltip = toolbarButtonElem.find(Tooltip);
    tooltip.simulate('mouseover');
    tooltip.simulate('mouseout');

    expect(tooltip.prop('visible')).to.equal(false);
  });

  it.skip('should hide tooltip on click', () => {
    const toolbarButtonElem = mount(<ToolbarButton
      onClick={noop}
      selected={false}
      disabled={false}
      title="tooltip text"
    />);

    const tooltip = toolbarButtonElem.find(Tooltip);
    tooltip.simulate('mouseover');

    const akButton = toolbarButtonElem.find(AkButton);
    akButton.simulate('click');

    expect(tooltip.prop('visible')).to.equal(false);
  });
});
