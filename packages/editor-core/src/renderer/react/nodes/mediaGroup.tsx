import * as React from 'react';
import { ReactElement, PureComponent } from 'react';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import { CardDimensions } from '@atlaskit/media-card';
import styled from 'styled-components';
import { Props as MediaProps } from '../../../ui/Media/MediaComponent';

export interface MediaGroupProps {
  children?: any; /* @see https://github.com/Microsoft/TypeScript/issues/6471 */
}

export enum LargeCard {
  height = 180,
  width = 275
}

// tslint:disable-next-line
export const FilmStripWrapper = styled.div`
  padding: 5px 0;
`;

const singleCardProps = {
  cardDimensions: LargeCard as CardDimensions,
  resizeMode: 'full-fit'
};

const multipleCardProps = {
  resizeMode: 'crop'
};

export default class MediaGroup extends PureComponent<MediaGroupProps, {}> {
  render() {
    const numChildren = React.Children.count(this.props.children);
    const childProps = numChildren === 1 ? singleCardProps : multipleCardProps;

    return (
      <FilmStripWrapper>
        <FilmStripNavigator>
        {
          React.Children.map(this.props.children, (child: ReactElement<MediaProps>) => {
            return React.cloneElement(child, childProps as MediaProps);
          })
        }
        </FilmStripNavigator>
      </FilmStripWrapper>
    );
  }
}
