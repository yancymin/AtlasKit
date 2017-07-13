import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';

import styles from './styles/profilecard.less';

import LoadingMessage from './components/LoadingMessage';
import ErrorMessage from './components/ErrorMessage';
import HeightTransitionWrapper from './components/HeightTransitionWrapper';

import IconLabel from './components/IconLabel';
import presences from './internal/presences';

export default class Profilecard extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string,
    meta: PropTypes.string,
    nickname: PropTypes.string,
    location: PropTypes.string,
    timestring: PropTypes.string,
    presence: PropTypes.oneOf(Object.keys(presences)),
    actions: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.function,
      id: PropTypes.string,
      label: PropTypes.string,
    })),
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    clientFetchProfile: PropTypes.func,
    analytics: PropTypes.func,
  }

  static defaultProps = {
    presence: 'none',
    actions: [],
    isLoading: false,
    hasError: false,
    analytics: () => {},
  }

  constructor(options) {
    super(options);

    this._timeOpen = null;

    this.clientFetchProfile = (...args) => {
      this.props.analytics('profileCard.reload', {});
      this.props.clientFetchProfile(...args);
    };
  }

  componentDidMount() {
    this._timeOpen = Date.now();
    this.props.analytics('profileCard.view', {});
  }

  _durationSince = (from) => {
    const fromParsed = parseInt(from, 10) || 0;
    return fromParsed > 0 ? Date.now() - fromParsed : null;
  }

  renderActionsButtons() {
    if (this.props.actions.length === 0) {
      return null;
    }

    return (
      <div className={styles.actionsWrapper}>
        {(this.props.actions).map((action, idx) => (
          <AkButton
            appearance={idx === 0 ? 'default' : 'subtle'}
            compact
            key={action.label}
            onClick={(...args) => {
              this.props.analytics('profileCard.click', {
                id: action.id || null,
                duration: this._durationSince(this._timeOpen),
              });
              action.callback(...args);
            }}
          >{action.label}</AkButton>
        ))}
      </div>
    );
  }

  renderErrorMessage() {
    return (<ErrorMessage
      reload={this.props.clientFetchProfile && this.clientFetchProfile}
    />);
  }

  renderProfilecard() {
    const cardClasses = classNames([
      styles.profilecard,
      { [styles.noDetailsMeta]: !this.props.meta },
    ]);

    this.props.analytics('profileCard.loaded', {
      duration: this._durationSince(this._timeOpen),
    });

    return (
      <div className={cardClasses}>
        <div className={styles.avatarWrapper}>
          <AkAvatar size="xlarge" src={this.props.avatarUrl} />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detailsGroup}>
            <span className={styles.detailsFullname}>{this.props.fullName}</span>
            { this.props.meta && (<span className={styles.detailsMeta}>{this.props.meta}</span>) }
            <IconLabel className={styles.presence} icon={this.props.presence}>
              {presences[this.props.presence]}
            </IconLabel>
            <IconLabel icon="mention">{this.props.nickname && `@${this.props.nickname}`}</IconLabel>
            <IconLabel icon="time">{this.props.timestring}</IconLabel>
            <IconLabel icon="location">{this.props.location}</IconLabel>
          </div>
          <div className={styles.actionsFlexSpacer} />
          {this.renderActionsButtons()}
        </div>
      </div>
    );
  }

  render() {
    let cardContent = null;

    if (this.props.hasError) {
      this.props.analytics('profileCard.error', {});

      cardContent = this.renderErrorMessage();
    } else if (this.props.isLoading) {
      cardContent = <LoadingMessage />;
    } else if (this.props.fullName) {
      cardContent = this.renderProfilecard();
    }

    return (
      <HeightTransitionWrapper>
        {cardContent}
      </HeightTransitionWrapper>
    );
  }
}
