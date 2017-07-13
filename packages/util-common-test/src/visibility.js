/**
 * returns true if and only if `elem` is invisible
 * @param elem – the element to check
 * @ignore
 */
export function checkInvisibility(elem) {
  return elem.getBoundingClientRect().width === 0 &&
    elem.getBoundingClientRect().height === 0 &&
    elem.offsetParent === null;
}

/**
 * returns true if and only if `elem` is visible
 * @param elem – the element to check
 * @ignore
 */
export function checkVisibility(elem) {
  return elem.getBoundingClientRect().width > 0 &&
    elem.getBoundingClientRect().height > 0 &&
    elem.offsetParent !== null;
}
