const path = require('path');

module.exports = [
  { name: 'Multi Select', src: path.join(__dirname, '../src/components/Stateful.jsx') },
  { name: 'MultiSelectStateless', src: path.join(__dirname, '../src/components/Stateless.jsx') },
  { name: 'Item Shape', src: path.join(__dirname, '../src/internal/ItemShape.jsx') },
];
