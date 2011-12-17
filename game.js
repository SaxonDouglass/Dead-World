
jQuery.noConflict();

var canvas;
var stage;
var cell;

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
            stage.addChild(s);

        }
    }
    
    resize();
    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);    
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
}

function tick() {
	// update the stage:
	stage.update();
}

