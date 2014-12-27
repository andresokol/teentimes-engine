var db = require('../middleware/dbconnect'),
	table = "test_posts";

exports.show_add_page = function(req, res) {
	res.render('../templates/add_new_post', {});
};

exports.show_submit_page = function(req, res) {
	var date = (new Date()).toUTCString();
	var ans = '<div class="article"><h3><a href="/articles/001">' + req.body.title + '</a></h3>' + req.body.body + '<div id="time"><time>' + String(date).slice(16, 21) + '</time></div></div>';
	res.render('../templates/submit_new_post', {
		body: ans,
		post_body: req.body.body,
		post_title: req.body.title
	});
};

exports.show_success_page = function (req, res) {
	var date = (new Date()).toUTCString(),
		qstring = "values(0,'" + req.body.title + "','" + req.body.body + "','" + date + "')";
	console.log("Trying to put in db " + qstring);
	db.send_post(qstring, table, function (result) {
		console.log("Successed?");
		res.send(result);
	});
	//res.send(qstring);
};