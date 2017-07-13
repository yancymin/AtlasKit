/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { LazyLoadCard } from '../../root/card/styled';

export interface LazyContentProps {
  placeholder?: JSX.Element;
  children?: any;

  [propName: string]: any;
}

export interface LazyContentState {
  isVisible: boolean;
}

export class LazyContent extends Component<LazyContentProps, LazyContentState> {
  constructor(props: LazyContentProps) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  private onContentVisible = () => {
    this.setState({
      isVisible: true
    });
  }

  render() {
    const {children, placeholder, ...otherProps} = this.props;
    const {isVisible} = this.state;

    return (
      <div>
        <LazyLoadCard
          {...otherProps}
          throttle={150}
          onContentVisible={this.onContentVisible}
          wrapperClassName="filmtrip-list-wrapper"
        >
          {children}
        </LazyLoadCard>
        {!isVisible && placeholder}
      </div>
    );
  }
}
