/**
 * Created by Araja Jyothi Babu on 13-Nov-16.
 */
var logger = require('./../routes/utils/logger');

var videosCollection = "videos";
var usersCollection = "users";
var searchCollection = "searches";

module.exports = {
    /**
     *
     * @param db
     * @param videoId
     * @param cb
     */
    incrementRepeats: function(db, videoId, cb){
        var repeatIncrementer = { $inc : { repeats: 1 } };
        db.collection(videosCollection).update({_id: videoId}, repeatIncrementer, function (err, res) {
            logger(err, res);
            if(typeof cb != 'undefined'){
                cb(err, res);
            }
        });
    },
    /**
     *
     * @param db
     * @param videoId
     * @param cb
     */
    incrementDownloads: function(db, videoId, cb){
        var downloadIncrementer = { $inc : { downloads: 1 } };
        db.collection(videosCollection).update({_id: videoId}, downloadIncrementer, function (err, res) {
            logger(err, res);
            if(typeof cb != 'undefined'){
                cb(err, res);
            }
        });
    },
    /**
     *
     * @param db
     * @param videoId
     * @param cb
     */
    incrementLikes: function(db, videoId, cb){
        var likeIncrementer = { $inc : { likes: 1 } };
        db.collection(videosCollection).update({_id: videoId}, likeIncrementer, function (err, res) {
            logger(err, res);
            if(typeof cb != 'undefined'){
                cb(err, res);
            }
        });
    },
    /**
     *
     * @param db
     * @param limit
     * @param cb
     * @param version
     */
    mostRepeated: function (db, limit, cb, version) {
        version = version || 0;
        db.collection(videosCollection).find({}).sort({repeats: -1}).skip(version * limit).limit(limit).toArray(function (err, res) {
            logger(err, res);
            if(typeof cb != 'undefined'){
                cb(err, res);
            }
        });
    },

    /**
     *
     * @param db
     * @param limit
     * @param cb
     * @param version
     */
    mostDownloaded: function (db, limit, cb, version) {
        version = version || 0;
        db.collection(videosCollection).find({}).sort({downloads: -1}).skip(version * limit).limit(limit).toArray(function (err, res) {
            logger(err, res);
            if(typeof cb != 'undefined'){
                cb(err, res);
            }
        });
    },
    /**
     *
     * @param db
     * @param limit
     * @param cb
     * @param version
     */
    getTrending: function (db, limit, cb, version) {
        version = version || 0;
        db.collection(videosCollection).find({}).sort({downloads: -1, likes: -1, repeats: -1}).skip(version * limit).limit(limit).toArray(function (err, res) {
            logger(err, res);
            if(typeof cb != 'undefined'){
                cb(err, res);
            }
        });
    },
    /**
     *
     * @param db
     * @param query
     * @param cb
     */
    insertSearches: function(db, query, cb){
        db.collection(searchCollection).insert({q: query, date: new Date()}, function (err, res) {
            logger(err, res);
            if(typeof cb != 'undefined'){
                cb(err, res);
            }
        });
    }
};