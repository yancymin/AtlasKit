import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import * as Perf from 'react-addons-perf';
import Layer from '@atlaskit/layer';
import EmojiPicker from '../src/components/picker/EmojiPicker';
import { name } from '../package.json';
import { getEmojiResource } from './story-data';

export interface PerformanceWrapperProps {
  children?: ReactNode;
}

class PerformanceWrapper extends PureComponent<PerformanceWrapperProps, {}> {
  private handleStartClick = () => { Perf.start(); };
  private handleStopClick = () => { Perf.stop(); };
  private handlePrintInclusiveClick = () => { Perf.printInclusive(Perf.getLastMeasurements()); };
  private handlePrintExclusiveClick = () => { Perf.printExclusive(Perf.getLastMeasurements()); };
  private handlePrintWastedClick = () => { Perf.printWasted(Perf.getLastMeasurements()); };
  private handlePrintOperationsClick = () => { Perf.printOperations(Perf.getLastMeasurements()); };

  render() {
    return (
      <div>
        {this.props.children}
        <hr/>
        <div>
          <h3>Peformance tools: see console for output. (Only supported in react dev mode)</h3>
          <p>
            <button onClick={this.handleStartClick}>Start recording</button>
            <button onClick={this.handleStopClick}>Stop recording</button>
            <button onClick={this.handlePrintInclusiveClick}>Print Inclusive</button>
            <button onClick={this.handlePrintExclusiveClick}>Print Exclusive</button>
            <button onClick={this.handlePrintWastedClick}>Print Wasted</button>
            <button onClick={this.handlePrintOperationsClick}>Print Operations</button>
          </p>
        </div>
      </div>
    );
  }
}

storiesOf(`${name}/Emoji React Performance`, module)
  .add('picker popup', () => (
    <div style={{ padding: '10px' }} >
        <PerformanceWrapper>
          <Layer
            content={
              <EmojiPicker
                emojiProvider={getEmojiResource()}
                onSelection={action('emoji selected')}
              />
            }
            position="bottom left"
          >
          <input
            id="picker-input"
            style={{
              height: '20px',
              margin: '10px',
            }}
          />
          </Layer>
        </PerformanceWrapper>
    </div>
  ));
