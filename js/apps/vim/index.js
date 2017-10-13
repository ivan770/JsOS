'use strict';

const Vim = require('./js-vim');
let vim;
let kb;
let io;
let res;

const kbaliases = {
  enter: '\n',
  tab: '\t',
  backspace: '\b',
  space: ' ',
  escape: 'esc',
  // kpup: '↑',
  // kpdown: '↓',
  // kpleft: '←',
  // kpright: '→',
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
    if (kbaliases[key.type]) vim.exec(kbaliases[key.type]);
    else debug(`Ignoring ${key.type}`);
  }
  return false;
}

function exit() {
  kb.onKeydown.remove(keyboard);
  res(0);
}

function main(api, cb) {
  vim = new Vim();

  require('./lib/commands')(vim, exit);

  kb = api.keyboard;
  io = api.stdio;
  res = cb;

  kb.onKeydown.add(keyboard);

  io.clear();
  io.write(vim.view.getText());

  vim.view.on('change', () => {
    io.clear();
    io.write(vim.view.getText());
  });
}
exports.commands = ['vim'];
exports.call = (app, args, api, cb) => {
  main(api, cb);
};
