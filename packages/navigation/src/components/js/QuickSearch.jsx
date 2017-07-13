import React, { PureComponent } from 'react';

import { AkSearch, AkSearchResults } from '../../../src';

const noOp = () => {};

export default class QuickSearch extends PureComponent {
  static propTypes = {
    /* Search pass-through props */
    isLoading: AkSearch.propTypes.isLoading,
    onSearchBlur: AkSearch.propTypes.onBlur,
    onSearchChange: AkSearch.propTypes.onChange,
    onSearchKeyDown: AkSearch.propTypes.onKeyDown,
    placeholder: AkSearch.propTypes.placeholder,
    value: AkSearch.propTypes.value,

    /* SearchResults pass-through props */
    isResultHoverStylesDisabled: AkSearchResults.propTypes.isResultHoverStylesDisabled,
    onResultClick: AkSearchResults.propTypes.onClick.isRequired,
    onResultMouseEnter: AkSearchResults.propTypes.onResultMouseEnter,
    onResultMouseLeave: AkSearchResults.propTypes.onResultMouseLeave,
    results: AkSearchResults.propTypes.results,
    selectedItemId: AkSearchResults.propTypes.selectedItemId,
  }

  static defaultProps = {
    isLoading: false,
    isResultHoverStylesDisabled: false,
    onResultMouseEnter: noOp,
    onResultMouseLeave: noOp,
    onSearchBlur: noOp,
    onSearchKeyDown: noOp,
    placeholder: 'Search',
    results: [],
    value: '',
  }

  render() {
    return (
      <AkSearch
        isLoading={this.props.isLoading}
        onBlur={this.props.onSearchBlur}
        onChange={this.props.onSearchChange}
        onKeyDown={this.props.onSearchKeyDown}
        placeholder={this.props.placeholder}
        value={this.props.value}
      >
        <AkSearchResults
          isResultHoverStylesDisabled={this.props.isResultHoverStylesDisabled}
          isTabbingDisabled
          onClick={this.props.onResultClick}
          onResultMouseEnter={this.props.onResultMouseEnter}
          onResultMouseLeave={this.props.onResultMouseLeave}
          results={this.props.results}
          selectedItemId={this.props.selectedItemId}
        />
      </AkSearch>
    );
  }
}
