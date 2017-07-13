import React, { PureComponent } from 'react';
import Tag from '@atlaskit/tag';
import Group from '../src';

export default class EventedGroup extends PureComponent {

  static propTypes = {
    alignment: React.PropTypes.string,
    initialTags: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onRemove: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      alignment: this.props.alignment,
      allowRemoval: true,
      tags: this.props.initialTags,
    };
    this.onRemove = this.props.onRemove || (() => null);
  }

  handleChange = e => (this.setState({ allowRemoval: e.target.checked }));

  handleRemoveRequest = () => this.state.allowRemoval;

  handleRemoveComplete = (removedTagText) => {
    this.onRemove(removedTagText);
    const tags = this.state.tags.filter(text => text !== removedTagText);
    this.setState({ tags });
  }

  render() {
    const { alignment, allowRemoval, tags } = this.state;

    return (
      <div ref={g => (this.group = g)}>
        <input
          defaultChecked={allowRemoval}
          id="allow-remove"
          onChange={this.handleChange}
          type="checkbox"
        />
        <label htmlFor="allow-remove">Allow tag removal</label>
        <hr />
        <Group alignment={alignment}>
          {tags.map(text => (
            <Tag
              key={text}
              onAfterRemoveAction={this.handleRemoveComplete}
              onBeforeRemoveAction={this.handleRemoveRequest}
              removeButtonText={allowRemoval ? 'Remove me' : null}
              text={text}
            />
          ))}
        </Group>
      </div>
    );
  }
}
