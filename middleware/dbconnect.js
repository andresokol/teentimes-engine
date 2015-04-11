var pg = require('pg'),
	db_url = process.env.DATABASE_URL || process.env.OPENSHIFT_POSTGRESQL_DB_URL  || "postgres://postgres:lollipop11@localhost:5432/postgres";

exports.get_data = function (table, limit, show_hidden, callback) {
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
		
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.send_post = function (qstring, table, callback) {
	pg.connect(db_url, function(err, client, done) {
		var query = client.query(qstring),
			cnt = 0;
		
		/*query.on('row', function (row, result) {
			result.addRow(row);
		});*/
		
		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.get_max_id = function (table, callback) {
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
				
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.get_article = function(table, id, type, callback, failed) {
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
				
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			if (result.rows.length == 0) {
				failed();
			} else {
				if (result.rows[0].visible)
					callback(result);
				else failed();
			}
		});
		done();
	});
};


exports.get_hub = function(table, type, limit, callback, failed) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = 	"SELECT * FROM " + table + " WHERE type = '" + type + 
						"' and visible = true ORDER BY id DESC LIMIT " + limit;
				
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			if (result.rows.length == 0) {
				failed();
			} else {
				callback(result);
			}
		});
		done();
	});
};

exports.get_password = function(table, username, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "SELECT password FROM " + table + " WHERE username = '" + username + "'";
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.get_user = function(table, username, callback) {
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
				
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback(result);	
		});
		done();
	});
};

exports.switch_visibility = function(table, id, callback) {
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
				
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback();
		});
		done();
	});
};

exports.delete_article = function(table, tag_table, id, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "DELETE FROM " + table + " WHERE id = " + id +
					"; DELETE FROM " + tag_table + " WHERE id = '" + id + "';";
				
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback();
		});
		done();
	});
};

exports.get_tags_by_post = function(table, id, callback) {
	pg.connect(db_url, function(err, client, done) {
		var qstring = "SELECT tag FROM " + table + " WHERE id = " + id + ";";
		
		var query = client.query(qstring);
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.run = function(qstring, callback) {
	pg.connect(db_url, function(err, client, done) {				
		var query = client.query(qstring);
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.get_posts_by_tag = function(table_posts, table_tags, tag, callback) {
	pg.connect(db_url, function(err, client, done) {
		var qstring =	"SELECT * FROM " + table_posts + " WHERE id in (SELECT id FROM " + table_tags + 
						" WHERE tag = '" + tag + "') and visible = true ORDER BY id DESC;",
			query = client.query(qstring);
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback(result);
		});
		done();
	});
};

exports.add_email = function(table_emails, name, email, callback) {
	pg.connect(db_url, function(err, client, done) {
		var qstring =	"INSERT INTO " + table_emails + " values('" + name + 
						"','" + email + "');",
			query = client.query(qstring);
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			callback();
		});
		done();
	});
};