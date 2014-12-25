var main = require("./main"),
	error = require("./error"),
	dbcheck = require("./dbcheck");

module.exports = function (app) {
	app.get('/', main.home);
	app.get('/admin', main.add_new_post);
	app.post('/admin/submit', main.submit_new_post);
	app.get('/db/*', dbcheck.main);
};