import sample from 'lodash.sample';
import React from 'react';

import styles from './styles.less';

class AnimationDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleAnimation = this.toggleAnimation.bind(this);
  }

  componentDidMount() {
    this.startAnimating();
    this.checkbox.checked = true;
  }

  componentWillUnmount() {
    this.stopAnimating();
  }

  randomIcon() {
    const Icon = sample(this.props.components);
    return <Icon.component label="Random icon" />;
  }

  startAnimating() {
    this.timer = setInterval(() => this.forceUpdate(), 300);
  }

  stopAnimating() {
    clearInterval(this.timer);
  }

  toggleAnimation(e) {
    if (e.target.checked) {
      this.startAnimating();
    } else {
      this.stopAnimating();
    }
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          id="animate"
          onChange={this.toggleAnimation}
          ref={elem => (this.checkbox = elem)}
        /> <label htmlFor="animate">Animate</label>
        <hr />
        <div className={styles.container}>
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
          {this.randomIcon()}
        </div>
      </div>
    );
  }
}
AnimationDemo.displayName = 'AnimationDemo';
AnimationDemo.propTypes = {
  components: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default AnimationDemo;
