/**
 * Created by jyothi on 22/1/17.
 */
var url = require('url');
var requests = require('./utils/requests');
var utils = require('./utils/index');
var dao = require('./../config/dao');

module.exports = function(router, db){
    router.get('/search', function (req, res) {
        var parsed = url.parse(req.url, true);
        var q = parsed.query.q || req.query.q;
        dao.insertSearches(db, q); //Inserts query into db
        requests.search(q, {quality: 'default'}, function (err, data) {
            var openGraph = Object.assign({}, utils.openGraph, { title: q + ' | ' + 'Search | UrYouTube' });
            res.render('search', { og: openGraph, list: data, q: q});
        });
    });
    return router;
};