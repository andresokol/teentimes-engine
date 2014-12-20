exports.home = function (req, res) {
    res.send("UNDER MAINTENCE");

  /*var ans = '';
  var posts_on_page = 2;
  .connect(db_url, function (err, client, done) {
    client.query("SELECT * FROM test_posts LIMIT " + posts_on_page, function (err, result) {
      for (var i = 0; i < posts_on_page; i++) {
        /*ans += '<div class="article">
        <h3><a href="/articles/001">' + result[i][1] + '</a></h3>
        <div id="imgcap">
        <img src="http://41.media.tumblr.com/8f192e1322f39d50211003582dfc4433/tumblr_nct7uv7zVm1qapi0oo1_400.jpg" />
        <p>Bing!</p></div>'
         + result[i][2] +
        '<div id="time"><time>' + result[i][3] + '</time></div></div>';
        ans += result[i][1];
      };
    })
  });
  res.render('../templates/main', {
      body: ans
  })*/
};

exports.admin = function (request, responce) {
	responce.send("Do you claim to be good?");
};