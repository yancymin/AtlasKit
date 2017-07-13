
// @flow
import PropTypes from 'prop-types';
import storeKey from '../../src/state/get-store-key';
import createStore from '../../src/state/create-store';

// Not using this store - just putting it on the context
// For any connected components that need it (eg DimensionPublisher)
export default () => ({
  context: {
    // Each consumer will get their own store
    [storeKey]: createStore({ onDragEnd: () => { } }),
  },
  childContextTypes: {
    [storeKey]: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired,
  },
});
