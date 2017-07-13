import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Description from './Description';
import Heading from './Heading';
import PrettyPropType from './PrettyPropType';

const TypeHeading = styled.h3`
  margin: 0 0 10px 0;
`;
const PropTypeWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
`;
const DefaultValue = styled.code`
  color: #777;
`;
const Required = styled.span`
  color: #b74242;
  font-size: 80%;
  margin-left: 10px;
`;
const PropTypeDescription = styled.div`
  border-radius: 3px;
  border-left: 3px solid #ccc;
  padding: 5px 10px;
  margin-bottom: 10px;
`;
const TypeLabel = styled.span`
  display: inline-block;
  border: 1px solid #bedcf7;
  color: #1c4b75;
  background: #eff7ff;
  border-radius: 3px;
  margin-right: 5px;
  padding: 0 3px;
  font-size: 80%;
`;

// Disable prop types validation for internal functional components
/* eslint-disable react/prop-types */

const PageWrapper = ({ name, children }) => (
  <div>
    <Heading type={2}>{name ? `${name} ` : ''}Props</Heading>
    {children}
  </div>
);

const PropType = ({ children }) => (
  <TypeLabel>
    {children}
  </TypeLabel>
);

const PropTypeHeading = ({ defaultValue, name, required, type }) => (
  <TypeHeading>
    <code><PropType>{type.name}</PropType> {name}</code>
    {defaultValue ? <DefaultValue> = {defaultValue.value}</DefaultValue> : null}
    {required ? <Required> required</Required> : null}
  </TypeHeading>
);

/* eslint-enable react/prop-types */

export default class DynamicProps extends PureComponent {
  static propTypes = {
    componentName: PropTypes.string,
    /* eslint-disable react/forbid-prop-types */
    componentDocs: PropTypes.object.isRequired,
    /* eslint-enable react/forbid-prop-types */
  }
  render() {
    const { componentName, componentDocs } = this.props;
    if (!componentDocs || !componentDocs.props || !!componentDocs.props.length) {
      return (
        <PageWrapper name={componentName}>
          <Description>There are no props for this component.</Description>
        </PageWrapper>
      );
    }
    const propTypes = Object.keys(componentDocs.props);

    return (
      <PageWrapper name={componentName}>
        {propTypes.map((propName) => {
          const prop = componentDocs.props[propName];
          if (!prop.type) {
            console.error(`${componentName} prop ${propName} has no type; this usually indicates invalid propType or defaultProps config`); // eslint-disable-line no-console
            return null;
          }
          return (
            <PropTypeWrapper key={propName}>
              <PropTypeHeading
                name={propName}
                required={prop.required}
                defaultValue={prop.defaultValue}
                type={prop.type}
              />
              {prop.description ? (
                <PropTypeDescription>{prop.description}</PropTypeDescription>
              ) : null}
              <PrettyPropType type={prop.type} />
            </PropTypeWrapper>
          );
        })}
      </PageWrapper>
    );
  }
}
