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

/* global $$ */

debug('Loading commands...');

const cmds = {
  shutdown: {
    description: 'Shut down the computer',
    usage: 'shutdown',
    run(args, f, res) {
      console.log('Shuting down...');
      $$.machine.shutdown();
      return res(0);
    },
  },
  reboot: {
    description: 'Reboot the computer',
    usage: 'reboot',
    run(args, f, res) {
      console.log('Rebooting...');
      $$.machine.reboot();
      return res(0);
    },
  },
  echo: {
    description: 'Display text into the screen',
    usage: 'echo <text>',
    run(suffix, f, res) {
      f.stdio.onwrite(suffix);
      return res(0);
    },
  },
  help: {
    description: 'Show this message or show usage of the command =)',
    usage: 'help <command>',
    run(_args, f, res) {
      let args = _args.trim();
      if (!args) {
        let out = 'Commands list:\n';
        for (const i of processor.getCommands()) {
          out += `${i}: ${processor.getDescription(i)}\n`;
        }
        f.stdio.write(out);
      } else {
        args = args.split(/\s+/)[0]; // Safety
        f.stdio.setColor('lightcyan');
        f.stdio.write(processor.getUsage(args));
      }
      return res(0);
    },
  },
  dns: {
    description: 'Get DNS namespace from url',
    usage: 'dns <url>',
    run(_args, env, cb) {
      const $ = env.stdio;
      const args = _args.trim();
      if (!args) {
        $.writeError('You forgot to enter the URL');
        return cb(0);
      }
      $.setColor('yellow');
      $.writeLine(`Sending request to ${args}...`);
      runtime.dns.resolve(args, {}, (err, data) => {
        if (err) {
          $.writeError('Error!');
          return cb(1);
        }
        console.log(JSON.stringify(data));
        if (data.results[0]) {
          $.setColor('green');
          $.writeLine('OK!');
          $.writeLine(JSON.stringify(data, null, 4));
        } else {
          $.setColor('red');
          $.writeLine('Error: Does URL exist?');
        }
        cb(0);
      });
    },
  },
};

/* eslint no-restricted-syntax:0, guard-for-in:0 */
for (const i in cmds) {
  processor.setCommand(i, cmds[i]);
}

debug('Commands loaded successful!');

module.exports = cmds;