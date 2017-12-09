/*
 * Composer
 * Copyright (c) 2017 PROPHESSOR
 */
'use strict';

const Notes = require('./Notes');

const { info, error, success } = $$.logger;

class Sound {
  constructor(notelist) {
    this.play = this.play.bind(this);

    this.sound = notelist.split(' ');
    this.tick_duration = 50;
  }

  play(res) {
    let position = 0;

    const tick = () => {
      const note = this.sound[position];
      const noteData = Notes[Notes.keynotes[note]];
      if (noteData) {
        info(note, 0);
        $$.speaker.play(noteData, Notes.duration);
      } else {
        return error(`I don't know note ${note}`) ^ res(1);
      }
      if (position < this.sound.length - 1) {
        position++;
        setTimeout(tick, this.tick_duration);
      } else {
        success('End!', 0);
        res(0);
      }
    };
    tick();
  }

  stop() {} // TODO:

  save() {} // TODO:

  load() {} // TODO:

  static compress() {}
}

module.exports = Sound;
