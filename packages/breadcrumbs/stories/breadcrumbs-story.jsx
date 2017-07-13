import { storiesOf } from '@kadira/storybook';
import React from 'react';
import AtlassianIcon from 'ak-icon/glyph/atlassian';

import Breadcrumbs, { BreadcrumbsItem } from '../src';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Breadcrumbs, { BreadcrumbsItem }', 'ak-breadcrumbs'],
];
storiesOf(name, module)
  .addCodeExampleStory('simple ak-breadcrumbs', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/pages" text="Pages" />
      <BreadcrumbsItem href="/pages/home" text="Home" />
      <BreadcrumbsItem href="/pages/adg3" text="ADG 3 - New site" />
      <BreadcrumbsItem href="/pages/daccontent" text="design.atlassian.com content" />
      <BreadcrumbsItem href="/pages/product-design" text="Product design (draft)" />
      <BreadcrumbsItem href="/pages/patternsdesign" text="Patterns design (draft)" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with no items', () => (
    <Breadcrumbs />
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with one item', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/page" text="Page" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with one item with very long text', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/supercalifragilisticexpialidocious" text="Supercalifragilisticexpialidocious" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with icons', () => {
    const TestIcon = <AtlassianIcon label="Test icon" />;
    return (
      <div>
        <p>Using itemBefore and itemAfter API</p>
        <Breadcrumbs>
          <BreadcrumbsItem href="/item" text="No icon" />
          <BreadcrumbsItem href="/item" iconBefore={TestIcon} text="Before" />
          <BreadcrumbsItem href="/item" iconAfter={TestIcon} text="After" />
          <BreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Before and after" />
          <BreadcrumbsItem href="/item" iconBefore={TestIcon} iconAfter={TestIcon} text="Long content, icons before and after" />
        </Breadcrumbs>
      </div>
    );
  }, {
    imports: [...imports, ['AtlassianIcon', 'ak-icon/glyph/atlassian']],
    overrides: {
      iconBefore: '<AtlassianIcon label="Test icon" />',
      iconAfter: '<AtlassianIcon label="Test icon" />',
    },
  })
  .addCodeExampleStory('ak-breadcrumbs with markup in item content', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/page" text="<b>Page</b>" />
      <BreadcrumbsItem href="/page" text="<script>alert();</script>" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with long and short items', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/long" text="Supercalifragilisticexpialidocious" />
      <BreadcrumbsItem href="/short" text="Item" />
      <BreadcrumbsItem href="/short" text="Another item" />
      <BreadcrumbsItem href="/long" text="Long item name which should be truncated" />
      <BreadcrumbsItem href="/long" text="Another long item name which should be truncated" />
      <BreadcrumbsItem href="/short" text="Short item" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items', () => (
    <Breadcrumbs>
      <BreadcrumbsItem href="/item" text="Item" />
      <BreadcrumbsItem href="/item" text="Another item" />
      <BreadcrumbsItem href="/item" text="A third item" />
      <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
      <BreadcrumbsItem href="/item" text="Yet another item" />
      <BreadcrumbsItem href="/item" text="An item" />
      <BreadcrumbsItem href="/item" text="The next item" />
      <BreadcrumbsItem href="/item" text="The item after the next item" />
      <BreadcrumbsItem href="/item" text="The ninth item" />
      <BreadcrumbsItem href="/item" text="Item ten" />
      <BreadcrumbsItem href="/item" text="The last item" />
    </Breadcrumbs>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items, inside container', () => (
    <div style={{ maxWidth: '500px', border: '1px solid black' }}>
      <Breadcrumbs>
        <BreadcrumbsItem href="/item" text="Item" />
        <BreadcrumbsItem href="/item" text="Another item" />
        <BreadcrumbsItem href="/item" text="A third item" />
        <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
        <BreadcrumbsItem href="/item" text="Yet another item" />
        <BreadcrumbsItem href="/item" text="An item" />
        <BreadcrumbsItem href="/item" text="The next item" />
        <BreadcrumbsItem href="/item" text="The item after the next item" />
        <BreadcrumbsItem href="/item" text="The ninth item" />
        <BreadcrumbsItem href="/item" text="Item ten" />
        <BreadcrumbsItem href="/item" text="The last item" />
      </Breadcrumbs>
    </div>
  ), { imports })
  .addCodeExampleStory('ak-breadcrumbs with many items, with maximum 5 items', () => (
    <div>
      <p>Should automatically collapse if there are more than 5 items</p>
      <div style={{ maxWidth: '500px', border: '1px solid black' }}>
        <p>Exactly 5 items</p>
        <Breadcrumbs maxItems={5}>
          <BreadcrumbsItem href="/item" text="Item" />
          <BreadcrumbsItem href="/item" text="Another item" />
          <BreadcrumbsItem href="/item" text="A third item" />
          <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
          <BreadcrumbsItem href="/item" text="Item 5" />
        </Breadcrumbs>
      </div>
      <div style={{ maxWidth: '500px', border: '1px solid black' }}>
        <p>6 items</p>
        <Breadcrumbs maxItems={5}>
          <BreadcrumbsItem href="/item" text="Item" />
          <BreadcrumbsItem href="/item" text="Another item" />
          <BreadcrumbsItem href="/item" text="A third item" />
          <BreadcrumbsItem href="/item" text="A fourth item with a very long name" />
          <BreadcrumbsItem href="/item" text="Item 5" />
          <BreadcrumbsItem href="/item" text="A sixth item" />
        </Breadcrumbs>
      </div>
    </div>
  ), { imports });
