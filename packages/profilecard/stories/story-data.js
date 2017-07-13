import profiles from './profile-data';
import ProfileClient, { modifyResponse } from '../src/api/profile-client';
import { random, getWeekday, getTimeString } from './util';

if (!window.Promise) {
  window.Promise = Promise;
}

const requestService = (cloudId, userId) => {
  const timeout = random(1500) + 500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === '404') {
        return reject();
      }

      const profile = profiles[userId];

      if (!profile) {
        return reject(new Error('Not Found'));
      }

      const weekday = getWeekday();

      const data = { ...profile };

      data.remoteTimeString = getTimeString();
      data.remoteWeekdayIndex = weekday.index;
      data.remoteWeekdayString = weekday.string;

      return resolve(modifyResponse(data));
    }, timeout);
  });
};

export default class MockProfileClient extends ProfileClient {
  // eslint-disable-next-line class-methods-use-this
  makeRequest(cloudId, userId) {
    return requestService(cloudId, userId);
  }
}
