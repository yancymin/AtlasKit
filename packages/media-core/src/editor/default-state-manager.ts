import { MediaState, MediaStateManager } from './';

export type Subscriber = (state: MediaState) => any;

export default class DefaultMediaStateManager implements MediaStateManager {
  private subscribers: { [key: string]: Subscriber[] } = {};
  private state = new Map<string, MediaState>();

  getState(tempId: string): MediaState | undefined {
    return this.state.get(tempId);
  }

  updateState(tempId: string, newState: MediaState) {
    let list: Subscriber[] | undefined = this.subscribers[tempId];

    const state = {
      ...(this.state.get(tempId) || {}),
      ...newState
    };

    this.state.set(tempId, state);

    if (list === undefined) {
      return;
    }

    Array.from(list).forEach(cb => cb.call(cb, state));
  }

  subscribe(tempId: string, cb: (state: MediaState) => void) {
    const { subscribers } = this;
    let list: Subscriber[] | undefined = subscribers[tempId];

    if (list === undefined) {
      list = [];
      subscribers[tempId] = list;
    }

    if (list.indexOf(cb) > -1) {
      return;
    }

    list.push(cb);
  }

  unsubscribe(tempId: string, cb: (state: MediaState) => void) {
    let list: Subscriber[] | undefined = this.subscribers[tempId];

    if (list === undefined) {
      return;
    }

    const pos = list.indexOf(cb);
    if (pos > -1) {
      list.splice(pos, 1);
    }
  }

  destroy() {
    // release all listeners
    this.subscribers = {};
  }
}
