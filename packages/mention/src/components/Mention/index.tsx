import * as React from 'react';
import { PureComponent, SyntheticEvent } from 'react';
import { MentionStyle, MentionContainer } from './styles';
import Tooltip from '@atlaskit/tooltip';
import { isRestricted, MentionType } from '../../types';

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;

export interface Props {
  id: string;
  text: string;
  isHighlighted?: boolean;
  accessLevel?: string;
  onClick?: MentionEventHandler;
  onMouseEnter?: MentionEventHandler;
  onMouseLeave?: MentionEventHandler;
}

export default class Mention extends PureComponent<Props, {}> {

  private handleOnClick = (e: SyntheticEvent<HTMLSpanElement>) => {
    const { id, text, onClick } = this.props;
    if (onClick) {
      onClick(id, text, e);
    }
  }

  private handleOnMouseEnter = (e: SyntheticEvent<HTMLSpanElement>) => {
    const { id, text, onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter(id, text, e);
    }
  }

  private handleOnMouseLeave = (e: SyntheticEvent<HTMLSpanElement>) => {
    const { id, text, onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave(id, text, e);
    }
  }

  private getMentionType = (): MentionType => {
    const { accessLevel, isHighlighted } = this.props;
    if (isHighlighted) {
      return MentionType.SELF;
    }
    if (isRestricted(accessLevel)) {
      return MentionType.RESTRICTED;
    }
    return MentionType.DEFAULT;
  }

  render() {
    const {
      handleOnClick,
      handleOnMouseEnter,
      handleOnMouseLeave,
      props,
    } = this;
    const { text } = props;
    const mentionType: MentionType = this.getMentionType();

    const mentionComponent = (
      <MentionStyle
        mentionType={mentionType}
        onClick={handleOnClick}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {text}
      </MentionStyle>
    );

    return (
      <MentionContainer>
        { mentionType === MentionType.RESTRICTED ?
          <Tooltip
              description={`${props.text} won't be notified as they have no access`}
              position="right"
          >
          {mentionComponent}
          </Tooltip>
          :
          mentionComponent }
      </MentionContainer>
    );
  }
}
