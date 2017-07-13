import * as React from 'react';
import { PureComponent } from 'react';
import * as styles from './styles';

export interface Props {
  audienceName?: string;
  onTextClicked?: () => void;
}

export interface State {}

export default class ComponentTemplate extends PureComponent<Props, State> {
  static defaultProps = {
    audienceName: 'world',
    onTextClicked: () => {},
  };

  render() {
    return (
      <button
        className={styles.root}
        onClick={this.props.onTextClicked}
      >
        Hello {this.props.audienceName}!
      </button>
    );
  }
}
