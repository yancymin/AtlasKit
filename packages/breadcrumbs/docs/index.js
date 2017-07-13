import React from 'react';
import styled from 'styled-components';

/* eslint-disable import/no-duplicates, import/first */
import BreadcrumbsExample from './BreadcrumbsExample';
import breadcrumbsExampleSrc from '!raw-loader!./BreadcrumbsExample';
import BreadcrumbsExpand from './BreadcrumbsExpand';
import breadcrumbsExpandSrc from '!raw-loader!./BreadcrumbsExpand';
/* eslint-enable import/no-duplicates, import/first */

const Usage = styled.pre`
  background-color: #F4F5F7;
  border-radius: 5px;
  margin: 14px 0;
  padding: 8px;
`;

export const description = (
  <div>
    <p>
      Breadcrumbs are used for nested navigation, with each item
      acting as a link. There is a stateful default export that handles expansion
      of the collapse view, and passes other props on to the stateless export.
    </p>
    <Usage>
      {"import { BreadcrumbsStateless, BreadcrumbsItem } from '@atlaskit/breadcrumbs';"}
    </Usage>
    <p>or:</p>
    <Usage>
      {"import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';"}
    </Usage>
    <p>
      <code>Breadcrumbs</code> or <code>BreadcrumbsStateless</code> are used as the wrapper
      component. <code>BreadcrumbsItem</code> is the rendering componet for each
      individual item in the list.
    </p>
    <p>
      An <code>BreadcrumbsStateless</code> component with no items will not be rendered.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Basic Usage',
    Component: BreadcrumbsExample,
    src: breadcrumbsExampleSrc,
  },
  {
    title: 'With maxItems Exceeded',
    Component: BreadcrumbsExpand,
    src: breadcrumbsExpandSrc,
  },
];
