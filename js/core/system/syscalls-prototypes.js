/**
 *    Copyright 2018 JsOS authors
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

// This file contains prototypes of __SYSCALL native functions.
// Documentation only.


'use strict';

const __SYSCALL = {
  allocDMA() { // You can use js/core/system/dma-pool.js
    return {
      'address': String(),
      'buffer': String(),
      'size': String()
    };
  }
};