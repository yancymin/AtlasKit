import React from 'react';
import pkgs from '../../data';

export const getExampleParam = exampleTitle => exampleTitle.toLowerCase().replace(' ', '-');

export const LinksToExamples = () => (
  pkgs.navigation.docs.examples.map((example, i) => (
    <li>
      <a
        target="_blank"
        rel="noopener noreferrer"
        key={i}
        href={`/patterns/navigation/examples/${getExampleParam(example.title)}`}
      >
        {example.title}
      </a>
    </li>
  ))
);

export const matchNavExample = (exampleName) => {
  const example = pkgs.navigation.docs.examples
    .filter(({ title }) => (
      getExampleParam(title) === exampleName
    ))[0];
  return example;
};
