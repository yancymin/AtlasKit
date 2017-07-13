// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from '../../src/';
import QuoteItem from './quote-item';
import QuoteDescription from './quote-description';
import QuoteList from './quote-list';
import QuoteTracker from './quote-tracker';
import data from './quotes';
import { colors, grid, borderRadius } from './constants';
import type { Quote } from './types';
import type { DropResult, DraggableLocation, DraggableId } from '../../src/types';

const Root = styled.div`
  background-color: ${colors.blue};
  padding: ${grid * 2}px;
  min-height: 100vh;
  margin-left: ${grid * 2}px;

  /* flexbox */
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Details = styled.div`
  background-color: white;
  border-radius: ${borderRadius}px;
  padding: ${grid}px;
  margin-left: ${grid * 2}px;
  width: 400px;
`;

const Divider = styled.hr`
  color: lightgrey;
  margin-top: ${grid * 2}px;
  margin-bottom: ${grid * 2}px;
`;

type State = {|
  dragging: ?DropResult,
  quotes: Quote[],
  history: DropResult[],
|}

export default class QuoteApp extends Component {
  state: State

  state: State = {
    dragging: null,
    quotes: data,
    history: [],
  }

  onDragStart = (id: DraggableId, location: DraggableLocation) => {
    const dragging: DropResult = {
      draggableId: id,
      source: location,
      destination: null,
    };

    this.setState({
      dragging,
    });
  }

  onDragEnd = (result: DropResult) => {
    const source: DraggableLocation = result.source;
    const destination: ?DraggableLocation = result.destination;
    const history: DropResult[] = this.state.history.slice(0);
    history.push(result);

    // nothing to do here!
    if (destination == null) {
      this.setState({
        history,
        dragging: null,
      });
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      console.error('unsupported use case');
      return;
    }

    const quotes: Quote[] = [...this.state.quotes];
    const target: ?Quote = quotes.find(
      (quote: Quote): boolean => quote.id === result.draggableId
    );

    if (!target) {
      console.error('cannot find quote in list');
      return;
    }

    // remove target from the array
    quotes.splice(source.index, 1);

    // put into correct spot
    quotes.splice(destination.index, 0, target);

    this.setState({
      quotes,
      history,
      dragging: null,
    });
  }

  render() {
    const { dragging, history, quotes } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Root>
          <QuoteList listId="list">
            {quotes.map((quote: Quote) => (
              <QuoteItem
                quote={quote}
                key={quote.id}
              />
          ))}
          </QuoteList>
          <Details>
            <QuoteDescription />
            <Divider />
            <QuoteTracker
              current={dragging}
              history={history}
            />
          </Details>
        </Root>
      </DragDropContext>
    );
  }
}
