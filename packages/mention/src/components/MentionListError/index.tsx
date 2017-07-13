import * as React from 'react';
import { PureComponent } from 'react';
import { MentionListErrorStyle, MentionListErrorHeadlineStyle, MentionListAdviceStyle } from './styles';
import { HttpError } from '../../api/MentionResource';
import { GenericErrorIllustration } from './GenericErrorIllustration';

export interface Props {
  error?: Error;
}

const defaultHeadline = 'Something went wrong';
const defaultSecondary = 'Try again in a few seconds';

type ErrorMessage = {
  headline: string,
  advisedAction: string
};


export default class MentionListError extends PureComponent<Props, {}> {

  /**
   * Translate the supplied Error into a message suitable for display in the MentionList.
   *
   * @param error the error to be displayed
   */
  private static prepareError(error: Error | undefined): ErrorMessage {
    const errorMessage = {
      headline: defaultHeadline,
      advisedAction: defaultSecondary
    };

    if (error instanceof HttpError) {
      const httpError = error as HttpError;

      if (httpError.statusCode === 401) {
        errorMessage.advisedAction = 'Try logging out then in again';
      }

      if (httpError.statusCode === 403) {
        errorMessage.advisedAction = 'Try entering different text';
      }
    }

    return errorMessage;
  }

  render() {
    const { error } = this.props;
    const errorMessage = MentionListError.prepareError(error);

    return <MentionListErrorStyle>
      <GenericErrorIllustration/>
      <MentionListErrorHeadlineStyle>{errorMessage.headline}</MentionListErrorHeadlineStyle>
      <MentionListAdviceStyle>{errorMessage.advisedAction}</MentionListAdviceStyle>
    </MentionListErrorStyle>;
  }
}

