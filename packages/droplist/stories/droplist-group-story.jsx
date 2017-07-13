import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styles from './story-styles.less';

import { Group, Item } from '../src';
import { name } from '../package.json';

/* eslint-disable react/prop-types */
const GroupsWrapper = props => <div className={styles.storyesContainer}>{props.children}</div>;
const DropImitation = props => <div className={styles.itemsContainer}>{props.children}</div>;
/* eslint-enable react/prop-types */

storiesOf(`${name} - groups`, module)
  .add('simple groups with headings', () => (
    <GroupsWrapper>
      <DropImitation>
        <Group heading="Australia">
          <Item>Sydney</Item>
          <Item>Melbourne</Item>
          <Item>Perth</Item>
          <Item>Adelaide</Item>
          <Item>Canberra</Item>
        </Group>
        <Group heading="UK">
          <Item>London</Item>
          <Item>Cardiff</Item>
          <Item>Edinburgh</Item>
          <Item>Aberdeen</Item>
        </Group>
      </DropImitation>
    </GroupsWrapper>
  ))
  .add('simple group without heading', () => (
    <GroupsWrapper>
      <DropImitation>
        <Group>
          <Item>Sydney</Item>
          <Item>Melbourne</Item>
          <Item>Perth</Item>
          <Item>Adelaide</Item>
          <Item>Canberra</Item>
          <Item>London</Item>
          <Item>Cardiff</Item>
          <Item>Edinburgh</Item>
          <Item>Aberdeen</Item>
        </Group>
      </DropImitation>
    </GroupsWrapper>
  ))
  .add('groups with right space', () => (
    <GroupsWrapper>
      <DropImitation>
        <Group heading="Issue Actions" elemAfter={<div>123</div>}>
          <Item>Edit</Item>
          <Item>Assign</Item>
          <Item>Assign to me</Item>
          <Item>Comment</Item>
          <Item>Report as spam</Item>
        </Group>
        <Group heading="Workflow" elemAfter="AK-1405">
          <Item>Resolve</Item>
          <Item>Back in progress</Item>
        </Group>
      </DropImitation>
    </GroupsWrapper>
  ));

