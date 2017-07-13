import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.code`
  display: inline-block;
  background: white;
  color: #333;
  border-radius: 3px;
  border-left: 3px solid #eee;
  padding: 5px 10px;
  margin-bottom: 10px;
`;
const Block = styled.span`
  display: block;
`;
const TypeMinWidth = styled.span`
  display: inline-block;
  min-width: 60px;
`;
const Type = styled.span`
  display: inline-block;
  border: 1px solid #bedcf7;
  color: #1c4b75;
  background: #eff7ff;
  border-radius: 3px;
  margin: 0 2px;
  padding: 0 3px;
  font-size: 90%;
`;
const TypeMeta = styled(Type)`
  border: 1px solid #ddd;
  color: #666;
  background: #f3f3f3;
  margin: 2px;
`;
const StringType = styled(Type)`
  color: #30874d;
  border-color: #ace0be;
  background: #effff4;
`;
const InstanceType = styled(Type)`
  color: #453087;
  border-color: #906bba;
  background: #ede0fc;
`;
const Required = styled.span`
  color: #b74242;
`;
const Outline = styled.span`
  color: #666;
  font-size: 110%;
  line-height: 1;
  -webkit-text-stroke: 1px #666;
`;
const Invalid = styled.span`
  color: #999;
  border: 1px solid #eee;
  margin: 5px;
`;

const SIMPLE_TYPES = ['array', 'bool', 'func', 'number', 'object', 'string',
  'symbol', 'node', 'element', 'custom', 'any'];

/* eslint-disable no-use-before-define */
/* eslint-disable prefer-rest-params */
function printComplexType(type) {
  if (typeof type === 'object' && !SIMPLE_TYPES.includes(type.name)) {
    return print(...arguments);
  }
  return null;
}
/* eslint-enable no-use-before-define */
/* eslint-enable prefer-rest-params */

function print(type, depth = 1) {
  const Indent = ({ children }) => (
    <div style={{ paddingLeft: depth * 10 }}>{children}</div>
  );
  Indent.propTypes = { children: PropTypes.node };

  function maybeIndent(nestedType) {
    if (SIMPLE_TYPES.includes(nestedType.name)) {
      return print(nestedType, depth + 1);
    }
    return <Indent>{print(nestedType, depth + 1)}</Indent>;
  }

  if (typeof type === 'string') {
    if (type.charAt(0) === "'") {
      return <StringType>{type}</StringType>;
    }
    return <Type>{type}</Type>;
  }

  // make sure we have an object; we should always have an object!!!
  if (typeof type !== 'object') {
    return (
      <div>ERROR: TYPEOF type === {typeof type}</div>
    );
  }

  if (type.name === 'arrayOf') {
    return (
      <span>
        <TypeMeta>Array of <Outline>{'['}</Outline></TypeMeta>
        {maybeIndent(type.value)}
        <TypeMeta><Outline>{']'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'objectOf') {
    return (
      <span>
        <TypeMeta>Object of <Outline>{'{'}</Outline></TypeMeta>
        {maybeIndent(type.value)}
        <TypeMeta><Outline>{'}'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'instanceOf') {
    return (
      <span>
        <TypeMeta>Instance of <Outline>{'('}</Outline></TypeMeta>
        <InstanceType>{type.value}</InstanceType>
        <TypeMeta><Outline>{')'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'shape') {
    if (typeof type.value === 'string') {
      return (
        <span>
          <TypeMeta>Shape <Outline>{'{'}</Outline></TypeMeta>
          <InstanceType>{type.value}</InstanceType>
          <TypeMeta><Outline>{'}'}</Outline></TypeMeta>
        </span>
      );
    }
    return (
      <span>
        <TypeMeta>Shape <Outline>{'{'}</Outline></TypeMeta>
        <Indent>
          {Object.keys(type.value).map(key => (
            <div key={key}>
              <TypeMinWidth><Type>{type.value[key].name}</Type></TypeMinWidth>
              {' '}{key}
              {type.value[key].required ? <Required> required</Required> : null}
              {' '}{printComplexType(type.value[key], depth + 1)}
            </div>
          ))}
        </Indent>
        <TypeMeta><Outline>{'}'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'enum') {
    if (typeof type.value === 'string') {
      return (
        <span>
          <TypeMeta>One of <Outline>{'('}</Outline></TypeMeta>
          <InstanceType>{type.value}</InstanceType>
          <TypeMeta><Outline>{')'}</Outline></TypeMeta>
        </span>
      );
    }
    return (
      <span>
        <TypeMeta>One of <Outline>{'('}</Outline></TypeMeta>
        <Indent>
          {Array.isArray(type.value)
            ? type.value.map((v, i) => <Block key={i}>{print(v.value, depth + 1)}</Block>)
            : print(type.value, depth + 1)}
        </Indent>
        <TypeMeta><Outline>{')'}</Outline></TypeMeta>
      </span>
    );
  }

  if (type.name === 'union') {
    if (typeof type.value === 'string') {
      return (
        <span>
          <TypeMeta>One of <Outline>{'('}</Outline></TypeMeta>
          <InstanceType>{type.value}</InstanceType>
          <TypeMeta><Outline>{')'}</Outline></TypeMeta>
        </span>
      );
    }
    return (
      <span>
        <TypeMeta>One of <Outline>{'('}</Outline></TypeMeta>
        <Indent>
          {Array.isArray(type.value)
            ? type.value.map(i => <Block key={i.name}>{print(i, depth + 1)}</Block>)
            : print(type.value, depth + 1)}
        </Indent>
        <TypeMeta><Outline>{')'}</Outline></TypeMeta>
      </span>
    );
  }

  // note we guard against complex name properties here, because you can have
  // shapes with name properties
  if (!type.value && typeof type.name === 'string') {
    return (
      <Type>{type.name}</Type>
    );
  }

  return <Invalid>{JSON.stringify(type)}</Invalid>;
}

export default class PrettyPropType extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  }
  state = {}
  render() {
    const { type } = this.props;
    if (SIMPLE_TYPES.includes(type.name)) return null;
    return (
      <Wrapper>
        {print(type)}
      </Wrapper>
    );
  }
}
