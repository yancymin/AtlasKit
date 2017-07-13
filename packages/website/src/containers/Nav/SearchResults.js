import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class SearchResults extends PureComponent {
  static propTypes = {
    matchingComponents: PropTypes.arrayOf(PropTypes.object),
    onResultClicked: PropTypes.func.isRequired,
  }

  render() {
    if (!this.props.matchingComponents.length) {
      return (
        <p>Nothing found, keep on searching!</p>
      );
    }

    return (
      <List>
        {this.props.matchingComponents.map(component => (
          <li key={component.name} style={{ padding: 8 }}>
            <Link
              to={`/components/${component.key}`}
              onClick={this.props.onResultClicked}
            >
              {component.name}
            </Link>
            <div>
              {component.description}
            </div>
          </li>
        ))}
      </List>
    );
  }
}

const List = styled.ul`
  list-style-type: none;
  margin: 16px 0;
  padding: 0;
`;
