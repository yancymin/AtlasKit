import * as React from 'react';
import { PureComponent } from 'react';
import DropdownMenu from '@atlaskit/dropdown-menu';
import Popup from '../Popup';

export interface Props {
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
  isOpen?: boolean;
  onOpenChange?: (attrs) => void;
  onItemActivated?: (attrs) => void;
  fitWidth?: number;
  fitHeight?: number;
  items: Array<Object>;
}

export interface State {
  target?: HTMLElement;
  popupPlacement: [string, string];
}

/**
 * Wrapper around @atlaskit/dropdown-menu which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default class DropdownMenuWrapper extends PureComponent<Props, State> {
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

  private renderDropdownMenu() {
    const { target, popupPlacement } = this.state;
    const { items, mountTo, boundariesElement, onOpenChange, onItemActivated, fitHeight, fitWidth } = this.props;

    return (
      <Popup
        target={target}
        mountTo={mountTo}
        boundariesElement={boundariesElement}
        onPlacementChanged={this.updatePopupPlacement}
        fitHeight={fitHeight}
        fitWidth={fitWidth}
      >
        <DropdownMenu
          defaultOpen={true}
          onOpenChange={onOpenChange}
          onItemActivated={onItemActivated}
          appearance="tall"
          position={popupPlacement.join(' ')}
          shouldFlip={false}
          shouldFitContainer={true}
          isTriggerNotTabbable={true}
          items={items}
        >
          <div style={{ height: 0, minWidth: fitWidth || 0 }} />
        </DropdownMenu>
      </Popup>
    );
  }

  render() {
    const { children, isOpen } = this.props;

    return (
      <div>
        <div ref={this.handleRef}>{children}</div>
        {isOpen ? this.renderDropdownMenu() : null}
      </div>
    );
  }
}
