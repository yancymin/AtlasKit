import * as React from 'react';
import { PureComponent } from 'react';

export type SubSupType = 'sub' | 'sup';

export interface Props {
  type: SubSupType;
}

export const isSubSupType = (type: string): type is 'sub' | 'sup' => {
  return type === 'sub' || type === 'sup';
};

const isSub = (type: SubSupType): type is 'sub' => {
  return type === 'sub';
};

export default class SubSup extends PureComponent<Props, {}> {
  render() {
    const { props } = this;

    if (isSub(props.type)) {
      return <sub>{props.children}</sub>;
    }

    return <sup>{props.children}</sup>;
  }
}
