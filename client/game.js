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
    console.log(SoundJS);

	sidebar.addChild(health({player: player}));
	sidebar.addChild(inventory({player: player}));
	
    soundInit();

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

function soundInit() {
	    // determine browser
	    var filetype;
	    agent = navigator.userAgent.toLowerCase();
	
	    // adjust for browser
	    if(agent.indexOf("chrome") > -1){
		    filetype = ".mp3";
	    } else if(agent.indexOf("opera") > -1) {
		    filetype = ".ogg";
	    } else if(agent.indexOf("firefox") > -1) {
		    filetype = ".ogg";
	    } else if(agent.indexOf("safari") > -1) {
		    filetype = ".mp3";
	    } else if(agent.indexOf("msie") > -1) {
		    filetype = ".mp3";
	    }
	
	    // set references
	    SoundJS.onLoadQueueComplete = soundDoneLoading;
        jQuery('#game').get(0).onselectstart=function(){return false};
        jQuery('#game').get(0).onmousedown=function(){return false};
	
	    // begin loading content (only sounds to load)
	    SoundJS.addBatch([
		    {name:"titletheme", src:"/snd/music/00 - titletheme" + filetype, instances:1},
		    {name:"deadworldblues", src:"/snd/music/01 - deadworldblues" + filetype, instances:1},
		    {name:"overworld", src:"/snd/music/02 - overworld" + filetype, instances:1},
		    {name:"dungeon1", src:"/snd/music/03 - dungeon1" + filetype, instances:1},
		    {name:"dungeon2", src:"/snd/music/04 - dungeon2" + filetype, instances:1},
		    {name:"dungeon3", src:"/snd/music/05 - dungeon3" + filetype, instances:1},
		    {name:"shrinemusic", src:"/snd/music/06 - shrinemusic" + filetype, instances:1},
		    
		    {name:"build", src:"/snd/sfx/build" + filetype, instances:1},
		    {name:"overworldambience", src:"/snd/sfx/overworldambience" + filetype, instances:1},
		    {name:"playerdamagecry", src:"/snd/sfx/playerdamagecry" + filetype, instances:1},
		    {name:"playerdeathcry", src:"/snd/sfx/playerdeathcry" + filetype, instances:1},
		    {name:"weaponimpact", src:"/snd/sfx/weaponimpact" + filetype, instances:1},
		    {name:"lowtiermonsteralert", src:"/snd/sfx/lowtiermonsteralert" + filetype, instances:1},
		    {name:"lowtiermonsterdeath", src:"/snd/sfx/lowtiermonsterdeath" + filetype, instances:1},
		    {name:"hightiermonsteralert", src:"/snd/sfx/hightiermonsteralert" + filetype, instances:1},
		    {name:"hightiermonsterdeath", src:"/snd/sfx/hightiermonsterdeath" + filetype, instances:1},
		]);
    }
	
function soundDoneLoading() {
	    // start the music
	    SoundJS.play("titletheme", null, 0.3, true);
    }

function world2canvasX(worldX) {return worldX * canvas.width / worldWidth;}
function world2canvasY(worldY) {return worldY * canvas.height / worldHeight;}
function canvas2worldX(canvasX) {return canvasX * worldWidth / canvas.width;}
function canvas2worldY(canvasY) {return canvasY * worldHeight / canvas.height;}

