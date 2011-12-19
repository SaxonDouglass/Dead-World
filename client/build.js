var build = {

    patterns: [
// workshop
{ input:
[[0,40,40,40,0],
 [0,40,0,40,0],
 [0,40,0,40,0],
 [0,40,0,40,0],
 [0,40,0,40,0]],
 output:
[[0,49,49,49,0],
 [0,49,0,49,0],
 [0,49,0,49,0],
 [0,49,0,49,0],
 [0,49,48,49,0]],
},

// smelter
{ input:
[[0,41,41,41,0],
 [41,41,0,41,41],
 [41,0,0,0,41],
 [41,41,0,41,41],
 [0,41,0,41,0]],
 output:
[[0,50,50,50,0],
 [50,50,0,50,50],
 [50,0,0,0,50],
 [50,50,0,50,50],
 [0,50,48,50,0]],
},

// sawmill
{ input:
[[0,40,40,40,0],
 [40,40,0,40,40],
 [40,0,46,0,40],
 [40,40,0,40,40],
 [0,40,0,40,0]],
 output:
[[0,49,49,49,0],
 [49,49,0,49,49],
 [49,0,0,0,49],
 [49,49,0,49,49],
 [0,49,48,49,0]],
},

// forge
{ input:
[[41,41,41,41,41],
 [41,0,0,0,41],
 [41,46,46,46,41],
 [41,0,46,0,41],
 [41,41,0,41,41]],
 output:
[[50,50,50,50,50],
 [50,0,0,0,50],
 [50,0,0,0,50],
 [50,0,0,0,50],
 [50,50,48,50,50]],
},

    ],
    
    update: function () {
        
        var worldX = [1, 9, 1, 9];
        var worldY = [1, 1, 9, 9];
        
        for (var plot = 0; plot < 4; ++plot) {
            for (var p in this.patterns) {
                var valid = plot < 2 ? true : false;
                var validFlip = plot >= 2 ? true : false;
                for (var i = 0; i < 5; ++i) {
                    for (var j = 0; j < 5; ++j) {
                        if (world.getTile(worldX[plot]+i, worldY[plot]+j) != this.patterns[p].input[j][i]) {
                            valid = false;
                        }
                        if ((j == 0 || j == 4) && world.getTile(worldX[plot]+i, worldY[plot]+j) != this.patterns[p].input[4-j][i]) {
                            validFlip = false;
                        }
                    }
                }
            
                if (valid || validFlip) {
                    for (var i = 0; i < 5; ++i) {
                        for (var j = 0; j < 5; ++j) {
                            if (validFlip && (j == 0 || j == 4)) {
                                world.setTile(worldX[plot]+i, worldY[plot]+j, this.patterns[p].output[4-j][i]);
                            } else {
                                world.setTile(worldX[plot]+i, worldY[plot]+j, this.patterns[p].output[j][i]);
                            }
                        }
                    }
                    player.x = worldX[plot] + 2.5;
                    if (validFlip) {
                        player.y = worldY[plot] + 0.5;
                    } else {
                        player.y = worldY[plot] + 4.5;
                    }
                    valid = false;
                    validFlip = false;
                    break;
                }
            }
        }
    },
};
