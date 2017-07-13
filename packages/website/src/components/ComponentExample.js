/* eslint-disable react/prop-types, react/no-danger */

import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import ToggleIcon from '@atlaskit/icon/glyph/code';
import 'prismjs/themes/prism-tomorrow.css';
import {
  akColorN20,
  akColorN30,
  akColorN60,
  akColorN600,
  akColorN700,
  akColorN800,

  akGridSize,
} from '@atlaskit/util-shared-styles';

const formatSrc = src => Prism.highlight(src, Prism.languages.jsx);

export const ExampleSource = ({ isSourceClosing = false, handleAnimationEnd = () => {}, src }) => (
  <Code
    closing={isSourceClosing}
    onAnimationEnd={handleAnimationEnd}
  >
    <pre>
      <code dangerouslySetInnerHTML={{ __html: formatSrc(src) }} />
    </pre>
  </Code>
);

export default class Example extends PureComponent {
  state = {
    isSourceClosing: false,
    isSourceVisible: false,
  }

  toggleSource = () => {
    const { isSourceClosing, isSourceVisible } = this.state;

    // abort for repeditive clicks
    if (isSourceClosing) return;

    if (!isSourceVisible) {
      this.setState({ isSourceVisible: true });
    } else {
      this.setState({ isSourceClosing: true });
    }
  }
  handleAnimationEnd = () => {
    const { isSourceClosing } = this.state;

    if (!isSourceClosing) return;

    this.setState({
      isSourceClosing: false,
      isSourceVisible: false,
    });
  }

  render() {
    const { Component, title, src } = this.props;
    const { isHover, isSourceVisible, isSourceClosing } = this.state;
    const toggleLabel = isSourceVisible
      ? 'Hide Code Snippet'
      : 'Show Code Snippet';

    return (
      <Wrapper hover={isHover} open={isSourceVisible}>
        <Toggle
          onClick={this.toggleSource}
          onMouseOver={() => this.setState({ isHover: true })}
          onMouseOut={() => this.setState({ isHover: false })}
          title={toggleLabel}
          open={isSourceVisible}
        >
          <ToggleTitle>{title}</ToggleTitle>
          <ToggleIcon label={toggleLabel} />
        </Toggle>

        {isSourceVisible ? <ExampleSource
          src={src}
          handleAnimationEnd={this.handleAnimationEnd}
          isSourceClosing={isSourceClosing}
        /> : null}
        <Showcase>
          <Component />
        </Showcase>
      </Wrapper>
    );
  }
}

const TRANSITION_DURATION = '200ms';

const getWrapperBg = (props) => {
  let color = akColorN20;

  if (props.open && props.hover) color = akColorN700;
  else if (props.open) color = akColorN600;
  else if (props.hover) color = akColorN30;

  return color;
};

const Wrapper = styled.div`
  background-color: ${getWrapperBg};
  border-radius: 5px;
  margin-top: 20px;
  padding: 0 ${akGridSize} ${akGridSize};
  transition: background-color ${TRANSITION_DURATION};
`;

const Toggle = styled.div`
  align-items: center;
  color: ${props => (props.open ? 'white' : akColorN600)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: ${akGridSize};
  transition: color ${TRANSITION_DURATION}, fill ${TRANSITION_DURATION};
`;
const ToggleTitle = styled.h4`
  color: inherit;
  margin: 0;
`;

const animIn = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 1000px; opacity: 1; }
`;
const animOut = keyframes`
  from { max-height: 1000px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
`;
const Code = styled.div`
  animation: ${props => (props.closing ? animOut : animIn)} ${TRANSITION_DURATION} ease-out;
  background-color: ${akColorN800};
  border-radius: 3px;
  color: ${akColorN60};
  display: block;
  margin: 0 0 ${akGridSize};
  overflow-x: auto;
  padding: ${akGridSize};

  & code {
    font-family: Monaco, Menlo, monospace;
    font-size: 0.9em;
  }
`;

const Showcase = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${akGridSize};
`;
