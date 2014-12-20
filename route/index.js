var main = require("./main"),
	error = require("./error"),
	dbcheck = require("./dbcheck");

module.exports = function (app) {
	app.get('/', main.home);
	app.get('/admin', main.admin);
	app.get('/db/*', dbcheck.main);
};