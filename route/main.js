var pages = require('../views/main_page');

exports.home = function (req, res) {
	pages.main(req, res, 10);
};

exports.admin = function (request, responce) {
	responce.send("Do you claim to be good?");
};