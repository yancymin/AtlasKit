import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import { AkSearch, AkNavigationItem } from '../../src/index';

const data = [
  {
    group: 'Fictional swords',
    items: [
      { name: 'Caledfwlch' },
      { name: 'Derfel Cadarn' },
      { name: 'Dyrnwyn' },
      { name: 'Smee\'s' },
      { name: 'The Sword of Leah' },
      { name: 'The Sword of Shannara' },
      { name: 'Dragnipur' },
      { name: 'Chance' },
      { name: 'Vengeance' },
      { name: 'The Swords of Blood and Fire' },
      { name: 'Snaga' },
      { name: 'Druss’' },
      {
        name: 'Richard Rahl',
        caption: 'The Sword of Truth',
      },
      { name: 'Callandor' },
      { name: 'sa\'angreal', caption: 'The Wheel of Time' },
      { name: 'Heron Mark Sword', caption: 'The Wheel of Time' },
      { name: 'Graywand' },
      { name: 'Scalpel' },
      { name: 'The White Witch' },
      { name: 'Valyrian steel', caption: 'A Song of Ice and Fire' },
      { name: 'Yyrkoon' },
      { name: 'Elric' },
      { name: 'Mask' },
      { name: 'Icingdeath' },
      { name: 'Twinkle' },
      { name: 'Negima' },
      { name: 'Goron' },
      { name: 'Sarevok' },
      { name: 'The Green Destiny' },
      { name: 'Harun Al-Rashid' },
      { name: 'Takezo Kensei', caption: 'Heroes' },
      { name: 'Red Ranger', caption: 'Power Rangers' },
      { name: 'Green Ranger', caption: 'Power Rangers' },
      { name: 'Lord Zedd', caption: 'Power Rangers' },
      { name: 'Power Rangers: Zeo', caption: 'Power Rangers' },
      { name: 'Magna Defender' },
      { name: 'Galaxy Rangers' },
      { name: 'Dino Thunder' },
      { name: 'Caliburn' },
      { name: 'Sword of Damocles' },
    ],
  },
  {
    group: 'CSI actors',
    items: [
      { name: 'David Caruso', caption: 'Horatio Caine' },
      { name: 'Kim Delaney', caption: 'Megan Donner' },
      { name: 'Emily Procter', caption: 'Calleigh Duquesne' },
      { name: 'Adam Rodriguez', caption: 'Delko' },
      { name: 'Khandi Alexander', caption: 'Alexx Woods' },
      { name: 'Rory Cochrane', caption: 'Tim Speedle' },
      { name: 'Rex Linn', caption: 'Frank Tripp' },
      { name: 'Eva LaRue', caption: 'Natalia Boa Vista' },
      { name: 'Megalyn Echikunwoke', caption: 'Tara Price' },
      { name: 'Eddie Cibrian', caption: 'Jesse Cardoza' },
      { name: 'Omar Benson Miller', caption: 'Walter Simmons' },
    ],
  },
];

const icons = {
  'CSI actors': (<AtlassianIcon label="CSI" />),
  'Fictional swords': (<DashboardIcon label="Fictional swords" />),
};

function contains(string, query) {
  return string.toLowerCase().indexOf(query.toLowerCase()) > -1;
}

function searchData(query) {
  const results = data.map(
    ({ group, items }) => (items
      .filter(item => contains(item.name, query) || contains(group, query))
      .map(item => ({
        group,
        item,
      }))
    )
  ).reduce((a, b) => a.concat(b));
  return results;
}

// a little fake store for holding the query after a component unmounts
const store = {};

export default class BasicSearch extends PureComponent {
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

  renderResults = () => (
    this.state.results.map(({ item, group }, idx) => (
      <AkNavigationItem href="#foo" icon={icons[group]} subText={group} text={item.name} caption={item.caption} key={idx} />
    ))
  );

  render() {
    return (
      <AkSearch
        clearIcon={<CrossIcon label="clear" size="medium" />}
        onChange={({ target }) => { this.search(target.value); }}
        value={this.state.query}
        isLoading={this.state.isLoading}
      >
        {this.renderResults()}
      </AkSearch>
    );
  }
}
