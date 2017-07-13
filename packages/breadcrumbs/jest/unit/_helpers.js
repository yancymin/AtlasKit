import ReactDOM from 'react-dom';

export const setItemWidth = (item, width) => { // eslint-disable-line import/prefer-default-export
  const buttonEl = ReactDOM.findDOMNode(item.button); // eslint-disable-line react/no-find-dom-node
  Object.defineProperty(buttonEl, 'clientWidth', { value: width });
};
