import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';

import { defaultGridColumns, layout, spacing } from './internal/vars';
import Grid from './internal/GridElement';

export default withTheme(class AkGrid extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    spacing: PropTypes.oneOf(Object.keys(spacing)),
    layout: PropTypes.oneOf(layout),
  }

  static defaultProps = {
    spacing: 'cosy',
    layout: 'fixed',
  }

  getTheme = props => ({
    columns: (props.theme && props.theme.columns) ?
      props.theme.columns :
      defaultGridColumns,
    spacing: (props.theme && props.theme.spacing) ?
      props.theme.spacing :
      props.spacing,
    isNestedGrid: (props.theme && props.theme.isNestedGrid) ?
      props.theme.isNestedGrid :
      false,
  });

  render() {
    return (
      <ThemeProvider theme={this.getTheme(this.props)}>
        <Grid spacing={this.props.spacing} layout={this.props.layout}>
          {this.props.children}
        </Grid>
      </ThemeProvider>
    );
  }
});
