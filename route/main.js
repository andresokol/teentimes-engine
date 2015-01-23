var pages = require('../views/main_page'),
	adm = require('../views/admin');

exports.home = function (req, res) {
	pages.main(req, res, 10);
};

exports.article = function (req, res) {
	pages.article(req, res);
};