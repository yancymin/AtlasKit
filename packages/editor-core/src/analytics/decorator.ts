import analyticsService from './service';

/**
 * Annotation for automatically tracking analytics event whenever a function is invoked.
 *
 * The @analytics annotation can only be used on methods and functions. It requires a single
 * argument with the event name. It will relay the event via analytics/service and requires
 * that desired provider is set in analytics/service.provider = provider.
 *
 * Usage:
 *
 *     import analytics from 'analytics/annotation';
 *
 *     class Component {
 *        @analytics('atlassian.component.click')
 *        onClick() { ... }
 *     }
 */
// PropertyDecorator | MethodDecorator
export default function analytics(name: string) {
  return function(
    target: any,
    key: string,
    descriptor?: TypedPropertyDescriptor<any>
  ): any {
    if (!name) {
      throw new SyntaxError('@analytics requires an event name as the first argument.');
    }

    if (!descriptor) {
      // We're decorating a property (i.e. a method bound with an arrow => )
      return {
        set(primitiveOrFn: any) {
          if (typeof primitiveOrFn === 'function') {
            Object.defineProperty(this, key, { value: trackFunction(name, primitiveOrFn) });
          } else {
            console.warn(`@analytics decorator expects "${key}" to be a function, not a ${typeof primitiveOrFn}.`);
            Object.defineProperty(this, key, { value: primitiveOrFn });
          }
        }
      } as PropertyDescriptor;
    }

    const fn = descriptor.value;
    if (typeof fn !== 'function') {
      throw new SyntaxError('@analytics can only be used on methods.');
    }

    // We're decorating a class method
    return {
      ...descriptor,
      value: trackFunction(name, fn)
    };
  };
}

/**
 * Returns a sequence that will track analytics event before calling the passed function.
 */
function trackFunction(analyticsEventName: string, trackedFn: Function) {
  return (...args: any[]) => {
    const result = trackedFn(...args);
    if (result) {
      try {
        analyticsService.trackEvent(analyticsEventName);
      } catch (e) {
        console.error('An exception has been thrown when trying to track analytics event:', e);
      }
    }
    return result;
  };
}
