var db = require('../middleware/dbconnect'),
	table = "test_posts";

exports.show_add_page = function(req, res) {
	res.render('../templates/add_new_post', {});
};

exports.show_submit_page = function(req, res) {
	res.end(req.body.title);
};