var db = require('../middleware/dbconnect'),
	table = "test_posts",
	md = require('marked');

exports.main = function(req, res, posts_on_page) {
	db.get_data(table, posts_on_page, false, function (query) {
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++)
			posts[i].body = md(posts[i].body);
		res.render('../templates/main', {
			posts: query.rows
		});
	});
};

exports.article = function(req, res) {
	db.get_article(table, req.params.id, function (query) {
		query = query.rows;
		res.render('../templates/page.ejs', {
			posts: query
		});
	}, function() {res.send('Something broke here =( Cannot find the article with id ' + req.params.id);});
};