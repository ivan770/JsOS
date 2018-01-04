/*
 * ================================//
 * Интерпретатор языка JsMobileBasic
 * ---v.Alpha 10.2 for JsOS Project---
 * ~~~~~~~~~~by PROPHESSOR~~~~~~~~~~
 * ================================//
 */

/* global $$ */

'use strict';

const io = $$.stdio.defaultStdio;
const graphics = require('.');// $$.graphics;

const $JsMobileBasic = {
  name: 'JsMobileBasic',
  version: 'Alpha 11',
  author: 'PROPHESSOR',
  url: 'http://vk.com/JsMobileBasic',
  // Mobile: $Config.Mobile,
  Debug: true,
  background: [0, 0, 0],
  // canvas: document.getElementById('c'),
  // graphic: false
};

const $Config = {
  type: 'graphic', // graphic/console/api
  canvas_size: ['*', '*', false], // [x,y,вместить]
  Debug_Mode: true,
  name: 'Интерпретатор MobileBasic\'a',
  fullscreen: false,
};

const $TMP = {
  color: [0xFF, 0xFF, 0xFF],
  bgcolor: [0x0, 0x0, 0x0],
};

let ctx;

// #region Init
// var $Init = {
//     _Support: function () {
//         if ($JsMobileBasic.Mobile) {
//             debug('Не поддерживаеться в мобильной версии!');
//             return false;
//         }
//         if (typeof require !== "function") {
//             debug('Не поддерживаеться на вашей платформе!');
//             return false;
//         }
//         return this;
//     },
//     _Double: function(name){
//         debug('Модуль '+name+' уже инициализирован!', 'background:black;color:#00ff00;');
//     },
//     File: [function () {
//         if ($Init._Support) {
//             if (!$Init.File[1]) {
//                     $File = require('fs');
//                     $Init.File[1] = true;
//             } else {
//                 $Init._Double('File')
//             }
//         }else{
//             $Init.File[2] = true;
//         }
//     }, false, false],
//     OS: [function () {
//         if ($Init._Support) {
//             if (!$Init.OS[1]) {
//                     $OS = require('os');
//                     $Init.OS[1] = true;
//             } else {
//                 $Init._Double('OS')
//             }
//         }else{
//             $Init.OS[2] = true;
//         }
//     }, false, false],
//     NW: [function () {
//        if ($Init._Support) {
//             if (!$Init.NW[1]) {
//                     $NW = require('nw.gui');
//                     $Init.NW[1] = true;
//             } else {
//                 $Init._Double('GUI')
//             }
//         }else{
//             $Init.NW[2] = true;
//         }
//     }, false, false],
//     Path: [function () {
//         if ($Init._Support) {
//             if (!$Init.Path[1]) {
//                     $Path = require('path');
//                     $Init.Path[1] = true;
//             } else {
//                 $Init._Double('Path')
//             }
//         }else{
//             $Init.Path[2] = true;
//         }
//     }, false, false],
//     Proc: [function () {
//         if ($Init._Support) {
//             if (!$Init.Proc[1]) {
//                     $Proc = require('child_process');
//                     $Init.Proc[1] = true;
//             } else {
//                 $Init._Double('Proc')
//             }
//         }else{
//             $Init.Proc[2] = true;
//         }
//     }, false, false]
// }

// if (!$JsMobileBasic.Mobile) debug('#===== Включён режим отладки =====#', 'color:gray;');
// if (!$JsMobileBasic.Mobile) debug($JsMobileBasic.name, 'background:gray;color:yellow;');
// if (!$JsMobileBasic.Mobile) debug($JsMobileBasic.version, 'background:gray;color:yellow;');
// if (!$JsMobileBasic.Mobile) debug($JsMobileBasic.author, 'background:gray;color:yellow;');
// if (!$JsMobileBasic.Mobile) debug($JsMobileBasic.url, 'background:gray;color:yellow;');

// ======Инициализация рабочей среды======//
if (!$JsMobileBasic.Mobile) debug('// ======Initializing workspace======//', 'color:gray;');
// Чтение конфига
// if (typeof $Config == "undefined") {
//     console.error('Не найдена конфигурация в файле index.html!');
// }

