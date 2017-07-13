import sample from 'lodash.sample';

import avatar1 from 'file!./data/1.jpg';
import avatar2 from 'file!./data/2.jpg';
import avatar3 from 'file!./data/3.jpg';
import avatar4 from 'file!./data/4.jpg';
import avatar5 from 'file!./data/5.jpg';
import avatar6 from 'file!./data/6.jpg';

import { getWeekday, getTimeString } from './util';

const avatarImages = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  '', // to test invalid img src
];

const getAvatar = () => sample(avatarImages);

const profiles = [
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Kramer Hatfield',
      nickname: 'khatfield',
      email: 'khatfield@gluid.com',
      location: 'Vienna, Austria',
      meta: 'Manager',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'available',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Schwartz Mclaughlin',
      nickname: 'smclaughlin',
      email: 'smclaughlin@corecom.com',
      location: 'Perth, Australia',
      meta: 'Senior Developer',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'unavailable',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Nichole Walter',
      nickname: 'nwalter',
      email: 'nwalter@limage.com',
      location: 'Sydney, Australia',
      meta: 'Senior Developer',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'unavailable',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Cleveland Rodriquez',
      nickname: 'crodriquez',
      email: 'crodriquez@slofast.com',
      meta: 'Manager',
    },
    Presence: {
      state: 'available',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Rosalyn Franklin',
      nickname: 'rfranklin',
      email: 'rfranklin@assurity.com',
      location: 'London, England',
      meta: 'Manager',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'unavailable',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Hess Stone',
      nickname: 'hstone',
      email: 'hstone@hawkster.com',
      location: 'Sydney, Australia',
      meta: 'Designer',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'busy',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Lewis Cervantes',
      nickname: 'lcervantes',
      email: 'lcervantes@apextri.com',
      location: 'Perth, Australia',
      meta: 'Senior Developer',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'available',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Abbott Lamb',
      nickname: 'alamb',
      email: 'alamb@xeronk.com',
      location: 'Sydney, Australia',
      meta: 'Senior Developer',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'busy',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Conner Duncan',
      nickname: 'cduncan',
      email: 'cduncan@magmina.com',
      location: 'Hanover, Germany',
      meta: 'Head of Something',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'unavailable',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Bauer Burch',
      nickname: 'bburch',
      email: 'bburch@xleen.com',
      location: 'Austin, TX',
      meta: 'Senior Designer',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'busy',
    },
  },
  {
    User: {
      avatarUrl: getAvatar(),
      fullName: 'Mcbride Haynes',
      nickname: 'mhaynes',
      email: 'mhaynes@geeky.com',
      location: 'London, England',
      meta: 'Senior Designer',
      remoteTimeString: getTimeString(),
      remoteWeekdayIndex: getWeekday().index,
      remoteWeekdayString: getWeekday().string,
    },
    Presence: {
      state: 'available',
    },
  },
];

export default profiles;
