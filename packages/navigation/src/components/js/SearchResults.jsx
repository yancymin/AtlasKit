// @flow
import React, { PureComponent } from 'react';
import { PersonResult, RoomResult } from './results';
import { AkNavigationItemGroup } from '../../../src';

const noOp = () => {};

/**
 * Enumerate the result types available to SearchResults
 */

const availableResultTypes = {
  person: PersonResult,
  room: RoomResult,
};

type ResultShape = {|
  resultId: string,
  type: 'person' | 'room',
|}

type ResultGroup = {|
  items: Array<ResultShape>,
  title: string,
|}

type Props = {|
  isResultHoverStylesDisabled?: boolean,
  isTabbingDisabled?: boolean,
  onClick?: () => null,
  onResultMouseEnter?: () => null,
  onResultMouseLeave?: () => null,
  results?: Array<ResultGroup>,
  selectedItemId?: number | string,
|}

export default class SearchResults extends PureComponent {
  static defaultProps = {
    isResultHoverStylesDisabled: false,
    isTabbingDisabled: false,
    onClick: noOp,
    onResultMouseEnter: noOp,
    onResultMouseLeave: noOp,
    results: [],
  }

  props: Props

  renderResultItem = (props) => {
    const Result = availableResultTypes[props.type];
    const isSelected = props.resultId === this.props.selectedItemId;
    return Result ? (
      <Result
        // SearchResult-provided props
        isHoverStylesDisabled={this.props.isResultHoverStylesDisabled}
        isSelected={isSelected}
        key={props.resultId}
        onClick={this.props.onClick}
        onMouseEnter={this.props.onResultMouseEnter}
        onMouseLeave={this.props.onResultMouseLeave}
        isTabbingDisabled={this.props.isTabbingDisabled}

        // Individual props take precedence over SearchResult-provided presets
        {...props}
      />
     ) : null;
  }

  renderResultGroup = (group, index) => (
    group.items && group.items.length > 0 ? (
      <AkNavigationItemGroup key={group.title || index} title={group.title}>
        {group.items.map(this.renderResultItem)}
      </AkNavigationItemGroup>
    ) : null
  );

  render() {
    return (
      <div>
        {this.props.results.map(this.renderResultGroup)}
      </div>
    );
  }
}
