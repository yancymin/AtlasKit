// @flow
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import memoizeOne from 'memoize-one';
import type { Dimension, State, TypeId, ReactClass } from '../../types';
import type { DispatchProps, MapProps, OwnProps } from './dimension-publisher-types';
import storeKey from '../../state/get-store-key';
import DimensionPublisher from './dimension-publisher';

const requestDimensionSelector =
  (state: State): ?TypeId => state.dimension.request;

const getOwnType = (state: State, props: OwnProps): TypeId => props.type;

export const makeSelector = () => {
  const getMapProps = memoizeOne(
    (shouldPublish: boolean): MapProps => ({
      shouldPublish,
    })
  );

  return createSelector(
    [getOwnType, requestDimensionSelector],
    (ownType: TypeId, requested: ?TypeId): MapProps => {
      if (!requested) {
        return getMapProps(false);
      }

      return getMapProps(ownType === requested);
    }
  );
};

const makeMapStateToProps = () => {
  const selector = makeSelector();
  return (state: State, props: OwnProps) => selector(state, props);
};

export default (publish: (dimension: Dimension) => void): ReactClass => {
  const mapDispatchToProps: DispatchProps = {
    publish,
  };

  return connect(
    makeMapStateToProps,
    mapDispatchToProps,
    null,
    { storeKey }
  )(DimensionPublisher);
};
