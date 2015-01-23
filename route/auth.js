var auth = require('../middleware/auth');

exports.show_login_form = function(req, res) {
	res.render('../templates/login');
};

exports.login = function(req, res) {
	auth.login(req.body.username, req.body.password, function() {
		req.session.username = req.body.username;
		console.log(req.body.password);
		res.redirect('/private');
	}, function(error) {
		res.send(error);
	});
};

exports.check_login = function(req, res) {
	auth.isAuthentificated(req, res, function(req, res) {
		res.send('Logged in');
	}, function(req, res) {
		res.send("Did not log in");
	})
};

exports.logoff = function(req, res) {
	auth.logoff(req, res, function() {
		res.send('Logged off');
	});
};