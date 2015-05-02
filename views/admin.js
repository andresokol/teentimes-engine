var db = require('../middleware/dbconnect'),
	table = "test_posts",
	tag_table = "tags",
	md = require('marked');

exports.show_admin_page = function(req, res) {
	db.get_data(table, 100, true, function(query){
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++) {
			posts[i].body = md(posts[i].body).replace(/<img\ssrc=['"][^'"]*['"]/g, '<img');
		}
		res.render("../templates/admin", {
			posts: posts,
			username: req.session.username
		});
	});
};

exports.show_admin_page_test = function(req, res) {
	db.get_data(table, 100, true, function(query){
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++)
			posts[i].body = md(posts[i].body);
		res.render("../templates/test", {
			posts: posts,
		});
	});
};

exports.show_add_page = function(req, res) {
	res.render('../templates/admin/add_new_post', {});
};

exports.show_submit_page = function(req, res) {
	var date = (new Date()).toUTCString();
	
	// rendering HTML-code from post
	var post = req.body.body;
	//-------------------------------
	
	res.render('../templates/admin/submit_new_post', {
		title: req.body.title,
		rendered: md(post),
		unrendered: post,
		tags: req.body.tags,
		type: req.body.type,
		time: String(date).slice(17, 22)
	});
};

exports.show_success_page = function (req, res) {
	db.get_max_id(table, function (id) {
		var date = (new Date()).toUTCString(),
			qstring = "INSERT INTO " + table 
					+ " values(" + (id.rows[0].id+1) + ",'" 
					+ req.body.title.replace(/'/g, "''") + "','" 
					+ req.body.body.replace(/'/g, "''") + "','" 
					+ date + "','" + req.body.type + "','false', '" + req.session.username + "');",
			tags = req.body.tags.split(" ");
		
		for(var i = 0; i < tags.length; i++) qstring += "INSERT INTO " + tag_table + 
														" values(" + (id.rows[0].id+1) + 
														",'" + tags[i].replace(/'/g, "''") + "');";
		
		db.send_post(qstring, table, function () {
			console.log('[ADD] Post "' + req.body.title + '" added by ' + req.session.username);
			res.redirect("/admin");
		});
	});
};

exports.switch_visibility = function(req, res) {
	db.switch_visibility(table, req.params.id, function(query) {
		console.log('[UPD] Switched visibility for post ' + req.params.id + ' by ' + req.session.username);
		res.send(query.rows[0].visible);
	});
};

exports.ask_for_delete = function(req, res) {
	db.get_article(table, req.params.id, undefined, true, function(query) {
		res.render('../templates/admin/delete_post', {
			post: query.rows[0],
			username: req.session.username
		});
	}, function () {
		res.send('No such article =(');
	});
};

exports.delete_post = function(req, res) {
	db.delete_article(table, tag_table, req.body.id, function() {
		console.log('[DEL] Post ' + req.body.id + ' deleted by ' + req.session.username);
		res.redirect('/admin');
	});
};

exports.show_user = function(req, res) {
	db.get_user('users', req.session.username, function(query) {
		res.render('../templates/admin/user_page', {
			user: query.rows[0]
		});
	});
};

exports.update_user = function(req, res) {
	var ans = "UPDATE users SET name = '" + req.body.name.replace(/'/g, "''") + "', about = '" + 
				req.body.about.replace(/'/g, "''") + "', imgurl = '" + req.body.imgurl.replace(/'/g, "''") +
				"' WHERE username = '" + req.session.username + "';";
	db.run(ans, function(query) {
		console.log('[UPD] User ' + req.session.username + ' updated his profile');
		res.redirect('/admin/user');
	});
};

exports.show_edit_page = function(req, res) {
	db.get_article(table, req.params.id, undefined, true, function(result) {
		res.render('../templates/admin/edit_post', {
			post: result.rows[0],
			username: req.session.username
		});
	}, function() {
		res.send('<h1>No such post =(</h1>');
	});
};

exports.save_edited_post = function(req, res) {
	var qstring =   'UPDATE ' + table + " SET body = '" + req.body.body.replace(/'/g, "''") +
					"', title = '" + req.body.title.replace(/'/g, "''") +
					"' WHERE id = " + req.params.id + ";\n",
		tags = req.body.tags.split(' ');
	qstring += "DELETE FROM " + tag_table + " WHERE id = " + req.params.id + ";";
	for(var i = 0; i < tags.length; i++) qstring += " INSERT INTO " + tag_table +
						" values(" + req.params.id + ", '" + tags[i].replace(/'/g, "''") + "');";
	
	db.run(qstring, function(result) {
		console.log('[UPD] Post ' + req.params.id + ' "' + req.body.title + '" edited by ' + req.session.username);
		res.redirect('/admin');
	}, function() {
		res.send('error');
	});
};

exports.manual = function (req, res) {
	res.render('../templates/admin/manual', {});
};

exports.guideline = function (req, res) {
	res.render('../templates/admin/guideline', {});
};

exports.subs = function (req, res) {
	db.run('SELECT * FROM emails;', function(result) {
		console.log(result.rows.length);
		res.render('../templates/admin/subs', {
			a: result.rows
		});
	});
};