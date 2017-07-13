const path = require('path');

module.exports = [
  { name: 'Navigation', src: path.join(__dirname, '../src/components/js/Navigation.jsx') },
  { name: 'AkNavigationItemGroup', src: path.join(__dirname, '../src/components/js/NavigationItemGroup.jsx') },
  { name: 'AkContainerLogo', src: path.join(__dirname, '../src/components/js/ContainerLogo.jsx') },
  { name: 'AkContainerTitle', src: path.join(__dirname, '../src/components/js/ContainerTitle.jsx') },
  { name: 'AkContainerNavigation', src: path.join(__dirname, '../src/components/js/ContainerNavigation.jsx') },
  { name: 'AkContainerNavigationNested', src: path.join(__dirname, '../src/components/js/nested/ContainerNavigationNested.jsx') },
  { name: 'AkCreateDrawer', src: path.join(__dirname, '../src/components/js/drawers/CreateDrawer.jsx') },
  { name: 'AkCustomDrawer', src: path.join(__dirname, '../src/components/js/drawers/CustomDrawer.jsx') },
  { name: 'AkSearchDrawer', src: path.join(__dirname, '../src/components/js/drawers/SearchDrawer.jsx') },
  { name: 'AkNavigationItem', src: path.join(__dirname, '../src/components/js/NavigationItem.jsx') },
  { name: 'AkGlobalNavigation', src: path.join(__dirname, '../src/components/js/GlobalNavigation.jsx') },
  { name: 'AkGlobalItem', src: path.join(__dirname, '../src/components/js/GlobalItem.jsx') },
  { name: 'AkSearch', src: path.join(__dirname, '../src/components/js/Search.jsx') },
  { name: 'AkSearchResults', src: path.join(__dirname, '../src/components/js/SearchResults.jsx') },
  // { name: 'createGlobalTheme', src: path.join(__dirname, '../theme/create-provided-theme') },
  //
  // { name: 'presetThemes', src: path.join(__dirname, '../theme/presets') },
];
