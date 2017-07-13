import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { ResourcedMention } from '@atlaskit/mention';
import ProviderFactory from '../../../src/providerFactory';
import Mention from '../../../src/renderer/react/nodes/mention';

describe('@atlaskit/editor-core/ui/Mention', () => {
  it('should render resourced mention', () => {
    const mention = mount(<Mention id="abcd-abcd-abcd" text="@Oscar Wallhult"/>);
    const resourcedMention = mention.find(ResourcedMention);

    expect(resourcedMention.prop('id')).to.equal('abcd-abcd-abcd');
    expect(resourcedMention.prop('text')).to.equal('@Oscar Wallhult');
  });

  it('should pass provider into resourced mention', () => {
    const providerFactory = new ProviderFactory();
    const mentionProvider = Promise.resolve({});
    providerFactory.setProvider('mentionProvider', mentionProvider);

    const mention = mount(<Mention id="abcd-abcd-abcd" text="@Oscar Wallhult" providers={providerFactory}/>);
    const resourcedMention = mention.find(ResourcedMention);

    expect(resourcedMention.prop('mentionProvider')).to.equal(mentionProvider);
  });

  it('should pass event handlers into resourced mention', () => {
    const onClick = () => {};

    const eventHandlers = {
      mention: {
        onClick
      },
    };

    const mention = mount(<Mention id="abcd-abcd-abcd" text="@Oscar Wallhult" eventHandlers={eventHandlers}/>);
    const resourcedMention = mention.find(ResourcedMention);

    expect(resourcedMention.prop('onClick')).to.equal(onClick);
  });
});
