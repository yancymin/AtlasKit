import { storiesOf } from '@kadira/storybook'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

import styles from './styles.less';
import { name } from '../package.json';
import AKLayer from '../src';
import ExampleAlignment from './ExampleAlignment';

const AllAlignments = props => (<div className={styles.storyRoot}>
  <div style={{ width: '200vw', border: '1px solid' }}>
    This div is here to give us horizontal scrolling
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="left top" />
    <ExampleAlignment {...props} position="left middle" />
    <ExampleAlignment {...props} position="left bottom" />
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="right top" />
    <ExampleAlignment {...props} position="right middle" />
    <ExampleAlignment {...props} position="right bottom" />
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="top left" />
    <ExampleAlignment {...props} position="top center" />
    <ExampleAlignment {...props} position="top right" />
  </div>

  <div className={styles.flexRow}>
    <ExampleAlignment {...props} position="bottom left" />
    <ExampleAlignment {...props} position="bottom center" />
    <ExampleAlignment {...props} position="bottom right" />
  </div>
</div>);

const layerStyles = {
  background: 'green',
  padding: '5px',
};

storiesOf(name, module)
  .add('Simple Layer story', () => {
    const targetStyle = {
      display: 'inline-block',
      position: 'absolute',
      top: '100px',
      left: '150px',
      background: 'red',
      padding: '50px',
    };
    const content = <div style={layerStyles}>LayerContent</div>;
    return (
      <div>
        <AKLayer content={content} position="right bottom">
          <div style={targetStyle}>Target</div>
        </AKLayer>
        <div>Drag the left side bar over until the LayerContent reaches the edge of the screen</div>
      </div>
    );
  })
  .add('Alignments', () => (
    <div style={{ height: '100%' }}>
      <AllAlignments />
      <div>Foo</div>
    </div>
  ))
  .add('Alignments flipping disabled', () => (
    <div style={{ height: '100%' }}>
      <AllAlignments autoFlip={false} />
      <div>Foo</div>
    </div>
  ))
  .add('Layer with custom flip order', () => {
    const targetStyle = {
      display: 'inline-block',
      position: 'relative',
      top: '100px',
      left: '150px',
      background: 'red',
      padding: '50px',
    };

    const content = <div style={layerStyles}>LayerContent</div>;
    return (
      <div>
        <p>
          Layer with position=&quot;right middle&quot; and
          autoFlip=[&quot;top&quot;, &quot;left&quot;, &quot;bottom&quot;].
        </p>
        <p>
          This layer will try to position itself on the right. If there is no space, it will try
          to position itself at each of the positions specified in autoFlip, in order, until
          it fits.
        </p>
        <p>Scroll the red box to the sides of the container to flip the green box.</p>
        <div style={{ border: '1px solid black', height: '300px', width: '300px', overflow: 'scroll' }}>
          <div style={{ width: '500px', height: '500px' }}>
            <AKLayer
              content={content}
              position="right middle"
              autoFlip={['top', 'left', 'bottom']}
              boundariesElement="scrollParent"
            >
              <div style={targetStyle}>Target</div>
            </AKLayer>
          </div>
        </div>
      </div>

    );
  });
