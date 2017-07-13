import * as React from 'react';
import { ReactNode } from 'react';

import Spinner from '@atlaskit/spinner';

import * as styles from './styles';
import { sizes } from './EmojiPickerSizes';

import EmojiPickerListSearch, { Props as SearchProps } from './EmojiPickerListSearch';
import EmojiPickerEmojiRow, { Props as EmojiRowProps } from './EmojiPickerEmojiRow';
import EmojiPickerCategoryHeading, { Props as CategoryHeadingProps } from './EmojiPickerCategoryHeading';
import { UploadPromptMessage, Props as UploadPromptProps } from './EmojiPickerUploadPrompts';

export interface RenderItem {
  (context?: VirtualRenderContext): ReactNode;
}

export interface VirtualItem<P> {
  height: number;
  props: P;
  renderItem: RenderItem;
}

export abstract class AbstractItem<P> implements VirtualItem<P> {
  readonly height: number;
  readonly props: P;

  constructor(props: P, height: number) {
    this.props = props;
    this.height = height;
  }

  abstract renderItem: RenderItem;
}

export class SearchItem extends AbstractItem<SearchProps> {
  constructor(props: SearchProps) {
    super(props, sizes.searchHeight);
  }

  renderItem = () => (
    <EmojiPickerListSearch {...this.props} />
  )
}

export class EmojisRowItem extends AbstractItem<EmojiRowProps> {
  constructor(props: EmojiRowProps) {
    super(props, sizes.emojiRowHeight);
  }

  renderItem = (context?: VirtualRenderContext) => (
    <EmojiPickerEmojiRow {...this.props} />
  )
}

export class LoadingItem extends AbstractItem<{}> {
  constructor() {
    super({}, sizes.loadingRowHeight);
  }

  renderItem = () => (
    <div className={styles.emojiPickerSpinner}>
      <div>
        <Spinner size="medium" />
      </div>
    </div>
  )
}

export class CategoryHeadingItem extends AbstractItem<CategoryHeadingProps> {
  constructor(props: CategoryHeadingProps) {
    super(props, sizes.categoryHeadingHeight);
  }

  renderItem = () => (
    <EmojiPickerCategoryHeading {...this.props} />
  )
}

export class UploadPromptMessageItem extends AbstractItem<UploadPromptProps> {
  constructor(props: UploadPromptProps) {
    super(props, sizes.uploadActionHeight);
  }

  renderItem = () => (
    <UploadPromptMessage {...this.props} />
  )
}

/**
 * These are the values provided by react-virtualized.
 */
export interface VirtualRenderContext {
  index;       // Index of row
  isScrolling; // The List is currently being scrolled
  isVisible;   // This row is visible within the List (eg it is not an overscanned row)
  key;         // Unique key within array of rendered rows
  parent;      // Reference to the parent List (instance)
  style;       // Style object to be applied to row (to position it);
               // This must be passed through to the rendered row element.
}

export const virtualItemRenderer = (rows: VirtualItem<any>[], context: VirtualRenderContext) => {
  const { index, key, style } = context;
  const row: VirtualItem<any> = rows[index];

  return (
    <div style={style} key={key}>
      {row.renderItem(context)}
    </div>
  );
};
