import { getAtlassianEmojiData, getStandardEmojiData/* lorem */ } from './story-data';
import * as fetchMock from 'fetch-mock';

import EmojiResource, { EmojiResourceConfig } from '../src/api/EmojiResource';

let resourceCount = 0;

// Ensure unique urls for fetch mock to prevent story clashes
const nextConfig = (): EmojiResourceConfig => {
  resourceCount++;
  return {
    providers: [
      { url: `http://std/${resourceCount}`},
      { url: `http://atl/${resourceCount}`},
    ],
  };
};

export default class TriggeredEmojiResource extends EmojiResource {
  private standardResolver?: Function;
  private atlassianResolver?: Function;

  constructor() {
    const config = nextConfig();
    fetchMock.mock({
      matcher: `begin:${config.providers[0].url}`,
      response: new Promise((resolve) => {
        this.standardResolver = resolve;
      }),
    }).mock({
      matcher: `begin:${config.providers[1].url}`,
      response: new Promise((resolve) => {
        this.atlassianResolver = resolve;
      }),
    });
    super(config);
  }

  triggerStandardLoaded() {
    if (this.standardResolver) {
      this.standardResolver(getStandardEmojiData());
      this.standardResolver = undefined;
    }
  }

  triggerAtlassianLoaded() {
    if (this.atlassianResolver) {
      this.atlassianResolver(getAtlassianEmojiData());
      this.atlassianResolver = undefined;
    }
  }
}
