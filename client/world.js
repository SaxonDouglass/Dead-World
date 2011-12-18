var world = function (spec, my) {
    var that, x=0, y=0, map={}, tiles;
    my = my || {};

	var img = new Image();
	var sheet;
	img.onload = function(){
		sheet = new SpriteSheet( {
			images: [img],
			frames: {width: 16, height:16},
		});
		tiles = [];
		for(var i = 1; i < sheet.getNumFrames(); i++) {
			tiles[i] = sheet.getFrame(i);
		}		
        that.update();
	}
	img.src = "/img/tileset.png";
    
    that = new Container();

    that.width = 15;
    that.height = 15;
    that.screen = null;
    
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
        return this.screen.overworld.data[Math.floor(x)][Math.floor(y)];
    }
    
    that.moveTo = function (newX, newY) {
        socket.emit('setscreen', this.screen);
    
        x = newX;
        y = newY;
        
        this.screen = map[x + ',' + y];
        if (this.screen) {
	        this.update();
	    } else {
	        socket.emit('newscreen');
	    }	    
    }
    
    that.setTile = function (x, y, tile) {
        this.screen.overworld.data[Math.floor(x)][Math.floor(y)] = tile;
        world.update();
    }
    
    that.update = function () {
		if(this.screen && tiles) {
			this.removeAllChildren();
			for(var y = 0; y < 15; ++y) {
				for(var x = 0; x < 15; ++x) {
					var b = new BitmapAnimation(sheet);
					b.gotoAndStop(this.screen.overworld.data[x][y]);
					b.snapToPixel = false;
					b.scaleX = 1/16;
					b.scaleY = 1/16;
					b.x = x;
					b.y = y;
					this.addChild(b);
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
        if (!that.screen) {
            that.screen = newScreen;
            that.update();
            map[x + ',' + y] = newScreen;
        }
	});
    socket.emit('newscreen');
    
    return that;
}

