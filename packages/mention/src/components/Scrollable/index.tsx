import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { findDOMNode } from 'react-dom';
import { ScrollableStyle } from './styles';

export interface Props {
  children?: ReactNode | ReactNode[];
}

export default class Scrollable extends PureComponent<Props, undefined> {
  private scrollableDiv: Element;

  // API
  reveal = (child) => {
    if (child && this.scrollableDiv) {
      const childNode = findDOMNode(child);
      // Not using Element.scrollIntoView as it scrolls even to top/bottom of view even if
      // already visible
      const scrollableRect = this.scrollableDiv.getBoundingClientRect();
      const elementRect = childNode.getBoundingClientRect();
      if (elementRect.top < scrollableRect.top) {
        this.scrollableDiv.scrollTop += (elementRect.top - scrollableRect.top);
      } else if (elementRect.bottom > scrollableRect.bottom) {
        this.scrollableDiv.scrollTop += (elementRect.bottom - scrollableRect.bottom);
      }
    }
  }

  private handleRef = (ref) => {
    this.scrollableDiv = ref;
  }

  render() {
    return (
      <ScrollableStyle innerRef={this.handleRef}>
        {this.props.children}
      </ScrollableStyle>
    );
  }
}
