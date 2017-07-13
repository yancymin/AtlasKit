#!/usr/bin/env node

const fs = require('fs');

const dir = process.argv[2];
const title = process.argv[3];

const directories = fs.readdirSync(dir).filter(f => fs.statSync(`${dir}/${f}`).isDirectory());

// eslint-disable-next-line no-console
console.log(`
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="https://unpkg.com/@atlaskit/css-reset" />
    </head>
    <body>
      <h1>${title}</h1>
      <h2>Generated on ${new Date()}</h2>
      <ul>
        ${directories.map(directory => `<li><a href="${directory}/index.html">${directory}</a></li>`).join('\n')}
      </ul>
    </body>
  </html>
  `);

