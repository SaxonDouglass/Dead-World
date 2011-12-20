var screens = {};
var nextID = 0;
var queue = [];

//Array of levels
	
var lvls = [  //array of level data arrays

{ "height":15,
 "layers":[
        {
         "data":[28, 20, 20, 20, 20, 23, 1, 1, 1, 17, 28, 20, 20, 20, 25, 19, 1, 1, 1, 1, 1, 1, 1, 21, 26, 19, 35, 35, 34, 17, 19, 1, 1, 1, 34, 1, 1, 1, 17, 28, 23, 34, 35, 35, 17, 19, 34, 1, 1, 1, 1, 1, 1, 24, 23, 1, 35, 34, 35, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 18, 18, 26, 23, 1, 1, 1, 34, 1, 1, 1, 1, 1, 21, 26, 28, 20, 20, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 24, 20, 23, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 1, 1, 1, 1, 34, 1, 1, 1, 1, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 27, 18, 18, 22, 1, 1, 1, 34, 1, 1, 1, 1, 1, 1, 17, 28, 20, 20, 23, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 17, 27, 22, 34, 35, 21, 22, 1, 1, 1, 1, 1, 1, 1, 1, 17, 29, 27, 18, 18, 26, 19, 1, 1, 1, 21, 18, 18, 18, 18, 26],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "height":15,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":288,
                 "y":144
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":96,
                 "y":336
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":384,
                 "y":432
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":528,
                 "y":576
                }],
         "opacity":1,
         "type":"objectgroup",
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
{ "height":15,
 "layers":[
        {
         "data":[28, 20, 20, 20, 20, 23, 1, 1, 1, 24, 20, 20, 20, 20, 25, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 33, 1, 1, 1, 52, 1, 1, 33, 1, 1, 1, 17, 19, 1, 1, 1, 1, 33, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 52, 1, 1, 1, 1, 1, 1, 52, 1, 1, 1, 17, 23, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 1, 24, 1, 1, 1, 33, 1, 1, 1, 1, 33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 52, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 1, 1, 52, 1, 22, 1, 1, 1, 33, 1, 1, 1, 1, 52, 4, 1, 1, 1, 21, 19, 1, 1, 1, 1, 1, 1, 1, 1, 5, 12, 3, 3, 13, 17, 19, 1, 21, 22, 1, 1, 1, 33, 1, 4, 1, 33, 1, 1, 17, 19, 35, 17, 19, 1, 1, 1, 1, 1, 14, 1, 52, 52, 1, 17, 19, 35, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 33, 1, 17, 27, 18, 26, 27, 18, 22, 1, 1, 1, 21, 18, 18, 18, 18, 26],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "height":15,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":336,
                 "y":240
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":48,
                 "y":480
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":480,
                 "y":576
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":576,
                 "y":96
                }],
         "opacity":1,
         "type":"objectgroup",
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
{"height":15,
 "layers":[
        {
         "data":[28, 20, 20, 20, 20, 23, 1, 1, 1, 24, 20, 20, 20, 20, 25, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 1, 17, 19, 1, 1, 1, 21, 18, 18, 18, 22, 1, 1, 1, 1, 1, 17, 23, 1, 1, 1, 24, 20, 20, 25, 27, 18, 22, 1, 1, 1, 24, 1, 1, 1, 1, 52, 33, 52, 24, 20, 20, 23, 1, 1, 1, 1, 1, 1, 1, 1, 21, 18, 22, 33, 52, 33, 52, 1, 1, 1, 1, 1, 1, 1, 1, 24, 25, 27, 18, 18, 18, 22, 1, 1, 1, 1, 22, 1, 1, 1, 1, 24, 20, 25, 29, 29, 19, 1, 1, 1, 21, 19, 1, 1, 34, 1, 1, 35, 24, 20, 20, 23, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 17, 19, 1, 1, 1, 1, 1, 34, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 27, 18, 18, 18, 18, 22, 1, 1, 1, 21, 18, 18, 18, 18, 26],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "height":15,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":96,
                 "y":288
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":432,
                 "y":576
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":480,
                 "y":96
                }],
         "opacity":1,
         "type":"objectgroup",
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
{ "height":15,
 "layers":[
        {
         "data":[28, 20, 20, 20, 20, 23, 1, 1, 1, 24, 20, 20, 20, 20, 25, 19, 1, 1, 34, 1, 33, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 34, 1, 15, 6, 34, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 13, 1, 1, 17, 19, 33, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 17, 23, 1, 1, 1, 1, 34, 1, 1, 1, 35, 4, 1, 1, 34, 24, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3, 7, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3, 3, 10, 7, 34, 1, 1, 33, 1, 1, 1, 34, 1, 1, 4, 35, 1, 14, 1, 1, 1, 1, 1, 1, 1, 22, 1, 5, 3, 12, 13, 1, 1, 1, 1, 1, 1, 1, 34, 21, 19, 1, 4, 1, 33, 1, 1, 1, 34, 1, 1, 1, 1, 1, 17, 19, 1, 14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 34, 1, 1, 1, 1, 1, 1, 1, 34, 17, 27, 18, 18, 18, 18, 22, 1, 1, 1, 21, 18, 18, 18, 18, 26],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        },        {
         "height":15,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":336,
                 "y":192
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":144,
                 "y":288
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":480,
                 "y":480
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, ],
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
{ "height":15,
 "layers":[
        {
         "data":[28, 20, 20, 20, 20, 23, 1, 1, 1, 24, 20, 20, 20, 20, 25, 19, 1, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 1, 1, 1, 17, 19, 1, 1, 1, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 23, 1, 1, 1, 1, 1, 15, 6, 1, 1, 1, 1, 33, 1, 24, 1, 1, 1, 1, 1, 1, 35, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 3, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 19, 1, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 17, 19, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 27, 18, 18, 18, 18, 22, 1, 1, 1, 21, 18, 18, 18, 18, 26],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "height":15,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"0",
                 "width":48,
                 "x":384,
                 "y":288
                }],
         "opacity":1,
         "type":"objectgroup",
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
{ "height":15,
 "layers":[
        {
         "data":[29, 29, 29, 29, 29, 19, 1, 1, 1, 24, 20, 20, 20, 20, 25, 29, 29, 29, 29, 29, 19, 1, 34, 1, 1, 1, 1, 1, 35, 17, 29, 29, 29, 29, 29, 27, 22, 1, 1, 1, 33, 1, 1, 1, 17, 29, 29, 29, 29, 29, 29, 19, 1, 1, 1, 1, 1, 1, 1, 17, 29, 29, 29, 29, 29, 29, 19, 1, 1, 1, 34, 1, 1, 1, 17, 20, 20, 20, 25, 29, 29, 19, 1, 1, 1, 1, 1, 1, 1, 24, 1, 1, 34, 24, 20, 20, 23, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 34, 1, 1, 1, 1, 33, 1, 1, 34, 1, 1, 34, 1, 1, 1, 1, 1, 22, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 21, 19, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 1, 1, 17, 19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 19, 1, 1, 1, 1, 34, 1, 1, 1, 1, 1, 1, 34, 1, 17, 19, 35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 27, 18, 18, 18, 18, 22, 1, 1, 1, 21, 18, 18, 18, 18, 26],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":15,
         "x":0,
         "y":0
        },        {
         "height":15,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":432,
                 "y":240
                }, 
                {
                 "height":48,
                 "name":"",
                 "properties":
                    {

                    },
                 "type":"1",
                 "width":48,
                 "x":192,
                 "y":480
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, ],
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
	
	var level = randLevel();

	if(spec.monsters) {
		that.monsters = spec.monsters;
	} else {
	    that.monsters = [];
	    for (var m = 0; m < level.layers[1].objects.length; ++m) {
	        that.monsters[m] = {
	            x: level.layers[1].objects[m].x/48,
	            y: level.layers[1].objects[m].y/48,
	            type: level.layers[1].objects[m].type,
	        };
	    }
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
        /*var tileset = 0;
        if (level.tilesets[0]['name'] == 'desert') {
            tileset = 0;
        } else if (level.tilesets[0]['name'] == 'grass') {
            tileset = 1;
        } else if (level.tilesets[0]['name'] == 'ice') {
            tileset = 2;
        }*/
	    that.overworld = { 'data': level.layers[0].data,
	                       'tileset': Math.floor(Math.random()*3),
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
