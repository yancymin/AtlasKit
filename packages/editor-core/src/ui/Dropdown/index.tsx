import * as React from 'react';
import { PureComponent } from 'react';
import DropdownList from '@atlaskit/droplist';
import Popup from '../Popup';

export interface Props {
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
  trigger: React.ReactElement<any>;
  isOpen?: boolean;
  onOpenChange?: (attrs) => void;
  fitWidth?: number;
  fitHeight?: number;
}

export interface State {
  target?: HTMLElement;
  popupPlacement: [string, string];
}

/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * droplist outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default class Dropdown extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      popupPlacement: ['bottom', 'left']
    };
  }

  private handleRef = (target) => {
    this.setState({ target });
  }

  private updatePopupPlacement = (placement) => {
    this.setState({ popupPlacement: placement });
  }

  private renderDropdown() {
    const { target, popupPlacement } = this.state;
    const { children, mountTo, boundariesElement, onOpenChange, fitHeight, fitWidth } = this.props;

    return (
      <Popup
        target={target}
        mountTo={mountTo}
        boundariesElement={boundariesElement}
        onPlacementChanged={this.updatePopupPlacement}
        fitHeight={fitHeight}
        fitWidth={fitWidth}
      >
        <div style={{ height: 0, minWidth: fitWidth || 0 }}>
          <DropdownList
            isOpen={true}
            onOpenChange={onOpenChange}
            appearance="tall"
            position={popupPlacement.join(' ')}
            shouldFlip={false}
            shouldFitContainer={true}
          >
            {children}
          </DropdownList>
        </div>
      </Popup>
    );
  }

  render() {
    const { trigger, isOpen } = this.props;

    return (
      <div>
        <div ref={this.handleRef}>{trigger}</div>
        {isOpen ? this.renderDropdown() : null}
      </div>
    );
  }
}
