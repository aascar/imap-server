/**
 * Created by Araja Jyothi Babu on 29-Sep-16.
 */

var downloader = require('ytdl-core');
var utils = require('./utils/index.js');
var fs = require('fs');

/**
 * It'll give video info for processing meta
 */
module.exports = function(router){
    router.get('/download/:v/:itag', function (req, res) {

        var id = req.params.v;
        var itag = req.params.itag;
        
        var properUrl = 'https://www.youtube.com/watch?v=' + id;
        
        var download = downloader(properUrl, {quality: itag});
        var fileName;

        console.log("Download about to start...");
        download.on('info', function(info){
            fileName = info.title + "." + utils.formatType[itag];
            console.log("download-->", "infoSuccess");
        });
        download.on('error', function(){
            res.send("Error occurred while downloading..!")
        });
        download.on('response', function (response) {
            console.log("On Response");
            res.set('Content-Type', 'video/' + utils.formatType[itag]);
            res.set('Content-Disposition', 'attachment; filename="' + fileName + '"');
            res.set('Content-Length', response.headers['content-length']);
        });
        download.pipe(res);

    });
    return router;
};