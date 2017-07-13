#!/usr/local/bin/node

// Samples 10 emoji from each category for use as test data
// Usage:
//  curl -s http://localhost:7788/emoji/standard | ./sample-emoji-test-data.js > test-emoji-standard.json

const stdin = process.stdin;
const stdout = process.stdout;
const inputChunks = [];

const reservedEmojis = new Map([
  // :smiley: used to test ascii representations
  // :thumbsup: has skin variations need for testing
  // :thumbsdown: used to verify order against :thumbsup:
  ['PEOPLE', [':grin:', ':smiley:', ':thumbsup:', ':thumbsdown:', ':open_mouth:']],
  ['FLAGS', [':flag_black:', ':flag_cg:']],
  // :boom: is used for testing duplicate shortName between standard and atlassian
  ['NATURE', [':boom:']],
  ['ATLASSIAN', [':boom:', ':evilburns:']],
]);

function isReservedEmoji(category, shortName) {
  const emojis = reservedEmojis.get(category);
  return emojis && emojis.indexOf(shortName) !== -1;
}

function initCountByCategory() {
  const count = new Map(); // Map<string, number>
  reservedEmojis.forEach((emojis, category) => count.set(category, emojis.length));
  return count;
}

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', (chunk) => {
  inputChunks.push(chunk);
});

stdin.on('end', () => {
  const inputJSON = inputChunks.join('');
  const parsedData = JSON.parse(inputJSON);

  const { emojis, meta } = parsedData;
  const countByCategory = initCountByCategory();

  const filteredEmojis = emojis.filter((emoji) => {
    const { category, shortName } = emoji;
    const count = countByCategory.get(category) || 0;

    if (isReservedEmoji(category, shortName)) { return true; }

    if (count < 10) {
      countByCategory.set(category, count + 1);
      return true;
    }
    return false;
  });

  const outputJSON = JSON.stringify({ emojis: filteredEmojis, meta }, null, 2);
  stdout.write(outputJSON);
  stdout.write('\n');
});
