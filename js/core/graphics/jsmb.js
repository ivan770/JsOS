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
const graphics = $$.graphics;

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
  name: "Интерпретатор MobileBasic'a",
  fullscreen: false,
};

const $TMP = {
  color: [],
  bgcolor: [],
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
//         return true;
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
const PI = Math.PI;
const G = 9.8;
const RAD2DEG = 180 / PI;
const DEG2RAD = PI / 180;

const JsMB = {
  setColor(color) {
    // color="black"="rgb(0,0,0)"="rgba(0,0,0,1)"
    // [r,g,b]
    $TMP.color = color;
    return true;
  },
  setLineWidth(width) {
    ctx.lineWidth = width;
    return true;
  },
  fillRect(x, y, x1, y1) {
    ctx.fillRect(x, y, x1, y1);
    return true;
  },
  cls() {
    graphics.fillScreen(...$JsMobileBasic.background);
    return true;
  },
  fillScreen(color) {
    graphics.fillScreen(...color);
    return true;
  },
  /* fillScreen(r, g, b, from = 0, to = graphics.displayBuffer.length) {
    const colorArray = [b, g, r];
    const buf = Array(to - from).map((_, i) => colorArray[i % 3]);
    graphics.displayBuffer.set(buf, from, to);
    graphics.repaint();
  }, */
  drawRect(x, y, w, h) {
    ctx.strokeRect(x, y, w, h);
    return true;
  },
  drawPlot(x, y) {
    ctx.save();
    this.setLineWidth(1);
    this.drawLine(x, y, x + 1, y + 1);
    ctx.restore();
    return true;
  },
  clearRect(x, y, w, h) {
    ctx.clearRect(x, y, w, h);
    return true;
  },
  drawLine(x, y, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    return true;
  },
  drawCube(x, y, x1, y1, q) {
    ctx.strokeRect(x, y, x1, y1);
    ctx.strokeRect(x + (q / Math.sqrt(2)), y + (q / Math.sqrt(2)), x1, y1);
    drawLine(x, y, x + (q / Math.sqrt(2)), y + (q / Math.sqrt(2)));
    drawLine(x + x1, y, x + x1 + (q / Math.sqrt(2)), y + (q / Math.sqrt(2)));
    drawLine(x, y + y1, x + (q / Math.sqrt(2)), y + y1 + (q / Math.sqrt(2)));
    drawLine(x + x1, y + y1, x + x1 + (q / Math.sqrt(2)), y + y1 + (q / Math.sqrt(2)));
    return true;
  },
  drawArc(x, y, radius, startAngle, endAngle, counterClockwise) {
    if (startAngle == undefined) {
      startAngle = 15 * Math.PI / 7;
    }

    if (endAngle == undefined) {
      endAngle = 13 * Math.PI / 2;
    }
    if (counterClockwise == undefined) {
      counterClockwise = false;
    } // направление дуги. По умолчанию false

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    ctx.stroke();
    return true;
  },
  fillArc(x, y, radius, startAngle, endAngle, counterClockwise) {
    if (startAngle == undefined) {
      startAngle = 15 * Math.PI / 7;
    }
    if (endAngle == undefined) {
      endAngle = 13 * Math.PI / 2;
    }
    if (counterClockwise == undefined) {
      counterClockwise = false;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    ctx.fill();
    return true;
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
    return true;
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
    return true;
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
    return true;
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
    return true;
  },
  drawString(text, x, y) {
    ctx.fillText(text, x, y);
    return true;
  },
  setFontSize(size) {
    ctx.font = `${size}px ${$Font.family}`;
    $Font.size = size;
    return true;
  },
  setFont(family) {
    ctx.font = `${$Font.size}px ${family}`;
    $Font.family = family;
    return true;
  },
  makeLinearGradient(x, y, x1, y1) {
    return ctx.createLinearGradient(x, y, x1, y1);
  },
  makeRadialGradient(x, y, r, x1, y1, r1) {
    return ctx.createRadialGradient(x, y, r, x1, y1, r1);
  },
  setGradientColor(g, num, color) {
    g.addColorStop(num, color);
    return true;
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
    return true;
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
    return true;
  },
  drawSprite(name, x, y) {
    // ctx.drawImage($Gel[name],x,y);
    return false;
  },
  gelSize(name, w, h) {
    $Gel[name].resize = true;
    $Gel[name].w = w;
    $Gel[name].h = h;
    return true;
  },
  drawGelFragment(name, fx, fy, fw, fh, x, y, w, h) {
    if (w == undefined || h == undefined) {
      w = fw;
      h = fh;
    }
    ctx.drawImage($Gel[name], fx, fy, fw, fh, x, y, w, h);
    return true;
  },
  makeTexture(gelname, repeat) { // repeat/no-repeat
    if (repeat == undefined) repeat = 'repeat';
    return ctx.createPattern($Gel[gelname], repeat);
  },
  // IO
  input(text) {
    return io.prompt(text);
  },
  print(text) {
    io.write(text);
    return true;
  },
  println(text) {
    io.writeln(text);
    return true;
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
    return true;
  },
  pauseSound(channel) {
    if (channel === undefined) {
      channel = 0;
    }
    if (channel == -1) {
      for (const i in $Player) {
        $Player[i].pause();
      }
      return true;
    }
    if ($Player[channel] === undefined) {
      debug('На данном канале нет плеера');
      return false;
    }
    $Player[channel].pause();
    return true;
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
    return true;
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
      return true;
    }
    debug('Создание меню невозможно!');
    return false;
  },
  menuShow(name, x, y) {
    if (true) {
      $Menu[name].popup(x, y);
      return true;
    }
    debug('Отображение меню невозможно!');
    return false;
  },
  menuAddSeparator(name) {
    if (true) {
      if ($Menu[name] == undefined) {
        $Menu[name] = new $NW.Menu();
      }
      $Menu[name].append(new $NW.MenuItem({
        type: 'separator',
      }));
      return true;
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
      return true;
    }
    debug('Создание меню невозможно!');
    return false;
  },
  menuBarShow(name) {
    if (true) {
      $NW.Window.get().menu = $Menu.$Bar[name];
      return true;
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
      return true;
    }
    debug('Работа с буфером обмена невозможна!');
    return false;
  },
  clearClipboard() {
    if (true) {
      const clipboard = $NW.Clipboard.get();
      clipboard.clear();
      return true;
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
      return true;
    }
    debug('Работа с треем невозможна!');
    return false;
  },
  exec(target) {
    if (!$Init.Proc[2]) {
      $Proc.execSync(target);
    }
    return true;
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
    return true;
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
    return graphics.screen.width;
  },
  screenHeight() {
    return graphics.screen.height;
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
    return true;
  },
  debug(text, style) {
    if ($Config.Debug_Mode) {
      if (!$JsMobileBasic.Mobile) {
        if (style === undefined) style = 'background: black; color: red;';
        console.log(`%c ${text}`, style);
        return true;
      }
      alert(style);
      return true;
    }
    return false;
  },
  exit() {
    window.close();
    return true;
  },
  fullScreen(mode) {
    if (true) {
      if (mode) {
        var tmp = $NW.Window.get();
        tmp.enterFullscreen();
      } else {
        var tmp = $NW.Window.get();
        tmp.leaveFullscreen();
      }
    } else {
      debug('Работа с процессами невозможна!');
      return false;
    }
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
