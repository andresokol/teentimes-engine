var db = require('../middleware/dbconnect'),
	table = "test_posts";

exports.main = function(req, res, posts_on_page) {
	db.get_data(table, function (query) {
		var ans = '',
			arr = query.rows;
		for (var i = 0; i < posts_on_page && i < arr.length; i++) {
			ans += '<div class="article"><h3><a href="/articles/001">' + arr[i].title + '</a></h3>' + arr[i].body + '<div id="time"><time>' + String(arr[i].created).slice(16, 21) + '</time></div></div>';
		};
		res.render('../templates/main', {
			body: ans
		});
	});
};