var db = require('../middleware/dbconnect'),
	table = "test_posts",
	tag_table = "tags",
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
	if (isNaN(req.params.id)) {
		console.log('Under attack!!!');
		res.redirect('/lost');
	} else {
		db.get_article(table, req.params.id, type, function (query) {
			query = query.rows[0];
			query.body = md(query.body);
			res.render('../templates/pages/article.ejs', {
				post: query
			});
		}, function() {res.redirect('/lost');});
	}
};

exports.hub = function(req, res, type) {
	db.get_hub(table, type, 10, function (query) {
		query = query.rows;
		for(var i = 0; i < query.rows.length; i++) query.rows[i].body = md(query.rows[i].body);
		res.render('../templates/pages/hub.ejs', {
			posts: query,
			hub: type
		});
	}, function() {res.redirect('/lost');});
};

exports.tagsearch = function(req, res) {
	var tag = req.params.tag.replace(/'/g, "''");
	db.get_posts_by_tag(table, tag_table, tag, function(query) {
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++)
			posts[i].body = md(posts[i].body);
		res.render('../templates/pages/tagsearch', {
			posts: query.rows,
			tag: tag
		});
	});
};