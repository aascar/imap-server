/**
 * Created by Araja Jyothi Babu on 13-Nov-16.
 */
var utils = require('./utils/index.js');
var dao = require('./../config/dao');

module.exports = function(router, db){
    router.get('/repeat/:v', function (req, res) {
        var id = req.params.v;
        dao.incrementRepeats(db, id, function (err, done) {
            if(err)
                res.json(false);
            if(done)
                res.json(true);
        });
    });
    return router;
};