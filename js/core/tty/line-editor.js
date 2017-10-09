// Copyright 2014-present runtime.js project authors
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

const printer = require('./printer');

class LineEditor {
  constructor() {
    this.inputText = '';
    this.inputPosition = 0;
  }

  getText() {
    return this.inputText;
  }

  drawPrompt() {
    printer.print('$', 1, printer.color.YELLOW, printer.color.BLACK);
    printer.print(' ', 1, printer.color.WHITE, printer.color.BLACK);
  }

  drawCursor() {
    let char = ' ';
    if (this.inputPosition < this.inputText.length) {
      char = this.inputText[this.inputPosition];
    }

    printer.print(char, 1, printer.color.WHITE, printer.color.LIGHTGREEN);
    printer.moveOffset(-1);
  }

  removeCursor() {
    let char = ' ';
    if (this.inputPosition < this.inputText.length) {
      char = this.inputText[this.inputPosition];
    }

    printer.print(char, 1, printer.color.WHITE, printer.color.BLACK);
    printer.moveOffset(-1);
  }

  putChar(char) {
    this.removeCursor();
    if (this.inputPosition >= this.inputText.length) {
      this.inputText += char;
      printer.print(char);
    } else {
      const rightSide = this.inputText.slice(this.inputPosition);
      this.inputText = this.inputText.slice(0, this.inputPosition) + char + rightSide;
      printer.print(char);
      for (const item of rightSide) {
        printer.print(item);
      }
      printer.moveOffset(-rightSide.length);
    }
    ++this.inputPosition;
    this.drawCursor();
  }

  removeChar() {
    if (this.inputPosition > 0) {
      this.removeCursor();
      if (this.inputPosition >= this.inputText.length) {
        this.inputText = this.inputText.slice(0, -1);
        printer.moveOffset(-1);
      } else {
        const rightSide = this.inputText.slice(this.inputPosition);
        this.inputText = this.inputText.slice(0, this.inputPosition - 1) + rightSide;
        printer.moveOffset(-1);
        for (const item of rightSide) {
          printer.print(item);
        }
        printer.print(' ');
        printer.moveOffset(-rightSide.length - 1);
      }
      --this.inputPosition;
      this.drawCursor();
    }
  }

	removeCharRight(){
		if(this.inputPosition < this.inputText.length){
			this.removeCursor();
			this.moveCursorRight();
			this.removeChar();
			this.drawCursor();
		}else{
			if(DEBUG) console.log("Out of text ( > right )");
		}
	} 
  moveCursorLeft() {
    if (this.inputPosition > 0) {
      this.removeCursor();
      --this.inputPosition;
      printer.moveOffset(-1);
      this.drawCursor();
    }
  }

  moveCursorRight() {
    if (this.inputPosition < this.inputText.length) {
      this.removeCursor();
      ++this.inputPosition;
      printer.moveOffset(1);
      this.drawCursor();
    }
  }

	writeHistory(cmd){
		PERSISTENCE.Editor.history.push(cmd);
		PERSISTENCE.Editor.historyPosition++;
		console.log(`Editor->writeHistory(${cmd}) ==> ${JSON.stringify(PERSISTENCE.Editor.history)} [${typeof(PERSISTENCE.Editor.history)}]`);
	}

	previous(){
		//console.warn("Not implemented!");
		if(DEBUG) console.log("Editor->previous()");
		if(PERSISTENCE.Editor.historyPosition > 0){
			PERSISTENCE.Editor.historyPosition--;
			this.setInputBox(PERSISTENCE.Editor.history[PERSISTENCE.Editor.historyPosition]||"");
			//console.log(`history[${PERSISTENCE.Editor.historyPosition}] = ${PERSISTENCE.Editor.history[PERSISTENCE.Editor.historyPosition]}`);
		}else{
			if(DEBUG) console.log("Out of array ( < 0 )");
		}
	}

	next(){
		//console.warn("Not implemented!");
		//console.dir(PERSISTENCE.Editor.history);
		if(DEBUG) console.log("Editor->next()");
		if(PERSISTENCE.Editor.historyPosition < PERSISTENCE.Editor.history.length){
			PERSISTENCE.Editor.historyPosition++;
			this.setInputBox(PERSISTENCE.Editor.history[PERSISTENCE.Editor.historyPosition]||"");
			//console.log(`history[${PERSISTENCE.Editor.historyPosition}] = ${PERSISTENCE.Editor.history[PERSISTENCE.Editor.historyPosition]}`);
		}else{
			if(DEBUG) console.log("Out of array ( > max )");
		}
	}

  clearInputBox() {
    while (this.inputPosition < this.inputText.length) {
      this.moveCursorRight();
    }
    while (this.inputPosition > 0) {
      this.removeChar();
    }
  }

  setInputBox(text) {
    this.removeCursor();
    this.clearInputBox();
    for (const char of text) {
      this.inputText += char;
      printer.print(char);
      ++this.inputPosition;
    }
    this.drawCursor();
  }
}

module.exports = LineEditor;
