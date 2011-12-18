var tiledata = new Array();

(function () {
    var tile = function (spec, my) {
        var that;
        my = my || {};
        
        that = {};
        
        that.label = spec.label || 'blank';
        that.isCarryable = spec.isCarryable || false;
        that.isSolid = spec.isSolid || false;

        return that;
    }

    tiledata[0] = tile({
        'label': 'air',
        'isCarryable': false,
        'isSolid': false,
    });
    
    tiledata[1] = tile({
        'label': 'rock',
        'isCarryable': true,
        'isSolid': false,
    });

    for (var i = 2; i < 16; ++i) {
        tiledata[i] = tile({
            'label': 'wall',
            'isCarryable': false,
            'isSolid': true,
        });
    }

    tiledata[32] = tile({
        'label': 'tree',
        'isCarryable': false,
        'isSolid': true,
    });

    tiledata[33] = tile({
        'label': 'log',
        'isCarryable': true,
        'isSolid': false,
    });
}());

