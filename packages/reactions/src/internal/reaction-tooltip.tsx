import {
  akBorderRadius,
  akColorN900,
} from '@atlaskit/util-shared-styles';
import * as cx from 'classnames';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PureComponent } from 'react';
import { style, keyframes } from 'typestyle';
import { User } from '../reactions-resource';

const animateDown = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(0)',
    animationTimingFunction: 'cubic-bezier(0.23830050393398, 0, 0.25586732616931, 0.79011192334632)'
  },
  '20%': {
    opacity: .8,
    transform: 'translateY(8px)',
    animationTimingFunction: 'cubic-bezier(0.21787238302442, 0.98324004924648, 0.58694150667646, 1)'
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(10px)'
  },
});

const animateUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(0)',
    animationTimingFunction: 'cubic-bezier(0.23830050393398, 0, 0.25586732616931, 0.79011192334632)'
  },
  '20%': {
    opacity: .8,
    transform: 'translateY(-8px)',
    animationTimingFunction: 'cubic-bezier(0.21787238302442, 0.98324004924648, 0.58694150667646, 1)'
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(-10px)'
  },
});

const tooltip = style({
  position: 'fixed',
  background: akColorN900,
  boxSizing: 'border-box',
  color: '#fff',
  padding: '5px',
  borderRadius: akBorderRadius,
  maxWidth: '150px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  $nest: {
    'ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      textAlign: 'left',
    },
    'li': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginTop: 0,
      fontWeight: 600,
    },
    'li:first-child': {
      textTransform: 'capitalize',
      fontWeight: 800,
    },
    '&.animateDown': {
      transform: 'translateY(10px)',
      animation: `${animateDown} 1.1s 200ms backwards`,
    },
    '&.animateUp': {
      transform: 'translateY(-10px)',
      animation: `${animateUp} 1.1s 200ms backwards`,
    },
  }
});

export interface TooltipProps {
  target: any;
  users: User[];
  emojiName: string | undefined;
}

export default class ReactionTooltip extends PureComponent<TooltipProps, { animateDown: boolean }> {

  constructor(props) {
    super(props);
    this.state = {
      animateDown: true
    };
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  private updatePosition() {
    const target = ReactDOM.findDOMNode(this.props.target);
    const popup = ReactDOM.findDOMNode<HTMLElement>(this);

    const targetRect = target.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    const bounding = document.body.getBoundingClientRect();

    let top = targetRect.top + targetRect.height;

    if (top + popupRect.height > bounding.bottom) {
      top = targetRect.top - popupRect.height;
      this.setState({
        animateDown: false
      });
    }

    popup.style.left = `${targetRect.left}px`;
    popup.style.top = `${top}px`;
  }

  render() {
    const { emojiName, users } = this.props;
    const classNames = cx(tooltip, 'reaction-tooltip', {
      animateDown: this.state.animateDown,
      animateUp: !this.state.animateDown,
    });

    const overflowCount = users.length - 10;
    const overflowLabel = overflowCount > 0 ? <li>+{overflowCount}...</li> : null;

    return (
      <span className={classNames}>
        <ul>
        {emojiName ? <li>{emojiName}</li> : null}
        {
          users.slice(0, 9).map((user, index) => {
            return <li key={index}>{user.displayName}</li>;
          })
        }
        {overflowLabel}
        </ul>
      </span>
    );
  }
}
