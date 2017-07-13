import React, { PureComponent } from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import AkDropdownMenu from '@atlaskit/dropdown-menu';
import BasicNavigation from './BasicNavigation';
import { presetThemes } from '../../src/';
import { gridSize } from '../../src/shared-variables';

const presetOptions = [
  {
    heading: 'Theme',
    items: Object.keys(presetThemes).map(key => ({
      content: key,
      type: 'radio',
    })),
  },
];

export default class PresetPicker extends PureComponent {
  state = {
    containerThemeName: 'container',
    globalThemeName: 'global',
  }

  changeContainerTheme = (e) => {
    this.setState({
      containerThemeName: e.item.content,
    });
  };

  changeGlobalTheme = (e) => {
    this.setState({
      globalThemeName: e.item.content,
    });
  };

  render() {
    const { globalThemeName, containerThemeName } = this.state;

    return (
      <Page
        navigation={
          <BasicNavigation
            globalTheme={presetThemes[globalThemeName]}
            containerTheme={presetThemes[containerThemeName]}
          />
        }
      >
        <Grid>
          <GridColumn>
            <h3 style={{ marginBottom: gridSize }}>Container theme</h3>
            <AkDropdownMenu
              triggerType="button"
              items={presetOptions}
              onItemActivated={this.changeContainerTheme}
            >
              {containerThemeName}
            </AkDropdownMenu>

            <h3 style={{ marginBottom: gridSize }}>Global theme</h3>
            <AkDropdownMenu
              triggerType="button"
              items={presetOptions}
              onItemActivated={this.changeGlobalTheme}
            >
              {globalThemeName}
            </AkDropdownMenu>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}
