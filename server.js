var app = require('express').createServer(),
    io = require('socket.io').listen(app),
    fs = require('fs');

var player = require('./player.js'),
    screen = require('./screen.js');

var serveFile = function (req, res, path, mimetype) {
    fs.readFile(__dirname + path + req.params.file + '.' + req.params.ext,
        function (err, data) {
            if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + req.params.file+'.'+req.params.ext);
		}
		
		var mimetype = '';
		if (req.params.ext == 'html') mimetype = 'text/html';
		if (req.params.ext == 'css') mimetype = 'text/css';
		if (req.params.ext == 'js') mimetype = 'text/javascript';
		if (req.params.ext == 'png') mimetype = 'image/png';
		res.writeHead(200, { 'Content-Type': mimetype });
		res.end(data, 'utf-8');
	})
};

app.get('/', function(req, res){
    console.log(req.url);
    req.params.file = 'index';
    req.params.ext = 'html';
    serveFile(req, res, '/client/');
});

app.get('/:file.:ext', function(req, res){
    console.log(req.url);
    serveFile(req, res, '/client/');
});

app.get('/img/:file.:ext', function(req, res){
    console.log(req.url);
    serveFile(req, res, '/client/img/');
});

app.get('/img/tileset/:file.:ext', function(req, res){
    console.log(req.url);
    serveFile(req, res, '/client/img/tileset/');
});

app.listen(8000);

var screens;

io.sockets.on('connection', function(socket) {
	var p = player.create({'socket': socket});

	socket.on('disconnect', function() {
		console.log("free");
		screen.free(p.die());
		delete p;
	});

	socket.on('freescreens', function() {
		console.log("free");
		screen.free(p.die());
	});

	socket.on('newscreen', function() {
		var s = screen.random();
		p.addScreen(s.id);
		socket.emit('screen', s);
	});

	socket.on('getscreen', function(id) {
		if(p.hasScreen(id)) {
			socket.emit('screen', screen.get(id));
		} else {
			console.log("Illegal set");
		}
	});

	socket.on('setscreen', function(s) {
		if(s) {
			if(p.hasScreen(s.id)) {
				screen.set(s);
			} else {
				console.log("Illegal set");
			}
		} else {
			console.log("Empty set");
		}
	});
});
