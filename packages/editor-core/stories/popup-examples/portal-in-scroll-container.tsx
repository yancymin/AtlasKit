import * as React from 'react';
import { PureComponent } from 'react';
import { akColorN40 } from 'akutil-shared-styles';
import Editor from './../editor';

export class PortalInScrollContainerExample extends PureComponent<any, any> {
  state = { portal: undefined, boundary: undefined };

  handlePortalRef = (portal) => {
    this.setState({ portal });
  }

  handleBoundryRef = (boundary) => {
    this.setState({ boundary });
  }

  render() {
    const props = this.props;

    return (
      <div
        style={{overflow: 'scroll', height: 200, position: 'relative', border: `1px solid ${akColorN40}` }}
        ref={this.handleBoundryRef}
      >
        <div style={{ minHeight: 500, width: '120%' }}>
          <Editor
            imageUploadHandler={props.imageUploadHandler}
            analyticsHandler={props.analyticsHandler}
            onCancel={props.onCancel}
            onSave={props.onSave}
            mentionProvider={props.mentionProvider}
            emojiProvider={props.emojiProvider}
            isExpandedByDefault={true}
            popupsMountPoint={this.state.portal}
            popupsBoundariesElement={this.state.boundary}
            devTools={props.devTools1}
          />
        </div>

        <div ref={this.handlePortalRef} />

        <Editor
          imageUploadHandler={props.imageUploadHandler}
          analyticsHandler={props.analyticsHandler}
          onCancel={props.onCancel}
          onSave={props.onSave}
          mentionProvider={props.mentionProvider}
          emojiProvider={props.emojiProvider}
          isExpandedByDefault={true}
          popupsMountPoint={this.state.portal}
          popupsBoundariesElement={this.state.boundary}
          devTools={props.devTools2}
        />
      </div>
    );
  }
}
