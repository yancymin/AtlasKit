/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import AkAvatar from '@atlaskit/avatar';
import AddIcon from '@atlaskit/icon/glyph/add';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import SearchIcon from '@atlaskit/icon/glyph/search';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import ListIcon from '@atlaskit/icon/glyph/list';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import AkButton from '@atlaskit/button';
import { name } from '../package.json';
import { AkContainerNavigation, AkGlobalNavigation, AkGlobalItem, AkContainerTitle, AkNavigationItemGroup, AkNavigationItem, presetThemes } from '../src/';
import { containerOpenWidth, containerClosedWidth, gridSize } from '../src/shared-variables';
import PresetPicker from './components/PresetPicker';
import ThemePreview from './components/ThemePreview';
import nucleusLogo from './nucleus.png';

// eslint-disable-next-line react/prop-types
const ExampleContainerNavigation = ({ theme, themeName, isCollapsed = false }) => (
  <AkContainerNavigation
    theme={theme}
    showGlobalActions={isCollapsed}
    isCollapsed={isCollapsed}
    globalCreateIcon={<AddIcon label="Create icon" secondaryColor="inherit" />}
    globalPrimaryIcon={<AtlassianIcon label="Atlassian icon" secondaryColor="inherit" />}
    globalPrimaryItemHref="//www.atlassian.com"
    globalSearchIcon={<SearchIcon label="Search icon" secondaryColor="inherit" />}
    headerComponent={() => (
      <AkContainerTitle
        href="#foo"
        icon={
          <img alt="nucleus" src={nucleusLogo} />
        }
        text={`${themeName} theme`}
        subText="ContainerNavigation"
      />)}
  >
    <AkNavigationItem
      text="The very first item"
      href="#1"
    />
    <AkDropdownMenu
      shouldFitContainer={!isCollapsed}
      position={isCollapsed ? 'right top' : 'bottom left'}
      items={[{
        heading: 'Cities',
        items: [
          { content: 'Sydney', value: 1 },
          { content: 'Canberra', value: 2 },
          { content: 'Melbourne', value: 3 },
          { content: 'Perth', value: 4 },
        ],
      }]}
    >
      <AkNavigationItem
        isDropdownTrigger
        icon={<ListIcon label="List" />}
        dropIcon={<ExpandIcon label="Chevron" />}
        text="Dropdown menu"
      />
    </AkDropdownMenu>
    <AkNavigationItemGroup title="Group 1">
      <AkNavigationItem
        isSelected
        subText="Part of group 1"
        text="This item is selected"
      />
      <AkNavigationItem
        subText="Part of group 1"
        text="Another item"
      />
    </AkNavigationItemGroup>
    <AkNavigationItemGroup hasSeparator title="Group 2">
      <AkNavigationItem
        icon={<AkAvatar
          presence="online"
          size="small"
        />}
        text="Another item"
        subText="Part of group 2"
      />
      <AkNavigationItem
        icon={<img alt="icon" src={nucleusLogo} />}
        text="Another item"
        subText="Part of group 2"
      />
    </AkNavigationItemGroup>
  </AkContainerNavigation>
);

// eslint-disable-next-line react/prop-types
const ExampleGlobalNavigation = ({ theme }) => (
  <AkGlobalNavigation
    theme={theme}
    primaryIcon={<AtlassianIcon label="Atlassian icon" secondaryColor="inherit" />}
    primaryItemHref="//www.atlassian.com"
    createIcon={<AddIcon label="Create icon" secondaryColor="inherit" />}
    searchIcon={<SearchIcon label="Search icon" secondaryColor="inherit" />}
    secondaryActions={[
      <AkDropdownMenu
        appearance="tall"
        items={[
          {
            heading: 'Help',
            items: [
              { content: 'Documentation' },
              { content: 'Learn Git' },
              { content: 'Keyboard shortcuts' },
              { content: 'Bitbucket tutorials' },
              { content: 'API' },
              { content: 'Support' },
            ],
          },
          {
            heading: 'Information',
            items: [
              { content: 'Latest features' },
              { content: 'Blog' },
              { content: 'Plans & pricing' },
              { content: 'Site status' },
              { content: 'Version info' },
            ],
          },
          {
            heading: 'Legal',
            items: [
              { content: 'Terms of service' },
              { content: 'Privacy policy' },
            ],
          },
        ]}
        position="right bottom"
      >
        <AkGlobalItem>
          <QuestionCircleIcon label="Help icon" secondaryColor="inherit" />
        </AkGlobalItem>
      </AkDropdownMenu>,
      <AkDropdownMenu
        appearance="tall"
        items={[
          {
            heading: 'Luke Skywalker',
            items: [
              { content: 'View profile' },
              { content: 'Manage Atlassian account' },
              { content: 'Bitbucket settings' },
              { content: 'Integrations' },
              { content: 'Bitbucket labs' },
              { content: 'Log out' },
            ],
          },
        ]}
      >
        <AkGlobalItem>
          <AkAvatar size="small" />
        </AkGlobalItem>
      </AkDropdownMenu>,
    ]}
  />
);

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: flex;
  height: 100vh;
`;

const Column = styled.div`
  width: ${props => (props.isCollapsed ? containerClosedWidth : containerOpenWidth)}px;
  margin-left: ${gridSize}px;
  margin-right: ${gridSize}px;

  /* make sure it is full height */
  display: flex;
`;

const Row = styled.div`
  margin-bottom: ${gridSize}px;
  text-align: center;
`;

class ContainerNavigationExplorer extends PureComponent {
  state = {
    isCollapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }
  render() {
    const { isCollapsed } = this.state;
    return (
      <Container>
        <Grid>
          {Object.keys(presetThemes).map(key => (
            <Column isCollapsed={isCollapsed} key={key}>
              <ExampleContainerNavigation
                theme={presetThemes[key]}
                themeName={key}
                isCollapsed={isCollapsed}
              />
            </Column>
          ))}
          <Column>
            <Row>
              <Row>Container Navigation is currently:</Row>
              <Row><strong>{isCollapsed ? 'collapsed' : 'open'}</strong></Row>
              <Row>
                <AkButton
                  onClick={this.toggleCollapsed}
                >
                  toggle collapsed
                </AkButton>
              </Row>
            </Row>
          </Column>
        </Grid>

      </Container>
    );
  }
}

const GlobalLabel = styled.div`
  color: ${props => props.color}
  position: absolute;
  top: 50%;
  transform: rotate(-90deg);
`;

const GlobalNavigationExplorer = () => (
  <Container>
    <Grid>
      {Object.keys(presetThemes).map((key) => {
        const presetGlobal = presetThemes[key];
        return (
          <Column isCollapsed key={key}>
            <GlobalLabel color={presetGlobal.text}>
              {key} theme
            </GlobalLabel>
            <ExampleGlobalNavigation
              theme={presetGlobal}
            />
          </Column>
        );
      })}
    </Grid>
  </Container>
);

storiesOf(`${name} - theming`, module)
  .add('presets for container navigation', () => (
    <ContainerNavigationExplorer />
  ))
  .add('presets for global navigation', () => (
    <GlobalNavigationExplorer />
  ))
  .add('preset picker', () => (
    <PresetPicker />
  ))
  .add('theme playground', () => (
    <ThemePreview />
  ))
  .add('theme playground with global only', () => (
    <ThemePreview isGlobalOnly />
  ));
