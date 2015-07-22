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

exports.main = function(req, res, limit, page_to_show) {
	db.get_data(table, limit, page_to_show, false, function (query) {
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++) {
			var t = posts[i].body,
				n = t.indexOf('<c>');
			if (n != -1) t = t.substr(0, n-3) + "\n\r\n\r*<a href='/" + posts[i].type + '/' + posts[i].id + 
																						"' class='cut'>Читать далее...</a>*";
			posts[i].body = md(t);
		}
        
        db.get_visible_posts_count(table, undefined, function(query) {
            var page = 1;
            if (req.query.p != undefined) page = parseInt(req.query.p);
            res.render('../templates/pages/main', {
                posts: posts,
                posts_count: parseInt((parseInt(query.rows[0].count) + 9) / 10),
                current_page: page
            });
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
    page_to_show = parseInt(req.query.p);
    if (isNaN(page_to_show)) page_to_show = 1;
    
	db.get_hub(table, type, 10, page_to_show * 10 - 10, function (query) {
		query = query.rows;
		for(var i = 0; i < query.length; i++) {
			var t = query[i].body,
				n = t.indexOf('<c>');
			if (n != -1) t = t.substr(0, n-3) + "\n\r\n\r*<a href='/" + query[i].type + '/' + query[i].id + "' class='cut'>Читать далее...</a>*";
			query[i].body = md(t);
		}
        
        db.get_visible_posts_count(table, type, function(count) {
            var page = 1;
            if (req.query.p != undefined) page = parseInt(req.query.p);
            res.render('../templates/pages/hub', {
                posts: query,
                hub: types[type],
                posts_count: parseInt((parseInt(count.rows[0].count) + 9) / 10),
                current_page: page
            });
        });
	}, function() {
		var query = [{title: 'Мы ничего не нашли =(', body: '', created: '', id: '', type: 'article'}];
		
		res.render('../templates/pages/hub.ejs', {
			posts: query,
			hub: types[type],
            posts_count: 0,
            current_page: 0
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