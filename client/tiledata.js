var tiledata = [];

tiledata[0] = {
    'label': 'air',
    'isCarryable': false,
    'isSolid': false,
};
    
tiledata[1] = {
    'label': 'rock',
    'isCarryable': true,
    'isSolid': false,
};

for (var i = 2; i < 16; ++i) {
    tiledata[i] = {
        'label': 'wall',
        'isCarryable': false,
        'isSolid': true,
    };
}

