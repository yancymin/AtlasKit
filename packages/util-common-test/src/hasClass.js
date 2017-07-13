/**
 * @description A simple helper method to check whether a node has a set of classNames on it.
 *  Will return true, only if a component is provided and it has all the classNames applied to it.
 * @param {Node} component A node to check for classNames.
 * @param {...String=} classes A list of classNames to check for the existance of
 * @example @js const elem = document.querySelector('.fixture').firstChild;
 *  const elemIsHidden = hasClass(elem, 'hidden');
 *  const elemIsSelectedAndHidden = hasClass(elem, 'hidden', 'selected');
 * @ignore
 */
export default function hasClass(component, ...classes) {
  if (process.env.NODE_ENV === 'development') {
    if (classes.length === 0) {
      console.warn('hasClass: No classes given.'); // eslint-disable-line no-console
    }
  }

  if (!component || !(component instanceof Element)) {
    return false;
  }

  const componentClasses = component.classList;
  return classes.reduce(
    (acum, className) => acum && (Array.prototype.indexOf.call(componentClasses, className) > -1),
    true
  );
}
