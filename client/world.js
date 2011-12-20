var world = function (spec, my) {
    var that, x=0, y=0, map={}, tiles, oldScreen = -1;
    my = my || {};

	var urls = [
		"/img/tileset/desert.png",
		"/img/tileset/grass.png",
		"/img/tileset/ice.png",
	];
	var imgs = new Array(urls.length);
	var tilesets = new Array(urls.length);
	for(var i = 0; i < urls.length; ++i) {
		imgs[i] = new Image();
	    imgs[i].id = i;
		imgs[i].onload = function(){
			tilesets[this.id] = new SpriteSheet( {
				images: [this],
				frames: {width: 48, height:48},
			});
			that.update();
		}
		imgs[i].src = urls[i];
	}
    
    that = new Container();

    that.width = 15;
    that.height = 15;
    that.screen;
	that.monsters = [];
    
    that.collidePoint = function (x, y) {
        if (this.screen) {
            x = Math.floor(Math.max(0, Math.min(this.width - 1, x)));
            y = Math.floor(Math.max(0, Math.min(this.height - 1, y)));
            return(tiledata[this.screen.overworld.data[x][y]].isSolid);
        }
    }
    
    that.collideRect = function (x, y, w, h) {
        return(this.collidePoint(x, y) || this.collidePoint(x + w, y) ||
               this.collidePoint(x, y + h) || this.collidePoint(x + w, y + h));
    }
    
    that.getTile = function (x, y) {
        x = Math.floor(Math.max(0, Math.min(this.width - 1, x)));
        y = Math.floor(Math.max(0, Math.min(this.height - 1, y)));
        return this.screen.overworld.data[x][y];
    }
    
    that.moveTo = function (newX, newY) {
        SoundJS.stop("titletheme");
	    SoundJS.play("overworld", null, 0.6, true);
		if(this.screen) {
			socket.emit('setscreen',this.screen);
		}

		x = newX;
        y = newY;
        
        this.screen = map[x + ',' + y];
        if (this.screen) {
	        this.update();
	    } else {
	        socket.emit('newscreen');
	    }	    
    }

	that.reset = function() {
		socket.emit('setscreen',this.screen);
		this.screen = null;
		
		socket.emit('freescreens');
		map = {}

		this.monsters = [];
		oldScreen = -1;

		this.moveTo(0,0);
	}
    
    that.setTile = function (x, y, tile) {
        x = Math.floor(Math.max(0, Math.min(this.width - 1, x)));
        y = Math.floor(Math.max(0, Math.min(this.height - 1, y)));
        this.screen.overworld.data[x][y] = tile;
        world.update();
    }
    
    that.update = function () {
		if(this.screen) {
		    console.log('tileset: '+this.screen.overworld.tileset);
		    var tileset = 0;
            if (this.screen.overworld.tileset == 'desert') {
		        tileset = 0;
		    } else if (this.screen.overworld.tileset == 'grass') {
		        tileset = 1;
		    } else if (this.screen.overworld.tileset == 'ice') {
		        tileset = 2;
		    }
		    console.log(tileset);
			if(this.tilesets[1]) {
				this.removeAllChildren();
				for(var y = 0; y < 15; ++y) {
					for(var x = 0; x < 15; ++x) {
						var b = new BitmapAnimation(this.tilesets[1]);
						b.gotoAndStop(this.screen.overworld.data[x][y]);
						b.scaleX = 1/48;
						b.scaleY = 1/48;
						b.x = x;
						b.y = y;
						this.addChild(b);
					}
				}

				if(this.screen.monsters && oldScreen != this.screen.id) {
					oldScreen = this.screen.id;
					this.monsters = [];
					for(var i = 0; i < this.screen.monsters.length; ++i) {
						this.monsters[i] = monster(this.screen.monsters[i]);
						this.addChild(this.monsters[i]);
					}
				} else {
					for(var i = 0; i < this.monsters.length; ++i) {
						this.addChild(this.monsters[i]);
					}
				}
			}
		}
    }
    
    that.x = function () {
        return x;
    }
    
    that.y = function () {
        return y;
    }
    
    socket.on('screen', function (newScreen) {
        console.log(newScreen.overworld.data);
        if (!that.screen) {
            that.screen = newScreen;
            that.update();
            map[x + ',' + y] = newScreen;
        }
	});
    socket.emit('newscreen');
    
    return that;
}

