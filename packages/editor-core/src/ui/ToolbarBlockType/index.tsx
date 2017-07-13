import * as React from 'react';
import { PureComponent } from 'react';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import ToolbarButton from '../ToolbarButton';
import { analyticsService as analytics } from '../../analytics';
import { BlockTypeState, GroupedBlockTypes } from '../../plugins/block-type';
import { BlockType } from '../../plugins/block-type/types';
import { findKeymapByDescription, tooltip } from '../../keymaps';
import { EditorView } from '../../prosemirror';
import DropdownMenu from '../DropdownMenu';
import { ButtonContent, ExpandIconWrapper } from './styles';

export interface Props {
  isDisabled?: boolean;
  editorView: EditorView;
  pluginState: BlockTypeState;
  softBlurEditor: () => void;
  focusEditor: () => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  active: boolean;
  availableBlockTypes: GroupedBlockTypes;
  currentBlockType: BlockType;
}

export default class ToolbarBlockType extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { pluginState } = props;

    this.state = {
      active: false,
      availableBlockTypes: pluginState.availableBlockTypes,
      currentBlockType: pluginState.currentBlockType,
    };
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private onOpenChange = (attrs: any) => {
    // Hack for IE needed to prevent caret blinking above the opened dropdown.
    if (attrs.isOpen) {
      const { $from } = this.props.editorView.state.selection;
      const node = $from.node($from.depth);
      if (!(node && node.attrs['isCodeMirror'])) {
        this.props.softBlurEditor();
      }
    } else {
      const { $from } = this.props.editorView.state.selection;
      const node = $from.node($from.depth);
      if (!(node && node.attrs['isCodeMirror'])) {
        this.props.focusEditor();
      }
    }

    this.setState({
      active: attrs.isOpen,
    });
  }

  render() {
    const { active, currentBlockType } = this.state;
    const { popupsMountPoint, popupsBoundariesElement } = this.props;

    const toolbarButtonFactory = (disabled: boolean) => (
      <ToolbarButton
        selected={active}
        disabled={disabled}
        onClick={this.handleTriggerClick}
        iconAfter={
          <ExpandIconWrapper>
            <ExpandIcon label="Change formatting" />
          </ExpandIconWrapper>
        }
      >
        <ButtonContent>{currentBlockType.title}</ButtonContent>
      </ToolbarButton>
    );

    if (!this.props.isDisabled) {
      const items = this.createItems();
      return (
        <DropdownMenu
          items={items}
          onOpenChange={this.onOpenChange}
          onItemActivated={this.handleSelectBlockType}
          isOpen={active}
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          fitHeight={360}
          fitWidth={106}
        >
          {toolbarButtonFactory(false)}
        </DropdownMenu>
      );
    }

    return (
      <span>{toolbarButtonFactory(true)}</span>
    );

  }

  private handleTriggerClick = () => {
    this.onOpenChange({ isOpen: !this.state.active });
  }

  private createItems = () => {
    const { currentBlockType, availableBlockTypes } = this.state;
    let items: any[] = [];
    availableBlockTypes.forEach((blockTypeGroup, groupNo) => {
      blockTypeGroup.forEach((blockType, blockTypeNo) => {
        items.push({
          content: blockType.title,
          value: blockType,
          isActive: (currentBlockType === blockType),
          tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
          tooltipPosition: 'right',
        });
      });
    });
    return [{
      items,
    }];
  }

  private handlePluginStateChange = (pluginState: BlockTypeState) => {
    this.setState({
      active: this.state.active,
      availableBlockTypes: pluginState.availableBlockTypes,
      currentBlockType: pluginState.currentBlockType,
    });
  }

  private handleSelectBlockType = ({ item }) => {
    this.props.focusEditor();
    const blockType = item.value;
    const { availableBlockTypes } = this.state;
    this.props.pluginState.toggleBlockType(blockType.name, this.props.editorView);
    this.setState({
      active: false,
      availableBlockTypes,
      currentBlockType: blockType
    });

    analytics.trackEvent(`atlassian.editor.format.${blockType.name}.button`);
  }
}
