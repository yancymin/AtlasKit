import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import Example from './Example';
import exampleSrc from '!raw-loader!./Example';
import SimplestExample from './SimplestExample';
import simplestExampleSrc from '!raw-loader!./SimplestExample';
import ThemedNav from './ThemedNav';
import themedNavSrc from '!raw-loader!./ThemedNav';
import SimpleCollapse from './SimpleCollapse';
import simpleCollapseSrc from '!raw-loader!./SimpleCollapse';
import MaximumComplexity from './MaximumComplexity';
import maximumComplexitySrc from '!raw-loader!./MaximumComplexity';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <h2>Concepts</h2>
    <p>The navigation package is not designed to be a single component, but instead
      a composable navigation layout to sit at the far left of your app, with links
      around your site. It is an opinionated navigation option, with a set minimum
      width, a collapsed and uncollapsed state, and two different sections.
    </p>
    <p>
      Note that while it is important to understand these two sections, they are
      included by default in the default export, and for most use-cases this can
      be relied upon to provide these.
    </p>
    <h3>The {"'global'"} navigation section</h3>
    <p>The global navigation section is to the far left, and is designed only to
      display icons. It has primary actions at the top, and secondary actions at
      the bottom.
    </p>
    <p>When the navigation is collapsed, the global navigation is hidden, however
      the primary actions are placed at the top of the container navigation.
    </p>
    <p>
      The global navigation does not accept any children, and instead takes all
      its internal components as props.
    </p>
    <h3>The {"'container'"} navigation section</h3>
    <p>
      The container navigation is the right side of the navigation bar, and is
      where most navigation items should live.
    </p>
    <p>
      The container can be collapsed and expanded.
    </p>
    <p>
      Unlike the global section, the container renders children, and these make
      up the bulk of the navigation. The children of the default export are passed
      as children to the container.
    </p>
    <h3>Navigation Items</h3>
    <p>
      There are two exports designed for use in rendering items to the container
      section. The first is AkNavigationItem, the second is AkNavigationItemGroup,
      which is designed to wrap a collection of AkNavigationItems and provide a
      heading to them.
    </p>
    <h3>linkComponent</h3>
    <p>
      Many of the items in navigation accept a linkComponent prop, to allow an
      easy-to-pass generic link solution. By default, this is an anchor tag,
      which takes in a href property, and wraps around elements intended to be
      links.
    </p>
    <p>AkNavigationItems also accept a link component.</p>
    <p>
      If you are not relying on the default link, such as if you are using
      react-router to do internal navigation, make sure it is provided consistently,
      and be aware that it will be passed a href prop.
    </p>
    <p>
      You should not manually wrap elements in a link if a linkComponent will wrap them.
    </p>
    <h3>Drawers</h3>
    <p>
      Drawers are designed to animate in from the left and take the user{"'"}s focus
      to a task initiated from the navigation menu, without navigating the page.
      These are designed to be initiated the global primary navigation items.
      See the examples for a search drawer and a create drawer.
    </p>
    <h3>Nested Navigation</h3>
    <p>
      Nested navigation aims to have multiple sets of containers that can be
      animated in to each other, as well as having navigation to travel back to
      the previous nav.
    </p>
    <h3>Controlling collapsing</h3>
    <p>
      Two props control collapsing, both of them boolean. `isCollapsible` determines
      whether the menu should be draggable to a closed state. `isOpen` sets whether
      the menu is collapsed or not. By default, dragging it closed calls the onResize
      prop, but does not set it to be closed, and to allow the user to drag the
      navigation closed, you will need to make the onResize function change the
      isOpen prop.
    </p>
    <h3>Adding Themes</h3>
    <p>
      The package also has two exports that are not components. The first is
      presetThemes, which are an object of the default theming items, so that this
      can be modified and provided to navigation. The second is createGlobalTheme,
      which takes in two arguments, text and background. This function generates
      a theme object for you based on the provided text colour and background colour.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Navigation',
    Component: SimplestExample,
    src: simplestExampleSrc,
  },
  {
    title: 'Custom Theming',
    Component: ThemedNav,
    src: themedNavSrc,
  },
  {
    title: 'Using All Options',
    Component: MaximumComplexity,
    src: maximumComplexitySrc,
  },
  {
    title: 'Collapsible Navigation',
    Component: SimpleCollapse,
    src: simpleCollapseSrc,
  },
  {
    title: 'Using Search Drawer',
    Component: Example,
    src: exampleSrc,
  },
];
