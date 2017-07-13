const path = require('path');

module.exports = [
  { name: 'Comment', src: path.join(__dirname, '../src/components/Comment.jsx') },
  { name: 'CommentAction', src: path.join(__dirname, '../src/components/ActionItem.jsx') },
  { name: 'CommentAuthor', src: path.join(__dirname, '../src/components/Author.jsx') },
  { name: 'CommentTime', src: path.join(__dirname, '../src/components/Time.jsx') },
  { name: 'CommentEdited', src: path.join(__dirname, '../src/components/Edited.jsx') },
  { name: 'CommentLayout', src: path.join(__dirname, '../src/components/Layout.jsx') },
];
