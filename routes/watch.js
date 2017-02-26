/**
 * Created by Araja Jyothi Babu on 02-Oct-16.
 */

var downloader = require('ytdl-core');
var url = require('url');
var utils = require('./utils/index.js');
var dao = require('./../config/dao');
var requests = require('./utils/requests');

var videoDefaultTitle = "Video Not Found";

/**
 * It'll give video info for processing meta
 */
module.exports = function(router, db){
    router.get('/watch', function (req, res) {
        var parsed = url.parse(req.url, true);
        var id = parsed.query.v || req.query.v;
        var properUrl = 'https://www.youtube.com/watch?v=' + id;
        var response = {};
        var collection = db.collection("videos");
        var key = {_id: id};
        downloader.getInfo(properUrl, {}, function(error, info){
            if(error) {
                console.error("Error occurred==>", error);
                response.failureReasons = utils.downloadFailureReasons;
                response.error = error;
            }
            var properInfo = utils.getInfo(info);
            collection.findOne(key, function (err, videoData) {
                if(videoData) {
                    dao.incrementRepeats(db, id);
                    videoData.repeats += 1; //increments as of now
                }else{
                    var data = {
                        _id: id,
                        title: properInfo.title || videoDefaultTitle,
                        img: properInfo.thumbnail_url || utils.ogImage,
                        repeats: 1
                    };
                    if(!error) {
                        collection.update(key, data, {upsert: true});
                        videoData = data;
                    }
                }
                var pageTitle = videoDefaultTitle + " | " + "UrYouTube";
                if(videoData)
                    pageTitle = (videoData.title || properInfo.title) + " | " + "UrYouTube";
                var openGraph = {
                    title: pageTitle || utils.ogTitle,
                    url: utils.ogUrl + "/watch?v=" + id,
                    image: properInfo.thumbnail_url || utils.ogImage,
                    description: utils.ogDescription
                };
                var videos = [];
                var query = ""; //default search
                if(pageTitle.indexOf(videoDefaultTitle) < 0){ //FIXME: Need AI here :)
                    query = pageTitle.replace(/[^a-z0-9+]+/gi, '+').split('+').filter(function(term) {return term.length > 2;}).slice(0, 10);
                }
                var options = {quality: 'medium'};
                if(videoData && !error){
                    options.relatedToVideoId = videoData._id;
                }else{
                    options.chart = 'mostPopular';
                }
                requests.search(query, options, function (err, data) {
                    if(data){
                        videos = data;
                    }
                    response = Object.assign(response, { og: openGraph, info: properInfo, video: (videoData || {_id: id}), videos: videos});
                    console.log(properUrl, response);
                    res.render('watch', response);
                });
            });
        });
    });
    return router;
};
