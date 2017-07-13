import { Children } from 'react';

export default function FirstChild({ children }) {
  const childrenArray = Children.toArray(children);

  return childrenArray[0] || null;
}
