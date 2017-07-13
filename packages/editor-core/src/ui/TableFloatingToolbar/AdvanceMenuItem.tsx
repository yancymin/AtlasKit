import * as React from 'react';
import { PureComponent } from 'react';
import { AdvanceMenuItemAfter, AdvanceMenuItemWrap } from './styles';

export interface Props {
  content: string;
  elemAfter?: string;
}

export default class AdvanceMenuItem extends PureComponent<Props, any> {
  render () {
    const { elemAfter } = this.props;
    return (
      <AdvanceMenuItemWrap>
        <span>{this.props.content}</span>
        {elemAfter && <AdvanceMenuItemAfter>{elemAfter}</AdvanceMenuItemAfter>}
      </AdvanceMenuItemWrap>
    );
  }
}
