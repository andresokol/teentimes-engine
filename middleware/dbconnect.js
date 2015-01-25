var pg = require('pg'),
	db_url = process.env.DATABASE_URL || "postgres://postgres:lollipop11@localhost:5432/postgres";

exports.get_data = function (table, limit, show_hidden, callback) {
	console.log("Gettin data from " + table + "...");
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "SELECT * FROM " + table;
		
		if (!show_hidden) qstring += " WHERE visible = true";
		
		qstring += " ORDER BY id DESC LIMIT " + limit;
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			console.log("Got " + result.rows.length + " rows when asked " + qstring);
			callback(result);
		});
		done();
	});
};

exports.send_post = function (qstring, table, callback) {
	console.log("Connectin....");
	console.log(qstring);
	pg.connect(db_url, function(err, client, done) {
		console.log(this.qstring);
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		console.log(this.qstring);
		
		var qstring = "INSERT INTO " + table + " " + this.qstring;
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		/*query.on('row', function (row, result) {
			result.addRow(row);
		});*/
		
		query.on('end', function(result) {
			console.log("Done");
			callback(result);
		});
		done();
	}.bind({qstring:qstring}) );
};

exports.get_max_id = function (table, callback) {
	console.log("Getting max id from table " + table + "...");
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "SELECT id FROM " + table + " ORDER BY id DESC LIMIT 1";
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			console.log("Max id in table " + table + " is " + (result.rows));
			callback(result);
		});
		done();
	});
};

exports.get_article = function(table, id, callback, failed) {
	console.log("Looking for article " + id + " from table " + table);
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "SELECT * FROM " + table + " WHERE id = '" + id + "'";
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			if (result.rows.length == 0) {
				failed();
			} else {
				console.log("Got article '" + result.rows[0].title + "' for id " + id);
				callback(result);
			}
		});
		done();
	});
};

exports.get_user = function(table, username, callback) {
	console.log("Looking for user " + username + " from table " + table);
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "SELECT * FROM " + table + " WHERE username = '" + username + "'";
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			console.log("Found " + result.rows.length + " users " + username);
			callback(result);
		});
		done();
	});
};

exports.switch_visibility = function(table, id, callback) {
	console.log("Switching visibility for post " + id);
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "UPDATE " + table + " SET visible = not (SELECT visible FROM " + table + " WHERE id = " + id + 
						") WHERE id = " + id + ";";
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			console.log("done");
			callback();
		});
		done();
	});
};