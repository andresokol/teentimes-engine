module.exports = function (app, express) {
    var ejs = require('ejs-locals'),
        //config = require('../config'),
        path = require('path'),
		bodyParser = require('body-parser'),
        router = require('../route');

    app.set('port', process.env.PORT || 5000);
    /**
     * Page Rendering
     * */
    app.engine('html', ejs);
    app.engine('ejs', ejs);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');
	
	/* *
	 * POST request thingy
	 * */
	app.use(bodyParser.urlencoded({ extended: false }));
	
	
    /* *
     * Routing
     * */
    router(app);


    /**
     * Public directory
     * */
    app.use(express.static(path.join(__dirname, '../public')));
    app.use("/public", express.static(path.join(__dirname, '../public')));
};
