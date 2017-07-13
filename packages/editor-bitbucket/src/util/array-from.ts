/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */
export default function arrayFrom(obj: any): any[] {
  return Array.prototype.slice.call(obj);
}
