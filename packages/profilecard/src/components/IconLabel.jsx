import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import EditorLocationIcon from '@atlaskit/icon/glyph/editor/location';
import EditorRecentIcon from '@atlaskit/icon/glyph/editor/recent';
import EditorMentionIcon from '@atlaskit/icon/glyph/editor/mention';
import { Presence } from '@atlaskit/avatar';

import styles from '../styles/profilecard.less';

const icons = {
  location: EditorLocationIcon,
  time: EditorRecentIcon,
  mention: EditorMentionIcon,
  available: () => <Presence presence="online" />,
  unavailable: () => <Presence presence="offline" />,
  busy: () => <Presence presence="busy" />,
};

export default class IconLabel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
  }

  render() {
    if (!this.props.children) { return null; }

    const IconElement = icons[this.props.icon];
    const displayIcon = IconElement ? <IconElement label={`icon ${this.props.icon}`} /> : null;

    const classes = classNames({
      [styles.detailsLabel]: true,
      [this.props.className]: this.props.className,
    });

    return (
      <div className={classes}>
        <div className={styles.detailsLabelIcon}>
          {displayIcon}
        </div>
        <span className={styles.label}>{this.props.children}</span>
      </div>
    );
  }
}
