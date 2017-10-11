'use strict';

const Vim = require('./js-vim');
const tui = require('terminal-ui');

const mauve = require('./mauve');
const scheme = require('./lib/scheme');
mauve.set(scheme);

function main(api) {
    // Instance
  const vim = new Vim();

    // Apply node commands (file write, etc.)
  require('./lib/commands')(vim);

    // Keystrokes
  const Keys = require('terminal-keys');
  const keys = new Keys();

    // Connect keys to vim instance
  keys.fn = function (key) {
    vim.exec(key);
  };

    // Clear the terminal screen
//   tui.clear();

    // Tie tui to vim.view
  vim.view.on('change', () => {
    api.stdio.write(vim.view.getText());
    // tui.write(vim.view.getText());
  });

    // Open file if one has been indicated
  const files = []; // TODO: make this take cl args
  if (files.length) {
    vim.exec(`:e ${files.shift()}\n`);
  }
}
exports.commands = ['vim'];
exports.call = (app, args, api) => {
  main(api);
};
