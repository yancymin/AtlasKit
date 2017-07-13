import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { expect } from 'chai';
import LockCircleIcon from '@atlaskit/icon/glyph/lock-circle';

import { MentionDescription } from '../../src/types';
import { Props, State } from '../../src/components/MentionList';
import MentionItem from '../../src/components/MentionItem';

const mentionWithNickname = {
    id: '0',
    name: 'Raina Halper',
    mentionName: 'Caprice',
    nickname: 'Carolyn',
    avatarUrl: ''
};

const mentionWithoutNickname =  {
    id: '1',
    name: 'Kaitlyn Prouty',
    mentionName: 'Fidela',
    avatarUrl: ''
};

function setupMentionItem(mention: MentionDescription, props?: Props): ShallowWrapper<Props, State> {
  return shallow(
    <MentionItem
      mention={mention}
      onSelection={props && props.onSelection}
    />
  ) as ShallowWrapper<Props, State>;
}

describe('MentionItem', () => {
  it('should display @-nickname if nickname is present', () => {
    const component = setupMentionItem(mentionWithNickname);
    expect(component.html()).contains(`@${mentionWithNickname.nickname}`);
  });

  it('should not display @-name if nickname is not present', () => {
    const component = setupMentionItem(mentionWithoutNickname);
    expect(component.html()).to.not.contains('@');
  });

  it('should display access restriction if accessLevel is not CONTAINER', () => {
    const component = setupMentionItem({
        id: '1',
        name: 'Kaitlyn Prouty',
        mentionName: 'Fidela',
        avatarUrl: '',
        accessLevel: 'SITE'
    });
    expect(component.find(LockCircleIcon).length).to.equal(1);
  });

  it('should not display access restriction if accessLevel is CONTAINER', () => {
    const component = setupMentionItem({
        id: '1',
        name: 'Kaitlyn Prouty',
        mentionName: 'Fidela',
        avatarUrl: '',
        accessLevel: 'CONTAINER'
    });
    expect(component.find(LockCircleIcon).length).to.equal(0);
  });

  it('should not display access restriction if no accessLevel data', () => {
    const component = setupMentionItem({
      id: '1',
      name: 'Kaitlyn Prouty',
      mentionName: 'Fidela',
      avatarUrl: '',
    });
    expect(component.find(LockCircleIcon).length).to.equal(0);
  });
});
