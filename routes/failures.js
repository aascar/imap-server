/**
 * Created by Araja Jyothi Babu on 05-Oct-16.
 */
var utils = require('./utils/index.js');

/**
 *  Sends the contact details to DB
 */
module.exports = function(router){
    router.get('/failures', function (req, res) {
        res.render('failures', {og: utils.openGraph, failureReasons: utils.downloadFailureReasons});
    });
    return router;
};
