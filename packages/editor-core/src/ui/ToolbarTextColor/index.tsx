import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EditorView, PluginKey } from '../../prosemirror';
import { TextColorState } from '../../plugins/text-color';
import ToolbarButton from '../ToolbarButton';
import Icon from '@atlaskit/icon/lib/Icon';
import ExpandIcon from '@atlaskit/icon/glyph/editor/expand';
import TextColorIcon from '@atlaskit/icon/glyph/editor/text-color';
import ColorPalette from './ColorPalette';
import { ExpandIconWrap, TriggerWrapper } from './styles';
import Dropdown from '../Dropdown';

export interface Props {
  editorView: EditorView;
  pluginState: TextColorState;
  softBlurEditor: () => void;
  focusEditor: () => void;
  disabled?: boolean;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  disabled?: boolean;
  isOpen: boolean;
  color?: string;
}

export const stateKey = new PluginKey('textColorPlugin');

export default class ToolbarTextColor extends PureComponent<Props, State> {
  state: State = {
    isOpen: false
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { disabled, isOpen, color } = this.state;
    const { popupsMountPoint, popupsBoundariesElement } = this.props;

    return (
      <Dropdown
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        isOpen={isOpen && !disabled && !this.props.disabled}
        onOpenChange={this.handleOpenChange}
        fitWidth={210}
        fitHeight={80}
        trigger={
          <ToolbarButton
            disabled={disabled || this.props.disabled}
            selected={isOpen}
            title="Text color"
            onClick={this.toggleOpen}
            iconBefore={
              <TriggerWrapper>
                <Icon
                  primaryColor={this.getIconColor()}
                  label="Text color"
                  glyph={TextColorIcon}
                />
                <ExpandIconWrap>
                  <ExpandIcon label="expand-dropdown-menu" />
                </ExpandIconWrap>
              </TriggerWrapper>}
          />
        }
      >
        <ColorPalette
          palette={this.props.pluginState.palette}
          onClick={this.toggleTextColor}
          selectedColor={color}
        />
      </Dropdown>
    );
  }

  @analytics('atlassian.editor.format.textcolor.button')
  private toggleTextColor = (color) => {
    const { pluginState, editorView } = this.props;
    if (!this.state.disabled) {
      this.toggleOpen();
      if (color === pluginState.defaultColor) {
        return pluginState.removeTextColor(editorView.state, editorView.dispatch);
      }
      return pluginState.toggleTextColor(editorView.state, editorView.dispatch, color);
    }
    return false;
  }

  private toggleOpen = () => {
    this.handleOpenChange({ isOpen: !this.state.isOpen });
  }

  private handleOpenChange = ({isOpen}) => {
   if (!isOpen) {
      const { $from } = this.props.editorView.state.selection;
      const node = $from.node($from.depth);
      if (!(node && node.attrs['isCodeMirror'])) {
        this.props.focusEditor();
      }
    } else {
      const { $from } = this.props.editorView.state.selection;
      const node = $from.node($from.depth);
      if (!(node && node.attrs['isCodeMirror'])) {
        this.props.softBlurEditor();
      }
    }

    this.setState({ isOpen });
  }

  private handlePluginStateChange = (pluginState: TextColorState) => {
    const { color, disabled } = pluginState;
    this.setState({ color, disabled });
  }

  private getIconColor = (): string | undefined => {
    const { isOpen, color } = this.state;
    const isDefaultColor = this.props.pluginState.defaultColor === color;
    return isOpen || isDefaultColor ? undefined : color;
  }
}
