var socket = io.connect('/');

var KEYCODE_UP = 38;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_S = 83;
var KEYCODE_D = 68;
var KEYCODE_E = 69;
var KEYCODE_SPACE = 32;

var UP = 0;
var LEFT = 1;
var DOWN = 2;
var RIGHT = 3;

var MAX_HEALTH = 5;

jQuery.noConflict();

var canvas;
var sideCanvas;
var sidebar;
var stage;
var world;
var player;

var keyUp = false;
var keyLeft = false;
var keyDown = false;
var keyRight = false;
var keyPickup = false;
var keyAttack = false;

jQuery(document).ready(function () {
	canvas = jQuery('#gameCanvas').get(0);
	sideCanvas = jQuery('#sidebarCanvas').get(0);
	sidebar = new Stage(sideCanvas);
	stage = new Stage(canvas);

    world = world();
    stage.addChild(world);

    player = character();
    stage.addChild(player);

	console.log(sidebar);

	sidebar.addChild(health({player: player}));
	//sidebar.addChild(carrying(player));

    resize();
    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;
    Ticker.addListener(window);
});

function resize() {
	var canvasPx = 240;
	var sidebarPx = 32;

    var game = jQuery('#game').get(0);
    var widthToHeight = (canvasPx+sidebarPx)/canvasPx;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
	var newSidebar;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        // window width is too wide relative to desired game width
        newWidth = newHeight * widthToHeight;
    } else { // window height is too high relative to desired game height
        newHeight = newWidth / widthToHeight;
    }

	newWidth = Math.floor(newWidth/(canvasPx+sidebarPx));
	newHeight = Math.floor(newHeight/canvasPx)*canvasPx;
	newSidebar = newWidth*sidebarPx;
	newWidth = newWidth*canvasPx;

    game.style.height = newHeight + 'px';
    game.style.width = (newWidth + newSidebar) + 'px';
    
    game.style.marginTop = (-newHeight / 2) + 'px';
    game.style.marginLeft = (-newWidth / 2) + 'px';
    game.style.fontSize = (newWidth / 400) + 'em';
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    sideCanvas.width = newSidebar;
    sideCanvas.height = newHeight;
    
    stage.scaleX = newWidth / world.width;
    stage.scaleY = newHeight / world.height;

    sidebar.scaleX = newSidebar / 2;
    sidebar.scaleY = newHeight / world.height;
}

function tick() {
	// update the stage:
	stage.update();
	sidebar.update();
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
		case KEYCODE_E: keyPickup = true; break;
		case KEYCODE_SPACE: keyAttack = true; break;
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
		case KEYCODE_E: keyPickup = false; break;
		case KEYCODE_SPACE: keyAttack = false; break;
	}
}

function world2canvasX(worldX) {return worldX * canvas.width / worldWidth;}
function world2canvasY(worldY) {return worldY * canvas.height / worldHeight;}
function canvas2worldX(canvasX) {return canvasX * worldWidth / canvas.width;}
function canvas2worldY(canvasY) {return canvasY * worldHeight / canvas.height;}

