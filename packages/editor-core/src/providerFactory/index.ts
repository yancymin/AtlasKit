export { WithProviders } from './withProviders';

const findIndex = (array: any[], predicate: (item: any) => boolean): number => {
  let index = -1;
  array.some((item, i) => {
    if (predicate(item)) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
};

export type ProviderHandler = (name: string, provider?: Promise<any>) => void;

export default class ProviderFactory {
  private providers: Map<string, Promise<any>> = new Map();
  private subscribers: Map<string, ProviderHandler[]> = new Map();

  destroy() {
    this.providers.clear();
    this.subscribers.clear();
  }

  isEmpty(): boolean {
    return !this.providers.size && !this.subscribers.size;
  }

  setProvider(name: string, provider?: Promise<any>) {
    // Do not trigger notifyUpdate if provider is the same.
    if (provider && this.providers.get(name) === provider) {
      return;
    }

    if (provider) {
      this.providers.set(name, provider);
    } else {
      this.providers.delete(name);
    }

    this.notifyUpdated(name, provider);
  }

  removeProvider(name: string) {
    this.providers.delete(name);
    this.notifyUpdated(name);
  }

  subscribe(name: string, handler: ProviderHandler) {
    const handlers = this.subscribers.get(name) || [];
    handlers.push(handler);

    this.subscribers.set(name, handlers);

    const provider = this.providers.get(name);

    if (provider) {
      handler(name, provider);
    }
  }

  unsubscribe(name: string, handler: ProviderHandler) {
    const handlers = this.subscribers.get(name);
    if (!handlers) {
      return;
    }

    const index = findIndex(handlers, h => h === handler);

    if (index !== -1) {
      handlers.splice(index, 1);
    }

    if (handlers.length === 0) {
      this.subscribers.delete(name);
    } else {
      this.subscribers.set(name, handlers);
    }
  }

  private notifyUpdated(name: string, provider?: Promise<any>) {
    const handlers = this.subscribers.get(name);
    if (!handlers) {
      return;
    }

    handlers.forEach(handler => {
      handler(name, provider);
    });
  }
}
