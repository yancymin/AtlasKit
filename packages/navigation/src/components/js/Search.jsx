// @flow
import React, { PureComponent } from 'react';
import FieldBase from '@atlaskit/field-base';
import SearchBox from '../styled/SearchBox';
import SearchFieldBaseInner from '../styled/SearchFieldBaseInner';
import SearchInner from '../styled/SearchInner';
import SearchInput from '../styled/SearchInput';
import type { ReactElement } from '../../types';

const controlKeys = ['ArrowUp', 'ArrowDown', 'Enter'];

type Props = {|
  /** The elements to render as options to search from. */
  children?: ReactElement,
  /** Set whether the loading state should be shown. */
  isLoading?: boolean,
  /** Function to be called when the search input loses focus. */
  onBlur: () => mixed,
  /** Function to be called when a change action occurs. */
  onChange: () => mixed,
  /** Function to be called when the user hits the escape key.  */
  onKeyDown: () => mixed,
  /** Placeholder text for search field. */
  placeholder?: string,
  /** Current value of search field. */
  value?: string,
|}

export default class Search extends PureComponent {
  static defaultProps = {
    isLoading: false,
    onBlur: () => {},
    placeholder: 'Search',
  }

  onInputKeyDown = (event) => {
    if (controlKeys.indexOf(event.key) === -1) {
      return;
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
    event.stopPropagation();
  }

  setInputRef = (ref) => {
    this.inputRef = ref;
  }

  props: Props

  render() {
    const {
      children,
      value,
      onBlur,
      onChange,
      placeholder,
    } = this.props;

    return (
      <SearchInner>
        <SearchBox
          onMouseDown={this.onSearchBoxMouseDown}
        >
          <FieldBase
            appearance="none"
            isFitContainerWidthEnabled
            isPaddingDisabled
            isLoading={this.props.isLoading}
          >
            <SearchFieldBaseInner>
              <SearchInput
                autoFocus
                innerRef={this.setInputRef}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                spellCheck={false}
                type="text"
                value={value}
                onKeyDown={this.onInputKeyDown}
              />
            </SearchFieldBaseInner>
          </FieldBase>
        </SearchBox>
        {children}
      </SearchInner>
    );
  }
}
