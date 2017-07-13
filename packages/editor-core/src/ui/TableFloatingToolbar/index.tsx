import * as React from 'react';
import { PureComponent } from 'react';
import { TableState } from '../../plugins/table';
import { EditorView, CellSelection } from '../../prosemirror';
import ToolbarButton from '../ToolbarButton';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import Popup from '../Popup';
import { Toolbar } from './styles';
import DropdownMenu from '../DropdownMenu';
import { cut, copy, paste } from '../../keymaps';
import AdvanceMenuItem from './AdvanceMenuItem';
import { getShortcut } from './utils';

export interface Props {
  editorView: EditorView;
  pluginState: TableState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  cellElement?: HTMLElement;
  cellSelection?: CellSelection;
  isOpen?: boolean;
  cutDisabled: boolean;
  copyDisabled: boolean;
  pasteDisabled: boolean;
}

export default class TableFloatingToolbar extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
    cutDisabled: false,
    copyDisabled: false,
    pasteDisabled: false,
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  componentDidUpdate() {
    if (!this.state.cellElement) {
      this.handleOpenChange({ isOpen: false });
    }
  }

  render() {
    const { cellElement, isOpen } = this.state;
    const { popupsMountPoint, popupsBoundariesElement } = this.props;
    const items = this.createItems();

    if (cellElement) {
      return (
        <Popup
          target={cellElement}
          offset={[0, 3]}
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          alignY="top"
        >
          <Toolbar>
            <ToolbarButton
              onClick={this.handleRemove}
              iconBefore={<RemoveIcon label="Remove selected cells" />}
            />
            {items[0].items.length > 0 &&
              <DropdownMenu
                items={items}
                isOpen={isOpen}
                onOpenChange={this.handleOpenChange}
                onItemActivated={this.onItemActivated}
                mountTo={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                fitHeight={188}
                fitWidth={136}
              >
                <ToolbarButton
                  selected={isOpen}
                  onClick={this.toggleAdvancedMenu}
                  iconBefore={<EditorMoreIcon label="Open or close advance menu" />}
                />
              </DropdownMenu>
            }
          </Toolbar>
        </Popup>
      );
    }

    return null;
  }

  private toggleAdvancedMenu = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen });
  }

  private handleOpenChange = ({ isOpen }) => {
    this.setState({ isOpen });
  }

  private createItems = () => {
    const items: any[] = [];
    this.addRecordToItems(items, 'Cut', getShortcut(cut));
    this.addRecordToItems(items, 'Copy', getShortcut(copy));
    this.addRecordToItems(items, 'Paste', getShortcut(paste));
    return [{ items }];
  }

  private addRecordToItems = (items, content, shortcut?) => {
    const value = content.toLowerCase();
    items.push({
      content: <AdvanceMenuItem content={content} elemAfter={shortcut} />,
      isDisabled: this.state[`${value}Disabled`],
      value,
    });
  }

  private onItemActivated = ({ item }) => {
    switch(item.value) {
      case 'cut':
        this.props.pluginState.cut();
        break;
      case 'copy':
        this.props.pluginState.copy();
        break;
      case 'paste':
        this.props.pluginState.paste();
        break;
    }
  }

  private handlePluginStateChange = (pluginState: TableState) => {
    const { cellElement, cellSelection } = pluginState;
    this.setState({ cellElement, cellSelection });
  }

  private handleRemove = () => {
    this.props.pluginState.remove();
  }
}
