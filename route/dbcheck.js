var db = require('../middleware/dbconnect');

exports.main = function (req, res) {
	var qstring = req.url;
	qstring = qstring.slice(4, db.length);
	db.get_data("SELECT * FROM " + qstring, function (result) {
		res.send(result.rows);
	});
};