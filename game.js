
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
	world = new Container();
    stage.addChild(world);

    world.width = 15;
    world.height = 15;
    world.tiles = [[1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                  [1,0,0,1,0, 0,0,0,0,0, 0,0,0,0,1,],
                  [1,0,1,1,1, 0,0,0,0,0, 0,0,0,0,1,],
                  [1,0,0,1,0, 0,0,0,0,0, 0,0,0,0,1,],
                  
                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                  [1,0,0,0,0, 0,0,0,0,1, 1,1,0,0,1,],
                  
                  [1,0,0,0,0, 0,0,0,0,1, 1,1,0,0,1,],
                  [1,0,0,0,0, 0,0,0,0,1, 1,1,0,0,1,],
                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
                  [1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
    ];
    
    world.collidePoint = function (x, y) {
        x = Math.floor(Math.max(0, Math.min(world.width - 1, x)));
        y = Math.floor(Math.max(0, Math.min(world.height - 1, y)));
        return(this.tiles[x][y] > 0);
    }
    
    world.collideRect = function (x, y, w, h) {
        return(this.collidePoint(x, y) || this.collidePoint(x + w, y) ||
               this.collidePoint(x, y + h) || this.collidePoint(x + w, y + h));
    }
    
    for(var y = 0; y < 15; ++y) {
        for(var x = 0; x < 15; ++x) {
            var g = new Graphics();
            g.setStrokeStyle(1);
            if(world.tiles[x][y] == 0) {
                g.beginFill(Graphics.getRGB(64, 255, 64));
            } else {
                g.beginFill(Graphics.getRGB(128, 128, 64));
            }
            g.drawRect(0,0,1,1);
            var s = new Shape(g);
            s.x = x;
            s.y = y;
            s.cache(0, 0, 1, 1);
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

