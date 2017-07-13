import * as React from 'react';
import { PureComponent } from 'react';
import Editor from './../editor';

export class PortalExample extends PureComponent<any, any> {
  state = { portal: undefined };

  handleRef = (portal) => {
    this.setState({ portal });
  }

  render() {
    const props = this.props;

    return (
      <div>
        <div style={{overflow: 'hidden'}}>
          <Editor
            imageUploadHandler={props.imageUploadHandler}
            analyticsHandler={props.analyticsHandler}
            onCancel={props.onCancel}
            onSave={props.onSave}
            mentionProvider={props.mentionProvider}
            emojiProvider={props.emojiProvider}
            isExpandedByDefault={true}
            popupsMountPoint={this.state.portal}
            devTools={props.devTools}
          />
        </div>
        <div ref={this.handleRef} />
      </div>
    );
  }
}
