var monster = function(spec, my) {
	var that;
    my = my || {};
    
    that = new Container();
    
    that.shape = new Shape();
    that.x = spec.x;
    that.y = spec.y;
	that.dir = spec.dir || UP;
    that.addChild(that.shape);
    
    (function () {
        var g = that.shape.graphics;
        g.beginFill(Graphics.getRGB(128, 0, 0));
		g.drawCircle(0, 0, 0.5);
	}());
	
	that.turn = function() {
		this.dir++;
		if(this.dir > 3) this.dir = 0;
	}

    that.tick = function() {
        if(this.dir == LEFT) {
            if (world.collideRect(this.x - 0.6, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
				this.turn();
            } else {
                this.x -= 0.2;
            }
        } else if(this.dir == RIGHT) {
            if (world.collideRect(this.x - 0.2, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
				this.turn();
            } else {
                this.x += 0.2;
            }
        } else if(this.dir == UP) {
            if (world.collideRect(this.x - 0.4, this.y - 0.6, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
				this.turn();
            } else {
                this.y -= 0.2;
            }
        } else if(this.dir == DOWN) {
            if (world.collideRect(this.x - 0.4, this.y - 0.2, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
				this.turn();
            } else {
                this.y += 0.2;
            }
        }
        
        if(this.x - 0.5 < 0) {
            this.x = 0.5;
			this.turn();
        } else if(this.x + 0.5 > world.width) {
            this.x = world.width - 0.5;
			this.turn();
        } else if(this.y - 0.5 < 0) {
            this.y = 0.5;
			this.turn();
        } else if(this.y + 0.5 > world.height) {
            this.y = world.height - 0.5;
			this.turn();
        }

		if(this.collideRect(player.x-0.4, player.y-0.4, 0.8, 0.8)) {
			player.hit();
		}
    }

    that.collidePoint = function (x, y) {
        return (x > this.x - 0.5 && x < this.x + 0.5 && y > this.y - 0.5 && y < this.y + 0.5);
    }
    
    that.collideRect = function (x, y, w, h) {
        return(this.collidePoint(x, y) || this.collidePoint(x + w, y) ||
               this.collidePoint(x, y + h) || this.collidePoint(x + w, y + h));
    }    

    return that;
}
