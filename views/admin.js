var db = require('../middleware/dbconnect'),
	table = "test_posts";

exports.show_admin_page = function(req, res) {
	db.get_data(table, 100, function(query){
		res.render("../templates/admin", {
			posts: query.rows
		});
	});
};

exports.show_add_page = function(req, res) {
	res.render('../templates/add_new_post', {});
};

exports.show_submit_page = function(req, res) {
	var date = (new Date()).toUTCString();
	
	// rendering HTML-code from post
	var post = req.body.body;
	post = "<p>" + post + "</p>";
	post = post.replace(/\r?\n/g, "</p>\n<p>");
	//-------------------------------
	
	res.render('../templates/submit_new_post', {
		title: req.body.title,
		body: post,
		type: req.body.type,
		time: String(date).slice(17, 22)
	});
};

exports.show_success_page = function (req, res) {
	db.get_max_id(table, function (id) {
		var date = (new Date()).toUTCString(),
			qstring = "values(" + (id.rows[0].id+1) + ",'" + req.body.title + "','" + req.body.body.replace(/'/g, "''") + "','" + date + "','" + req.body.type + "')";
		console.log("Trying to put in db " + qstring);
		db.send_post(qstring, table, function (result) {
			console.log("Successed");
			res.send("<h3>Success!</h3>Get back now to <a href='/admin'>admin page</a> or <a href='/'>main page</a>");
		});
	});
};