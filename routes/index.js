var utils = require('./utils/index');
var dao = require('./../config/dao');

/* GET home page. */
module.exports = function(router, db){
    router.get('/', function (req, res) {
        var videos = [];
        dao.getTrending(db, 200, function (err, response) {
            if(response){
                videos = response;
            }
            res.render('index', { og: utils.openGraph, videos: videos});
        });
    });
    return router;
};