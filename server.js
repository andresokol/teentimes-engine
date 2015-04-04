var express = require('express'),
    http = require('http'),
    app = express(),
    middleware = require('./middleware')(app, express);

console.log(app.get('port'));

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});