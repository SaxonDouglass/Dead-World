var tiledata = new Array();

(function () {
    var tile = function (spec, my) {
        var that;
        spec = spec || {};
        my = my || {};
        
        that = {};
        
        that.label = (typeof spec.label === 'undefined') ?
            'blank' : spec.label;
        
        that.isBreakable = (typeof spec.isBreakable === 'undefined') ?
            false : spec.isBreakable;
        that.isCarryable = (typeof spec.isCarryable === 'undefined') ?
            false : spec.isCarryable;
        that.isEquipable = (typeof spec.isEquipable === 'undefined') ?
            false : spec.isEquipable;
        that.isSolid = (typeof spec.isSolid === 'undefined') ?
            false : spec.isSolid;
        
        that.onBreak = (typeof spec.onBreak === 'undefined') ?
            function () {return 0;} : spec.onBreak;
        // TODO: implement onLoad if needed
        that.onLoad = (typeof spec.onLoad === 'undefined') ?
            function (x, y) {} : spec.onLoad;
        that.onPutdown = (typeof spec.onPutdown === 'undefined') ?
            function (x, y) {} : spec.onPutdown;

        return that;
    }
    
    var base = tile();
    
    for (var i = 0; i < 256; ++i) {
        tiledata[i] = base;
    }

    tiledata[0] = tile({
        'label': 'air',
    });
    
    for (var i = 1; i < 16; ++i) {
        tiledata[i] = tile({
            'label': 'edge',
            'isSolid': true,
        });
    }

    tiledata[32] = tile({
        'label': 'tree',
        'isSolid': true,
        'isBreakable': true,
        'onBreak': function () {
            var p = Math.random();
            if (p < 0.75) return 48;
            else return 80;
         },
    });
    
    tiledata[33] = tile({
        'label': 'rock',
        'isSolid': true,
        'isBreakable': true,
        'onBreak': function () { return 49; },
    });

    tiledata[34] = tile({
        'label': 'ore vein',
        'isSolid': true,
        'isBreakable': true,
        'onBreak': function () { return 50; },
    });

    tiledata[48] = tile({
        'label': 'logs',
        'isCarryable': true,
    });

    tiledata[49] = tile({
        'label': 'stone',
        'isCarryable': true,
    });
    
    tiledata[50] = tile({
        'label': 'ore',
        'isCarryable': true,
    });

    tiledata[51] = tile({
        'label': 'maize',
        'isCarryable': true,
    });
    
    tiledata[64] = tile({
        'label': 'planks',
        'isCarryable': true,
    });
    
    tiledata[66] = tile({
        'label': 'ingot',
        'isCarryable': true,
    });

    tiledata[67] = tile({
        'label': 'bread',
        'isCarryable': true,
    });
    
    tiledata[80] = tile({
        'label': 'pine cone',
        'isCarryable': true,
    });
    
    tiledata[81] = tile({
        'label': 'tree seed',
        'isCarryable': true,
        'onPutdown': function (x, y) {
            world.setTile(x, y, 32);
        },
    });

    tiledata[83] = tile({
        'label': 'seeds',
        'isCarryable': true,
    });

    tiledata[96] = tile({
        'label': 'door',
    });

    tiledata[97] = tile({
        'label': 'log wall',
        'isSolid': true,
    });

    tiledata[98] = tile({
        'label': 'stone wall',
        'isSolid': true,
    });
    
    tiledata[99] = tile({
        'label': 'plank wall',
        'isSolid': true,
    });

    for (var i = 104; i <= 109; ++i) {
        tiledata[i] = tile({
            'label': 'fence',
            'isSolid': true,
        });
    }
    
    tiledata[128] = tile({
        'label': 'spade',
        'isEquipable': true,
    });

    tiledata[129] = tile({
        'label': 'pick',
        'isEquipable': true,
    });    

    tiledata[130] = tile({
        'label': 'sword',
        'isEquipable': true,
    });
    
}());

