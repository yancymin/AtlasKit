// @flow
import type {
  Dimension,
  Id,
  TypeId,
  ReactElement,
  HTMLElement,
} from '../../types';

export type MapProps = {|
  shouldPublish: boolean,
|}

export type DispatchProps = {|
  publish: (dimension: Dimension) => void,
|}

export type OwnProps = {|
  itemId: Id,
  type: TypeId,
  targetRef: ?HTMLElement,
  children?: ReactElement,
|}

export type Props = MapProps & DispatchProps & OwnProps;
