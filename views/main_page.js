var db = require('../middleware/dbconnect'),
	table = "test_posts";

exports.main = function(req, res, posts_on_page) {
	db.get_data(table, posts_on_page, function (query) {
		res.render('../templates/main', {
			posts: query.rows
		});
	});
};