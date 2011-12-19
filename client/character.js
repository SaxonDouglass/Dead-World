var character = function (spec, my) {
    var that, carrying=0, equipped=0;
    my = my || {};
    
    that = new Container();
    
    that.x = 7.5;
    that.y = 7.5;
	that.dir = DOWN;
	that.health = MAX_HEALTH;
	that.invuln = 10;
	that.facing = 'down';

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
    
    that.attack = function () {
        var targetX = player.x
        var targetY = player.y;
        if (this.facing === 'down') {
            targetY += 1;
        } else if (this.facing === 'left') {
            targetX += -1;
        } else if (this.facing === 'right') {
            targetX += 1;
        } else if (this.facing === 'up') {
            targetY += -1;
        }
        
        var tile = world.getTile(targetX, targetY);
        if (tiledata[tile].isBreakable && tiledata[equipped].tier >= tiledata[tile].tier) {
            world.setTile(targetX, targetY, tiledata[tile].onBreak());
        }
    }
    
    that.pickup = function () {
        var tile = world.getTile(this.x, this.y);
        if (tile == 0) {
            if (carrying) {
                world.setTile(this.x, this.y, carrying);
                tiledata[carrying].onPutdown(this.x, this.y);
                carrying = 0;
            } else if (equipped) {
                world.setTile(this.x, this.y, equipped);
                tiledata[equipped].onPutdown(this.x, this.y);
                equipped = 0;
            }
            build.update();
        }
        if (tiledata[tile].isEquipable) {
            if (equipped == 0) {
                equipped = tile;
                world.setTile(this.x, this.y, 0);
            } else {
                world.setTile(this.x, this.y, equipped);
                tiledata[equipped].onPutdown(this.x, this.y);
                equipped = tile;
            }
            build.update();
        } else if (tiledata[tile].isCarryable) {
            if (carrying == 0) {
                carrying = tile;
                world.setTile(this.x, this.y, 0);
            } else {
                world.setTile(this.x, this.y, carrying);
                tiledata[carrying].onPutdown(this.x, this.y);
                carrying = tile;
            }
            build.update();
        }
    }

    that.tick = function() {
        if (keyLeft) {
            if (world.collideRect(this.x - 0.6, this.y - 0.4, 0.8, 0.8) &&
                !world.collidePoint(this.x, this.y)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x -= 0.2;
            }
            this.facing = 'left';
        }
        if (keyRight) {
            if (world.collideRect(this.x - 0.2, this.y - 0.4, 0.8, 0.8) &&
                !world.collidePoint(this.x, this.y)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x += 0.2;
            }
            this.facing = 'right';
        }
        if (keyUp) {
            if (world.collideRect(this.x - 0.4, this.y - 0.6, 0.8, 0.8) &&
                !world.collidePoint(this.x, this.y)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y -= 0.2;
            }
            this.facing = 'up';
        }
        if (keyDown) {
            if (world.collideRect(this.x - 0.4, this.y - 0.2, 0.8, 0.8) &&
                !world.collidePoint(this.x, this.y)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y += 0.2;
            }
            this.facing = 'down';
        }
        if (keyPickup) {
            keyPickup = false; // on press
            this.pickup();
        }
        if (keyAttack) {
            keyAttack = false; // on press
            this.attack();
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
				this.health = MAX_HEALTH;
				this.x = 7;
				this.y = 7;
				world.reset();
			}
		}
	}
    
    return that;
}

