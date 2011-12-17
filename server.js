                    response.writeHead(200, { 'Content-Type': contentType });
                                        response.end(content, 'utf-8');var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, fs = require('fs');

app.listen(80);

function handler (req, res) {
	if(req.url == "/") {
		fs.readFile(__dirname + '/index.html',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading index.html');
				}
				
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(data, 'utf-8');
			});
	} else if (req.url == "/style.css") {
		fs.readFile(__dirname + '/style.css',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading game.js');
				}
				
				res.writeHead(200, { 'Content-Type': 'text/css' });
				res.end(data, 'utf-8');
			});
	} else if (req.url == "/game.js") {
		fs.readFile(__dirname + '/game.js',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading game.js');
				}
				
				res.writeHead(200, { 'Content-Type': 'text/javascript' });
				res.end(data, 'utf-8');
			});
	} else if (req.url == "/lib/easel.js") {
		fs.readFile(__dirname + '/lib/easel.js',
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

io.sockets.on('connection', function(socket) {
	socket.on('getscreen', function() {
		var screen = {overworld: { data: [[1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1,],
		                                  [1,1,1,1,1, 1,0,0,0,1, 1,1,1,1,1,],
		                                 ] },
		             underworld: { data: [[0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                  [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0],
		                                 ] },
		}
		
		socket.emit('screen', screen);
	});
});
