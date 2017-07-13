import React from 'react';
import Avatar from '@atlaskit/avatar';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { RoomResult } from '../../../src/components/js/results';
import { mountWithRootTheme } from '../_theme-util';

describe('Room Result', () => {
  let roomResult;
  beforeEach(() => {
    roomResult = mountWithRootTheme(<RoomResult resultId="testRoom" type="room" name="test" />);
  });

  it('should render an avatar if avatarUrl is provided', () => {
    roomResult.setProps({ avatarUrl: 'not null' });
    expect(roomResult.find(Avatar)).toHaveLength(1);
  });

  it('should render an avatar if avatarUrl is not provided', () => {
    expect(roomResult.find(Avatar)).toHaveLength(1);
  });

  it('should render name prop', () => {
    const name = 'Food alerts';
    roomResult.setProps({ name });
    expect(roomResult.text()).toEqual(expect.stringContaining(name));
  });

  it('should render topic prop', () => {
    const topic = 'Food alerts topic';
    roomResult.setProps({ topic });
    expect(roomResult.text()).toEqual(expect.stringContaining(topic));
  });

  it('should fill in topic with privacy name', () => {
    roomResult.setProps({ privacy: 'private' });
    expect(roomResult.text()).toEqual(expect.stringContaining('Private'));
  });

  it('should prefer topic over privacy name', () => {
    const privacy = 'private';
    const topic = 'test-topic';
    roomResult.setProps({ topic, privacy });
    expect(roomResult.text()).toEqual(expect.stringContaining(topic));
    expect(roomResult.text()).not.toEqual(expect.stringContaining(privacy));
  });

  it('should render privacy icons', () => {
    roomResult.setProps({ privacy: 'private' });
    expect(roomResult.find(LockFilledIcon)).toHaveLength(1);
    roomResult.setProps({ privacy: 'public' });
    expect(roomResult.find(WorldIcon)).toHaveLength(1);
  });
});
