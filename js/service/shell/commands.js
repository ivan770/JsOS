// Copyright 2017-present jsos project authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict';

const processor = require('./index.js');
debug('Loading commands...');

const cmds = {
  shutdown: {
    description: 'Shut down the computer',
    run(args, f, res) {
      console.log('Shuting down...');
      $$.machine.shutdown();
      return res(0);
    },
  },
  reboot: {
    description: 'Reboot the computer',
    run(args, f, res) {
      console.log('Rebooting...');
      $$.machine.reboot();
      return res(0);
    },
  },
  echo: {
    description: 'Display text into the screen',
    run(suffix = '', f, res) {
      f.stdio.onwrite(suffix);
      return res(0);
    },
  },
  help: {
    description: 'Show this message =)',
    run(args, f, res) {
      let out = 'Commands list:\n';
      for (const i of processor.getCommands()) {
        out += `${i}: ${processor.getDescription(i)}\n`;
      }
      f.stdio.onwrite(out);
      return res(0);
    },
  },
};

for (const i in cmds) {
  processor.setCommand(i, cmds[i]);
}

debug('Commands loaded successful!');

module.exports = cmds;
