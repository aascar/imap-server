/**
 * Created by Araja Jyothi Babu on 13-Nov-16.
 */
var utils = require('./utils/index.js');

module.exports = function(router){
    router.get('/playlist/:name/:v', function (req, res) {
        //TODO:
        res.json();
    });
    return router;
};