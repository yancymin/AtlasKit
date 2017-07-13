import * as React from 'react';
import {AppCardModel, AppCardAction} from '../model';
import {HeaderView} from './HeaderView';
import {DescriptionView} from './DescriptionView';
import {DetailsView} from './DetailsView';
import {ContextView} from './ContextView';
import {ActionsView} from './ActionsView';
import {Card, Preview, CardContent, Footer} from '../styled/AppCardView';

const maxCardWidth = 744;
const previewWidth = 116;

export interface AppCardViewProps {
  model: AppCardModel;
  onClick?: () => void;
  onActionClick?: (action: AppCardAction) => void;
}

export class AppCardView extends React.Component<AppCardViewProps, {}> {

  static defaultProps = {
  };

  get isDarkAppearance() {
    const {model: {background}} = this.props;
    return Boolean(background);
  }

  get contentMaxWidth() {
    const {model: {preview}} = this.props;
    return preview ? maxCardWidth - previewWidth : maxCardWidth;
  }

  renderPreview() {
    const {model: {preview}} = this.props;
    if (!preview) {
      return null;
    }
    return <Preview image={preview.url}/>;
  }

  renderHeader() {
    const {model: {title: {text, user}, background, description, details, context, actions}} = this.props;
    return (
      <HeaderView
        title={text}
        user={user}
        isInversed={Boolean(background)}
        contentMaxWidth={this.contentMaxWidth}
        hasSiblings={Boolean(description || details || context || actions)}
      />
    );
  }

  renderDescription() {
    const {model: {description}} = this.props;
    if (!description) {
      return null;
    }
    return <DescriptionView title={description.title} text={description.text} contentMaxWidth={this.contentMaxWidth}/>;
  }

  renderDetails() {
    const {model: {details}} = this.props;
    if (!details) {
      return null;
    }
    return <DetailsView meta={details} isInversed={this.isDarkAppearance} contentMaxWidth={this.contentMaxWidth}/>;
  }

  renderContext() {
    const {model: {context}} = this.props;
    if (!context) {
      return null;
    }
    const {icon, text} = context;
    return (
      <ContextView
        icon={icon}
        text={text}
        isInversed={this.isDarkAppearance}
      />
    );
  }

  renderActions() {
    const {model: {actions}, onActionClick} = this.props;

    if (!actions) {
      return null;
    }

    return <ActionsView actions={actions} isInversed={this.isDarkAppearance} onActionClick={onActionClick}/>;
  }

  renderBody() {
    const {model: {description, details, context, actions}} = this.props;

    if (!description && !details && !context && !actions) {
      return null;
    }

    return (
      <div>
        {this.renderDescription()}
        {this.renderDetails()}
        {context || actions ? (
          <Footer>
            {this.renderContext()}
            {this.renderActions()}
          </Footer>
        ) : null}
      </div>
    );
  }

  render(): JSX.Element {
    const {model: {background, preview}, onClick} = this.props;
    return (
      <Card background={background && background.url} onClick={onClick}>
        {this.renderPreview()}
        <CardContent hasPreview={Boolean(preview)}>
          {this.renderHeader()}
          {this.renderBody()}
        </CardContent>
      </Card>
    );
  }

}
