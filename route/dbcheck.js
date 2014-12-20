var db = require('../middleware/dbconnect');

exports.main = function (req, res) {
	var qstring = req.url;
	qstring = qstring.slice(4, db.length);
	var ans = db.get_data("SELECT * FROM " + qstring);
	console.log('db check - ' + ans);
	res.send();
};