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

//map 1-based tileset indices to 0-based indices
for (var i = 0; i < lvls.length; i++)
{
	for(var j = 0; j < 225; j++)
		lvls[i].layers[0].data[j]--;
}	

exports.randLevel = function ()
{
	return lvls[Math.floor(Math.random() * lvls.length)].layers[0].data; 
}

