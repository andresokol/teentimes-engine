var db = require('../middleware/dbconnect'),
	table = 'users',
	session = require('session');

exports.login = function(username, password, succeed, failed) {
	db.get_user(table, username, function(query) {
		if (query.rows.length == 0) { failed('user not found'); }
		else {
			if(query.rows[0].password == password) {succeed();}
			else {failed('wrong password');}
		}
	});
};

exports.logoff = function(req, res, done) {
	console.log(req.session.username + ' is logging off');
	req.session.destroy();
	done();
};

exports.isAuthentificated = function(req, res, succeed, failed) {
	console.log(req.session.username);
	if (req.session.username == undefined) failed(req, res);
	else succeed(req, res);
};