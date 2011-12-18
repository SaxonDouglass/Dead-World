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
        this.x = 7;
        this.y = 7;
        
        this.addChild(this.shape);
        
        var g = this.shape.graphics;
        g.beginFill(Graphics.getRGB(128, 128, 128));
        g.drawCircle(0, 0, 0.5);
        //this.shape.cache(0, 0, 1, 1);
    }

    Player.prototype.tick = function() {
        if(keyLeft) {
            if (world.collideRect(this.x - 0.6, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x -= 0.2;
            }
        }
        if(keyRight) {
            if (world.collideRect(this.x - 0.2, this.y - 0.4, 0.8, 0.8)) {
                this.x = Math.floor(this.x) + 0.5;
            } else {
                this.x += 0.2;
            }
        }
        if(keyUp) {
            if (world.collideRect(this.x - 0.4, this.y - 0.6, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y -= 0.2;
            }
        }
        if(keyDown) {
            if (world.collideRect(this.x - 0.4, this.y - 0.2, 0.8, 0.8)) {
                this.y = Math.floor(this.y) + 0.5;
            } else {
                this.y += 0.2;
            }
        }
        
        if(this.x < 0) {
            socket.emit('newscreen');
            this.x = world.width;
        } else if(this.x > world.width) {
            socket.emit('newscreen');
            this.x = 0;
        } else if(this.y < 0) {
            socket.emit('newscreen');
            this.y = world.height;
        } else if(this.y > world.height) {
            socket.emit('newscreen');
            this.y = 0;
        }
    }

window.Player = Player;
}(window));

