/* tslint:disable:variable-name */
import * as React from 'react';
import {AppCardIcon as IconModel} from '../model';
import Avatar from '@atlaskit/avatar';
import {Wrapper, Text, IconWrapper} from '../styled/ContextView';

export interface ContextViewProps {
  text: string;
  icon?: IconModel;
  isInversed?: boolean;
}

export class ContextView extends React.Component<ContextViewProps, {}> {

  renderIcon() {
    const {icon} = this.props;
    if (!icon) {
      return null;
    }
    return (
      <IconWrapper>
        <Avatar appearance="square" size="small" src={icon.url} alt={icon.label}/>
      </IconWrapper>
    );
  }

  renderText() {
    const {text, isInversed} = this.props;
    return <Text isInversed={isInversed}>{text}</Text>;
  }

  render(): JSX.Element {
    return (
      <Wrapper>
        {this.renderIcon()}
        {this.renderText()}
      </Wrapper>
    );
  }

}
