/**
 * Created by Araja Jyothi Babu on 13-Nov-16.
 */
var utils = require('./utils/index.js');
var dao = require('./../config/dao');

module.exports = function(router, db){
    router.get('/repeated', function (req, res) {
        var list = [];
        dao.mostRepeated(db, 100, function (err, response) {
            if(response){
                list = response;
                console.log("list", list);
            }
            res.render('repeated', {og: utils.openGraph, list: list});
        });

    });
    return router;
};