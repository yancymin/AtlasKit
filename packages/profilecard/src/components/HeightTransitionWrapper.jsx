import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from '../styles/profilecard.less';

export default class HeightTransitionWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    height: 'auto',
  }

  componentDidMount() {
    this.updateRefHeight();
  }

  componentDidUpdate() {
    this.updateRefHeight();
  }

  // eslint-disable-next-line class-methods-use-this
  preventDefault(event) {
    event.persist();
    event.preventDefault();
  }

  updateRefHeight() {
    this.setState({
      height: this.ref && this.ref.children.length
        ? this.ref.children[0].offsetHeight : 'auto',
    });
  }

  render() {
    const inlineHeight = {
      height: this.state.height,
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={styles.cardAnimationWrapper}
        style={inlineHeight}
        ref={ref => (this.ref = ref)}
        onClick={this.preventDefault}
      >
        {this.props.children}
      </div>
    );
  }
}
