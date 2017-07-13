import { expect } from 'chai';

import mentionData, { mentionDataSize } from '../../../src/mention/mention-data';

describe('#mention data', () => {
  it('expected mention data', () => {
    expect(mentionDataSize, '22 users').to.equal(22);
  });

  it('expected a user to have a nickname', () => {
    expect(mentionData.mentions[0].nickname, 'first entry has a nickname').to.not.equal(undefined);
  });

  it('expected a user to have an access level', () => {
    expect(mentionData.mentions[0].accessLevel, 'first entry has an access level').to.not.equal(undefined);
  });

  it('expected a user to have an avatar url', () => {
    expect(mentionData.mentions[0].avatarUrl, 'first entry has an avatar url').to.not.equal(undefined);
  });
});
