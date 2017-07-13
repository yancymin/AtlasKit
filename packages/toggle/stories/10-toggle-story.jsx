import { storiesOf } from '@kadira/storybook';
import React from 'react';
import AkToggle from '../src';
import { name } from '../package.json';

const styles = {
  container: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  form: {
    backgroundColor: 'white',
    padding: 40,
    width: 500,
  },
  iframe: {
    backgroundColor: '#fafafa',
    border: '1px solid #eee',
    borderRadius: 4,
    height: 280,
    marginTop: 20,
    width: '100%',
  },
};

storiesOf(name, module)
  .add('with no properties', () =>
    <div style={styles.container}>
      <AkToggle label="wifi enabled" />
    </div>
  )
  .add('with large size', () =>
    <div style={styles.container}>
      <AkToggle label="wifi enabled" size="large" />
    </div>
  )
  .add('with checked state by default', () =>
    <div style={styles.container}>
      <AkToggle isDefaultChecked label="wifi enabled" />
    </div>
  )
  .add('with disabled state', () =>
    <div style={styles.container}>
      <AkToggle isDisabled />
      <AkToggle size="large" isDisabled />
      <AkToggle isDefaultChecked isDisabled />
      <AkToggle size="large" isDefaultChecked isDisabled />
    </div>
  )
  .add('within a form', () =>
    <div style={styles.container}>
      <form
        action={'//httpbin.org/get'}
        method="get"
        style={styles.form}
        target="myFrame"
      >
        <h2>Submit test</h2>
        <p>Note: Ensure that you are not using HTTPS for this story.</p>
        <AkToggle name="test1" value="1" label="option 1" />
        <AkToggle name="test2" value="foo" label="option 2" />
        <AkToggle isDisabled name="test3" value="123" label="option 3" />
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
      <iframe src="" name="myFrame" style={styles.iframe} />
    </div>
  );
