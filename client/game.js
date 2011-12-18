var socket = io.connect('http://localhost');

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
var world;
var player;

var keyUp = false;
var keyLeft = false;
var keyDown = false;
var keyRight = false;

jQuery(document).ready(function () {
	canvas = jQuery('#gameCanvas').get(0);
	stage = new Stage(canvas);

    world = new World();
    stage.addChild(world);
    socket.on('screen', function (screen) {
        world.tiles = screen.overworld.data;
        world.update();
	});
	socket.emit('newscreen');

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
    
    stage.scaleX = newWidth / world.width;
    stage.scaleY = newHeight / world.height;
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

function world2canvasX(worldX) {return worldX * canvas.width / worldWidth;}
function world2canvasY(worldY) {return worldY * canvas.height / worldHeight;}
function canvas2worldX(canvasX) {return canvasX * worldWidth / canvas.width;}
function canvas2worldY(canvasY) {return canvasY * worldHeight / canvas.height;}

