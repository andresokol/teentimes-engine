var express = require('express');
var app = express();
var pctrl = require(__dirname + '/page_controller')

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'));

app.get('/', pctrl.home);
app.get('/admin', pctrl.admin);
app.get('*', function (request, responce) {
	responce.redirect("/404");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
