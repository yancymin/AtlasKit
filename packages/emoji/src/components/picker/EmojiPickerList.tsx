import * as React from 'react';
import { MouseEvent, PureComponent } from 'react';
import * as classNames from 'classnames';
import * as uid from 'uid';
import { List as VirtualList } from 'react-virtualized/dist/commonjs/List';

import { customCategory } from '../../constants';
import { EmojiDescription, EmojiId, OnCategory, OnEmojiEvent } from '../../types';
import { sizes } from './EmojiPickerSizes';
import {
  CategoryHeadingItem,
  EmojisRowItem,
  LoadingItem,
  SearchItem,
  UploadPromptMessageItem,
  virtualItemRenderer,
  VirtualItem,
} from './EmojiPickerVirtualItems';
import * as Items from './EmojiPickerVirtualItems';
import * as styles from './styles';

const categoryClassname = 'emoji-category';

export interface OnSearch {
  (query: string): void;
}

export interface Props {
  emojis: EmojiDescription[];
  showCustomCategory?: boolean;
  showUploadOption?: boolean;
  onEmojiSelected?: OnEmojiEvent;
  onEmojiActive?: OnEmojiEvent;
  onCategoryActivated?: OnCategory;
  onOpenUpload?: () => void;
  selectedCategory?: string;
  selectedTone?: number;
  onSearch?: OnSearch;
  loading?: boolean;
  query?: string;
}

export interface State {
  scrollToIndex?: number;
}

interface EmojiGroup {
  emojis: EmojiDescription[];
  title: string;
  category: string;
}

const categoryDebounceWait = 100;

/**
 * Tracks which category is visible based on
 * scrollTop, and virtual rows.
 */
class CategoryTracker {
  private categoryToRow: Map<string, number>;
  private rowToCategory: Map<number, string>;

  constructor() {
    this.reset();
  }

  reset() {
    this.categoryToRow = new Map();
    this.rowToCategory = new Map();
  }

  add(category: string, row: number) {
    this.categoryToRow.set(category, row);
    this.rowToCategory.set(row, category);
  }

  getRow(category: string): number | undefined {
    return this.categoryToRow.get(category);
  }

  findNearestCategoryAbove(scrollTop: number, list: VirtualList): string | undefined {
    const rows = Array.from(this.rowToCategory.keys()).sort((a, b) => a - b);

    const firstOffset = list.getOffsetForRow({ index: rows[0] });
    if (firstOffset > scrollTop) {
      return undefined;
    }

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const offset = list.getOffsetForRow({ index: row });
      if (offset > scrollTop) {
        const prevRow = rows[i - 1];
        return this.rowToCategory.get(prevRow); // gone past, so previous offset
      }
    }

    const lastRow = rows[rows.length - 1];
    return this.rowToCategory.get(lastRow);
  }

}

export default class EmojiPickerVirtualList extends PureComponent<Props, State> {
  private idSuffix = uid();
  private allEmojiGroups: EmojiGroup[];
  private activeCategory: string | undefined | null;
  private virtualItems: VirtualItem<any>[] = [];
  private categoryTracker: CategoryTracker = new CategoryTracker();
  private categoryDebounce: number;
  private lastScrollTop: number;

  static defaultProps = {
    onEmojiSelected: () => {},
    onEmojiActive: () => {},
    onCategoryActivated: () => {},
    onSearch: () => {},
  };

