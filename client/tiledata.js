var tiledata = function (spec, my) {
    var that;
    my = my || {};

    that = {};

    that[0] = {
        text: 'air';
        isPickupable: false;
        isSolid: false;
    }
    
    that[1] = {
        text: 'rock';
        isPickupable: true;
        isSolid: false;
    }
    
    that[2] = {
        text: 'wall';
        isPickupable: false;
        isSolid: true;
    }

    return that;
}

