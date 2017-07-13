import * as React from 'react';
import { ReactElement } from 'react';
import { FilmStripNavigator } from '@atlaskit/media-filmstrip';
import { CardDimensions } from '@atlaskit/media-card';
import styled from 'styled-components';
import { MediaProps } from './media';

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

export default function MediaGroup(props: MediaGroupProps) {
  const numChildren = React.Children.count(props.children);

  return (
    <FilmStripWrapper>
      <FilmStripNavigator>
      {
        React.Children.map(props.children, (child: ReactElement<MediaProps>) => {
          const childProps = numChildren === 1 ? singleCardProps : multipleCardProps;

          return React.cloneElement(child, childProps as MediaProps);
        })
      }
      </FilmStripNavigator>
    </FilmStripWrapper>
  );
}
