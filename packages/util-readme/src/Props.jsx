import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Description from './Description';
import Heading from './Heading';

// eslint-disable-next-line react/no-multi-comp, react/prefer-stateless-function
export default class ReadmeProps extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    descriptions: PropTypes.objectOf(PropTypes.string),
    types: PropTypes.objectOf(PropTypes.string),
  }
  static defaultProps = {
    descriptions: {},
    types: {},
  }
  getPropNames() {
    return Object.keys(this.props.component.propTypes);
  }
  getPropTypes() {
    const { component: { defaultProps = {}, propTypes } } = this.props;
    return this.getPropNames().map((name) => {
      const thisType = propTypes[name];
      const type = Object.keys(PropTypes).filter(t =>
        PropTypes[t] === thisType)[0] || this.props.types[name];
      const isRequired = typeof thisType.isRequired === 'undefined';
      const defaultValue = JSON.stringify(defaultProps[name]) || `${defaultProps[name]}`;
      const description = this.props.descriptions[name];
      return { defaultValue, description, isRequired, name, type };
    });
  }
  render() {
    const { component: { propTypes } } = this.props;
    return (
      <div>
        <Heading type="2">Props</Heading>
        {propTypes ? (
          <table>
            <thead style={{ border: 0, borderBottom: '1px solid #ddd' }}>
              <tr>
                <th>Name (* is required)</th>
                <th>Type</th>
                <th>Default value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody style={{ border: 0 }}>
              {this.getPropTypes().map(row => (
                <tr key={row.name}>
                  <td>{row.name}{row.isRequired ? '*' : ''}</td>
                  <td>{row.type || '--'}</td>
                  <td>{row.defaultValue === 'undefined' ? '--' : row.defaultValue}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Description>There are no props for this component.</Description>
        )}
      </div>
    );
  }
}
