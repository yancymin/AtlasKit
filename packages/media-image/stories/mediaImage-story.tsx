import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { Component } from 'react';
import FieldText from '@atlaskit/field-text';
import {MediaImage} from '../src';
import { name } from '../package.json';
import { genericFileId, defaultServiceHost, defaultClientId, defaultCollectionName, StoryBookTokenProvider } from '@atlaskit/media-test-helpers';

export interface WrapperProps {

}

export interface WrapperState {
  token: string;
  imageId: string;
  collectionName: string;
  clientId: string;
  serviceHost: string;
}

export class Wrapper extends Component<WrapperProps, WrapperState> {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      imageId: genericFileId.id,
      collectionName: defaultCollectionName,
      clientId: defaultClientId,
      serviceHost: defaultServiceHost
    };
  }

  componentDidMount() {
    StoryBookTokenProvider.tokenProvider(defaultCollectionName).then(token => {
      this.setState({token});
    });
  }

  onIdChange = (e) => {
    this.setState({
      imageId: e.target.value
    });
  }

  onCollectionChange = (e) => {
    this.setState({
      collectionName: e.target.value
    });
  }

  onTokenChange = (e) => {
    this.setState({
      token: e.target.value
    });
  }

  onClientIdChange = (e) => {
    this.setState({
      clientId: e.target.value
    });
  }

  onServiceHostChange = (e) => {
    this.setState({
      serviceHost: e.target.value
    });
  }

  render() {
    const {token, imageId, collectionName, clientId, serviceHost} = this.state;
    const apiConfig = {
      token,
      clientId,
      serviceHost
    };

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'center', borderBottom: '1px solid #ccc', padding: '10px', margin: '10px auto', width: '1000px'}}>
          <FieldText label="Image id" placeholder="Image id..." value={imageId} onChange={this.onIdChange} />
          <FieldText label="Collection name" placeholder="Collection name..." value={collectionName} onChange={this.onCollectionChange} />
          <FieldText label="Token" placeholder="Token..." value={token} onChange={this.onTokenChange} />
          <FieldText label="Client id" placeholder="Client id..." value={clientId} onChange={this.onClientIdChange} />
          <FieldText label="Service host" placeholder="Service host..." value={serviceHost} onChange={this.onServiceHostChange} />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <MediaImage
            id={imageId}
            mediaApiConfig={apiConfig}
            collectionName={collectionName}
            width={300}
          />
        </div>
      </div>
    );
  }
}

storiesOf(name, module)
  .add('Default', () => (
    <Wrapper />
  ));
