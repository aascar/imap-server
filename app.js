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
    var index = require('./routes/index')(router, db);
    var info = require('./routes/info')(router, db);
    var watch = require('./routes/watch')(router, db);
    var downloadFile = require('./routes/downloadFile')(router, db);
    var contact = require('./routes/contact')(router, db);
    var failures = require('./routes/failures')(router, db);
    var terms = require('./routes/terms')(router, db);
    var privacy = require('./routes/privacy')(router, db);
    var help = require('./routes/help')(router, db);
    var about = require('./routes/about')(router, db);

    var repeat = require('./routes/repeat')(router, db);
    var repeated = require('./routes/repeated')(router, db);
    var download = require('./routes/download')(router, db);
    var downloaded = require('./routes/downloaded')(router, db);
    var like = require('./routes/like')(router, db);
    var playlist = require('./routes/playlist')(router, db);

    var search = require('./routes/search')(router, db);

    var paginatedData = require('./routes/paginatedData')(router, db);

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

    app.use('/', index);
    app.use('/watch', watch);
    app.use('/info/:v', info);
    app.use('/download/:v/:itag', downloadFile);
    app.use('/contact', contact);
    app.use('/failures', failures);
    app.use('/terms', terms);
    app.use('/privacy', privacy);
    app.use('/help', help);
    app.use('/about', about);
    app.use('/repeated', repeated);
    app.use('/downloaded', downloaded);
    app.use('/search', search);

    app.use('/repeat/:v', repeat);
    app.use('/download/:v', download);
    app.use('/like/:v', like);
    app.use('/playlist/:name/:v', playlist);

    app.use('/versioned', paginatedData);

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
