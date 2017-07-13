import React, { PureComponent } from 'react';
import TextInlineEdit from './TextInlineEdit';

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  state = {
    isEditing: false,
  }
  componentDidMount() {
    this.interval = setInterval(() =>
      this.setState({ isEditing: !this.state.isEditing }), 1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <TextInlineEdit
        isEditing={this.state.isEditing}
        initialValue="switching edit/read view programatically"
      />
    );
  }
 }
