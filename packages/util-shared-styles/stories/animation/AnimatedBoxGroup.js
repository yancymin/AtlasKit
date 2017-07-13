import React, { PureComponent } from 'react';
import { Container } from './styled';
import AnimatedBox from './AnimatedBox';

/* This component simply renders three AnimatedBoxes with a button underneath
   to run the animationClass of each at the same time */
export default class AnimatedBoxGroup extends PureComponent {
  clickAll = () => {
    this.boldBox.handleClick();
    this.optimisticBox.handleClick();
    this.combinedBox.handleClick();
  }

  render() {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <AnimatedBox appearance="bold" ref={n => (this.boldBox = n)}>
            Bold
          </AnimatedBox>
          <AnimatedBox appearance="optimistic" ref={n => (this.optimisticBox = n)}>
            Optimistic
          </AnimatedBox>
          <AnimatedBox appearance="combined" ref={n => (this.combinedBox = n)} >
            Combined
          </AnimatedBox>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={this.clickAll}>Animate All</button>
        </div>
      </Container>
    );
  }
}
