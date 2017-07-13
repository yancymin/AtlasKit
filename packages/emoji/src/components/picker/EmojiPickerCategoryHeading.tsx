import * as React from 'react';
import { PureComponent } from 'react';
import * as classnames from 'classnames';

import * as styles from './styles';

export interface Props {
  id?: string;
  title?: string;
  className?: string;
}

export default class EmojiPickerCategoryHeading extends PureComponent<Props, {}> {

  render() {
    const { id, title, className } = this.props;

    return (
      <div
        id={id}
        data-category-id={title}
        className={classnames(className)}
      >
        <div className={styles.emojiCategoryTitle} >
          {title}
        </div>
      </div>
    );
  }

}
