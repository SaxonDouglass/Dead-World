
var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_S = 83;
var KEYCODE_D = 68;

jQuery.noConflict();

var canvas;
var stage;
var cell;
var player;

var keyUp = false;
var keyLeft = false;
var keyDown = false;
var keyRight = false;

jQuery(document).ready(function () {
	canvas = jQuery('#gameCanvas').get(0);
	stage = new Stage(canvas);
	cell = new Container();
    stage.addChild(cell);
    
    var tiles = [[1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                  
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                 [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                 [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                  
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                 [1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
    ];
    
    for(var y = 0; y < 15; ++y) {
        for(var x = 0; x < 15; ++x) {
            var g = new Graphics();
            g.setStrokeStyle(1);
            if(tiles[x][y] == 0) {
                g.beginFill(Graphics.getRGB(64, 255, 64));
            } else {
                g.beginFill(Graphics.getRGB(128, 128, 64));
            }
            g.drawRect(0,0,32,32);
            var s = new Shape(g);
            s.x = x * 32;
            s.y = y * 32;
            s.cache(0, 0, 32, 32);
            stage.addChild(s);
        }
    }
    
    player = new Player();
    stage.addChild(player);
    
    resize();
    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;
    Ticker.addListener(window);
});

function resize() {
    var game = jQuery('#game').get(0);
    var widthToHeight = 1;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        // window width is too wide relative to desired game width
        newWidth = newHeight * widthToHeight;
        game.style.height = newHeight + 'px';
        game.style.width = newWidth + 'px';
    } else { // window height is too high relative to desired game height
        newHeight = newWidth / widthToHeight;
        game.style.width = newWidth + 'px';
        game.style.height = newHeight + 'px';
    }
    
    game.style.marginTop = (-newHeight / 2) + 'px';
    game.style.marginLeft = (-newWidth / 2) + 'px';
    game.style.fontSize = (newWidth / 400) + 'em';
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    stage.scaleX = newWidth / 480;
    stage.scaleY = newHeight / 480;
}

function tick() {
	// update the stage:
	stage.update();
}

function onKeyDown(key) {
    //cross browser issues exist
	if(!key){ var key = window.event; }
	switch(key.keyCode) {
		case KEYCODE_W:
		case KEYCODE_UP: keyUp = true; break;
		case KEYCODE_A:
		case KEYCODE_LEFT: keyLeft = true; break;
		case KEYCODE_S:
		case KEYCODE_DOWN: keyDown = true; break;
		case KEYCODE_D:
		case KEYCODE_RIGHT: keyRight = true; break;
	}
}

function onKeyUp(key) {
    //cross browser issues exist
	if(!key){ var key = window.event; }
	switch(key.keyCode) {
		case KEYCODE_W:
		case KEYCODE_UP: keyUp = false; break;
		case KEYCODE_A:
		case KEYCODE_LEFT: keyLeft = false; break;
		case KEYCODE_S:
		case KEYCODE_DOWN: keyDown = false; break;
		case KEYCODE_D:
		case KEYCODE_RIGHT: keyRight = false; break;
	}
}

