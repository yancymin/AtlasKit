import React from 'react';

const style = {
  borderBottom: '1px solid red',
};

const BaselineAlignmentStory = props => (
  <div>
    <h1 style={style}>H1 {props.children} testing</h1>
    <h2 style={style}>H2 {props.children} testing</h2>
    <h3 style={style}>H3 {props.children} testing</h3>
    <h4 style={style}>H4 {props.children} testing</h4>
    <h5 style={style}>H5 {props.children} testing</h5>
    <h6 style={style}>H6 {props.children} testing</h6>
    <p style={style}>
      Content {props.children}
      and another {props.children}
    </p>
  </div>
);
BaselineAlignmentStory.displayName = 'BaselineAlignmentStory';
BaselineAlignmentStory.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default BaselineAlignmentStory;
