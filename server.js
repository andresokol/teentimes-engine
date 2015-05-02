var express = require('express'),
    app = express(),
    middleware = require('./middleware')(app, express),
    http = require('http').Server(app),
	io = require('socket.io')(http),
	sockets = require('./middleware/sockets')(io);

console.log(app.get('port'), app.get('ipaddr'));

if (!app.get('ipaddr'))
	http.listen(app.get('port'), function() {
		console.log("Node app is running at port " + app.get('port'));
	});
else 
	http.listen(app.get('port'), app.get('ipaddr'), function() {
		console.log("Node app is running at " + app.get('ipaddr') + ":" + app.get('port'));
	});