var main = require("./main"),
	error = require("./error"),
	auth = require('./auth'),
	admin = require('./admin'),
	dbcheck = require("./dbcheck"),
	ajax = require('./ajax'),
	test = function(req, res) {
		res.send();
	};

module.exports = function (app) {
	// Open pages
	app.get('/', main.home);
	app.get('/article/', main.hub_article);
	app.get('/article/:id', main.article);
	app.get('/img/', main.hub_img);
	app.get('/img/:id', main.img);
	app.get('/music/', main.hub_music);
	app.get('/music/:id', main.music);
	app.get('/lastissue/', main.hub_lastissue);
	app.get('/lastissue/:id', main.lastissue);
	app.get('/literature/', main.hub_literature);
	app.get('/literature/:id', main.literature);
	
	app.get('/tag/:tag', main.tagsearch);
	app.get('/about', main.about);
	
	// AJAX
	app.get('/ajax/tags/:id', ajax.tags);
	app.get('/ajax/author/:username', ajax.author);
	
	// Admin page
	app.get('/admin', admin.admin_page);
	app.get('/admin/add', admin.add_new_post);
	app.post('/admin/submit', admin.submit_new_post);
	app.post('/admin/switch/:id', admin.switch_visibility);
	app.post('/admin', admin.add_post_to_db);
	app.get('/admin/delete/:id', admin.ask_for_delete);
	app.post('/admin/delete', admin.delete_post);
	app.get('/admin/user', admin.show_user);
	app.post('/admin/user', admin.update_user);
	app.get('/admin/edit/:id', admin.edit_post);
	app.post('/admin/edit/:id', admin.save_post);
	app.get('/admin/manual', admin.manual);
	
	// Authentification
	app.get('/login', auth.show_login_form);
	app.post('/login', auth.login);
	//app.get('/private', auth.check_login);
	app.get('/logoff', auth.logoff);
	app.get('/lost', error.p404);
	
	// Test
	app.post('/test', test);
};