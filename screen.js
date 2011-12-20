var screens = {};
var nextID = 0;
var queue = [];

//Array of levels
	
var lvls = [  //array of level data arrays

{ "height":15,
 "layers":[
        {
         "data":[28, 20, 20, 20, 20, 23, 1, 1, 1, 24, 20, 20, 20, 20, 25, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 34, 1, 1, 1, 1, 1, 1, 1, 33, 1, 17, 19, 34, 1, 1, 1, 1, 1, 1, 1, 33, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 23, 1, 1, 1, 1, 1, 15, 6, 1, 1, 1, 33, 1, 1, 24, 1, 1, 1, 1, 1, 1, 35, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 3, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 34, 1, 1, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 19, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 17, 19, 1, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 27, 18, 18, 18, 18, 22, 1, 1, 1, 21, 18, 18, 18, 18, 26],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":48,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/client\/img\/tileset\/desert.png",
         "imageheight":768,
         "imagewidth":768,
         "margin":0,
         "name":"desert",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":48,
         "tilewidth":48
        }],
 "tilewidth":48,
 "version":1,
 "width":15
},
//paste new Tiled levels here!



];

//map 1-based tileset indices to 0-based indices and convert to 2D array
for (var i = 0; i < lvls.length; i++)
{
       	var data = new Array(15);
       	var size = 15;
       	for(var x = 0; x < size; ++x) {
       		data[x] = new Array(15);
       		for(var y = 0; y < size; ++y) {
       			data[x][y] = lvls[i].layers[0].data[x + y*size] - 1;
       		}
       	}
       	
       	lvls[i].layers[0].data = data;
}	

var randLevel = function ()
{
	return lvls[Math.floor(Math.random() * lvls.length)]; 
}


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
	if(n > 50) {
		return 0;
	} else {
		return 1 - n/50;
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
							   [3,48,48,48,48, 0,128,0,129,0, 49,49,49,49,3],
							   [3,48,48,48,48, 0,0,67,0,0, 49,49,49,49,3],
							   [3,48,48,48,48, 0,83,83,83,0, 49,49,49,49,3],
							   [3,48,48,48,48, 0,0,0,0,0, 49,49,49,49,3],

							   [13,0,0,0,0, 32,0,0,0,32, 32,0,0,81,13],
							   [0,34,0,34,0, 0,66,66,66,0, 0,32,0,0,0],
							   [0,0,34,0,0, 0,66,50,66,0, 32,0,32,0,0],
							   [0,34,0,34,0, 0,66,66,66,0, 0,32,0,0,0],
							   [15,0,0,0,0, 32,0,0,0,32, 32,0,0,81,15],

							   [3,64,64,64,64, 0,33,33,33,0, 0,0,0,0,3],
							   [3,64,64,64,64, 0,0,0,0,0, 0,0,0,0,3],
							   [3,64,64,64,64, 0,33,33,33,0, 0,0,0,0,3],
							   [3,64,64,64,64, 0,0,0,0,0, 0,0,0,0,3],
							   [7,2,2,2,2, 12,0,0,0,14, 2,2,2,2,6]
							  ];
    }

    spec.overworld.tileset = Math.floor(Math.random()*3);
    
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
        var level = randLevel();
	    that.overworld = { 'data': level.layers[0].data,
	                       'tileset': 0,//level.tilesets[0]['name'],
						 };
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
