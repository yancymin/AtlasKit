import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import { Presence } from '../src';
import { Note, Wrapper } from './styled';

const styles = {
  container: {
    border: '1px dotted blue',
    display: 'flex',
    marginTop: '1em',
  },
  presenceWrapper: {
    height: 30,
    width: 30,
  },
};

storiesOf(name, module)
  .add('Presence', () => {
    class PresenceWidthExample extends Component {
      state = { width: 60 }
      decrement = key => this.setState(state => ({ [key]: state[key] - 1 }))
      increment = key => this.setState(state => ({ [key]: state[key] + 1 }))
      render() {
        const { width } = this.state;

        return (
          <Wrapper>
            <h5>Default Presence</h5>
            <Note>
              <p>
                By default presences will stretch to fill their parents. Try resizing the
                wrapping div below to see this in action.
              </p>
              <p>
                Therefore it is recommended to always have a wrapping div around presences when
                consuming them separately to Avatars.
              </p>
            </Note>
            <input
              min="10"
              max="130"
              onChange={e => this.setState({ width: parseInt(e.target.value, 10) })}
              step="10"
              title="Width"
              type="range"
              value={width}
            />
            <div style={{ maxWidth: width, border: '1px dotted blue' }}>
              <Presence presence="busy" />
            </div>
          </Wrapper>
        );
      }
    }
    return <PresenceWidthExample />;
  })
  .addCodeExampleStory('Presence: Custom Content', () => (
    <Wrapper>
      <h5>Custom Content</h5>
      <Note>
        <p>
          Aside from the default supported presences, you can also create custom presences
          by passing arbitrary HTML as children. This could be anything from
          an image, an SVG or even simply a styled div.
        </p>
        <p>
          For best results it is recommended that whatever you pass in is square and has
          its height and width set to 100%
        </p>
      </Note>
      <div style={styles.container}>

        <div style={styles.presenceWrapper}>
          <Presence presence="online" />
        </div>

        <div style={styles.presenceWrapper}>
          <Presence presence="busy" />
        </div>

        <div style={styles.presenceWrapper}>
          <Presence>
            <div style={{ height: '100%', width: '100%', backgroundColor: 'rebeccapurple' }} />
          </Presence>
        </div>

      </div>
    </Wrapper>
  ))
  .addCodeExampleStory('Presence: Border Color', () => (
    <Wrapper>
      <h5>Border Color</h5>
      <Note>
        <p>
          By default presences will display a white border. This can be overridden with the
          <code>borderColor</code> property.
        </p>
        <p>
          The <code>borderColor</code> property will accept any string that CSS
          border-color can e.g. hex, rgba, transparent, etc.
        </p>
      </Note>
      <div style={styles.container}>
        <div style={styles.presenceWrapper}>
          <Presence presence="online" />
        </div>

        <div style={styles.presenceWrapper}>
          <Presence presence="busy" borderColor="rebeccapurple" />
        </div>

        <div style={styles.presenceWrapper}>
          <Presence presence="offline" borderColor="rgba(0, 0, 255, 0.2)" />
        </div>

        <div style={styles.presenceWrapper}>
          <Presence presence="online" borderColor="transparent" />
        </div>
      </div>
    </Wrapper>
  ));
