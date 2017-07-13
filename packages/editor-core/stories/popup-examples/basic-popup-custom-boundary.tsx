import * as React from 'react';
import { PureComponent } from 'react';
import Editor from './../editor';
import { Boundary } from './styles';

export class CustomBoundryExample extends PureComponent<any, any> {
  state = { boundary: undefined };

  handleBoundryRef = (boundary) => {
    this.setState({ boundary });
  }

  render() {
    const props = this.props;

    return (
      <Boundary innerRef={this.handleBoundryRef}>
        <Editor
          imageUploadHandler={props.imageUploadHandler}
          analyticsHandler={props.analyticsHandler}
          onCancel={props.onCancel}
          onSave={props.onSave}
          mentionProvider={props.mentionProvider}
          emojiProvider={props.emojiProvider}
          isExpandedByDefault={true}
          popupsBoundariesElement={this.state.boundary}
          devTools={props.devTools}
        />
      </Boundary>
    );
  }
}
