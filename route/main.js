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

exports.add_post_to_db = function (req, res) {
	adm.show_success_page(req, res);
};

exports.admin_page = function (req, res) {
	adm.show_admin_page(req, res);
};

exports.article = function (req, res) {
	pages.article(req, res);
};