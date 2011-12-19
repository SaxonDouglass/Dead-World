var heart = function(spec,my) {
	var that, anim;
	my = my || {};

	that = new BitmapAnimation(spec.sprite);

	that.regX = 24;
	that.regY = 24;
	that.scaleX = 1/48;
	that.scaleY = 1/48;
	that.x = 1.3;
	that.y = i + 0.5;
	that.gotoAndStop(0);

	that.tick = function() {
		if(spec.player.health > spec.level) {
			that.gotoAndStop(0);
		} else {
			that.gotoAndStop(1);
		}
	}

	return that;
}

var health = function(spec,my) {
	var that;
	my = my || {};
	spec = spec || {};

	that = new Container();

	if(spec.player) {
		var img = new Image();
		img.onload = function() {
			var sprite = new SpriteSheet({
				images: [img],
				frames: {width: 16, height: 16},
			});
			for(i = 0; i < MAX_HEALTH; i++) {
				console.log(i);
				that.addChild(heart({
					'player': spec.player,
					'level': i,
					'x': 1,
					'y': i+0.5,
					'sprite': sprite,
				}));
			}
		}
		img.src = "/img/hearts.png";
	}

	return that;
}