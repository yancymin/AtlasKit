// Simple component which wraps stories and creates a styled list out of it
import * as React from 'react';
import {Component} from 'react';

const styles = {
  column: {
    statesWrapper: {
      listStyle: 'none',
      padding: '10px',
      margin: '10px',
      borderRadius: '3px',
      display: 'inline-block'
    },
    stateItem: {
      flexDirection: 'column',
      borderRadius: '3px',
      padding: '10px',
      margin: '10px',
    },
    stateTitle: {
      borderBottom: '1px solid #ccc',
      marginBottom: '7px',
      color: '#606369',
      width: '100%',
      textTransform: 'capitalize'
    }
  },
  row: {
    statesWrapper: {
      listStyle: 'none',
      padding: '10px',
      margin: '10px',
      borderRadius: '3px'
    },
    stateItem: {
      display: 'inline-flex',
      flexDirection: 'column',
      borderRadius: '3px',
      padding: '10px',
      margin: '10px',
    },
    stateTitle: {
      borderBottom: '1px solid #ccc',
      marginBottom: '7px',
      color: '#606369',
      width: '100%',
      textTransform: 'capitalize'
    }
  }
};

export interface StoryListProps {
  display?: 'row' | 'column';
  children?: any;
}

export class StoryList extends Component<StoryListProps, {}> {
  render() {
    const display = this.props.display ? this.props.display : 'row';
    const listStyles = display === 'column' ? styles.column : styles.row;
    const listContent = this.props.children.map((c, i) => {
      return <li style={listStyles.stateItem} key={i}>
        <div style={listStyles.stateTitle}>{c.title}</div>
        {c.content}
      </li>;
    });

    return <ul style={listStyles.statesWrapper}>{listContent}</ul>;
  }
}
