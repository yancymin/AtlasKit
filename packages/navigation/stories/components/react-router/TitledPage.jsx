import Lorem from 'react-lorem-component';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PageNavigation from './PageNavigation';
import HtmlPage from '../HtmlPage';

export default class TitledPage extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    return (
      <HtmlPage
        content={
          <div>
            <h1>{this.props.title}</h1>
            <Lorem count="30" />
          </div>
        }
      >
        <PageNavigation />
      </HtmlPage>
    );
  }
}
