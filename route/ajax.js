var db = require('../middleware/dbconnect'),
    post_table = 'test_posts',
	tag_table = 'tags',
	author_table = 'users',
	email_table = 'emails';

exports.tags = function(req, res) {
	var id = parseInt(req.params.id);
	if (!isNaN(id)) {
		db.get_tags_by_post('tags', id.toString(), function (result) {
			var ans = [];
			for(var i = 0; i < result.rows.length; i++) ans.push(result.rows[i].tag);
			res.send(JSON.stringify(ans));
		});
	} else {
		res.send('[]');
	}
};

exports.author = function(req, res) {
	var username = req.params.username.replace(/'/g, "''");
	db.get_user(author_table, username, function(result) {
		var ans = result.rows[0];
		if(ans != null) delete ans.password;
		res.send(JSON.stringify(ans));
	});
};

exports.email = function(req, res) {
	var name = req.body.name.replace(/'/g, "''"),
		email = req.body.email.replace(/'/g, "''");
	db.add_email(email_table, name, email, function() {
		console.log('[SUB] New subscriber! ' + name + ' ' + email);
		res.send('true');
	});
};

exports.main_page_content = function(req, res) {
    var ans = [
        ['hello1', 'hello2', 'hello3'],
        ['BIGGEST HELLO EVER!!1!1']
    ];
    
    res.send(JSON.stringify(ans));
};

exports.posts = function(req, res) {
    db.get_data(post_table, 10, undefined, false, function(query) {
        res.send(JSON.stringify(query.rows));
    });
}