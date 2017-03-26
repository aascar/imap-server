/**
 * Created by jyothi on 24/3/17.
 */
module.exports = function (router, searchService) {
    router.get("", function (req, res) {
        var query = req.query.q;
        var videoPromise = searchService.searchVideos(query);
        videoPromise.then(function (data) {
            res.json(data);
            res.end();
        }).catch(function (err) {
            res.end([]);
        });
    });
    return router;
};