var world = function (spec, my) {
    var that, x=0, y=0, map={};
    my = my || {};
    
    that = new Container();

    that.width = 15;
    that.height = 15;
    that.screen = null;
    
    that.collidePoint = function (x, y) {
        if (this.screen) {
            x = Math.floor(Math.max(0, Math.min(this.width - 1, x)));
            y = Math.floor(Math.max(0, Math.min(this.height - 1, y)));
            return(this.screen.overworld.data[x][y] > 0);
        }
    }
    
    that.collideRect = function (x, y, w, h) {
        return(this.collidePoint(x, y) || this.collidePoint(x + w, y) ||
               this.collidePoint(x, y + h) || this.collidePoint(x + w, y + h));
    }
    
    that.moveTo = function (newX, newY) {
        x = newX;
        y = newY;
        
        this.screen = map[x + ',' + y];
        if (this.screen) {
	        this.update();
	    } else {
	        socket.emit('newscreen');
	    }	    
    }
    
    that.update = function () {
        this.removeAllChildren();
        for(var y = 0; y < 15; ++y) {
            for(var x = 0; x < 15; ++x) {
                var g = new Graphics();
                g.setStrokeStyle(1);
                if(this.screen.overworld.data[x][y] == 0) {
                    g.beginFill(Graphics.getRGB(64, 255, 64));
                } else {
                    g.beginFill(Graphics.getRGB(128, 128, 64));
                }
                g.drawRect(0,0,1,1);
                var s = new Shape(g);
                s.x = x;
                s.y = y;
                s.cache(0, 0, 1, 1);
                this.addChild(s);
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

