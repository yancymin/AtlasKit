import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { action } from '@kadira/storybook';
import { AkQuickSearch, AkQuickSearchWithKeyboardControls } from '../../src/index';

const getPersonAvatarUrl = identity => `http://api.adorable.io/avatar/32/${identity}`;
const getRoomAvatarUrl = idx => `http://lorempixel.com/32/32/nature/${idx}`;

const data = [
  {
    title: 'Jedi',
    items: [
      {
        resultId: '1',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(1),
        name: 'Jedi Council [archived]',
        privacy: 'private',
      }, {
        resultId: '2',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(2),
        name: 'Lightsaber colour discussion',
        topic: 'Please keep it civil. Strictly no red saber talk',
        privacy: 'public',
      }, {
        resultId: '3',
        type: 'room',
        avatarUrl: getRoomAvatarUrl(3),
        name: 'Force tricks',
        topic: 'Impress your friends',
        privacy: 'private',
      }, {
        resultId: 'qgjinn',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('qgjinn'),
        mentionName: 'MasterQ',
        name: 'Qui-Gon Jinn',
        presenceMessage: 'On-call',
        presenceState: 'offline',
      }, {
        resultId: 'askywalker',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('askywalker'),
        mentionName: 'askywalker',
        name: 'Anakin Skywalker',
        presenceMessage: 'Trying out the dark side',
        presenceState: 'offline',
      }, {
        resultId: 'owkenobi',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('owkenobi'),
        mentionName: 'BenKen',
        name: 'Obi-Wan Kenobi',
        presenceMessage: 'In exile',
        presenceState: 'busy',
      }, {
        resultId: 'yoda',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('yoda'),
        mentionName: 'yoda',
        name: 'Yoda',
        presenceMessage: 'Chillin`',
        presenceState: 'online',
      }, {
        resultId: 'mwindu',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('mwindu'),
        mentionName: 'mwindu',
        name: 'Mace Windu',
        presenceState: 'offline',
      }, {
        resultId: 'lskywalker',
        type: 'person',
        avatarUrl: getPersonAvatarUrl('lskywalker'),
        mentionName: 'lskywalker',
        name: 'Luke Skywalker',
        presenceMessage: 'Is this Yoda guy for real? lol',
        presenceState: 'online',
      },
    ],
  },
  {
    title: 'CSI',
    items: [
      {
        resultId: 'Forensics Lab',
        type: 'room',
        name: 'Forensics Lab',
        topic: 'Science!',
        avatarUrl: getRoomAvatarUrl(4),
      }, {
        resultId: 'Ballistics Lab',
        type: 'room',
        name: 'Ballistics Lab',
        topic: 'Pew pew pew',
        avatarUrl: getRoomAvatarUrl(5),
      }, {
        resultId: 'Cotton swab enthusiasts',
        type: 'room',
        name: 'Cotton swab enthusiasts',
        topic: 'So many applications',
        avatarUrl: getRoomAvatarUrl(6),
      }, {
        resultId: 'David Caruso',
        type: 'person',
        name: 'David Caruso',
        mentionName: 'Horatio Caine',
        avatarUrl: getPersonAvatarUrl('hcaine'),
      }, {
        resultId: 'Kim Delaney',
        type: 'person',
        name: 'Kim Delaney',
        mentionName: 'Megan Donner',
        avatarUrl: getPersonAvatarUrl('mdonner'),
      }, {
        resultId: 'Emily Procter',
        type: 'person',
        name: 'Emily Procter',
        mentionName: 'Calleigh Duquesne',
        avatarUrl: getPersonAvatarUrl('cduqesne'),
      }, {
        resultId: 'Adam Rodriguez',
        type: 'person',
        name: 'Adam Rodriguez',
        mentionName: 'Delko',
        avatarUrl: getPersonAvatarUrl('delko'),
      }, {
        resultId: 'Khandi Alexander',
        type: 'person',
        name: 'Khandi Alexander',
        mentionName: 'Alexx Woods',
        avatarUrl: getPersonAvatarUrl('awoods'),
      }, {
        resultId: 'Rory Cochrane',
        type: 'person',
        name: 'Rory Cochrane',
        mentionName: 'Tim Speedle',
        avatarUrl: getPersonAvatarUrl('tspeedle'),
      }, {
        resultId: 'Rex Linn',
        type: 'person',
        name: 'Rex Linn',
        mentionName: 'Frank Tripp',
        avatarUrl: getPersonAvatarUrl('ftripp'),
      }, {
        resultId: 'Eva LaRue',
        type: 'person',
        name: 'Eva LaRue',
        mentionName: 'Natalia Boa Vista',
        avatarUrl: getPersonAvatarUrl('`nboavista`'),
      }, {
        resultId: 'Megalyn Echikunwoke',
        type: 'person',
        name: 'Megalyn Echikunwoke',
        mentionName: 'Tara Price',
        avatarUrl: getPersonAvatarUrl('tprice'),
      }, {
        resultId: 'Eddie Cibrian',
        type: 'person',
        name: 'Eddie Cibrian',
        mentionName: 'Jesse Cardoza',
        avatarUrl: getPersonAvatarUrl('jcardoza'),
      }, {
        resultId: 'Omar Benson Miller',
        type: 'person',
        name: 'Omar Benson Miller',
        mentionName: 'Walter Simmons',
        avatarUrl: getPersonAvatarUrl('wsimmons'),
      },
    ],
  },
];

function contains(string, query) {
  return string.toLowerCase().indexOf(query.toLowerCase()) > -1;
}

function searchData(query) {
  const results = data.map(({ title, items }) => {
    const filteredItems = items.filter(
      item => contains(item.name, query)
    );
    return { title, items: filteredItems };
  });
  return results;
}

// a little fake store for holding the query after a component unmounts
const store = {};

const onClickAction = (item) => { action('onResultClick')(`resultId: ${item.resultId}`); };

export default class BasicQuickSearch extends PureComponent {
  static propTypes = {
    fakeNetworkLatency: PropTypes.number,
  }

  static defaultProps = {
    fakeNetworkLatency: 0,
  }

  state = {
    query: store.query || '',
    results: searchData(''),
  }

  setQuery(query) {
    store.query = query;
    this.setState({
      query,
    });
  }

  search = (query) => {
    clearTimeout(this.searchTimeoutId);
    this.setState({
      isLoading: true,
    });
    this.setQuery(query);
    const results = searchData(query);
    this.searchTimeoutId = setTimeout(() => {
      this.setState({
        results,
        isLoading: false,
      });
    }, this.props.fakeNetworkLatency);
  }

  render() {
    const QuickSearchComp = this.props.withKeyboardControls
      ? AkQuickSearchWithKeyboardControls
      : AkQuickSearch;
    return (
      <QuickSearchComp
        /* Search props */
        isLoading={this.state.isLoading}
        onSearchChange={({ target }) => { this.search(target.value); }}
        value={this.state.query}

        /* SearchResults props */
        onResultClick={onClickAction}
        results={this.state.results}
      />
    );
  }
}
