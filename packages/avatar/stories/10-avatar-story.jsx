import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import ArrowDown from '@atlaskit/icon/glyph/arrow-down';
import ArrowUp from '@atlaskit/icon/glyph/arrow-up';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Lozenge from '@atlaskit/lozenge';
import { akColorPrimary1, akColorPrimary2, akColorPrimary3, akColorN20 } from '@atlaskit/util-shared-styles';

import { name } from '../package.json';
import Avatar, { AvatarGroup, AvatarItem } from '../src';
import { omit } from '../src/utils';
import nucleusImage from './nucleus.png';
import { AvatarCol, AvatarRow, DivPresence, Note, Wrapper } from './styled';
import { AVATAR_SIZES } from '../src/styled/constants';

const avatarSource = 'https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg';
const { default: TickSvg } = require('./tick.svg');

const devs = [
  { title: 'Alexander Reardon', subtitle: 'ace ace ace ace ace ace ace ace ace ace ace', src: 'https://avatar-cdn.atlassian.com/ceb2ee0a81dc0bb0b6f2892c66181b51?by=hash' },
  { title: 'Ben Conolly', src: 'https://avatar-cdn.atlassian.com/361c9fe594d27796d579a5900d7a765c?by=hash' },
  { title: 'Ben Gummer', subtitle: 'out until 5 July (US)', src: 'https://avatar-cdn.atlassian.com/65c42d1b35bbd5d3edd6e4628027275c?by=hash' },
  { title: 'Jacob Bass', src: 'https://avatar-cdn.atlassian.com/23bf3965bcb00e15e48908687e90419e?by=hash' },
  { title: 'James Kyle', src: 'https://avatar-cdn.atlassian.com/c2bcaff3dc41e72301368924196adad6?by=hash' },
  { title: 'Jared Crowe', src: 'https://avatar-cdn.atlassian.com/9a003c3897c4b769c18abae437204507?by=hash' },
  { title: 'Jed Watson', subtitle: 'Kitting out Atlas', src: 'https://avatar-cdn.atlassian.com/791dc88853c2dd7b2693d977de31b53a?by=hash' },
  { title: 'Jony Cheung', src: 'https://avatar-cdn.atlassian.com/7c19f799bf78ea9f97c89aa0ec62ca0d?by=hash' },
  { title: 'Joss Mackison', src: 'https://avatar-cdn.atlassian.com/849f17e34ace97d01d8184771e27efe7?by=hash' },
  { title: 'Kayla Cannon', subtitle: 'http://bit.ly/2sYNS88', src: 'https://avatar-cdn.atlassian.com/7506e9142b25fad708a16cb585703ec7?by=hash' },
  { title: 'Luke Batchelor', subtitle: '🚧 Under constuction 🚧', src: 'https://avatar-cdn.atlassian.com/5fefa7445084843da28a69c9c9d6185a?by=hash' },
  { title: 'Sean Curtis', src: 'https://avatar-cdn.atlassian.com/9eb5608b37f10cf029376e8866c54906?by=hash' },
  { title: 'Trey Shugart', src: 'https://avatar-cdn.atlassian.com/3275fbebf5306aba3b716c2b1abb1d29?by=hash' },
];
function getPresence() {
  const chance = Math.random();
  switch (true) {
    case chance < 0.25: return 'busy';
    case chance < 0.5: return 'online';
    default: return 'offline';
  }
}

const New = () => (
  <span style={{ position: 'relative', top: '-0.4em' }}>
    <Lozenge appearance="new" isBold>New</Lozenge>
  </span>
);
const Updated = () => (
  <span style={{ position: 'relative', top: '-0.4em' }}>
    <Lozenge appearance="moved">Updated</Lozenge>
  </span>
);
const HR = () => (
  <div style={{ border: 0, borderTop: '1px solid #ccc', marginBottom: '1em', marginTop: '1em' }} />
);
const DefaultAvatar = props => <AvatarCol><Avatar {...props} /></AvatarCol>;
const SquareAvatar = props => <DefaultAvatar appearance="square" {...props} />;
const AvatarShowcase = ({ children, description, title }) => (
  <div style={{ alignItems: 'center', display: 'flex', marginBottom: '1em' }}>
    <div style={{ marginRight: '1em' }}>
      {children}
    </div>
    <div style={{ flex: 1 }}>
      <h5>{title}</h5>
      <Note>{description}</Note>
    </div>
  </div>
);
const AllAvatarSizes = (props) => {
  // avoid warnings from invalid sizes
  const modifiedProps = omit(props, 'presence', 'status');
  return (
    <AvatarRow>
      <DefaultAvatar size="xxlarge" {...modifiedProps} />
      <DefaultAvatar size="xlarge" {...props} />
      <DefaultAvatar size="large" {...props} />
      <DefaultAvatar size="medium" {...props} />
      <DefaultAvatar size="small" {...props} />
      <DefaultAvatar size="xsmall" {...modifiedProps} />
    </AvatarRow>
  );
};

