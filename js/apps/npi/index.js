// Copyright 2017-present PROPHESSOR
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

/* 
 * NPI (No Problem Installer)
 * Application installer for JsOS
 * Can use repositories like npm
 * 
*/

'use strict';
let io;

function main(api, res) {
  io = api.stdio;
  io.setColor('green');
  io.writeLine('It works!!!');
  return res(0); // 1 = error
}



exports.call = (cmd, args, api, res) => {
    const arglist = args.split(/\s+/);
    switch(arglist[0]){
        case 'search':
        case 's':
            arglist.shift();
            require('./npi-search')(arglist);
            break;
        case 'install':
        case 'i':
            arglist.shift();
            require('./npi-install')(arglist);
            break;
    }
};

exports.commands = ['npi'];
