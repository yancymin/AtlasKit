import { Fragment } from '../prosemirror';

export interface Serializer<T> {
  serializeFragment(fragment: Fragment): T | null;
}
