var pages = require('../views/main_page');

exports.home = function (req, res) {
    page_to_show = parseInt(req.query.p);
    if (isNaN(page_to_show)) page_to_show = 1;
	pages.main(req, res, 10, page_to_show);
};



exports.article = function (req, res) {
	pages.article(req, res, 'article');
};

exports.img = function (req, res) {
	pages.article(req, res, 'img');
};

exports.music = function (req, res) {
	pages.article(req, res, 'music');
};

exports.lastissue = function (req, res) {
	pages.article(req, res, 'lastissue');
};

exports.literature = function (req, res) {
	pages.article(req, res, 'literature');
};



exports.hub_article = function (req, res) {
	pages.hub(req, res, 'article');
};

exports.hub_img = function (req, res) {
	pages.hub(req, res, 'img');
};

exports.hub_music = function (req, res) {
	pages.hub(req, res, 'music');
};

exports.hub_lastissue = function (req, res) {
	pages.hub(req, res, 'lastissue');
};

exports.hub_literature = function (req, res) {
	pages.hub(req, res, 'literature');
};


exports.tagsearch = function(req, res) {
	pages.tagsearch(req, res);
};

exports.about = function(req, res) {
	res.render('../templates/pages/about', {});
}