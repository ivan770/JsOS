
var keypress = require('keypress');

keypress(process.stdin);

var keyMap = {
	'enter': '\n',
	'tab': '\t',
	'backspace':'\b',
	'space': ' ',
	'escape': 'esc',
	'up': '↑',
	'down': '↓',
	'left': '←',
	'right': '→'
};

var Keys = module.exports = function() {
	this.fn = function() {};
	var self = this;
	process.stdin.on('keypress', function(ch,key) {
		var name;
		if(key && key.ctrl && key.name) {
			name = '<Ctrl-' + key.name + '>';
		} else if(!key && typeof ch === 'string') {
			name = ch;
		} else {
			name = key.name
			if(key.shift) name = name.toUpperCase();
		}
		if(name in keyMap) name = keyMap[name];
		self.fn(name);
	});
};

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
