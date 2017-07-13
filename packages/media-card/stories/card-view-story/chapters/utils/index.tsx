import {CardActionType} from '@atlaskit/media-core';
import {action} from '@kadira/storybook';

export const openAction = {label: 'Open', type: undefined, handler: () => { action('open')(); }};
export const closeAction = {label: 'Close', type: undefined, handler: () => { action('close')(); }};
export const deleteAction = {label: 'Delete', type: CardActionType.delete, handler: () => { action('delete')(); }};

export const actions = [
  openAction,
  closeAction,
  deleteAction
];
