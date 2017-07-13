import { EmojiProvider, ResourcedEmoji } from '@atlaskit/emoji';
import {
  akBorderRadius,
  akColorN30A,
  akColorN400,
  akColorB50,
  akColorB75,
  akColorN500,
} from '@atlaskit/util-shared-styles';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { style, keyframes } from 'typestyle';
import { ReactionSummary } from '../reactions-resource';
import { isLeftClick } from './helpers';
import { analyticsService } from '../analytics';
import ReactionTooltip from './reaction-tooltip';
import { SyntheticEvent } from 'react';

export const bouncingAnimation = keyframes({
  $debugName: 'bouncing',
  '0%': {
    transform: 'translateY(8px)',
    opacity: 0
  },
  '75%': {
    opacity: 1
  },
  '100%':  {
    transform: 'translateY(0)'
  },
});

const shakeAnimation = keyframes({
  $debugName: 'shake',
  '0%': {
    transform: 'rotateZ(0)',
  },
  '25%': {
    transform: 'rotateZ(5deg)',
  },
  '50%': {
    transform: 'rotateZ(0)',
  },
  '75%': {
    transform: 'rotateZ(-5deg)',
  },
  '100%': {
    transform: 'rotateZ(0)',
  },
});

const emojiStyle = style({
  transformOrigin: 'center center 0',
  $nest: {
    '&&> span': {
      display: 'inline-block',
      flex: 'auto',
      width: 'auto',
      minWidth: '24px',
      backgroundSize: '16px 16px',
      verticalAlign: 'middle',
      $nest: {
        '> span': {
          margin: '2px 4px',
          maxWidth: '16px',
          maxHeight: '16px'
        },
        '> img': {
          margin: '2px 4px',
          maxWidth: '16px',
          maxHeight: '16px'
        }
      }
    }
  }
});

const countStyle = style({
  flex: 'auto',
  fontSize: '12px',
  lineHeight: '24px',
  padding: '0 4px 0 0',
  minWidth: '12px',
  color: akColorN500,
  fontWeight: 600,
});

const reactionStyle = style({
  outline: 'none',
  display: 'flex',
  flexDirection: 'row',
  minWidth: '36px',
  height: '24px',
  lineHeight: '24px',
  background: 'transparent',
  border: '0',
  borderRadius: akBorderRadius,
  color: akColorN400,
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  $nest: {
    '&:hover': {
      background: akColorN30A,
      $nest: {
        '> .reaction-tooltip': {
          display: 'block'
        }
      }
    },
    '&.reacted': {

      background: akColorB50,
      $nest: {
        '&:hover': {
          background: akColorB75,
        }
      }
    },
    '&.bounce': {
      animation: `${bouncingAnimation} 200ms ease-in-out`,
    },
    '&.reaction-enter-active': {
      animation: `${bouncingAnimation} 200ms ease-in-out`,
    },
    '&.shake': {
      animation: `${shakeAnimation} 200ms infinite ease-in-out`
    }
  }
});

export interface ReactionOnClick {
  (emojiId: string, event?: SyntheticEvent<any>): void;
}

export interface Props {
  reaction: ReactionSummary;
  emojiProvider: Promise<EmojiProvider>;
  onClick: ReactionOnClick;
  onMouseOver?: (reaction: ReactionSummary, event?: SyntheticEvent<any>) => void;
}

export interface State {
  showTooltip: boolean;
  startBouncing: boolean;
  emojiName: string | undefined;
}

export default class Reaction extends PureComponent<Props, State> {
  private timeouts: Array<number>;
  private tooltipTimeout: number;

  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      startBouncing: false,
      emojiName: undefined,
    };

    this.timeouts = [];
  }

  componentWillMount() {
    this.props.emojiProvider.then((emojiResource) => {
      const emojiPromise = emojiResource.findByEmojiId({
        shortName: '',
        id: this.props.reaction.emojiId
      });

      if (emojiPromise) {
        emojiPromise.then(emoji => {
          if (emoji) {
            this.setState({
              emojiName: emoji.name
            });
          }
        });
      }
    });
    this.bounce();
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.reaction.reacted && nextProps.reaction.reacted && nextProps.reaction.count > 0) {
      this.bounce();
    }
  }

  private bounce = () => {
    this.setState({
      startBouncing: true
    });
    this.timeouts.push(setTimeout(() => this.setState({startBouncing: false}), 300));
  }

  private handleMouseDown = (event) => {
    event.preventDefault();
    if (this.props.onClick && isLeftClick(event)) {
      const { reaction } = this.props;
      analyticsService.trackEvent('reactions.reaction.click', reaction as {});

      if (!reaction.reacted || reaction.count > 1) {
        this.bounce();
      }

      this.props.onClick(this.props.reaction.emojiId, event);
    }
  }

  private handleMouseOver = (event) => {
    event.preventDefault();
    const { onMouseOver, reaction } = this.props;
    if (onMouseOver) {
      if (!reaction.users || !reaction.users.length) {
        onMouseOver(this.props.reaction, event);
      }

      this.tooltipTimeout = setTimeout(() => this.setState({
        showTooltip: true
      }), 500);
      this.timeouts.push(this.tooltipTimeout);
    }
  }

  private handleMouseOut = (event) => {
    event.preventDefault();

    if (this.props.onMouseOver) {
      clearTimeout(this.tooltipTimeout);
      this.setState({
        showTooltip: false
      });
    }
  }

  render() {
    const { emojiProvider, reaction } = this.props;
    const { emojiName, showTooltip } = this.state;

    const classNames = cx(reactionStyle, {
      'reacted': reaction.reacted,
      'bounce': this.state.startBouncing,
    });

    const { users } = reaction;

    const emojiId = { id: reaction.emojiId, shortName: '' };
    const tooltip = showTooltip && users && users.length ? <ReactionTooltip target={this} emojiName={emojiName} users={users} /> : null;

    return (
      <button
        className={classNames}
        onMouseUp={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {tooltip}
        <div className={emojiStyle}><ResourcedEmoji emojiProvider={emojiProvider} emojiId={emojiId} /></div>
        <div className={countStyle}>
          {reaction.count < 100 ? reaction.count : '99+'}
        </div>
      </button>
    );
  }

}
