/**
 * Created by jyothi on 26/1/17.
 */
var request = require('request');
var utils = require('./../utils/index');
var dao = require('./../../config/dao');

function getAPIKey(){
    var keys = [
        "AIzaSyAJ-W--F7gdjg0a4Y7nwuMXUi4q4CjUQVY", //mahesh546babu
        "AIzaSyDmWXQ5C1R737qCVBZW0s4PtxV9wr9Rvp8", //arajajyothibabu
        "AIzaSyCJXq1qtkFOBaCq7L7pNOfNkD80qy9UT7s", //arajajb
        "AIzaSyA8sAFIiYggFOf63Ckk5_0hV_3TGJhgZwY", //aascarcompany
        "AIzaSyCCCGsEwV_UwNv8A4azf8SJe-H6KXEmm0o", //pdr.rocks
        "AIzaSyCXH6tnB1X6Tn2i9JEvrhsYgi-xGlNpY1o", //kodandaram199
        "AIzaSyDLjCHgFSKZbbARVB9ZNqEEcFbbX3uDxNg", //dummyplay199
        "AIzaSyB7UCFDWbFmRMLgXpHYn4eAouEJ_But5Pg" //pdr.rockzzz
    ];
    var key = keys[0];

    /*try{
        key = keys[Math.round(Math.random() * 6)];
    }catch(e){}*/
    return key;
}

module.exports = {
    /**
     *
     * @param q
     * @param options
     * @param callback
     */
    search: function (q, options, callback) {
        //dao.insertSearches(db, q); //Inserts query into db
        var videos = [];
        var API_KEY = getAPIKey();
        var maxResults = options.maxResults || 50;
        var api = "https://www.googleapis.com/youtube/v3/";
        if(options.chart){
            api += "videos?" + "&chart=mostPopular";
        }else if(options.relatedToVideoId){
            api += "search?" + "&relatedToVideoId=" + options.relatedToVideoId + "&type=video";
            maxResults = 24; //FIXME: limit exceeding
        }else{
            api += "search?" + "q=" + q;
        }
        api += "&key=" + API_KEY + "&part=snippet" + "&maxResults=" + maxResults;
        request(api, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                videos = utils.filterSearchResults(JSON.parse(body), options);
            }
            if(typeof callback === 'function'){
                callback(error, videos);
            }
        });
    }
};