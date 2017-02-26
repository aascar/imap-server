/**
 * Created by Araja Jyothi Babu on 13-Nov-16.
 */
var utils = require('./utils/index.js');
var dao = require('./../config/dao');

module.exports = function(router, db){
    router.get('/download/:v', function (req, res) {
        var id = req.params.v;
        dao.incrementDownloads(db, id, function (err, done) {
            if(err)
                res.json(false);
            if(done)
                res.json(true);
        });
    });
    return router;
};