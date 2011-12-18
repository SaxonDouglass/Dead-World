(function (window) {

    function World() {
        this.init();
    }
    
    World.prototype = new Container();

    // public properties:
    World.prototype.tiles = null;
	World.prototype.width = 15;
	World.prototype.height = 15;

    World.prototype.Container_initialize = World.prototype.initialize;    

    World.prototype.init = function() {
        this.Container_initialize();
        
        this.width = 15;
        this.height = 15;
        
        this.tiles = [[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
                      [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
        ];
        
        this.update();
    }
    
    World.prototype.collidePoint = function (x, y) {
        x = Math.floor(Math.max(0, Math.min(this.width - 1, x)));
        y = Math.floor(Math.max(0, Math.min(this.height - 1, y)));
        return(this.tiles[x][y] > 0);
    }
    
    World.prototype.collideRect = function (x, y, w, h) {
        return(this.collidePoint(x, y) || this.collidePoint(x + w, y) ||
               this.collidePoint(x, y + h) || this.collidePoint(x + w, y + h));
    }
    
    World.prototype.update = function () {
        this.removeAllChildren();
        for(var y = 0; y < 15; ++y) {
            for(var x = 0; x < 15; ++x) {
                var g = new Graphics();
                g.setStrokeStyle(1);
                if(this.tiles[x][y] == 0) {
                    console.log('not wall');
                    g.beginFill(Graphics.getRGB(64, 255, 64));
                } else {
                    console.log('wall');
                    g.beginFill(Graphics.getRGB(128, 128, 64));
                }
                g.drawRect(0,0,1,1);
                var s = new Shape(g);
                s.x = x;
                s.y = y;
                s.cache(0, 0, 1, 1);
                this.addChild(s);
            }
        }
    }

window.World = World;
}(window));
