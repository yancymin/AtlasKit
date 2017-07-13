import { storiesOf } from '@kadira/storybook';
import SearchIcon from '@atlaskit/icon/glyph/search';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { name } from '../package.json';
import Reveal from '../src/components/js/Reveal';

const itemHeight = 50;

const Item = styled.div`
  background-color: lightblue;
  display: flex;
  justify-content: center;
  height: ${itemHeight}px;
  width: ${itemHeight}px;
`;

const FakeChild = () => (
  <div>
    <Item>
      <SearchIcon label="Search icon" />
    </Item>
    <Item>
      <SearchIcon label="Search icon" />
    </Item>
  </div>
);

class ChildWithControls extends PureComponent {
  state = {
    isOpen: true,
    shouldAnimate: false,
  }

  toggleIsOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleShouldAnimate = () => {
    this.setState({
      shouldAnimate: !this.state.shouldAnimate,
    });
  }

  render() {
    const { isOpen, shouldAnimate } = this.state;
    return (
      <div>
        <Reveal
          isOpen={isOpen}
          shouldAnimate={shouldAnimate}
          openHeight={itemHeight * 2}
        >
          <div style={{ backgroundColor: 'lightblue', width: 40 }}>
            <Item>
              <SearchIcon label="Search icon" />
            </Item>
            <Item>
              <SearchIcon label="Search icon" />
            </Item>
          </div>
        </Reveal>

        <div style={{ display: 'flex' }}>
          <div>
            is open: <strong>{isOpen ? 'true' : 'false'}</strong> <br />
            <button
              type="button"
              onClick={this.toggleIsOpen}
            >
              Toggle open
          </button>
          </div>

          <div>
            should animate: <strong>{shouldAnimate ? 'true' : 'false'}</strong> <br />
            <button
              type="button"
              onClick={this.toggleShouldAnimate}
            >
              Toggle animation
          </button>
          </div>
        </div>
      </div>
    );
  }
}

storiesOf(`${name} - Reveal (interal)`, module)
  .add('mount open with no animation', () => (
    <div>
      <div>some content above</div>
      <Reveal isOpen shouldAnimate={false} openHeight={itemHeight * 2}>
        <FakeChild />
      </Reveal>
      <div>some content below</div>
    </div>
  ))
  .add('mount closed with no animation', () => (
    <div>
      <div>some content above</div>
      <Reveal isOpen={false} shouldAnimate={false} openHeight={itemHeight * 2}>
        <FakeChild />
      </Reveal>
      <div>some content below</div>
    </div>
  ))
  .add('mount open with animation', () => (
    <div>
      <div>some content above</div>
      <Reveal isOpen shouldAnimate openHeight={itemHeight * 2}>
        <FakeChild />
      </Reveal>
      <div>some content below</div>
    </div>
  ))
  .add('with controls', () => (
    <ChildWithControls />
  ))
  ;
