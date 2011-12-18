var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

var player = require('./player.js'),
    screen = require('./screen.js');

app.listen(80);

function handler(req, res) {
	console.log(req.url);
	if(req.url == "/") {
		fs.readFile(__dirname + '/client/index.html',
					function (err, data) {
						if (err) {
							res.writeHead(500);
							return res.end('Error loading index.html');
						}
						
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end(data, 'utf-8');
					});
	} else if (req.url == "/style.css") {
		fs.readFile(__dirname + '/client/style.css',
					function (err, data) {
						if (err) {
							res.writeHead(500);
							return res.end('Error loading game.js');
						}
						
						res.writeHead(200, { 'Content-Type': 'text/css' });
						res.end(data, 'utf-8');
					});
	} else if (req.url == "/game.js") {
		fs.readFile(__dirname + '/client/game.js',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading game.js');
				}
				
				res.writeHead(200, { 'Content-Type': 'text/javascript' });
				res.end(data, 'utf-8');
			});
	} else if (req.url == "/character.js") {
		fs.readFile(__dirname + '/client/character.js',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading character.js');
				}
				
				res.writeHead(200, { 'Content-Type': 'text/javascript' });
				res.end(data, 'utf-8');
			});
	} else if (req.url == "/world.js") {
		fs.readFile(__dirname + '/client/world.js',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading world.js');
				}
				
				res.writeHead(200, { 'Content-Type': 'text/javascript' });
				res.end(data, 'utf-8');
			});
	} else if (req.url == "/easel.js") {
		fs.readFile(__dirname + '/client/easel.js',
					function (err, data) {
						if (err) {
							res.writeHead(500);
							return res.end('Error loading easel.js');
						}

						res.writeHead(200, { 'Content-Type': 'text/javascript' });
						res.end(data, 'utf-8');
					});
	}
}

var screens;

io.sockets.on('connection', function(socket) {
	var p = player.create({'socket': socket});

	socket.on('disconnect', function() {
		console.log("free");
		screen.free(p.die());
		delete p;
	});

	socket.on('newscreen', function() {
		var s = screen.random();
		p.addScreen(s.id);
		socket.emit('screen', s);
	});

	socket.on('getscreen', function(id) {
		if(p.hasScreen(id)) {
			socket.emit('screen', screen.get(id));
		}
	});

	socket.on('setscreen', function(s) {
		if(p.hasScreen(s.id)) {
			screen.set(s);
		}
	});
});
