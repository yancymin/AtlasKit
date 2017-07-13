import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Pagination from './Stateless';

import {
  validateCurrent,
  validateTotal,
  i18nShape,
  defaultI18n,
} from '../internal/props';

export default class AkPagination extends PureComponent {
  static propTypes = {
    /** Default current page on component mount. Sets internal state. */
    defaultCurrent: validateCurrent,
    /** Object that sets the values for the previous and next buttons. It should
    have the properties 'prev' and 'next', which should be strings. Defaults to
    'Prev' and 'Next' */
    i18n: i18nShape,
    /** Function to call on function set. Is called with the number of the page
    new page. */
    onSetPage: PropTypes.func,
    /** The number of pages in the pagination. */
    total: validateTotal,
  }

  static defaultProps = {
    defaultCurrent: 1,
    i18n: defaultI18n,
    onSetPage() {},
    total: 1,
  }

  state = {
    current: this.props.defaultCurrent,
  }

  componentWillReceiveProps({ current }) {
    if (this.state.current !== current) this.setState({ current });
  }

  onSetPage = (page) => {
    this.props.onSetPage(page);
    this.setState({ current: page });
  }

  render() {
    const { i18n, total } = this.props;

    return (
      <Pagination
        i18n={i18n}
        onSetPage={this.onSetPage}
        total={total}
        current={this.state.current}
      />
    );
  }
}
