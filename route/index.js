var main = require("./main"),
	error = require("./error"),
	auth = require('./auth'),
	admin = require('./admin'),
	dbcheck = require("./dbcheck");

module.exports = function (app) {
	app.get('/', main.home);
	app.get('/articles/:id', main.article);
	app.get('/admin', admin.admin_page);
	app.get('/admin/add', admin.add_new_post);
	app.post('/admin/submit', admin.submit_new_post);
	app.post('/admin', admin.add_post_to_db);
	app.get('/db/*', dbcheck.main);
	app.get('/login', auth.show_login_form);
	app.post('/login', auth.login);
	app.get('/private', auth.check_login);
	app.get('/logoff', auth.logoff);
	app.get('/lost', error.p404);
};