storiesOf(name, module)
  // .add('Stress Test', () => {
  //   const arr = [];
  //   for (let i = 0; i < 100; i++) {
  //     arr.push(<Avatar key={i} src={`https://api.adorable.io/avatars/40/${i}@adorable.png`} />);
  //   }
  //
  //   return <Wrapper>{arr}</Wrapper>;
  // })
  .add('Circle Avatars', () => (
    <Wrapper>
      <h5>Default <Updated /></h5>
      <Note>&quot;medium&quot; size &mdash; no &quot;presence&quot;, or &quot;status&quot;</Note>
      <Avatar />

      <HR />
      <h2>Presence</h2>

      <h5>Presence Types</h5>
      <Note>Supports &quot;busy&quot;, &quot;offline&quot;, and &quot;online&quot;</Note>
      <AvatarRow>
        <DefaultAvatar src={avatarSource} size="large" />
        <DefaultAvatar src={avatarSource} size="large" presence="busy" />
        <DefaultAvatar src={avatarSource} size="large" presence="offline" />
        <DefaultAvatar src={avatarSource} size="large" presence="online" />
      </AvatarRow>

      <h5>All Sizes with Presence</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Presence</Note>
      <AllAvatarSizes src={avatarSource} presence="online" />

      <HR />
      <h2>Status <New /></h2>

      <h5>Status Types</h5>
      <Note>Supports &quot;approved&quot;, &quot;declined&quot;, and &quot;locked&quot;</Note>
      <AvatarRow>
        <DefaultAvatar src={avatarSource} size="large" />
        <DefaultAvatar src={avatarSource} size="large" status="approved" />
        <DefaultAvatar src={avatarSource} size="large" status="declined" />
        <DefaultAvatar src={avatarSource} size="large" status="locked" />
      </AvatarRow>

      <h5>All Sizes with Status</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Status</Note>
      <AllAvatarSizes src={avatarSource} status="approved" />
    </Wrapper>
  ))
  .add('Square Avatars', () => (
    <Wrapper>
      <h5>Default <Updated /></h5>
      <Note>&quot;medium&quot; size &mdash; no &quot;presence&quot;, or &quot;status&quot;</Note>
      <AvatarRow>
        <SquareAvatar />
      </AvatarRow>

      <HR />
      <h2>Presence</h2>

      <h5>Presence Types</h5>
      <Note>Supports &quot;busy&quot;, &quot;offline&quot;, and &quot;online&quot;</Note>
      <AvatarRow>
        <SquareAvatar src={nucleusImage} size="large" />
        <SquareAvatar src={nucleusImage} size="large" presence="busy" />
        <SquareAvatar src={nucleusImage} size="large" presence="offline" />
        <SquareAvatar src={nucleusImage} size="large" presence="online" />
      </AvatarRow>

      <h5>All Sizes with Presence</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Presence</Note>
      <AllAvatarSizes appearance="square" presence="online" src={nucleusImage} />

      <HR />
      <h2>Status <New /></h2>

      <h5>Status Types</h5>
      <Note>Supports &quot;approved&quot;, &quot;declined&quot;, and &quot;locked&quot;</Note>
      <AvatarRow>
        <SquareAvatar src={nucleusImage} size="large" />
        <SquareAvatar src={nucleusImage} size="large" status="approved" />
        <SquareAvatar src={nucleusImage} size="large" status="declined" />
        <SquareAvatar src={nucleusImage} size="large" status="locked" />
      </AvatarRow>

      <h5>All Sizes with Status</h5>
      <Note>Sizes &quot;xsmall&quot; and &quot;xxlarge&quot; do NOT support Status</Note>
      <AllAvatarSizes
        appearance="square"
        status="approved"
        src={nucleusImage}
      />
    </Wrapper>
    ))
  .add('Coloured Backgrounds', () => {
    const colors = [akColorPrimary1, akColorPrimary2, akColorN20, akColorPrimary3];
    const presences = [null, 'online', 'offline', 'busy'];
    const statuses = [null, 'approved', 'locked', 'declined'];
    const styles = {
      column: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '0.5em 1em',
      },
      row: {
        alignItems: 'stretch',
        display: 'flex',
        height: 192,
        justifyContent: 'stretch',
        marginTop: '1em',
      },
    };
    const ColorColumn = props => (
      <div style={{ ...styles.column, backgroundColor: props.borderColor }}>
        <Avatar onClick={console.log} {...props} size="xlarge" />
        <Avatar onClick={console.log} {...props} />
      </div>
    );
    return (
      <Wrapper>
        <h2>Coloured Backgrounds <Updated /></h2>
        <Note>
          <p>
            The <code>presenceBorderColor</code> property is now <code>borderColor</code>
            which is consumed by {'<Avatar/>'} and passed on to {'<Presence/>'} and
            {' <Status/>'}.
          </p><p>
            Try clicking/tabbing on the avatars to see how the focus ring interacts with the
            background color.
          </p>
        </Note>
        <div style={styles.row}>
          {colors.map((c, i) => (
            <ColorColumn key={i} borderColor={c} src={avatarSource} presence={presences[i]} />
          ))}
        </div>
        <div style={styles.row}>
          {colors.map((c, i) => (
            <ColorColumn key={i} borderColor={c} src={nucleusImage} appearance="square" status={statuses[i]} />
          ))}
        </div>
      </Wrapper>
    );
  })
  .add('Interactive Avatars', () => {
    const stackSourceURLs = [];
    const avatarSize = 'large';

    for (let i = 0; i < 20; i++) stackSourceURLs.push(i);

    return (
      <Wrapper>
        <h2>Interactive Avatars <New /></h2>
        <Note size="large">
          For most instances you will no-longer need to wrap <code>{'<Avatar/>'}</code>.
        </Note>
        <AvatarShowcase title="Button" description={<span>Provide <code>onClick</code> to {'<Avatar/>'} or <code>onAvatarClick</code> to {'<AvatarGroup/>'}</span>}>
          <Avatar
            src={avatarSource}
            onClick={console.info}
            size={avatarSize}
          />
        </AvatarShowcase>

        <AvatarShowcase title="Anchor" description={<span>Provide <code>href</code> to {'<Avatar/>'}. Also, optionally accepts a <code>target</code> property.</span>}>
          <Avatar
            href="http://atlaskit.atlassian.com"
            src={avatarSource}
            size={avatarSize}
            target="_blank"
          />
        </AvatarShowcase>

        <AvatarShowcase title="Tooltip" description={<span>Provide <code>name</code> to {'<Avatar/>'}. Image receives alt-text and an aria-label, which describes the image to screenreaders.</span>}>
          <Avatar src={avatarSource} name="Bill Murray" size={avatarSize} />
        </AvatarShowcase>

        <HR />

        <h5>Avatar States</h5>
        <Note>All states handled internal, thought can also be provided as props.</Note>
        <AvatarShowcase title="Default" description="No state applied">
          <Avatar src={avatarSource} size="large" onClick={() => {}} label="default" />
        </AvatarShowcase>
        <AvatarShowcase title="isHover" description="akColorN70A applied as an overlay">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isHover />
        </AvatarShowcase>
        <AvatarShowcase title="isActive" description="akColorN70A applied as an overlay, and scaled down to 90%">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isActive />
        </AvatarShowcase>
        <AvatarShowcase title="isFocus" description="akColorB200 focus ring applied, border-width relative to avatar size">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isFocus />
        </AvatarShowcase>
        <AvatarShowcase title="isSelected" description="akColorN200A applied as an overlay">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isSelected />
        </AvatarShowcase>
        <AvatarShowcase title="isDisabled" description="70% white applied as an overlay">
          <Avatar src={avatarSource} size="large" onClick={() => {}} isDisabled />
        </AvatarShowcase>
      </Wrapper>
    );
  })
  .add('Avatar Group', () => {
    class AvatarGroupExample extends Component {
      state = { avatarCount: 20, avatarCountMax: 11, gridWidth: 220, mode: 'stack', sizeIndex: 3 }
      decrement = key => this.setState(state => ({ [key]: state[key] - 1 }))
      increment = key => this.setState(state => ({ [key]: state[key] + 1 }))
      render() {
        const { avatarCount, avatarCountMax, gridWidth, mode, sizeIndex } = this.state;
        const sizes = Object.keys(AVATAR_SIZES);
        const avatarSize = sizes[sizeIndex];

        const stackSourceURLs = [];
        for (let i = 0; i < avatarCount; i++) stackSourceURLs.push(i);

        return (
          <Wrapper>
            <h2>Avatar Group <New /></h2>
            <Note size="large">Click the excess indicator to see the remaining avatars in a dropdown menu.</Note>
            <div style={{ display: 'flex', marginTop: '1em' }}>
              <div style={{ flex: 1 }}>
                <h5 style={{ marginBottom: '0.5em' }}>Avatar Size: {avatarSize}</h5>
                <ButtonGroup>
                  <Button isDisabled={avatarSize === 'small'} onClick={() => this.decrement('sizeIndex')} iconBefore={<ArrowDown size="small" label="Smaller" />}>Smaller</Button>
                  <Button isDisabled={avatarSize === 'xlarge'} onClick={() => this.increment('sizeIndex')} iconBefore={<ArrowUp size="small" label="Larger" />}>Larger</Button>
                </ButtonGroup>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ marginBottom: '0.5em' }}>Avatar Count: {avatarCount}</h5>
                <ButtonGroup>
                  <Button isDisabled={avatarCount <= 1} onClick={() => this.decrement('avatarCount')} iconBefore={<ArrowDown size="small" label="Less" />}>Less</Button>
                  <Button isDisabled={avatarCount >= 30} onClick={() => this.increment('avatarCount')} iconBefore={<ArrowUp size="small" label="More" />}>More</Button>
                </ButtonGroup>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ marginBottom: '0.5em' }}>Grid Max: {avatarCountMax}</h5>
                <ButtonGroup>
                  <Button isDisabled={avatarCountMax <= 1} onClick={() => this.decrement('avatarCountMax')} iconBefore={<ArrowDown size="small" label="Less" />}>Less</Button>
                  <Button isDisabled={avatarCountMax >= 30} onClick={() => this.increment('avatarCountMax')} iconBefore={<ArrowUp size="small" label="More" />}>More</Button>
                </ButtonGroup>
              </div>
            </div>
            <h5>Grid</h5>
            <Note>
              Total {stackSourceURLs.length} / Max {avatarCountMax}
            </Note>
            <input
              min="200"
              max="500"
              onChange={e => this.setState({ gridWidth: parseInt(e.target.value, 10) })}
              step="10"
              title="Grid Width"
              type="range"
              value={gridWidth}
            />
            <div style={{ maxWidth: gridWidth, position: 'relative' }}>
              <AvatarGroup
                appearance="grid"
                onAvatarClick={console.log}
                data={stackSourceURLs.map(i => ({
                  key: i,
                  name: `Grid Avatar ${i + 1}`,
                  src: avatarSource,
                }))}
                maxCount={avatarCountMax}
                size={avatarSize}
              />
              <span style={{ borderLeft: '1px solid #ccc', paddingLeft: '1em', fontSize: 11, position: 'absolute', right: 0, top: 0, color: '#999', transform: 'translateX(100%)' }}>
                {gridWidth}px
              </span>
            </div>
            <h5>Stack</h5>
            <Note>Total {stackSourceURLs.length} / Max 5</Note>
            <AvatarGroup
              onAvatarClick={console.log}
              data={stackSourceURLs.map(i => ({
                key: i,
                name: `Stack Avatar ${i + 1}`,
                src: avatarSource,
              }))}
              size={avatarSize}
            />

            <HR />
            <h5>On {'"More"'} Click</h5>
            <div style={{ maxWidth: 380 }}>
              <Note>Circumvent the default dropdown menu behaviour by passing <code>onMoreClick</code> to <code>{'<AvatarGroup />'}</code> and handle the event however you want.</Note>
              <AvatarGroup
                onMoreClick={() => this.setState({ mode: 'grid' })}
                appearance={mode}
                maxCount={mode === 'grid' ? avatarCount : 0}
                data={stackSourceURLs.map(i => ({
                  key: i,
                  name: `Stack Avatar ${i + 1}`,
                  src: avatarSource,
                }))}
                size={avatarSize}
              />
              {mode === 'grid' ? (
                <button onClick={() => this.setState({ mode: 'stack' })}>
                  reset
                </button>
              ) : null}
            </div>
          </Wrapper>
        );
      }
    }
    return <AvatarGroupExample />;
  })
  .add('Avatar Item', () => (
    <Wrapper>
      <h2>Avatar Item <New /></h2>
      <Note>
        <p>Preformatted item to fulfil a common pattern. Accepts an <code>{'<Avatar/>'}</code>, <code>primaryText</code> and <code>secondaryText</code>.</p>
        <p>Handles mouse and keyboard events when passed <code>href</code> or <code>onClick</code> props to maintain pseudo-state.{''}</p>
      </Note>
      {devs.map((d, i) => (
        <AvatarItem
          avatar={<Avatar src={d.src} presence={getPresence()} />}
          key={i}
          onClick={console.log}
          primaryText={d.title}
          secondaryText={d.subtitle}
        />
      ))}
    </Wrapper>
  ))
  .add('Loading an Image', () => {
    function getInitialState() {
      return {
        inputValue: 'https://pbs.twimg.com/profile_images/568401563538841600/2eTVtXXO_400x400.jpeg',
        imageUrl: '',
      };
    }
    const Btn = props => <button type="button" style={{ marginLeft: 5 }} {...props} />;

    // eslint-disable-next-line react/no-multi-comp
    class ExternalSrcAvatar extends React.PureComponent {
      state = getInitialState()
      changeUrl = event => this.setState({ inputValue: event.target.value })
      loadImage = (event) => {
        event.preventDefault();
        this.setState({ imageUrl: this.state.inputValue });
      }
      resetState = () => this.setState(getInitialState)
      render() {
        const { inputValue, imageUrl } = this.state;
        let avatarName = 'Default Avatar';
        if (imageUrl === getInitialState().inputValue) avatarName = 'Mike Cannon-Brookes';
        else if (imageUrl.length) avatarName = 'Custom Avatar';

        return (
          <form onSubmit={this.loadImage}>
            <div style={{ display: 'flex', marginBottom: '10px', marginTop: '10px' }}>
              <input
                onChange={this.changeUrl}
                style={{ flex: 1 }}
                type="text"
                value={inputValue}
              />
              <Btn type="submit">Load Image</Btn>
              <Btn onClick={this.resetState}>Reset</Btn>
            </div>
            <Avatar
              name={avatarName}
              size="xlarge"
              src={imageUrl}
            />
          </form>
        );
      }
    }

    return (
      <Wrapper>
        <h5>Loading an Image</h5>
        <Note>Try pasting a URL to see the loading behaviour:</Note>
        <ExternalSrcAvatar />
      </Wrapper>
    );
  })
  .add('Custom Presence', () => (
    <Wrapper>
      <h2>Custom Presence</h2>
      <Note size="large">
        Provide a react element to the <code>presence</code> property
      </Note>
      <h5>Image</h5>
      <Note>Using an image as the presence</Note>
      <AllAvatarSizes
        presence={<TickSvg role="presentation" style={{ height: '100%', width: '100%' }} />}
      />
      <HR />
      <h5>Div on Circle</h5>
      <Note>This example shows using a styled div as a presence.</Note>
      <AllAvatarSizes
        presence={<DivPresence>1</DivPresence>}
      />
      <HR />
      <h5>Div on Square</h5>
      <Note>This example shows using a styled div as a presence on a square avatar.</Note>
      <AllAvatarSizes
        appearance="square"
        presence={<DivPresence>1</DivPresence>}
      />
    </Wrapper>
  ));
