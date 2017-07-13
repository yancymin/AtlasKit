import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import { MediaNodeProps } from './media';
import { MediaPluginState, mediaStateKey } from '../../plugins';
import { EditorView } from '../../prosemirror';

export interface MediaGroupNodeProps {
  view: EditorView;
}

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  padding: 0 0 8px 0;
  &&& ul {
    padding: 0;
  }
`;

export default class MediaGroupNode extends PureComponent<MediaGroupNodeProps, {}> {
  private mediaPluginState: MediaPluginState;
  private mediaNodesIds: string[];

  constructor(props) {
    super(props);

    this.mediaPluginState = mediaStateKey.getState(props.view.state);
    assert(this.mediaPluginState, 'Media is not enabled');
  }

  /**
   * Save all childNodes ids into "mediaNodesIds"
   */
  componentDidMount() {
    this.mediaNodesIds = this.getMediaNodesIds(this.props.children);
  }

  /**
   * Update "mediaNodesIds" and notify media plugin about removed nodes
   */
  componentWillReceiveProps(nextProps) {
    const newMediaNodesIds = this.getMediaNodesIds(nextProps.children);
    const removedNodesIds = this.mediaNodesIds.filter(id => newMediaNodesIds.indexOf(id) === -1);

    removedNodesIds.forEach(mediaNodeId => {
      this.mediaPluginState.handleMediaNodeOutsideRemove(mediaNodeId);
    });

    this.mediaNodesIds = newMediaNodesIds;
  }

  render() {
    return (
      <Wrapper>
        <FilmStripNavigator>{this.props.children}</FilmStripNavigator>
      </Wrapper>
    );
  }

  private getMediaNodesIds = (children: React.ReactNode): string[] => {
    return React.Children.map(children, (child: React.ReactElement<any>) => {
      return (child.props as MediaNodeProps).node.attrs.id;
    }) || [];
  }
}
