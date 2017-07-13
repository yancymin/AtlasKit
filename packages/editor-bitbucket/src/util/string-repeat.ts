/**
 * A replacement for `String.repeat` until it becomes widely available.
 */
export default function stringRepeat(text: string, length: number): string {
  let result = '';
  for (let x = 0; x < length; x++) {
    result += text;
  }
  return result;
}
