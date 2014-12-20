exports.p404 = function (req, res, next) {
	res.redirect("public/404.html");
};