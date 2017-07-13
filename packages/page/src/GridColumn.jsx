import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';

import { defaultColumns } from './internal/vars';
import GridColumn from './internal/GridColumnElement';

const defaultSpacing = 'cosy';

export default withTheme(class AkGridColumn extends PureComponent {

  static propTypes = {
    medium: PropTypes.number,
    children: PropTypes.node,
  }

  static defaultProps = {
    medium: 0,
  }

  getTheme = props => ({
    columns: (props.theme && props.theme.columns) ?
      props.theme.columns :
      defaultColumns,
    spacing: (props.theme && props.theme.spacing) ?
      props.theme.spacing :
      defaultSpacing,
    isNestedGrid: false,
  });

  getNestedTheme = props => ({
    columns: props.medium,
    spacing: (props.theme && props.theme.spacing) ?
      props.theme.spacing :
      defaultSpacing,
    isNestedGrid: true,
  });

  render() {
    return (
      <ThemeProvider theme={this.getTheme(this.props)}>
        <GridColumn
          medium={this.props.medium}
        >
          <ThemeProvider theme={this.getNestedTheme(this.props)}>
            <div>
              {this.props.children}
            </div>
          </ThemeProvider>
        </GridColumn>
      </ThemeProvider>
    );
  }
});
