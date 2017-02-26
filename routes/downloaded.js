/**
 * Created by Araja Jyothi Babu on 13-Nov-16.
 */
var utils = require('./utils/index.js');
var dao = require('./../config/dao');

module.exports = function(router, db){
    router.get('/downloaded', function (req, res) {
        var list = [];
        dao.mostDownloaded(db, 100, function (err, response) {
            if(response){
                list = response;
            }
            res.render('downloaded', {og: utils.openGraph, list: list});
        });

    });
    return router;
};