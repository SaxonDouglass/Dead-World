var character = function (spec, my) {
    var that;
    my = my || {};
    
    that = new Container();
    
    that.shape = new Shape();
    that.x = 7;
    that.y = 7;
	that.health = 10;
	that.invuln = 0;
    that.addChild(that.shape);
    
    (function () {
        var g = that.shape.graphics;
        g.beginFill(Graphics.getRGB(128, 128, 128));
        g.drawCircle(0, 0, 0.5);
    }());

    that.tick = function() {
        if(keyLeft) {
            if (world.collideRect(this.x - 0.6, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x -= 0.2;
            }
        }
        if(keyRight) {
            if (world.collideRect(this.x - 0.2, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x += 0.2;
            }
        }
        if(keyUp) {
            if (world.collideRect(this.x - 0.4, this.y - 0.6, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y -= 0.2;
            }
        }
        if(keyDown) {
            if (world.collideRect(this.x - 0.4, this.y - 0.2, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y += 0.2;
            }
        }
        
        if(this.x < 0) {
            world.moveTo(world.x() - 1, world.y());
            this.x = world.width;
        } else if(this.x > world.width) {
            world.moveTo(world.x() + 1, world.y());
            this.x = 0;
        } else if(this.y < 0) {
            world.moveTo(world.x(), world.y() - 1);
            this.y = world.height;
        } else if(this.y > world.height) {
            world.moveTo(world.x(), world.y() + 1);
            this.y = 0;
        }

		if(this.invuln) {
			this.invuln--;
		}
    }

	that.hit = function() {
		if(!this.invuln) {
			this.health--;
			this.invuln = 20;
			if(this.health <= 0) {
				this.health = 10;
				this.x = 7;
				this.y = 7;
				world.reset();
			}
		}
	}
    
    return that;
}

