/**
 * Created by Araja Jyothi Babu on 13-Nov-16.
 */
var utils = require('./utils/index.js');

/**
 *  Sends the contact details to DB
 */
module.exports = function(router){
    router.get('/about', function (req, res) {
        res.render('about', {og: utils.openGraph});
    });
    return router;
};