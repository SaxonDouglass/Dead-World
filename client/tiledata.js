var tiledata = new Array();

(function () {
    var tile = function (spec, my) {
        var that;
        my = my || {};
        
        that = {};
        
        that.label = spec.label;
        that.isCarryable = spec.isCarryable;
        that.isSolid = spec.isSolid;

        return that;
    }
    
    var base = tile({
        'label': 'blank',
        'isCarryable': false,
        'isSolid': false,
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
        'isSolid': true,
    });

    tiledata[40] = tile({
        'label': 'logs',
        'isCarryable': true,
    });

    tiledata[41] = tile({
        'label': 'stone',
        'isCarryable': true,
    });
    
    tiledata[42] = tile({
        'label': 'planks',
        'isCarryable': true,
    });
    
    tiledata[43] = tile({
        'label': 'maze',
        'isCarryable': true,
    });
    
    tiledata[44] = tile({
        'label': 'seeds',
        'isCarryable': true,
    });
    
    tiledata[45] = tile({
        'label': 'ore',
        'isCarryable': true,
    });

    tiledata[46] = tile({
        'label': 'ingot',
        'isCarryable': true,
    });

    tiledata[47] = tile({
        'label': '??',
    });

    tiledata[48] = tile({
        'label': 'door',
    });

    tiledata[49] = tile({
        'label': 'log wall',
        'isSolid': true,
    });

    tiledata[50] = tile({
        'label': 'stone wall',
        'isSolid': true,
    });
    
    tiledata[51] = tile({
        'label': 'plank wall',
        'isSolid': true,
    });

    for (var i = 52; i <= 57; ++i) {
        tiledata[i] = tile({
            'label': 'fence',
            'isSolid': true,
        });
    }
    
}());

