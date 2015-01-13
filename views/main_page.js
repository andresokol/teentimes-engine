var db = require('../middleware/dbconnect'),
	table = "test_posts";

exports.main = function(req, res, posts_on_page) {
	db.get_data(table, posts_on_page, function (query) {
		res.render('../templates/main', {
			posts: query.rows
		});
	});
};

exports.article = function(req, res) {
	db.get_article(table, req.params.id, function (query) {
		query = query.rows;
		res.send(query);
	});
};