// if ($Config.fullscreen) fullScreen(1);

// if ($Config.type == 'graphic') {
// $JsMobileBasic.graphic = true;
// if(!$JsMobileBasic.Mobile) debug('Используется графика!', 'background:black;color:yellow;');

// $JsMobileBasic.$style = document.createElement('style');
// $JsMobileBasic.$style.innerHTML = 'html{overflow: hidden;} body{margin:0;padding:0;}';
// document.head.appendChild($JsMobileBasic.$style);

// var c = document.getElementById("c");
//    $JsMobileBasic.canvas = c;
// var ctx = c.getContext("2d");
// if ($Config.canvas_size[0] == '*' && $Config.canvas_size[1] == '*') {
// if(!$JsMobileBasic.Mobile) debug('Canvas растянут на весь экран', 'background:black;color:#00ff00;');
// if (!$JsMobileBasic.Mobile) { $Config.canvas_size[2] ? debug('Вмещение включено') : debug('Вмещение выключено'); }
// c.height = window.innerHeight;
// c.width = window.innerWidth;
// if ($Config.canvas_size[2]) {
//     c.style = 'display:block; margin:0; padding:0; position:fixed; top:0px; left: 0px; width:100%; height:100%;';
// }
// } else {
if (!$JsMobileBasic.Mobile) debug($Config.canvas_size);
//  c.height = $Config.canvas_size[1];
//  c.width = $Config.canvas_size[0];
// }
// } else {
// if (!$JsMobileBasic.Mobile) debug('Графика не используется!', 'background:black;color:yellow;');
// var c = window;
// var ctx = false;
// if (document.getElementById('c') != undefined) document.body.removeChild(document.getElementById('c'));
// }

//  document.getElementsByTagName('title')[0].innerHTML = $Config.name;
//  if (!$JsMobileBasic.Mobile) debug(`Имя проекта: ${$Config.name}`, 'background:brown;color:yellow;');

//  const $Player = [document.getElementById('player0')];
// ======Инициализация интерпретатора======//
if (!$JsMobileBasic.Mobile) debug('// ======Initializeng interpreter======//', 'color:gray;');

// var MobileBasic = {};

// Глобальные переменные

// var $NW, $Files, $OS, $Path, $Proc;

// Контейнеры
// var $Mouse = {
//     x: 0,
//     y: 0,
//     lcount: 0,
//     rcount: 0
// };
// var $Gel = {
//     $Sprite: {}
// };
// var $Font = {
//     family: 'arial',
//     size: '10'
// };
// var $Element = {};
// var $Menu = {
// $Bar: {}
// };

// Константы
// #endregion Init
// const PI = Math.PI;
// const G = 9.8;
// const RAD2DEG = 180 / PI;
// const DEG2RAD = PI / 180;

/** Implemented
 * drawPlot
 * drawRect
 * fillRect
 * drawLine
 * drawArc (circle only)
 * drawCube
 * setColor
 * clear
 * fillScreen
 * clearRect
 * fillArc FIXME: Ошибка в drawLine
 */

