
import * as React from 'react';
import { PureComponent } from 'react';
import AkFieldBase from '@atlaskit/field-base';
import SearchIcon from '@atlaskit/icon/glyph/search';

import * as styles from './styles';
import { Styles, } from '../../types';

export interface Props {
  style?: Styles;
  query?: string;
  onChange: any;
}

export default class EmojiPickerListSearch extends PureComponent<Props, {}> {

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      query: props.query
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ query: nextProps.query });
  }

  private onChange = (e) => {
    this.setState({ query: e.target.value });
    this.props.onChange(e);
  }

  render() {
    const { style, query } = this.props;

    return (
      <div className={styles.pickerSearch} style={style}>
        <AkFieldBase
          appearance="standard"
          label="Search"
          isCompact={true}
          isLabelHidden={true}
          isFitContainerWidthEnabled={true}
        >
          <span className={styles.searchIcon} >
            <SearchIcon label="Search" />
          </span>
          <input
            className={styles.input}
            autoComplete="off"
            disabled={false}
            name="search"
            placeholder="Search..."
            required={false}
            onChange={this.onChange}
            value={query || ''}
            ref={this.handleInputRef}
          />
        </AkFieldBase>
      </div>
    );
  }

  private handleInputRef = (input) => {
    if (input) {
      input.focus();
    }
  }
}
