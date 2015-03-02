var db = require('../middleware/dbconnect'),
	table = 'users',
	session = require('session');

exports.login = function(username, password, succeed, failed) {
	username = username.replace(/'/g, "''");
	db.get_password(table, username, function(query) {
		if (query.rows.length == 0) {
			console.log('[AUTH] Tryed to log in as ' + username + ' - user not found');
			failed('user not found');
		}
		else {
			if(query.rows[0].password == password) {
				succeed();
				console.log('[AUTH] ' + username + ' logged in');
			}
			else {
				console.log('[AUTH] Tryed to log in as ' + username + ' - wrong password');
				failed('wrong password');
			}
		}
	});
};

exports.logoff = function(req, res, done) {
	console.log('[AUTH] ' + req.session.username + ' logged off');
	req.session.destroy();
	done();
};

exports.isAuthentificated = function(req, res, succeed, failed) {
	if (req.session.username == undefined) failed(req, res);
	else succeed(req, res);
};