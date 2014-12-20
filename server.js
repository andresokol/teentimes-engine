var express = require('express'),
    http = require('http'),
    app = express(),
    middleware = require('./middleware')(app, express);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

//-----  debug feature - off for production!! ----- 
/*var db_url = process.env.DATABASE_URL;
if (db_url == undefined) {
  db_url = "postgres://postgres:lollipop11@localhost:5432/postgres";
};

app.get('/db', function (request, response) {
  pg.connect(db_url, function(err, client, done) {
    client.query('SELECT * FROM test_posts', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
  });
});
//------------------------------------*/