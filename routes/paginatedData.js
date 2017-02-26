/**
 * Created by jyothi on 26/12/16.
 */
var utils = require('./utils/index');
var dao = require('./../config/dao');

var dataSize = 10;

/* GET home page. */
module.exports = function(router, db){

    router.get('/trending/:version', function (req, res) {
        var dataVersion = req.params.version || 0;
        var videos = [];
        dao.getTrending(db, dataSize, function (err, response) {
            if(response){
                videos = response;
            }
            res.json({videos: videos});
        }, dataVersion);
    });

    router.get('/repeated/:version', function (req, res) {
        var dataVersion = req.params.version || 0;
        var videos = [];
        dao.mostRepeated(db, dataSize, function (err, response) {
            if(response){
                videos = response;
            }
            res.json({videos: videos});
        }, dataVersion);
    });

    router.get('/downloaded/:version', function (req, res) {
        var dataVersion = req.params.version || 0;
        var videos = [];
        dao.mostRepeated(db, dataSize, function (err, response) {
            if(response){
                videos = response;
            }
            res.json({videos: videos});
        }, dataVersion);
    });

    return router;
};