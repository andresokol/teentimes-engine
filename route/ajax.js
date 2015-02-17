var db = require('../middleware/dbconnect');

exports.tags = function(req, res) {
	db.get_tags_by_post('tags', req.params.id, function (result) {
		var ans = "var el = document.getElementById('p" + req.params.id + "');\n" + 
				  'var tags = ["';
		for(var i = 0; i < result.rows.length; i++) ans += result.rows[i].tag + '", "';
		if (result.rows.length == 0) res.send('');
		else res.send(ans.substr(0, ans.length - 3) + '];\nel.innerText = tags;');
	});
};
