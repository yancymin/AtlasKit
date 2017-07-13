import { Promise } from 'es6-promise';
import 'whatwg-fetch';

import { findIndex, equalEmojiId } from './internal/helpers';
import { analyticsService } from './analytics';

let debounced: number | null = null;

export interface ReactionSummary {
  ari: string;
  containerAri: string;
  emojiId: string;
  count: number;
  reacted: boolean;
  users?: User[];
}

export interface User {
  id: string;
  displayName: string;
}

export interface DetailedReaction {
  ari: string;
  emojiId: string;
  count: number;
  users: User[];
}

export interface User {
  id: string;
  displayName: string;
}

export interface Listener {
  handler: Function;
}

export interface Reactions {
  [key: string]: ReactionSummary[];
}

export interface ObjectReactionKey {
  containerAri: string;
  ari: string;
}

export interface ReactionsProvider {
  getReactions(keys: ObjectReactionKey[]): Promise<Reactions>;
  getDetailedReaction(reaction: ReactionSummary): Promise<ReactionSummary>;
  toggleReaction(containerAri: string, ari: string, emojiId: string);
  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
  fetchReactionDetails(reaction: ReactionSummary): Promise<ReactionSummary>;
  notifyUpdated(containerAri: string, ari: string, state: ReactionSummary[]): void;
  subscribe(objectReactionKey: ObjectReactionKey, handler: Function): void;
  unsubscribe(objectReactionKey: ObjectReactionKey, handler: Function): void;
}

export default class AbstractReactionsResource implements ReactionsProvider {

  protected excludeArisFromAutoPoll: string[] = [];
  protected cachedReactions: Reactions = {};
  protected subscribers: { [ari: string]: Listener[] } = {};
  protected lastActionForAri: { [ari: string]: number } = {};

  private batchedKeys: ObjectReactionKey[] = [];

  protected autoPoll(autoPollInterval) {
    if (!autoPollInterval) {
      return;
    }

    setTimeout(() => {
      const aris = Object.keys(this.subscribers);

      let subscriptionKeys = aris.map(ari => {
        let tokens = ari.split('|');
        return {
          ari: tokens[1],
          containerAri: tokens[0]
        };
      });

      if (aris.length) {
        this.getReactions(subscriptionKeys)
          .then(reactions => {
            Object.keys(reactions).forEach(ari => {
              this.includeAriInAutoPoll(ari);
              this.notifyUpdated(reactions[ari][0].containerAri, ari, reactions[ari]);
            });
            this.autoPoll(autoPollInterval);
          });
      } else {
        this.autoPoll(autoPollInterval);
      }
    }, autoPollInterval);
  }

  getReactions(keys: ObjectReactionKey[]): Promise<Reactions> {
    return new Promise<Reactions>((resolve, reject) => {
      resolve({});
    });
  }

  getDetailedReaction(reaction: ReactionSummary): Promise<ReactionSummary> {
    return new Promise<ReactionSummary>((resolve, reject) => {
      reject();
    });
  }

  fetchReactionDetails(reaction: ReactionSummary): Promise<ReactionSummary> {
    return new Promise<ReactionSummary>((resolve, reject) => {
      reject();
    });
  }

