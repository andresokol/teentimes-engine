var db = require('../middleware/dbconnect'),
	table = "test_posts",
	md = require('marked');

exports.main = function(req, res, posts_on_page) {
	db.get_data(table, posts_on_page, false, function (query) {
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++)
			posts[i].body = md(posts[i].body);
		res.render('../templates/pages/main', {
			posts: query.rows
		});
	});
};

exports.article = function(req, res, type) {
	db.get_article(table, req.params.id, type, function (query) {
		query = query.rows;
		res.render('../templates/pages/article.ejs', {
			posts: query
		});
	}, function() {res.redirect('/lost');});
};

exports.hub = function(req, res, type) {
	db.get_hub(table, type, 10, function (query) {
		query = query.rows;
		res.render('../templates/pages/main.ejs', {
			posts: query
		});
	}, function() {res.redirect('/lost');});
};