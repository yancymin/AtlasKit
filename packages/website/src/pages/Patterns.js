import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LayoutFork from 'react-media';
import {
  akBorderRadius,
  akColorB50,
  akColorB500,
  akColorN600,
  akColorN80,
  akGridSize,
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';
import Message from '@atlaskit/inline-message';
import Table from '@atlaskit/dynamic-table';

import { Heading, Intro, Section } from '../components/Type';
import packages from '../data';
import { MOBILE_QUERY } from '../../constants';

const packageKeys = Object.keys(packages);

const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: false,
      width: 15,
    },
    {
      key: 'description',
      content: 'Description',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
    {
      key: 'publishTime',
      content: 'Latest',
      shouldTruncate: true,
      isSortable: false,
      width: 20,
    },
    {
      key: 'maintainers',
      content: 'Maintainers',
      shouldTruncate: true,
      isSortable: false,
      width: 20,
    },
  ],
};

export default class Components extends PureComponent {
  static propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.node,
  }

  renderHeader = () => {
    const { header: Header, ...rest } = this.props;

    return Header ? <Header {...rest} /> : <span />;
  }

  renderRow = (component) => {
    const {
      description, packageName, key, maintainers, name, lastPublishedOn, version,
    } = component;

    const publishTime = new Date(lastPublishedOn);

    return {
      cells: [
        {
          key: 'name',
          content: (
            <RowCell>
              <Link to={`/components/${key}`}>
                {name}
              </Link>
            </RowCell>
          ),
        },
        {
          key: 'description',
          shouldTruncate: true,
          content: (
            <RowCell>{description}</RowCell>
          ),
        },
        {
          key: 'publishTime',
          content: (
            <RowCell>
              <a href={`https://www.npmjs.com/package/${packageName}`} target="_new">
                {version}
              </a>
              {publishTime ? (
                <Time dateTime={component.publishedDate}>
                  {' '}({component.publishedDate && new Date(component.publishedDate).toLocaleDateString()})
                </Time>
              ) : null}
            </RowCell>
          ),
        },
        {
          content: (
            <RowCell>
              {maintainers.map(val => val.name).join(', ')}
            </RowCell>
          ),
        },
      ],
    };
  }

  renderDesktop = () => (
    <TableWrapper>
      <Table
        head={head}
        rows={
          packageKeys.filter(key => packages[key].isPattern)
          .map(key => this.renderRow(packages[key]))
        }
        isFixedSize
      />
    </TableWrapper>
  );

  renderMobile = () => (
    <div>{packageKeys.map((key) => {
      const component = packages[key];
      const { description, name, version } = component;

      return (
        <RowButton to={`/patterns/${key}`} key={key}>
          <RowButtonHeader>
            <RowButtonTitle>{name}</RowButtonTitle>
            <div>{version}</div>
          </RowButtonHeader>
          <RowButtonDescription>
            {description}
          </RowButtonDescription>
        </RowButton>
      );
    })}</div>
  );

  render() {
    const Header = this.renderHeader;
    const DesktopContent = this.renderDesktop;
    const MobileContent = this.renderMobile;

    return (
      <Wrapper>
        <Helmet title="Patterns" />
        <Heading>Patterns</Heading>
        <Intro>
          These packages are designed for complex use-cases, exporting multiple
          composable components.
        </Intro>
        <Section>
          <Header />
          <LayoutFork query={MOBILE_QUERY}>
            {matches => (matches ? <MobileContent /> : <DesktopContent />)}
          </LayoutFork>
        </Section>
        <Section style={{ marginLeft: `-${akGridSize}` }}>
          <Message title="Atlassians">
            For internal, Fabric, and Media Services components please see the <a href="//aui-cdn.atlassian.com/atlaskit/registry/components.html" target="_blank" rel="noopener noreferrer">registry website</a>.
          </Message>
        </Section>
      </Wrapper>
    );
  }
}

// Layout
const Wrapper = styled.div`
  padding-bottom: 3em;
  padding-left: ${akGridSizeUnitless * 2.5}px;
  padding-right: ${akGridSizeUnitless * 2.5}px;

  @media (min-width: 600px) {
    padding-left: ${akGridSizeUnitless * 5}px;
    padding-right: ${akGridSizeUnitless * 5}px;
  }
`;

// Tabular data
const TableWrapper = styled.div`
  @media (max-width: 600px) {
    overflow-x: auto;

    & table {
      table-layout: auto;
    }
  }
`;
const RowCell = styled.div`
  padding-bottom: ${akGridSize};
  padding-top: ${akGridSize};
`;
const Time = styled.time`
  color: ${akColorN80};
`;

// Mobile content
const RowButton = styled(Link)`
  border-radius: ${akBorderRadius};
  color: ${akColorN80};
  display: block;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  margin-left: -1em;
  margin-right: -1em;
  text-decoration: none !important;

  &:active, &:focus {
    background-color: ${akColorB50};
    text-decoration: none;
  }
`;
const RowButtonHeader = styled.div`
  align-items: baseline;
  display: flex;
`;
const RowButtonTitle = styled.div`
  color: ${akColorB500};
  font-weight: 500;
  margin-right: 0.5em;
`;
const RowButtonDescription = styled.div`
  color: ${akColorN600};
  line-height: 1.4;
  font-size: 0.85em;
`;
