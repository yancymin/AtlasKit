import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { SecurityOptions } from '../../src/api/SharedResourceUtils';
import { EmojiLoaderConfig } from '../../src/api/EmojiUtils';
import EmojiLoader from '../../src/api/EmojiLoader';

const p1Url = 'https://p1/';

const defaultSecurityHeader = 'X-Bogus';

const header = (code: string | number): SecurityOptions => ({
  headers: {
    [defaultSecurityHeader]: code,
  },
});

const getSecurityHeader = call => call[0].headers.get(defaultSecurityHeader);

const defaultSecurityCode = '10804';

const provider1: EmojiLoaderConfig = {
  url: p1Url,
  securityProvider: () => header(defaultSecurityCode),
};

const providerData1 = [
  { id: 'a' },
  { id: 'b' },
  { id: 'c' },
];

const fetchResponse = data => ({ emojis: data });

function checkOrder(expected, actual) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    expect(emoji.id, `emoji #${idx}`).to.equal(actual[idx].id);
  });
}

describe('EmojiLoader', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('#loadEmoji', () => {

    it('normal', () => {
      fetchMock.mock({
        matcher: `begin:${provider1.url}`,
        response: fetchResponse(providerData1),
      });

      const resource = new EmojiLoader(provider1);
      return resource.loadEmoji().then((emojiResponse) => {
        checkOrder(providerData1, emojiResponse.emojis);
      });
    });

    it('is only passed a baseUrl with no params or securityProvider', () => {
      const simpleProvider: EmojiLoaderConfig = {
        url: p1Url,
      };
      fetchMock.mock({
        matcher: `${simpleProvider.url}`,
        response: fetchResponse(providerData1),
      });

      const resource = new EmojiLoader(simpleProvider);
      return resource.loadEmoji().then((emojiResponse) => {
        checkOrder(providerData1, emojiResponse.emojis);
      });
    });

    it('can handle when a version is specified in the query params', () => {
      const params = '?maxVersion=2';
      fetchMock.mock({
        matcher: `end:${params}`,
        response: fetchResponse(providerData1),
      });

      const provider2 = {
        ...provider1,
        url: `${provider1.url}${params}`
      };

      const resource = new EmojiLoader(provider2);
      return resource.loadEmoji().then((emojiResponse) => {
        checkOrder(providerData1, emojiResponse.emojis);
      });
    });

    it('does not add a scale param when it detects the pixel ratio is <= 1', () => {
      const provider2 = {
        ...provider1,
        getRatio: () => 1
      };
      fetchMock.mock({
        matcher: `${provider1.url}`,
        response: fetchResponse(providerData1),
      });

      const resource = new EmojiLoader(provider2);
      return resource.loadEmoji().then((emojiResponse) => {
        checkOrder(providerData1, emojiResponse.emojis);
      });
    });

    it('adds a scale param when it detects the pixel ratio is > 1', () => {
      const provider2 = {
        ...provider1,
        getRatio: () => 2
      };
      fetchMock.mock({
        matcher: `end:?scale=XHDPI`,
        response: fetchResponse(providerData1),
      });

      const resource = new EmojiLoader(provider2);
      return resource.loadEmoji().then((emojiResponse) => {
        checkOrder(providerData1, emojiResponse.emojis);
      });
    });

    it('401 error once retry', () => {
      const refreshedSecurityProvider = sinon.stub();
      refreshedSecurityProvider.returns(Promise.resolve(header(666)));

      const provider401 = {
        ...provider1,
        refreshedSecurityProvider,
      };

      const provider401Matcher = {
        name: 'authonce',
        matcher: `begin:${provider1.url}`,
      };

      fetchMock.mock({
        ...provider401Matcher,
        response: 401,
        times: 1,
      }).mock({
        ...provider401Matcher,
        response: fetchResponse(providerData1),
        times: 1,
      });

      const resource = new EmojiLoader(provider401);
      return resource.loadEmoji().then((emojiResponse) => {
        expect(refreshedSecurityProvider.callCount, 'refreshedSecurityProvider called once').to.equal(1);
        const calls = fetchMock.calls(provider401Matcher.name);
        expect(calls.length, 'number of calls to fetch').to.equal(2);
        expect(getSecurityHeader(calls[0]), 'first call').to.equal(defaultSecurityCode);
        expect(getSecurityHeader(calls[1]), 'forced refresh call').to.equal('666');

        checkOrder([...providerData1], emojiResponse.emojis);
      });
    });

    it('401 error twice retry', () => {
      const refreshedSecurityProvider = sinon.stub();
      refreshedSecurityProvider.returns(Promise.resolve(header(666)));

      const provider401 = {
        ...provider1,
        refreshedSecurityProvider,
      };

      const provider401Matcher = {
        name: 'authonce',
        matcher: `begin:${provider1.url}`,
      };

      fetchMock.mock({
        ...provider401Matcher,
        response: 401,
      });

      const resource = new EmojiLoader(provider401);
      return resource.loadEmoji().then((emojiResponse) => {
        expect(true, 'Emojis should not have loaded').to.equal(false);
      }).catch(err => {
        expect(err.code, `Expected error: '${err}' to contain 401`).to.equal(401);
      });
    });
  });
});
