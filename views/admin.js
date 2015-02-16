var db = require('../middleware/dbconnect'),
	table = "test_posts",
	md = require('marked');

exports.show_admin_page = function(req, res) {
	db.get_data(table, 100, true, function(query){
		var posts = query.rows;
		for(var i = 0; i < posts.length; i++)
			posts[i].body = md(posts[i].body);
		res.render("../templates/admin", {
			posts: posts,
			username: req.session.username
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
		type: req.body.type,
		time: String(date).slice(17, 22)
	});
};

exports.show_success_page = function (req, res) {
	db.get_max_id(table, function (id) {
		var date = (new Date()).toUTCString(),
			qstring = "values(" + (id.rows[0].id+1) + ",'" + req.body.title.replace(/'/g, "''") + "','" + req.body.body.replace(/'/g, "''") + "','" + date + "','" + req.body.type + "','false')";
		console.log("Trying to put in db " + qstring);
		db.send_post(qstring, table, function (result) {
			console.log("Successed");
			res.send("<h3>Success!</h3>Get back now to <a href='/admin'>admin page</a> or <a href='/'>main page</a>");
		});
	});
};

exports.switch_visibility = function(req, res) {
	db.switch_visibility(table, req.params.id, function() {
		res.redirect('/admin');
	});
};

exports.ask_for_delete = function(req, res) {
	db.get_article(table, req.params.id, undefined, function(query) {
		res.render('../templates/admin/delete_post', {
				   post: query.rows[0]
		});
	}, function () {
		res.send('No such article =(');
	});
};

exports.delete_post = function(req, res) {
	db.delete_article(table, req.body.id, function() {
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