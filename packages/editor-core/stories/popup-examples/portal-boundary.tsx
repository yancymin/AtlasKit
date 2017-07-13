import * as React from 'react';
import { PureComponent } from 'react';
import Editor from './../editor';
import { Boundary } from './styles';

export class PortalWithCustomBoundaryExample extends PureComponent<any, any> {
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
      <div>
        <Boundary innerRef={this.handleBoundryRef}>
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
              popupsBoundariesElement={this.state.boundary}
              devTools={props.devTools}
            />
          </div>
        </Boundary>
        <div ref={this.handlePortalRef} />
      </div>
    );
  }
}
