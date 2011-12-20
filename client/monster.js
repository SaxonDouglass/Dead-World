var monster = function(spec, my) {
	var that, anim, spriteStart;
    my = my || {};
    
    that = new Container();
    
    that.x = spec.x;
    that.y = spec.y;
	that.dir = spec.dir || UP;
	
	this.type = spec.type || 0;
	spriteStart = this.type*4;

    var img = new Image();
    img.onload = function() {
    	var sprite = new SpriteSheet({
    		images: [img],
    		frames: {width: 48, height: 48},
    	});
    	
    	anim = new BitmapAnimation(sprite);
    	anim.scaleX = 1/48;
    	anim.scaleY = 1/48;
    	anim.regX = 24;
    	anim.regY = 24;
    	anim.gotoAndStop(that.dir + spriteStart);
    	that.addChild(anim);
    }
    img.src = "/img/monsters.png"
    
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
			player.hit(1);
		}
		
		if(anim) {
			anim.gotoAndStop(this.dir+spriteStart)
		}
    }

    that.collidePoint = function (x, y) {
        return (x > this.x - 0.5 && x < this.x + 0.5 && y > this.y - 0.5 && y < this.y + 0.5);
    }
    
    that.collideRect = function (x, y, w, h) {
        return(this.collidePoint(x, y) || this.collidePoint(x + w, y) ||
               this.collidePoint(x, y + h) || this.collidePoint(x + w, y + h));
    }    

    that.die = function() {
        for (var i = world.monsters.length - 1; i >= 0; --i) {
            if (this == world.monsters[i]) {
                SoundJS.play('lowtiermonsterdeath', SoundJS.INTERUPT_LATE, 0.8);
                world.monsters.splice(i, 1);
                world.update();
            }
        }
    }

    return that;
}
