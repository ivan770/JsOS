'use strict';

/* global $$ */

// const fs = require('fs');
const io = $$.stdio.defaultStdio;
const fs = require('fs');

function main(Vim, exit) {
  Vim.addCommand({
    mode: 'command',
    match: /^:q\n$/,
    fn() {
      io.clear();
      return exit();
    },
  });

  /* Vim.addCommand({
    mode: 'command',
    match: /^:(?:e|o) (.*)\n$/,
    fn(keys, vim, match) {
      vim.notify('Not implemented!');
    },
  }); */
  // TODO: Write this
  Vim.addCommand({
    mode: 'command',
    match: /^:(?:e|o) (.*)\n$/,
    fn(keys, vim, match) {
      const filePath = match[1];
      let text = '';
      // text = fs.readFileSync(filePath, 'binary');
      fs.readFile(filePath, (err, data) => {
        if (err) return debug("Can't read the file!") ^ debug(err);

        text = data;

        const doc = new vim.Doc();
        doc.path = filePath;
        doc.text(text);
        // Tell vim all about it
        vim.add(doc);
      });
    },
  });


  Vim.addCommand({
    mode: 'command',
    match: /^:w\n$/,
    fn(keys, vim, match) {
      vim.notify('Not implemented!');
    },
  });
  // TODO: Write this
  /* Vim.addCommand({
    mode: 'command',
    match: /^:w\n$/,
    fn(keys, vim, match) {
      const filePath = vim.curDoc.path;
      if (!filePath) {
        return vim.notify('E32: No file name');
      }
      const text = vim.curDoc.text();
      try {
        fs.writeFileSync(filePath, text, 'binary');
      } catch (e) {
        throw e;
      }
      const status = `"${filePath}" ${text.split('\n').length}L, ${text.length}C written`;
      vim.view.set('status', status);
    },
  }); */

  Vim.addCommand({
    mode: 'command',
    match: 'zz', // ZZ
    fn(keys, vim, match) {
      //   vim.exec(':w\n');
      vim.exec(':q\n');
    },
  });

  Vim.addCommand({
    mode: 'command',
    match: '<C-c>',
    fn(keys, vim, match) {
      this.exec(':q\n');
      this.notify('Type  :quit<Enter>  to exit Vim');
    },
  });
}

module.exports = main;
