// @flow
import React, { PureComponent } from 'react';
import ContainerLogoStyled from '../styled/ContainerLogo';
import type { ReactElement } from '../../types';

export default class ContainerLogo extends PureComponent {
  props: {|
    /** Elements to be wrapped with the Logo styling. */
    children: ReactElement,
  |}

  render() {
    return (
      <ContainerLogoStyled>
        {this.props.children}
      </ContainerLogoStyled>
    );
  }
}
