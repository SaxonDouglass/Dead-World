exports.create = function(spec,my) {
	var that, screens;
	my = my || {};
	
	that = {};
	screens = [];

	that.addScreen = function(screen) {
		screens.push(screen);
	}

	that.hasScreen = function(screen) {
		return screens.indexOf(screen) != -1;
	}

	that.die = function() {
		var free = screens;
		screens = [];
		return free;
	}

	return that;
}