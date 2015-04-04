var express = require('express'),
    http = require('http'),
    app = express(),
    middleware = require('./middleware')(app, express);

console.log(app.get('port'), app.get('ipaddr'));

app.listen(app.get('port'), function() {
	console.log("Node app is running at " + app.get('ipaddr') + ":" + app.get('port'));
});