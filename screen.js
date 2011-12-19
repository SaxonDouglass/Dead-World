var screens = {};
var nextID = 0;
var queue = [];

exports.random = function() {
	if(Math.random() < newChance(queue.length)) {
		console.log('New screen');
		var seed = Math.floor(Math.random()*1);
		var spec = generate(seed);
		var s = exports.create(spec);
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
		s = s.slice(0);
		for(i = 0; i < s.length; i++) {
			j = i + Math.floor(Math.random()*(s.length - i));
			queue.push(s[j]);
			s[j] = s[i];
		}
	} else {
		queue.push(s);
	}
	console.log(queue);
}

/* LEVEL TEMPLATE
[[4,2,2,2,2, 12,0,0,0,14, 2,2,2,2,5],
[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],

[13,0,0,0,0, 0,0,0,0,0, 0,0,0,0,13],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
[15,0,0,0,0, 0,0,0,0,0, 0,0,0,0,15],

[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
[3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
[7,2,2,2,2, 12,0,0,0,14, 2,2,2,2,6]
];						  
*/
var generate = function(seed) {
    var spec = {};
    spec.overworld = {};
	if (seed == 0) {
	    spec.overworld.data = [[4,2,2,2,2, 12,0,0,0,14, 2,2,2,2,5],
							   [3,40,40,40,40, 0,0,0,0,0, 41,41,41,41,3],
							   [3,40,40,40,40, 0,0,0,0,0, 41,41,41,41,3],
							   [3,40,40,40,40, 0,0,0,0,0, 41,41,41,41,3],
							   [3,40,40,40,40, 0,0,0,0,0, 41,41,41,41,3],

							   [13,0,0,0,0, 0,0,0,0,0, 0,0,0,0,13],
							   [0,0,0,0,0, 0,46,46,46,0, 0,0,0,0,0],
							   [0,0,0,0,0, 0,46,45,46,0, 0,0,0,0,0],
							   [0,0,0,0,0, 0,46,46,46,0, 0,0,0,0,0],
							   [15,0,0,0,0, 0,0,0,0,0, 0,0,0,0,15],

							   [3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
							   [3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
							   [3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
							   [3,0,0,0,0, 0,0,0,0,0, 0,0,0,0,3],
							   [7,2,2,2,2, 12,0,0,0,14, 2,2,2,2,6]
							  ];
    }
    
    return spec;
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

	if(spec.monsters) {
		that.monsters = spec.monsters;
	} else {
		that.monsters = [
			{'x': 5, 'y': 7},
			{'x': 9, 'y': 7},
		];
	}
    
    if (spec.overworld) {
        for (var i = 0; i < 15; ++i) {
            for (var j = 0; j < i; ++j) {
                var temp = spec.overworld.data[j][i];
                spec.overworld.data[j][i] = spec.overworld.data[i][j];
                spec.overworld.data[i][j] = temp;
            }
        }
        that.overworld = spec.overworld;
    } else {
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
	}

    if (spec.underworld) {
        that.underworld = spec.underworld;
    } else {
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
    }

	return that;
}
