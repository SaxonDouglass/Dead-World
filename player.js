(function (window) {

    function Player() {
        this.init();
    }

    Player.prototype = new Container();

    // public properties:
    Player.prototype.shape = null;
	Player.prototype.x = 0;
	Player.prototype.y = 0;

    Player.prototype.Container_initialize = Player.prototype.initialize;    

    Player.prototype.init = function() {
        this.Container_initialize();
        
        this.shape = new Shape();
        this.x = 100;
        this.y = 100;
        
        this.addChild(this.shape);
        
        var g = this.shape.graphics;
        g.beginFill(Graphics.getRGB(128, 128, 128));
        g.drawCircle(16,16,16);
        this.shape.cache(0, 0, 32, 32);
    }

    Player.prototype.tick = function() {
        if(keyLeft) this.x -= 7;
        if(keyRight) this.x += 7;
        if(keyUp) this.y -= 7;
        if(keyDown) this.y += 7;
    }

window.Player = Player;
}(window));
