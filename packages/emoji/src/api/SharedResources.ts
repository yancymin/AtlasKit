// Shared code to be extracted out into a shared library (see also ServiceUtils)
// This will contain code identified as common and reusable between mentions, emoji, reactions
// relating to "resources"

export interface OnProviderChange<R, E, I> {
  /**
   * Normal callback on a search result, or updated search result.
   */
  result(result: R): void;

  /**
   * When something goes wrong, e.g. underlying service is not available.
   */
  error?(error: E): void;

  /**
   * Information to display, e.g. due to slow searches, initial message, etc.
   */
  info?(info: I): void;

  /**
   * Notifies if the Resource is not ready and won't respond to searches
   * in a timely manner. Note searches that occur while not ready Will
   * eventually be fulfilled.
   */
  notReady?(): void;
}

/**
 * Defines a typical Resource.
 *
 * Q = query type
 * R = result type
 * I = info type
 */
export interface Provider<Q, R, E, I, O> {
  /**
   * Results are returned to the OnSearchResult
   * in the subscriber.
   *
   * There may not be a 1-on-1 relationship between a search
   * and a callback.
   *
   * For example, multiple queries may result in one callback if the
   * responses are out of order (i.e. old responses are dropped). Or
   * multiple callbacks may be fired, for example if the underlying data
   * set to search has changed, the last search may be executed again
   * with updated results.
   */
  filter(query?: Q, options?: O): void;

  subscribe(onChange: OnProviderChange<R, E, I>): void;
  unsubscribe(onChange: OnProviderChange<R, E, I>): void;
}

export abstract class AbstractResource<Q, R, E, I, O> implements Provider<Q, R, E, I, O> {
  private lastResult: R;
  private listeners = new Set<OnProviderChange<R, E, I>>();

  abstract filter(query?: Q, options?: O): void;

  subscribe(onChange: OnProviderChange<R, E, I>): void {
    this.listeners.add(onChange);
    if (this.lastResult) {
      // Notify subscribe of last result (i.e. initial state)
      onChange.result(this.lastResult);
    }
  }

  unsubscribe(onChange: OnProviderChange<R, E, I>): void {
    this.listeners.delete(onChange);
  }

  protected notifyResult(result: R): void {
    this.listeners.forEach((onChange) => {
      onChange.result(result);
    });
  }

  protected notifyError(error: E): void {
    this.listeners.forEach((onChange) => {
      if (onChange.error) {
        onChange.error(error);
      }
    });
  }

  protected notifyInfo(info: I): void {
    this.listeners.forEach((onChange) => {
      if (onChange.info) {
        onChange.info(info);
      }
    });
  }

  protected notifyNotReady(): void {
    this.listeners.forEach((onChange) => {
      if (onChange.notReady) {
        onChange.notReady();
      }
    });
  }
}

