/**
 * Created by Araja Jyothi Babu on 07-Oct-16.
 */
var utils = require('./utils/index.js');

/**
 *  Sends the contact details to DB
 */
module.exports = function(router){
    router.get('/privacy', function (req, res) {
        res.render('privacy', {og: utils.openGraph});
    });
    return router;
};