import * as React from 'react';
import { PureComponent } from 'react';
import AdvancedIcon from '@atlaskit/icon/glyph/editor/advanced';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import { analyticsService } from '../../analytics';
import { TextFormattingState } from '../../plugins/text-formatting';
import { ClearFormattingState } from '../../plugins/clear-formatting';
import ToolbarButton from '../ToolbarButton';
import { toggleStrikethrough, clearFormatting, tooltip } from '../../keymaps';
import { TriggerWrapper, ExpandIconWrapper } from './styles';
import { EditorView } from '../../prosemirror';
import DropdownMenu from '../DropdownMenu';

export interface Props {
  isDisabled?: boolean;
  editorView: EditorView;
  softBlurEditor: () => void;
  focusEditor: () => void;
  pluginStateTextFormatting?: TextFormattingState | undefined;
  pluginStateClearFormatting?: ClearFormattingState | undefined;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  isOpen?: boolean;
  strikethroughActive?: boolean;
  strikethroughDisabled?: boolean;
  strikeHidden?: boolean;
  subscriptActive?: boolean;
  subscriptDisabled?: boolean;
  subscriptHidden?: boolean;
  superscriptActive?: boolean;
  superscriptDisabled?: boolean;
  superscriptHidden?: boolean;
  clearFormattingDisabled?: boolean;
}

export default class ToolbarAdvancedTextFormatting extends PureComponent<Props, State> {
  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;
    if (pluginStateTextFormatting) {
      pluginStateTextFormatting.subscribe(this.handlePluginStateTextFormattingChange);
    }
    if (pluginStateClearFormatting) {
      pluginStateClearFormatting.subscribe(this.handlePluginStateClearFormattingChange);
    }
  }

  componentWillUmount() {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;
    if (pluginStateTextFormatting) {
      pluginStateTextFormatting.unsubscribe(this.handlePluginStateTextFormattingChange);
    }
    if (pluginStateClearFormatting) {
      pluginStateClearFormatting.unsubscribe(this.handlePluginStateClearFormattingChange);
    }
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
      isOpen: attrs.isOpen,
    });
  }

  private handleTriggerClick = () => {
    this.onOpenChange({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      isOpen,
      strikethroughActive,
      strikethroughDisabled,
      clearFormattingDisabled,
    } = this.state;
    const { popupsMountPoint, popupsBoundariesElement } = this.props;
    const items = this.createItems();
    const toolbarButtonFactory = (disabled: boolean) => (
      <ToolbarButton
        selected={isOpen || strikethroughActive}
        disabled={disabled}
        onClick={this.handleTriggerClick}
        iconBefore={
          <TriggerWrapper>
            <AdvancedIcon label="Open or close advance text formatting dropdown"/>
            <ExpandIconWrapper>
              <ExpandIcon label="Open or close advance text formatting dropdown" />
            </ExpandIconWrapper>
          </TriggerWrapper>}
      />
    );

    if (!this.props.isDisabled &&
      !(strikethroughDisabled && clearFormattingDisabled) &&
      items[0].items.length > 0) {
      return (
        <DropdownMenu
          items={items}
          onItemActivated={this.onItemActivated}
          onOpenChange={this.onOpenChange}
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          isOpen={isOpen}
          fitHeight={188}
          fitWidth={136}
        >
          {toolbarButtonFactory(false)}
        </DropdownMenu>
      );
    } else {
      return (
        <div>{toolbarButtonFactory(true)}</div>
      );
    }
  }

  private createItems = () => {
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;
    let items: any[] = [];

    if (pluginStateTextFormatting) {
      const { strikeHidden, subscriptHidden, superscriptHidden } = this.state;
      if (!strikeHidden) {
        this.addRecordToItems(items, 'Strikethrough', 'strikethrough', tooltip(toggleStrikethrough));
      }
      if (!subscriptHidden) {
        this.addRecordToItems(items, 'Subscript', 'subscript', 'Toggle subscript');
      }
      if (!superscriptHidden) {
        this.addRecordToItems(items, 'Superscript', 'superscript', 'Toggle superscript');
      }
    }
    if (pluginStateClearFormatting) {
      this.addRecordToItems(items, 'Clear Formatting', 'clear', tooltip(clearFormatting));
    }
    return [{
      items,
    }];
  }

  private addRecordToItems = (items, content, value, tooltipDescription) => {
    items.push({
      content,
      value,
      isActive: this.state[`${value}Active`],
      isDisabled: this.state[`${value}Disabled`],
      tooltipDescription,
      tooltipPosition: 'right',
    });
  }

  private handlePluginStateTextFormattingChange = (pluginState: TextFormattingState) => {
    this.setState({
      strikethroughActive: pluginState.strikeActive,
      strikethroughDisabled: pluginState.strikeDisabled,
      strikeHidden: pluginState.strikeHidden,

      subscriptActive: pluginState.subscriptActive,
      subscriptDisabled: pluginState.subscriptDisabled,
      subscriptHidden: pluginState.subscriptHidden,

      superscriptActive: pluginState.superscriptActive,
      superscriptDisabled: pluginState.superscriptDisabled,
      superscriptHidden: pluginState.superscriptHidden,
    });
  }

  private handlePluginStateClearFormattingChange = (pluginState: ClearFormattingState) => {
    this.setState({
      clearFormattingDisabled: !pluginState.formattingIsPresent,
    });
  }

  private onItemActivated = ({ item }) => {
    analyticsService.trackEvent(`atlassian.editor.format.${item.value}.button`);
    const { pluginStateTextFormatting, pluginStateClearFormatting } = this.props;
    switch(item.value) {
      case 'strikethrough':
        pluginStateTextFormatting!.toggleStrike(this.props.editorView);
        break;
      case 'subscript':
        pluginStateTextFormatting!.toggleSubscript(this.props.editorView);
        break;
      case 'superscript':
        pluginStateTextFormatting!.toggleSuperscript(this.props.editorView);
        break;
      case 'clear':
        pluginStateClearFormatting!.clearFormatting(this.props.editorView);
        break;
    }
  }
}
