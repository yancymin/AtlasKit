import * as React from 'react';
import { MouseEvent } from '@types/react';
import { PureComponent } from 'react';

import { MentionListStyle } from './styles';
import MentionListError from '../MentionListError';
import MentionItem from '../MentionItem';
import Scrollable from '../Scrollable';
import { MentionDescription, OnMentionEvent } from '../../types';
import debug from '../../util/logger';
import { mouseLocation, actualMouseMove, Position } from '../../util/mouse';

function wrapIndex(mentions: MentionDescription[], index: number): number {
  const len = mentions.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
}

function getKey(index: number, mentions?: MentionDescription[]): string | undefined {
  return mentions && mentions[index] && mentions[index].id;
}

function getIndex(key: string, mentions?: MentionDescription[]): number | undefined {
  let index: number | undefined;
  if (mentions) {
    index = 0;
    while (index < mentions.length && mentions[index].id !== key) {
      index++;
    }
    if (index === mentions.length) {
      index = undefined;
    }
  }
  return index;
}

export interface Props {
  mentions: MentionDescription[];
  resourceError?: Error;
  onSelection?: OnMentionEvent;
}

export interface State {
  selectedKey?: string;
  selectedIndex: number;
}

export interface Items {
  [index: string]: MentionItem;
}

export default class MentionList extends PureComponent<Props, State> {
  private lastMousePosition: Position | undefined;
  private scrollable: Scrollable;
  private items: Items;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedKey: getKey(0, props.mentions),
      selectedIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    // adjust selection
    const { mentions } = nextProps;
    const { selectedKey } = this.state;
    if (mentions) {
      if (!selectedKey) {
        this.selectIndexNewMentions(0, mentions);
        return;
      }
      for (let i = 0; i < mentions.length; i++) {
        if (selectedKey === mentions[i].id) {
          this.setState({
            selectedIndex: i,
          });
          return;
        }
      }
      // existing selection not in results, pick first
      this.selectIndexNewMentions(0, mentions);
    }
  }

  componentDidUpdate() {
    const { mentions } = this.props;
    const { selectedIndex } = this.state;
    if (mentions && mentions[selectedIndex]) {
      this.revealItem(mentions[selectedIndex].id);
    }
    // FIXME - a React version of this _may_ be required for Confluence
    // integration tests. Will remove / fix once known
    // emit(elem, mentionListRenderedEvent);
  }

  // API
  selectNext = () => {
    const newIndex = wrapIndex(this.props.mentions, this.state.selectedIndex + 1);
    this.selectIndex(newIndex);
  }

  selectPrevious = () => {
    const newIndex = wrapIndex(this.props.mentions, this.state.selectedIndex - 1);
    this.selectIndex(newIndex);
  }

  selectIndex = (index: number, callback?: () => any): void => {
    const { mentions } = this.props;
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(index, mentions),
    }, callback);
  }

  selectId = (id: string, callback?: () => any): void => {
    const { mentions } = this.props;
    const index = getIndex(id, mentions);
    if (index !== undefined) {
      this.setState({
        selectedIndex: index,
        selectedKey: id,
      }, callback);
    }
  }

  chooseCurrentSelection = () => {
    const { mentions, onSelection } = this.props;
    const { selectedIndex } = this.state;
    const selectedMention = mentions && mentions[selectedIndex || 0];
    debug('ak-mention-list.chooseCurrentSelection', selectedMention);
    if (onSelection && selectedMention) {
      onSelection(selectedMention);
    }
  }

  mentionsCount = (): number => {
    const { mentions } = this.props;
    return mentions && mentions.length || 0;
  }

  // Internal
  private revealItem(key: string): void {
    const item = this.items[key];
    if (item && this.scrollable) {
      this.scrollable.reveal(item);
    }
  }

  private selectIndexNewMentions(index: number, mentions: MentionDescription[]): void {
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(index, mentions),
    });
  }

  private selectIndexOnHover = (mention: MentionDescription, event: MouseEvent<any>) => {
    const mousePosition = mouseLocation(event);
    if (actualMouseMove(this.lastMousePosition, mousePosition)) {
      this.selectId(mention.id);
    }
    this.lastMousePosition = mousePosition;
  }

  private itemSelected = (mention: MentionDescription) => {
    this.selectId(mention.id, () => {
      this.chooseCurrentSelection();
    });
  }

  private renderItems(): JSX.Element | null {
    const { mentions } = this.props;
    const { selectedKey } = this.state;

    if (mentions && mentions.length) {
      this.items = {};

      return (
        <div>
          {mentions.map((mention, idx) => {
            const selected = selectedKey === mention.id;
            const key = mention.id;
            const item = (
              <MentionItem
                mention={mention}
                selected={selected}
                key={key}
                onMouseMove={this.selectIndexOnHover}
                /* Cannot use onclick, as onblur will close the element, and prevent
                 * onClick from firing.
                 */
                onSelection={this.itemSelected}
                // tslint:disable-next-line:jsx-no-lambda
                ref={(ref) => {
                  if (ref) {
                    this.items[key] = ref;
                  } else {
                    delete this.items[key];
                  }
                }}
              />
            );
            return item;
          })}
        </div>
      );
    }
    return null;
  }

  private handleScrollableRef = (ref) => {
    this.scrollable = ref;
  }

  render() {
    const { mentions, resourceError } = this.props;
    const hasMentions = mentions && mentions.length;

    // If we get an error, but existing mentions are displayed, lets
    // just continue to show the existing mentions we have
    const mustShowError = resourceError && !hasMentions;

    let errorSection: JSX.Element | undefined;
    let resultSection: JSX.Element | undefined;
    if (mustShowError) {
      errorSection = (<MentionListError error={resourceError} />);
    } else if (hasMentions) {
      resultSection = (
        <Scrollable ref={this.handleScrollableRef}>
          {this.renderItems()}
        </Scrollable>
      );
    }

    return (
      <MentionListStyle empty={!hasMentions && !resourceError}>
        {errorSection}
        {resultSection}
      </MentionListStyle>
    );
  }
}
