var tiledata = new Array();

(function () {
    var tile = function (spec, my) {
        var that;
        my = my || {};
        
        that = {};
        
        that.label = spec.label;
        
        that.breaksInto = spec.breaksInto;
        that.breaksIntoProb = spec.breaksIntoProb; // cdf
        
        that.isCarryable = spec.isCarryable;
        that.isSolid = spec.isSolid;
        that.isBreakable = spec.isBreakable;

        return that;
    }
    
    var base = tile({
        'label': 'blank',
        'breaksInto': [0],
        'breaksInto': [1],
        'isCarryable': false,
        'isSolid': false,
        'isBreakable': false,
    });
    
    for (var i = 0; i < 256; ++i) {
        tiledata[i] = base;
    }

    tiledata[0] = tile({
        'label': 'air',
        'isCarryable': true,
    });
    
    for (var i = 1; i < 16; ++i) {
        tiledata[i] = tile({
            'label': 'edge',
            'isSolid': true,
        });
    }

    tiledata[32] = tile({
        'label': 'tree',
        'breaksInto': [48, 83],
        'breaksIntoProb': [0.75, 1],
        'isSolid': true,
        'isBreakable': true,
    });

    tiledata[50] = tile({
        'label': 'ore vein',
        'isSolid': true,
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
        'label': 'ingot',
        'isCarryable': true,
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

    tiledata[128] = tile({
        'label': 'spade',
        'isCarryable': true,
    });

    tiledata[129] = tile({
        'label': 'pick',
        'isCarryable': true,
    });    

    tiledata[130] = tile({
        'label': 'sword',
        'isCarryable': true,
    });

    for (var i = 104; i <= 109; ++i) {
        tiledata[i] = tile({
            'label': 'fence',
            'isSolid': true,
        });
    }
    
}());

