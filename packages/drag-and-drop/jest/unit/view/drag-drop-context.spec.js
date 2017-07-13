// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
// $ExpectError - not matching module
import TestUtils from 'react-addons-test-utils';
import { DragDropContext } from '../../../src/';
import storeKey from '../../../src/state/get-store-key';

class App extends Component {
  // Part of react's api is to use flow types for this.
  // Sadly cannot use flow
  static contextTypes = {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return <div>Hi there</div>;
  }
}

describe('DragDropContext', () => {
  it('should put a store on the context', () => {
    // using react test utils to allow access to nested contexts
    const tree = TestUtils.renderIntoDocument(
      <DragDropContext
        onDragEnd={() => { }}
      >
        <App />
      </DragDropContext>
    );

    const app = TestUtils.findRenderedComponentWithType(tree, App);

    expect(app.context[storeKey]).to.have.property('dispatch').that.is.a('function');
    expect(app.context[storeKey]).to.have.property('getState').that.is.a('function');
    expect(app.context[storeKey]).to.have.property('subscribe').that.is.a('function');
  });
});
