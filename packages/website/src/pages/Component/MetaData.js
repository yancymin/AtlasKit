/* eslint-disable react/prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { akColorN80, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const MetaItem = ({ href, label, summary }) => (
  <DI>
    <DT>{label}</DT>
    <DD>{href
      ? <a href={href} target="_new">{summary}</a>
      : summary
    }</DD>
  </DI>
);

export default class MetaData extends PureComponent {
  static propTypes = {
    maintainers: PropTypes.arrayOf(PropTypes.object),
    packageKey: PropTypes.string,
    packageName: PropTypes.string,
    publishedDate: PropTypes.string,
    version: PropTypes.string,
  }

  render() {
    const { packageKey, maintainers, packageName, publishedDate, version } = this.props;

    const versionSummary = (
      <span>
        <strong>{version}</strong>
        {publishedDate ? (
          <time dateTime={publishedDate} style={{ marginLeft: 10 }}>
            {new Date(publishedDate).toLocaleDateString()}
          </time>
        ) : null}
      </span>
    );

    return (
      <Meta>
        <MetaItem
          label="Install"
          summary={<code>yarn add {packageName}</code>}
        />
        <MetaItem
          href={`https://www.npmjs.com/package/${packageName}`}
          label="npm"
          summary={packageName}
        />
        <MetaItem
          href={`https://bitbucket.org/atlassian/atlaskit/src/master/packages/${packageKey}`}
          label="Source"
          summary="Bitbucket"
        />
        <MetaItem
          label="Version"
          summary={versionSummary}
        />
        <MetaItem
          href={`https://unpkg.com/${packageName}/dist`}
          label="Bundle"
          summary="unpkg.com"
        />
        <MetaItem
          label={`Maintainer${maintainers.length > 1 ? 's' : ''}`}
          summary={maintainers.map(m => m.name).join(', ')}
        />
      </Meta>
    );
  }
}

const Meta = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5em;
  margin-right: -0.5em;
  padding-bottom: ${akGridSizeUnitless * 1.5}px;
  padding-top: ${akGridSizeUnitless * 1.5}px;

  @media (min-width: 780px) {
    padding-bottom: ${akGridSizeUnitless * 3}px;
    padding-top: ${akGridSizeUnitless * 3}px;
  }
`;
const DI = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  padding: 0.5em;

  @media (min-width: 780px) {
    flex-direction: row;
  }
  @media (min-width: 1200px) {
    flex-basis: 50%;
  }
`;
const DT = styled.div`
  color: ${akColorN80};
  flex-basis: 25%;
`;
const DD = styled.div`
  flex: 1 0 auto;
`;
