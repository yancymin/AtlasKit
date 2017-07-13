import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import BasicNestedNavigation from './components/nested-navigation/BasicNestedNavigation';
import LazyLoadNestedNavigation from './components/nested-navigation/LazyLoadNestedNavigation';
import NestedNavigationWithInlineDialog from './components/nested-navigation/NestedNavigationWithInlineDialog';
import ReactRouterNestedNavigation from './components/nested-navigation/ReactRouterNestedNavigation';
import { name } from '../package.json';

storiesOf(`${name}/NestedNavigation`, module)
  .add('with basic nested navigation', () => (
    <BasicNestedNavigation />
  ))
  .add('nested navigation with lazy-load', () => (
    <LazyLoadNestedNavigation />
  ))
  .add('nested navigation with react-router', () => (
    <Router><ReactRouterNestedNavigation /></Router>
  ))
  .add('inline-dialog in nested navigation', () => (
    <NestedNavigationWithInlineDialog />
  )
);
