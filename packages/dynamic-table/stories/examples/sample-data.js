/* sample-data.js */
import React from 'react';
import styled from 'styled-components';
import presidents from './presidents.json';
import lorem from './lorem.json';

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
}

function getRandomString() {
  return `${lorem[Math.floor(Math.random() * lorem.length)].split('.')[0]}.`;
}

const NameWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
`;

export const caption = 'List of US Presidents';

export const head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 25,
    },
    {
      key: 'party',
      content: 'Party',
      shouldTruncate: true,
      isSortable: true,
      width: 15,
    },
    {
      key: 'term',
      content: 'Term',
      shouldTruncate: true,
      isSortable: true,
      width: 10,
    },
    {
      content: 'Comment',
      shouldTruncate: true,
    },
  ],
};

export const rows = presidents.map(president => ({
  cells: [
    {
      key: createKey(president.nm),
      content: (
        <NameWrapper>
          <Avatar src={`https://api.adorable.io/avatars/24/${president.nm}.png`} />
          <span>{president.nm}</span>
        </NameWrapper>
      ),
    },
    {
      key: createKey(president.pp),
      content: president.pp,
    },
    {
      key: president.id,
      content: president.tm,
    },
    {
      content: getRandomString(),
    },
  ],
}));
