import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Button from '@atlaskit/button';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import ListIcon from '@atlaskit/icon/glyph/list';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { AkNavigationItem } from '../../src';
import { createGlobalTheme } from '../../src/theme/create-provided-theme';
import BasicNavigation from './BasicNavigation';
import * as presets from '../../src/theme/presets';

const debounceDuration = 100;
const famousThemes = [
  {
    name: 'Yellow',
    text: '#000000',
    background: '#FFCC00',
  },
  {
    name: 'Red',
    text: '#FFFFFF',
    background: '#fe001a',
  },
  {
    name: 'Pink',
    text: '#FFFFFF',
    background: '#F1396D',
  },
  {
    name: 'Black',
    text: '#FFFFFF',
    background: '#251F19',
  },
  {
    name: 'Purple',
    text: '#FFFFFF',
    background: '#550f9d',
  },
];

const simpleDropdownItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', type: 'radio' },
      { content: 'Canberra', type: 'radio' },
      { content: 'Melbourne', type: 'radio' },
      { content: 'Perth', type: 'radio' },
    ],
  },
];

// eslint-disable-next-line react/prop-types
const ThemeSwatches = ({ theme }) => (
  <SwatchContainer>
    <Swatch theme={theme}>
      <Item href="#" theme={theme}>
        <AtlassianIcon label="Atlassian" size="medium" />
      </Item>
    </Swatch>
    <p>Actual createGlobalTheme(textColor, backgroundColor) output value:</p>
    <pre>{ JSON.stringify(theme, null, 2) }</pre>
  </SwatchContainer>
);

export default class ThemePreview extends PureComponent {
  static propTypes = {
    isGlobalOnly: PropTypes.bool,
  }

  static defaultProps = {
    isGlobalOnly: false,
  }

  state = {
    backgroundColor: famousThemes[0].background,
    textColor: famousThemes[0].text,
  }

  handleBackgroundColorChange = (e) => {
    e.persist();
    this.updateBackgroundColor(e);
  }

  updateBackgroundColor = debounce((e) => {
    this.setState({ backgroundColor: e.target.value });
  }, debounceDuration)

  handleTextColorChange = (e) => {
    e.persist();
    this.updateTextColor(e);
  }

  updateTextColor = debounce((e) => {
    this.setState({ textColor: e.target.value });
  }, debounceDuration)

  showBrand = (text, background) => (
    () => {
      this.setState({
        textColor: text,
        backgroundColor: background,
      });
    }
  )

  render() {
    const { isGlobalOnly } = this.props;
    const { textColor, backgroundColor } = this.state;
    const myTheme = createGlobalTheme(textColor, backgroundColor);

    const globalTheme = myTheme;
    const containerTheme = isGlobalOnly ? presets.container : myTheme;

    return (
      <Page
        navigation={
          <BasicNavigation
            globalTheme={globalTheme}
            containerTheme={containerTheme}
          >
            <DropdownWrapper>
              <AkDropdownMenu
                items={simpleDropdownItems}
                shouldFitContainer
                position="bottom left"
              >
                <AkNavigationItem
                  isDropdownTrigger
                  icon={<ListIcon label="List" />}
                  dropIcon={<ExpandIcon label="Chevron" />}
                  text="Dropdown"
                />
              </AkDropdownMenu>
            </DropdownWrapper>
            <AkNavigationItem
              icon={<DashboardIcon label="Dashboard" secondaryColor="inherit" />}
              text="Item A"
            />
            <AkNavigationItem
              icon={<SettingsIcon label="Settings" secondaryColor="inherit" />}
              isSelected
              text="Selected item"
            />
          </BasicNavigation>
        }
      >
        <Grid>
          <GridColumn>
            <h3>Theme playground</h3>
            <p>Pick from one of the examples below:</p>
            <p>
              {
                famousThemes.map(({ name, text, background }) => (
                  <Button
                    onClick={this.showBrand(text, background)}
                    key={name}
                  >
                    {name}
                  </Button>
                ))
              }
            </p>
            <p>Or choose your own custom colors:</p>
            <p>
              <ColorPickerParent>
                Background:
                <input
                  type="color"
                  onChange={this.handleBackgroundColorChange}
                />
              </ColorPickerParent>
              <ColorPickerParent>
                Text:
                <input
                  type="color"
                  onChange={this.handleTextColorChange}
                />
              </ColorPickerParent>
            </p>
            <pre>
              {`import { createGlobalTheme } from '@atlaskit/navigation';
  const myTheme = createGlobalTheme('${textColor}', '${backgroundColor}');
  <Navigation globalTheme={myTheme} />
  // or
  <GlobalNavigation theme={myTheme} />`}
            </pre>
            <ThemeSwatches theme={myTheme} />
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

const SwatchContainer = styled.div`
  margin: ${akGridSizeUnitless * 2}px auto;
`;

const DropdownWrapper = styled.div`padding-bottom: ${akGridSizeUnitless / 2}px`;

const Item = styled.a`
  border-radius: ${akGridSizeUnitless * 2.5}px;
  width: ${akGridSizeUnitless * 5}px;
  height: ${akGridSizeUnitless * 5}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.item.default.background};
  color: inherit;

  &:hover {
    background-color: ${props => props.theme.item.hover.background};
    color: inherit;
  }

  &:active {
    background-color: ${props => props.theme.item.active.background};
    color: inherit;
  }

  &:focus {
    outline-color: ${props => props.theme.item.focus.outline};
    color: inherit;
  }
`;

const Swatch = styled.div`
  background-color: ${props => props.theme.background.primary};
  color: ${props => props.theme.text};
  padding: ${akGridSizeUnitless}px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const ColorPickerParent = styled.span`
  display: inline-block;
  margin-right: ${akGridSizeUnitless}px;

  input {
    margin-left: ${akGridSizeUnitless}px;
  }
`;
