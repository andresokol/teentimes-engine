var pg = require('pg'),
	db_url = process.env.DATABASE_URL || "postgres://postgres:lollipop11@localhost:5432/postgres";

exports.get_data = function (qstring) {
	var ans = '';
	pg.connect(db_url, function(err, client, done) {
		/*var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};*/
		
		console.log(qstring);
		
		var query = client.query(qstring);
		
		query.on('row', function(row) {
			console.log(row.name);
			ans += row.name;
			console.log("ans - " + ans);
		});
		done();
	});
	console.log(ans);
	return ans;
};