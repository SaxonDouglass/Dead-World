var screens = {};
var nextID = 0;
var queue = [];

exports.random = function() {
	if(Math.random() < newChance(queue.length)) {
		console.log('New screen');
		var s = exports.create();
		screens[s.id] = s;
		return s;
	} else {
		console.log('Old screen');
		return screens[queue.shift()];
	}
}

var newChance = function(n) {
	if(n > 3) {
		return 0;
	} else {
		return 1 - n/3;
	}
}

exports.free = function(s) {
	if(s instanceof Array) {
		for(i = 0; i < s.length; i++) {
			queue.push(s[i]);
		}
	} else {
		queue.push(s);
	}
}

exports.get = function(id) {
	var screen = screens[id];
	if(!screen) {
		screen = exports.random();
	}
	return screen;
}

exports.set = function(s) {
	screens[s.id] = s;
}

exports.create = function(spec,my) {
	var that;
	my = my || {};
	spec = spec || {};
	
	that = {};

	if(spec.id && !screens[spec.id]) {
		that.id = spec.id;
		if(spec.id >= nextID) {
			nextID = spec.id;
		}
	} else {
		that.id = nextID;
		nextID++;
	}

	that.overworld = { 'data': [[1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,0,0,1,1, 1,0,0,0,1, 1,1,0,0,1,],
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        [1,0,0,1,1, 1,0,0,0,1, 1,1,0,0,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
							   ],
					 };
	that.overworld.data[7][that.id] = 1;

	that.underworld = { 'data': [[1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,0,0,1,1, 1,0,0,0,1, 1,1,0,0,1,],
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                        [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        
		                        [1,0,0,1,0, 0,0,0,0,0, 0,1,0,0,1,],
		                        [1,0,0,1,1, 1,0,0,0,1, 1,1,0,0,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                        [1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
							   ],
					 };

	return that;
}
