/**
 * Created by Araja Jyothi Babu on 04-Oct-16.
 */
var utils = require('./utils/index.js');
var url = require('url');

/**
 *  Sends the contact details to DB
 */
module.exports = function(router){
    router.get('/contact', function (req, res) {
        var parsed = url.parse(req.url, true);
        var id = parsed.query.url || req.query.url;
        res.render('contact', {og: utils.openGraph, url: id});
    });
    return router;
};
