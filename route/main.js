var pages = require('../views/main_page'),
	adm = require('../views/admin');

exports.home = function (req, res) {
	pages.main(req, res, 10);
};

exports.add_new_post = function (req, res) {
	adm.show_add_page(req, res);
};

exports.submit_new_post = function (req, res) {
	adm.show_submit_page(req, res);
};