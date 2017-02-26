var downloader = require('ytdl-core');
var utils = require('./utils/index.js');

/**
 * It'll give video info for processing meta
 */
module.exports = function(router){
    router.get('/info/:v', function (req, res) {

        var id = req.params.v;
        var properUrl = 'https://www.youtube.com/watch?v=' + id;
        res.setHeader('Content-Type', 'application/json');
        var metaInfo = downloader.getInfo(properUrl, {}, function(error, info){
            if(error){
                console.log(error);
                res.json({info: null});
            }else{
                console.log("Info Success");
                var properInfo = utils.getInfo(info);
                var openGraph = {
                    title: properInfo.title || utils.ogTitle,
                    url: utils.ogUrl,
                    image: properInfo.thumbnail_url || utils.ogUrl,
                    description: utils.ogDescription
                };
                res.json({info: properInfo});
            }
            res.end();
        });

    });
    return router;
};
