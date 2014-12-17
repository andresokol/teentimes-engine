exports.home = function (req, res) {
  res.send('Teen times, motherfucker!')
};

exports.admin = function (request, responce) {
	responce.send("Do you claim to be good?");
};