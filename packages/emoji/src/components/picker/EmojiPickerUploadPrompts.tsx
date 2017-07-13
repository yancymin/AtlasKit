import * as React from 'react';
import * as classnames from 'classnames';
import AkButton from '@atlaskit/button';

import { akColorB300 } from '@atlaskit/util-shared-styles';

import * as styles from './styles';

export const addEmojiClassName = 'emoji-picker-add-emoji';

export interface Props {
  onOpenUpload?: () => void;
}

// tslint:disable-next-line:variable-name
export const UploadPromptButton = (props: Props) => {
  const addButtonClassNames = classnames([
    styles.addEmoji,
    addEmojiClassName,
  ]);

  return (
    <button className={addButtonClassNames} onClick={props.onOpenUpload}>
      <svg viewBox={`0 0 30 30`} xmlns="http://www.w3.org/2000/svg" width="28px" height="28px">
        <line x1="15" y1="10" x2="15" y2="20" stroke={akColorB300} strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="15" x2="20" y2="15" stroke={akColorB300} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
};

// tslint:disable-next-line:variable-name
export const UploadPromptMessage = (props: Props) => (
  <AkButton
    className={addEmojiClassName}
    appearance="link"
    onClick={props.onOpenUpload}
  >
    Add your own custom emoji
  </AkButton>
);
