import * as React from 'react';
import { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import {
  StoryList,
  Matrix,
  createStorybookContext,
  defaultCollectionName as collectionName,
  videoUrlPreviewId,
  audioUrlPreviewId,
  imageUrlPreviewId,
  docUrlPreviewId,
  unknownUrlPreviewId,
  genericUrlPreviewId,
  youTubeUrlPreviewId,
  spotifyUrlPreviewId,
  soundcloudUrlPreviewId,
  publicTrelloBoardUrlPreviewId,
  privateTrelloBoardUrlPreviewId,
  errorLinkId,
  videoFileId,
  audioFileId,
  imageFileId,
  docFileId,
  unknownFileId,
  smallImageFileId,
  wideImageFileId,
  largeImageFileId,
  errorFileId
} from '@atlaskit/media-test-helpers';

import { Card, UrlPreviewIdentifier, MediaIdentifier, Identifier, CardAppearance, CardEvent, OnSelectChangeFuncResult } from '../src';
import { SelectableCard } from './utils/selectableCard';

const context = createStorybookContext();

const clickHandler = (result: CardEvent) => {
  result.event.preventDefault();
  action('click')(result.mediaItemDetails);
};

const mouseEnterHandler = (result: CardEvent) => {
  result.event.preventDefault();
  action('mouseEnter')(result.mediaItemDetails);
};

const onSelectChangeHandler = (result: OnSelectChangeFuncResult) => {
  action('selectChanged')(result);
};

const createApiCards = (appearance: CardAppearance, identifier: Identifier) => {
  // API methods
  const apiCards = [
    {
      title: 'not selectable',
      content: (
        <Card
          context={context}
          appearance={appearance}
          identifier={identifier}
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
        />
      )
    }
  ];

  const selectableCard = {
    title: 'selectable',
    content: (
      <SelectableCard
        context={context}
        identifier={identifier}
        onSelectChange={onSelectChangeHandler}
      />
    )
  };

  if (appearance === 'image') {
    return [...apiCards, selectableCard];
  }

  return apiCards;
};

storiesOf('Card', {})
  .add('Live preview', () => {
    interface LiveUrlConverterState {
      link: string;
      loading: boolean;
    }

    class LiveUrlConverter extends Component<{}, LiveUrlConverterState> {
      interval: number;

      constructor(props) {
        super(props);
        this.state = {link: 'https://www.atlassian.com', loading: false};
      }

      render() {
        const identifier: UrlPreviewIdentifier = {
          mediaItemType: 'link',
          url: this.state.link
        };

        const cards = [
          {
            title: 'small',
            content: <Card identifier={identifier} context={context} appearance="small" />
          }, {
            title: 'image',
            content: <Card identifier={identifier} context={context} appearance="image" />
          }, {
            title: 'horizontal',
            content: <Card identifier={identifier} context={context} appearance="horizontal" />
          }, {
            title: 'square',
            content: <Card identifier={identifier} context={context} appearance="square" />
          }
        ];

        return (
          <div style={{margin: '20px'}}>
            <h1>Url live preview</h1>
            <div style={{display: 'flex', alignItems: 'flex-end'}}>
              <div style={{width: '500px', marginRight: '20px'}}>
                <FieldText
                  label="url"
                  type="text"
                  shouldFitContainer={true}
                  placeholder="Paste some url..."
                  value={this.state.link}
                  onChange={this.onInputChange}
                />
              </div>
              <Button appearance="primary" onClick={this.onAddLink}>Add link</Button>
            </div>
            <StoryList>{cards}</StoryList>
          </div>
        );
      }

      onLoadingChange = state => {
        if (state) {
          this.setState({loading: state.loading});
        }
      }

      // TODO debounce
      onInputChange = (e) => {
        const link = e.target.value;
        this.setState({link});
      }

      onAddLink = () => {
        const {link} = this.state;
        context.getUrlPreviewProvider(link).observable().subscribe(
          metadata => context.addLinkItem(link, collectionName, metadata)
        );
      }
    }

    return <LiveUrlConverter />;
  }).add('Appearence matrix', () => {
    const genericUrlIdentifier: UrlPreviewIdentifier = {
      mediaItemType: 'link',
      url: 'https://atlassian.com'
    };

    const fileIdentifier: MediaIdentifier = {
      mediaItemType: 'file',
      id: 'fd4c4672-323a-4b6c-8326-223169e2a13e',
      collectionName
    };

    // file cards
    const smallFileCard = <Card context={context} identifier={fileIdentifier} appearance="small" />;
    const imageFileCard = <Card context={context} identifier={fileIdentifier} />;

    // link cards
    const smallLinkCard = <Card context={context} identifier={genericUrlIdentifier} appearance="small" dimensions={{width: '200px'}} />;
    const linkCardImage = <Card context={context} identifier={genericUrlIdentifier} appearance="image" />;
    const horizontalLinkCard = <Card context={context} identifier={genericUrlIdentifier} />;
    const squareLinkCard = <Card context={context} identifier={genericUrlIdentifier} appearance="square" />;

    return (
      <div style={{margin: '40px'}}>
        <h1>Appearence matrix</h1>
        <Matrix>
            <thead>
              <tr>
                <td />
                <td>small</td>
                <td>image</td>
                <td>horizontal</td>
                <td>square</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>File Cards</td>
                <td>
                  <div>{smallFileCard}</div>
                </td>
                <td>
                  <div>{imageFileCard}</div>
                </td>
                <td>No design implemented</td>
                <td>No design implemented</td>
              </tr>
              <tr>
                <td><div>Link Cards</div></td>
                <td><div>{smallLinkCard}</div></td>
                <td><div>{linkCardImage}</div></td>
                <td>
                  <div>{horizontalLinkCard}</div>
                </td>
                <td>
                  <div>{squareLinkCard}</div>
                </td>
              </tr>
            </tbody>
        </Matrix>
      </div>
    );
  }).add('Media type matrix', () => {
    // link cards
    const videoLinkCard = <Card context={context} identifier={videoUrlPreviewId} />;
    const imageLinkCard = <Card context={context} identifier={imageUrlPreviewId} />;
    const audioLinkCard = <Card context={context} identifier={audioUrlPreviewId} />;
    const docLinkCard = <Card context={context} identifier={docUrlPreviewId} />;
    const unknownLinkCard = <Card context={context} identifier={unknownUrlPreviewId} />;

    // file cards
    const videoFileCard = <Card context={context} identifier={videoFileId} />;
    const imageFileCard = <Card context={context} identifier={imageFileId} />;
    const audioFileCard = <Card context={context} identifier={audioFileId} />;
    const docFileCard = <Card context={context} identifier={docFileId} />;
    const unknownFileCard = <Card context={context} identifier={unknownFileId} />;

    return (
      <div style={{margin: '40px'}}>
        <h1>Media type matrix</h1>
        <Matrix>
            <thead>
              <tr>
                <td />
                <td>File Cards</td>
                <td>Link Cards</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>video</td>
                <td><div>{videoFileCard}</div></td>
                <td><div>{videoLinkCard}</div></td>
              </tr>
              <tr>
                <td>image</td>
                <td><div>{imageFileCard}</div></td>
                <td><div>{imageLinkCard}</div></td>
              </tr>
              <tr>
                <td>audio</td>
                <td><div>{audioFileCard}</div></td>
                <td><div>{audioLinkCard}</div></td>
              </tr>
              <tr>
                <td>doc</td>
                <td><div>{docFileCard}</div></td>
                <td><div>{docLinkCard}</div></td>
              </tr>
              <tr>
                <td>unknown</td>
                <td><div>{unknownFileCard}</div></td>
                <td><div>{unknownLinkCard}</div></td>
              </tr>
            </tbody>
        </Matrix>
      </div>
    );
  })
  .add('Resizing modes', () => {
    const defaultCards = [{
      title: 'Small',
      content: <Card identifier={smallImageFileId} context={context} />
    }, {
      title: 'Wide',
      content: <Card identifier={wideImageFileId} context={context} />
    }, {
      title: 'Large',
      content: <Card identifier={largeImageFileId} context={context} />
    }];
    const croppedCards = [{
      title: 'Small',
      content: <Card identifier={smallImageFileId} context={context} resizeMode="crop" />
    }, {
      title: 'Wide',
      content: <Card identifier={wideImageFileId} context={context} resizeMode="crop" />
    }, {
      title: 'Large',
      content: <Card identifier={largeImageFileId} context={context} resizeMode="crop" />
    }];
    const fitCards = [{
      title: 'Small',
      content: <Card identifier={smallImageFileId} context={context} resizeMode="fit" />
    }, {
      title: 'Wide',
      content: <Card identifier={wideImageFileId} context={context} resizeMode="fit" />
    }, {
      title: 'Large',
      content: <Card identifier={largeImageFileId} context={context} resizeMode="fit" />
    }];
    const fullFitCards = [{
      title: 'Small',
      content: <Card identifier={smallImageFileId} context={context} resizeMode="full-fit" />
    }, {
      title: 'Wide',
      content: <Card identifier={wideImageFileId} context={context} resizeMode="full-fit" />
    }, {
      title: 'Large',
      content: <Card identifier={largeImageFileId} context={context} resizeMode="full-fit" />
    }];

    return (
      <div>
        <h3>Default</h3>
        <StoryList>{defaultCards}</StoryList>
        <h3>Crop</h3>
        <StoryList>{croppedCards}</StoryList>
        <h3>Fit</h3>
        <StoryList>{fitCards}</StoryList>
        <h3>Full Fit</h3>
        <StoryList>{fullFitCards}</StoryList>
      </div>
    );
  })
  .add('Files', () => {
    // standard
    const successIdentifier: MediaIdentifier = imageFileId;
    const standardCards = [
      {
        title: 'Small',
        content: <Card identifier={successIdentifier} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={successIdentifier} context={context} appearance="image" />
      }
    ];

    // errors
    const errorCards = [
      {
        title: 'Small',
        content: <Card identifier={errorFileId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={errorFileId} context={context} appearance="image" />
      }
    ];

    // menu
    const menuActions = [
      {label: 'Open', handler: () => { action('open')(); }},
      {label: 'Close', handler: () => { action('close')(); }}
    ];
    const menuCards = [
      {
        title: 'Small',
        content: <Card identifier={successIdentifier} context={context} appearance="small" actions={menuActions} />
      }, {
        title: 'Image',
        content: <Card identifier={successIdentifier} context={context} appearance="image" actions={menuActions} />
      }
    ];

    // api cards
    const apiCards = createApiCards('image', successIdentifier);

    // no thumbnail
    const noThumbnailCards = [
      {
        title: 'Small',
        content: <Card identifier={unknownFileId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={unknownFileId} context={context} appearance="image" />
      }
    ];

    // lazy load
    const lazyLoadCards = [
      {
        title: 'Lazy',
        content: <Card isLazy={true} identifier={successIdentifier} context={context} appearance="image" />
      }, {
        title: 'No lazy',
        content: <Card isLazy={false} identifier={successIdentifier} context={context} appearance="image" />
      }
    ];

    return (
      <div>
        <h1 style={{margin: '10px 20px'}}>File cards</h1>
        <div style={{margin: '20px 40px'}}>
          <h3>Standard</h3>
          <StoryList>{standardCards}</StoryList>

          <h3>Error</h3>
          <StoryList>{errorCards}</StoryList>

          <h3>Menu</h3>
          <StoryList>{menuCards}</StoryList>

          <h3>API Cards</h3>
          <StoryList>{apiCards}</StoryList>

          <h3>Thumbnail not available</h3>
          <StoryList>{noThumbnailCards}</StoryList>

          <h3>Lazy load</h3>
          <StoryList>{lazyLoadCards}</StoryList>
        </div>
      </div>
    );
  }).add('Links', () => {
    // standard
    const standardCards = [
      {
        title: 'Small',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="image" />
      }, {
        title: 'Horizontal',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="horizontal" />
      }, {
        title: 'Square',
        content: <Card identifier={genericUrlPreviewId} context={context} appearance="square" />
      }
    ];

    // api cards
    const apiCards = createApiCards('horizontal', genericUrlPreviewId);

    // errors
    const errorCards = [
      {
        title: 'Small',
        content: <Card identifier={errorLinkId} context={context} appearance="small" />
      }, {
        title: 'Image',
        content: <Card identifier={errorLinkId} context={context} appearance="image" />
      }, {
        title: 'Horizontal',
        content: <Card identifier={errorLinkId} context={context} appearance="horizontal" />
      }, {
        title: 'Square',
        content: <Card identifier={errorLinkId} context={context} appearance="square" />
      }
    ];

    const playerCards = [
      {
        title: 'YouTube',
        content: <Card identifier={youTubeUrlPreviewId} context={context} />
      }, {
        title: 'Spotify',
        content: <Card identifier={spotifyUrlPreviewId} context={context} />
      }, {
        title: 'Sound Cloud',
        content: <Card identifier={soundcloudUrlPreviewId} context={context} />
      }
    ];

    const trelloCards = [
      {
        title: 'Public board',
        content: <Card identifier={publicTrelloBoardUrlPreviewId} context={context} />
      }, {
        title: 'Private board',
        content: <Card identifier={privateTrelloBoardUrlPreviewId} context={context} />
      }
    ];

    return (
      <div>
        <h1 style={{margin: '10px 20px'}}>Link cards</h1>
        <div style={{margin: '20px 40px'}}>
          <h3>Standard</h3>
          <StoryList>{standardCards}</StoryList>

          <h3>API Cards</h3>
          <StoryList>{apiCards}</StoryList>

          <h3>Error</h3>
          <StoryList>{errorCards}</StoryList>

          <h3>Player cards</h3>
          <StoryList>{playerCards}</StoryList>

          <h3>Trello cards</h3>
          <StoryList>{trelloCards}</StoryList>
        </div>
      </div>
    );
  });
