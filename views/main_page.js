var db = require('../middleware/dbconnect'),
	table = "test_posts";

exports.main = function(req, res, posts_on_page) {
	console.log("Gettin' page...");
	db.get_data(table, function (query) {
		var ans = '',
			arr = query.rows;
		console.log("Executin callback...");
		console.log("Posts display count: " + arr.length);
		for (var i = 0; i < posts_on_page && i < arr.length; i++) {
			ans += '<div class="article"><h3><a href="/articles/001">' + arr[i].title + '</a></h3><div id="imgcap"><img src="http://41.media.tumblr.com/8f192e1322f39d50211003582dfc4433/tumblr_nct7uv7zVm1qapi0oo1_400.jpg" /><p>Bing!</p></div>' + arr[i].body + '<div id="time"><time>' + arr[i].time + '</time></div></div>';
		};
		console.log("Printin' answer " + ans);
		res.render('../templates/main', {
			body: ans
		});
	});
};