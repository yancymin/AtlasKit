import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import Button from '@atlaskit/button';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import Flag, { FlagGroup } from '../../src';
import ExampleNavigation from './ExampleNavigation';
import { APPEARANCE_ENUM } from '../../src/shared-variables';

const appearanceItems = APPEARANCE_ENUM.values.map(val => (
  { name: val, value: val, label: val, defaultSelected: val === APPEARANCE_ENUM.defaultValue }
));

const descriptions = [
  'Marzipan croissant pie. Jelly beans gingerbread caramels brownie icing.',
  'Fruitcake topping wafer pie candy dragée sesame snaps cake. Cake cake cheesecake. Pie tiramisu carrot cake tart tart dessert cookie. Lemon drops cookie tootsie roll marzipan liquorice cotton candy brownie halvah.',
];

export default class AnimationDemo extends PureComponent {
  constructor() {
    super();
    this.createdFlagCount = 0;
    this.state = {
      chosenAppearance: APPEARANCE_ENUM.defaultValue,
      flags: [],
    };
  }

  componentDidMount() {
    this.addFlag();
  }

  randomDescription = () => descriptions[Math.floor(Math.random() * descriptions.length)];

  newFlag = (timeOffset = 0) => ({
    appearance: this.state.chosenAppearance,
    title: 'Whoa a new flag',
    description: this.randomDescription(),
    created: Date.now() - (timeOffset * 1000),
    key: this.createdFlagCount++,
  })

  addFlag = () => {
    const flags = this.state.flags.slice();
    flags.splice(0, 0, this.newFlag());
    this.setState({ flags });
  }

  flagDismissed = (flagId) => {
    action(`Flag.onDismissed fired for first Flag id "${flagId}"`)();
    this.setState({
      flags: this.state.flags.slice(1),
    });
  }

  render() {
    return (
      <div>
        <ExampleNavigation>
          <div>
            <p>Add some flags then try clicking the <em>Dismiss</em> icon.</p>
            <p>When a flag is dismissed, an event should be shown in the action logger panel.</p>
            <FieldRadioGroup
              items={appearanceItems}
              label="Pick your new flag appearance:"
              onRadioChange={(e) => {
                this.setState({ chosenAppearance: e.target.value });
              }}
            />
            <p>
              <Button
                appearance="primary"
                onClick={this.addFlag}
              >
                Add another flag
              </Button>
            </p>
          </div>
        </ExampleNavigation>
        <FlagGroup onDismissed={this.flagDismissed}>
          {
            this.state.flags.map(flag => (
              <Flag
                appearance={flag.appearance}
                actions={[
                  { content: 'Nice one!', onClick: action('Nice one!') },
                  { content: 'Not right now thanks', onClick: action('Not right now thanks') },
                ]}
                description={flag.description}
                icon={<SuccessIcon label="Success" />}
                id={flag.key}
                key={flag.key}
                title={`${flag.key}: ${flag.title}`}
              />
            ))
          }
        </FlagGroup>
      </div>
    );
  }
}
