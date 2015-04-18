var db = require('../middleware/dbconnect'),
	table = "test_posts",
	tag_table = "tags",
	md = require('marked'),
	types = new Array();

types['article'] = 'Статьи';
types['img'] = 'Искусство';
types['lastissue'] = 'Последний выпуск';
types['music'] = 'Музыка';
types['literature'] = 'Литература';

exports.main = function(req, res, posts_on_page) {
	db.get_data(table, posts_on_page, false, function (query) {
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++) {
			var t = posts[i].body,
				n = t.indexOf('<c>');
			if (n != -1) t = t.substr(0, n-3) + "\n\r\n\r*<a href='/" + posts[i].type + '/' + posts[i].id + 
																						"' class='cut'>Читать далее...</a>*";
			posts[i].body = md(t);
		}
		res.render('../templates/pages/main', {
			posts: posts
		});
	});
};

exports.article = function(req, res, type) {
	if (isNaN(req.params.id)) {
		console.log('Under attack!!!');
		res.redirect('/lost');
	} else {
		db.get_article(table, req.params.id, type, false, function (query) {
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
		for(var i = 0; i < query.length; i++) {
			var t = query[i].body,
				n = t.indexOf('<c>');
			if (n != -1) t = t.substr(0, n-3) + "\n\r\n\r*<a href='/" + query[i].type + '/' + query[i].id + "' class='cut'>Читать далее...</a>*";
			query[i].body = md(t);
		}
		res.render('../templates/pages/hub.ejs', {
			posts: query,
			hub: types[type]
		});
	}, function() {
		var query = [{title: 'Мы ничего не нашли =(', body: '', created: '', id: '', type: 'article'}];
		
		res.render('../templates/pages/hub.ejs', {
			posts: query,
			hub: types[type]
		});
	});
};

exports.tagsearch = function(req, res) {
	var tag = req.params.tag.replace(/'/g, "''");
	db.get_posts_by_tag(table, tag_table, tag, function(query) {
		var posts = query.rows;
		
		for(var i = 0; i < posts.length; i++) {
			var t = posts[i].body,
				n = t.indexOf('<c>');
			if (n != -1) t = t.substr(0, n-3) + "\n\r\n\r*<a href='/" + posts[i].type + '/' + posts[i].id + 
																						"' class='cut'>Читать далее...</a>*";
			posts[i].body = md(t);
		}
		
		if (posts.length == 0) posts = [{title: 'Мы ничего не нашли =(', body: '', 
										 created: '', id: '', type: 'article'}];
		
		res.render('../templates/pages/tagsearch', {
			posts: posts,
			tag: tag
		});
	});
};