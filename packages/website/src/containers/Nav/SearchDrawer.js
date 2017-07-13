import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import SearchResults from './SearchResults';

import data from '../../data';

const components = Object.keys(data).map(i => data[i]);

export default class SearchDrawer extends PureComponent {
  static propTypes = {
    onResultClicked: PropTypes.func.isRequired,
    onSearchInputRef: PropTypes.func,
  }

  state = {
    searchString: '',
  }

  filterChange = () => {
    this.setState({ searchString: this.searchInput.value });
  }

  searchResults = () => {
    const searchString = this.state.searchString.toLowerCase();

    if (!searchString.length) return null;

    const matchingComponents = components.filter(
      c => (
        c.name.toLowerCase().indexOf(searchString) >= 0 ||
        c.description.toLowerCase().indexOf(searchString) >= 0
        // TODO: Maintainers has been requested in the search, but it returns a
        // lot of results without an obvious reason so I don't think we should
        // actually implement it - JW
        /* || (
          c.maintainers
          && c.maintainers.map(m => m.name).join(' ').toLowerCase().indexOf(searchString) >= 0
        ) */
      )
    ).slice(0, 10);

    return (
      <SearchResults
        matchingComponents={matchingComponents}
        onResultClicked={this.props.onResultClicked}
      />
    );
  }

  render() {
    const { onSearchInputRef } = this.props;
    return (
      <div style={{ paddingTop: akGridSize }}>
        <Input
          onKeyUp={this.filterChange}
          placeholder="Component search..."
          innerRef={(el) => {
            this.searchInput = el;
            if (onSearchInputRef) onSearchInputRef(el);
          }}
          type="text"
        />
        {this.searchResults()}
      </div>
    );
  }
}
const Input = styled.input`
  border: none;
  display: block;
  font-size: ${akGridSizeUnitless * 3}px;
  font-weight: 200;
  margin-top: ${0 - (akGridSizeUnitless / 2)}px;
  outline: none;
  padding: 0 0 0 ${akGridSize};
`;
