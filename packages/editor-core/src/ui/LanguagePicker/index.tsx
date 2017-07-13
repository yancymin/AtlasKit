import Select from '@atlaskit/single-select';
import * as React from 'react';
import { PureComponent } from 'react';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';

import { CodeBlockState } from '../../plugins/code-block';
import { EditorView } from '../../prosemirror';
import ToolbarButton from '../ToolbarButton';
import { FloatingToolbar } from './styles';

import {
  createLanguageList,
  filterSupportedLanguages,
  findMatchedLanguage,
} from './languageList';

export interface Props {
  editorView: EditorView;
  pluginState: CodeBlockState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export interface State {
  active?: boolean;
  element?: HTMLElement;
  language?: string;
  supportedLanguages?: object[];
  toolbarVisible?: boolean;
  isLanguageSelectOpen?: boolean;
  languageSelectFocused?: boolean;
}

export default class LanguagePicker extends PureComponent<Props, State> {
  items: object[];

  constructor (props) {
    super(props);

    this.state = {
      language: undefined,
      toolbarVisible: false,
      supportedLanguages: filterSupportedLanguages(props.pluginState.supportedLanguages)
    } as State;
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
    const { supportedLanguages } = this.state;

    this.items = [{
      'items': createLanguageList(supportedLanguages).map((language) => ({ content: language, value: language }))
    }];
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  onLanguageSelectMouseDown = (event) => {
    event.preventDefault();
    this.setState({
      languageSelectFocused: true,
    });
  }

  resetLanguageSelectFocused = (event) => {
    this.setState({
      languageSelectFocused: false,
    });
  }

  render() {
    const {
      language,
      element,
      toolbarVisible,
      languageSelectFocused
    } = this.state;

    const { popupsMountPoint, popupsBoundariesElement } = this.props;

    if (toolbarVisible || languageSelectFocused) {
      return (
        <FloatingToolbar
          target={element}
          offset={[0, 3]}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
          fitHeight={40}
        >
          <div
            tabIndex={0}
            onMouseDown={this.onLanguageSelectMouseDown}
            onBlur={this.resetLanguageSelectFocused}
          >
            <Select
              id="test"
              hasAutocomplete={true}
              shouldFocus={languageSelectFocused}
              items={this.items}
              onSelected={this.handleLanguageChange}
              defaultSelected={{ content: language, value: language }}
              placeholder="Select language"
            />
            <ToolbarButton
              onClick={this.handleRemoveCodeBlock}
              iconBefore={<RemoveIcon label="Reset block type" />}
            />
          </div>
        </FloatingToolbar>
      );
    }

    return null;
  }

  private handlePluginStateChange = (pluginState: CodeBlockState) => {
    const { element, language, toolbarVisible } = pluginState;
    const { supportedLanguages } = this.state;

    const updatedLanguage = findMatchedLanguage(supportedLanguages!, language);

    this.setState({
      language: updatedLanguage,
      element,
      toolbarVisible,
    });

    if (language !== updatedLanguage) {
      this.props.pluginState.updateLanguage(updatedLanguage, this.props.editorView);
    }
  }

  private handleLanguageChange = (language: any) => {
    this.props.pluginState.updateLanguage(language.item.value, this.props.editorView);
    this.setState({
      toolbarVisible: true,
    });
  }

  private handleRemoveCodeBlock = () => {
    this.props.pluginState.removeCodeBlock(this.props.editorView);
  }
}
