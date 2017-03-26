var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router();

var app = express();

var db;
var mongoDBUrl = "mongodb://localhost:27017/uryoutube";
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(mongoDBUrl, function(err, database){
    if (err) return console.log(err);
    db = database;

    /**
     * Initializing Services
     */
    var userService = require('./services/user')(db);
    var videoService = require('./services/video')(db);
    var searchService = require('./services/search')(db.collection("searches"));

    /**
     * Initializing Controllers(routes)
     */
    //var userController = require('./routes/user')(router, userService);
    //var videoController = require('./routes/video')(router, videoService);
    var searchController = require('./routes/search/index')(router, searchService);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    /**
     * Route Configuration
     */
    //app.use("/v1/api/users/", userController);
    //app.use("/v1/api/videos/", videoController);
    app.use("/v1/api/search", searchController);


    //TODO: decide between server or client side rendering
    //var index = require('./routes')(router, db);
    //app.use("/", index);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: "Oops..! Something went wrong.",
            error: {}
        });
    });
});

module.exports = app;