  toggleReaction(containerAri: string, ari: string, emojiId: string) {
    const key = `${containerAri}|${ari}`;
    if (!this.cachedReactions[key]) {
      this.cachedReactions[key] = [];
    }

    const hasReaction = this.cachedReactions[key] && this.cachedReactions[key].filter(r => equalEmojiId(r.emojiId, emojiId));
    const hasReacted = hasReaction && hasReaction.length !== 0 && hasReaction[0].reacted;

    if (hasReacted) {
      this.deleteReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(containerAri, ari, state);
        })
        .catch(() => {
          this.optimisticAddReaction(containerAri, ari, emojiId);
          this.notifyUpdated(containerAri, ari, this.cachedReactions[key]);
        });
    } else {
      this.addReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(containerAri, ari, state);
        })
        .catch(() => {
          this.optimisticDeleteReaction(containerAri, ari, emojiId);
          this.notifyUpdated(containerAri, ari, this.cachedReactions[key]);
        });
    }
  }

  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      resolve([]);
    });
  }

  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      resolve([]);
    });
  }

  notifyUpdated(containerAri: string, ari: string, state: ReactionSummary[]): void {
    const key = this.objectReactionKey(containerAri, ari);
    if (!this.subscribers[key]) {
      return;
    }

    this.subscribers[key].forEach(listener => {
      listener.handler(state);
    });
  }

  objectReactionKeyToString(key: ObjectReactionKey): string {
    return this.objectReactionKey(key.containerAri, key.ari);
  }

  objectReactionKey(containerAri: string, ari: string): string {
    return `${containerAri}|${ari}`;
  }

  subscribe(subscriptionKey: ObjectReactionKey, handler: Function): void {
    let key = this.objectReactionKeyToString(subscriptionKey);
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }

    this.subscribers[key].push({ handler });

    if (debounced) {
      clearTimeout(debounced);
    }

    this.queueAri(subscriptionKey);

    debounced = setTimeout(() => {
      this.getReactions(this.batchedKeys)
        .then(reactions => {
          Object.keys(reactions).forEach(key => {

            let objectReactions = reactions[key];
            const containerAri = subscriptionKey.containerAri;
            const ari = key;
            this.dequeueAri({
              ari: ari,
              containerAri: containerAri
            });
            this.notifyUpdated(containerAri, ari, objectReactions);
          });
        });
    }, 1);
  }

  unsubscribe(subscriptionKey: ObjectReactionKey, handler: Function): void {
    let key = this.objectReactionKeyToString(subscriptionKey);
    if (!this.subscribers[key]) {
      return;
    }

    const index = findIndex(this.subscribers[key], (listener: Listener) => listener.handler === handler);

    if (index !== -1) {
      this.subscribers[key].splice(index, 1);
    }
  }

  private queueAri(subscriptionKey: ObjectReactionKey): void {
    const index = findIndex(this.batchedKeys, (i => i.ari === subscriptionKey.ari && i.containerAri === subscriptionKey.containerAri));
    if (index === -1) {
      this.batchedKeys.push(subscriptionKey);
    }
  }

  private dequeueAri(subscriptionKey: ObjectReactionKey): void {
    const index = findIndex(this.batchedKeys, (i => i.ari === subscriptionKey.ari && i.containerAri === subscriptionKey.containerAri));
    if (index !== -1) {
      this.batchedKeys.splice(index, 1);
    }
  }

  private excludeAriFromAutoPoll(ari): void {
    if (this.excludeArisFromAutoPoll.indexOf(ari) === -1) {
      this.excludeArisFromAutoPoll.push(ari);
    }
  }

  private includeAriInAutoPoll(ari): void {
    const index = this.excludeArisFromAutoPoll.indexOf(ari);
    if (index === -1) {
      return;
    }
    this.excludeArisFromAutoPoll.splice(index, 1);
  }

  protected optimisticAddReaction(containerAri: string, ari: string, emojiId: string): void {
    const key = this.objectReactionKey(containerAri, ari);
    this.excludeAriFromAutoPoll(ari);

    if (!this.cachedReactions[key]) {
      this.cachedReactions[key] = [];
    }

    const index = findIndex(this.cachedReactions[key], reaction => equalEmojiId(reaction.emojiId, emojiId));

    if (index !== -1) {
      const reaction = this.cachedReactions[key][index];
      reaction.reacted = true;
      reaction.count++;
    } else {
      this.cachedReactions[key].push({
        ari: ari,
        containerAri: containerAri,
        emojiId: emojiId,
        count: 1,
        reacted: true
      });
    }

    this.notifyUpdated(containerAri, ari, this.cachedReactions[key]);
  }

  protected optimisticDeleteReaction(containerAri: string, ari: string, emojiId: string): void {
    const key = this.objectReactionKey(containerAri, ari);
    this.excludeAriFromAutoPoll(ari);

    if (!this.cachedReactions[key]) {
      this.cachedReactions[key] = [];
    }

    const index = findIndex(this.cachedReactions[key], reaction => equalEmojiId(reaction.emojiId, emojiId));
    const reaction = this.cachedReactions[key][index];

    reaction.reacted = false;
    reaction.count--;

    if (reaction.count < 1) {
      this.cachedReactions[key].splice(index, 1);
    }

    this.notifyUpdated(containerAri, ari, this.cachedReactions[key]);
  }
}

export interface ReactionsProviderConfig {
  sessionToken?: string;
  baseUrl: string;
  autoPoll?: number;
}

const requestService = <T>(baseUrl: string, path: string, opts?: {}) => {

  const url = `${baseUrl}/${path}`;
  const options = opts;

  return new Promise<T>((resolve, reject) => {
    fetch(new Request(url, options))
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject({
            code: response.status,
            reason: response.statusText,
          });
        }
      })
      .catch(reject);
  });
};

export class ReactionsResource extends AbstractReactionsResource implements ReactionsProvider {

  private inFlightDetailsRequests = {};

  constructor(private config: ReactionsProviderConfig) {
    super();

    if (config.autoPoll) {
      this.autoPoll(config.autoPoll);
    }
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (this.config.sessionToken) {
      headers.append('Authorization', this.config.sessionToken);
    }
    return headers;
  }

