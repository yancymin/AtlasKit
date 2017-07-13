import { storiesOf } from '@kadira/storybook';
import React from 'react';

import styles from './styles.less';
import Tag from '../src/index';
import { name } from '../package.json';

const MyTag = props => (
  <Tag
    {...props}
  />
);

const cupcakeipsum = 'Croissant topping tiramisu gummi bears. Bonbon chocolate bar danish soufflé';
const imports = [
  ['React', 'react'],
  ['Tag', '@atlaskit/tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('text: simple', () => <MyTag text="Marshmallow" />, { imports })
  .addCodeExampleStory('text: maximum length (ellipsis)', () => (
    <table>
      <tbody>
        <tr>
          <th className={styles.headers}>Full text</th>
          <td>{cupcakeipsum}</td>
        </tr>
        <tr>
          <th className={styles.headers}>Text</th>
          <td>
            <MyTag text={cupcakeipsum} />
          </td>
        </tr>
        <tr>
          <th className={styles.headers}>Linked</th>
          <td>
            <MyTag
              text={cupcakeipsum}
              href="http://www.cupcakeipsum.com/"
            />
          </td>
        </tr>
        <tr>
          <th className={styles.headers}>Removable</th>
          <td>
            <MyTag
              text={cupcakeipsum}
              removeButtonText="No sweets for you!"
            />
          </td>
        </tr>
        <tr>
          <th className={styles.headers}>Removable & linked</th>
          <td>
            <MyTag
              text={cupcakeipsum}
              removeButtonText="No sweets for you!"
              href="http://www.cupcakeipsum.com/"
            />
          </td>
        </tr>
      </tbody>
    </table>
  ), { imports })
  .addBaselineAligned('baseline alignment', () => (
    <MyTag
      text={cupcakeipsum}
      removeButtonText="No sweets for you!"
      href="http://www.cupcakeipsum.com/"
    />
  ), { imports });
