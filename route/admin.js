var adm = require('../views/admin'),
	auth = require('../middleware/auth');

restricted = function(req, res, callback) {
	auth.isAuthentificated(req, res, callback, function(req, res) {
		res.redirect('/login');
	});
};

exports.add_new_post = function (req, res) {
	restricted(req, res, adm.show_add_page);
};

exports.submit_new_post = function (req, res) {
	restricted(req, res, adm.show_submit_page);
};

exports.add_post_to_db = function (req, res) {
	restricted(req, res, adm.show_success_page);
};

exports.admin_page = function (req, res) {
	restricted(req, res, adm.show_admin_page);
};

exports.switch_visibility = function (req, res) {
	restricted(req, res, adm.switch_visibility);
};

exports.ask_for_delete = function (req, res) {
	restricted(req, res, adm.ask_for_delete);
};

exports.delete_post = function (req, res) {
	restricted(req, res, adm.delete_post);
};

exports.show_user = function (req, res) {
	restricted(req, res, adm.show_user);
};

exports.update_user = function (req, res) {
	restricted(req, res, adm.update_user);
};


exports.edit_post = function (req, res) {
	restricted(req, res, adm.show_edit_page);
};

exports.save_post = function (req, res) {
	restricted(req, res, adm.save_edited_post);
};