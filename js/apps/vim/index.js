'use strict';

const Vim = require('./js-vim');
let vim;
let kb;
let io;
let res;
// const tui = require('terminal-ui');

// const mauve = require('./mauve');
// const scheme = require('./lib/scheme');
// mauve.set(scheme);

const kbaliases = {
  enter: '\n',
  tab: '\t',
  backspace: '\b',
  space: ' ',
  escape: 'esc',
  kpup: '↑',
  kpdown: '↓',
  kpleft: '←',
  kpright: '→',
};

// const kbignore = ['kpdown', 'kpup', 'kpleft', 'kpright'];

function keyboard(key) {
  if (key.type === 'kppagedown') {
    kb.onKeydown.remove(keyboard);
    return res(0);
  }

  // if (kbignore.indexOf(key.type) !== -1) return false;
  if (key.type === 'character') {
    vim.exec(kbaliases[key.character] || key.character);
  } else {
    vim.exec(kbaliases[key.type] || key.type.slice(0, 2) === 'kp' ? '' : key.type);
  }
  return false;
}

function main(api, cb) {
    // Instance
  vim = new Vim();

  kb = api.keyboard;
  io = api.stdio;
  res = cb;

  // Apply node commands (file write, etc.)
  require('./lib/commands')(vim);

  kb.onKeydown.add(keyboard);

  io.clear();
  io.write(vim.view.getText());

    // Tie tui to vim.view
  vim.view.on('change', () => {
    io.clear();
    io.write(vim.view.getText());
  });
}
exports.commands = ['vim'];
exports.call = (app, args, api, res) => {
  main(api, res);
};
