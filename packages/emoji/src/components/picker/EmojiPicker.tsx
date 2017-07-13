import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';

import { customCategory } from '../../constants';
import { AvailableCategories, EmojiDescription, EmojiId, EmojiUpload, OnEmojiEvent } from '../../types';
import { containsEmojiId, isEmojiIdEqual, isEmojiLoaded } from '../../type-helpers';
import debug from '../../util/logger';
import CategorySelector from './CategorySelector';
import EmojiPickerList from './EmojiPickerList';
import EmojiPickerFooter from './EmojiPickerFooter';
import { EmojiSearchResult } from '../../api/EmojiRepository';
import { EmojiProvider, OnEmojiProviderChange, supportsUploadFeature } from '../../api/EmojiResource';

export interface PickerRefHandler {
  (ref: any): any;
}

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
  onSelection?: OnEmojiEvent;
  onPickerRef?: PickerRefHandler;
}

export interface State {
  filteredEmojis: EmojiDescription[];
  selectedEmoji?: EmojiDescription;
  activeCategory?: string;
  selectedCategory?: string;
  selectedTone?: number;
  availableCategories?: AvailableCategories;
  query: string;
  uploadErrorMessage?: string;
  uploadSupported: boolean;
  uploading: boolean;
  // the picker is considered loaded when at least 1 set of emojis have loaded
  loading: boolean;
}

export default class EmojiPicker extends PureComponent<Props, State> {

