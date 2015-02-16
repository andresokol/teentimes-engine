var db = require('../middleware/dbconnect');

exports.tags = function(req, res) {
	db.get_tags_by_post('tags', req.params.id, function (result) {
		var ans = 'var tags = ["';
		for(var i = 0; i < result.rows.length; i++) ans += result.rows[i].tag + '", "';
		res.send(ans.substr(0, ans.length - 3) + '];');
	});
};
