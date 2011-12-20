var charSprite = function(sprite, my) {
	var that;
	my - my || {};

	that = new BitmapAnimation(sprite);
	
	that.scaleX = 1/48;
	that.scaleY = 1/48;
	that.regX = 24;
	that.regY = 24;
	
	return that;
}

var character = function (spec, my) {
    var that, carrying=0, equipped=0, health=MAX_HEALTH,
        load, helm, feet, shield, body, tool, pixie;
    my = my || {};
    
    that = new Container();
    
    that.x = 7.5;
    that.y = 7.5;
	that.invuln = 10;
	that.facing = 'down';

	var img = new Image();
	img.onload = function() {
		var sprite = new SpriteSheet({
			images: [img],
			frames: {width: 48, height: 48},
			animations: {
				feet: [4,5,'feet'],
			}
		});
		
		load = charSprite(sprite);
		load.gotoAndStop(23);
		that.addChild(load);
		
		helm = charSprite(sprite);
		helm.gotoAndStop(0);
		that.addChild(helm);
		
		feet = charSprite(sprite);
		feet.gotoAndStop('feet');
		that.addChild(feet);
		
		body = charSprite(sprite);
		body.gotoAndStop(7);
		that.addChild(body);

		shield = charSprite(sprite);
		shield.gotoAndStop(6);
		that.addChild(shield);

		tool = charSprite(sprite);
		tool.gotoAndStop(31);
		that.addChild(tool);

		pixie = charSprite(sprite);
		pixie.gotoAndStop(53 - health);
		that.addChild(pixie);
	}
	img.src = "/img/spritesheet.png";

	that.health = function() {
		return health;
	}
    
	that.carrying = function() {
		return carrying;
	}
    
	that.equipped = function() {
		return equipped;
	}
    
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
        
        for (var i = world.monsters.length - 1; i >= 0; --i) {
            if (world.monsters[i].collidePoint(targetX, targetY)) {
                world.monsters[i].die();
            }
        }
        
        var tile = world.getTile(targetX, targetY);
        if (tiledata[tile].isBreakable && tiledata[equipped].tier >= tiledata[tile].tier) {
            SoundJS.play('weaponimpact', SoundJS.INTERUPT_LATE, 0.3);
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
		load.gotoAndStop(31);
            } else if (equipped) {
                world.setTile(this.x, this.y, equipped);
                tiledata[equipped].onPutdown(this.x, this.y);
                equipped = 0;
		tool.gotoAndStop(39);
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
            tool.gotoAndStop(tiledata[equipped].carrySprite);

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
            load.gotoAndStop(tiledata[carrying].carrySprite);
        }
    }

    that.tick = function() {
    	var oldX = this.x,
    	    oldY = this.y;
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
        
        	if(feet) {
        	       	feet.paused = (this.x === oldX && this.y === oldY) 
        	}

		if(this.invuln) {
			this.invuln--;
		}
		
		if(helm) {
			if(this.facing == 'up') {
				helm.gotoAndStop(2);
			} else if(this.facing == 'down') {
				helm.gotoAndStop(0);
			} else if(this.facing == 'left') {
				helm.gotoAndStop(1);
			} else if(this.facing == 'right') {
				helm.gotoAndStop(3);
			}
		}
	}

	that.hit = function(dmg) {
		if(!this.invuln) {
			health -= dmg;
			this.invuln = 20;
			if(health <= 0) {
			    SoundJS.play('playerdeathcry', SoundJS.INTERUPT_LATE, 0.1);
	            SoundJS.play("deadworldblues", null, 0.5, true);
				health = MAX_HEALTH;
				this.x = 7;
				this.y = 7;
				world.reset();
			} else if (dmg > 0) {
			    SoundJS.play('playerdamagecry', SoundJS.INTERUPT_LATE, 0.1);
	        }
			
			if(pixie) {
				pixie.gotoAndStop(37 - health);
			}
		}
	}
    
    return that;
}