const JsMB = {
  _plot: 219, // 249

  setColor(color) {
    // color="black"="rgb(0,0,0)"="rgba(0,0,0,1)"
    // [r,g,b]
    $TMP.color = color;
    return this;
  },

  setBackColor(color) {
    $TMP.bgcolor = color;
    return this;
  },
  setLineWidth(width) {
    ctx.lineWidth = width;
    return this;
  },
  fillRect(x, y, w, h) {
    for (let i = x; i <= x + w; i++) {
      for (let j = y; j <= y + h; j++) {
        this.drawPlot(i, j);
      }
    }
    graphics.repaint();
    return this;
  },
  cls() {
    graphics.fillScreen(...$TMP.bgcolor);
    graphics.repaint();
    return this;
  },
  fillScreen() {
    graphics.fillScreen(...$TMP.color);
    graphics.repaint();
    return this;
  },
  /* fillScreen(r, g, b, from = 0, to = graphics.displayBuffer.length) {
    const colorArray = [b, g, r];
    const buf = Array(to - from).map((_, i) => colorArray[i % 3]);
    graphics.displayBuffer.set(buf, from, to);
    graphics.repaint();
  }, */
  drawRect(x, y, w, h) {
    // =
    for (let i = x; i <= x + w; i++) {
      this.drawPlot(i, y);
      this.drawPlot(i, y + h);
    }

    // ||
    for (let i = y; i <= y + h; i++) {
      this.drawPlot(x, i);
      this.drawPlot(x + w, i);
    }
    graphics.repaint();
    return this;
  },

  /** Draw plot at x, y
   * @param  {number} x - x
   * @param  {number} y - y
   * @returns {bool} true
   */
  drawPlot(x, y, norepaint = false) {
    graphics.setPixel(x, y, ...$TMP.color);
    if (!norepaint) graphics.repaint();
    return this;
  },
  clearRect(x, y, w, h) {
    const tmp = $TMP.color;

    $TMP.color = $TMP.bgcolor;
    this.fillRect(x, y, w, h);
    $TMP.color = tmp;
    return this;
  },
  drawLine(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    for (let x = x1; x <= x2; x++) {
      const y = y1 + (dy * (x - x1) / dx);

      this.drawPlot(x, y);
    }
    return this;
  },
  drawCube(x, y, w, h, q) {
    const depth = (q / Math.sqrt(2));

    this.drawRect(x, y, w, h);
    this.drawRect(x + depth, y + depth, w, h);
    this.drawLine(x, y, x + depth, y + depth);
    this.drawLine(x + w, y, x + w + depth, y + depth);
    this.drawLine(x, y + h, x + depth, y + h + depth);
    this.drawLine(x + w, y + h, x + w + depth, y + h + depth);
    return this;
  },
  drawArc(x0, y0, radius/* , startAngle, endAngle, counterClockwise */) {
    // TODO: Arc isn't a circle

    let x = radius - 1;
    let y = 0;
    let dx = 1;
    let dy = 1;
    let err = dx - (radius * 2);

    while (x >= y) {
      this.drawPlot(x0 + x, y0 + y);
      this.drawPlot(x0 + y, y0 + x);
      this.drawPlot(x0 - y, y0 + x);
      this.drawPlot(x0 - x, y0 + y);
      this.drawPlot(x0 - x, y0 - y);
      this.drawPlot(x0 - y, y0 - x);
      this.drawPlot(x0 + y, y0 - x);
      this.drawPlot(x0 + x, y0 - y);

      if (err <= 0) {
        y++;
        err += dy;
        dy += 2;
      }

      if (err > 0) {
        x--;
        dx += 2;
        err += dx - (radius * 2);
      }
    }
    graphics.repaint();
    return this;
  },
  fillArc(x0, y0, radius/* , startAngle, endAngle, counterClockwise */) {
    // TODO: Arc isn't a circle

    let x = radius - 1;
    let y = 0;
    let dx = 1;
    let dy = 1;
    let err = dx - (radius * 2);

    while (x >= y) {
      this.drawLine(x0, y0, x0 + x, y0 + y);
      this.drawLine(x0, y0, x0 + y, y0 + x);
      this.drawLine(x0, y0, x0 - y, y0 + x);
      this.drawLine(x0, y0, x0 - x, y0 + y);
      this.drawLine(x0, y0, x0 - x, y0 - y);
      this.drawLine(x0, y0, x0 - y, y0 - x);
      this.drawLine(x0, y0, x0 + y, y0 - x);
      this.drawLine(x0, y0, x0 + x, y0 - y);

      if (err <= 0) {
        y++;
        err += dy;
        dy += 2;
      }

      if (err > 0) {
        x--;
        dx += 2;
        err += dx - (radius * 2);
      }
    }
    graphics.repaint();
    return this;
  },
  fillRect4(x, y, x1, y1, x2, y2, x3, y3) {
    const arr = [
      [x, y],
      [x1, y1],
      [x2, y2],
      [x3, y3],
    ];

    ctx.beginPath();
    for (let i = 0; i < arr.length; i++) {
      if (i == 0) ctx.moveTo(arr[i][0], arr[i][1]);
      else ctx.lineTo(arr[i][0], arr[i][1]);
    }
    ctx.fill();
    return this;
  },
  drawRect4(x, y, x1, y1, x2, y2, x3, y3) {
    const arr = [
      [x, y],
      [x1, y1],
      [x2, y2],
      [x3, y3],
    ];

    ctx.beginPath();
    for (let i = 0; i < arr.length; i++) {
      if (i == 0) ctx.moveTo(arr[i][0], arr[i][1]);
      else ctx.lineTo(arr[i][0], arr[i][1]);
    }
    ctx.stroke();
    return this;
  },
  fillTriangle(x, y, x1, y1, x2, y2) {
    const arr = [
      [x, y],
      [x1, y1],
      [x2, y2],
    ];

    ctx.beginPath();
    for (let i = 0; i < arr.length; i++) {
      if (i == 0) ctx.moveTo(arr[i][0], arr[i][1]);
      else ctx.lineTo(arr[i][0], arr[i][1]);
    }
    ctx.fill();
    return this;
  },
  drawTriangle(x, y, x1, y1, x2, y2) {
    const arr = [
      [x, y],
      [x1, y1],
      [x2, y2],
    ];

    ctx.beginPath();
    for (let i = 0; i < arr.length; i++) {
      if (i == 0) ctx.moveTo(arr[i][0], arr[i][1]);
      else ctx.lineTo(arr[i][0], arr[i][1]);
    }
    ctx.stroke();
    return this;
  },
  drawString(text, x, y) {
    x = Math.floor(this.limit(x, 0, this.screenWidth()));
    y = Math.floor(this.limit(y, 0, this.screenHeight()));

    printer.moveTo(x, y);
    printer.print(text, 1, $TMP.color, $TMP.bgcolor);
    printer.moveTo(this.screenWidth(), this.screenHeight());
    return this;
  },
  setFontSize(size) {
    ctx.font = `${size}px ${$Font.family}`;
    $Font.size = size;
    return this;
  },
  setFont(family) {
    ctx.font = `${$Font.size}px ${family}`;
    $Font.family = family;
    return this;
  },
  makeLinearGradient(x, y, x1, y1) {
    return ctx.createLinearGradient(x, y, x1, y1);
  },
  makeRadialGradient(x, y, r, x1, y1, r1) {
    return ctx.createRadialGradient(x, y, r, x1, y1, r1);
  },
  setGradientColor(g, num, color) {
    g.addColorStop(num, color);
    return this;
  },
  // Конвертеры
  rgb(red = 0, green = 0, blue = 0) { // TODO:
    // return `rgb(${red},${green},${blue})`;
    return [red, green, blue];
  },
  rgba(red = 0, green = 0, blue = 0, alpha = 0) {
    return [red, green, blue, alpha];
  },
  rad(deg) {
    if (deg == 90) {
      return PI / 2;
    } else if (deg == 270) {
      return 3 * PI / 2;
    }
    return deg * DEG2RAD;
  },
  deg(rad) {
    return rad * RAD2DEG;
  },
  // Gels/Sprites
  gelLoad(file, name) {
    $Gel[name] = new Image();
    $Gel[name].src = file;
    return this;
  },
  spriteGel(file, name) {
    // $Gel.$Sprite[name] = new Sprite();
    // $Gel.$Sprite[name].src = file;
    debug('Внимание! Функция spriteGel работает некорректно! Обновитесь до последней версии!');
    return false;
    //    var c = new Sprite();
  },
  drawGel(name, x, y) {
    if ($Gel[name].resize == true) {
      ctx.drawImage($Gel[name], x, y, $Gel[name].w, $Gel[name].h);
    } else {
      ctx.drawImage($Gel[name], x, y);
    }
    return this;
  },
  drawSprite(name, x, y) {
    // ctx.drawImage($Gel[name],x,y);
    return false;
  },
  gelSize(name, w, h) {
    $Gel[name].resize = true;
    $Gel[name].w = w;
    $Gel[name].h = h;
    return this;
  },
  drawGelFragment(name, fx, fy, fw, fh, x, y, w, h) {
    if (w == undefined || h == undefined) {
      w = fw;
      h = fh;
    }
    ctx.drawImage($Gel[name], fx, fy, fw, fh, x, y, w, h);
    return this;
  },
  makeTexture(gelname, repeat) { // repeat/no-repeat
    if (repeat == undefined) repeat = 'repeat';
    return ctx.createPattern($Gel[gelname], repeat);
  },
  // IO
  input(text) {
    return io.readLine(text);
  },
  print(text) {
    io.write(text);
    return this;
  },
  println(text) {
    io.writeln(text);
    return this;
  },
  // Sounds
  playSound(file, loop, channel) {
    if (channel === undefined) {
      channel = 0;
    }
    if ($Player[channel] === undefined) {
      const p = document.createElement('audio');

      p.id = `player${channel}`;
      document.getElementById('audio').appendChild(p);
      $Player[channel] = document.getElementById(`player${channel}`);
    }
    $Player[channel].setAttribute('src', file);
    if (!loop) {
      $Player[channel].setAttribute('loop', '0');
      $Player[channel].play();
    } else {
      $Player[channel].setAttribute('loop', '1');
      $Player[channel].play();
    }
    return this;
  },
  pauseSound(channel) {
    if (channel === undefined) {
      channel = 0;
    }
    if (channel == -1) {
      for (const i in $Player) {
        $Player[i].pause();
      }
      return this;
    }
    if ($Player[channel] === undefined) {
      debug('На данном канале нет плеера');
      return false;
    }
    $Player[channel].pause();
    return this;
  },
  // Math
  sqrt(x) {
    return Math.sqrt(x);
  },
  random(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  },
  sin(x) {
    return Math.sin(x);
  },
  cos(x) {
    return Math.cos(x);
  },
  tan(x) {
    return Math.tan(x);
  },
  ctg(x) {
    return 1 / Math.tan(x);
  },
  asin(x) {
    return Math.asin(x);
  },
  acos(x) {
    return Math.acos(x);
  },
  atan(x) {
    return Math.atan(x);
  },
  mod(x, y) {
    return x % y;
  },
  abs(x) {
    return Math.abs(x);
  },
  pow(x, num) {
    return Math.pow(x, num);
  },
  ln(x) {
    return Math.log(x);
  },
  exp(x) {
    return Math.exp(x);
  },
  limit(variable, a, b) {
    if (variable < a) {
      variable = a;
    }
    if (variable > b) {
      variable = b;
    }
    return variable;
  },
  min: Math.min,
  max: Math.max,
  // Strings
  len(str) {
    return str.length;
  },
  str(num) {
    return String(num);
  },
  val(str) {
    return Number(str);
  },
  upper(str) {
    return str.toUpperCase();
  },
  lower(str) {
    return str.toLowerCase();
  },
  mid(str, pos, len) {
    return str.substr(pos, len);
  },
  chr(code) { // code to string
    return String.fromCharCode(code);
  },
  asc(str) { // string to code
    return str.charCode();
  },
  split(str, char) {
    return str.split(char);
  },
  replace(str, reg, to) {
    str.replace(reg, to);
  },
  float(str) {
    return parseFloat(str);
  },
  int: this.val,
  // Files
  saveData(filename, data, callback) {
    const file = `${filename}.json`;
    const filePath = $Path.join($NW.App.dataPath, file);

    data = toJSON(data);

    $File.writeFile(filePath, data, (err) => {
      if (err) {
        alert(`Ошибка при сохранении: ${err.message}`);
        return false;
      } else if (callback) {
        callback();
      }
    });

    window.localStorage.setItem(name, data);
  },
  readData(filename) {
    $Init.File[0]();
    $Init.Path[0]();

    const file = `${filename}.json`;
    const filePath = $Path.join($NW.App.dataPath, file);
    const data = $File.readFileSync(filePath, 'utf8');
    const json = parseJSON(data);

    return json;
  },
  // Local Storage
  localSaveData(name, data) {
    if (typeof (data) === 'object') {
      data = toJSON(data);
    }
    window.localStorage.setItem(name, data);
    return this;
  },
  localReadData(name) {
    try {
      return parseJSON(window.localStorage.getItem(name));
    } catch (e) {
      return window.localStorage.getItem(name);
    }
  },
  // JSON
  parseJSON(json) {
    return JSON.parse(json);
  },
  toJSON(object) {
    return JSON.stringify(object, '', 4);
  },
  toPSON(object) {
    return JSON.stringify(object, (a, b) => typeof (b) === 'function' ? `${b}` : b, 4);
  },
  // Menu
  menuAdd(name, title, onClick, type, fortype) {
    if (true) {
      if ($Menu[name] == undefined) {
        $Menu[name] = new $NW.Menu();
      }
      switch (type) {
        case undefined:
          $Menu[name].append(new $NW.MenuItem({
            label: title,
            click: onClick,
          }));
          break;
        case 'subMenu':
          $Menu[name].append(new $NW.MenuItem({
            label: title,
            submenu: fortype,
          }));
          break;
        case 'checkbox':
          $Menu[name].append(new $NW.MenuItem({
            label: title,
            type: 'checkbox',
            click: onClick,
          }));
          break;
      }
      return this;
    }
    debug('Создание меню невозможно!');
    return false;
  },
  menuShow(name, x, y) {
    if (true) {
      $Menu[name].popup(x, y);
      return this;
    }
    debug('Отображение меню невозможно!');
    return false;
  },
  menuAddSeparator(name) {
    if (true) {
      if ($Menu[name] == undefined) {
        $Menu[name] = new $NW.Menu();
      }
      $Menu[name].append(new $NW.MenuItem({ type: 'separator' }));
      return this;
    }
    debug('Создание меню невозможно!');
    return false;
  },
  // Bar
  menuBarAdd(name, title, subMenu) {
    if (true) {
      if ($Menu.$Bar[name] == undefined) {
        $Menu.$Bar[name] = new $NW.Menu({
          type: 'menubar',
          title,
        });
      }
      $Menu.$Bar[name].append(new $NW.MenuItem({
        label: title,
        submenu: $Menu[subMenu],
      }));
      return this;
    }
    debug('Создание меню невозможно!');
    return false;
  },
  menuBarShow(name) {
    if (true) {
      $NW.Window.get().menu = $Menu.$Bar[name];
      return this;
    }
    debug('Отображение меню невозможно!');
    return false;
  },
  getClipboard(type) {
    if (true) {
      const clipboard = $NW.Clipboard.get();

      if (type == undefined) type = 'text';
      return clipboard.get(type);
    }
    debug('Работа с буфером обмена невозможна!');
    return false;
  },
  setClipboard(value, type) {
    if (true) {
      const clipboard = $NW.Clipboard.get();

      if (type == undefined) type = 'text';
      clipboard.set(value, type);
      return this;
    }
    debug('Работа с буфером обмена невозможна!');
    return false;
  },
  clearClipboard() {
    if (true) {
      const clipboard = $NW.Clipboard.get();

      clipboard.clear();
      return this;
    }
    debug('Работа с буфером обмена невозможна!');
    return false;
  },
  menuTrayAdd(name, title, icon, menu) {
    if (true) {
      const tray = new $NW.Tray({
        title,
        icon,
        alticon: icon,
      });

      tray.menu = $Menu[menu];
      return this;
    }
    debug('Работа с треем невозможна!');
    return false;
  },
  exec(target) {
    if (!$Init.Proc[2]) {
      $Proc.execSync(target);
    }
    return this;
  },
  execFile(file, keys) {
    if (!$Init.Proc[2]) {
      if (typeof (keys) !== 'object') {
        console.warn('Второй аргумент функции execFile должен быть масивом!');
        keys = [];
      }
      const proc = $Proc.execFile(file, keys, (error, stdout, stderr) => {
        if (error) {
          debug(`Ошибка при работе с процессом: ${error}`);
        }

        return stdout;
      });
    } else {
      debug('Работа с процессами невозможна!');
      return false;
    }
  },
  // Modules
  include(file) {
    const e = document.createElement('script');

    e.src = file;
    e.type = 'text/javascript';
    document.getElementById('modules').appendChild(e);
    return this;
  },
  getModuleName(ID) {
    return ID.name; // /FIXME: What the hell?
  },
  getModuleAuthor(ID) {
    return ID.author; // /FIXME: What the hell?
  },
  getModuleDescription(ID) {
    return ID.description; // /FIXME: What the hell?
  },
  getModuleUrl(ID) {
    return ID.url; // /FIXME: What the hell?
  },
  getModuleVersion(ID) {
    return ID.version; // /FIXME: What the hell?
  },
  // Getter
  screenWidth() {
    return 80;
  },
  screenHeight() {
    return 25;
  },
  getMouseX() {
    return $Mouse.x;
  },
  getMouseY() {
    return $Mouse.y;
  },
  getLeftClicksCount() {
    return $Mouse.lcount;
  },
  getRightClicksCount() {
    return $Mouse.rcount;
  },
  // tech
  log(text) {
    console.log(text);
    return this;
  },
  debug(text, style) {
    if ($Config.Debug_Mode) {
      if (!$JsMobileBasic.Mobile) {
        if (style === undefined) style = 'background: black; color: red;';
        console.log(`%c ${text}`, style);
        return this;
      }
      alert(style);
      return this;
    }
    return false;
  },
  exit() {
    window.close();
    return this;
  },
  fullScreen(mode) {
    return this;
  },

};

