import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PureComponent } from 'react';

export interface Props {
  mountTo?: HTMLElement;
}

export default class Portal extends PureComponent<Props, any> {
  target?: HTMLElement;

  private renderPortalContent(children) {
    return (
      <div>{children}</div>
    );
  }

  private renderPortal(props) {
    if (!props.mountTo) {
      return;
    }

    if (!this.target) {
      this.target = document.createElement('div');
      props.mountTo.appendChild(this.target);
    }

    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.renderPortalContent(props.children),
      this.target
    );
  }

  componentWillUnmount() {
    // Asynchronously unmounts subtree, otherwise there might be errors when child component calls setState,
    // but it has already been unmounted by Portal.
    setTimeout(() => {
      if (this.target && this.target.parentElement) {
        ReactDOM.unmountComponentAtNode(this.target);
        this.target.parentElement.removeChild(this.target);
      }
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps);
  }

  componentDidMount() {
    this.renderPortal(this.props);
  }

  render() {
    if (!this.props.mountTo) {
      return this.renderPortalContent(this.props.children);
    }

    return null;
  }
}
