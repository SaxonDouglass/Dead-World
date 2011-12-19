var inventory = function(spec,my) {
	var that, carrying, equipped;
	my = my || {};
	spec = spec || {};

	that = new Container();

	if(spec.player) {
		var img = new Image();
		img.onload = function() {
			console.log('loaded');
			var sprite = new SpriteSheet({
				images: [img],
				frames: {width: 48, height: 48},
			});
			carrying = new BitmapAnimation(sprite);
			carrying.regX = 24;
			carrying.regY = 24;
			carrying.scaleX = 1/48;
			carrying.scaleY = 1/48;
			carrying.x = 0.5;
			carrying.y = 12;
			that.addChild(carrying);
			equipped = new BitmapAnimation(sprite);
			equipped.regX = 24;
			equipped.regY = 24;
			equipped.scaleX = 1/48;
			equipped.scaleY = 1/48;
			equipped.x = 0.5;
			equipped.y = 13.5;
			that.addChild(equipped);
		}
		img.src = "/img/tileset/inventory.png";

		that.tick = function() {
			console.log('update');
			if(carrying) {
				console.log('carry');
				carrying.gotoAndStop(spec.player.carrying());
			}
			if(equipped) {
				console.log('equip');
				equipped.gotoAndStop(spec.player.equipped());
			}
		}
	}

	return that;
}
