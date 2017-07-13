import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import * as React from 'react';
import { PureComponent } from 'react';
import { HyperlinkState } from '../../plugins/hyperlink';
import FloatingToolbar from '../FloatingToolbar';
import PanelTextInput from '../PanelTextInput';
import ToolbarButton from '../ToolbarButton';
import { Seperator, Container } from './styles';
import { EditorView } from '../../prosemirror';
import { normalizeUrl } from '../../plugins/hyperlink/utils';

const TEXT_NODE = 3;

export interface Props {
  pluginState: HyperlinkState;
  editorView: EditorView;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  target?: HTMLElement;
  activeElement?: HTMLElement;
  // URL of the hyperlink. The presence of this attribute causes an "open"
  // hyperlink to be rendered in the popup.
  href?: string;
  text?: string;
  oldText?: string;
  // Href before editing
  oldHref?: string;
  // Surprisingly not all hyperlinks can be unlinked. For example when the
  // storage format is Markdown, you can't represent some a URL as plain text
  // using standard markdown syntax alone.
  unlinkable?: boolean;
  textInputPlaceholder?: string;
  textInputValue?: string;
  editorFocused?: boolean;
  inputActive?: boolean;
  active?: boolean;
  showToolbarPanel?: boolean;
}

export default class HyperlinkEdit extends PureComponent<Props, State> {

  state: State = {
    unlinkable: true,
    editorFocused: false,
    inputActive: false,
    active: false,
    showToolbarPanel: false,
  };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  setInputActive = () => {
    this.setState({
      inputActive: true,
    });
  }

  resetInputActive = () => {
    this.setState({
      inputActive: false,
    });
  }

  private getOffsetParent() {
    const popupTarget = this.getPopupTarget();
    return this.props.popupsMountPoint
      ? this.props.popupsMountPoint.offsetParent
      : popupTarget && popupTarget.offsetParent;
  }

  private getPopupTarget(): HTMLElement | undefined {
    const { target, activeElement } = this.state;
    let popupTarget = target;

    if (!popupTarget && activeElement) {
      popupTarget = activeElement.nodeType === TEXT_NODE
        ? activeElement.parentElement as HTMLElement
        : activeElement;
    }

    return popupTarget;
  }

  /**
   * Dynamic offsets for hyperlink editing popup
   * because we need to show it next to cursor even without clear target for popup.
   */
  private adjustPosition = (position) => {
    const { pluginState } = this.props;
    if (!pluginState.active) {

      const offsetParent = this.getOffsetParent();

      if (!offsetParent) {
        return position;
      }

      const coordinates = pluginState.getCoordinates(this.props.editorView, offsetParent);

      if (position.left) {
        position.left = coordinates.left;
      }

      if (position.top) {
        position.top = coordinates.top;
      }

      if (position.bottom) {
        position.bottom = coordinates.bottom;
      }

      if (position.right) {
        position.right = coordinates.right;
      }
    }
    return position;
  }

  render() {
    const { href, oldHref, text, oldText, unlinkable, active,
      editorFocused, inputActive, showToolbarPanel
    } = this.state;
    const normalizedOldText = oldText && normalizeUrl(oldText);

    const popupTarget = this.getPopupTarget();

    if (!popupTarget) {
      return null;
    }

    if ((active || showToolbarPanel) && (editorFocused || inputActive)) {
      const showOpenButton = !!oldHref;
      const showUnlinkButton = unlinkable && active && oldHref;

      return (
        <FloatingToolbar
          target={popupTarget}
          offset={[0, 3]}
          fitWidth={230}
          onPositionCalculated={this.adjustPosition}
          popupsMountPoint={this.props.popupsMountPoint}
          popupsBoundariesElement={this.props.popupsBoundariesElement}
        >
          <Container>
            {!showOpenButton ? null :
              <ToolbarButton
                href={href}
                target="_blank"
                theme="dark"
                title="Open link in new tab"
              >
                <OpenIcon label="Open link" />
              </ToolbarButton>
            }
            {!showOpenButton ? null :
              <Seperator />
            }
            {!showUnlinkButton ? null :
              <ToolbarButton
                theme="dark"
                title="Unlink"
                onClick={this.handleUnlink}
              >
                <UnlinkIcon label="Unlink" />
              </ToolbarButton>
            }
            {!showUnlinkButton ? null :
              <Seperator />
            }
            {normalizedOldText && href === normalizedOldText ?
              <PanelTextInput
                placeholder="Text to display"
                defaultValue={!text && href === normalizedOldText ? '' : text}
                onSubmit={this.updateLinkText}
                onChange={this.updateText}
                onMouseDown={this.setInputActive}
                onBlur={this.handleOnBlur}
              /> :
              <PanelTextInput
                placeholder="Paste link"
                autoFocus={!href || href.length === 0}
                defaultValue={href}
                onSubmit={this.updateLinkHref}
                onChange={this.updateHref}
                onMouseDown={this.setInputActive}
                onBlur={this.handleOnBlur}
              />}
          </Container>
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  // ED-1323 `onBlur` covers all the use cases (click outside, tab, etc) for this issue
  private handleOnBlur = () => {
    const { editorView, pluginState } = this.props;
    const { href = '' } = this.state;
    if (editorView.state.selection.empty && !pluginState.active) {
      pluginState.hideLinkPanel();
    } else if (!href || href.length === 0) {
      pluginState.removeLink(editorView);
    } else {
      pluginState.updateLink({ href }, editorView);
    }
    this.resetInputActive();
  }

  private handleUnlink = () => {
    this.props.pluginState.removeLink(this.props.editorView);
  }

  private handlePluginStateChange = (pluginState: HyperlinkState) => {
    const { inputActive } = this.state;
    const hrefNotPreset = pluginState.active && (!pluginState.href || pluginState.href.length === 0);

    this.setState({
      active: pluginState.active,
      target: pluginState.element,
      activeElement: pluginState.activeElement,
      href: pluginState.href,
      oldText: pluginState.text,
      oldHref: pluginState.href,
      textInputValue: pluginState.text,
      editorFocused: pluginState.editorFocused,
      inputActive: hrefNotPreset || inputActive,
      showToolbarPanel: pluginState.showToolbarPanel,
    });
  }

  private updateHref = (href: string) => {
    this.setState({ href });
  }

  private updateText = (text: string) => {
    this.setState({ text });
  }

  private updateLinkText = (text: string) => {
    if (text && text.length > 0 && text !== this.state.oldText) {
      const { editorView, pluginState } = this.props;
      pluginState.updateLinkText(text, editorView);
      this.setState({ text: '' });
    }
  }

  private updateLinkHref = (href: string) => {
    const { editorView, pluginState } = this.props;
    if (this.state.oldHref) {
      pluginState.updateLink({ href }, editorView);
    } else {
      pluginState.addLink({ href }, editorView);
    }
    editorView.focus();
  }
}