  static defaultProps = {
    onSelection: () => {},
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      filteredEmojis: [],
      query: '',
      loading: true,
      uploadSupported: false,
      uploading: false,
    };

  }

  componentDidMount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then(provider => {
        provider.subscribe(this.onProviderChange);
        this.onSearch(this.state.query);
        if (supportsUploadFeature(provider)) {
          provider.isUploadSupported().then(this.onUploadSupported);
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then(provider => {
        provider.unsubscribe(this.onProviderChange);
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const prevEmojiProvider = this.props.emojiProvider;
    const nextEmojiProvider = nextProps.emojiProvider;
    if (prevEmojiProvider !== nextEmojiProvider) {
      if (prevEmojiProvider) {
        prevEmojiProvider.then(provider => {
          provider.unsubscribe(this.onProviderChange);
        });
      }
      if (nextEmojiProvider) {
        nextEmojiProvider.then(provider => {
          provider.subscribe(this.onProviderChange);
          this.onSearch(this.state.query);
          if (supportsUploadFeature(provider)) {
            provider.isUploadSupported().then(this.onUploadSupported);
          }
        });
      }
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.uploading && this.state.uploading !== prevState.uploading) {
      // Showing upload panel, ensure custom category in view due to increased height
      this.scrollToEndOfList();
    }
  }

  onEmojiActive = (emojiId: EmojiId, emoji: EmojiDescription) => {
    if (this.state.selectedEmoji !== emoji) {
      this.setState({
        selectedEmoji: emoji,
      } as State);
    }
  }

  onCategoryActivated = (category: string) => {
    if (this.state.activeCategory !== category) {
      this.setState({
        activeCategory: category,
      } as State);
    }
  }

  onCategorySelected = (categoryId: string) => {
    this.props.emojiProvider.then(provider => {
      provider.findInCategory(categoryId).then(emojisInCategory => {
        const { availableCategories } = this.state;
        if (availableCategories && availableCategories[categoryId]) {
          const selectedEmoji = emojisInCategory[0];
          this.setState({
            activeCategory: categoryId,
            selectedCategory: categoryId,
            selectedEmoji,
          } as State);

          this.loadEmoji(provider, selectedEmoji);
        }
      });
    });
  }

  /**
   * If a media emoji, loads it and updates the selectedEmoji
   */
  private loadEmoji = (provider: EmojiProvider, selectedEmoji?: EmojiDescription) => {
      if (selectedEmoji && !isEmojiLoaded(selectedEmoji)) {
        provider.findByEmojiId(selectedEmoji).then(loadedEmoji => {
          const latestSelectedEmoji = this.state.selectedEmoji;
          if (loadedEmoji && (!latestSelectedEmoji ||isEmojiIdEqual(latestSelectedEmoji, loadedEmoji))) {
            // Emoji is still selected, update
            this.setState({
              selectedEmoji: loadedEmoji,
            });
          }
        });
      }
  }

  private onUploadSupported = (supported: boolean) => {
    this.setState({
      uploadSupported: supported,
    });
  }

  private onSearch = (query) => {
    this.setState({
      query
    });
    this.props.emojiProvider.then(provider => {
      provider.filter(query, {
        skinTone: this.state.selectedTone,
      });
    });
  }

  private onSearchResult = (searchResults: EmojiSearchResult): void => {
    const filteredEmojis = searchResults.emojis;

    // Only enable categories for full emoji list (non-search)
    const availableCategories = searchResults.query ? [] : searchResults.categories;
    const query = searchResults.query;

    let selectedEmoji;
    let activeCategory;
    if (containsEmojiId(filteredEmojis, this.state.selectedEmoji)) {
      // Keep existing emoji selected if still in results
      selectedEmoji = this.state.selectedEmoji;
      activeCategory = this.state.activeCategory;
    } else {
      selectedEmoji = undefined;
      // Only enable categories for full emoji list (non-search)
      activeCategory = undefined;
    }

    this.setState({
      filteredEmojis,
      selectedEmoji,
      activeCategory,
      availableCategories,
      query,
      loading: false,
    } as State);
  }

  private onProviderChange: OnEmojiProviderChange = {
    result: this.onSearchResult,
  };

  private onToneSelected = (toneValue?: number) => {
    this.setState({
      selectedTone: toneValue,
    } as State);
  }

  private onOpenUpload = () => {
    // Prime upload token so it's ready when the user adds
    const { emojiProvider } = this.props;
    emojiProvider.then(provider => {
      if (supportsUploadFeature(provider)) {
        provider.prepareForUpload();
      }
    });

    this.setState({
      uploadErrorMessage: undefined,
      uploading: true,
    });
  }

  private onUploadEmoji = (upload: EmojiUpload) => {
    const { emojiProvider } = this.props;
    this.setState({
      uploadErrorMessage: undefined, // clear previous errors
    });
    emojiProvider.then(provider => {
      if (provider && supportsUploadFeature(provider)) {
        provider.uploadCustomEmoji(upload).then(emojiDescription => {
          this.setState({
            activeCategory: customCategory,
            selectedCategory: customCategory,
            selectedEmoji: emojiDescription,
            uploading: false,
          });
          this.loadEmoji(provider, emojiDescription);
          this.scrollToEndOfList();
        }).catch(error => {
          this.setState({
            uploadErrorMessage: 'Unable to upload',
          });
          debug('Unable to upload emoji', error);
        });
      }
    });
  }

  private scrollToEndOfList = () => {
    const emojiPickerList = this.refs.emojiPickerList as EmojiPickerList;
    if (emojiPickerList) {
      // Wait a tick to ensure repaint and updated height for picker list
      setTimeout(() => {
        emojiPickerList.scrollToBottom();
      }, 0);
    }
  }

  private onUploadCancelled = () => {
    this.setState({
      uploading: false,
      uploadErrorMessage: undefined,
    });
  }

  private handlePickerRef = (ref: any) => {
    if (this.props.onPickerRef) {
      this.props.onPickerRef(ref);
    }
  }

  render() {
    const { onSelection } = this.props;
    const {
      activeCategory,
      availableCategories,
      filteredEmojis,
      loading,
      query,
      selectedCategory,
      selectedEmoji,
      selectedTone,
      uploading,
      uploadErrorMessage,
      uploadSupported,
    } = this.state;
    const classes = [styles.emojiPicker];

    const picker = (
      <div className={classNames(classes)} ref={this.handlePickerRef}>
        <CategorySelector
          activeCategoryId={activeCategory}
          onCategorySelected={this.onCategorySelected}
          availableCategories={availableCategories}
        />
        <EmojiPickerList
          emojis={filteredEmojis}
          selectedCategory={selectedCategory}
          onEmojiSelected={onSelection}
          onEmojiActive={this.onEmojiActive}
          onCategoryActivated={this.onCategoryActivated}
          onOpenUpload={this.onOpenUpload}
          onSearch={this.onSearch}
          query={query}
          selectedTone={selectedTone}
          loading={loading}
          showCustomCategory={uploadSupported}
          showUploadOption={uploadSupported && !uploading}
          ref="emojiPickerList"
        />
        <EmojiPickerFooter
          initialUploadName={query}
          selectedEmoji={selectedEmoji}
          selectedTone={selectedTone}
          onToneSelected={this.onToneSelected}
          uploading={uploading}
          uploadErrorMessage={uploadErrorMessage}
          onUploadEmoji={this.onUploadEmoji}
          onUploadCancelled={this.onUploadCancelled}
        />
      </div>
    );

    return picker;
  }
}
