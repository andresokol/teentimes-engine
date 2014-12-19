var express = require('express');
var app = express();
var pctrl = require(__dirname + '/page_controller')

app.set('port', (process.env.PORT || 5000));
app.set('views engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'));

//-----  connect database  ---------
var pg = require('pg');

//-----  debug feature - off for production!! ----- 
var db_url = process.env.DATABASE_URL;
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
//------------------------------------

app.get('/', pctrl.home);
app.get('/admin', pctrl.admin);
app.get('*', function (request, responce) {
	responce.redirect("/404");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
