// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import DefaultLinkComponent from './DefaultLinkComponent';
import ContainerTitleIcon from '../styled/ContainerTitleIcon';
import ContainerTitleInner from '../styled/ContainerTitleInner';
import ContainerTitleSubText from '../styled/ContainerTitleSubText';
import ContainerTitleText from '../styled/ContainerTitleText';
import ContainerTitleTextWrapper from '../styled/ContainerTitleTextWrapper';
import type { ReactElement } from '../../types';

const getStyledLink = component => styled(component)`
  display: block;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

type Props = {|
  /** Content to use as a custom presence indicator. Accepts any React element.
  For best results, it is recommended to use square content with height and
  width of 100%. */
  icon: ReactElement,
  /** Text to appear as the title. This is placed at the top and bolded. */
  text: string,
  /** Text to appear below the title. */
  subText?: string,
  /** The destination of the title if clicked. If no href is provided, the
  title will not be a link. */
  href?: string,
  /** A component to be used as a link. By Default this is an anchor. when a href
  is passed to it, and otherwise is a button. */
  linkComponent?: () => mixed,
|}

export default class ContainerTitle extends PureComponent {
  static defaultProps = {
    linkComponent: DefaultLinkComponent,
  }

  props: Props;

  render() {
    const {
      href,
      text,
      subText,
      icon,
      linkComponent: Link,
    } = this.props;

    const StyledLink = getStyledLink(Link);

    return (
      <StyledLink href={href}>
        <ContainerTitleInner>
          <ContainerTitleIcon>{icon}</ContainerTitleIcon>
          <ContainerTitleTextWrapper>
            <ContainerTitleText>{text}</ContainerTitleText>
            {subText ? <ContainerTitleSubText>{subText}</ContainerTitleSubText> : null}
          </ContainerTitleTextWrapper>
        </ContainerTitleInner>
      </StyledLink>
    );
  }
}
