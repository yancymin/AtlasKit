/* tslint:disable:variable-name */
import * as React from 'react';
import Ellipsify from '../../utils/ellipsify';
import {Wrapper} from '../styled/DescriptionView';

export interface DescriptionViewProps {
  text: string;
  title?: string;
  contentMaxWidth: number;
}

export class DescriptionView extends React.Component<DescriptionViewProps, {}> {

  renderTitle() {
    const {title} = this.props;
    if (!title) {
      return null;
    }
    return <b>{title}: </b>;
  }

  renderText() {
    const {text} = this.props;
    if (!text) {
      return null;
    }
    return <Ellipsify lines={2} text={text} inline={true}/>;
  }

  render(): JSX.Element {
    const {contentMaxWidth} = this.props;
    return (
      <Wrapper contentMaxWidth={contentMaxWidth}>
        {this.renderTitle()}
        {this.renderText()}
      </Wrapper>
    );
  }

}