// #region Listeners

// Обработчики событий
// function _eventListeners() {
//   c.addEventListener('mousemove', (event) => {
//     $Mouse.x = event.offsetX;
//     $Mouse.y = event.offsetY;
//     if (typeof (onMouseMove) !== 'undefined') onMouseMove(event.pageX, event.pageY, event);
//   }, false);
//   c.addEventListener('click', (event) => {
//     $Mouse.lcount++;
//     //    onClick(event.offsetX, event.offsetY);
//     if (typeof (onClick) !== 'undefined') onClick(event.pageX, event.pageY, event);
//     //    if($listener != undefined){
//     //        eval($listener.click + '=onClick;');
//     //    }
//   }, false);
//   c.addEventListener('mousedown', (event) => {
//     if (typeof (onMouseDown) !== 'undefined') onMouseDown(event.pageX, event.pageY, event);
//     //    if($listener != undefined){
//     //        eval($listener.mousedown + '=onMouseDown;');
//     //    }
//   }, false);
//   c.addEventListener('mouseup', (event) => {
//     if (typeof (onMouseUp) !== 'undefined') onMouseUp(event.pageX, event.pageY, event);
//     //    if($listener != undefined){
//     //        eval($listener.mouseup + '=onMouseUp;');
//     //    }
//   }, false);
//   c.addEventListener('contextmenu', (event) => {
//     $Mouse.rcount++;
//     if (typeof (onRightClick) !== 'undefined') onRightClick(event.pageX, event.pageY, event);
//     //    if($listener != undefined){
//     //        eval($listener.rclick + '=onRightClick;');
//     //    }
//   }, false);
//   window.addEventListener('keypress', (event) => {
//     if (typeof (onKeyPress) !== 'undefined') onKeyPress(event.keyCode, event);
//   }, false);