  constructor(props) {
    super(props);

    let selectedEmoji = props.emojis[0];
    if (props.selectedCategory) {
      const emojiInCategory = props.emojis
        .filter(emoji => emoji.category === props.selectedCategory);
      if (emojiInCategory) {
        selectedEmoji = emojiInCategory[0];
      }
    }

    this.state = {};

    this.buildGroups(props.emojis);
    this.buildVirtualItems(props, this.state);
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.selectedCategory && nextProps.selectedCategory !== this.props.selectedCategory) {
      this.reveal(nextProps.selectedCategory);
    }
  }

  componentWillUpdate = (nextProps: Props, nextState: State) => {
    if (this.props.emojis !== nextProps.emojis ||
      this.props.selectedTone !== nextProps.selectedTone ||
      this.props.loading !== nextProps.loading ||
      this.props.query !== nextProps.query) {
        if (!nextProps.query) {
          // Only refresh if no query
          this.buildGroups(nextProps.emojis);
        }
        this.buildVirtualItems(nextProps, nextState);
    }
  }

  private onEmojiMouseEnter = (emojiId: EmojiId, emoji: EmojiDescription, event: MouseEvent<any>) => {
    if (this.props.onEmojiActive) {
      this.props.onEmojiActive(emojiId, emoji);
    }
  }

  private onSearch = (e) => {
    if (this.props.onSearch) {
      this.props.onSearch(e.target.value);
    }
  }

  /**
   * Scrolls to a category in the list view
   */
  reveal(category: string) {
    const row = this.categoryTracker.getRow(category);
    const list = this.refs.list as VirtualList;
    list.scrollToRow(row);
  }

  scrollToBottom() {
    const list = this.refs.list as VirtualList;
    list.scrollToRow(this.virtualItems.length);
  }

  private categoryId = category => `category_${category}_${this.idSuffix}`;

  private buildCategory = (group: EmojiGroup, showUploadPrompt: boolean): VirtualItem<any>[] => {
    const { onEmojiSelected, onOpenUpload } = this.props;
    const items: VirtualItem<any>[] = [];

    items.push(new CategoryHeadingItem({
      id: this.categoryId(group.category),
      title: group.title,
      className: categoryClassname,
    }));

    const showUploadButton = showUploadPrompt && group.emojis.length > 0;
    let showUploadButtonNow = false;
    let remainingEmojis = group.emojis;
    while (remainingEmojis.length > 0) {
      const rowEmojis = remainingEmojis.slice(0, sizes.emojiPerRow);
      remainingEmojis = remainingEmojis.slice(sizes.emojiPerRow);
      showUploadButtonNow = showUploadButton && rowEmojis.length < sizes.emojiPerRow;

      items.push(new EmojisRowItem({
        emojis: rowEmojis,
        onSelected: onEmojiSelected,
        onMouseMove: this.onEmojiMouseEnter,
        showUploadButton: showUploadButtonNow,
        onOpenUpload: onOpenUpload,
      }));
    }

    if (showUploadButton && !showUploadButtonNow) {
      // Upload button wasn't rendered (last row was full) add to new row
      items.push(new EmojisRowItem({
        emojis: [],
        showUploadButton: true,
        onOpenUpload: onOpenUpload,
      }));
    }

    // No emoji, but we want to show the upload prompt, show upload action in this case
    if (showUploadPrompt && !showUploadButton) {
      items.push(new UploadPromptMessageItem({
        onOpenUpload,
      }));
    }

    return items;
  }

  private buildVirtualItems = (props: Props, state: State): void => {
    const { emojis, loading, query, showCustomCategory, showUploadOption } = props;

    let items: Items.VirtualItem<any>[] = [];

    this.categoryTracker.reset();

    items.push(new SearchItem({
      onChange: this.onSearch,
      query,
    }));

    if (loading) {
      items.push(new LoadingItem());
    } else {
      if (query) {
        // Only a single "result" category
        items = [
          ...items,
          ...this.buildCategory({
            category: 'Search',
            title: 'Search results',
            emojis,
          }, !!showUploadOption),
        ];

      } else {
        // Group by category
        let customGroupRendered = false;
        // Not searching show in categories.
        this.allEmojiGroups.forEach((group) => {
          // Optimisation - avoid re-rendering unaffected groups for the current selectedShortcut
          // by not passing it to irrelevant groups
          let showUploadPrompt = false;
          if (group.category === customCategory) {
            customGroupRendered = true;
            showUploadPrompt = !!showUploadOption;
          }

          this.categoryTracker.add(group.category, items.length);

          items = [
            ...items,
            ...this.buildCategory(group, showUploadPrompt),
          ];
        });

        if (!customGroupRendered && (showUploadOption || showCustomCategory)) {
          // Custom group wasn't rendered, but upload is supports, so add
          // group with lone upload action

          items = [
            ...items,
            ...this.buildCategory({
              category: customCategory,
              title: customCategory,
              emojis: [],
            }, true),
          ];
        }
      }
    }

    const rowCountChanged = this.virtualItems.length !== items.length;

    this.virtualItems = items;

    const list = this.refs.list as VirtualList;

    if (!rowCountChanged && list) {
      // Row count has not changed, so need to tell list to rerender.
      list.forceUpdateGrid();
    }
  }

  private buildGroups = (emojis: EmojiDescription[]): void => {
    const existingCategories = new Map();

    let currentGroup;
    let currentCategory: string | undefined;

    const list: EmojiGroup[] = [];

    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];

      if (currentCategory !== emoji.category) {
        currentCategory = emoji.category;
        if (existingCategories.has(currentCategory)) {
          currentGroup = existingCategories.get(currentCategory);
        } else {
          currentGroup = {
            emojis: [],
            title: currentCategory,
            category: currentCategory,
          };
          existingCategories.set(currentCategory, currentGroup);
          list.push(currentGroup);
        }
      }
      currentGroup.emojis.push(emoji);
    }

    this.allEmojiGroups = list;
  }

  private checkCategoryChange = ({ scrollTop }) => {
    this.lastScrollTop = scrollTop;
    // debounce
    if (this.categoryDebounce) {
      return;
    }
    if (!this.props.query) {
      // Calculate category in view - only relevant if categories shown, i.e. no query
      this.categoryDebounce = setTimeout(() => {
        this.categoryDebounce = 0;
        const list = this.refs.list as VirtualList;
        const currentCategory = this.categoryTracker.findNearestCategoryAbove(this.lastScrollTop, list);

        if (currentCategory && this.activeCategory !== currentCategory) {
          this.activeCategory = currentCategory;
          if (this.props.onCategoryActivated) {
            this.props.onCategoryActivated(currentCategory);
          }
        }
      }, categoryDebounceWait);
    }
  }

  private rowSize = ({ index }) => this.virtualItems[index].height;
  private renderRow = (context) => virtualItemRenderer(this.virtualItems, context);

  render() {
    const classes = [styles.emojiPickerList];

    return (
      <div className={classNames(classes)}>
        <VirtualList
          ref="list"
          height={sizes.listHeight}
          onScroll={this.checkCategoryChange}
          overscanRowCount={5}
          rowCount={this.virtualItems.length}
          rowHeight={this.rowSize}
          rowRenderer={this.renderRow}
          scrollToAlignment="start"
          width={sizes.listWidth}
          className={styles.virtualList}
        />
      </div>
    );
  }
}
