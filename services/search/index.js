/**
 * Created by jyothi on 24/3/17.
 */
var Promise = require('promise');

var SearchService = {};

SearchService = function (collection) {
    this.collection = collection;
};

SearchService.prototype.searchVideos = function (query) {
    var self = this;
    //TODO:
    return new Promise(function(resolve, reject) {
        self.collection.find({}).toArray(function (err, res) {
            resolve(res || []);
            reject(err);
        });
    });
};

SearchService.prototype.trendingWords = function (filters) {
    return new Promise(function(resolve, reject) {
         collection.find({}).toArray(function (data, err) {
             resolve(data);
             reject(err);
         });
    });
};

module.exports = function (collection) {
    return new SearchService(collection);
};