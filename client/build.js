var build = {

    patterns: [
// workshop
{ input:
[[0,48,48,48,0],
 [0,48,0,48,0],
 [0,48,0,48,0],
 [0,48,0,48,0],
 [0,48,0,48,0]],
 output:
[[0,97,97,97,0],
 [0,97,0,97,0],
 [0,97,0,97,0],
 [0,97,0,97,0],
 [0,97,96,97,0]],
},

// smelter
{ input:
[[0,49,49,49,0],
 [49,49,0,49,49],
 [49,0,0,0,49],
 [49,49,0,49,49],
 [0,49,0,49,0]],
 output:
[[0,98,98,98,0],
 [98,98,0,98,98],
 [98,0,0,0,98],
 [98,98,0,98,98],
 [0,98,96,98,0]],
},

// sawmill
{ input:
[[0,48,48,48,0],
 [48,48,0,48,48],
 [48,0,46,0,48],
 [48,48,0,48,48],
 [0,48,0,48,0]],
 output:
[[0,97,97,97,0],
 [97,97,0,97,97],
 [97,0,0,0,97],
 [97,97,0,97,97],
 [0,97,96,97,0]],
},

// forge
{ input:
[[49,49,49,49,49],
 [49,0,0,0,49],
 [49,46,46,46,49],
 [49,0,46,0,49],
 [49,49,0,49,49]],
 output:
[[98,98,98,98,98],
 [98,0,0,0,98],
 [98,0,0,0,98],
 [98,0,0,0,98],
 [98,98,96,98,98]],
},

// bakery
{ input:
[[0,64,64,64,0],
 [0,64,0,64,0],
 [0,64,0,64,0],
 [0,64,0,64,0],
 [0,64,0,64,0]],
 output:
[[0,99,99,99,0],
 [0,99,0,99,0],
 [0,99,0,99,0],
 [0,99,0,99,0],
 [0,99,96,99,0]],
},

// Farm
{ input:
[[64,64,64,64,64],
 [64,0,0,0,64],
 [64,0,0,0,64],
 [64,0,0,0,64],
 [64,64,0,64,64]],
 output:
[[106,104,104,104,107],
 [105,0,0,0,105],
 [105,0,0,0,105],
 [105,0,0,0,105],
 [109,104,96,104,108]],
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
