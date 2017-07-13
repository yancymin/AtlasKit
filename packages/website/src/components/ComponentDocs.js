/* eslint-disable react/prop-types */

import React from 'react';
import styled from 'styled-components';
import DynamicProps from './DynamicProps';

import Example from './ComponentExample';

import { getStorybookURL } from '../utils';

const Title = styled.h2`
  margin-top: 30px !important;
  margin-bottom: 10px;
`;

function renderProps(comp, i) {
  if (Array.isArray(comp)) {
    return comp.map(renderProps);
  }
  if (typeof comp === 'object') {
    return <DynamicProps key={i} componentName={comp.name} componentDocs={comp.props} />;
  }
  if (typeof comp === 'string') {
    return <DynamicProps componentDocs={comp} />;
  }
  return null;
}

const Examples = ({ docs, componentKey }) => (
  Array.isArray(docs.examples) && docs.examples.length && componentKey !== 'navigation' ? (
    <div>
      <Title>Examples</Title>
      {docs.examples.map((eg, i) => <Example key={i} {...eg} />)}
    </div>
  ) : null
);

const ComponentDocs = ({ component }) => {
  const { docs, props } = component;
  if (docs && typeof docs.default === 'function') {
    const Docs = docs.default;
    return <Docs />;
  }
  if (typeof docs === 'object') {
    return (
      <div>
        {docs.description}
        <Examples docs={docs} componentKey={component.key} />
        {!component.components && renderProps(props)}
      </div>
    );
  }
  return (
    <div>
      See the <a href={getStorybookURL(component)} target="_blank" rel="noopener noreferrer">
        {component.name} Storybook
      </a> for usage and docs.
    </div>
  );
};

export default ComponentDocs;
