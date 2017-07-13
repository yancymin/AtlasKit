import React, { PureComponent } from 'react';
import { PaginationStateless } from '@atlaskit/pagination';

export default class PaginationExample extends PureComponent {
  state = {
    currentPage: 1,
  }

  setCurrentPage = newPage => this.setState({ currentPage: newPage })

  render() {
    return (
      <div>
        <PaginationStateless
          current={this.state.currentPage}
          total={3}
          onSetPage={e => this.setCurrentPage(e)}
        />
      </div>
    );
  }
}
