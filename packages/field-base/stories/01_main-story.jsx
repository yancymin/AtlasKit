import React from 'react';
import { storiesOf } from '@kadira/storybook';
import uid from 'uid';
import Input from '@atlaskit/input';
import Button from '@atlaskit/button';
import Avatar from '@atlaskit/avatar';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import HelpIcon from '@atlaskit/icon/glyph/help';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import BasicFieldBase from './BasicFieldBase';
import RightGutterFieldBase from './RightGutterFieldBase';
import Calendar from '@atlaskit/calendar';
import { name } from '../package.json';
import FieldBase, { Label } from '../src';

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
  display: 'flex',
  flexDirection: 'column',
};

storiesOf(name, module)
  .add('with label', () =>
    <div>
      <div>
        <BasicFieldBase
          label="basic example for form"
          id="fieldbase"
        >
          <Input
            value="input children"
            isEditing
            id="fieldbase"
          />
        </BasicFieldBase>
      </div>
      <div>
        <BasicFieldBase
          label="basic example for form"
          id="fieldbase2"
        >
          <Input
            value="input children"
            isEditing
            id="fieldbase2"
          />
        </BasicFieldBase>
      </div>
    </div>
  )
  .add('for inline edit', () =>
    <BasicFieldBase
      label="basic example for inline edit"
      id="fieldbase"
      labelAppearance="inline-edit"
    >
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    </BasicFieldBase>
  )
  .add('without label', () => (
    <BasicFieldBase
      label="No label example"
      isLabelHidden
      id="fieldbase"
    >
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    </BasicFieldBase>
  ))
  .add('with invalid prop', () =>
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <BasicFieldBase
        label="Invalid example"
        id="fieldbase"
        isInvalid
      >
        <Input
          value="input children"
          isEditing
          id="fieldbase"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="Invalid + compact example"
        id="fieldbase"
        isCompact
        isInvalid
      >
        <Input
          id="fieldbase"
          isEditing
          value="input children"
        />
      </BasicFieldBase>
    </div>
  )
  .add('with invalidMessage prop', () =>
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <BasicFieldBase
        label="Focus the field to display the warning message"
        id="fieldbase"
        isInvalid
        invalidMessage="This warning dialog should open when the field is focused"
        defaultIsDialogOpen
      >
        <Input
          isEditing
          id="fieldbase"
          value="Normal field"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="Focus the field to display the warning message"
        id="fieldbase"
        isCompact
        isInvalid
        invalidMessage={<span>
          A message containing a <a href="//atlassian.com">link</a>,
          a <a href="//design.atlassian.com">second link</a>,
          and a <a href="//developer.atlassian.com">third link</a>.</span>}
      >
        <Input
          id="fieldbase"
          isEditing
          value="Compact field"
        />
      </BasicFieldBase>
    </div>
  )
  .add('with spinner', () => {
    const input = (
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    );

    return (
      <div style={{ display: 'flex', 'flex-direction': 'column' }}>
        <BasicFieldBase
          label="Spinner example"
          id="fieldbase"
          isLoading
        >
          {input}
        </BasicFieldBase>
        <BasicFieldBase
          label="Invalid over spinner example"
          id="fieldbase"
          isLoading
          isInvalid
        >
          {input}
        </BasicFieldBase>
        <BasicFieldBase
          label="Spinner + compact example"
          id="fieldbase"
          isCompact
          isLoading
        >
          {input}
        </BasicFieldBase>
        <BasicFieldBase
          label="Spinner + compact + disabled example"
          id="fieldbase"
          isLoading
          isCompact
          isDisabled
        >
          {input}
        </BasicFieldBase>
      </div>
    );
  })
  .add('with required prop', () =>
    <form style={formStyle}>
      <BasicFieldBase
        label="Required example"
        id="fieldbase"
        isRequired
      >
        <Input
          isEditing
          id="fieldbase"
          required
        />
      </BasicFieldBase>
      <div style={{ padding: 20, paddingTop: 0 }}>
        <button type="submit">submit</button>
      </div>
    </form>
  )
  .add('with disabled prop', () =>
    <div style={{ display: 'flex', 'flex-direction': 'column' }}>
      <BasicFieldBase
        label="Disabled example"
        id="fieldbase"
        isDisabled
      >
        <Input
          id="fieldbase"
          value="input children"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="Disabled + invalid example (should not show an icon)"
        id="fieldbase"
        isInvalid
        isDisabled
      >
        <Input
          id="fieldbase"
          value="input children"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="Disabled + compact example"
        id="fieldbase"
        isCompact
        isDisabled
      >
        <Input
          id="fieldbase"
          value="input children"
        />
      </BasicFieldBase>
    </div>
  )
  .add('with readOnly prop', () =>
    <BasicFieldBase
      label="Read Only example"
      id="fieldbase"
      isReadOnly
    >
      <Input
        id="fieldbase"
        value="input children"
      />
    </BasicFieldBase>
  )
  .add('with compact prop', () =>
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <BasicFieldBase
        label="Compact example"
        id="fieldbase"
        isCompact
      >
        <Input
          id="fieldbase"
          value="input children"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="Compact + subtle example"
        id="fieldbase"
        isCompact
        appearance="subtle"
      >
        <Input
          id="fieldbase"
          value="input children"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="Compact + none example"
        id="fieldbase"
        isCompact
        appearance="none"
      >
        <Input
          id="fieldbase"
          value="input children"
        />
      </BasicFieldBase>
    </div>
  )
  .add('with different appearances', () =>
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {
        [
          'subtle',
          'none',
        ].map((appearance) => {
          const id = uid();
          return (
            <BasicFieldBase
              label={`${appearance} appearance example`}
              id={id}
              appearance={appearance}
            >
              <Input
                id={id}
                isEditing
                value="input children"
              />
            </BasicFieldBase>
          );
        })
      }
    </div>
  )
  .add('with a custom view (disabled padding)', () =>
    <div style={{ display: 'inline-block', padding: 20 }}>
      <Label label="With a dropdown" />
      <div>
        <FieldBase
          isPaddingDisabled
        >
          <Button
            iconAfter={<ExpandIcon />}
          >
            Imagine a Dropdown
          </Button>
        </FieldBase>
      </div>

      <Label label="With a dropdown and an invalid icon" />
      <div>
        <FieldBase
          isPaddingDisabled
          isInvalid
        >
          <Button
            iconAfter={<ExpandIcon />}
          >
            Imagine a Dropdown
          </Button>
        </FieldBase>
      </div>

      <Label label="With a tall editor" />
      <div>
        <FieldBase
          isPaddingDisabled
        >
          <Calendar />
        </FieldBase>
      </div>

      <Label label="With a tall editor and an invalid icon" />
      <div>
        <FieldBase
          isPaddingDisabled
          isInvalid
        >
          <Calendar />
        </FieldBase>
      </div>
    </div>
  )
  .add('with avatar + text', () => (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        display: 'inline-block',
      }}
    >
      <Label
        label="Avatar example"
      >
        <div style={{ backgroundColor: 'white' }}>
          <FieldBase>
            <Avatar
              src="https://cdn-img.fimfiction.net/user/xb2v-1431833233-195398-64"
              size="small"
            />
            <span style={{ marginLeft: 8 }}>Jack Sparrow</span>
          </FieldBase>
        </div>
      </Label>
    </div>
  ))
  .add('with different content', () => {
    const longTextWithSpaces = `According to all known laws of aviation, there is no way a bee
      should be able to fly. Its wings are too small to get its fat little body off the ground.
      The bee, of course, flies anyway because bees don't care what humans think is impossible.`;
    const longTextNoSpaces = '3.1415926535897932384626433832795028841971693993751058209749445923' +
      '07816406286208998628034825342117067982148086513282306647093844609550582231725359408128481' +
      '11745028410270193852110555964462294895493038196442881097566593344612847564';
    const smallBoxStyles = {
      height: '5px',
      width: '5px',
      border: '1px solid',
      boxSizing: 'border-box',
    };
    return (
      <div style={formStyle}>
        <Label label="Lots of text (with whitespace)">
          <FieldBase>
            <div>{longTextWithSpaces}</div>
          </FieldBase>
        </Label>
        <Label label="Lots of text (no whitespace)">
          <FieldBase>
            <div style={{ overflow: 'hidden' }}>
              {longTextNoSpaces}
            </div>
          </FieldBase>
        </Label>
        <Label label="Small non-textual content (5x5 div)">
          <FieldBase>
            <div><div style={smallBoxStyles} /></div>
          </FieldBase>
        </Label>
        <div style={{ display: 'inline-flex' }}>
          <Label label="With a max-width">
            <FieldBase>
              <Input
                isEditing
                value="a children input"
                style={{ maxWidth: '200em' }}
              />
            </FieldBase>
          </Label>
        </div>
        <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
          <Label label="With fit width enabled" htmlFor="fieldbase" />
          <FieldBase isFitContainerWidthEnabled>
            <Input
              id="fieldbase"
              isEditing
              value="a children input"
            />
          </FieldBase>
        </div>
      </div>
    );
  })
  .add('with right gutter + fit width enabled', () =>
    <div style={{ ...formStyle, border: '2px solid', padding: 0 }}>
      <span>500px width container</span>
      <RightGutterFieldBase
        label="With subtle button"
        rightGutter={<Button appearance="subtle">Cancel</Button>}
      />
      <RightGutterFieldBase
        label="With button + icon"
        rightGutter={<Button iconBefore={<HelpIcon />} />}
      />
      <RightGutterFieldBase
        label="With only icon"
        rightGutter={<div style={{ color: '#bf2600' }}><ErrorIcon /></div>}
      />
      <RightGutterFieldBase
        label="With only icon"
        rightGutter="important"
      />
    </div>
  )
  .add('when it`s the first element of a form', () =>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BasicFieldBase
        id="fieldbase"
        isFirstChild
        isFitContainerWidthEnabled
        label="basic example for form"
        disablePadding
      >
        <Input
          value="input children"
          isEditing
          id="fieldbase"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="basic example for form"
        id="fieldbase"
        isFitContainerWidthEnabled
        disablePadding
      >
        <Input
          value="input children"
          isEditing
          id="fieldbase"
        />
      </BasicFieldBase>
      <BasicFieldBase
        label="basic example for form"
        id="fieldbase"
        isFitContainerWidthEnabled
        disablePadding
      >
        <Input
          value="input children"
          isEditing
          id="fieldbase"
        />
      </BasicFieldBase>
    </div>
  );
