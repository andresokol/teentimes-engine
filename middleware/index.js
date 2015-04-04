module.exports = function (app, express) {
    var ejs = require('ejs-locals'),
        //config = require('../config'),
        path = require('path'),
		bodyParser = require('body-parser'),
        router = require('../route'),
		session = require('express-session');

    app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000);
    app.set('ipaddr', process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "127:0:0:1");
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
	 * Authentification
	 * */
	app.use(session({secret: 'they call me mellow yellow',
					resave: false,
					saveUninitialized: true
					}));
	
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
