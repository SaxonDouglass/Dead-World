var character = function (spec, my) {
    var that, carrying=0;
    my = my || {};
    
    that = new Container();
    
    that.x = 7;
    that.y = 7;
	that.health = 10;
	that.invuln = 0;

	var img = new Image();
	img.onload = function() {
		var sprite = new SpriteSheet({
			images: [img],
			frames: {width: 48, height: 48},
		});
		var anim = new BitmapAnimation(sprite);
		anim.scaleX = 1/48;
		anim.scaleY = 1/48;
		anim.regX = 24;
		anim.regY = 24;
		anim.gotoAndPlay(1);
		that.addChild(anim);
	}
	img.src = "/img/character.png";
    
    that.pickup = function() {
        var tile = world.getTile(this.x, this.y);
        if (carrying == 0 && tiledata[tile].isCarryable) {
            carrying = tile;
            world.setTile(this.x, this.y, 0);
        } else {
            world.setTile(this.x, this.y, carrying);
            carrying = tile;
        }
    }

    that.tick = function() {
        if (keyLeft) {
            if (world.collideRect(this.x - 0.6, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x -= 0.2;
            }
        }
        if (keyRight) {
            if (world.collideRect(this.x - 0.2, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x += 0.2;
            }
        }
        if (keyUp) {
            if (world.collideRect(this.x - 0.4, this.y - 0.6, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y -= 0.2;
            }
        }
        if (keyDown) {
            if (world.collideRect(this.x - 0.4, this.y - 0.2, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y += 0.2;
            }
        }
        if (keyPickup) {
            keyPickup = false; // on press
            this.pickup();
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