  getDetailedReaction(reaction: ReactionSummary): Promise<ReactionSummary> {
    const { containerAri, ari, emojiId } = reaction;
    analyticsService.trackEvent('reactions.detailed.reaction', { containerAri, ari, emojiId });
    const reactionId = `${containerAri}|${ari}|${emojiId}`;
    const headers = this.getHeaders();
    headers.delete('Content-Type');
    return requestService<ReactionSummary>(this.config.baseUrl, `reactions?reactionId=${encodeURIComponent(reactionId)}`, {
      'method': 'GET',
      'headers': headers,
      'credentials': 'include'
    });
  }

  fetchReactionDetails(reaction: ReactionSummary): Promise<ReactionSummary> {
    const { containerAri, ari, emojiId } = reaction;
    analyticsService.trackEvent('reactions.detailed.reaction', { containerAri, ari, emojiId });
    const reactionId = `${containerAri}|${ari}|${emojiId}`;

    if (!this.inFlightDetailsRequests[reactionId]) {
      this.inFlightDetailsRequests[reactionId] = this
        .getDetailedReaction(reaction)
        .then(reactionDetails => {
          const { containerAri, ari, emojiId } = reactionDetails;
          const key = this.objectReactionKey(containerAri, ari);
          if (!this.cachedReactions[key]) {
            this.cachedReactions[key] = [];
          }

          const index = findIndex(this.cachedReactions[key], r => r.emojiId === emojiId);
          if (index !== -1) {
            this.cachedReactions[key][index] = reactionDetails;
            this.notifyUpdated(containerAri, ari, this.cachedReactions[key]);
          }

          delete this.inFlightDetailsRequests[reactionId];
          return reactionDetails;
        }, () => delete this.inFlightDetailsRequests[reactionId]);
    }

    return this.inFlightDetailsRequests[reactionId];
  }

  getReactions(keys: ObjectReactionKey[]): Promise<Reactions> {
    let aris = keys.map(key => key.ari);
    const containerAri = keys[0].containerAri;
    return new Promise<Reactions>((resolve, reject) => {
      requestService<Reactions>(this.config.baseUrl, 'reactions/view', {
        'method': 'POST',
        'headers': this.getHeaders(),
        'body': JSON.stringify({
          containerAri: containerAri,
          aris
        }),
        'credentials': 'include'
      }).then(reactions => {
        Object.keys(reactions).forEach(ari => {
          const cacheKey = this.objectReactionKey(containerAri, ari);
          this.cachedReactions[cacheKey] = reactions[ari];
        });
        resolve(reactions);
      });
    });
  }

  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    analyticsService.trackEvent('reactions.add.reaction', { containerAri, ari, emojiId });
    this.optimisticAddReaction(containerAri, ari, emojiId);

    const timestamp = Date.now();
    this.lastActionForAri[ari] = timestamp;

    return new Promise<ReactionSummary[]>((resolve, reject) => {
      requestService<{ ari: string, reactions: ReactionSummary[] }>(this.config.baseUrl, 'reactions', {
        'method': 'POST',
        'headers': this.getHeaders(),
        'body': JSON.stringify({ emojiId, ari, containerAri }),
        'credentials': 'include'
      }).then(reactions => {
        const key = this.objectReactionKey(containerAri, ari);
        // Do not update cache if it was already updated by a more recent action
        if (this.lastActionForAri[ari] === timestamp) {
          this.cachedReactions[key] = reactions.reactions;
        }

        resolve(this.cachedReactions[key]);
      }).catch(() => reject());
    });
  }

  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    analyticsService.trackEvent('reactions.delete.reaction', { containerAri, ari, emojiId });
    this.optimisticDeleteReaction(containerAri, ari, emojiId);

    const timestamp = Date.now();
    this.lastActionForAri[ari] = timestamp;

    return new Promise<ReactionSummary[]>((resolve, reject) => {
      requestService<{ ari: string, reactions: ReactionSummary[] }>(this.config.baseUrl, `reactions?ari=${ari}&emojiId=${emojiId}&containerAri=${containerAri}`, {
        'method': 'DELETE',
        'headers': this.getHeaders(),
        'credentials': 'include'
      }).then(reactions => {
        const key = this.objectReactionKey(containerAri, ari);
        // Do not update cache if it was already updated by a more recent action
        if (this.lastActionForAri[ari] === timestamp) {
          this.cachedReactions[key] = reactions.reactions;
        }

        resolve(this.cachedReactions[key]);
      }).catch(() => reject());
    });
  }
}
