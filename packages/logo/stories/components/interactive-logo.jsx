import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import { akColorB400, akColorN800, akColorR500 } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import * as logos from '../../src';

const Centered = styled.div`
  display: flex;
  align-items: center;
`;

const sizes = ['small', 'medium', 'large', 'xlarge'];

const sizeRange = (Logo, collapseTo) => (
  <Centered>
    {
      sizes.map(size => (
        <LogoParent>
          <Logo collapseTo={collapseTo} size={size} />
        </LogoParent>
      ))
    }
  </Centered>
);

const Coloured = styled.div`
  color: ${props => props.color};
`;

const LogoParent = styled.div`
  border-left: 1px dotted ${akColorN800};
  border-right: 1px dotted ${akColorN800};
`;

const colors = [akColorN800, akColorB400, akColorR500];
const collapseToValues = [null, 'icon', 'type'];

export default class InteractiveLogo extends PureComponent {

  state = {
    collapseToIndex: 0,
    colorIndex: 0,
  };

  toggleCollapsed = () => {
    this.setState({ collapseToIndex: (this.state.collapseToIndex + 1) % collapseToValues.length });
  }

  toggleColor = () => {
    this.setState({ colorIndex: (this.state.colorIndex + 1) % colors.length });
  }

  render() {
    const collapseTo = collapseToValues[this.state.collapseToIndex];
    console.log(collapseTo);
    return (
      <Coloured color={colors[this.state.colorIndex]}>
        <div>
          <Button onClick={this.toggleColor}>Change colour</Button>
          <Button onClick={this.toggleCollapsed}>Change collapseTo</Button>
        </div>
        {sizeRange(logos.AtlassianLogo, collapseTo)}
        {sizeRange(logos.BitbucketLogo, collapseTo)}
        {sizeRange(logos.ConfluenceLogo, collapseTo)}
        {sizeRange(logos.HipchatLogo, collapseTo)}
        {sizeRange(logos.JiraLogo, collapseTo)}
      </Coloured>);
  }
}