//   window.addEventListener('keydown', (event) => {
//     if (typeof (onKeyDown) !== 'undefined') onKeyDown(event.keyCode, event);
//   }, false);

//   window.addEventListener('keyup', (event) => {
//     if (typeof (onKeyUp) !== 'undefined') onKeyUp(event.keyCode, event);
//   }, false);
// }

// ======Прочее======//
// Блокировка контекстного меню при правом клике

if (!$JsMobileBasic.Mobile) debug('// ======Initialized successful======//', 'background:black;color: #00ff00;');

// onload = function () {
//   _eventListeners();
//   try {
//     Main();
//   } catch (e) {
//     throw new Error('В файле Autorun.bas должен быть хук Main()!');
//   }
//   if (typeof Loop === 'function') {
//     if (!window.requestAnimationFrame) {
//       window.requestAnimationFrame = (window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (fnc) {
//         return window.setTimeout(fnc, 1000 / 60);
//       });
//     }

//     function $Loop() {
//       window.requestAnimationFrame($Loop);
//       try {
//         Loop();
//       } catch (e) {
//         throw new Error('В файле Autorun.bas должен быть хук Loop()!');
//         $Loop = function () {};
//       }
//     }
//     $Loop();
//   }
// };

// #endregion Listeners

if (!$JsMobileBasic.Mobile) debug('// ======Including modules/libraries======//', 'color:gray;');

module.exports = $$.JsMB = JsMB;
